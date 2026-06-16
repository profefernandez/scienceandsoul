import { Router, type IRouter } from "express";
import { db, inquiriesTable } from "@workspace/db";
import { CreateInquiryBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/inquiries", async (req, res): Promise<void> => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid inquiry body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [inquiry] = await db
    .insert(inquiriesTable)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      source: parsed.data.source ?? "orb",
      conversationId: parsed.data.conversationId ?? null,
    })
    .returning();

  res.status(201).json(inquiry);
});

export default router;
