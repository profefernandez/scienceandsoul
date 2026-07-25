import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import { type Chakra } from "../data/chakras";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type CursorOrbProps = {
  chakra: Chakra;
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  sendMessage: (text: string) => void;
  pending: boolean;
  sectionHint: string;
  reducedMotion: boolean;
  onSwitchGuide: () => void;
  onBackToWidget: () => void;
};

const ORB_SIZE = 28;
const CURSOR_OFFSET = 16;
const IDLE_MS = 1100;
const BUBBLE_W = 300;
const BUBBLE_H = 340;

export function CursorOrb({
  chakra,
  messages,
  input,
  setInput,
  sendMessage,
  pending,
  sectionHint,
  reducedMotion,
  onSwitchGuide,
  onBackToWidget,
}: CursorOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
  const pos = useRef({ ...target.current });
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerInBubble = useRef(false);
  const focusInBubble = useRef(false);

  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [placement, setPlacement] = useState<{ left: boolean; up: boolean }>({
    left: true,
    up: true,
  });

  const computePlacement = useCallback(() => {
    const { x, y } = pos.current;
    setPlacement({
      left: x + CURSOR_OFFSET + ORB_SIZE + BUBBLE_W + 24 > window.innerWidth,
      up: y + ORB_SIZE + BUBBLE_H + 24 > window.innerHeight,
    });
  }, []);

  const openBubble = useCallback(() => {
    computePlacement();
    setBubbleOpen(true);
  }, [computePlacement]);

  // Mouse tracking + smooth trailing via rAF (skipped when reduced motion).
  useEffect(() => {
    if (reducedMotion) {
      // Docked mode: fixed position bottom-right; no cursor following.
      const el = orbRef.current;
      if (el) {
        const x = window.innerWidth - 88;
        const y = window.innerHeight - 88;
        pos.current = { x, y };
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      return;
    }

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX + CURSOR_OFFSET, y: e.clientY + CURSOR_OFFSET };
      // Movement collapses the bubble unless pinned or the visitor is using it.
      if (!pinned && !pointerInBubble.current && !focusInBubble.current) {
        setBubbleOpen(false);
      }
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        if (!pointerInBubble.current) openBubble();
      }, IDLE_MS);
    };

    const tick = () => {
      const el = orbRef.current;
      if (el) {
        pos.current.x += (target.current.x - pos.current.x) * 0.16;
        pos.current.y += (target.current.y - pos.current.y) * 0.16;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [reducedMotion, pinned, openBubble]);

  // When the bubble closes/unmounts, mouseleave/blur never fire — reset the
  // "visitor is using the bubble" flags so idle re-opening isn't blocked.
  useEffect(() => {
    if (!bubbleOpen) {
      pointerInBubble.current = false;
      focusInBubble.current = false;
    }
  }, [bubbleOpen]);

  // Escape closes the bubble; focus is never trapped.
  useEffect(() => {
    if (!bubbleOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBubbleOpen(false);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bubbleOpen]);

  // Auto-scroll thread.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, pending, bubbleOpen]);

  const toggleBubble = () => {
    if (bubbleOpen) {
      setBubbleOpen(false);
      setPinned(false);
    } else {
      setPinned(true);
      openBubble();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPinned(true);
    sendMessage(input);
  };

  const orbStyle = {
    "--orb-glow": chakra.glow,
    "--orb-deep": chakra.deep,
  } as React.CSSProperties;

  return (
    <div className="corb-layer" style={orbStyle}>
      <div
        ref={orbRef}
        className={`corb-follow${reducedMotion ? " corb-docked" : ""}`}
      >
        <button
          type="button"
          className={`corb-orb${bubbleOpen ? " is-open" : ""}`}
          onClick={toggleBubble}
          aria-expanded={bubbleOpen}
          aria-label={
            bubbleOpen
              ? `Close ${chakra.name} guide bubble`
              : `Open ${chakra.name} guide bubble`
          }
        >
          <span className="corb-core" aria-hidden="true" />
        </button>

        {bubbleOpen && (
          <div
            ref={bubbleRef}
            className={`corb-bubble${placement.left ? " corb-left" : ""}${placement.up ? " corb-up" : ""}`}
            role="dialog"
            aria-label={`${chakra.name} guide chat bubble`}
            onMouseEnter={() => {
              pointerInBubble.current = true;
            }}
            onMouseLeave={() => {
              pointerInBubble.current = false;
            }}
            onFocusCapture={() => {
              focusInBubble.current = true;
            }}
            onBlurCapture={() => {
              focusInBubble.current = false;
            }}
          >
            <div className="corb-head">
              <span className="corb-title">
                {chakra.emoji} {chakra.name} Guide
              </span>
              <div className="corb-acts">
                <button
                  type="button"
                  className="corb-act"
                  onClick={onSwitchGuide}
                  aria-label="Switch to a different chakra guide"
                >
                  ↻ Switch
                </button>
                <button
                  type="button"
                  className="corb-act"
                  onClick={onBackToWidget}
                  aria-label="Return to the standard chat panel"
                >
                  ⿻ Panel
                </button>
              </div>
            </div>
            <div className="corb-hint">{sectionHint}</div>
            <div className="corb-thread" ref={threadRef}>
              {messages.map((m, i) => (
                <div key={i} className={`orbmsg orbmsg-${m.role}`}>
                  {m.role === "assistant" ? (
                    <div className="orbmd">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              ))}
              {pending && (
                <div className="orbmsg orbmsg-assistant orbtyping">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
            <form className="corb-compose" onSubmit={onSubmit}>
              <input
                className="orbinp"
                aria-label="Type your message"
                placeholder="Ask me anything…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="orbsend"
                disabled={pending || !input.trim()}
                aria-label="Send message"
              >
                ➤
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
