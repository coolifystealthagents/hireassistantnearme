"use client";

import { useState, type KeyboardEvent } from "react";

type Props = { endpoint?: string; encoding?: "json" | "form" };
type LeadPayload = Record<string, string>;

async function waitForTracker(timeoutMs = 1_500) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (window.acrTracker?.trackLead) return window.acrTracker;
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }
  return window.acrTracker?.trackLead ? window.acrTracker : null;
}

async function emitAcceptedLead(payload: LeadPayload) {
  const tracker = await waitForTracker();
  const trackedPayload = {
    ...payload,
    name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
    source: "standard_contact_form",
    formId: "standard-contact",
  };
  if (tracker?.trackLead) {
    tracker.trackLead(trackedPayload);
    tracker.flush();
    return;
  }

  // The core form remains usable if the external SDK is delayed or blocked.
  // This same-origin fallback emits the one accepted lead event directly.
  const now = new Date().toISOString();
  await fetch('/ingest/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      site_id: 'hire-assistant-near-me',
      events: [{
        client_event_id: crypto.randomUUID(),
        event_type: 'lead_submit',
        timestamp: now,
        session_id: crypto.randomUUID(),
        anonymous_id: crypto.randomUUID(),
        page_url: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        scroll_depth: 0,
        time_on_page: Math.round(performance.now()),
        event_value: 'standard_contact_form',
        event_metadata: JSON.stringify(trackedPayload),
      }],
    }),
  });
}

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
      const response = await fetch(endpoint, encoding === "json" ? { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) } : { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" }, body: new URLSearchParams(payload).toString() });
      if (!response.ok) throw new Error("submission rejected");
      accepted = true;
      setStatus("Request received. Preparing your next step...");
      await emitAcceptedLead(payload).catch(() => undefined);
      window.location.assign("/thank-you");
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
