import { EmailKellyButton } from "./EmailKellyButton";

export function Contact() {
  return (
    <section id="contact">
      <div className="ww">
        <div className="fi" style={{ textAlign: "center", maxWidth: "52rem", marginInline: "auto" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Get in Touch</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Schedule a free <em>15-minute consultation</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            Reach out to get started — Kelly can answer questions about scheduling, services, and fit before a first appointment. She typically responds within 24 hours.
          </p>
          <div style={{ marginTop: "var(--sp8)", display: "flex", justifyContent: "center" }}>
            <EmailKellyButton btnClass="btn btnp btnlg" label="Schedule Now" />
          </div>
        </div>
      </div>
    </section>
  );
}
