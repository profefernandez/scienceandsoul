import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact">
      <div className="ww">
        <div className="cgrid">
          <div className="fi">
            <div className="slabel">Contact</div>
            <h2 className="stitle">Begin the <em>healing journey</em></h2>
            <p className="sdesc">
              Science and Soul Counseling &amp; Wellness, PLLC offers a free 15-minute consultation. Reach out today &mdash; without judgment, without pressure.
            </p>
            <div className="ciitem">
              <div className="ciicon">📍</div>
              <div>
                <div className="cilabel">Location</div>
                <div className="civalue">
                  9950 Cypresswood Drive<br />Houston, TX 77070
                </div>
              </div>
            </div>
            <div className="ciitem">
              <div className="ciicon">📞</div>
              <div>
                <div className="cilabel">Phone</div>
                <a href="tel:8325011687" className="civalue" style={{ color: "var(--teal)" }}>
                  (832) 501-1687
                </a>
              </div>
            </div>
            <div className="ciitem">
              <div className="ciicon">🌐</div>
              <div>
                <div className="cilabel">Psychology Today</div>
                <a
                  href="https://www.psychologytoday.com/us/therapists/science-and-soul-counseling-wellness-pllc-houston-tx/980955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="civalue"
                  style={{ color: "var(--teal)" }}
                >
                  View Full Profile &rarr;
                </a>
              </div>
            </div>
            <div className="ciitem">
              <div className="ciicon">🌙</div>
              <div>
                <div className="cilabel">Hours</div>
                <div className="civalue">
                  Late-night appointments available<br />
                  <span style={{ fontSize: "var(--tx-sm)", color: "var(--inkm)" }}>Serving clients with busy schedules</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fi">
            <div className="fwrap">
              <h3 style={{ fontFamily: "var(--fd)", fontSize: "var(--tx-xl)", marginBottom: "var(--sp6)" }}>
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
