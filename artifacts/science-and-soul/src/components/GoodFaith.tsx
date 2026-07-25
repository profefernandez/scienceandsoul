import { imgSrc, imgSrcSet } from "../lib/img";

export function GoodFaith() {
  return (
    <section id="goodfaith" className="band bandnb">
      <div className="ww">
        <div className="philos-inner">
          <div className="fi">
            <div className="slabel">Transparency</div>
            <h2 className="stitle">
              Good Faith <em>Estimate</em>
            </h2>
            <p className="sdesc">
              Under federal law, you have the right to know what your care will cost — before your first session. No surprises. Just clarity.
            </p>
            <div className="ppillars">
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--teal)" }} />
                <div><strong>What it means for you.</strong> A Good Faith Estimate is a written document that tells you exactly what your therapy sessions are expected to cost — before you begin. If you pay out of pocket, or aren&rsquo;t using insurance for therapy, this applies to you.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--lav)" }} />
                <div><strong>The No Surprises Act.</strong> Under federal law, licensed healthcare providers — including therapists — provide a Good Faith Estimate to clients who are uninsured or not using insurance. You&rsquo;ll receive yours in writing before your first session, generally 1&ndash;3 business days after scheduling, depending on how far in advance your appointment is booked.</div>
              </div>
              <div className="ppillar">
                <div className="pdot" style={{ background: "var(--amb)" }} />
                <div>
                  <strong>Official resources.</strong>{" "}
                  <a href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)", fontWeight: 600 }}>
                    cms.gov/nosurprises ↗
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.tdi.texas.gov/medical-billing/surprise-balance-billing.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)", fontWeight: 600 }}>
                    Texas Department of Insurance ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="philos-img fi">
            <img
              src={imgSrc("goodfaith", 1024)}
              srcSet={imgSrcSet("goodfaith", [480, 768, 1024, 1280])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Watercolor illustration of a therapist warmly handing a client a written cost estimate in a cozy counseling office"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              style={{ borderRadius: "var(--r2xl)", boxShadow: "var(--shlg)", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
