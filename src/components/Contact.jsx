import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Info,
  Send,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import SocialIcon from "./SocialIcon.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p className="form-error" id={id} role="alert">
      <AlertCircle aria-hidden="true" />
      {message}
    </p>
  );
}

export default function Contact() {
  const { personal, socials } = portfolioData;
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "That email doesn't look right — please check it.";
    }
    if (!values.message.trim()) {
      next.message = "Please add a short message.";
    } else if (values.message.trim().length < 10) {
      next.message = "Your message is a little short — 10 characters minimum.";
    }
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear the error for a field as soon as it is corrected.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Frontend-only demo: nothing is actually emailed.
    const next = validate();
    setErrors(next);
    setSubmitted(false);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      // ─────────────────────────────────────────────────────────────────────
      // 👉 WIRE A FORM SERVICE HERE (Formspree, Web3Forms, EmailJS,
      //    Netlify Forms, or your own backend). See CUSTOMIZATION.md.
      //    Example (Formspree):
      //      await fetch("https://formspree.io/f/YOUR_ID", {
      //        method: "POST",
      //        headers: { "Accept": "application/json" },
      //        body: new FormData(e.target),
      //      });
      // ─────────────────────────────────────────────────────────────────────
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/[^\d+]/g, "")}` },
    { icon: MapPin, label: "Location", value: personal.location },
  ];

  return (
    <section id="contact" className="section section--tint" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title={<span id="contact-title">Have an idea worth talking about?</span>}
          intro="An internship, a student project, a collaboration or just a question about marketing — I'd love to hear about it."
        />

        <div className="contact__grid">
          {/* Details */}
          <Reveal variant="left">
            <ul className="contact__list">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="contact__item-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <span className="contact__item-label">{item.label}</span>
                      <span className="contact__item-value" style={{ display: "block" }}>
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label} className="contact__item">
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ display: "flex", gap: "1rem", width: "100%" }}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="contact__socials">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  className="contact__social"
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={`${social.platform} — ${social.label}`}
                >
                  <SocialIcon platform={social.platform} />
                  {social.platform}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="right">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="form-note">
                <Info aria-hidden="true" />
                <p>
                  This is a frontend-only contact form. Connect it to{" "}
                  <strong>Formspree, Web3Forms, EmailJS, Netlify Forms</strong>,
                  or your preferred backend/form service to receive submissions.
                </p>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="contact-name">
                  Name <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="[YOUR NAME — or a visitor types theirs]"
                  value={values.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                <FieldError id="err-name" message={errors.name} />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="contact-email">
                  Email <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                <FieldError id="err-email" message={errors.email} />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="contact-message">
                  Message <span className="req" aria-hidden="true">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about the idea, role or project…"
                  value={values.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                />
                <FieldError id="err-message" message={errors.message} />
              </div>

              <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>
                <Send aria-hidden="true" />
                Send message
              </button>

              {submitted && (
                <p className="form-status form-status--ok" role="status">
                  <CheckCircle2 aria-hidden="true" />
                  <span>
                    Thanks, {values.name.trim() || "there"}! This is a demo
                    build, so your message hasn&rsquo;t been emailed anywhere yet.
                    Connect a form service (see the note above) to start
                    receiving messages.
                  </span>
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
