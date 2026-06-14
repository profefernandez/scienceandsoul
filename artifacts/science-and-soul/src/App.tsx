import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    window.location.replace(base + "/science-and-soul.html");
  }, []);

  return null;
}
