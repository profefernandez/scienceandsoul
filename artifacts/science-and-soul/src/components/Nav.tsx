import { useState, useRef, useEffect } from "react";
import { Logo } from "./Logo";

interface NavProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  linkPrefix?: string;
}

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About Kelly" },
  { href: "#fees", label: "Fees" },
  { href: "#contact", label: "Contact" },
];

const KELLY_EMAIL = "scienceandsoulcounseling@gmail.com";
const SUBJECT = "New Client Inquiry — Science & Soul Counseling";
const SUBJECT_ENC = encodeURIComponent(SUBJECT);

const emailOptions = [
  {
    label: "Open in Gmail",
    icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    href: `https://mail.google.com/mail/?view=cm&to=${KELLY_EMAIL}&su=${SUBJECT_ENC}`,
  },
  {
    label: "Open in Outlook",
    icon: "https://res.cdn.office.net/assets/mail/pwa/v1/pngs/favicon_16x16.png",
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${KELLY_EMAIL}&subject=${SUBJECT_ENC}`,
  },
  {
    label: "Open in Yahoo Mail",
    icon: "https://s.yimg.com/rz/l/favicon.ico",
    href: `https://compose.mail.yahoo.com/?to=${KELLY_EMAIL}&subject=${SUBJECT_ENC}`,
  },
  {
    label: "Use default mail app",
    icon: null,
    href: `mailto:${KELLY_EMAIL}?subject=${SUBJECT_ENC}`,
  },
];

function BookNowMenu({ btnClass = "btn btnp" }: { btnClass?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  function handleCopy() {
    navigator.clipboard.writeText(KELLY_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="bkdwrap" ref={wrapRef}>
      <button
        className={btnClass}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Book Now
      </button>
      {open && (
        <div className="bkdmenu" role="menu">
          <div className="bkdtitle">Email Kelly</div>
          <div className="bkdaddr">{KELLY_EMAIL}</div>
          {emailOptions.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              className="bkditem"
              target={opt.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {opt.icon ? (
                <img src={opt.icon} alt="" width={16} height={16} className="bkdico" />
              ) : (
                <span className="bkdico bkdicosym">✉</span>
              )}
              {opt.label}
            </a>
          ))}
          <div className="bkddiv" />
          <button className="bkditem bkdcopy" onClick={handleCopy} role="menuitem">
            <span className="bkdico bkdicosym">{copied ? "✓" : "⎘"}</span>
            {copied ? "Copied!" : "Copy email address"}
          </button>
        </div>
      )}
    </div>
  );
}

export function Nav({ theme, onToggleTheme, linkPrefix = "" }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const homeHref = linkPrefix || "#";

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="ww">
          <div className="navi">
            <a href={homeHref} className="nlogo" aria-label="Science and Soul Counseling and Wellness">
              <Logo size={44} />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span className="ntitle">Science &amp; Soul</span>
                <span className="nsub">Counseling &amp; Wellness</span>
              </div>
            </a>
            <ul className="nlinks" role="list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={linkPrefix + l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
            <div className="nact">
              <button
                className="tt"
                onClick={onToggleTheme}
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <BookNowMenu />
              <button
                className="burg"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`mnav${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="mnav-x"
          onClick={closeMobile}
          aria-label="Close menu"
        >
          &times;
        </button>
        <ul className="mnav-links" role="list">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={linkPrefix + l.href} onClick={closeMobile}>{l.label}</a>
            </li>
          ))}
        </ul>
        <BookNowMenu btnClass="btn btnp btnlg" />
      </div>
    </>
  );
}
