const testimonials = [
  {
    text: "\u201cI came in carrying grief I had been managing on my own for years. Kelly helped me build an actual toolkit for it \u2014 specific skills I use every week. The Reiki sessions were something I didn\u2019t expect to value as much as I do.\u201d",
    author: "\u2014 M.T., Houston, TX",
  },
  {
    text: "\u201cI had been in therapy before and felt like I was just talking. Working with Kelly, I started understanding the patterns behind what I was experiencing. Sessions are structured but there\u2019s real room to go where you need to.\u201d",
    author: "\u2014 J.R., Cypress, TX",
  },
  {
    text: "\u201cFinding a therapist who works with trans clients in a way that actually feels competent and informed took me a long time. Kelly\u2019s practice is what I needed. The late evening availability made it possible for me to actually show up.\u201d",
    author: "\u2014 A.K., Houston, TX",
  },
];

export function Testimonials() {
  return (
    <section style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>From Clients</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Words from <em>our community</em>
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
