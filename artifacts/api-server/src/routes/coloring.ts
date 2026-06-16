import { Router, type IRouter } from "express";
import { GenerateColoringPageBody } from "@workspace/api-zod";
import { generateImageBuffer } from "@workspace/integrations-openai-ai-server/image";

const router: IRouter = Router();

router.post("/coloring/generate", async (req, res): Promise<void> => {
  const parsed = GenerateColoringPageBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid coloring prompt");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const theme = parsed.data.prompt.trim();
  if (!theme) {
    res.status(400).json({ error: "Please describe a feeling or theme." });
    return;
  }

  const prompt = [
    "A black-and-white line-art coloring page for an adult to color in.",
    `Theme or feeling to express: ${theme}.`,
    "Clean, smooth black outlines on a pure white background.",
    "Outlines only — no shading, no grayscale, no filled areas, no color.",
    "A soft, calming, nature-inspired illustration with gentle botanical and mandala-like motifs.",
    "Bold, well-spaced lines that are easy to color.",
    "No text, words, letters, numbers, signatures, or border frame.",
    "A balanced, centered composition that fills the page.",
  ].join(" ");

  try {
    const buffer = await generateImageBuffer(prompt, "1024x1024");
    if (!buffer.length) {
      res
        .status(502)
        .json({ error: "The coloring page could not be created. Please try again." });
      return;
    }
    res.json({
      imageDataUrl: `data:image/png;base64,${buffer.toString("base64")}`,
    });
  } catch (err) {
    req.log.error({ err }, "Coloring page generation failed");
    res.status(502).json({
      error: "We couldn't create your coloring page right now. Please try again.",
    });
  }
});

export default router;
