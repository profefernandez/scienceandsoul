import { useState, useRef, FormEvent, ChangeEvent } from "react";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.firstName.trim()) {
    errors.firstName = "First name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.message.trim()) {
    errors.message = "Please share a bit about what brings you here.";
  }
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const submissionTimes = useRef<number[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function checkRateLimit(): boolean {
    const now = Date.now();
    const windowStart = now - RATE_WINDOW_MS;
    submissionTimes.current = submissionTimes.current.filter((t) => t > windowStart);
    if (submissionTimes.current.length >= RATE_LIMIT) return false;
    submissionTimes.current.push(now);
    return true;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!checkRateLimit()) {
      setRateLimited(true);
      return;
    }
    setRateLimited(false);

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const safe: FormFields = {
      firstName: sanitize(fields.firstName),
      lastName: sanitize(fields.lastName),
      email: sanitize(fields.email),
      phone: sanitize(fields.phone),
      service: sanitize(fields.service),
      message: sanitize(fields.message),
    };

    console.info("Form submission (sanitized):", safe);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "var(--sp4)" }}>🌸</div>
        <h4 style={{ fontFamily: "var(--fd)", fontSize: "var(--tx-xl)", marginBottom: "var(--sp3)", color: "var(--teal)" }}>
          Thank you for reaching out.
        </h4>
        <p style={{ color: "var(--inkm)" }}>Kelly will be in touch within 24 hours. Your healing journey begins now.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="frow">
        <div className="fg">
          <label className="flabel" htmlFor="firstName">First Name</label>
          <input
            className={`finp${errors.firstName ? " error" : ""}`}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={fields.firstName}
            onChange={handleChange}
            autoComplete="given-name"
          />
          {errors.firstName && <div className="ferr">{errors.firstName}</div>}
        </div>
        <div className="fg">
          <label className="flabel" htmlFor="lastName">Last Name</label>
          <input
            className="finp"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={fields.lastName}
            onChange={handleChange}
            autoComplete="family-name"
          />
        </div>
      </div>
      <div className="fg">
        <label className="flabel" htmlFor="email">Email Address</label>
        <input
          className={`finp${errors.email ? " error" : ""}`}
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <div className="ferr">{errors.email}</div>}
      </div>
      <div className="fg">
        <label className="flabel" htmlFor="phone">Phone Number</label>
        <input
          className="finp"
          type="tel"
          id="phone"
          name="phone"
          placeholder="(555) 000-0000"
          value={fields.phone}
          onChange={handleChange}
          autoComplete="tel"
        />
      </div>
      <div className="fg">
        <label className="flabel" htmlFor="service">Service of Interest</label>
        <select
          className="fsel"
          id="service"
          name="service"
          value={fields.service}
          onChange={handleChange}
        >
          <option value="">Select a service...</option>
          <option>Individual Therapy (Evidence-Based)</option>
          <option>Chakra Alignment</option>
          <option>Sound Bowl Healing</option>
          <option>Reiki &amp; Spiritual Healing</option>
          <option>Integrative / All Services</option>
          <option>Couples Therapy</option>
          <option>Not sure yet — just exploring</option>
        </select>
      </div>
      <div className="fg">
        <label className="flabel" htmlFor="message">What brings you here?</label>
        <textarea
          className={`ftxta${errors.message ? " error" : ""}`}
          id="message"
          name="message"
          placeholder="Share as much or as little as you'd like. This is a safe space."
          value={fields.message}
          onChange={handleChange}
        />
        {errors.message && <div className="ferr">{errors.message}</div>}
      </div>
      <p className="fnote">🔒 Your privacy is sacred. All information is fully confidential and HIPAA-protected.</p>
      {rateLimited && (
        <p className="ferr" style={{ marginTop: "var(--sp3)", textAlign: "center" }}>
          Too many submissions. Please wait a moment before trying again.
        </p>
      )}
      <button
        type="submit"
        className="btn btnp btnlg"
        style={{ width: "100%", marginTop: "var(--sp4)", justifyContent: "center" }}
      >
        Send My Message ✦
      </button>
    </form>
  );
}
