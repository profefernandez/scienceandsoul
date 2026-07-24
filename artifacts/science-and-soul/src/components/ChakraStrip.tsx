import { useState } from "react";
import { CHAKRAS } from "../data/chakras";
import { useChakraGuide } from "../context/ChakraGuideContext";

export function ChakraStrip() {
  const { chooseChakra, chakra: active } = useChakraGuide();
  const [idx, setIdx] = useState(0);

  const c = CHAKRAS[idx];
  const prev = () => setIdx((i) => (i - 1 + CHAKRAS.length) % CHAKRAS.length);
  const next = () => setIdx((i) => (i + 1) % CHAKRAS.length);

  return (
    <section className="cstrip band" id="guides" aria-label="Choose your chakra guide">
      <div className="ww">
        <div className="cshead">
          <div className="slabel" style={{ justifyContent: "center" }}>Your AI Companion</div>
          <h2 className="cstitle">Choose a chakra <em>guide</em></h2>
          <p className="cssub">
            Each chakra represents a different part of your wellbeing. Browse with the arrows, then open a gentle AI guide to ask questions about Kelly's practice.
          </p>
        </div>

        <div className="ccar">
          <div
            className={`cccard${active?.id === c.id ? " cccard-a" : ""}`}
            style={{ ["--ci-glow" as string]: c.glow }}
            aria-live="polite"
            aria-atomic="true"
          >
            <div key={`h-${c.id}`} className="ccslide">
              <div
                className="cchead"
                style={{
                  background: `linear-gradient(160deg,${c.soft} 0%,color-mix(in oklch,${c.soft} 30%,white) 100%)`,
                }}
              >
                <span
                  className="ccorb"
                  style={{ background: c.soft, color: c.ink, borderColor: c.border }}
                >
                  {c.emoji}
                </span>
              </div>
              <div className="ccbody">
                <div className="ccskr">{c.sanskrit}</div>
                <h3 className="ccname">{c.name}</h3>
                <p className="ccmean">{c.meaning}</p>
                <button
                  type="button"
                  className="btn btnp btnlg ccact"
                  aria-pressed={active?.id === c.id}
                  onClick={() => chooseChakra(c)}
                  aria-label={`Open the ${c.name} chakra guide — ${c.meaning}`}
                >
                  {active?.id === c.id ? "Guide is open ✓" : "Open guide →"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ccnav" role="group" aria-label="Carousel navigation">
          <button className="ccarr" onClick={prev} aria-label="Previous chakra">&#8249;</button>
          <div className="ccdots" role="tablist">
            {CHAKRAS.map((ch, i) => (
              <button
                key={ch.id}
                role="tab"
                aria-selected={i === idx}
                aria-label={ch.name}
                className={`ccdot${i === idx ? " ccdot-a" : ""}`}
                style={i === idx ? { background: ch.glow } : undefined}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
          <button className="ccarr" onClick={next} aria-label="Next chakra">&#8250;</button>
        </div>
      </div>
    </section>
  );
}
