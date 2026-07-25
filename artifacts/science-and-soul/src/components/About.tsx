import kellyCard from "@assets/image_1784943079984.png";

export function About() {
  return (
    <section id="about">
      <div className="ww">
        <div className="aboutgrid">
          <div className="aboutportrait gimg fi">
            <div className="aboutframe">
              <img
                src={kellyCard}
                alt="Illustrated card of Kelly Nelson, LCSW-S, Texas License #67591, meditating in a sunlit forest framed by watercolor lotus flowers, vines, and crystals"
                width={823}
                height={1023}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="gsplit fi">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <h2 className="stitle" tabIndex={0}>Meet Your <em>Therapist</em></h2>
            <p className="aboutbio">
              Kelly Nelson, LCSW-S, brings eight years of clinical practice to her Houston-based work. She earned her BA from Auburn University and her MSW from Simmons University in 2018, and works with pre-teens, adolescents, adults, families, and the LGBTQIA+ community using a blend of evidence-based and spiritual practices. Her style is warm, holistic, and open-minded — and Kelly offers late-evening and late-night appointments for clients whose work keeps them busy during the day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
