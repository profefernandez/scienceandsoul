import { imgSrc, imgSrcSet } from "../lib/img";

const groups = [
  {
    dot: "var(--teal)",
    pill: { cls: "pill pt", label: "CBT · REBT · Behavior Modification" },
    title: "Understanding your thoughts & behavior",
    desc: "Identifying unhelpful thought patterns and building practical strategies to change them.",
  },
  {
    dot: "var(--amb)",
    pill: { cls: "pill pa", label: "Trauma-Focused CBT · Cognitive Processing Therapy" },
    title: "Processing trauma",
    desc: "Structured approaches to work through traumatic experiences at a manageable pace.",
  },
  {
    dot: "var(--lav)",
    pill: { cls: "pill pl", label: "Psychodynamic · Attachment-Based · Psychoanalytic" },
    title: "Understanding where patterns come from",
    desc: "Exploring how past relationships and experiences shape current feelings and behavior.",
  },
  {
    dot: "var(--sage)",
    pill: { cls: "pill ps", label: "Strength-Based · Solution-Focused · Motivational Interviewing" },
    title: "Building on what already works",
    desc: "Focusing on your existing strengths and specific, achievable goals.",
  },
  {
    dot: "var(--teal)",
    pill: { cls: "pill pt", label: "Mindfulness-Based Cognitive Therapy · ACT" },
    title: "Staying present",
    desc: "Practical tools for managing difficult thoughts and emotions in the moment.",
  },
  {
    dot: "var(--lav)",
    pill: { cls: "pill pl", label: "Family Systems · Interpersonal · Multi-Systemic" },
    title: "Family & relationships",
    desc: "Looking at how relationships and family dynamics affect your wellbeing.",
  },
];

export function Methods() {
  return (
    <section id="methods" className="band">
      <div className="ww">
        <div className="philos-inner">
          <div className="philos-img fi">
            <img
              src={imgSrc("methods", 1024)}
              srcSet={imgSrcSet("methods", [480, 768, 1024, 1280])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Watercolor illustration of a therapist in warm conversation with a diverse group including a teen and family members in a cozy counseling room"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              style={{ borderRadius: "var(--r2xl)", boxShadow: "var(--shlg)", width: "100%", height: "auto" }}
            />
          </div>
          <div className="fi">
            <h2 className="stitle">
              How Kelly works, in <em>plain language</em>
            </h2>
            <p className="sdesc">
              Kelly draws on many evidence-based approaches — but you don&rsquo;t need to know the jargon. Here&rsquo;s what they actually mean for you, grouped by what they help with. In sessions, methods are chosen and blended around your specific goals.
            </p>
          </div>
        </div>
        <div className="feesgrid" style={{ marginTop: "var(--sp10)" }}>
          {groups.map((g) => (
            <div className="fcard fi" key={g.title}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--sp3)", marginBottom: "var(--sp3)" }}>
                <div className="pdot" style={{ background: g.dot, flexShrink: 0 }} />
                <h3 className="fcardtitle" style={{ marginBottom: 0 }}>{g.title}</h3>
              </div>
              <p style={{ color: "var(--inkm)", marginBottom: "var(--sp4)" }}>{g.desc}</p>
              <span className={g.pill.cls}>{g.pill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
