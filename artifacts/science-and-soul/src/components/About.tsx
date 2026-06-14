const modalities = [
  { cls: "pill pt", label: "CBT" },
  { cls: "pill pt", label: "DBT" },
  { cls: "pill pl", label: "IFS" },
  { cls: "pill pl", label: "Jungian" },
  { cls: "pill ps", label: "Somatic" },
  { cls: "pill ps", label: "Trauma-Focused" },
  { cls: "pill pa", label: "Energy Psychology" },
  { cls: "pill pa", label: "Transpersonal" },
  { cls: "pill pb", label: "Psychodynamic" },
  { cls: "pill pb", label: "Person-Centered" },
  { cls: "pill pr", label: "Mindfulness-Based" },
  { cls: "pill pr", label: "Expressive Arts" },
];

export function About() {
  return (
    <section id="about">
      <div className="ww">
        <div className="aboutgrid">
          <div className="aboutportrait fi">
            <div className="aboutframe">
              <img
                src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/5e8730f7-d707-41a9-bd82-dcef62c6c685.png"
                alt="Spiritual healing illustration representing Kelly Nelson LCSW practice"
                width={380}
                height={507}
                loading="lazy"
              />
            </div>
            <div className="aboutcred">
              <div className="aboutcname">Kelly Nelson, LCSW</div>
              <div className="aboutctitle">Texas License #67591 &middot; Simmons University MSW &middot; 2018</div>
            </div>
          </div>
          <div className="fi">
            <div className="slabel">Meet Your Therapist</div>
            <h2 className="stitle">Kelly Nelson, <em>LCSW</em></h2>
            <div className="stats">
              <div className="stat">
                <div className="statv">7+</div>
                <div className="statl">Years Practice</div>
              </div>
              <div className="stat">
                <div className="statv">MSW</div>
                <div className="statl">Simmons Univ.</div>
              </div>
              <div className="stat">
                <div className="statv">30+</div>
                <div className="statl">Modalities</div>
              </div>
            </div>
            <p className="aboutbio">
              I am a Licensed Clinical Social Worker with over 7 years of clinical experience. I earned my Master of Social Work from <strong>Simmons University</strong> (2018) and hold Texas License #67591. My passion lives at the intersection of two worlds often kept apart: the empirical and the spiritual.
            </p>
            <p className="aboutbio">
              I specialize in working with <strong>teens, adults, and the LGBTQIA+ community</strong> &mdash; individuals navigating trauma, depression, anxiety, mood disorders, personality disorders, grief, and life transitions. I understand that healing is as unique as the individual seeking it.
            </p>
            <p className="aboutbio">
              My approach is holistic and eclectic &mdash; drawing from psychodynamic theory, attachment, CBT, DBT, IFS, Jungian perspectives, mindfulness, energy psychology, and spiritual practices to build a personalized healing path. I offer <strong>late-night appointments</strong> for individuals with demanding schedules.
            </p>
            <p className="aboutbio">
              My practice space is non-judgmental, compassionate, and open-minded. You will never be reduced to your diagnosis here &mdash; you will be <em>seen, honored, and supported</em> as the whole, multidimensional being you are.
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
