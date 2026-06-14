import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="ww">
        <div className="footerinner">
          <div>
            <div className="nlogo" style={{ marginBottom: 0 }}>
              <Logo size={36} />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span className="ntitle">Science &amp; Soul</span>
                <span className="nsub">Counseling &amp; Wellness, PLLC</span>
              </div>
            </div>
            <p className="fbranddesc">Where evidence-based healing meets the depth of the human soul. Kelly Nelson, LCSW &mdash; Houston, TX.</p>
            <div style={{ display: "flex", gap: "var(--sp2)", flexWrap: "wrap" }}>
              <span className="pill pt" style={{ fontSize: ".65rem" }}>LCSW Licensed</span>
              <span className="pill ps" style={{ fontSize: ".65rem" }}>TX #67591</span>
              <span className="pill pl" style={{ fontSize: ".65rem" }}>LGBTQIA+ Affirming</span>
            </div>
          </div>
          <div>
            <div className="fcoltitle">Services</div>
            <ul className="flinks" role="list">
              <li><a href="#services">Chakra Alignment</a></li>
              <li><a href="#services">Sound Bowl Healing</a></li>
              <li><a href="#services">Reiki &amp; Energy Healing</a></li>
              <li><a href="#services">Evidence-Based Therapy</a></li>
              <li><a href="#services">Couples Therapy</a></li>
            </ul>
          </div>
          <div>
            <div className="fcoltitle">Information</div>
            <ul className="flinks" role="list">
              <li><a href="#about">About Kelly</a></li>
              <li><a href="#approach">Our Approach</a></li>
              <li><a href="#fees">Fees &amp; Insurance</a></li>
              <li><a href="#serve">Who We Serve</a></li>
            </ul>
          </div>
          <div>
            <div className="fcoltitle">Contact</div>
            <ul className="flinks" role="list">
              <li><a href="tel:8325011687">(832) 501-1687</a></li>
              <li><a href="#contact">Send a Message</a></li>
              <li>
                <a
                  href="https://www.psychologytoday.com/us/therapists/science-and-soul-counseling-wellness-pllc-houston-tx/980955"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Psychology Today
                </a>
              </li>
              <li style={{ color: "var(--inkf)", fontSize: "var(--tx-xs)", lineHeight: 1.6 }}>
                9950 Cypresswood Dr<br />Houston, TX 77070
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="fbottxt">
            &copy; 2025 Science and Soul Counseling &amp; Wellness, PLLC &middot; Kelly Nelson, LCSW &middot; All rights reserved.
          </div>
          <ul className="fbotlinks" role="list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">HIPAA Notice</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
