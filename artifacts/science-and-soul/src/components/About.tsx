import { imgSrc, imgSrcSet } from "../lib/img";

export function About() {
  return (
    <section id="about">
      <div className="ww">
        <div className="aboutgrid">
          <div className="aboutportrait fi">
            <div className="aboutframe">
              <img
                src={imgSrc("kelly-portrait", 1024)}
                srcSet={imgSrcSet("kelly-portrait", [480, 768, 1024, 1254])}
                sizes="(min-width: 1024px) 380px, 100vw"
                alt="Black woman healing illustration representing Kelly Nelson LCSW practice"
                width={380}
                height={507}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="aboutcred">
              <div className="aboutcname">Kelly Nelson, LCSW-S</div>
              <div className="aboutctitle">Owner &amp; Lead Psychotherapist &middot; Texas License #67591 &middot; BA, Auburn University &middot; MSW, Simmons University (2018)</div>
            </div>
          </div>
          <div className="fi">
            <h2 className="stitle">Meet Your <em>Therapist</em></h2>
            <p className="aboutbio">
              Kelly Nelson, LCSW-S, brings eight years of clinical practice to her Houston-based work. She earned her BA from Auburn University and her MSW from Simmons University in 2018, and works with pre-teens, adolescents, adults, families, and the LGBTQIA+ community using a blend of evidence-based and spiritual practices. Her style is warm, holistic, and open-minded — and late-evening appointments are available for flexible scheduling.
            </p>
            <blockquote className="aboutbio" style={{ borderLeft: "3px solid var(--teal)", paddingLeft: "var(--sp4)", fontStyle: "italic", color: "var(--inkm)" }}>
              &ldquo;I believe we each hold the key to our own healing, though we often lose touch with it through life&rsquo;s experiences. My work is to help you peel back the layers &mdash; hopelessness, depression, trauma, negative beliefs &mdash; to reconnect with who you already are.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
