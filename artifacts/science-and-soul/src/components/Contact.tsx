import { EmailKellyButton } from "./EmailKellyButton";
import { imgSrc, imgSrcSet } from "../lib/img";

export function Contact() {
  return (
    <section id="contact">
      <div className="ww">
        <div className="fi" style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Get in Touch</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Schedule a free <em>15-minute consultation</em>
          </h2>
        </div>
        <div className="env-wrap fi">
          <div className="env">
            <div className="env-flap" aria-hidden="true" />
            <div className="env-letter">
              <p className="env-text">
                Reach out to get started — Kelly can answer questions about scheduling, services, and fit before a first appointment. She typically responds within 24 hours.
              </p>
              <EmailKellyButton btnClass="btn btnp btnlg" label="Schedule Now" />
            </div>
            <img
              className="env-garland"
              src={imgSrc("env-garland", 768)}
              srcSet={imgSrcSet("env-garland", [1024, 768, 480])}
              sizes="(max-width: 480px) 90vw, 620px"
              alt=""
              aria-hidden="true"
              width={620}
              height={338}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
