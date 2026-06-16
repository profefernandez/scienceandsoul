const services = [
  {
    accent: "sc-lav",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/e4bd94ce-72e8-490a-9d84-147dae6c3020.png",
    imgAlt: "Black woman meditation and chakra alignment illustration",
    pill: { cls: "pill pl", label: "Chakra Alignment" },
    title: "Restore energetic balance",
    desc: "Chakra work presents a healing pathway that reaches beyond symptom control. Clearing energy centers restores natural flow and vitality, integrating spiritual alignment with psychological work.",
  },
  {
    accent: "sc-amb",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7cd4a7d9-e8ec-4f7a-88ed-74fc2d48b0f3.png",
    imgAlt: "Black woman with sound bowls in coloring-book style",
    pill: { cls: "pill pa", label: "Sound Bowl Healing" },
    title: "Calm the nervous system",
    desc: "Sound healing supports the soul-centered practice by signaling calm, ritual, and meditative restoration. Ancient wisdom meets modern neuroscience to regulate the nervous system at a deep level.",
  },
  {
    accent: "sc-sage",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db7664bf-57c6-41fe-b725-868539c597b3.png",
    imgAlt: "Black woman receiving Reiki in coloring-book style",
    pill: { cls: "pill ps", label: "Reiki & Energy Work" },
    title: "Healing at the level of essence",
    desc: "Reiki channels universal life force energy as part of the spiritual and energetic layer of Science and Soul. It works on physical, emotional, mental, and spiritual levels simultaneously alongside clinical care.",
  },
  {
    accent: "sc-teal",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/1d80a0ab-3752-4880-bc0a-df1780b022eb.png",
    imgAlt: "Black woman therapist and client evidence-based therapy illustration",
    pill: { cls: "pill pt", label: "Evidence-Based Therapy" },
    title: "Clinical care with depth",
    desc: "Kelly explicitly uses CBT, DBT, psychodynamic, person-centered, mindfulness, and spirituality among her approaches — rigorous clinical tools deployed with compassion and deep personal attention.",
  },
];

export function Services() {
  return (
    <section id="services">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Healing Modalities</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Sacred Modalities,<br /><em>Proven Methods</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            The service mix reflects the integrated healing story: therapy, chakra alignment, sound bowl work, Reiki, and identity-deep restoration.
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
