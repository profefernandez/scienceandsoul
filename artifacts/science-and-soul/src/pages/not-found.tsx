import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <main id="main">
      <Helmet>
        <title>Page Not Found | Science and Soul Counseling & Wellness</title>
        <meta name="robots" content="noindex" />
      </Helmet>
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
