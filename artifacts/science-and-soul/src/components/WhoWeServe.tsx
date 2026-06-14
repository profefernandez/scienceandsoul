const groups = [
  {
    emoji: "🌱",
    title: "Teens & Adolescents",
    desc: "Navigating identity, peer relationships, depression, self-harm, and the transition into adulthood — with compassion that meets them exactly where they are.",
    tags: [
      { cls: "pill ps", label: "Self-Harm" },
      { cls: "pill ps", label: "Identity" },
      { cls: "pill ps", label: "Anxiety" },
    ],
  },
  {
    emoji: "🌸",
    title: "Adults",
    desc: "Trauma survivors, those managing mood disorders, life transitions, grief, relationship challenges, and anyone seeking deeper self-understanding and spiritual alignment.",
    tags: [
      { cls: "pill pt", label: "Trauma" },
      { cls: "pill pt", label: "Grief" },
      { cls: "pill pt", label: "Life Transitions" },
    ],
  },
  {
    emoji: "🌈",
    title: "LGBTQIA+ Community",
    desc: "A genuinely affirming space — not just as policy, but as lived practice. Supporting gender identity, sexual orientation, and the full spectrum of human expression.",
    tags: [
      { cls: "pill pl", label: "Affirming" },
      { cls: "pill pl", label: "Gender" },
      { cls: "pill pl", label: "Identity" },
    ],
  },
];

export function WhoWeServe() {
  return (
    <section id="serve">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Who We Welcome</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            A Space for <em>Every Soul</em>
          </h2>
        </div>
        <div className="servegrid">
          {groups.map((g) => (
            <div className="svcard fi" key={g.title}>
              <div className="svicon">{g.emoji}</div>
              <h3 className="svtitle">{g.title}</h3>
              <p className="svdesc">{g.desc}</p>
              <div className="svtags">
                {g.tags.map((t) => (
                  <span className={t.cls} key={t.label}>{t.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
