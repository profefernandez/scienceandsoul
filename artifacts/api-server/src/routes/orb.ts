import { Router, type IRouter } from "express";
import { OrbChatBody } from "@workspace/api-zod";
import { sendGeminiChat, GeminiChatError } from "../lib/gemini-chat";

const router: IRouter = Router();

router.post("/orb/chat", async (req, res): Promise<void> => {
  const parsed = OrbChatBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid orb chat body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const { message, chakra, conversationId } = parsed.data;
    const result = await sendGeminiChat(message, chakra, conversationId);
    res.json({
      reply: result.reply,
      conversationId: result.conversationId,
    });
  } catch (err) {
    if (err instanceof GeminiChatError) {
      req.log.error({ err }, "Orb chat error");
      res.status(502).json({ error: err.message });
      return;
    }
    throw err;
  }
});

export default router;
