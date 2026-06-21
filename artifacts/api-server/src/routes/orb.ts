import { Router, type IRouter } from "express";
import { OrbChatBody } from "@workspace/api-zod";
import {
  sendLemonadeChat,
  LemonadeConfigError,
  LemonadeUpstreamError,
} from "../lib/launchlemonade";
import { getFallbackResponse } from "../lib/fallback-responses";

const router: IRouter = Router();

router.post("/orb/chat", async (req, res): Promise<void> => {
  const parsed = OrbChatBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid orb chat body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { message, chakra, conversationId } = parsed.data;
  const input = chakra?.trim()
    ? `[Chakra: ${chakra}]\n\n${message}`
    : message;

  try {
    const result = await sendLemonadeChat(input, conversationId);
    res.json({ reply: result.reply, conversationId: result.conversationId });
  } catch (err) {
    if (
      err instanceof LemonadeConfigError ||
      err instanceof LemonadeUpstreamError
    ) {
      req.log.warn(
        { err },
        "LaunchLemonade unavailable — using scripted fallback",
      );
      const fallback = getFallbackResponse(message, conversationId);
      res.json({ reply: fallback.reply, conversationId: fallback.conversationId });
      return;
    }
    throw err;
  }
});

export default router;
