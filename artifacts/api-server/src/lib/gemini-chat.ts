import { GoogleGenAI } from "@google/genai";
import { logger } from "./logger";

const MODEL = "gemini-2.5-flash";

const SYSTEM_PROMPT = `You are Luna, a warm and knowledgeable wellness guide for Science and Soul Counseling & Wellness, the practice of Kelly Nelson, LCSW-S, based in Houston, TX.

Your purpose is to help visitors:
- Learn about the seven chakras and their connection to emotional and physical wellbeing
- Understand how chakra imbalances can relate to stress, anxiety, trauma, and life challenges
- Explore Kelly's services: individual therapy, couples counseling, EMDR, somatic therapies, and holistic wellness
- Feel welcomed and gently guided toward scheduling a consultation with Kelly

Your personality:
- Warm, calm, and grounding — like a trusted guide
- Speak with gentle wisdom, never clinical or cold
- Use inclusive, compassionate language
- Keep answers focused and concise (2-4 short paragraphs max)
- Always remind visitors that Kelly is available for deeper support when appropriate

Important boundaries:
- You are a wellness guide, NOT a therapist — never diagnose or provide clinical advice
- Always encourage visitors to reach out to Kelly for personalized support
- If someone is in crisis, warmly direct them to emergency services (911) or crisis lines (988)
- Do not discuss competitors, pricing specifics, or make appointment promises

Kelly's contact: scienceandsoulcounseling@gmail.com | (832) 501-1687`;

export class GeminiChatError extends Error {}

interface Turn {
  role: "user" | "model";
  parts: { text: string }[];
}

// In-memory conversation store (per conversationId)
const conversations = new Map<string, Turn[]>();

function getOrCreateHistory(conversationId: string | null): {
  id: string;
  history: Turn[];
} {
  if (conversationId && conversations.has(conversationId)) {
    return { id: conversationId, history: conversations.get(conversationId)! };
  }
  const id = conversationId ?? `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  conversations.set(id, []);
  return { id, history: [] };
}

// Prune old conversations after 2 hours to avoid memory growth
setInterval(
  () => {
    const cutoff = Date.now() - 2 * 60 * 60 * 1000;
    for (const [id] of conversations) {
      const ts = parseInt(id.split("_")[1] ?? "0", 10);
      if (ts && ts < cutoff) conversations.delete(id);
    }
  },
  30 * 60 * 1000,
);

export async function sendGeminiChat(
  message: string,
  chakra: string | null | undefined,
  conversationId: string | null | undefined,
): Promise<{ reply: string; conversationId: string }> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new GeminiChatError("GEMINI_API_KEY is not configured");
  }

  const { id, history } = getOrCreateHistory(conversationId ?? null);

  const userText = chakra?.trim()
    ? `[Focused on: ${chakra} Chakra]\n\n${message}`
    : message;

  const ai = new GoogleGenAI({ apiKey });

  const contents: Turn[] = [
    ...history,
    { role: "user", parts: [{ text: userText }] },
  ];

  let replyText: string;
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    });
    replyText = response.text ?? "";
  } catch (err) {
    logger.error({ err }, "Gemini chat error");
    throw new GeminiChatError(
      "The AI guide is unavailable right now — please try again in a moment.",
    );
  }

  if (!replyText.trim()) {
    throw new GeminiChatError("The AI guide returned an empty reply");
  }

  // Persist turn to history
  history.push({ role: "user", parts: [{ text: userText }] });
  history.push({ role: "model", parts: [{ text: replyText }] });
  conversations.set(id, history);

  return { reply: replyText, conversationId: id };
}
