const groups = [
  {
    emoji: "🌱",
    title: "Teens & adults",
    desc: "Kelly works with teenagers and adults on trauma, depression, anxiety, mood disorders, ADHD/ADD, grief, self-harm, attachment and personality disorders, suicidal ideation, stress, and relationship challenges. Sessions are paced to what each person is ready for and built around their specific goals.",
    tags: [
      { cls: "pill ps", label: "Trauma" },
      { cls: "pill ps", label: "Depression" },
      { cls: "pill ps", label: "ADHD / ADD" },
      { cls: "pill ps", label: "Grief" },
    ],
  },
  {
    emoji: "🌈",
    title: "LGBTQIA+ community",
    desc: "Kelly provides affirming care for LGBTQIA+ clients, including work on gender identity, sexual orientation, family dynamics, and the specific stressors that come with navigating those experiences. Her training and clinical focus reflect her commitment to this community.",
    tags: [
      { cls: "pill pl", label: "Affirming" },
      { cls: "pill pl", label: "Gender Identity" },
      { cls: "pill pl", label: "LGBTQIA+" },
    ],
  },
  {
    emoji: "🌸",
    title: "Clients seeking integrative care",
    desc: "Kelly works with clients who want evidence-based clinical therapy combined with spiritual practices. Sessions can include talk therapy, Reiki, chakra alignment, sound bowl healing, or any combination that serves the client's goals.",
    tags: [
      { cls: "pill pt", label: "Integrative" },
      { cls: "pill pt", label: "Spiritual" },
      { cls: "pill pt", label: "Couples" },
    ],
  },
];

export function WhoWeServe() {
  return (
    <section id="serve">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Who Kelly Works With</div>
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
