import { logger } from "./logger";

const LEMONADE_CHAT_URL = "https://api.launchlemonade.app/v1/chat";
const DEFAULT_LEMONADE_ID = "1781573959703x853787355355545600";
const REQUEST_TIMEOUT_MS = 90_000;

export interface LemonadeChatResult {
  reply: string;
  conversationId: string | null;
}

export class LemonadeConfigError extends Error {}
export class LemonadeUpstreamError extends Error {}

interface LemonadeChatResponse {
  response?: string;
  reply?: string;
  message?: string;
  conversation_id?: string | null;
  conversationId?: string | null;
}

export async function sendLemonadeChat(
  message: string,
  conversationId?: string | null,
): Promise<LemonadeChatResult> {
  const apiKey = process.env["LAUNCHLEMONADE_API_KEY"];
  if (!apiKey) {
    throw new LemonadeConfigError("LAUNCHLEMONADE_API_KEY is not configured");
  }

  const lemonadeId =
    process.env["LAUNCHLEMONADE_LEMONADE_ID"] ?? DEFAULT_LEMONADE_ID;

  const body: Record<string, unknown> = {
    lemonade_id: lemonadeId,
    message,
  };
  if (conversationId) {
    body["conversation_id"] = conversationId;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: globalThis.Response;
  try {
    res = await fetch(LEMONADE_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    logger.error(
      { status: res.status, body: text.slice(0, 500) },
      "Launch Lemonade request failed",
    );
    throw new LemonadeUpstreamError("The AI guide returned an error");
  }

  const data = (await res.json().catch(() => ({}))) as LemonadeChatResponse;
  const reply = data.response ?? data.reply ?? data.message;

  if (typeof reply !== "string" || reply.trim() === "") {
    logger.error({ data }, "Launch Lemonade returned an empty reply");
    throw new LemonadeUpstreamError("The AI guide returned an empty reply");
  }

  return {
    reply,
    conversationId: data.conversation_id ?? data.conversationId ?? null,
  };
}
