import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  useGenerateColoringPage,
  useCreateInquiry,
} from "@workspace/api-client-react";

const SUGGESTIONS = [
  "Calm",
  "Grounded",
  "Hopeful",
  "Peaceful",
  "Joyful",
  "Safe",
  "Renewed",
];

const PALETTE: { hex: string; name: string }[] = [
  { hex: "#7db8b3", name: "Teal" },
  { hex: "#9b8bd4", name: "Lavender" },
  { hex: "#8bbf8f", name: "Sage" },
  { hex: "#e0b15e", name: "Gold" },
  { hex: "#e89f9f", name: "Blush" },
  { hex: "#cf8fb3", name: "Rose" },
  { hex: "#8fb8e0", name: "Sky" },
  { hex: "#f0b890", name: "Peach" },
  { hex: "#a0d8c8", name: "Mint" },
  { hex: "#b0a8e0", name: "Periwinkle" },
  { hex: "#d4787a", name: "Coral" },
  { hex: "#6a7fb8", name: "Indigo" },
];

const BRUSHES: { size: number; label: string }[] = [
  { size: 14, label: "S" },
  { size: 30, label: "M" },
  { size: 52, label: "L" },
];

const ERASER = "#ffffff";
const SIZE = 1024;

export function ColoringStudio() {
  const [prompt, setPrompt] = useState("");
  const [lineArt, setLineArt] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const [color, setColor] = useState(PALETTE[0].hex);
  const [brush, setBrush] = useState(BRUSHES[1].size);

  const [lead, setLead] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const displayRef = useRef<HTMLCanvasElement>(null);
  const paintCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const compositeRef = useRef<(() => void) | null>(null);
  const colorRef = useRef(color);
  const brushRef = useRef(brush);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);
  useEffect(() => {
    brushRef.current = brush;
  }, [brush]);

  const generate = useGenerateColoringPage();
  const createInquiry = useCreateInquiry();

  const runGenerate = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || generate.isPending) return;
      setGenError(null);
      try {
        const res = await generate.mutateAsync({ data: { prompt: trimmed } });
        setCanvasReady(false);
        setLineArt(res.imageDataUrl);
        setSent(false);
        setSendError(null);
        setColor(PALETTE[0].hex);
        setBrush(BRUSHES[1].size);
      } catch (err) {
        const apiErr = err as { status?: number; data?: { error?: string } };
        if (apiErr.status === 429 && apiErr.data?.error) {
          setGenError(apiErr.data.error);
        } else {
          setGenError(
            "We couldn't create your coloring page right now. Please try again in a moment.",
          );
        }
      }
    },
    [generate],
  );

  // Set up the painting canvas whenever a new line-art page arrives.
  useEffect(() => {
    if (!lineArt) return;
    const display = displayRef.current;
    if (!display) return;
    const dctx = display.getContext("2d");
    if (!dctx) return;

    display.width = SIZE;
    display.height = SIZE;

    const paint = document.createElement("canvas");
    paint.width = SIZE;
    paint.height = SIZE;
    const pctx = paint.getContext("2d");
    if (!pctx) return;
    paintCtxRef.current = pctx;
    pctx.fillStyle = "#ffffff";
    pctx.fillRect(0, 0, SIZE, SIZE);
    pctx.lineCap = "round";
    pctx.lineJoin = "round";

    const img = new Image();
    let loaded = false;
    let active = true;

    const composite = () => {
      dctx.globalCompositeOperation = "source-over";
      dctx.fillStyle = "#ffffff";
      dctx.fillRect(0, 0, SIZE, SIZE);
      dctx.drawImage(paint, 0, 0);
      if (loaded) {
        dctx.globalCompositeOperation = "multiply";
        dctx.drawImage(img, 0, 0, SIZE, SIZE);
        dctx.globalCompositeOperation = "source-over";
      }
    };
    compositeRef.current = composite;

    img.onload = () => {
      if (!active) return;
      loaded = true;
      composite();
      setCanvasReady(true);
    };
    img.src = lineArt;
    composite();

    let painting = false;
    let lastX = 0;
    let lastY = 0;

    const toCanvas = (e: PointerEvent) => {
      const rect = display.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) * SIZE) / rect.width,
        y: ((e.clientY - rect.top) * SIZE) / rect.height,
      };
    };

    const down = (e: PointerEvent) => {
      e.preventDefault();
      painting = true;
      try {
        display.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const { x, y } = toCanvas(e);
      lastX = x;
      lastY = y;
      pctx.fillStyle = colorRef.current;
      pctx.beginPath();
      pctx.arc(x, y, brushRef.current / 2, 0, Math.PI * 2);
      pctx.fill();
      composite();
    };

    const move = (e: PointerEvent) => {
      if (!painting) return;
      const { x, y } = toCanvas(e);
      pctx.strokeStyle = colorRef.current;
      pctx.lineWidth = brushRef.current;
      pctx.beginPath();
      pctx.moveTo(lastX, lastY);
      pctx.lineTo(x, y);
      pctx.stroke();
      lastX = x;
      lastY = y;
      composite();
    };

    const up = (e: PointerEvent) => {
      painting = false;
      try {
        display.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    display.addEventListener("pointerdown", down);
    display.addEventListener("pointermove", move);
    display.addEventListener("pointerup", up);
    display.addEventListener("pointercancel", up);
    display.addEventListener("pointerleave", up);

    return () => {
      active = false;
      img.onload = null;
      display.removeEventListener("pointerdown", down);
      display.removeEventListener("pointermove", move);
      display.removeEventListener("pointerup", up);
      display.removeEventListener("pointercancel", up);
      display.removeEventListener("pointerleave", up);
    };
  }, [lineArt]);

  const resetColoring = useCallback(() => {
    const pctx = paintCtxRef.current;
    if (!pctx) return;
    pctx.fillStyle = "#ffffff";
    pctx.fillRect(0, 0, SIZE, SIZE);
    compositeRef.current?.();
  }, []);

  const download = useCallback(() => {
    const display = displayRef.current;
    if (!display || !canvasReady) return;
    const link = document.createElement("a");
    link.download = "my-coloring-page.png";
    link.href = display.toDataURL("image/png");
    link.click();
  }, [canvasReady]);

  const exportForSend = useCallback((): string | null => {
    const display = displayRef.current;
    if (!display || !canvasReady) return null;
    const tmp = document.createElement("canvas");
    tmp.width = 768;
    tmp.height = 768;
    const tctx = tmp.getContext("2d");
    if (!tctx) return null;
    tctx.fillStyle = "#ffffff";
    tctx.fillRect(0, 0, 768, 768);
    tctx.drawImage(display, 0, 0, 768, 768);
    return tmp.toDataURL("image/jpeg", 0.85);
  }, [canvasReady]);

  const submitLead = async (e: FormEvent) => {
    e.preventDefault();
    setSendError(null);
    if (!lead.name.trim() || !lead.email.trim()) {
      setSendError("Please add your name and email so Kelly can reach you.");
      return;
    }
    if (!canvasReady) {
      setSendError("Your page is still loading — please try again in a moment.");
      return;
    }
    const image = exportForSend();
    try {
      await createInquiry.mutateAsync({
        data: {
          name: lead.name.trim(),
          email: lead.email.trim(),
          message:
            lead.message.trim() ||
            `Shared a coloring page made from the theme "${prompt.trim()}".`,
          source: "coloring",
          imageDataUrl: image,
        },
      });
      setSent(true);
    } catch {
      setSendError("Something went wrong sending your page. Please try again.");
    }
  };

  const startOver = () => {
    setLineArt(null);
    setPrompt("");
    setSent(false);
    setSendError(null);
    setLead({ name: "", email: "", message: "" });
  };

  return (
    <section id="coloring" className="cps band">
      <div className="ww">
        <div className="fi" style={{ textAlign: "center", maxWidth: "680px", marginInline: "auto" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>
            Color Therapy
          </div>
          <h2 className="stitle">
            Make a little something <em>just for you</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto" }}>
            Tell me how you'd like to feel, and I'll draw you a calming coloring
            page to match. Color it right here, save it, or send your finished
            piece to Kelly with a note.
          </p>
        </div>

        <div className="cpscard fi">
          {!lineArt ? (
            <div className="cpsgen">
              {generate.isPending ? (
                <div className="cpsloading" role="status">
                  <div className="cpsspinner" aria-hidden="true" />
                  <p className="cpsloading-txt">
                    Drawing your page — this takes a few moments…
                  </p>
                </div>
              ) : (
                <>
                  <label className="cpsq" htmlFor="cps-prompt">
                    How do you want to feel today?
                  </label>
                  <div className="cpschips">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="cpschip"
                        onClick={() => setPrompt(s.toLowerCase())}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <form
                    className="cpsform"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void runGenerate(prompt);
                    }}
                  >
                    <input
                      id="cps-prompt"
                      className="cpsinp"
                      placeholder="e.g. calm like a quiet forest morning"
                      value={prompt}
                      maxLength={300}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btnp cpsgenbtn"
                      disabled={!prompt.trim()}
                    >
                      Create my page ✦
                    </button>
                  </form>
                  {genError && <p className="cpserr" role="alert">{genError}</p>}
                </>
              )}
            </div>
          ) : (
            <div className="cpsstudio">
              <div className="cpscanvas-wrap">
                <canvas
                  ref={displayRef}
                  className="cpscanvas"
                  aria-label="Your coloring page — paint on it to color"
                />
              </div>

              <div className="cpstools">
                <div className="cpstool-group">
                  <span className="cpstool-label">Colors</span>
                  <div className="cpsswatches">
                    {PALETTE.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        className={`cpsswatch${color === c.hex ? " is-active" : ""}`}
                        style={{ background: c.hex }}
                        onClick={() => setColor(c.hex)}
                        aria-label={c.name}
                        aria-pressed={color === c.hex}
                      />
                    ))}
                    <button
                      type="button"
                      className={`cpsswatch cpsswatch-eraser${color === ERASER ? " is-active" : ""}`}
                      onClick={() => setColor(ERASER)}
                      aria-label="Eraser"
                      aria-pressed={color === ERASER}
                    >
                      ⌫
                    </button>
                  </div>
                </div>

                <div className="cpstool-group">
                  <span className="cpstool-label">Brush</span>
                  <div className="cpsbrushes">
                    {BRUSHES.map((b) => (
                      <button
                        key={b.size}
                        type="button"
                        className={`cpsbrush${brush === b.size ? " is-active" : ""}`}
                        onClick={() => setBrush(b.size)}
                        aria-label={`Brush size ${b.label}`}
                        aria-pressed={brush === b.size}
                      >
                        <span
                          className="cpsbrush-dot"
                          style={{
                            width: `${b.size / 3.5}px`,
                            height: `${b.size / 3.5}px`,
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cpsactions">
                  <button type="button" className="cpsbtn" onClick={resetColoring}>
                    Clear colors
                  </button>
                  <button
                    type="button"
                    className="cpsbtn"
                    onClick={download}
                    disabled={!canvasReady}
                  >
                    Download
                  </button>
                  <button type="button" className="cpsbtn" onClick={startOver}>
                    New page
                  </button>
                </div>
              </div>

              <div className="cpssend">
                {sent ? (
                  <p className="cpssent" role="status">
                    ✓ Thank you for sharing — Kelly received your piece and will
                    be in touch soon.
                  </p>
                ) : (
                  <form className="cpssend-form" onSubmit={submitLead}>
                    <p className="cpssend-title">Send it to Kelly</p>
                    <div className="cpssend-row">
                      <input
                        className="cpsinp"
                        placeholder="Your name"
                        aria-label="Your name"
                        autoComplete="name"
                        value={lead.name}
                        onChange={(e) =>
                          setLead({ ...lead, name: e.target.value })
                        }
                      />
                      <input
                        className="cpsinp"
                        type="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        autoComplete="email"
                        value={lead.email}
                        onChange={(e) =>
                          setLead({ ...lead, email: e.target.value })
                        }
                      />
                    </div>
                    <textarea
                      className="cpsinp cpstxt"
                      placeholder="Add a short note (optional)"
                      aria-label="Add a short note (optional)"
                      value={lead.message}
                      onChange={(e) =>
                        setLead({ ...lead, message: e.target.value })
                      }
                    />
                    {sendError && <p className="cpserr" role="alert">{sendError}</p>}
                    <button
                      type="submit"
                      className="btn btnp cpssend-btn"
                      disabled={createInquiry.isPending || !canvasReady}
                    >
                      {createInquiry.isPending ? "Sending…" : "Send my page ✦"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
