import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Launch Lemonade chat widget: desktop only.
// The site's CSS breakpoint for desktop is min-width: 1025px (see site.css),
// so we mirror that here to keep the widget hidden on phones and tablets.
// This lives here (not in index.html) so it is served from 'self' and
// satisfies the CSP script-src rule without needing 'unsafe-inline'.
if (
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1025px)").matches
) {
    const script = document.createElement("script");
    script.src =
        "https://chat.launchlemonade.app/embed/1761669078819x544112027171029000";
    script.async = true;
    document.body.appendChild(script);
}
