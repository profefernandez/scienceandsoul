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

type Chakra = {
  id: string;
  name: string;
  sanskrit: string;
  emoji: string;
  glow: string;
  deep: string;
  greeting: string;
  prompts: string[];
};

const CHAKRAS: Chakra[] = [
  {
    id: "root",
    name: "Root",
    sanskrit: "Muladhara",
    emoji: "🔴",
    glow: "#ef5350",
    deep: "#b71c1c",
    greeting:
      "I'm the **Root** guide — here to help you feel steady and safe. Want to know how Kelly helps build a grounded foundation?",
    prompts: [
      "How do I get started?",
      "What are the fees?",
      "I feel anxious and unsteady",
    ],
  },
  {
    id: "sacral",
    name: "Sacral",
    sanskrit: "Svadhisthana",
    emoji: "🟠",
    glow: "#ff9800",
    deep: "#e65100",
    greeting:
      "I'm the **Sacral** guide — creativity, feeling, and flow. Curious what working with Kelly actually feels like?",
    prompts: [
      "What is a session like?",
      "Tell me about Reiki",
      "Help me reconnect with myself",
    ],
  },
  {
    id: "solar",
    name: "Solar Plexus",
    sanskrit: "Manipura",
    emoji: "🟡",
    glow: "#fbc02d",
    deep: "#c8971a",
    greeting:
      "I'm the **Solar Plexus** guide — confidence and personal power. Want to explore how Kelly helps you find your strength?",
    prompts: [
      "What does Kelly specialize in?",
      "How can therapy help me?",
      "I want to feel more confident",
    ],
  },
  {
    id: "heart",
    name: "Heart",
    sanskrit: "Anahata",
    emoji: "💚",
    glow: "#66bb6a",
    deep: "#2e7d32",
    greeting:
      "I'm the **Heart** guide — compassion, connection, and healing. Shall we talk about how Kelly's approach blends science and soul?",
    prompts: [
      "Tell me about Kelly's approach",
      "Do you help with relationships?",
      "I'm grieving a loss",
    ],
  },
  {
    id: "throat",
    name: "Throat",
    sanskrit: "Vishuddha",
    emoji: "🔵",
    glow: "#26c6da",
    deep: "#00695c",
    greeting:
      "I'm the **Throat** guide — truth and expression. Have something you've been wanting to say or ask?",
    prompts: [
      "How do I book a consult?",
      "What services are offered?",
      "I struggle to speak up",
    ],
  },
  {
    id: "thirdeye",
    name: "Third Eye",
    sanskrit: "Ajna",
    emoji: "🔷",
    glow: "#5c6bc0",
    deep: "#283593",
    greeting:
      "I'm the **Third Eye** guide — insight and intuition. Want help making sense of what you're looking for?",
    prompts: [
      "What is sound bowl healing?",
      "Is this right for me?",
      "Help me find clarity",
    ],
  },
  {
    id: "crown",
    name: "Crown",
    sanskrit: "Sahasrara",
    emoji: "💜",
    glow: "#ab47bc",
    deep: "#6a1b9a",
    greeting:
      "I'm the **Crown** guide — meaning and connection to something larger. Ready to explore Kelly's holistic path?",
    prompts: [
      "What is chakra alignment?",
      "Tell me about Kelly",
      "I'm seeking deeper meaning",
    ],
  },
];

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
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [chakra, setChakra] = useState<Chakra | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", message: "" });
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const threadRef = useRef<HTMLDivElement>(null);

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

  const selectChakra = useCallback((c: Chakra) => {
    setChakra(c);
    setMessages([{ role: "assistant", content: c.greeting }]);
  }, []);

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
              "I'm having trouble connecting right now. Please try again in a moment, or leave a note for Kelly below.",
          },
        ]);
        setShowLead(true);
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

  if (!visible) return null;

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
            <button
              className="orbpanel-x"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
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
                    onClick={() => selectChakra(c)}
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

              {messages.length <= 1 && (
                <div className="orbprompts">
                  {chakra.prompts.map((p) => (
                    <button
                      key={p}
                      className="orbprompt"
                      onClick={() => void sendMessage(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {showLead ? (
                <div className="orblead">
                  {leadSent ? (
                    <p className="orblead-done">
                      ✓ Thank you — Kelly will reach out to you soon.
                    </p>
                  ) : (
                    <form onSubmit={submitLead} className="orblead-form">
                      <p className="orblead-title">Leave a note for Kelly</p>
                      <input
                        className="orbinp"
                        placeholder="Your name"
                        value={lead.name}
                        onChange={(e) =>
                          setLead({ ...lead, name: e.target.value })
                        }
                      />
                      <input
                        className="orbinp"
                        type="email"
                        placeholder="Your email"
                        value={lead.email}
                        onChange={(e) =>
                          setLead({ ...lead, email: e.target.value })
                        }
                      />
                      <textarea
                        className="orbinp orbtxt"
                        placeholder="What's on your mind?"
                        value={lead.message}
                        onChange={(e) =>
                          setLead({ ...lead, message: e.target.value })
                        }
                      />
                      {leadError && (
                        <p className="orblead-err">{leadError}</p>
                      )}
                      <div className="orblead-acts">
                        <button
                          type="button"
                          className="orblead-cancel"
                          onClick={() => setShowLead(false)}
                        >
                          Back to chat
                        </button>
                        <button
                          type="submit"
                          className="orbsend orblead-send"
                          disabled={createInquiry.isPending}
                        >
                          {createInquiry.isPending ? "Sending…" : "Send"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <form className="orbcompose" onSubmit={onSubmit}>
                  <input
                    className="orbinp"
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
              )}

              {!showLead && !leadSent && (
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
        className={`orbbtn${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chakra guide" : "Open chakra guide"}
      >
        <span className="orbbtn-core" aria-hidden="true">
          {chakra ? chakra.emoji : "✦"}
        </span>
      </button>
    </div>
  );
}
