import { useState, type FormEvent, type ChangeEvent } from "react";
import { useCreateInquiry } from "@workspace/api-client-react";
import { EMAIL_RE, sanitize, useSubmitCooldown } from "@/lib/form-validation";

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.firstName.trim()) {
    errors.firstName = "First name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(fields.email)) {
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
  const { cooldownSecs, checkRateLimit } = useSubmitCooldown();
  const createInquiry = useCreateInquiry();

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
      const firstErrorField = (["firstName", "email", "message"] as const).find(
        (f) => validationErrors[f],
      );
      if (firstErrorField) {
        requestAnimationFrame(() => {
          document.getElementById(firstErrorField)?.focus();
        });
      }
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
      <div style={{ textAlign: "center", padding: "2rem" }} role="status">
        <div style={{ fontSize: "var(--tx-2xl)", marginBottom: "var(--sp4)" }}>🌸</div>
        <h4 style={{ fontFamily: "var(--fd)", fontSize: "var(--tx-xl)", marginBottom: "var(--sp3)", color: "var(--teal)" }}>
          Thank you for reaching out.
        </h4>
        <p style={{ color: "var(--inkm)" }}>Kelly will be in touch within 24 hours. Your healing journey begins now.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="fg" style={{ border: "none", padding: 0, margin: "0 0 var(--sp5)" }}>
        <legend className="flabel">How can Kelly help you?</legend>
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
      </fieldset>

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
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && <div className="ferr" id="firstName-error" role="alert">{errors.firstName}</div>}
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
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <div className="ferr" id="email-error" role="alert">{errors.email}</div>}
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
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <div className="ferr" id="message-error" role="alert">{errors.message}</div>}
      </div>
      <p className="fnote">🔒 Your privacy is sacred. All information is fully confidential and HIPAA-protected.</p>
      {submitError && (
        <p className="ferr" role="alert" style={{ marginTop: "var(--sp3)", textAlign: "center" }}>
          {submitError}
        </p>
      )}
      {isThrottled && (
        <p className="ferr" role="alert" style={{ marginTop: "var(--sp3)", textAlign: "center" }}>
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
