import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useCreateInquiry } from "@workspace/api-client-react";

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
  const [intent, setIntent] = useState<"schedule" | "question" | "">("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cooldownSecs, setCooldownSecs] = useState(0);
  const submissionTimes = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const createInquiry = useCreateInquiry();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startCooldown(remainingMs: number) {
    setCooldownSecs(Math.ceil(remainingMs / 1000));
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldownSecs((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function checkRateLimit(): boolean {
    const now = Date.now();
    const windowStart = now - RATE_WINDOW_MS;
    submissionTimes.current = submissionTimes.current.filter((t) => t > windowStart);
    if (submissionTimes.current.length >= RATE_LIMIT) {
      const oldestInWindow = submissionTimes.current[0];
      const msUntilFree = oldestInWindow + RATE_WINDOW_MS - now;
      startCooldown(msUntilFree);
      return false;
    }
    submissionTimes.current.push(now);
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cooldownSecs > 0) return;
    if (!checkRateLimit()) return;

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

    const intentLabel =
      intent === "schedule"
        ? "[Schedule Consultation]"
        : intent === "question"
        ? "[General Inquiry]"
        : "";
    const fullName = [safe.firstName, safe.lastName].filter(Boolean).join(" ");
    const serviceNote = safe.service ? ` | Service: ${safe.service}` : "";
    const phoneNote = safe.phone ? ` | Phone: ${safe.phone}` : "";
    const fullMessage = [intentLabel, safe.message].filter(Boolean).join(" ");

    setSubmitError(null);
    try {
      await createInquiry.mutateAsync({
        data: {
          name: fullName,
          email: safe.email,
          message: `${fullMessage}${serviceNote}${phoneNote}`,
          source: "website",
        },
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try emailing Kelly directly at scienceandsoulcounseling@gmail.com.");
    }
  }

  const isThrottled = cooldownSecs > 0;
  const isPending = createInquiry.isPending;

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
      <div className="fg">
        <div className="flabel">How can Kelly help you?</div>
        <div className="fchoices">
          <label className="fchoice">
            <input
              type="radio"
              name="intent"
              value="schedule"
              checked={intent === "schedule"}
              onChange={() => setIntent("schedule")}
            />
            <span>I'd like to schedule a consultation</span>
          </label>
          <label className="fchoice">
            <input
              type="radio"
              name="intent"
              value="question"
              checked={intent === "question"}
              onChange={() => setIntent("question")}
            />
            <span>I have questions first</span>
          </label>
        </div>
      </div>

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
          <option>Group Therapy</option>
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
      {submitError && (
        <p className="ferr" style={{ marginTop: "var(--sp3)", textAlign: "center" }}>
          {submitError}
        </p>
      )}
      {isThrottled && (
        <p className="ferr" style={{ marginTop: "var(--sp3)", textAlign: "center" }}>
          Too many submissions — please wait {cooldownSecs}s before trying again.
        </p>
      )}
      <button
        type="submit"
        className="btn btnp btnlg"
        disabled={isThrottled || isPending}
        aria-disabled={isThrottled || isPending}
        style={{
          width: "100%",
          marginTop: "var(--sp4)",
          justifyContent: "center",
          opacity: isThrottled || isPending ? 0.5 : 1,
          cursor: isThrottled || isPending ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? "Sending…" : isThrottled ? `Please wait ${cooldownSecs}s…` : "Send My Message ✦"}
      </button>
    </form>
  );
}
