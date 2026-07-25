import { imgSrc, imgSrcSet } from "../lib/img";

export function Philosophy() {
  return (
    <section className="philos band" id="philosophy">
      <div className="ww">
        <div className="philos-inner">
          <div className="philos-img fi">
            <img
              src={imgSrc("philosophy", 1024)}
              srcSet={imgSrcSet("philosophy", [480, 768, 1024])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Coloring-book style illustration of Tibetan singing bowls surrounded by lotus flowers, amethyst crystals, and a mandala — representing sound bowl healing"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div className="fi">
            <h2 className="stitle">
              Clinical rigor and spiritual<br />practice, <em>working together</em>
            </h2>
            <div className="ppillars">
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--teal)" }} />
                <div><strong>Clinical Foundation.</strong> Kelly draws on CBT, DBT, trauma-focused care, and psychodynamic therapy, selecting methods tailored to each client's specific goals.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--lav)" }} />
                <div><strong>Spiritual Practices.</strong> Sessions can include chakra alignment, Reiki, and sound bowl healing, addressing emotional and energetic aspects of wellbeing.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--amb)" }} />
                <div><strong>Client Strengths.</strong> Kelly builds on the insight and resilience clients already possess, developing skills that carry forward after sessions.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
