import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface A11ySettings {
  textSize: 0 | 1 | 2 | 3;
  contrast: boolean;
  links: boolean;
  motion: boolean;
  mask: boolean;
  simple: boolean;
}

const DEFAULTS: A11ySettings = {
  textSize: 0,
  contrast: false,
  links: false,
  motion: false,
  mask: false,
  simple: false,
};

const STORAGE_KEY = "a11y-settings";

function loadSettings(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<A11ySettings>;
    return {
      textSize: ([0, 1, 2, 3] as const).includes(parsed.textSize as 0 | 1 | 2 | 3)
        ? (parsed.textSize as 0 | 1 | 2 | 3)
        : 0,
      contrast: Boolean(parsed.contrast),
      links: Boolean(parsed.links),
      motion: Boolean(parsed.motion),
      mask: Boolean(parsed.mask),
      simple: Boolean(parsed.simple),
    };
  } catch {
    return DEFAULTS;
  }
}

function applySettings(s: A11ySettings) {
  const el = document.documentElement;
  el.classList.toggle("a11y-text-1", s.textSize === 1);
  el.classList.toggle("a11y-text-2", s.textSize === 2);
  el.classList.toggle("a11y-text-3", s.textSize === 3);
  el.classList.toggle("a11y-contrast", s.contrast);
  el.classList.toggle("a11y-links", s.links);
  el.classList.toggle("a11y-motion", s.motion);
  el.classList.toggle("a11y-simple", s.simple);
}

function ReadingMask() {
  const [y, setY] = useState<number | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setY(e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (y === null) return null;
  const band = 120;
  return (
    <>
      <div
        className="a11y-mask"
        aria-hidden="true"
        style={{ top: 0, height: Math.max(0, y - band / 2) }}
      />
      <div
        className="a11y-mask"
        aria-hidden="true"
        style={{ top: y + band / 2, bottom: 0, height: "auto" }}
      />
    </>
  );
}

const SIZE_LABELS = ["Default", "Large", "Larger", "Largest"] as const;

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(loadSettings);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, open, () => setOpen(false));

  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage unavailable — settings still apply for this visit */
    }
  }, [settings]);

  function toggle(key: keyof Omit<A11ySettings, "textSize">) {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const toggles: {
    key: keyof Omit<A11ySettings, "textSize">;
    label: string;
  }[] = [
    { key: "contrast", label: "High contrast" },
    { key: "links", label: "Highlight links" },
    { key: "motion", label: "Reduce motion" },
    { key: "mask", label: "Reading mask" },
    { key: "simple", label: "Simplified view" },
  ];

  return (
    <div className="a11y-root">
      {settings.mask && <ReadingMask />}
      {open && (
        <div
          ref={panelRef}
          className="a11y-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-title"
        >
          <div className="a11y-head">
            <span className="a11y-title" id="a11y-title">Accessibility</span>
            <button
              className="a11y-x"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility options"
            >
              ✕
            </button>
          </div>

          <div className="a11y-group" role="group" aria-label="Text size">
            <span className="a11y-lbl" aria-hidden="true">Text size</span>
            <div className="a11y-sizes">
              {([0, 1, 2, 3] as const).map((step) => (
                <button
                  key={step}
                  className="a11y-size"
                  aria-pressed={settings.textSize === step}
                  aria-label={`Text size: ${SIZE_LABELS[step]}`}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, textSize: step }))
                  }
                >
                  A{step > 0 ? "+".repeat(step) : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="a11y-group">
            <span className="a11y-lbl">Display</span>
            {toggles.map((t) => (
              <button
                key={t.key}
                className="a11y-toggle"
                aria-pressed={settings[t.key]}
                onClick={() => toggle(t.key)}
              >
                <span>{t.label}</span>
                <span className="a11y-toggle-ind" aria-hidden="true">
                  {settings[t.key] ? "On" : "Off"}
                </span>
              </button>
            ))}
          </div>

          <button
            className="a11y-reset"
            onClick={() => setSettings(DEFAULTS)}
          >
            Reset all settings
          </button>
        </div>
      )}
      <button
        className="a11y-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Accessibility options"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.5" r="2" fill="currentColor" stroke="none" />
          <path d="M4.5 8.5c2.5.7 5 1 7.5 1s5-.3 7.5-1" />
          <path d="M12 9.5v4l-2.5 6" />
          <path d="M12 13.5l2.5 6" />
        </svg>
      </button>
    </div>
  );
}
