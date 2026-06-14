const steps = [
  {
    iconStyle: { background: "var(--teall)", color: "var(--teal)" },
    emoji: "🔬",
    title: "Science as Foundation",
    desc: "Evidence-based modalities (CBT, DBT, psychodynamic, trauma-focused) provide the clinical backbone of every treatment plan.",
  },
  {
    iconStyle: { background: "var(--lavl)", color: "var(--lav)" },
    emoji: "✨",
    title: "Soul as Destination",
    desc: "We seek deep inner spiritual healing — identity, essence, purpose. You are not reducible to your diagnosis; you are a whole, sacred being.",
  },
  {
    iconStyle: { background: "var(--sagel)", color: "var(--sage)" },
    emoji: "🌿",
    title: "Non-Judgmental Space",
    desc: "A safe, affirming environment for full self-expression — LGBTQIA+ affirming, culturally sensitive, and radically compassionate.",
  },
  {
    iconStyle: { background: "var(--ambl)", color: "var(--amb)" },
    emoji: "⚡",
    title: "Energy Psychology Integration",
    desc: "Chakra work, Reiki, and sound healing are integrated alongside clinical modalities for complete body-mind-spirit alignment.",
  },
];

export function Approach() {
  return (
    <section id="approach" style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div className="apprgrid">
          <div className="fi">
            <div className="slabel">How We Heal</div>
            <h2 className="stitle">
              More Than a Diagnosis &mdash;<br /><em>The Whole Individual</em>
            </h2>
            <p style={{ fontSize: "var(--tx-base)", color: "var(--inkm)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "52ch" }}>
              Our approach is eclectic, integrative, and deeply personalized. We start with who you are &mdash; not what you&rsquo;ve been labeled. Healing happens at the level of identity, energy, and spiritual essence.
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
              src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/91a56b49-99a2-433d-b3a2-21c0debedf75.png"
              alt="Sound bowl crystal healing coloring book illustration"
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
