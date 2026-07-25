import { Helmet } from "react-helmet-async";
import { Seo, SITE_URL, SITE_NAME, OG_IMAGE_URL } from "../components/Seo";
import { Hero } from "../components/Hero";
import { Philosophy } from "../components/Philosophy";
import { Services } from "../components/Services";
import { Approach } from "../components/Approach";
import { WhoWeServe } from "../components/WhoWeServe";
import { JournalDownload } from "../components/JournalDownload";
import { About } from "../components/About";
import { Fees } from "../components/Fees";
import { GoodFaith } from "../components/GoodFaith";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: "Science and Soul Counseling & Wellness, PLLC",
  alternateName: SITE_NAME,
  description:
    "Holistic therapy practice in Houston, Texas where evidence-based therapy meets spiritual healing. Individual and couples counseling, chakra alignment, Reiki, and sound bowl healing with Kelly Nelson, LCSW-S.",
  url: SITE_URL,
  logo: OG_IMAGE_URL,
  image: OG_IMAGE_URL,
  telephone: "+18325011687",
  email: "Kelly@scienceandsoulcounseling.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9950 Cypresswood Dr, Suite 203",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77070",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "City",
    name: "Houston",
  },
  founder: {
    "@type": "Person",
    name: "Kelly Nelson",
    honorificSuffix: "LCSW-S",
    jobTitle: "Licensed Clinical Social Worker",
  },
  knowsAbout: [
    "Psychotherapy",
    "Cognitive Behavioral Therapy",
    "Holistic Mental Health",
    "Chakra Alignment",
    "Reiki",
    "Sound Bowl Healing",
  ],
});

export default function Home() {
  return (
    <main id="main">
      <Seo
        title="Science and Soul Counseling & Wellness | Kelly Nelson, LCSW | Houston, TX"
        description="Where evidence-based therapy meets spiritual healing. Kelly Nelson, LCSW-S, Houston, TX. Individual and couples therapy, chakra alignment, Reiki, sound bowl healing, holistic mental health."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{structuredData}</script>
      </Helmet>
      <Hero />
      <About />
      <JournalDownload />
      <Philosophy />
      <Services />
      <Approach />
      <WhoWeServe />
      <Fees />
      <GoodFaith />
      <FAQ />
      <Contact />
    </main>
  );
}
