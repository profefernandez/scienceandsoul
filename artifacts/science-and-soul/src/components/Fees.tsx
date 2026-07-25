import sessionRatesImg from "@assets/image_1784945903256.png";
import insuranceImg from "@assets/image_1784945930828.png";

export function Fees() {
  return (
    <section id="fees" className="band">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Fees &amp; <em>Insurance</em>
          </h2>
        </div>
        <div className="feesgrid">
          <img
            src={sessionRatesImg}
            alt="Session Rates — Individual Session 50 min $150, Couples Session 50 min $200, Free Consultation 15 min $0. Late Night Availability: evening appointments available for individuals with demanding schedules."
            className="feesimg"
            loading="lazy"
            decoding="async"
          />
          <img
            src={insuranceImg}
            alt="Accepted Insurance: Aetna, United Healthcare, Ascension, Blue Cross and Blue Shield of Texas, Blue Cross Blue Shield of Massachusetts, Carelon Behavioral Health, Cigna, Horizon Blue Cross and Blue Shield of New Jersey, Independence Blue Cross Pennsylvania Virtual National Network, Oscar, Oxford. Don't see your insurance? Contact us — we'll verify your benefits and explore all available options."
            className="feesimg"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
