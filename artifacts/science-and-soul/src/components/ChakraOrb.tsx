import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import { useOrbChat, useCreateInquiry } from "@workspace/api-client-react";
import { CHAKRAS } from "../data/chakras";
import { imgSrc, imgSrcSet } from "../lib/img";
import { useChakraGuide } from "../context/ChakraGuideContext";
const SECTION_HINTS: Record<string, string> = {
  home: "Welcome — ask me anything about Kelly's practice.",
  philosophy: "You're reading Kelly's philosophy. Want me to explain it?",
  services: "These are Kelly's services. Curious which one fits you?",
  approach: "This is how Kelly works. Want a walkthrough?",
  serve: "Wondering if Kelly can help with what you're facing?",
  about: "That's Kelly. Want to know more about her background?",
  fees: "Looking at fees? I can help you understand the options.",
  contact: "Ready to reach out? I can pass a note to Kelly for you.",
};

const SECTION_IDS = Object.keys(SECTION_HINTS);

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChakraOrb() {
  const {
    chakra,
    isOpen: open,
    setChakra,
    setOpen,
    toggleOpen,
  } = useChakraGuide();
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", message: "" });
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const threadRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Close the panel and return focus to the launcher button.
  const closePanel = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, [setOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  const orbChat = useOrbChat();
  const createInquiry = useCreateInquiry();

  // Reveal the orb after the visitor scrolls past the hero.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 480) setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for contextual hints.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.25, 0.5] },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Auto-scroll the thread on new messages.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, orbChat.isPending]);

  const sectionHint = SECTION_HINTS[activeSection] ?? SECTION_HINTS.home;

  // When the guide (chakra) changes, start a fresh conversation in its voice.
  // Keyed on chakra?.id (not the whole object) so the reset only fires on an
  // actual guide change, not on referentially-new objects with the same id.
  useEffect(() => {
    if (chakra) {
      setMessages([{ role: "assistant", content: chakra.greeting }]);
    } else {
      setMessages([]);
    }
    setConversationId(null);
    setInput("");
    setShowLead(false);
    setLeadSent(false);
    setLeadError(null);
  }, [chakra?.id]);

  const switchGuide = useCallback(() => {
    setChakra(null);
  }, [setChakra]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || orbChat.isPending || !chakra) return;
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      try {
        const res = await orbChat.mutateAsync({
          data: {
            message: trimmed,
            conversationId,
            chakra: chakra.name,
          },
        });
        if (res.conversationId) setConversationId(res.conversationId);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.reply },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please try again in a moment, or leave a note for Kelly using the link below.",
          },
        ]);
      }
    },
    [orbChat, chakra, conversationId],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const submitLead = async (e: FormEvent) => {
    e.preventDefault();
    setLeadError(null);
    if (!lead.name.trim() || !lead.email.trim() || !lead.message.trim()) {
      setLeadError("Please fill in your name, email, and a short message.");
      return;
    }
    try {
      await createInquiry.mutateAsync({
        data: {
          name: lead.name.trim(),
          email: lead.email.trim(),
          message: lead.message.trim(),
          source: chakra ? `orb:${chakra.id}` : "orb",
          conversationId,
        },
      });
      setLeadSent(true);
    } catch {
      setLeadError("Something went wrong sending your note. Please try again.");
    }
  };

  const accent = chakra?.glow ?? "#5a4b9a";
  const accentDeep = chakra?.deep ?? "#4a3c88";

  const orbStyle = useMemo(
    () =>
      ({
        "--orb-glow": accent,
        "--orb-deep": accentDeep,
      }) as React.CSSProperties,
    [accent, accentDeep],
  );

  if (!visible && !open) return null;

  return (
    <div className="orbroot" style={orbStyle}>
      {open && (
        <div className="orbpanel" role="dialog" aria-label="Chakra guide chat">
          <div className="orbpanel-head">
            <div className="orbpanel-id">
              <span className="orbpanel-av" aria-hidden="true">
                {chakra ? chakra.emoji : "✦"}
              </span>
              <div>
                <div className="orbpanel-title">
                  {chakra ? `${chakra.name} Guide` : "Chakra Guide"}
                </div>
                <div className="orbpanel-sub">
                  {chakra ? chakra.sanskrit : "Choose your guide"}
                </div>
              </div>
            </div>
            <div className="orbpanel-acts">
              {chakra && (
                <button
                  className="orbswitch"
                  onClick={switchGuide}
                  aria-label="Switch to a different chakra guide"
                >
                  ↻ Switch
                </button>
              )}
              <button
                className="orbpanel-x"
                onClick={closePanel}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {!chakra ? (
            <div className="orbpick">
              <p className="orbpick-lead">
                I'm a little guide for Kelly's practice. Choose a chakra and I'll
                take on its spirit to walk you through.
              </p>
              <div className="orbpick-grid">
                {CHAKRAS.map((c) => (
                  <button
                    key={c.id}
                    className="orbpick-orb"
                    onClick={() => setChakra(c)}
                    style={
                      {
                        "--orb-glow": c.glow,
                        "--orb-deep": c.deep,
                      } as React.CSSProperties
                    }
                    aria-label={`${c.name} chakra (${c.sanskrit})`}
                  >
                    <span className="orbpick-dot" />
                    <span className="orbpick-name">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : showLead ? (
            <div className="orblead">
              {leadSent ? (
                <div className="orblead-donewrap">
                  <p className="orblead-done">
                    ✓ Thank you — Kelly will reach out to you soon.
                  </p>
                  <button
                    type="button"
                    className="orblead-back"
                    onClick={() => setShowLead(false)}
                  >
                    ← Back to chat
                  </button>
                </div>
              ) : (
                <form onSubmit={submitLead} className="orblead-form">
                  <p className="orblead-title">Leave a note for Kelly</p>
                  <p className="orblead-intro">
                    Kelly personally reads every note and will get back to you.
                    Share your name, email, and what's on your mind.
                  </p>
                  <input
                    className="orbinp"
                    aria-label="Your name"
                    placeholder="Your name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                  <input
                    className="orbinp"
                    type="email"
                    aria-label="Your email"
                    placeholder="Your email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                  <textarea
                    className="orbinp orbtxt"
                    aria-label="What's on your mind?"
                    placeholder="What's on your mind?"
                    value={lead.message}
                    onChange={(e) =>
                      setLead({ ...lead, message: e.target.value })
                    }
                  />
                  {leadError && <p className="orblead-err">{leadError}</p>}
                  <div className="orblead-acts">
                    <button
                      type="button"
                      className="orblead-cancel"
                      onClick={() => setShowLead(false)}
                    >
                      ← Back to chat
                    </button>
                    <button
                      type="submit"
                      className="orbsend orblead-send"
                      disabled={createInquiry.isPending}
                    >
                      {createInquiry.isPending ? "Sending…" : "Send note"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              <div className="orbhint">{sectionHint}</div>
              <div className="orbthread" ref={threadRef}>
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
                {orbChat.isPending && (
                  <div className="orbmsg orbmsg-assistant orbtyping">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>

              <form className="orbcompose" onSubmit={onSubmit}>
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
                  disabled={orbChat.isPending || !input.trim()}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </form>

              {!leadSent && (
                <button
                  className="orbleadlink"
                  onClick={() => setShowLead(true)}
                >
                  Leave a note for Kelly →
                </button>
              )}
            </>
          )}
        </div>
      )}

      <button
        ref={launcherRef}
        className={`orbbtn orbbtn-haslogo${open ? " is-open" : ""}`}
        onClick={toggleOpen}
        aria-label={open ? "Close the chakra guide chat" : "Open the chakra guide chat"}
      >
        <img
          className="orbbtn-logo"
          src={imgSrc("logo", 96)}
          srcSet={imgSrcSet("logo", [96, 192])}
          sizes="52px"
          alt=""
          aria-hidden="true"
          width={52}
          height={52}
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>
  );
}
