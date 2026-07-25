import { logger } from "./logger";

const DEFAULT_BASE_URL = "https://sip.launchlemonade.app/version-live/api/1.1/wf";
const REQUEST_TIMEOUT_MS = 90_000;

export interface LemonadeChatResult {
  reply: string;
  conversationId: string | null;
}

export class LemonadeConfigError extends Error {}
export class LemonadeUpstreamError extends Error {}

interface RunAssistantResponse {
  Conversation_ID?: string;
  Response_ID?: string;
  Response?: string;
  Error?: string;
  Error_Reason?: string;
  response?: {
    Response?: string;
    Conversation_ID?: string;
    Response_ID?: string;
    Error?: string;
    Error_Reason?: string;
  };
}

function getConfig(): { apiKey: string; assistantId: string; baseUrl: string } {
  const apiKey = process.env["LAUNCHLEMONADE_API_KEY"];
  if (!apiKey) {
    throw new LemonadeConfigError(
      "The chat isn't connected yet. Please add your Launch Lemonade API key and Lemonade ID to enable it.",
    );
  }
  const assistantId = process.env["LAUNCHLEMONADE_LEMONADE_ID"];
  if (!assistantId) {
    throw new LemonadeConfigError(
      "The chat isn't connected yet. Please add your Launch Lemonade API key and Lemonade ID to enable it.",
    );
  }
  const baseUrl = (
    process.env["LAUNCHLEMONADE_BASE_URL"] ?? DEFAULT_BASE_URL
  ).replace(/\/+$/, "");
  return { apiKey, assistantId, baseUrl };
}

function unwrapResponse(raw: RunAssistantResponse): RunAssistantResponse {
  // The API returns fields either top-level or nested under a "response" object
  if (raw.response && typeof raw.response === "object") {
    return {
      ...raw,
      Response: raw.response.Response ?? raw.Response,
      Conversation_ID: raw.response.Conversation_ID ?? raw.Conversation_ID,
      Response_ID: raw.response.Response_ID ?? raw.Response_ID,
      Error: raw.response.Error ?? raw.Error,
      Error_Reason: raw.response.Error_Reason ?? raw.Error_Reason,
    };
  }
  return raw;
}

async function postJson<T>(
  url: string,
  apiKey: string,
  body: unknown,
  timeoutMs: number,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let res: globalThis.Response;
  try {
    res = await fetch(url, {
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
      { url, status: res.status, body: text.slice(0, 500) },
      "LaunchLemonade request failed",
    );
    throw new LemonadeUpstreamError("The AI guide returned an error");
  }

  return (await res.json().catch(() => ({}))) as T;
}

export async function sendLemonadeChat(
  message: string,
  conversationId?: string | null,
): Promise<LemonadeChatResult> {
  const { apiKey, assistantId, baseUrl } = getConfig();

  const body: Record<string, string> = {
    assistant_id: assistantId,
    input: message,
  };
  if (conversationId && conversationId.trim() !== "") {
    body["conversation_id"] = conversationId;
  }

  const raw = await postJson<RunAssistantResponse>(
    `${baseUrl}/run_assistant`,
    apiKey,
    body,
    REQUEST_TIMEOUT_MS,
  );

  const data = unwrapResponse(raw);

  if (data.Error?.toLowerCase() === "yes") {
    const reason = data.Error_Reason?.trim() ?? "";
    logger.error({ reason }, "LaunchLemonade returned an error");
    const isRateLimited =
      /rate\s*limit|quota|too\s*many/i.test(reason);
    if (isRateLimited) {
      throw new LemonadeUpstreamError(
        "The AI guide is busy right now — please try again in a moment.",
      );
    }
    throw new LemonadeUpstreamError(
      reason ? reason : "The AI guide returned an error",
    );
  }

  const newConversationId = data.Conversation_ID ?? conversationId ?? null;
  const reply = data.Response;

  if (typeof reply !== "string" || reply.trim() === "") {
    logger.error({ data }, "LaunchLemonade returned an empty reply");
    throw new LemonadeUpstreamError("The AI guide returned an empty reply");
  }

  return {
    reply,
    conversationId: newConversationId,
  };
}
