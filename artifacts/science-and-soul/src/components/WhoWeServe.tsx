const groups = [
  {
    emoji: "🌱",
    title: "Teens & Adults",
    desc: "Support for trauma, anxiety, ADHD/ADD, grief, and more.",
    tags: [
      { cls: "pill ps", label: "Trauma" },
      { cls: "pill ps", label: "Anxiety" },
      { cls: "pill ps", label: "ADHD / ADD" },
      { cls: "pill ps", label: "Grief" },
    ],
  },
  {
    emoji: "🌈",
    title: "LGBTQIA+ Community",
    desc: "Affirming care addressing identity, family dynamics, and unique stressors.",
    tags: [
      { cls: "pill pl", label: "Affirming" },
      { cls: "pill pl", label: "Gender Identity" },
      { cls: "pill pl", label: "LGBTQIA+" },
    ],
  },
  {
    emoji: "🌸",
    title: "Clients Seeking Integrative Care",
    desc: "Combining clinical therapy with spiritual practices to meet diverse needs.",
    tags: [
      { cls: "pill pt", label: "Integrative" },
      { cls: "pill pt", label: "Spiritual" },
      { cls: "pill pt", label: "Holistic" },
    ],
  },
];

export function WhoWeServe() {
  return (
    <section id="serve">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Teens, adults, and the<br /><em>LGBTQIA+ community</em>
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
