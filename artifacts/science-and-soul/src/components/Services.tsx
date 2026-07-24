import { ColoringImage } from "./ColoringImage";

const services = [
  {
    accent: "sc-lav",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/e4bd94ce-72e8-490a-9d84-147dae6c3020.png",
    imgAlt: "Black woman meditation and chakra alignment illustration",
    pill: { cls: "pill pl", label: "Chakra Alignment" },
    title: "Chakra alignment",
    desc: "Kelly works with chakra alignment to help clients address emotional patterns, stress responses, and energetic imbalances. Sessions explore the connection between energy centers and psychological wellbeing.",
  },
  {
    accent: "sc-amb",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7cd4a7d9-e8ec-4f7a-88ed-74fc2d48b0f3.png",
    imgAlt: "Black woman with sound bowls in coloring-book style",
    pill: { cls: "pill pa", label: "Sound Bowl Healing" },
    title: "Sound bowl healing",
    desc: "Tibetan singing bowls produce sustained tones that shift the nervous system toward rest. Kelly uses sound bowl sessions to support relaxation, stress reduction, and the integration of emotional material.",
  },
  {
    accent: "sc-sage",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db7664bf-57c6-41fe-b725-868539c597b3.png",
    imgAlt: "Black woman receiving Reiki in coloring-book style",
    pill: { cls: "pill ps", label: "Reiki & Energy Work" },
    title: "Reiki & energy work",
    desc: "Reiki sessions channel life force energy to support physical, emotional, and mental wellbeing. Kelly integrates Reiki into broader treatment plans for clients seeking spiritual and energetic dimensions of care.",
  },
  {
    accent: "sc-teal",
    img: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/1d80a0ab-3752-4880-bc0a-df1780b022eb.png",
    imgAlt: "Black woman therapist and client evidence-based therapy illustration",
    pill: { cls: "pill pt", label: "Evidence-Based Therapy" },
    title: "Evidence-based therapy",
    desc: "Kelly's clinical work draws on CBT, DBT, psychodynamic therapy, person-centered approaches, and mindfulness. She selects and combines methods based on what each client is working through and what has traction.",
  },
];

export function Services() {
  return (
    <section id="services">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Services Offered</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Individual therapy, group therapy,<br /><em>&amp; integrative care</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            Kelly offers personalized therapy sessions, integrating spiritual modalities. Each session is customized to your unique goals and needs.
          </p>
        </div>
        <div className="svcgrid">
          {services.map((s) => (
            <div className={`scard ${s.accent} fi`} key={s.title}>
              <ColoringImage
                className="scard-img"
                src={s.img}
                alt={s.imgAlt}
                width={600}
                height={450}
                fit
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
