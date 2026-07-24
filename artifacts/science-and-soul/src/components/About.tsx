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
              Kelly works with teens, adults, and the LGBTQIA+ community on various mental health challenges using a blend of evidence-based and spiritual practices. Late-evening appointments available for flexible scheduling.
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
