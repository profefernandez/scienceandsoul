import { EmailKellyButton } from "./EmailKellyButton";

export function Contact() {
  return (
    <section id="contact">
      <div className="ww">
        <div className="cgrid">
          <div className="fi">
            <div className="slabel">Get in Touch</div>
            <h2 className="stitle">Schedule a <em>consultation</em></h2>
            <p className="sdesc">
              Kelly offers a free 15-minute phone consultation for new clients. Reach out to get started — she can answer questions about scheduling, services, and fit before a first appointment.
            </p>
          </div>

          <div className="fi">
            <div className="fwrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "var(--sp6)", minHeight: "320px" }}>
              <div style={{ fontSize: "var(--tx-2xl)" }}>✉️</div>
              <h3 style={{ fontFamily: "var(--fd)", fontSize: "var(--tx-xl)", color: "var(--ink)", lineHeight: 1.2 }}>
                Schedule your consultation
              </h3>
              <p style={{ color: "var(--inkm)", maxWidth: "36ch", lineHeight: 1.7 }}>
                Click below to open your preferred email app. Kelly typically responds within 24 hours.
              </p>
              <EmailKellyButton btnClass="btn btnp btnlg" label="Schedule Now" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
