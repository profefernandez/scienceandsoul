import { LegalPage } from "../components/LegalPage";

export default function HipaaNotice() {
  return (
    <LegalPage
      title="HIPAA Notice of Privacy Practices"
      subtitle="THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED, AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY."
      updated="June 19, 2026"
      metaDescription="HIPAA Notice of Privacy Practices for Science and Soul Counseling & Wellness, PLLC (Kelly Nelson, LCSW-S, Houston, TX) — how your protected health information is used and your rights."
      path="/hipaa"
    >
      <h2>Our commitment to your privacy</h2>
      <p>
        Science and Soul Counseling &amp; Wellness, PLLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is required by
        law to maintain the privacy of your protected health information (PHI), to provide you with this Notice of our legal
        duties and privacy practices, and to follow the terms of the notice currently in effect. PHI is information that may
        identify you and that relates to your past, present, or future physical or mental health, treatment, or payment for care.
      </p>

      <h2>How we may use and disclose your health information</h2>
      <p>For treatment, payment, and health care operations, we may use and disclose your PHI without your written authorization:</p>
      <ul>
        <li>
          <strong>Treatment.</strong> We may use your PHI to provide, coordinate, or manage your care, and to consult with or
          refer you to other health care providers involved in your treatment.
        </li>
        <li>
          <strong>Payment.</strong> We may use and disclose your PHI to obtain payment for services, such as billing you or your
          insurer and verifying coverage.
        </li>
        <li>
          <strong>Health care operations.</strong> We may use your PHI for routine practice activities such as quality
          improvement, scheduling, recordkeeping, licensing, and administrative functions.
        </li>
      </ul>

      <h2>Other uses and disclosures permitted or required by law</h2>
      <p>We may use or disclose your PHI without authorization in limited situations, including:</p>
      <ul>
        <li>When required by federal, state, or local law.</li>
        <li>To prevent a serious and imminent threat to your health and safety or that of another person.</li>
        <li>To report suspected abuse, neglect, or domestic violence as required or permitted by law.</li>
        <li>For health oversight activities, judicial or administrative proceedings, or valid legal process.</li>
        <li>To coroners, medical examiners, or as otherwise authorized by law for public health and safety.</li>
      </ul>

      <h2>Uses and disclosures that require your written authorization</h2>
      <p>
        Most uses and disclosures of psychotherapy notes, uses and disclosures for marketing purposes, and any sale of your PHI
        require your written authorization. Other uses and disclosures not described in this Notice will be made only with your
        written authorization. You may revoke an authorization in writing at any time, except to the extent we have already
        acted in reliance on it.
      </p>

      <h2>Your rights regarding your health information</h2>
      <ul>
        <li>
          <strong>Right to inspect and copy.</strong> You may request to inspect and receive a copy of your PHI used to make
          decisions about your care, subject to limited exceptions.
        </li>
        <li>
          <strong>Right to amend.</strong> You may request that we correct PHI you believe is incorrect or incomplete.
        </li>
        <li>
          <strong>Right to an accounting of disclosures.</strong> You may request a list of certain disclosures we have made of
          your PHI.
        </li>
        <li>
          <strong>Right to request restrictions.</strong> You may request limits on how we use or disclose your PHI. We will
          consider but are not always required to agree to a requested restriction.
        </li>
        <li>
          <strong>Right to confidential communications.</strong> You may request that we contact you by a specific means or at a
          specific location.
        </li>
        <li>
          <strong>Right to a paper copy.</strong> You may request a paper copy of this Notice at any time, even if you agreed to
          receive it electronically.
        </li>
        <li>
          <strong>Right to be notified of a breach.</strong> You will be notified if there is a breach of your unsecured PHI.
        </li>
      </ul>

      <h2>Our responsibilities</h2>
      <ul>
        <li>We are required by law to maintain the privacy and security of your PHI.</li>
        <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your PHI.</li>
        <li>We must follow the duties and privacy practices described in this Notice and give you a copy of it.</li>
        <li>
          We will not use or share your information other than as described here unless you tell us we can in writing. If you
          tell us we can, you may change your mind at any time in writing.
        </li>
      </ul>

      <h2>Changes to this notice</h2>
      <p>
        We reserve the right to change this Notice and to make the revised Notice effective for PHI we already have as well as
        any information we receive in the future. The current Notice will always show the effective date above, and a copy will
        be available upon request.
      </p>

      <h2>Complaints</h2>
      <p>
        If you believe your privacy rights have been violated, you may file a complaint with us using the contact information
        below, or with the U.S. Department of Health and Human Services, Office for Civil Rights. We will not retaliate against
        you for filing a complaint.
      </p>
      <p className="legalcontact">
        U.S. Department of Health &amp; Human Services<br />
        Office for Civil Rights<br />
        200 Independence Avenue, S.W., Washington, D.C. 20201<br />
        Phone: <a href="tel:18773696908">1-877-696-6775</a> &middot;{" "}
        <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank" rel="noopener noreferrer">www.hhs.gov/ocr</a>
      </p>

      <h2>Contact us</h2>
      <p>To exercise your rights, ask questions, or file a complaint, please contact our Privacy Officer:</p>
      <p className="legalcontact">
        Science and Soul Counseling &amp; Wellness, PLLC<br />
        Attn: Kelly Nelson, LCSW-S (Privacy Officer)<br />
        9950 Cypresswood Dr, Suite 203<br />
        Houston, TX 77070<br />
        Phone: <a href="tel:8325011687">(832) 501-1687</a>
      </p>
    </LegalPage>
  );
}
