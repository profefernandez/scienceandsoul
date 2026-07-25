import { imgSrc, imgSrcSet } from "../lib/img";

export function Methods() {
  return (
    <section id="methods" className="band">
      <div className="ww">
        <div className="philos-inner">
          <div className="philos-img fi">
            <img
              src={imgSrc("methods", 1024)}
              srcSet={imgSrcSet("methods", [480, 768, 1024, 1280])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt="Watercolor illustration of a therapist in warm conversation with a diverse group including a teen and family members in a cozy counseling room"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              style={{ borderRadius: "var(--r2xl)", boxShadow: "var(--shlg)", width: "100%", height: "auto" }}
            />
          </div>
          <div className="fi">
            <h2 className="stitle">
              How Kelly works, in <em>plain language</em>
            </h2>
            <p className="sdesc">
              Kelly draws on many evidence-based approaches — but you don&rsquo;t need to know the jargon. In sessions, methods are chosen and blended around your specific goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
