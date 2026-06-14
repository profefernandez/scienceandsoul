const services = [
  {
    accent: "sc-lav",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/0aac1017-e6de-46ee-9995-5ccac1fbe9ee.png",
    imgAlt: "Chakra alignment coloring book illustration",
    pill: { cls: "pill pl", label: "Energy Work" },
    title: "Chakra Alignment",
    desc: "Your seven energy centers are the body\u2019s spiritual infrastructure. Blockages manifest as emotional distress and disconnection from self. Chakra alignment clears these pathways to restore natural flow and vitality.",
    benefits: [
      "Identify and release energetic blockages",
      "Restore emotional and physical equilibrium",
      "Deepen connection to your authentic self",
      "Integrate spiritual alignment with psychological work",
    ],
  },
  {
    accent: "sc-amb",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/91a56b49-99a2-433d-b3a2-21c0debedf75.png",
    imgAlt: "Tibetan sound bowl healing illustration",
    pill: { cls: "pill pa", label: "Sound Therapy" },
    title: "Sound Bowl Healing",
    desc: "Tibetan singing bowls produce resonant frequencies that entrain the brain toward deep relaxation, reducing cortisol and activating the parasympathetic nervous system \u2014 ancient wisdom meets modern neuroscience.",
    benefits: [
      "Deep nervous system regulation",
      "Vibrational therapy for trauma release",
      "Promotes meditation and mindful awareness",
      "Scientifically supported relaxation response",
    ],
  },
  {
    accent: "sc-sage",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/5e8730f7-d707-41a9-bd82-dcef62c6c685.png",
    imgAlt: "Reiki energy healing coloring book illustration",
    pill: { cls: "pill ps", label: "Energy Healing" },
    title: "Reiki & Spiritual Healing",
    desc: "Reiki channels universal life force energy to promote healing, balance, and deep inner peace \u2014 working on physical, emotional, mental, and spiritual levels simultaneously, alongside evidence-based clinical care.",
    benefits: [
      "Universal life force energy channeling",
      "Mental, emotional & spiritual realignment",
      "Supports trauma recovery and grief processing",
      "Cultivates inner stillness and spiritual clarity",
    ],
  },
  {
    accent: "sc-teal",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/ecd74d8b-5ea8-4d22-a4e0-d2d1f8a55eee.png",
    imgAlt: "Evidence-based therapy clinical practice illustration",
    pill: { cls: "pill pt", label: "Clinical Therapy" },
    title: "Evidence-Based Therapy",
    desc: "Rigorous, clinically-validated modalities form the scientific foundation. CBT, DBT, trauma-focused approaches, psychodynamic therapy, IFS, and more \u2014 deployed with precision and deep compassion.",
    benefits: [
      "CBT, DBT, CPT, ACT, IFS & psychodynamic",
      "Trauma, PTSD, depression, anxiety specialization",
      "Mood disorders, personality disorders, grief",
      "LGBTQIA+ affirming, culturally sensitive care",
    ],
  },
];

export function Services() {
  return (
    <section id="services">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>What We Offer</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Sacred Modalities,<br /><em>Proven Methods</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            Each service is a distinct healing pathway. Together, they form a complete integrative journey tailored to your unique soul.
          </p>
        </div>
        <div className="svcgrid">
          {services.map((s) => (
            <div className={`scard ${s.accent} fi`} key={s.title}>
              <img
                className="scard-img"
                src={s.img}
                alt={s.imgAlt}
                width={600}
                height={450}
                loading="lazy"
              />
              <div className="scard-body">
                <span className={s.pill.cls}>{s.pill.label}</span>
                <h3 className="scard-title">{s.title}</h3>
                <p className="scard-desc">{s.desc}</p>
                <ul className="scard-bens" role="list">
                  {s.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
