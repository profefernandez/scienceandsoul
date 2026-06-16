const testimonials = [
  {
    text: "\u201cI wanted a site that felt safe, beautiful, and spiritually grounded. This approach gives the brand that softness without losing professionalism. I feel seen from the very first visit.\u201d",
    author: "\u2014 M.T., Houston, TX",
  },
  {
    text: "\u201cThe imagery changes the emotional center of the experience. It makes the story feel specific, affirming, and intentional \u2014 like this practice was built for someone who looks like me.\u201d",
    author: "\u2014 J.R., Cypress, TX",
  },
  {
    text: "\u201cThe approach still feels grounded in real therapy, but the art direction and spiritual layer make it memorable instead of generic. I finally found the depth I was looking for.\u201d",
    author: "\u2014 A.K., Houston, TX",
  },
];

export function Testimonials() {
  return (
    <section style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Reflections</div>
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
