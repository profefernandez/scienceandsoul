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
              Clinical rigor and spiritual<br />practice, <em>working together</em>
            </h2>
            <div className="ppillars">
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--teal)" }} />
                <div><strong>Clinical foundation.</strong> Kelly draws on CBT, DBT, trauma-focused care, and psychodynamic therapy, selecting and adapting methods to fit each client's specific goals.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--lav)" }} />
                <div><strong>Spiritual practice.</strong> Sessions can include chakra alignment, Reiki, and sound bowl healing for clients who want to address emotional and energetic dimensions of their wellbeing.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--amb)" }} />
                <div><strong>Client strengths.</strong> Kelly's work builds on the insight, resilience, and capacity for growth that clients already bring, developing skills and understanding that carry forward after sessions end.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
