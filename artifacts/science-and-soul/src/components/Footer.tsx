import { Link } from "wouter";
import { Logo } from "./Logo";

interface FooterProps {
  linkPrefix?: string;
}

export function Footer({ linkPrefix = "" }: FooterProps) {
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
            <p className="fbranddesc">Where evidence-based healing meets the depth of the human soul. Kelly Nelson, LCSW-S &mdash; Houston, TX.</p>
            <div style={{ display: "flex", gap: "var(--sp2)", flexWrap: "wrap" }}>
              <span className="pill pt">LCSW-S Licensed</span>
              <span className="pill ps">TX #67591</span>
              <span className="pill pl">LGBTQIA+ Affirming</span>
            </div>
          </div>
          <div>
            <div className="fcoltitle">Services</div>
            <ul className="flinks" role="list">
              <li><a href={`${linkPrefix}#services`}>Chakra Alignment</a></li>
              <li><a href={`${linkPrefix}#services`}>Sound Bowl Healing</a></li>
              <li><a href={`${linkPrefix}#services`}>Reiki &amp; Energy Healing</a></li>
              <li><a href={`${linkPrefix}#services`}>Evidence-Based Therapy</a></li>
              <li><a href={`${linkPrefix}#services`}>Group Therapy</a></li>
            </ul>
          </div>
          <div>
            <div className="fcoltitle">Information</div>
            <ul className="flinks" role="list">
              <li><a href={`${linkPrefix}#about`}>About Kelly</a></li>
              <li><a href={`${linkPrefix}#approach`}>Our Approach</a></li>
              <li><a href={`${linkPrefix}#fees`}>Fees &amp; Insurance</a></li>
              <li><a href={`${linkPrefix}#serve`}>Who We Serve</a></li>
            </ul>
          </div>
          <div>
            <div className="fcoltitle">Contact</div>
            <ul className="flinks" role="list">
              <li><a href="tel:8325011687">(832) 501-1687</a></li>
              <li><a href="mailto:scienceandsoulcounseling@gmail.com">scienceandsoulcounseling@gmail.com</a></li>
              <li><a href={`${linkPrefix}#contact`}>Send a Message</a></li>
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
                9950 Cypresswood Dr, Suite 203<br />Houston, TX 77070
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="fbottxt">
            &copy; 2026 Science and Soul Counseling &amp; Wellness, PLLC &middot; Kelly Nelson, LCSW-S &middot; All rights reserved.
          </div>
          <ul className="fbotlinks" role="list">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/hipaa">HIPAA Notice</Link></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
