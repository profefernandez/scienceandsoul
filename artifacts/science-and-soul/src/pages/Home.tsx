import { Hero } from "../components/Hero";
import { ChakraStrip } from "../components/ChakraStrip";
import { Philosophy } from "../components/Philosophy";
import { Services } from "../components/Services";
import { Approach } from "../components/Approach";
import { Methods } from "../components/Methods";
import { WhoWeServe } from "../components/WhoWeServe";
import { JournalDownload } from "../components/JournalDownload";
import { About } from "../components/About";
import { Fees } from "../components/Fees";
import { GoodFaith } from "../components/GoodFaith";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <ChakraStrip />
      <Philosophy />
      <Services />
      <Approach />
      <Methods />
      <WhoWeServe />
      <JournalDownload />
      <Fees />
      <GoodFaith />
      <FAQ />
      <Contact />
    </main>
  );
}
