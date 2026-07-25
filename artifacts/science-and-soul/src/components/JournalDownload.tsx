import { useCallback, useEffect, useRef, useState } from "react";
import coverPage from "@assets/nZzner2sEFv_TS4mOgyzA_1784938176202.png";
import welcomePage from "@assets/epqJ7b4xyv_22Ayi7vSP-_1784938176202.png";
import approachPage from "@assets/ecd29WcwgloN6BZAwHv8y_1784938176201.png";
import expectPage from "@assets/6DlmnmmOq0hgz4Jt0AhR4_1784938176201.png";
import intentionsPage from "@assets/H6l11dcv7c6T4QEbO97uK_1784938176200.png";
import strengthPage from "@assets/5cZK7zzfk7i6n-L67l2Og_1784938176200.png";
import backPage from "@assets/XN2EHfq1_sS9YSXB55Aw1_1784938176199.png";

const PAGES: { src: string; title: string; alt: string }[] = [
  {
    src: coverPage,
    title: "Cover",
    alt: "Journal cover — “My Sacred Journey: A Spiritual Journal” with a meditating woman before a full moon, surrounded by flowers and crystals",
  },
  {
    src: welcomePage,
    title: "Welcome",
    alt: "“Welcome to Your Sacred Journey” page with seven chakra singing bowls and the prompt: what brings you here today, and what does healing look like to you?",
  },
  {
    src: approachPage,
    title: "My Approach",
    alt: "“My Approach to Your Healing” page with a flower-of-life mandala and the prompt: what areas of your life feel most out of balance right now?",
  },
  {
    src: expectPage,
    title: "What You Can Expect",
    alt: "“What You Can Expect” page with candles, crystals, and a lotus, and the prompt: what is one belief about yourself you would like to release on this journey?",
  },
  {
    src: intentionsPage,
    title: "Setting Your Intentions",
    alt: "“Setting Your Intentions” page with an open journal, quill, and candles, and space to write three intentions for your healing journey",
  },
  {
    src: strengthPage,
    title: "Your Power and Strength",
    alt: "“Your Power and Your Strength” page with a lotus mandala, butterflies, and hummingbirds, and the prompt: who or what has been your greatest source of strength?",
  },
  {
    src: backPage,
    title: "Back Page",
    alt: "Closing page with the Science and Soul Counseling & Wellness illustration and Kelly Nelson's contact information",
  },
];

async function buildPdf(): Promise<void> {
  const { jsPDF } = await import("jspdf");
  // Letter portrait in points: 612 x 792
  const pdf = new jsPDF({ unit: "pt", format: "letter", orientation: "portrait" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 36;

  for (let i = 0; i < PAGES.length; i++) {
    const img = new Image();
    img.src = PAGES[i].src;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const jpeg = canvas.toDataURL("image/jpeg", 0.92);

    // Fit at natural (square) proportions, centered — never stretch or crop.
    const ratio = img.naturalWidth / img.naturalHeight;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    let drawW = maxW;
    let drawH = drawW / ratio;
    if (drawH > maxH) {
      drawH = maxH;
      drawW = drawH * ratio;
    }
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    if (i > 0) pdf.addPage("letter", "portrait");
    pdf.addImage(jpeg, "JPEG", x, y, drawW, drawH);
  }

  pdf.save("my-sacred-journey-coloring-journal.pdf");
}

export function JournalDownload() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [building, setBuilding] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setLightbox(null);
    lastTriggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : (i + 1) % PAGES.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i + PAGES.length - 1) % PAGES.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close]);

  const download = async () => {
    if (building) return;
    setPdfError(null);
    setBuilding(true);
    try {
      await buildPdf();
    } catch {
      setPdfError(
        "The journal couldn't be assembled just now. Please refresh the page and try again.",
      );
    } finally {
      setBuilding(false);
    }
  };

  return (
    <section id="journal" className="jrn band">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Color with <em>Feeling and Intention</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", marginBottom: 0 }}>
            Download our free coloring journal to support your journey of
            self-discovery. Bring it to your first session to help me understand
            you &mdash; or keep it just for yourself.
          </p>
        </div>

        <ul className="jrnstrip">
          {PAGES.map((p, i) => (
            <li key={p.title} className="jrnthumb-item">
              <button
                type="button"
                className="jrnthumb"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setLightbox(i);
                }}
                aria-label={`Preview page ${i + 1} of ${PAGES.length}: ${p.title}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" width={1024} height={1024} />
                <span className="jrnthumb-cap" aria-hidden="true">
                  {p.title}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="jrnact fi">
          <button
            type="button"
            className="btn btnp btnlg"
            onClick={() => void download()}
            disabled={building}
          >
            {building
              ? "Preparing your journal…"
              : "Download the free journal (PDF)"}
          </button>
          {pdfError && (
            <p className="jrnerr" role="alert">
              {pdfError}
            </p>
          )}
          <p className="jrnpriv">
            Nothing you color or write is sent to or stored by this website.
          </p>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="jrnlb"
          role="dialog"
          aria-modal="true"
          aria-label={`Journal page preview: ${PAGES[lightbox].title}`}
        >
          <button
            ref={closeRef}
            type="button"
            className="jrnlb-x"
            onClick={close}
            aria-label="Close preview"
          >
            ✕
          </button>
          <button
            type="button"
            className="jrnlb-arr jrnlb-prev"
            onClick={() =>
              setLightbox((i) => (i === null ? i : (i + PAGES.length - 1) % PAGES.length))
            }
            aria-label="Previous page"
          >
            ‹
          </button>
          <figure className="jrnlb-fig">
            <img src={PAGES[lightbox].src} alt={PAGES[lightbox].alt} />
            <figcaption className="jrnlb-cap">
              {PAGES[lightbox].title} &mdash; page {lightbox + 1} of {PAGES.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="jrnlb-arr jrnlb-next"
            onClick={() =>
              setLightbox((i) => (i === null ? i : (i + 1) % PAGES.length))
            }
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
