import { CHAKRAS } from "../data/chakras";
import { useChakraGuide } from "../context/ChakraGuideContext";

export function ChakraStrip() {
  const { chooseChakra, chakra: active } = useChakraGuide();

  return (
    <section className="cstrip" id="guides" aria-label="Choose your chakra guide">
      <div className="ww">
        <div className="cshead">
          <div className="slabel" style={{ justifyContent: "center" }}>
            Your AI Companion
          </div>
          <h2 className="cstitle">
            Choose a chakra <em>guide</em>
          </h2>
          <p className="cssub">
            Each chakra represents a different part of your wellbeing. Tap one to
            open a gentle AI guide that can answer questions about Kelly's
            practice and help you take the next step.
          </p>
        </div>

        <div className="csinner" role="list">
          {CHAKRAS.map((c) => (
            <button
              type="button"
              role="listitem"
              className={`ci cibtn${active?.id === c.id ? " is-active" : ""}`}
              key={c.id}
              aria-pressed={active?.id === c.id}
              onClick={() => chooseChakra(c)}
              aria-label={`Open the ${c.name} guide (${c.sanskrit}) — ${c.meaning}`}
              style={{ ["--ci-glow" as string]: c.glow }}
            >
              <span
                className="cidot"
                style={{
                  background: c.soft,
                  color: c.ink,
                  borderColor: c.border,
                }}
              >
                {c.emoji}
              </span>
              <span className="ciname" style={{ color: c.ink }}>
                {c.name}
              </span>
              <span className="cielem">{c.sanskrit}</span>
              <span className="cimean">{c.meaning}</span>
              <span className="cipick">Open guide →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
