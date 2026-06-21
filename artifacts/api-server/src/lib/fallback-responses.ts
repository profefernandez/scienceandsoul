export interface FallbackResult {
  reply: string;
  conversationId: string | null;
}

const FAQ: Array<{ patterns: RegExp[]; answer: string }> = [
  {
    patterns: [/schedul|appoint|book|consult|session/i],
    answer:
      "I'd love to help you connect with Kelly! You can schedule a **free 15-minute consultation** by emailing [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com) or calling **(832) 501-1687**. Kelly typically responds within one business day.",
  },
  {
    patterns: [/accept.*(insurance|medicaid|medicare)|insurance|in.network|out.of.network/i],
    answer:
      "Kelly is an **out-of-network provider**, which means she does not bill insurance directly. However, she can provide a superbill (an itemized receipt) that you can submit to your insurance for possible reimbursement, depending on your plan. Feel free to reach out at **scienceandsoulcounseling@gmail.com** with any billing questions.",
  },
  {
    patterns: [/fee|cost|price|rate|pay|how much|afford/i],
    answer:
      "Session fees vary depending on the service. Kelly offers a **free 15-minute consultation** so you can get started without any commitment. For detailed fee information, please visit the Fees section of this site or contact Kelly directly at **scienceandsoulcounseling@gmail.com**.",
  },
  {
    patterns: [/telehealth|online|virtual|video|remote/i],
    answer:
      "Yes! Kelly offers **telehealth sessions** for clients located in Texas. Virtual sessions are conducted via a secure, HIPAA-compliant video platform, so you can connect with Kelly from the comfort of your own home.",
  },
  {
    patterns: [/locat|office|address|houston|in.person/i],
    answer:
      "Kelly is based in **Houston, Texas** and offers both in-person and telehealth sessions for Texas residents. Please reach out at **scienceandsoulcounseling@gmail.com** for office location details.",
  },
  {
    patterns: [/service|offer|speciali|treat|help with|work with/i],
    answer:
      "Kelly offers a range of services including **individual therapy**, **couples counseling**, **EMDR** (Eye Movement Desensitization and Reprocessing), **somatic therapy**, and **holistic wellness** support. She works with adults navigating anxiety, trauma, relationship challenges, life transitions, and more.",
  },
  {
    patterns: [/emdr/i],
    answer:
      "**EMDR (Eye Movement Desensitization and Reprocessing)** is a research-backed therapy that helps the brain process and heal from traumatic memories. Kelly is trained in EMDR and uses it as part of a holistic, individualized approach to trauma healing. It can be especially effective for PTSD, anxiety, and overwhelming life experiences.",
  },
  {
    patterns: [/somatic|body|nervous system/i],
    answer:
      "**Somatic therapy** works with the mind-body connection, helping you notice and release stress, trauma, and tension held in the body. Kelly integrates somatic approaches into her practice to help clients feel more grounded, present, and at home in themselves.",
  },
  {
    patterns: [/chakra|energy|holistic|spiritual|wellness/i],
    answer:
      "Kelly blends evidence-based therapy with **holistic and spiritual wellness** practices, including chakra-informed approaches. She believes healing happens across all dimensions — mind, body, and spirit — and tailors her work to honor each client's unique path.",
  },
  {
    patterns: [/anxiety|stress|worry|panic/i],
    answer:
      "Anxiety and stress are among the most common reasons people reach out to Kelly. She uses a combination of evidence-based techniques — including **EMDR**, **somatic therapy**, and mindfulness — to help clients understand their anxiety, calm their nervous system, and build lasting resilience. A free 15-minute consultation is a great first step.",
  },
  {
    patterns: [/trauma|ptsd|abuse|assault/i],
    answer:
      "Healing from trauma is possible, and you don't have to do it alone. Kelly specializes in **trauma-informed therapy** using EMDR, somatic approaches, and a compassionate, person-centered style. She creates a safe, non-judgmental space for clients to process difficult experiences at their own pace.",
  },
  {
    patterns: [/couple|relationship|marriage|partner/i],
    answer:
      "Kelly offers **couples counseling** to help partners navigate conflict, rebuild connection, improve communication, and strengthen their relationship. Whether you're facing a specific challenge or simply want to grow closer, Kelly provides a warm and balanced space for both partners.",
  },
  {
    patterns: [/about kelly|who is kelly|background|credential|licens|lcsw/i],
    answer:
      "Kelly Nelson is a **Licensed Clinical Social Worker-Supervisor (LCSW-S)** based in Houston, TX. She brings a science-informed and soul-centered approach to therapy, blending evidence-based techniques with holistic wellness practices. Her goal is to meet each client exactly where they are on their healing journey.",
  },
  {
    patterns: [/contact|email|phone|reach|get in touch/i],
    answer:
      "You can reach Kelly at:\n\n📧 [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com)\n📞 **(832) 501-1687**\n\nShe typically responds within one business day. You're also welcome to fill out the contact form on this site!",
  },
  {
    patterns: [/new client|first session|first time|get started|how do i start/i],
    answer:
      "Getting started is simple! Reach out to Kelly via email at **scienceandsoulcounseling@gmail.com** or call **(832) 501-1687** to schedule your **free 15-minute consultation**. That call is a no-pressure opportunity to ask questions and see if Kelly is the right fit for you.",
  },
  {
    patterns: [/hi|hello|hey|howdy|good morning|good afternoon|good evening/i],
    answer:
      "Hello! Welcome to Science & Soul Counseling & Wellness 🌿 I'm here to answer questions about Kelly's practice, services, and how to get started. What can I help you with today?",
  },
];

const DEFAULT_ANSWER =
  "Thank you for reaching out! For personalized answers, please contact Kelly directly:\n\n📧 [scienceandsoulcounseling@gmail.com](mailto:scienceandsoulcounseling@gmail.com)\n📞 **(832) 501-1687**\n\nShe offers a **free 15-minute consultation** and would love to connect with you.";

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
