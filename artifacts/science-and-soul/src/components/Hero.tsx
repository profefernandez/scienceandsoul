const heroImg = `${import.meta.env.BASE_URL}hero-illustration.png`;

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
        <div className="hcenter fi">
          <div className="heyebrow">Houston, Texas · Licensed Clinical Social Worker</div>
          <h1 className="htitle hctitle">Therapy for the whole self</h1>
          <figure className="hfeature">
            <img
              className="hfeatimg"
              src={heroImg}
              alt="Watercolor illustration of a therapy session at Science &amp; Soul — a counselor and client in a warm, plant-filled room with books on neuroscience and healing, a brain diagram, a lotus, and the words 'You are whole. You are enough. You are becoming.'"
              width={1254}
              height={1254}
              loading="eager"
            />
          </figure>
          <p className="hdesc hcdesc">
            Individual and couples therapy in Houston — evidence-based care that honors mind, body, and spirit. Serving teens, adults, and the LGBTQIA+ community.
          </p>
          <div className="hacts hcacts">
            <a href="#contact" className="btn btnp btnlg">Book a Free Consult</a>
            <a href="#services" className="btn btno btnlg">Explore Services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
