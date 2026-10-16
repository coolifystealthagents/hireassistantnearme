"use client";

import { useState, type KeyboardEvent } from "react";

type Props = { endpoint?: string; encoding?: "json" | "form" };
type LeadPayload = Record<string, string>;

export default function StandardContactForm({ endpoint = "/api/contact", encoding = "form" }: Props) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(form: HTMLFormElement) {
    if (busy || !form.reportValidity()) return;

    setBusy(true);
    setStatus("Sending your request...");
    let accepted = false;
    try {
      const data = new FormData(form);
      const payload = Object.fromEntries(Array.from(data.entries()).map(([key, value]) => [key, String(value)])) as LeadPayload;
      const response = await fetch(endpoint, encoding === "json" ? { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload), redirect: "manual" } : { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" }, body: new URLSearchParams(payload).toString(), redirect: "manual" });
      if (!response.ok) throw new Error("submission rejected");
      const result = await response.json() as { ok?: boolean; redirect?: string };
      if (result.ok !== true || result.redirect !== "/thank-you") throw new Error("submission not accepted");
      accepted = true;
      setStatus("Request received. Preparing your next step...");
      window.location.assign(result.redirect);
    } catch {
      setBusy(false);
      setStatus(accepted
        ? "Your request was received, but the next step could not open. Please do not resubmit; use the Contact link if you need help."
        : "We couldn't send your request. Please review the form and try again.");
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing || event.target instanceof HTMLTextAreaElement) return;
    event.preventDefault();
    void submit(event.currentTarget);
  }

  return <form id="standard-contact" className="standard-contact-form" data-acr-managed="react" onKeyDown={handleKeyDown}>
    <div className="form-heading"><p className="contact-kicker">Start with the work</p><h2>Tell us what support would move work forward.</h2><p>Share practical context. A staffing specialist can use it to prepare a focused role conversation.</p></div>
    <div className="form-grid">
      <label><span>First name</span><input name="firstName" autoComplete="given-name" required /></label>
      <label><span>Last name</span><input name="lastName" autoComplete="family-name" required /></label>
      <label><span>Work email</span><input type="email" name="email" autoComplete="email" required /></label>
      <label><span>Phone</span><input type="tel" name="phone" autoComplete="tel" required /></label>
      <label className="wide"><span>Company</span><input name="company" autoComplete="organization" /></label>
      <label><span>Team size</span><select name="teamSize" required defaultValue=""><option value="" disabled>Select one</option><option>Just me</option><option>2 to 10</option><option>11 to 50</option><option>51 or more</option></select></label>
      <label><span>Primary support area</span><select name="supportArea" required defaultValue=""><option value="" disabled>Select one</option><option>Executive and administrative</option><option>Customer support</option><option>Sales and CRM operations</option><option>Research and content support</option><option>Other recurring operations</option></select></label>
      <label className="wide"><span>What would you like the assistant to own?</span><textarea name="message" rows={5} required placeholder="Describe the recurring work, systems, schedule, and approval points." /></label>
    </div>
    <label className="consent-row"><input type="checkbox" name="consent" value="yes" required /><span>I agree to be contacted about this request. I understand this is a remote staffing conversation, not a local job application.</span></label>
    <div className="form-action"><button type="button" className="submit-button" disabled={busy} onClick={(event) => void submit(event.currentTarget.form!)}>{busy ? "Sending..." : "Continue to scheduling"}</button><p aria-live="polite" role="status">{status}</p></div>
  </form>;
}
