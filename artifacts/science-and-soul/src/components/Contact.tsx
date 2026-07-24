import { EmailKellyButton } from "./EmailKellyButton";

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
            <div className="env-seal" aria-hidden="true">S&amp;S</div>
          </div>
        </div>
      </div>
    </section>
  );
}
