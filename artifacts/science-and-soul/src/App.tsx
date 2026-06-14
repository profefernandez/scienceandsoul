import { HelmetProvider, Helmet } from "react-helmet-async";
import { useDarkMode } from "./hooks/useDarkMode";
import { Announcement } from "./components/Announcement";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ChakraStrip } from "./components/ChakraStrip";
import { Philosophy } from "./components/Philosophy";
import { Services } from "./components/Services";
import { Approach } from "./components/Approach";
import { WhoWeServe } from "./components/WhoWeServe";
import { Testimonials } from "./components/Testimonials";
import { About } from "./components/About";
import { Fees } from "./components/Fees";
import { CTABand } from "./components/CTABand";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' https://user-gen-media-assets.s3.amazonaws.com data: blob:",
  "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
].join("; ");

export default function App() {
  const { theme, toggle } = useDarkMode();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" data-theme={theme} />
        <title>Science and Soul Counseling &amp; Wellness | Kelly Nelson, LCSW</title>
        <meta
          name="description"
          content="Where evidence-based therapy meets spiritual healing. Kelly Nelson, LCSW, Houston, TX. Chakra alignment, Reiki, sound bowl healing, holistic mental health."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Science and Soul Counseling & Wellness | Kelly Nelson, LCSW" />
        <meta property="og:description" content="Where evidence-based therapy meets spiritual healing. Kelly Nelson, LCSW, Houston, TX." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Science and Soul Counseling & Wellness | Kelly Nelson, LCSW" />
        <meta name="twitter:description" content="Where evidence-based therapy meets spiritual healing. Kelly Nelson, LCSW, Houston, TX." />
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </Helmet>

      <Announcement />
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <ChakraStrip />
        <Philosophy />
        <Services />
        <Approach />
        <WhoWeServe />
        <Testimonials />
        <About />
        <Fees />
        <CTABand />
        <Contact />
      </main>
      <Footer />
    </HelmetProvider>
  );
}
