import { logger } from "./logger";

const DEFAULT_BASE_URL = "https://sip.launchlemonade.app/api/1.1/wf";
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
  response?: {
    Response?: string;
    Conversation_ID?: string;
    Response_ID?: string;
    Error?: string;
    Error_Reason?: string;
  };
}

interface GetRunAssistantResponse {
  Response?: string;
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

async function pollForResponse(
  baseUrl: string,
  apiKey: string,
  responseId: string,
): Promise<string> {
  const deadline = Date.now() + POLL_DEADLINE_MS;
  const url = `${baseUrl}/get_run_assistant`;

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
  const { apiKey, assistantId, baseUrl } = getConfig();

  const raw = await postJson<RunAssistantResponse>(
    `${baseUrl}/run_assistant`,
    apiKey,
    {
      assistant_id: assistantId,
      conversation_id: conversationId ?? "",
      input: message,
    },
    REQUEST_TIMEOUT_MS,
  );

  const data = unwrapResponse(raw);

  if (data.Error === "Yes") {
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
  let reply = data.Response;

  if ((typeof reply !== "string" || reply.trim() === "") && data.Response_ID) {
    reply = await pollForResponse(baseUrl, apiKey, data.Response_ID);
  }

  if (typeof reply !== "string" || reply.trim() === "") {
    logger.error({ data }, "LaunchLemonade returned an empty reply");
    throw new LemonadeUpstreamError("The AI guide returned an empty reply");
  }

  return {
    reply,
    conversationId: newConversationId,
  };
}
