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
              <div style={{ display: "flex", flexDirection: "column", lineHeight: "var(--lh-tight)" }}>
                <span className="ntitle">Science &amp; Soul</span>
                <span className="nsub">Counseling &amp; Wellness, PLLC</span>
              </div>
            </div>
            <p className="fbranddesc">
              Kelly Nelson, LCSW-S<br />
              Texas License #67591
            </p>
          </div>
          <div>
            <div className="fcoltitle">Business Information</div>
            <ul className="flinks" role="list">
              <li><a href={`${linkPrefix}#about`}>About Kelly</a></li>
              <li><a href={`${linkPrefix}#approach`}>Our Approach</a></li>
              <li><a href={`${linkPrefix}#contact`}>Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="fcoltitle">Services</div>
            <ul className="flinks" role="list">
              <li><a href={`${linkPrefix}#services`}>Our Services</a></li>
              <li><a href={`${linkPrefix}#fees`}>Fees &amp; Insurance</a></li>
              <li><a href={`${linkPrefix}#goodfaith`}>Good Faith Estimate</a></li>
              <li><a href={`${linkPrefix}#faq`}>FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="fbottxt">
            &copy; 2026 Science and Soul Counseling &amp; Wellness, PLLC &middot; All rights reserved.
          </div>
          <div className="fbottxt">
            <a href={`${linkPrefix}privacy`}>Privacy Policy</a>
            {" \u00b7 "}
            <a href={`${linkPrefix}hipaa`}>HIPAA Notice</a>
            {" \u00b7 "}
            <a href={`${linkPrefix}accessibility`}>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
