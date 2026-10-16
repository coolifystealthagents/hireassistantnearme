"use client";

import { useState, type KeyboardEvent } from "react";

type Props = { endpoint?: string; encoding?: "json" | "form" };
type LeadPayload = Record<string, string>;

async function waitForTracker(timeoutMs = 1600) {
  const started = Date.now();
  while (!window.acrTracker && Date.now() - started < timeoutMs) await new Promise((resolve) => setTimeout(resolve, 80));
}

export default function StandardContactForm({ endpoint = "/api/contact", encoding = "form" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(form: HTMLFormElement) {
    if (submitting || !form.reportValidity()) return;
    const data = new FormData(form);
    if (String(data.get("website_url") || "").trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = Object.fromEntries(data.entries()) as LeadPayload;
      const request = encoding === "form"
        ? { method: "POST", body: new URLSearchParams(payload) }
        : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) };
      const response = await fetch(endpoint, request);
      if (!response.ok) throw new Error("Lead request was not accepted");
      await waitForTracker();
      window.acrTracker?.trackLead({ ...payload, name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(), source: "contact-page-intake", formId: form.id, pageUrl: window.location.href });
      window.location.assign("/thank-you");
    } catch {
      setError("We could not submit your request. Please check the fields and try again.");
      setSubmitting(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.target instanceof HTMLTextAreaElement) return;
    event.preventDefault();
    void submit(event.currentTarget);
  }

  return <aside className="saForm" aria-labelledby="contact-form-title">
    <div className="formHeading"><p className="formKick">Free consultation request</p><h2 id="contact-form-title">Tell us what support you need</h2><p>Required fields are marked with an asterisk.</p></div>
    <form id="consultation-form" data-acr-managed="react" action={endpoint} method="post" onKeyDown={handleKeyDown}>
      <input id="contact-website-url-check" className="hp" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="formGrid"><label htmlFor="contact-first-name">First name *<input id="contact-first-name" name="firstName" required autoComplete="given-name" /></label><label htmlFor="contact-last-name">Last name *<input id="contact-last-name" name="lastName" required autoComplete="family-name" /></label></div>
      <div className="formGrid"><label htmlFor="contact-email">Business email *<input id="contact-email" name="email" type="email" required autoComplete="email" /></label><label htmlFor="contact-phone">Phone number *<input id="contact-phone" name="phone" type="tel" required autoComplete="tel" /></label></div>
      <div className="formGrid"><label htmlFor="contact-company">Company name *<input id="contact-company" name="company" required autoComplete="organization" /></label><label htmlFor="contact-website">Website / URL<input id="contact-website" name="website" type="url" placeholder="https://example.com" autoComplete="url" /></label></div>
      <div className="formGrid"><label htmlFor="contact-role">Service or role needed *<input id="contact-role" name="role" required placeholder="Executive assistant" /></label><label htmlFor="contact-company-size">Company size *<select id="contact-company-size" name="companySize" required defaultValue=""><option value="" disabled>Select</option><option>1 to 10</option><option>11 to 50</option><option>51 to 250</option><option>251+</option></select></label></div>
      <div className="formGrid"><label htmlFor="contact-method">Preferred contact method *<select id="contact-method" name="contactMethod" required defaultValue=""><option value="" disabled>Select</option><option>Email</option><option>Phone</option></select></label><label htmlFor="contact-time">Preferred contact time *<input id="contact-time" name="contactTime" required placeholder="Time and time zone" /></label></div>
      <label htmlFor="contact-message">Work, tools, and desired outcome *<textarea id="contact-message" name="message" required rows={2} placeholder="Describe the work and decisions that stay with your team." /></label>
      {error ? <p className="formError" role="alert">{error}</p> : null}
      <div className="formSubmit"><p>By submitting, you agree that the staffing team may contact you about this request. Read our <a href="/privacy">privacy policy</a>.</p><button type="button" onClick={(event) => void submit(event.currentTarget.form!)} disabled={submitting} aria-busy={submitting}>{submitting ? "Submitting..." : "Send my role brief"}</button></div>
    </form>
  </aside>;
}
