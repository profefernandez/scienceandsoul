import { ColoringImage } from "./ColoringImage";
import { imgSrc, imgSrcSet } from "../lib/img";

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
                src={imgSrc("kelly-portrait", 1024)}
                srcSet={imgSrcSet("kelly-portrait", [480, 768, 1024, 1254])}
                sizes="(min-width: 1024px) 380px, 100vw"
                alt="Black woman healing illustration representing Kelly Nelson LCSW practice"
                width={380}
                height={507}
                fit
              />
            </div>
            <div className="aboutcred">
              <div className="aboutcname">Kelly Nelson, LCSW-S</div>
              <div className="aboutctitle">Owner &amp; Lead Psychotherapist &middot; Texas License #67591 &middot; BA, Auburn University &middot; MSW, Simmons University (2018)</div>
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
              Kelly earned her BA from Auburn University and her MSW from Simmons University in 2018. She works with pre-teens, adolescents, adults, families, and the LGBTQIA+ community using a blend of evidence-based and spiritual practices. Her style is warm, holistic, and open-minded — and late-evening appointments are available for flexible scheduling.
            </p>
            <blockquote className="aboutbio" style={{ borderLeft: "3px solid var(--teal)", paddingLeft: "var(--sp4)", fontStyle: "italic", color: "var(--inkm)" }}>
              &ldquo;I believe we each hold the key to our own healing, though we often lose touch with it through life&rsquo;s experiences. My work is to help you peel back the layers &mdash; hopelessness, depression, trauma, negative beliefs &mdash; to reconnect with who you already are.&rdquo;
            </blockquote>
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
