import { imgSrc, imgSrcSet } from "../lib/img";

const heroImg = imgSrc("hero", 1024);

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
              srcSet={imgSrcSet("hero", [480, 768, 1024, 1254])}
              sizes="(min-width: 768px) 736px, 100vw"
              alt="Coloring-book style illustration of three Tibetan singing bowls surrounded by lotus flowers, amethyst crystals, a mandala, and flowering vines — representing sound bowl healing"
              width={1024}
              height={1536}
              loading="eager"
              fetchPriority="high"
            />
          </figure>
          <p className="hdesc hcdesc">
            Individual, family, and couples therapy in Houston — evidence-based care that honors mind, body, and spirit. Serving pre-teens, adolescents, adults, families, and the LGBTQIA+ community. <strong>Late-evening and late-night appointments available for clients who work long or nontraditional hours.</strong>
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
