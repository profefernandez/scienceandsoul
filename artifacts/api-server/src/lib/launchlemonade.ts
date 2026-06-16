import { logger } from "./logger";

const DEFAULT_BASE_URL = "https://sip.launchlemonade.app";
const DEFAULT_ASSISTANT_ID = "1781573959703x853787355355545600";
const REQUEST_TIMEOUT_MS = 90_000;
const POLL_INTERVAL_MS = 10_000;
const POLL_DEADLINE_MS = 70_000;

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
}

interface GetRunAssistantResponse {
  Response?: string;
}

function getConfig(): { apiKey: string; baseUrl: string; assistantId: string } {
  const apiKey = process.env["LAUNCHLEMONADE_API_KEY"];
  if (!apiKey) {
    throw new LemonadeConfigError("LAUNCHLEMONADE_API_KEY is not configured");
  }
  const baseUrl = (
    process.env["LAUNCHLEMONADE_BASE_URL"] ?? DEFAULT_BASE_URL
  ).replace(/\/+$/, "");
  const assistantId =
    process.env["LAUNCHLEMONADE_ASSISTANT_ID"] ?? DEFAULT_ASSISTANT_ID;
  return { apiKey, baseUrl, assistantId };
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
      "Launch Lemonade request failed",
    );
    throw new LemonadeUpstreamError("The AI guide returned an error");
  }

  return (await res.json().catch(() => ({}))) as T;
}

async function pollForResponse(
  baseUrl: string,
  apiKey: string,
  responseId: string,
): Promise<string> {
  const deadline = Date.now() + POLL_DEADLINE_MS;
  const url = `${baseUrl}/api/1.1/wf/get_run_assistant`;

  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    const data = await postJson<GetRunAssistantResponse>(
      url,
      apiKey,
      { response_id: responseId },
      30_000,
    );
    const reply = data.Response;
    if (typeof reply === "string" && reply.trim() !== "") {
      return reply;
    }
  }

  throw new LemonadeUpstreamError("The AI guide took too long to respond");
}

export async function sendLemonadeChat(
  message: string,
  conversationId?: string | null,
): Promise<LemonadeChatResult> {
  const { apiKey, baseUrl, assistantId } = getConfig();

  const data = await postJson<RunAssistantResponse>(
    `${baseUrl}/api/1.1/wf/run_assistant`,
    apiKey,
    {
      assistant_id: assistantId,
      conversation_id: conversationId ?? "",
      input: message,
    },
    REQUEST_TIMEOUT_MS,
  );

  if (data.Error === "Yes") {
    logger.error(
      { reason: data.Error_Reason },
      "Launch Lemonade returned an error",
    );
    throw new LemonadeUpstreamError(
      data.Error_Reason && data.Error_Reason.trim() !== ""
        ? data.Error_Reason
        : "The AI guide returned an error",
    );
  }

  const newConversationId = data.Conversation_ID ?? conversationId ?? null;

  let reply = data.Response;

  if ((typeof reply !== "string" || reply.trim() === "") && data.Response_ID) {
    reply = await pollForResponse(baseUrl, apiKey, data.Response_ID);
  }

  if (typeof reply !== "string" || reply.trim() === "") {
    logger.error({ data }, "Launch Lemonade returned an empty reply");
    throw new LemonadeUpstreamError("The AI guide returned an empty reply");
  }

  return {
    reply,
    conversationId: newConversationId,
  };
}
