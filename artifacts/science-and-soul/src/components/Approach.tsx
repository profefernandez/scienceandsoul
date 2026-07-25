import { imgSrc, imgSrcSet } from "../lib/img";

export function Approach() {
  return (
    <section id="approach" className="band">
      <div className="ww">
        <div className="apprgrid">
          <div className="fi">
            <h2 className="stitle">
              A structured process,<br /><em>tailored to each person</em>
            </h2>
            <p style={{ fontSize: "var(--tx-base)", color: "var(--inkm)", lineHeight: "var(--lh-relaxed)", marginBottom: "2rem", maxWidth: "52ch" }}>
              Each treatment plan starts with a thorough understanding of the client's history, goals, and existing strengths. Kelly selects clinical and integrative methods based on what each person needs at each stage of the work.
            </p>
          </div>
          <div className="apprimg fi">
            <img
              src={imgSrc("sound-healing", 1024)}
              srcSet={imgSrcSet("sound-healing", [480, 768, 1024, 1254])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Black woman sound healing illustration in coloring-book style"
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
