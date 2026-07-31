"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type {
  ContactFormBlock as ContactFormBlockType,
  Locale,
} from "@/types/content";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const fallbackCopy = {
  es: {
    eyebrow: "Contacto",
    headline: "Cuéntanos qué necesitas.",
    intro: "Responderemos personalmente para ayudarte a encontrar el espacio adecuado.",
    nameLabel: "Nombre",
    companyLabel: "Empresa",
    emailLabel: "Email",
    phoneLabel: "Teléfono",
    interestLabel: "Me interesa",
    messageLabel: "Mensaje",
    submitLabel: "Enviar consulta",
    sendingLabel: "Enviando…",
    successTitle: "Gracias. Hemos recibido tu mensaje.",
    successMessage: "Nos pondremos en contacto contigo lo antes posible.",
    errorMessage: "No hemos podido enviar el mensaje. Inténtalo de nuevo.",
    privacyNotice: "Usaremos tus datos únicamente para responder a esta consulta.",
    interestPlaceholder: "Selecciona una opción",
  },
  en: {
    eyebrow: "Contact",
    headline: "Tell us what you need.",
    intro: "We will reply personally and help you find the right space.",
    nameLabel: "Name",
    companyLabel: "Company",
    emailLabel: "Email",
    phoneLabel: "Phone",
    interestLabel: "I am interested in",
    messageLabel: "Message",
    submitLabel: "Send enquiry",
    sendingLabel: "Sending…",
    successTitle: "Thank you. We received your message.",
    successMessage: "We will get back to you as soon as possible.",
    errorMessage: "We could not send the message. Please try again.",
    privacyNotice: "We will use your details only to respond to this enquiry.",
    interestPlaceholder: "Choose an option",
  },
} as const;

export default function ContactFormBlock({
  block,
  locale,
}: {
  block: ContactFormBlockType;
  locale: Locale;
}) {
  const reduceMotion = useReducedMotion();
  const fieldId = useId();
  const startedAt = useRef(0);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const copy = fallbackCopy[locale];

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const labels = {
    eyebrow: block.eyebrow || copy.eyebrow,
    headline: block.headline || copy.headline,
    intro: block.intro || copy.intro,
    name: block.nameLabel || copy.nameLabel,
    company: block.companyLabel || copy.companyLabel,
    email: block.emailLabel || copy.emailLabel,
    phone: block.phoneLabel || copy.phoneLabel,
    interest: block.interestLabel || copy.interestLabel,
    message: block.messageLabel || copy.messageLabel,
    submit: block.submitLabel || copy.submitLabel,
    successTitle: block.successTitle || copy.successTitle,
    successMessage: block.successMessage || copy.successMessage,
    errorMessage: block.errorMessage || copy.errorMessage,
    privacyNotice: block.privacyNotice || copy.privacyNotice,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmissionState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          interest: formData.get("interest"),
          message: formData.get("message"),
          website: formData.get("website"),
          locale,
          startedAt: startedAt.current,
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      form.reset();
      startedAt.current = Date.now();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  const revealTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.72, ease: [0.62, 0.05, 0.01, 0.99] as const };

  return (
    <section
      className="contact-form-block page-gutter"
      id="contact-form"
      aria-labelledby={`${fieldId}-heading`}
    >
      <div className="contact-form-block__grid">
        <motion.div
          className="contact-form-block__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={revealTransition}
        >
          <p className="eyebrow">{labels.eyebrow}</p>
          <h2 id={`${fieldId}-heading`}>{labels.headline}</h2>
          <p>{labels.intro}</p>
        </motion.div>

        <motion.div
          className="contact-form-block__panel"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.1 }}
        >
          {submissionState === "success" ? (
            <motion.div
              className="contact-form-block__success"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
              role="status"
            >
              <span aria-hidden="true">✓</span>
              <h3>{labels.successTitle}</h3>
              <p>{labels.successMessage}</p>
              <button
                type="button"
                className="contact-form-block__text-button"
                onClick={() => setSubmissionState("idle")}
              >
                {locale === "es" ? "Enviar otro mensaje" : "Send another message"}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="contact-form-block__fields">
                <Field label={labels.name} id={`${fieldId}-name`} required>
                  <input
                    id={`${fieldId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </Field>
                <Field label={labels.company} id={`${fieldId}-company`}>
                  <input
                    id={`${fieldId}-company`}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={120}
                  />
                </Field>
                <Field label={labels.email} id={`${fieldId}-email`} required>
                  <input
                    id={`${fieldId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    required
                  />
                </Field>
                <Field label={labels.phone} id={`${fieldId}-phone`}>
                  <input
                    id={`${fieldId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={40}
                  />
                </Field>
                {block.interestOptions?.length ? (
                  <Field
                    label={labels.interest}
                    id={`${fieldId}-interest`}
                    className="contact-form-block__field--wide"
                  >
                    <select id={`${fieldId}-interest`} name="interest" defaultValue="">
                      <option value="">{copy.interestPlaceholder}</option>
                      {block.interestOptions.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                ) : null}
                <Field
                  label={labels.message}
                  id={`${fieldId}-message`}
                  className="contact-form-block__field--wide"
                  required
                >
                  <textarea
                    id={`${fieldId}-message`}
                    name="message"
                    rows={6}
                    maxLength={5_000}
                    required
                  />
                </Field>
              </div>

              <div className="contact-form-block__trap" aria-hidden="true" inert>
                <label htmlFor={`${fieldId}-website`}>Website</label>
                <input
                  id={`${fieldId}-website`}
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="contact-form-block__footer">
                <p>{labels.privacyNotice}</p>
                <button
                  className="contact-form-block__submit"
                  type="submit"
                  disabled={submissionState === "submitting"}
                >
                  <span>
                    {submissionState === "submitting"
                      ? copy.sendingLabel
                      : labels.submit}
                  </span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              <p
                className="contact-form-block__status"
                role="status"
                aria-live="polite"
              >
                {submissionState === "error" ? labels.errorMessage : ""}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  children,
  className,
  id,
  label,
  required = false,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div
      className={`contact-form-block__field${className ? ` ${className}` : ""}`}
    >
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
