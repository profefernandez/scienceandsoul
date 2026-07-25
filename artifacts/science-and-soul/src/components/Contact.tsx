import { EmailKellyButton } from "./EmailKellyButton";
import healingArt from "@assets/image_1784944482868.png";

export function Contact() {
  return (
    <section id="contact">
      <div className="ww">
        <div className="contactgrid">
          <div className="contactimg gimg fi">
            <img
              src={healingArt}
              alt="Watercolor illustration titled Healing Is For Everyone showing practitioners offering Reiki, sound bowl, and chakra healing to a diverse group of people"
              width={575}
              height={575}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="gsplit fi">
            <h2 className="stitle">
              Schedule a free <em>15-minute consultation</em>
            </h2>
            <p className="contacttext">
              Reach out to get started — Kelly can answer questions about scheduling, services, and fit before a first appointment. She typically responds within 24 hours.
            </p>
            <EmailKellyButton btnClass="btn btnp btnlg" label="Schedule Now" />
          </div>
        </div>
      </div>
    </section>
  );
}
