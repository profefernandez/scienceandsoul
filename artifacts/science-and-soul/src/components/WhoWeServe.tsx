import circleArt from "@assets/image_1784943568728.png";

export function WhoWeServe() {
  return (
    <section id="serve">
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Teens, adults, and the<br /><em>LGBTQIA+ community</em>
          </h2>
        </div>
        <div className="serveart fi">
          <img
            src={circleArt}
            alt="Watercolor illustration of a therapist guiding a diverse circle of teens and adults seated in meditation, framed by lotus flowers, vines, and crystals"
            width={575}
            height={633}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
