import { ColoringImage } from "./ColoringImage";

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
            <p style={{ fontSize: "var(--tx-base)", color: "var(--inkm)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "52ch" }}>
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
            <ColoringImage
              src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7cd4a7d9-e8ec-4f7a-88ed-74fc2d48b0f3.png"
              alt="Black woman sound healing illustration in coloring-book style"
              width={540}
              height={540}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
