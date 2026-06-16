import { Router, type IRouter } from "express";
import { OrbChatBody } from "@workspace/api-zod";
import {
  sendLemonadeChat,
  LemonadeConfigError,
  LemonadeUpstreamError,
} from "../lib/launchlemonade";

const router: IRouter = Router();

router.post("/orb/chat", async (req, res): Promise<void> => {
  const parsed = OrbChatBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid orb chat body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const conversationId = parsed.data.conversationId;
    const chakra = parsed.data.chakra?.trim();
    const input = chakra
      ? `[Chakra: ${chakra}]\n\n${parsed.data.message}`
      : parsed.data.message;
    const result = await sendLemonadeChat(input, conversationId);
    res.json({
      reply: result.reply,
      conversationId: result.conversationId,
    });
  } catch (err) {
    if (err instanceof LemonadeConfigError) {
      req.log.error({ err }, "Orb chat misconfigured");
      res
        .status(503)
        .json({ error: "The AI guide is not available right now." });
      return;
    }
    if (err instanceof LemonadeUpstreamError) {
      req.log.error({ err }, "Orb chat upstream error");
      res.status(502).json({ error: err.message });
      return;
    }
    throw err;
  }
});

export default router;
