import { imgSrc, imgSrcSet } from "../lib/img";

export function Approach() {
  return (
    <section id="approach" className="band">
      <div className="ww">
        <div className="apprgrid">
          <div className="gsplit fi">
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <h2 className="stitle" tabIndex={0}>
              A structured process,<br /><em>tailored to each person</em>
            </h2>
            <p style={{ fontSize: "var(--tx-base)", color: "var(--inkm)", lineHeight: "var(--lh-relaxed)", marginBottom: "2rem", maxWidth: "52ch" }}>
              Each treatment plan starts with a thorough understanding of the client's history, goals, and existing strengths. Kelly selects clinical and integrative methods based on what each person needs at each stage of the work.
            </p>
          </div>
          <div className="apprimg gimg fi">
            <img
              src={imgSrc("sound-healing", 1024)}
              srcSet={imgSrcSet("sound-healing", [480, 768, 1024, 1254])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Coloring-book style illustration of a Black woman absorbed in a sound healing session, seated beside large Tibetan singing bowls emitting gentle vibrations — representing the structured, tailored therapeutic process at Science and Soul"
              width={540}
              height={540}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
