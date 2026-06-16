export function Philosophy() {
  return (
    <section className="philos" id="philosophy">
      <div className="ww">
        <div className="philos-inner">
          <div className="philos-img fi">
            <img
              src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/1d80a0ab-3752-4880-bc0a-df1780b022eb.png"
              alt="Black woman therapist with Black woman client in a soulful therapy setting"
              width={520}
              height={520}
              loading="lazy"
            />
          </div>
          <div className="fi">
            <div className="slabel">Our Philosophy</div>
            <h2 className="stitle">
              Where evidence-based care<br />meets <em>inner spiritual restoration</em>
            </h2>
            <p className="ptext">
              Kelly Nelson is a Licensed Clinical Social Worker serving teens, adults, and the LGBTQIA+ community. She uses a holistic, eclectic approach that includes psychodynamic work, attachment theory, person-centered therapy, mindfulness, CBT, DBT, and spirituality.
            </p>
            <div className="ppillars">
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--teal)" }} />
                <div><strong>Evidence-based foundation.</strong> Science forms the grounded clinical base for treatment, including CBT, DBT, trauma-focused care, and insight-oriented therapy.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--lav)" }} />
                <div><strong>Spiritual integration.</strong> The clinical foundation extends into chakra alignment, Reiki, sound healing, and deeper work around identity and essence.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--amb)" }} />
                <div><strong>Whole-person healing.</strong> Kelly emphasizes compassion, non-judgment, insight, and helping clients use their strengths rather than reducing them to a diagnosis.</div>
              </div>
            </div>
            <div className="ppills">
              <span className="pill pt">Holistic</span>
              <span className="pill pl">Trauma-Informed</span>
              <span className="pill ps">Person-Centered</span>
              <span className="pill pa">Spiritually Integrative</span>
              <span className="pill pb">LGBTQIA+ Affirming</span>
              <span className="pill pr">Culturally Sensitive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
