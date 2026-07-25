import { LegalPage } from "../components/LegalPage";

export default function AccessibilityStatement() {
  return (
    <LegalPage
      title="Accessibility Statement"
      subtitle="Our commitment to making this website usable by everyone."
      updated="July 24, 2026"
      metaDescription="Accessibility Statement for Science and Soul Counseling & Wellness, PLLC — our WCAG AAA conformance commitment, what we've done, and how to report issues."
      path="/accessibility"
    >
      <p>
        Science and Soul Counseling &amp; Wellness, PLLC is committed to ensuring this website is accessible to all
        visitors, including people with disabilities. We have designed and built this site with inclusivity in mind and
        continuously work to improve the experience for everyone.
      </p>

      <h2>Conformance status</h2>
      <p>
        This website aims to conform to <strong>Level AAA</strong> of the{" "}
        <a
          href="https://www.w3.org/TR/WCAG21/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web Content Accessibility Guidelines (WCAG) 2.1
        </a>
        , published by the World Wide Web Consortium (W3C). WCAG defines standards that make web content more
        accessible to people with a wide range of disabilities.
      </p>

      <h2>What we&rsquo;ve done</h2>
      <p>
        We have taken the following specific steps to meet and exceed WCAG AAA requirements:
      </p>
      <ul>
        <li>
          <strong>Font sizes.</strong> Body text is set at a minimum of 18 px (1.125 rem), and all text scales
          predictably when a visitor increases their browser&rsquo;s default font size. No text is rendered in
          images or in a way that prevents resizing.
        </li>
        <li>
          <strong>Contrast ratios.</strong> Text and interactive elements meet or exceed the AAA minimum contrast
          ratio of 7:1 against their backgrounds. Large text meets the AAA minimum of 4.5:1. Both light and dark
          themes have been verified independently.
        </li>
        <li>
          <strong>Line and paragraph spacing.</strong> Line height is set to at least 1.6&times; the font size.
          Paragraph spacing is at least 2&times; the font size, and letter spacing is at least 0.12&times; the
          font size, consistent with WCAG 1.4.8 and 1.4.12 (Text Spacing) criteria.
        </li>
        <li>
          <strong>Keyboard navigation.</strong> All interactive elements&mdash;links, buttons, and form
          fields&mdash;are reachable and operable with a keyboard alone, with visible focus indicators.
        </li>
        <li>
          <strong>Semantic HTML.</strong> Pages use proper heading hierarchy, landmark regions (
          <code>main</code>, <code>nav</code>, <code>footer</code>), and ARIA labels where needed so screen
          readers can navigate efficiently.
        </li>
        <li>
          <strong>Reduced motion.</strong> Decorative animations respect the{" "}
          <code>prefers-reduced-motion</code> media query and are paused or removed when that preference is set.
        </li>
        <li>
          <strong>Color is not the only indicator.</strong> Information is never conveyed by color alone. Icons,
          labels, or other visual cues accompany color-coded elements.
        </li>
        <li>
          <strong>Dark mode.</strong> A built-in dark mode is available for visitors who find high-brightness
          screens difficult to use, accessible via the toggle in the site navigation.
        </li>
        <li>
          <strong>Skip link.</strong> A &ldquo;Skip to main content&rdquo; link is the first focusable element on
          every page, letting keyboard and screen-reader users bypass the navigation.
        </li>
        <li>
          <strong>Accessible dialogs.</strong> The mobile menu and pop-up dialogs trap keyboard focus while open,
          close with the Escape key, and return focus to the control that opened them.
        </li>
        <li>
          <strong>Status announcements.</strong> Form errors, loading states, and confirmation messages are
          announced to screen readers through live regions.
        </li>
        <li>
          <strong>Accessibility widget.</strong> A floating accessibility button (bottom-left corner of every
          page) opens a panel where you can increase text size in three steps, switch to a high-contrast palette,
          underline and highlight all links, reduce motion, enable a reading mask that follows your cursor, or
          switch to a simplified view with decorative imagery and effects removed. Your choices are saved on your
          device and applied automatically on your next visit.
        </li>
        <li>
          <strong>Windows High Contrast and print.</strong> The site respects forced-colors mode and includes a
          dedicated print stylesheet for clean, readable printed pages.
        </li>
        <li>
          <strong>Automated and manual testing.</strong> Every page is audited with axe-core against WCAG 2.1
          A, AA, and AAA rules at desktop, tablet, and mobile screen sizes, in both light and dark themes, in
          addition to manual keyboard and screen-reader checks.
        </li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        We are not aware of any current accessibility barriers on this site. If you encounter something that
        prevents you from using any part of this website, please let us know (see below) and we will address it
        promptly.
      </p>

      <h2>Feedback and contact</h2>
      <p>
        Accessibility is an ongoing effort. If you experience any difficulty accessing content on this site, or
        if you have suggestions for how we can improve, please reach out:
      </p>
      <p className="legalcontact">
        Science and Soul Counseling &amp; Wellness, PLLC<br />
        Attn: Kelly Nelson, LCSW-S<br />
        9950 Cypresswood Dr, Suite 203<br />
        Houston, TX 77070<br />
        Phone: <a href="tel:8325011687">(832) 501-1687</a><br />
        Email: <a href="mailto:kelly@scienceandsoulcounseling.com">kelly@scienceandsoulcounseling.com</a>
      </p>
      <p>
        We aim to respond to accessibility feedback within 2 business days.
      </p>

      <h2>Technical approach</h2>
      <p>
        This website is built with React and rendered as a single-page application. It relies on standard HTML5
        semantics, CSS custom properties for theming, and no third-party scripts that introduce inaccessible
        content. It has been tested with keyboard-only navigation and browser-based accessibility tools.
      </p>

      <h2>Formal complaints</h2>
      <p>
        If you are not satisfied with our response, you may contact the{" "}
        <a
          href="https://www.hhs.gov/ocr/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          U.S. Department of Health &amp; Human Services Office for Civil Rights
        </a>{" "}
        or the{" "}
        <a
          href="https://www.ada.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          U.S. Department of Justice ADA Information Line
        </a>
        .
      </p>
    </LegalPage>
  );
}
