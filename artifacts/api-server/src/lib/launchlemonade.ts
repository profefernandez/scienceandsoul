import { logger } from "./logger";

const DEFAULT_BASE_URL = "https://api.launchlemonade.app";
const REQUEST_TIMEOUT_MS = 30_000;

export interface LemonadeChatResult {
  reply: string;
  conversationId: string | null;
}

export class LemonadeConfigError extends Error {}
export class LemonadeUpstreamError extends Error {}

interface ChatResponse {
  response?: string;
  conversation_id?: string;
  tokens_used?: number;
  error?: {
    code?: string;
    message?: string;
    retry_after?: number;
  };
}

function getConfig(): { apiKey: string; baseUrl: string; lemonadeId: string } {
  const apiKey = process.env["LAUNCHLEMONADE_API_KEY"];
  if (!apiKey) {
    throw new LemonadeConfigError("LAUNCHLEMONADE_API_KEY is not configured");
  }
  const lemonadeId = process.env["LAUNCHLEMONADE_LEMONADE_ID"];
  if (!lemonadeId) {
    throw new LemonadeConfigError(
      "LAUNCHLEMONADE_LEMONADE_ID is not configured — set it to your Lemonade ID from the LaunchLemonade dashboard",
    );
  }
  const baseUrl = (
    process.env["LAUNCHLEMONADE_BASE_URL"] ?? DEFAULT_BASE_URL
  ).replace(/\/+$/, "");
  return { apiKey, baseUrl, lemonadeId };
}

export async function sendLemonadeChat(
  message: string,
  conversationId?: string | null,
): Promise<LemonadeChatResult> {
  const { apiKey, baseUrl, lemonadeId } = getConfig();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: globalThis.Response;
  try {
    res = await fetch(`${baseUrl}/v1/chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lemonade_id: lemonadeId,
        message,
        ...(conversationId ? { conversation_id: conversationId } : {}),
      }),
      signal: controller.signal,
    });
  } catch (err) {
    throw new LemonadeUpstreamError(
      err instanceof Error && err.name === "AbortError"
        ? "The AI guide took too long to respond"
        : "Could not reach the AI guide",
    );
  } finally {
    clearTimeout(timeout);
  }

  const text = await res.text().catch(() => "");

  if (!res.ok) {
    logger.error(
      { url: `${baseUrl}/v1/chat`, status: res.status, body: text.slice(0, 500) },
      "LaunchLemonade request failed",
    );
    if (res.status === 401) {
      throw new LemonadeConfigError("LaunchLemonade API key is invalid");
    }
    if (res.status === 404) {
      throw new LemonadeConfigError(
        "Lemonade not found — check your LAUNCHLEMONADE_LEMONADE_ID",
      );
    }
    if (res.status === 429) {
      throw new LemonadeUpstreamError("The AI guide is busy — please try again shortly");
    }
    throw new LemonadeUpstreamError("The AI guide returned an error");
  }

  let data: ChatResponse;
  try {
    data = JSON.parse(text) as ChatResponse;
  } catch {
    logger.error({ text: text.slice(0, 200) }, "LaunchLemonade returned non-JSON");
    throw new LemonadeUpstreamError("The AI guide returned an unexpected response");
  }

  if (data.error) {
    logger.error({ error: data.error }, "LaunchLemonade returned an error object");
    throw new LemonadeUpstreamError(
      data.error.message ?? "The AI guide returned an error",
    );
  }

  const reply = data.response;
  if (typeof reply !== "string" || reply.trim() === "") {
    logger.error({ data }, "LaunchLemonade returned an empty reply");
    throw new LemonadeUpstreamError("The AI guide returned an empty reply");
  }

  return {
    reply,
    conversationId: data.conversation_id ?? conversationId ?? null,
  };
}
