import { imgSrc, imgSrcSet } from "../lib/img";

const steps = [
  {
    iconStyle: { background: "var(--teall)", color: "var(--teal)" },
    emoji: "🔬",
    title: "Start with the Full Picture",
    desc: "Understanding your history and goals.",
  },
  {
    iconStyle: { background: "var(--lavl)", color: "var(--lav)" },
    emoji: "✨",
    title: "Apply Clinical Methods",
    desc: "Adapting CBT, DBT, and mindfulness based on what works for you.",
  },
  {
    iconStyle: { background: "var(--sagel)", color: "var(--sage)" },
    emoji: "🌿",
    title: "Add Spiritual Practices When Useful",
    desc: "Integrating Reiki, chakra alignment, and sound bowl healing as needed.",
  },
  {
    iconStyle: { background: "var(--ambl)", color: "var(--amb)" },
    emoji: "⚡",
    title: "Build Skills That Last",
    desc: "Developing coping strategies and self-understanding that empower you beyond therapy.",
  },
];

export function Approach() {
  return (
    <section id="approach" style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div className="apprgrid">
          <div className="fi">
            <div className="slabel">The Process</div>
            <h2 className="stitle">
              A structured process,<br /><em>tailored to each person</em>
            </h2>
            <p style={{ fontSize: "var(--tx-base)", color: "var(--inkm)", lineHeight: "var(--lh-relaxed)", marginBottom: "2rem", maxWidth: "52ch" }}>
              Each treatment plan starts with a thorough understanding of the client's history, goals, and existing strengths. Kelly selects clinical and integrative methods based on what each person needs at each stage of the work.
            </p>
            <ul className="apprlist" role="list">
              {steps.map((s) => (
                <li className="appritem" key={s.title}>
                  <div className="appricon" style={s.iconStyle}>{s.emoji}</div>
                  <div>
                    <div className="apprititle">{s.title}</div>
                    <p className="appridesc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="apprimg fi">
            <img
              src={imgSrc("sound-healing", 1024)}
              srcSet={imgSrcSet("sound-healing", [480, 768, 1024, 1254])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Black woman sound healing illustration in coloring-book style"
              width={540}
              height={540}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
