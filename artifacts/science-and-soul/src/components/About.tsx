const modalities = [
  { cls: "pill pt", label: "CBT" },
  { cls: "pill pt", label: "DBT" },
  { cls: "pill pl", label: "Psychodynamic" },
  { cls: "pill pl", label: "Mindfulness" },
  { cls: "pill ps", label: "Person-Centered" },
  { cls: "pill ps", label: "Spirituality" },
  { cls: "pill pa", label: "Trauma Focused" },
  { cls: "pill pa", label: "Energy Psychology" },
];

export function About() {
  return (
    <section id="about">
      <div className="ww">
        <div className="aboutgrid">
          <div className="aboutportrait fi">
            <div className="aboutframe">
              <img
                src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db7664bf-57c6-41fe-b725-868539c597b3.png"
                alt="Black woman healing illustration representing Kelly Nelson LCSW practice"
                width={380}
                height={507}
                loading="lazy"
              />
            </div>
            <div className="aboutcred">
              <div className="aboutcname">Kelly Nelson, LCSW</div>
              <div className="aboutctitle">Texas Licensed &middot; Simmons University MSW &middot; 2018</div>
            </div>
          </div>
          <div className="fi">
            <div className="slabel">About Kelly</div>
            <h2 className="stitle">Kelly Nelson, <em>LCSW</em></h2>
            <div className="stats">
              <div className="stat">
                <div className="statv">7</div>
                <div className="statl">Years in practice</div>
              </div>
              <div className="stat">
                <div className="statv">2018</div>
                <div className="statl">Simmons University master's</div>
              </div>
              <div className="stat">
                <div className="statv">77070</div>
                <div className="statl">Houston office ZIP</div>
              </div>
            </div>
            <p className="aboutbio">
              Kelly Nelson is a verified Licensed Clinical Social Worker in Houston, Texas, licensed by the State of Texas, in practice for 7 years, and a Simmons University graduate from 2018.
            </p>
            <p className="aboutbio">
              She specializes in working with <strong>teens, adults, and the LGBTQIA+ community</strong> &mdash; individuals navigating trauma, depression, anxiety, mood disorders, self-harm, grief, and attachment challenges.
            </p>
            <p className="aboutbio">
              Her approach is holistic and eclectic, drawing from psychodynamic theory, attachment, CBT, DBT, mindfulness, energy psychology, and spirituality. She emphasizes compassion, non-judgment, and helping clients use their own strengths. Late-night appointments available for individuals with busy schedules.
            </p>
            <div className="modcloud">
              {modalities.map((m) => (
                <span className={m.cls} key={m.label}>{m.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
