import { Link } from "wouter";
import { Seo, SITE_NAME } from "../components/Seo";

export default function NotFound() {
  return (
    <main id="main">
      <Seo
        title={`Page Not Found | ${SITE_NAME}`}
        description="The page you're looking for could not be found."
        path="/404"
        noindex
      />
      <section className="nf404">
        <div className="wn nf404-inner">
          <p className="nf404-eyebrow">Oops, a wrong turn</p>
          <h1 className="nf404-title">We couldn&rsquo;t find that page</h1>
          <p className="nf404-desc">
            The page you&rsquo;re looking for may have moved, or the link may have been
            mistyped. Let&rsquo;s get you back to a familiar place.
          </p>
          <Link href="/" className="btn btnp btnlg">Back to home</Link>
        </div>
      </section>
    </main>
  );
}
