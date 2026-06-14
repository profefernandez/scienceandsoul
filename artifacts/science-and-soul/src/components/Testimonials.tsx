const testimonials = [
  {
    text: "\u201cWorking with Kelly changed how I see myself \u2014 not as a collection of diagnoses, but as a whole person with worth, beauty, and spiritual depth. The combination of therapy and Reiki was unlike anything I had experienced before.\u201d",
    author: "\u2014 M.T., Houston, TX",
  },
  {
    text: "\u201cI came in with trauma I had carried for years. The sound bowl sessions opened something in me that talk therapy alone never could. Science and Soul is the real deal \u2014 holistic, compassionate, and deeply effective.\u201d",
    author: "\u2014 J.R., Cypress, TX",
  },
  {
    text: "\u201cAs a queer person, I\u2019ve had many therapists who were \u2018affirming\u2019 on paper but not in practice. Kelly truly sees me. Her late-night hours were a lifesaver for my schedule. Grateful every single session.\u201d",
    author: "\u2014 A.K., Houston, TX",
  },
];

export function Testimonials() {
  return (
    <section style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Healing Stories</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Words from <em>Our Community</em>
          </h2>
        </div>
        <div className="testigrid">
          {testimonials.map((t) => (
            <div className="tcard fi" key={t.author}>
              <p className="ttext">{t.text}</p>
              <div className="tauthor">{t.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
