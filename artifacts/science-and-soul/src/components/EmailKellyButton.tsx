import { useState, useRef, useEffect } from "react";

export const KELLY_EMAIL = "kelly@scienceandsoulcounseling.com";
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

interface EmailKellyButtonProps {
  btnClass?: string;
  label?: string;
}

export function EmailKellyButton({
  btnClass = "btn btnp",
  label = "Email Kelly",
}: EmailKellyButtonProps) {
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
        {label}
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
