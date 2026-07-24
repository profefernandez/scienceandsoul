import { Hero } from "../components/Hero";
import { ChakraStrip } from "../components/ChakraStrip";
import { Philosophy } from "../components/Philosophy";
import { Services } from "../components/Services";
import { Approach } from "../components/Approach";
import { Methods } from "../components/Methods";
import { WhoWeServe } from "../components/WhoWeServe";
import { ColoringStudio } from "../components/ColoringStudio";
import { Testimonials } from "../components/Testimonials";
import { About } from "../components/About";
import { Fees } from "../components/Fees";
import { GoodFaith } from "../components/GoodFaith";
import { CTABand } from "../components/CTABand";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ChakraStrip />
      <Philosophy />
      <Services />
      <Approach />
      <Methods />
      <WhoWeServe />
      <ColoringStudio />
      <Testimonials />
      <About />
      <Fees />
      <GoodFaith />
      <CTABand />
      <Contact />
    </main>
  );
}
