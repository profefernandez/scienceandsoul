const groups = [
  {
    emoji: "🌱",
    title: "Teens & Adults",
    desc: "Kelly works primarily with teens and adults dealing with trauma, depression, self-harm, mood disorders, grief, and attachment issues — meeting each person exactly where they are.",
    tags: [
      { cls: "pill ps", label: "Trauma" },
      { cls: "pill ps", label: "Depression" },
      { cls: "pill ps", label: "Grief" },
    ],
  },
  {
    emoji: "🌈",
    title: "LGBTQIA+ Community",
    desc: "Kelly specifically serves the LGBTQIA+ community — providing a genuinely affirming space for gender identity, sexual orientation, and the full spectrum of human expression.",
    tags: [
      { cls: "pill pl", label: "Affirming" },
      { cls: "pill pl", label: "Identity" },
      { cls: "pill pl", label: "Safe Space" },
    ],
  },
  {
    emoji: "🌸",
    title: "People Seeking Depth",
    desc: "The therapy here is intentionally deeper than symptom management — emphasizing insight, safety, strengths, and self-understanding for those ready to go beyond the surface.",
    tags: [
      { cls: "pill pt", label: "Insight" },
      { cls: "pill pt", label: "Spiritual" },
      { cls: "pill pt", label: "Whole-Person" },
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
            Inclusive, affirming, and <em>identity-safe care</em>
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
