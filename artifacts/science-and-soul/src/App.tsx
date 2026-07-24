import { HelmetProvider, Helmet } from "react-helmet-async";
import { Router, Switch, Route, useLocation } from "wouter";
import { useDarkMode } from "./hooks/useDarkMode";
import { Announcement } from "./components/Announcement";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ChakraOrb } from "./components/ChakraOrb";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HipaaNotice from "./pages/HipaaNotice";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import NotFound from "./pages/not-found";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const homeHref = import.meta.env.BASE_URL;

function AppLayout({ theme, toggle }: { theme: "light" | "dark"; toggle: () => void }) {
  const [location] = useLocation();
  const isHome = location === "/";
  const linkPrefix = isHome ? "" : homeHref;

  return (
    <>
      <Announcement />
      <Nav theme={theme} onToggleTheme={toggle} linkPrefix={linkPrefix} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/hipaa" component={HipaaNotice} />
        <Route path="/accessibility" component={AccessibilityStatement} />
        <Route component={NotFound} />
      </Switch>
      <Footer linkPrefix={linkPrefix} />
      {isHome ? <ChakraOrb /> : null}
    </>
  );
}

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
      </Helmet>

      <Router base={basePath}>
        <AppLayout theme={theme} toggle={toggle} />
      </Router>
    </HelmetProvider>
  );
}
