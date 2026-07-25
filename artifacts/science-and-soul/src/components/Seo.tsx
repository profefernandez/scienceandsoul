import { useEffect } from "react";

export const SITE_URL = "https://scienceandsoulcounseling.com";
export const SITE_NAME = "Science and Soul Counseling & Wellness";
export const OG_IMAGE_URL = `${SITE_URL}/img/og-image.jpg`;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

interface SeoProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export function Seo({ title, description, path, noindex = false }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex" : "index, follow");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    }
  }, [title, description, path, noindex]);

  return null;
}
