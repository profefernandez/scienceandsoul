const faqs = [
  {
    q: "How much does a session cost?",
    a: "Individual sessions (50 minutes) are $150 and couples sessions are $200. Your first 15-minute consultation is free — it's a chance to see if we're a good fit before committing to anything.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes. Kelly accepts Aetna, Blue Cross, Cigna, and UnitedHealthcare. If you don't see your plan listed, reach out — we'll verify your benefits and explore all available options together.",
  },
  {
    q: "What if I'm paying out of pocket?",
    a: "Under the federal No Surprises Act, you'll receive a written Good Faith Estimate of your expected costs before your first session — so there are no surprises, just clarity. See the Good Faith Estimate section for details.",
  },
  {
    q: "Who does Kelly work with?",
    a: "Kelly works with pre-teens, adolescents, adults, families, and the LGBTQIA+ community, offering individual, family, and group therapy.",
  },
  {
    q: "What happens in a first session?",
    a: "Your first full session is about getting to know you — what brings you in, your history, and your goals. Together you and Kelly will shape a plan that fits, drawing on both evidence-based methods and, if you're open to it, spiritual practices.",
  },
  {
    q: "Do I have to participate in the spiritual practices?",
    a: "Not at all. Chakra alignment, Reiki, and sound bowl healing are always optional. Kelly's clinical foundation — CBT, DBT, trauma-focused care, and more — stands fully on its own, and every treatment plan is tailored to your comfort level.",
  },
  {
    q: "Do you offer evening appointments?",
    a: "Yes. Late-evening appointments are available for individuals with demanding schedules.",
  },
  {
    q: "How do I get started?",
    a: "Use the Schedule Now button to email Kelly and book your free 15-minute consultation, or call (832) 501-1687.",
  },
];

export function FAQ() {
  return (
    <section id="faq">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Frequently Asked <em>Questions</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            Starting therapy comes with questions — here are answers to the ones we hear most.
          </p>
        </div>
        <div className="faqlist faqgrid-desk fi">
          {faqs.map((f) => (
            <details className="faqitem" key={f.q}>
              <summary className="faqq">
                <span>{f.q}</span>
                <span className="faqchev" aria-hidden="true">+</span>
              </summary>
              <p className="faqa">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
