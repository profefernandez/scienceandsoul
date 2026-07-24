import { imgSrc, imgSrcSet } from "../lib/img";

const rights = [
  { num: "01", text: "Know your expected costs before services begin." },
  { num: "02", text: "Receive your estimate in writing at least 1 business day before your appointment." },
  { num: "03", text: "Dispute a bill that is $400 or more above your estimate." },
  { num: "04", text: "Keep a copy of your estimate for your records." },
  { num: "05", text: "Ask questions about your estimate at any time — no special language required." },
  { num: "06", text: "Proceed with services — or not — with no obligation." },
];

const estimateRows = [
  { label: "Provider", value: "Science & Soul Counseling & Wellness, PLLC" },
  { label: "Service", value: "Individual Therapy session" },
  { label: "CPT Code", value: "90834 (45 min) · 90837 (60 min)" },
  { label: "Rate Per Session", value: "$150" },
  { label: "Estimated Sessions", value: "Approx. 24 sessions over 12 months (bi-weekly)" },
  { label: "Estimated 12-Month Total", value: "$3,600" },
  { label: "Valid For", value: "12 months from date of issue" },
];

export function GoodFaith() {
  return (
    <section id="goodfaith" style={{ background: "color-mix(in srgb, var(--sf2) 62%, transparent)", borderTop: "1.5px solid var(--dv)" }}>
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

export function EstimateRights() {
  return (
    <section id="estimate-rights">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>No Surprises</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Your Estimate &amp; <em>Your Rights</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            Here&rsquo;s what your written estimate will cover — and the rights that protect you every step of the way.
          </p>
        </div>
        <div className="feesgrid">
          <div className="fcard fi">
            <h3 className="fcardtitle">What your estimate will include</h3>
            <table className="ftable">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Example Good Faith Estimate details
              </caption>
              <tbody>
                {estimateRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" style={{ textAlign: "left", fontWeight: 600 }}>{r.label}</th>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "var(--sp6)", fontSize: "var(--tx-sm)", color: "var(--inkm)" }}>
              Actual session frequency and total will be discussed and agreed upon with your therapist. If your final bill is $400 or more above this estimate, you have the right to dispute the charge.
            </div>
          </div>
          <div className="fcard fi">
            <h3 className="fcardtitle">Know your rights</h3>
            <ul className="ppillars" role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {rights.map((r) => (
                <li className="ppillar" key={r.num}>
                  <span aria-hidden="true" style={{ fontFamily: "var(--fd)", fontWeight: 700, color: "var(--teal)", fontSize: "var(--tx-base)", flexShrink: 0 }}>{r.num}</span>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
