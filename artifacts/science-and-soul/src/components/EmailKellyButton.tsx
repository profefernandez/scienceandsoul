import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../hooks/useFocusTrap";

export const KELLY_EMAIL = "kelly@scienceandsoulcounseling.com";
const SUBJECT = "New Client Inquiry — Science & Soul Counseling";
const SUBJECT_ENC = encodeURIComponent(SUBJECT);

const emailOptions = [
  {
    label: "Gmail",
    bg: "#EA4335",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=gmail.com",
    href: `https://mail.google.com/mail/?view=cm&to=${KELLY_EMAIL}&su=${SUBJECT_ENC}`,
  },
  {
    label: "Outlook",
    bg: "#0078D4",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=outlook.com",
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${KELLY_EMAIL}&subject=${SUBJECT_ENC}`,
  },
  {
    label: "Yahoo Mail",
    bg: "#6001D2",
    icon: "https://www.google.com/s2/favicons?sz=64&domain=mail.yahoo.com",
    href: `https://compose.mail.yahoo.com/?to=${KELLY_EMAIL}&subject=${SUBJECT_ENC}`,
  },
  {
    label: "Other / Default",
    bg: "#4A7C59",
    icon: null,
    href: `mailto:${KELLY_EMAIL}?subject=${SUBJECT_ENC}`,
  },
];

interface EmailKellyButtonProps {
  btnClass?: string;
  label?: string;
}

function ProviderModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useFocusTrap(overlayRef, true, onClose);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    // Backdrop click-to-close is a mouse-only convenience; keyboard users
    // close via Escape (focus trap) or the labeled Close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div ref={overlayRef} className="epoverlay" role="dialog" aria-modal="true" aria-label="Choose email app" onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="epmodal" onClick={(e) => e.stopPropagation()}>
        <div className="epmodal-head">
          <span className="epmodal-title">Choose your email app</span>
          <button className="epmodal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <p className="epmodal-sub">A message to Kelly will open in the app you choose.</p>
        <div className="epgrid">
          {emailOptions.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              className="epprov"
              target={opt.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={onClose}
            >
              <span className="epprov-ico" style={{ background: opt.bg }}>
                {opt.icon ? (
                  <img src={opt.icon} alt={opt.label} width={32} height={32} />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                )}
              </span>
              <span className="epprov-lbl">{opt.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function EmailKellyButton({
  btnClass = "btn btnp",
  label = "Email Kelly",
}: EmailKellyButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={btnClass}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {label}
      </button>
      {open && <ProviderModal onClose={() => setOpen(false)} />}
    </>
  );
}
