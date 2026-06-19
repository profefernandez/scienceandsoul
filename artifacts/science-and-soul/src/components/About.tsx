import { ColoringImage } from "./ColoringImage";

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
              <ColoringImage
                src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db7664bf-57c6-41fe-b725-868539c597b3.png"
                alt="Black woman healing illustration representing Kelly Nelson LCSW practice"
                width={380}
                height={507}
                fit
              />
            </div>
            <div className="aboutcred">
              <div className="aboutcname">Kelly Nelson, LCSW-S</div>
              <div className="aboutctitle">Owner &amp; Lead Psychotherapist &middot; Texas License #67591 &middot; Simmons University MSW &middot; 2018</div>
            </div>
          </div>
          <div className="fi">
            <div className="slabel">About Kelly</div>
            <h2 className="stitle">Kelly Nelson, <em>LCSW-S</em></h2>
            <div className="stats">
              <div className="stat">
                <div className="statv">8</div>
                <div className="statl">Years in practice</div>
              </div>
              <div className="stat">
                <div className="statv">2018</div>
                <div className="statl">Simmons University MSW</div>
              </div>
              <div className="stat">
                <div className="statv">77070</div>
                <div className="statl">Houston office ZIP</div>
              </div>
            </div>
            <p className="aboutbio">
              Kelly Nelson is the Owner and Lead Psychotherapist of Science and Soul Counseling &amp; Wellness, a Licensed Clinical Social Worker–Supervisor (LCSW-S) based in Houston, Texas. She earned her Master of Social Work from Simmons University in 2018 and holds Texas license #67591. She has been in clinical practice for eight years.
            </p>
            <p className="aboutbio">
              She works with teens, adults, and the LGBTQIA+ community on trauma, depression, anxiety, mood disorders, ADHD/ADD, grief, self-harm, attachment and personality disorders, suicidal ideation, stress, and life transitions. Her clinical methods include CBT, DBT, psychodynamic therapy, person-centered approaches, mindfulness, and attachment-based work.
            </p>
            <p className="aboutbio">
              Kelly also offers Reiki, chakra alignment, and sound bowl healing for clients who want to address emotional and energetic wellbeing alongside clinical therapy. She holds late-evening appointments for clients who need scheduling flexibility.
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
