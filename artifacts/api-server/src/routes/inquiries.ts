import { Router, type IRouter } from "express";
import { db, inquiriesTable } from "@workspace/db";
import { CreateInquiryBody } from "@workspace/api-zod";
import { Resend } from "resend";

const router: IRouter = Router();

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const KELLY_EMAIL = "scienceandsoulcounseling@gmail.com";

function buildEmailHtml(data: {
  name: string;
  email: string;
  message: string;
  source?: string | null;
}): string {
  const sourceLabel =
    data.source === "website"
      ? "Contact Form"
      : data.source === "orb"
      ? "Chakra Orb"
      : data.source === "coloring"
      ? "Coloring Studio"
      : data.source ?? "Website";

  const lines = data.message.split("\n").map((l) => `<p style="margin:0 0 8px">${l}</p>`).join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;background:#f9f7f5;margin:0;padding:32px 0">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto">
    <tr>
      <td style="background:#2d6e6e;border-radius:12px 12px 0 0;padding:24px 32px">
        <p style="color:#a8d5d5;font-size:12px;margin:0 0 4px;letter-spacing:.1em;text-transform:uppercase">Science &amp; Soul Counseling &amp; Wellness</p>
        <h1 style="color:#ffffff;font-size:20px;margin:0">New Inquiry via ${sourceLabel}</h1>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e0d8;border-top:none">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:0 0 16px">
              <p style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.08em;margin:0 0 4px">Name</p>
              <p style="font-size:16px;color:#1a1a1a;margin:0;font-weight:bold">${data.name}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 16px">
              <p style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.08em;margin:0 0 4px">Email</p>
              <p style="font-size:15px;color:#2d6e6e;margin:0"><a href="mailto:${data.email}" style="color:#2d6e6e">${data.email}</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 24px">
              <p style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.08em;margin:0 0 8px">Message</p>
              <div style="background:#f9f7f5;border-left:3px solid #2d6e6e;padding:16px;border-radius:4px;font-size:15px;color:#333;line-height:1.7">
                ${lines}
              </div>
            </td>
          </tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e0d8;margin:0 0 20px">
        <p style="font-size:12px;color:#aaa;margin:0">
          Reply directly to this email to respond to ${data.name.split(" ")[0]}.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
      imageDataUrl: parsed.data.imageDataUrl ?? null,
    })
    .returning();

  if (resend) {
    const sourceLabel =
      parsed.data.source === "website"
        ? "Contact Form"
        : parsed.data.source === "orb"
        ? "Chakra Orb"
        : parsed.data.source === "coloring"
        ? "Coloring Studio"
        : "Website";

    resend.emails
      .send({
        from: "Science & Soul Counseling <onboarding@resend.dev>",
        to: KELLY_EMAIL,
        replyTo: parsed.data.email,
        subject: `New inquiry from ${parsed.data.name} — ${sourceLabel}`,
        html: buildEmailHtml({
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          source: parsed.data.source,
        }),
      })
      .catch((err: unknown) => {
        req.log.warn({ err }, "Resend email failed (non-fatal)");
      });
  } else {
    req.log.warn("RESEND_API_KEY not set — skipping email notification");
  }

  res.status(201).json(inquiry);
});

export default router;
