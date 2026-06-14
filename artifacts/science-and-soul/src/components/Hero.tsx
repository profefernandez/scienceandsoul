export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="1" fill="currentColor" opacity=".07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" color="var(--ink)" />
        </svg>
      </div>
      <div className="ww">
        <div className="hgrid">
          <div className="fi">
            <div className="heyebrow">✦ Where Science Meets Soul</div>
            <h1 className="htitle">
              Healing Beyond<br />the <em>Diagnosis</em>
            </h1>
            <p className="hdesc">
              Evidence-based therapy woven with chakra alignment, sound bowl healing, and Reiki &mdash; restoring wholeness at the level of identity and essence. You are more than your diagnosis.
            </p>
            <div className="hacts">
              <a href="#contact" className="btn btnp btnlg">Book a Free Consult</a>
              <a href="#services" className="btn btno btnlg">Explore Services</a>
            </div>
          </div>
          <div className="himgwrap fi">
            <div className="hframe" style={{ position: "relative" }}>
              <img
                src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0aac1017-e6de-46ee-9995-5ccac1fbe9ee.png"
                alt="Coloring book illustration of a meditating woman with chakra symbols and botanical elements"
                width={600}
                height={600}
                loading="eager"
              />
              <div className="hbadge">
                <span style={{ fontSize: "1.2rem" }}>⭐</span>
                <div>
                  <div style={{ fontSize: "var(--tx-xs)", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: ".06em" }}>7+ Years</div>
                  <div style={{ fontSize: "var(--tx-xs)", color: "var(--inkm)" }}>Clinical Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
