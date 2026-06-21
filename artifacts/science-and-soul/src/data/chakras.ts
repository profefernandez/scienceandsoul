export type Chakra = {
  id: string;
  name: string;
  sanskrit: string;
  emoji: string;
  /** Plain-language meaning of the chakra — static, not AI-generated. */
  meaning: string;
  glow: string;
  deep: string;
  soft: string;
  border: string;
  ink: string;
  greeting: string;
  prompts: string[];
};

export const CHAKRAS: Chakra[] = [
  {
    id: "root",
    name: "Root",
    sanskrit: "Muladhara",
    emoji: "🔴",
    meaning: "Foundation, stability & feeling grounded",
    glow: "#ef5350",
    deep: "#b71c1c",
    soft: "#ef9a9a",
    border: "#ef9a9a",
    ink: "#b71c1c",
    greeting:
      "I'm the **Root** guide — your foundation, stability, and sense of safety. Want to know how Kelly helps you build a grounded foundation?",
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
    meaning: "Creativity, joy & emotional intelligence",
    glow: "#ff9800",
    deep: "#e65100",
    soft: "#ffcc80",
    border: "#ffb74d",
    ink: "#e65100",
    greeting:
      "I'm the **Sacral** guide — creativity, joy, and emotional intelligence. Curious what working with Kelly actually feels like?",
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
    meaning: "Self-esteem, confidence & personal power",
    glow: "#fbc02d",
    deep: "#c8971a",
    soft: "#fff59d",
    border: "#f9a825",
    ink: "#c8971a",
    greeting:
      "I'm the **Solar Plexus** guide — self-esteem, confidence, and personal power. Want to explore how Kelly helps you step into your strength?",
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
    meaning: "Love, compassion & emotional balance",
    glow: "#66bb6a",
    deep: "#2e7d32",
    soft: "#a5d6a7",
    border: "#81c784",
    ink: "#2e7d32",
    greeting:
      "I'm the **Heart** guide — love, compassion, and emotional balance. Shall we talk about how Kelly's approach bridges mind, body, and spirit?",
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
    meaning: "Communication & speaking your truth",
    glow: "#1e88e5",
    deep: "#1565c0",
    soft: "#bbdefb",
    border: "#90caf9",
    ink: "#1565c0",
    greeting:
      "I'm the **Throat** guide — communication and speaking your truth. Have something you've been wanting to say or ask?",
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
    meaning: "Intuition, wisdom & mental clarity",
    glow: "#5c6bc0",
    deep: "#283593",
    soft: "#c5cae9",
    border: "#9fa8da",
    ink: "#283593",
    greeting:
      "I'm the **Third Eye** guide — intuition, wisdom, and mental clarity. Want help making sense of what you're looking for?",
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
    meaning: "Spiritual connection & universal consciousness",
    glow: "#ab47bc",
    deep: "#6a1b9a",
    soft: "#e1bee7",
    border: "#ce93d8",
    ink: "#6a1b9a",
    greeting:
      "I'm the **Crown** guide — spiritual connection and universal consciousness. Ready to explore Kelly's holistic path?",
    prompts: [
      "What is chakra alignment?",
      "Tell me about Kelly",
      "I'm seeking deeper meaning",
    ],
  },
];
