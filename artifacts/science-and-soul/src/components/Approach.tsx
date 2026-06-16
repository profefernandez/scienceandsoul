const steps = [
  {
    iconStyle: { background: "var(--teall)", color: "var(--teal)" },
    emoji: "🔬",
    title: "See the full story",
    desc: "Clients are framed as whole people with identity, history, and spirit — not only diagnoses. Healing begins by honoring the complete human being.",
  },
  {
    iconStyle: { background: "var(--lavl)", color: "var(--lav)" },
    emoji: "✨",
    title: "Use clinical tools",
    desc: "A holistic and eclectic mix of recognized therapy approaches — CBT, DBT, psychodynamic, attachment, mindfulness — shaped precisely to each person's needs.",
  },
  {
    iconStyle: { background: "var(--sagel)", color: "var(--sage)" },
    emoji: "🌿",
    title: "Invite spiritual healing",
    desc: "The care model expands into spirituality, energy work, and healing beyond surface symptoms — reaching the deeper dimensions of self, identity, and essence.",
  },
  {
    iconStyle: { background: "var(--ambl)", color: "var(--amb)" },
    emoji: "⚡",
    title: "Reconnect with essence",
    desc: "The healing journey centers restoration of self, insight, safety, and deeper identity-level work — helping clients return to who they truly are.",
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
              Healing that sees<br /><em>the whole individual</em>
            </h2>
            <p style={{ fontSize: "var(--tx-base)", color: "var(--inkm)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "52ch" }}>
              The approach is eclectic, integrative, and deeply personalized — philosophy first, then clinical tools, then spiritual care. Healing happens at the level of identity, energy, and spiritual essence.
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
