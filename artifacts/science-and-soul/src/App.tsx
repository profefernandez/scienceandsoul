import { HelmetProvider, Helmet } from "react-helmet-async";
import { Router, Switch, Route, useLocation } from "wouter";
import { useDarkMode } from "./hooks/useDarkMode";
import { Announcement } from "./components/Announcement";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
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
      <div
        className="washbg"
        aria-hidden="true"
        style={{
          "--env-bg-480": `url(${import.meta.env.BASE_URL}img/env-bg-480.webp)`,
          "--env-bg-768": `url(${import.meta.env.BASE_URL}img/env-bg-768.webp)`,
          "--env-bg-1024": `url(${import.meta.env.BASE_URL}img/env-bg-1024.webp)`,
          "--env-bg-1600": `url(${import.meta.env.BASE_URL}img/env-bg-1600.webp)`,
        } as React.CSSProperties}
      />
      <a className="skiplink" href="#main">Skip to main content</a>
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
      <AccessibilityWidget />
    </>
  );
}

export default function App() {
  const { theme, toggle } = useDarkMode();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" data-theme={theme} />
      </Helmet>

      <Router base={basePath}>
        <AppLayout theme={theme} toggle={toggle} />
      </Router>
    </HelmetProvider>
  );
}
