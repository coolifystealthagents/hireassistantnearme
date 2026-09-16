"use client";

import { useState, type FormEvent } from "react";

type Props = { endpoint?: string; encoding?: "json" | "form" };

export default function StandardContactForm({ endpoint = "/api/submit-lead", encoding = "json" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website_url") || "").trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = Object.fromEntries(data.entries());
      const request = encoding === "form"
        ? { method: "POST", body: new URLSearchParams(payload as Record<string, string>) }
        : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) };
      const response = await fetch(endpoint, request);
      if (!response.ok) throw new Error();
      window.location.assign("/thank-you");
    } catch {
      setError("We could not submit your request. Please try again.");
      setSubmitting(false);
    }
  }

  return <aside className="saForm">
    <p className="formKick">Free consultation request</p>
    <h2>Tell us what support would move the work forward</h2>
    <p className="formIntro">Fields marked * are required. We use these details only to review and respond to your request.</p>
    <form id="consultation-form" action={endpoint} method="post" onSubmit={submit}>
      <input id="contact-website-url-check" className="hp" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" aria-label="Leave this field empty" />
      <div className="formGrid">
        <div className="formField"><label htmlFor="contact-first-name">First name *</label><input id="contact-first-name" name="firstName" required autoComplete="given-name" /></div>
        <div className="formField"><label htmlFor="contact-last-name">Last name *</label><input id="contact-last-name" name="lastName" required autoComplete="family-name" /></div>
      </div>
      <label htmlFor="contact-email">Business email *</label><input id="contact-email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="contact-phone">Phone number *</label><input id="contact-phone" name="phone" type="tel" required autoComplete="tel" />
      <div className="formGrid">
        <div className="formField"><label htmlFor="contact-company">Company name *</label><input id="contact-company" name="company" required autoComplete="organization" /></div>
        <div className="formField"><label htmlFor="contact-website">Website / URL</label><input id="contact-website" name="website" type="url" placeholder="https://example.com" autoComplete="url" /></div>
      </div>
      <label htmlFor="contact-role">Service or role needed *</label><input id="contact-role" name="role" required placeholder="e.g. executive assistant or customer support" />
      <div className="formGrid">
        <div className="formField"><label htmlFor="contact-company-size">Company size *</label><select id="contact-company-size" name="companySize" required defaultValue=""><option value="" disabled>Select...</option><option>1–10</option><option>11–50</option><option>51–250</option><option>251+</option></select></div>
        <div className="formField"><label htmlFor="contact-method">Preferred contact method *</label><select id="contact-method" name="contactMethod" required defaultValue=""><option value="" disabled>Select...</option><option>Email</option><option>Phone</option></select></div>
      </div>
      <label htmlFor="contact-time">Preferred contact time *</label><input id="contact-time" name="contactTime" required placeholder="Time and time zone" />
      <label htmlFor="contact-message">Message *</label><textarea id="contact-message" name="message" required rows={4} placeholder="Describe the work, tools, hours, and outcomes you have in mind." />
      {error ? <p className="formError" role="alert">{error}</p> : null}
      <p className="privacy">By submitting, you agree that the staffing team may contact you about this request. See our <a href="/privacy">privacy policy</a>.</p>
      <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Book My Free Consultation"}</button>
    </form>
    <style jsx>{`
      .saForm{width:100%;min-width:0;background:#fff;border-radius:22px;padding:34px 42px;box-shadow:0 20px 55px #020b1880;color:#34415a}
      .formKick{margin:0 0 9px;color:#087aa5;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
      .saForm h2{margin:0 0 12px;color:#111827;font-size:30px;line-height:1.2}.formIntro{margin:0 0 24px;color:#64748b;line-height:1.5}
      .saForm form{display:flex;min-width:0;flex-direction:column;gap:17px}.formGrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:17px}.formField{display:flex;min-width:0;flex-direction:column;gap:7px}
      .saForm label{font-size:15px;font-weight:700}.saForm input,.saForm select,.saForm textarea{box-sizing:border-box;width:100%;min-width:0;min-height:50px;padding:12px 14px;border:1px solid #cbd5e1;border-radius:10px;font:inherit;color:#172033}
      .saForm textarea{min-height:110px;resize:vertical}.saForm input:focus,.saForm select:focus,.saForm textarea:focus{outline:3px solid #bae6fd;border-color:#0284c7}
      .saForm button{min-height:54px;border:0;border-radius:11px;background:#0aaee8;color:#05233e;font-size:17px;font-weight:850}.saForm button:disabled{opacity:.6}
      .privacy{margin:0;color:#64748b;font-size:12px;line-height:1.5}.privacy a{text-decoration:underline}.formError{margin:0;color:#b42318}.hp{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important}
      @media(max-width:640px){.saForm{padding:26px 18px}.formGrid{grid-template-columns:minmax(0,1fr)}.saForm h2{font-size:25px}}
    `}</style>
  </aside>;
}
