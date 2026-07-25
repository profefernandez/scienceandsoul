import kellyPhoto from "@assets/Serene_Focus_1784942061905.png";

export function About() {
  return (
    <section id="about">
      <div className="ww">
        <div className="aboutgrid">
          <div className="aboutportrait fi">
            <div className="aboutframe">
              <img
                src={kellyPhoto}
                alt="Kelly Nelson meditating cross-legged in a sunlit forest, eyes closed with hands resting gently together"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="aboutcred">
              <div className="aboutcname">Kelly Nelson, LCSW-S</div>
              <div className="aboutctitle">Texas License #67591</div>
            </div>
          </div>
          <div className="fi">
            <h2 className="stitle">Meet Your <em>Therapist</em></h2>
            <p className="aboutbio">
              Kelly Nelson, LCSW-S, brings eight years of clinical practice to her Houston-based work. She earned her BA from Auburn University and her MSW from Simmons University in 2018, and works with pre-teens, adolescents, adults, families, and the LGBTQIA+ community using a blend of evidence-based and spiritual practices. Her style is warm, holistic, and open-minded — and late-evening appointments are available for flexible scheduling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
