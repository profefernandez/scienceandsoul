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
            <div className="heyebrow">Houston, Texas · Holistic Therapy</div>
            <h1 className="htitle">
              Healing beyond<br />the <em>diagnosis</em>
            </h1>
            <p className="hdesc">
              Evidence-based counseling woven with spiritual healing, identity work, and whole-person care &mdash; restoring wholeness at the level of the self. You are more than your diagnosis.
            </p>
            <div className="hacts">
              <a href="#contact" className="btn btnp btnlg">Start Your Healing</a>
              <a href="#services" className="btn btno btnlg">Explore Services</a>
            </div>
          </div>
          <div className="himgwrap fi">
            <div className="hframe" style={{ position: "relative" }}>
              <img
                src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/e4bd94ce-72e8-490a-9d84-147dae6c3020.png"
                alt="Coloring-book style illustration of a Black woman meditating with chakra alignment"
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
