import { useRef, useState } from "react";
import { Logo } from "./Logo";
import { EmailKellyButton } from "./EmailKellyButton";
import { useFocusTrap } from "../hooks/useFocusTrap";

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

export function Nav({ theme, onToggleTheme, linkPrefix = "" }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const homeHref = linkPrefix || "#";
  const mnavRef = useRef<HTMLDivElement>(null);

  function closeMobile() {
    setMobileOpen(false);
  }

  useFocusTrap(mnavRef, mobileOpen, closeMobile);

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="ww">
          <div className="navi">
            <a href={homeHref} className="nlogo" aria-label="Science and Soul Counseling and Wellness">
              <Logo size={44} />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: "var(--lh-tight)" }}>
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
              <EmailKellyButton label="Book Now" />
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
        ref={mnavRef}
        className={`mnav${mobileOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobileOpen}
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
        <EmailKellyButton btnClass="btn btnp btnlg" label="Book Now" />
      </div>
    </>
  );
}
