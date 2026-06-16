const steps = [
  {
    iconStyle: { background: "var(--teall)", color: "var(--teal)" },
    emoji: "🔬",
    title: "Start with the full picture",
    desc: "Kelly gathers a thorough history — what the client has experienced, what they want to work on, and what tools and strengths they already have. That foundation shapes everything that follows.",
  },
  {
    iconStyle: { background: "var(--lavl)", color: "var(--lav)" },
    emoji: "✨",
    title: "Apply clinical methods",
    desc: "CBT, DBT, psychodynamic therapy, and mindfulness provide the clinical structure for each session. Kelly adapts the method to the individual's pace, goals, and what is actually producing results.",
  },
  {
    iconStyle: { background: "var(--sagel)", color: "var(--sage)" },
    emoji: "🌿",
    title: "Add spiritual practices when useful",
    desc: "Reiki, chakra alignment, and sound bowl healing offer additional pathways for clients whose care benefits from attention to energy, spirituality, and somatic experience.",
  },
  {
    iconStyle: { background: "var(--ambl)", color: "var(--amb)" },
    emoji: "⚡",
    title: "Build skills that last",
    desc: "Treatment develops insight, coping strategies, and self-understanding that clients can draw on independently. The goal is capability and clarity that carries forward after sessions end.",
  },
];

export function Approach() {
  return (
    <section id="approach" style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div className="apprgrid">
          <div className="fi">
            <div className="slabel">How Kelly Works</div>
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
            <img
              src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7cd4a7d9-e8ec-4f7a-88ed-74fc2d48b0f3.png"
              alt="Black woman sound healing illustration in coloring-book style"
              width={540}
              height={540}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
