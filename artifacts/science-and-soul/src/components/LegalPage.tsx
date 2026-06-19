import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

interface LegalPageProps {
  title: string;
  subtitle?: string;
  updated: string;
  metaDescription: string;
  children: ReactNode;
}

export function LegalPage({ title, subtitle, updated, metaDescription, children }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main>
      <Helmet>
        <title>{title} | Science and Soul Counseling &amp; Wellness</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <section className="legal">
        <div className="w">
          <div className="legalhead fi">
            <Link href="/" className="legalback">&larr; Back to home</Link>
            <h1 className="legaltitle">{title}</h1>
            {subtitle ? <p className="legalsub">{subtitle}</p> : null}
            <p className="legalmeta">
              Science and Soul Counseling &amp; Wellness, PLLC &middot; Kelly Nelson, LCSW-S &middot; Houston, TX
            </p>
            <p className="legalmeta">Last updated: {updated}</p>
          </div>
          <div className="legalbody fi">{children}</div>
        </div>
      </section>
    </main>
  );
}
