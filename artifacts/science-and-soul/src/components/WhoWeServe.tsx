import circleArt from "@assets/image_1784944312311.png";

export function WhoWeServe() {
  return (
    <section id="serve">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Who Kelly <em>Works With</em>
          </h2>
          <p className="sdesc" style={{ marginInline: "auto", maxWidth: "48ch" }}>
            Teens, adults, and the LGBTQIA+ community — affirming, integrative care for every stage of life.
          </p>
        </div>
        <div className="serveart fi">
          <img
            src={circleArt}
            alt="Watercolor illustration of a diverse circle of people of different ages, identities, and abilities meditating together with singing bowls, crystals, and lotus flowers"
            width={575}
            height={575}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
