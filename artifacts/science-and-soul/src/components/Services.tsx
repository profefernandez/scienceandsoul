import { imgSrc, imgSrcSet } from "../lib/img";

const services = [
  {
    accent: "sc-lav",
    img: "services-individual",
    imgAlt: "Coloring-book style illustration of a Black woman seated in a meditative lotus pose with seven chakra energy points glowing in color along the center of her body, surrounded by lotus flowers and soft light — representing chakra alignment therapy",
    pill: { cls: "pill pl", label: "Chakra Alignment" },
    title: "Chakra alignment",
    desc: "Kelly works with chakra alignment to help clients address emotional patterns, stress responses, and energetic imbalances. Sessions explore the connection between energy centers and psychological wellbeing.",
  },
  {
    accent: "sc-amb",
    img: "sound-healing",
    imgAlt: "Coloring-book style illustration of a Black woman sitting peacefully beside large Tibetan singing bowls, mallet in hand, surrounded by sound waves, lotus flowers, and amethyst crystals — representing sound bowl healing sessions",
    pill: { cls: "pill pa", label: "Sound Bowl Healing" },
    title: "Sound bowl healing",
    desc: "Tibetan singing bowls produce sustained tones that shift the nervous system toward rest. Kelly uses sound bowl sessions to support relaxation, stress reduction, and the integration of emotional material.",
  },
  {
    accent: "sc-sage",
    img: "kelly-portrait",
    imgAlt: "Illustrated portrait of Kelly Nelson, LCSW-S, seated calmly in a sunlit therapeutic space framed by watercolor lotus flowers, vines, and crystals — representing Reiki and energy work sessions",
    pill: { cls: "pill ps", label: "Reiki & Energy Work" },
    title: "Reiki & energy work",
    desc: "Reiki sessions channel life force energy to support physical, emotional, and mental wellbeing. Kelly integrates Reiki into broader treatment plans for clients seeking spiritual and energetic dimensions of care.",
  },
  {
    accent: "sc-teal",
    img: "services-group",
    imgAlt: "Illustration of a therapist and a small group of clients seated in a circle in a calming, plant-filled therapy office, engaged in conversation — representing evidence-based individual and group therapy sessions",
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
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <h2 className="stitle" style={{ marginInline: "auto" }} tabIndex={0}>
            Individual therapy, group therapy,<br /><em>&amp; integrative care</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", textAlign: "center" }}>
            Kelly offers personalized therapy sessions, integrating spiritual modalities. Each session is customized to your unique goals and needs.
          </p>
        </div>
        <div className="svcgrid">
          {services.map((s) => (
            <div className={`scard ${s.accent} fi`} key={s.title}>
              <img
                className="scard-img"
                src={imgSrc(s.img, 1024)}
                srcSet={imgSrcSet(s.img, [480, 768, 1024, 1254])}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={s.imgAlt}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
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
