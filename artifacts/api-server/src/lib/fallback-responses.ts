export interface FallbackResult {
  reply: string;
  conversationId: string | null;
}

// ---------------------------------------------------------------------------
// FAQ entries — ordered from most specific to least specific
// ---------------------------------------------------------------------------
const FAQ: Array<{ patterns: RegExp[]; answer: string }> = [

  // --- Greetings ---
  {
    patterns: [/^\s*(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|greetings)\W*$/i],
    answer:
      "Hello! Welcome to **Science & Soul Counseling & Wellness** 🌿 I'm here to answer any questions about Kelly's practice, her services, and how to get started. What's on your mind today?",
  },

  // --- What is a chakra / chakra healing ---
  {
    patterns: [/what\s*is\s*a?\s*chakra|chakra.*mean|chakra.*explain|tell.*chakra|about chakra/i],
    answer:
      "**Chakras** are seven focal points throughout the body used in ancient meditation and healing practices to balance the mind, body, and spirit. Each chakra corresponds to specific physical areas and emotional states:\n\n- 🔴 **Root** — grounding, security, survival\n- 🟠 **Sacral** — creativity, emotion, relationships\n- 🟡 **Solar Plexus** — confidence, personal power\n- 💚 **Heart** — love, compassion, connection\n- 🔵 **Throat** — communication, self-expression\n- 🟣 **Third Eye** — intuition, clarity, insight\n- 🤍 **Crown** — spiritual connection, higher consciousness\n\nWhen a chakra becomes **blocked**, it can show up as emotional or physical distress. Healing involves restoring energy flow through practices like grounding exercises, yoga, meditation, breathwork, journaling, aromatherapy, and connecting with nature. Kelly integrates chakra-informed awareness into her holistic therapy approach.",
  },

  // --- How does chakra healing begin ---
  {
    patterns: [/how.*chakra.*heal|chakra.*healing.*begin|start.*chakra|heal.*chakra|unblock.*chakra/i],
    answer:
      "Chakra healing begins with **awareness** — noticing where you feel stuck, disconnected, or out of balance emotionally or physically. From there, healing practices help restore energy flow:\n\n- 🧘 **Meditation & breathwork** — quiet the mind and attune to the body\n- 🌱 **Grounding exercises** — reconnect with the present moment\n- 🪷 **Yoga** — movement that opens and activates specific chakras\n- ✍️ **Journaling & affirmations** — shift thought patterns and emotional blocks\n- 🌿 **Aromatherapy & nature** — soothe the nervous system\n\nKelly weaves these holistic tools into her therapeutic work alongside evidence-based methods, so healing happens on every level — mind, body, and soul.",
  },

  // --- How does Science & Soul blend science and soul / spirituality ---
  {
    patterns: [/science.*soul.*mix|how.*mix|blend.*science|science.*counsel|combine|how.*integrat|how.*both|approach/i],
    answer:
      "**Science & Soul Counseling & Wellness** is built on the belief that true healing touches both the mind and the spirit. Kelly blends rigorous, evidence-based therapies with a compassionate, holistic lens:\n\n**The Science side:**\n- Cognitive-Behavioral Therapy (CBT)\n- Dialectical Behavior Therapy (DBT)\n- EMDR (Eye Movement Desensitization & Reprocessing)\n- Psychodynamic and attachment-based approaches\n\n**The Soul side:**\n- Mindfulness and somatic (body-centered) awareness\n- Chakra-informed healing\n- Spirituality integrated at the client's own comfort level\n- Narrative therapy — honoring your unique story\n\nThe result is therapy that's grounded in science *and* deeply human — meeting each person exactly where they are.",
  },

  // --- Am I a good fit / will Kelly help me ---
  {
    patterns: [/good fit|right fit|not sure.*fit|fit for me|kelly.*help|help me|can.*help/i],
    answer:
      "You don't have to be a \"perfect fit\" — Kelly's whole approach is about meeting you exactly where you are. She creates a **safe, supportive, and non-judgmental space** tailored to each person's unique needs.\n\nKelly works with people navigating:\n- Anxiety, stress, and worry\n- Trauma and PTSD\n- Depression and mood challenges\n- ADHD and attention difficulties\n- Grief and loss\n- Relationship and family concerns\n- LGBTQIA+ identity and affirming care\n- Life transitions and identity questions\n\nMany clients start with a **free 15-minute consultation** — a no-pressure conversation to see if the fit feels right. Reach out at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com) or call **(832) 501-1687**.",
  },

  // --- Services & specialties ---
  {
    patterns: [/service|offer|speciali|treat|what do you do|what does kelly do|therapy.*offer|kind.*therapy/i],
    answer:
      "Kelly Nelson offers therapy specializing in **depression, trauma & PTSD, and anxiety**, with extensive expertise across:\n\n- ADHD and attention challenges\n- Mood and personality disorders\n- Grief and loss\n- Relationship and family issues\n- LGBTQIA+ affirming care\n\nShe uses a **holistic and eclectic approach**, blending modalities including:\n- Psychodynamic & attachment-based therapy\n- Person-centered and narrative therapy\n- Cognitive-Behavioral Therapy (CBT)\n- Dialectical Behavior Therapy (DBT)\n- EMDR\n- Mindfulness and somatic approaches\n- Spirituality (integrated at the client's comfort level)\n\nKelly brings compassionate, non-judgmental care to every session, customizing her approach to fit your unique needs.",
  },

  // --- EMDR ---
  {
    patterns: [/emdr|eye movement|desensiti/i],
    answer:
      "**EMDR (Eye Movement Desensitization and Reprocessing)** is a research-backed, highly effective therapy for processing trauma. It works by helping the brain reprocess painful or overwhelming memories so they no longer feel so raw or triggering.\n\nDuring EMDR, Kelly guides you through bilateral stimulation (such as eye movements or tapping) while gently revisiting difficult experiences. Over time, the memory loses its emotional charge and becomes something you can hold without being overwhelmed by it.\n\nEMDR is especially effective for **PTSD, complex trauma, anxiety, and phobias** — and many clients experience meaningful relief in fewer sessions than traditional talk therapy alone.",
  },

  // --- Somatic therapy ---
  {
    patterns: [/somatic|body.*therapy|body.*heal|nervous system|body.*mind/i],
    answer:
      "**Somatic therapy** works with the deep connection between your mind and body. Stress, trauma, and emotional pain don't just live in our thoughts — they get stored in the body as tension, tightness, or a sense of being \"stuck.\"\n\nKelly integrates somatic approaches to help you:\n- Notice body sensations without judgment\n- Release stored tension and trauma\n- Regulate your nervous system\n- Feel more grounded and present in daily life\n\nThis body-aware work complements Kelly's talk therapy and EMDR practice, creating a more complete path to healing.",
  },

  // --- Anxiety ---
  {
    patterns: [/anxi|stress|worry|panic|overwhelm/i],
    answer:
      "Anxiety is one of the most common reasons people seek therapy — and one of the most treatable. Kelly specializes in helping clients understand what's driving their anxiety, calm their nervous system, and build lasting tools for resilience.\n\nHer approach draws on **CBT, DBT, EMDR, somatic therapy, and mindfulness** — choosing what fits your situation rather than a one-size-fits-all method. Many clients notice meaningful relief within just a few sessions.\n\nA **free 15-minute consultation** is a great first step. Reach Kelly at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com) or **(832) 501-1687)**.",
  },

  // --- Trauma ---
  {
    patterns: [/trauma|ptsd|abuse|assault|painful.*past|past.*hurt/i],
    answer:
      "Healing from trauma is absolutely possible — and Kelly specializes in exactly this work. She creates a **safe, compassionate, and non-judgmental space** where you can move through trauma at your own pace, without pressure.\n\nKelly uses **trauma-informed** approaches including EMDR, somatic therapy, attachment-based work, and psychodynamic exploration — each chosen based on what will serve you best. You don't have to relive everything to heal.\n\nIf you're ready to take a first step, a free consultation is available. Contact Kelly at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com).",
  },

  // --- Depression ---
  {
    patterns: [/depress|sad|low mood|empty|hopeless|unmotivat/i],
    answer:
      "Depression can make everything feel heavier — and harder to reach out for help. Kelly understands this, and she brings a **warm, non-judgmental presence** to working with clients navigating depression.\n\nUsing an integrative mix of **CBT, psychodynamic therapy, mindfulness, and somatic approaches**, Kelly helps clients explore the roots of their depression, shift unhelpful patterns, and reconnect with what matters to them.\n\nA free 15-minute consultation is a gentle way to start. Reach out at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com) or **(832) 501-1687**.",
  },

  // --- LGBTQIA+ ---
  {
    patterns: [/lgbtq|gay|lesbian|bisexual|trans|queer|nonbinary|gender|sexual identity|affirm/i],
    answer:
      "Kelly provides **LGBTQIA+-affirming care** in a safe, supportive, and celebratory space. She has extensive experience working with identity, coming out, relationship dynamics, family acceptance, and the unique mental health challenges that can come with navigating a world that isn't always affirming.\n\nYou are welcome here exactly as you are. Reach Kelly at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com) or **(832) 501-1687**.",
  },

  // --- Couples ---
  {
    patterns: [/coupl|relationship|marriage|partner|spouse/i],
    answer:
      "Kelly offers **couples counseling** to help partners strengthen their connection, improve communication, and work through conflict in a balanced and respectful environment. Whether you're facing a specific challenge or simply want to grow closer together, Kelly brings a warm and skilled presence to the work.\n\nReach out to get started: [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com) | **(832) 501-1687**.",
  },

  // --- Grief ---
  {
    patterns: [/grief|griev|loss|mourn|bereave|death|died/i],
    answer:
      "Grief is deeply personal — and there's no right way to move through it. Kelly offers compassionate support for those navigating **loss in all its forms**, whether that's the death of a loved one, the end of a relationship, a major life change, or the loss of a sense of self.\n\nShe honors each client's unique experience and pace, drawing on **person-centered, narrative, and somatic approaches** to support healing that feels genuine — not rushed.\n\nReach Kelly at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com).",
  },

  // --- Scheduling / Booking ---
  {
    patterns: [/schedul|appoint|book|consult|session|get started|first session|how do i start|new client/i],
    answer:
      "Getting started is simple. Kelly offers a **free 15-minute consultation** — a no-pressure conversation to ask questions and see if the fit feels right.\n\n📧 [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com)\n📞 **(832) 501-1687**\n\nShe typically responds within one business day. You can also fill out the contact form on this site!",
  },

  // --- Insurance / Fees ---
  {
    patterns: [/insurance|medicaid|medicare|in.network|out.of.network|fee|cost|price|rate|pay|how much|afford|billing/i],
    answer:
      "Kelly is an **out-of-network provider** and does not bill insurance directly. However, she can provide a **superbill** (an itemized receipt) that you may submit to your insurance for possible reimbursement, depending on your plan.\n\nShe also offers a **free 15-minute consultation** so you can get started without any financial commitment. For specific fee information, contact Kelly at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com).",
  },

  // --- Telehealth / Online ---
  {
    patterns: [/telehealth|online|virtual|video|remote|zoom/i],
    answer:
      "Yes! Kelly offers **telehealth sessions** for clients located anywhere in Texas. Sessions are conducted via a secure, HIPAA-compliant video platform — so you can connect with Kelly from wherever you feel most comfortable.",
  },

  // --- Location ---
  {
    patterns: [/locat|office|address|houston|where|in.person/i],
    answer:
      "Kelly is based in **Houston, Texas** and serves clients throughout the state via telehealth. For in-person session details, please reach out at [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com).",
  },

  // --- About Kelly ---
  {
    patterns: [/about kelly|who is kelly|background|credential|licens|lcsw|qualif|train/i],
    answer:
      "**Kelly Nelson, LCSW-S** is a Licensed Clinical Social Worker-Supervisor with deep expertise in trauma, depression, anxiety, and holistic wellness. She brings a science-informed *and* soul-centered approach to every session — blending evidence-based therapies with a warm, compassionate presence.\n\nKelly's therapeutic style is **holistic and eclectic**: she draws from psychodynamic theory, CBT, DBT, EMDR, somatic therapy, mindfulness, and spirituality — tailoring her approach to each person's unique needs and goals.",
  },

  // --- Contact ---
  {
    patterns: [/contact|email|phone|reach|get in touch|talk.*kelly/i],
    answer:
      "You can reach Kelly directly at:\n\n📧 [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com)\n📞 **(832) 501-1687**\n\nShe typically responds within one business day. A **free 15-minute consultation** is also available — just ask!",
  },
];

// ---------------------------------------------------------------------------
// Default answer for anything not matched
// ---------------------------------------------------------------------------
const DEFAULT_ANSWER =
  "Thank you for reaching out! Kelly specializes in **depression, trauma & PTSD, anxiety, ADHD, grief, relationship issues**, and **LGBTQIA+ affirming care** — using a holistic blend of CBT, DBT, EMDR, somatic therapy, and mindfulness.\n\nFor a personalized answer, reach out to Kelly directly:\n\n📧 [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com)\n📞 **(832) 501-1687**\n\nA **free 15-minute consultation** is always available — no commitment needed.";

export function getFallbackResponse(
  message: string,
  conversationId?: string | null,
): FallbackResult {
  const id =
    conversationId ??
    `fallback_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  for (const faq of FAQ) {
    if (faq.patterns.some((p) => p.test(message))) {
      return { reply: faq.answer, conversationId: id };
    }
  }

  return { reply: DEFAULT_ANSWER, conversationId: id };
}
