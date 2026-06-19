import { Link } from "wouter";
import { LegalPage } from "../components/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information on this website and in our care."
      updated="June 19, 2026"
      metaDescription="Privacy Policy for Science and Soul Counseling & Wellness, PLLC (Kelly Nelson, LCSW-S, Houston, TX) — how we collect, use, and protect your information."
    >
      <p>
        Science and Soul Counseling &amp; Wellness, PLLC (&ldquo;Science and Soul,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
        or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you share with us.
        This Privacy Policy explains what information we collect through this website and in the course of providing services,
        how we use it, and the choices you have. It applies to our website and to communications you initiate with us.
      </p>
      <p>
        Health information you share with us as a client is also protected under the Health Insurance Portability and
        Accountability Act (HIPAA). For details about how your protected health information (PHI) is handled, please review our{" "}
        <Link href="/hipaa">HIPAA Notice of Privacy Practices</Link>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide.</strong> When you complete our contact form, request an appointment, or email or
          call us, we may collect your name, email address, phone number, and the contents of your message.
        </li>
        <li>
          <strong>Clinical information.</strong> If you become a client, we collect health and treatment information necessary
          to provide care. This information is governed by our HIPAA Notice of Privacy Practices.
        </li>
        <li>
          <strong>Technical information.</strong> Like most websites, our site may automatically receive basic technical data
          such as your browser type, device, and pages visited. We use this only to keep the site functioning and secure.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiries and schedule appointments.</li>
        <li>To provide, coordinate, and manage your care if you become a client.</li>
        <li>To operate, maintain, and improve our website.</li>
        <li>To comply with legal, professional, and licensing obligations.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We do not share information submitted through this website with third parties
        for their own marketing purposes. We may share information only as needed to operate our practice (for example, with a
        scheduling or billing service that supports our work), when required by law, or with your consent. Any sharing of your
        protected health information is handled in accordance with HIPAA and our HIPAA Notice.
      </p>

      <h2>Third-party services</h2>
      <p>
        Our website may link to third-party platforms, such as our Psychology Today profile. When you follow these links or use
        external scheduling or payment tools, your information is governed by the privacy practices of those providers, not this
        policy. We encourage you to review their privacy statements.
      </p>

      <h2>Email, text, and electronic communication</h2>
      <p>
        Standard email and text messages are not fully secure methods of communication. Please avoid sending sensitive health
        details through unsecured channels. By contacting us electronically, you accept the inherent risks of these methods.
        For client care, we use secure systems whenever possible.
      </p>

      <h2>Data security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards designed to protect your information. However, no
        method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute
        security.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain personal and clinical information for as long as necessary to provide services and to meet our legal,
        professional, and recordkeeping obligations, after which it is securely disposed of.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        Our website is not directed to children under 13, and we do not knowingly collect information from children through this
        site. Care for minors is arranged directly with a parent or legal guardian.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may decline to provide information, though this may limit our ability to respond or provide services. If you are a
        client, you have specific rights regarding your protected health information as described in our{" "}
        <Link href="/hipaa">HIPAA Notice of Privacy Practices</Link>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date above.
        Continued use of our website after changes are posted constitutes acceptance of the updated policy.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have questions about this Privacy Policy or your information, please contact us:
      </p>
      <p className="legalcontact">
        Science and Soul Counseling &amp; Wellness, PLLC<br />
        Attn: Kelly Nelson, LCSW-S<br />
        9950 Cypresswood Dr, Suite 203<br />
        Houston, TX 77070<br />
        Phone: <a href="tel:8325011687">(832) 501-1687</a>
      </p>
    </LegalPage>
  );
}
