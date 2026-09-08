"use client";

import { useEffect, useState, type FormEvent } from "react";

type Props = { endpoint?: string; encoding?: "json" | "form" };
type TrackerWindow = Window & { acrTracker?: { trackLead?: (payload: Record<string, unknown>) => void } };

const companySizes = ["1-5", "5-10", "11-50", "51-250", "251-1k", "1k+"];
const positions = ["Just 1 Position", "2-5 Positions", "6-10 Positions", "11-50 Positions", "51-100 Positions", "101-500 Positions", "501-1,000 Positions", "Over 1,000 Positions"];
const referrals = ["Google", "Email", "LinkedIn", "Reddit", "X / Twitter", "Referral", "ChatGPT / AI", "Outbound Outreach", "Other"];
const countryCodes = [
  ["🇺🇸", "+1"], ["🇨🇦", "+1"], ["🇮🇩", "+62"], ["🇵🇭", "+63"], ["🇬🇧", "+44"],
  ["🇦🇺", "+61"], ["🇳🇿", "+64"], ["🇸🇬", "+65"], ["🇮🇳", "+91"], ["🇦🇪", "+971"],
  ["🇲🇽", "+52"], ["🇧🇷", "+55"], ["🇿🇦", "+27"], ["🇩🇪", "+49"], ["🇫🇷", "+33"],
];

export default function StandardContactForm({ endpoint = "/api/submit-lead", encoding = "json" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [referral, setReferral] = useState("");

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const zones: Record<string, string> = {
      "Asia/Jakarta": "+62", "Asia/Makassar": "+62", "Asia/Jayapura": "+62", "Asia/Manila": "+63",
      "Europe/London": "+44", "Australia/Sydney": "+61", "Australia/Melbourne": "+61",
      "Pacific/Auckland": "+64", "Asia/Singapore": "+65", "Asia/Kolkata": "+91", "Asia/Dubai": "+971",
    };
    if (zones[zone]) setCountryCode(zones[zone]);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website_url") || "").trim()) return;
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const phone = `${countryCode} ${String(data.get("phoneLocal") || "").trim()}`.trim();
    const payload: Record<string, string> = {
      firstName, lastName, name: `${firstName} ${lastName}`.trim(), fullName: `${firstName} ${lastName}`.trim(),
      email: String(data.get("email") || ""), businessEmail: String(data.get("email") || ""), phone,
      companyName: String(data.get("companyName") || ""), company: String(data.get("companyName") || ""),
      website: String(data.get("website") || ""), companySize: String(data.get("companySize") || ""),
      positions: String(data.get("positions") || ""), positionsToFill: String(data.get("positions") || ""),
      referral: String(data.get("referral") || ""), howTheyHeard: String(data.get("referral") || ""),
      referralSpecify: String(data.get("referralSpecify") || ""), message: String(data.get("message") || ""),
      source: "contact-form", formId: "contactPageForm",
    };
    setSubmitting(true);
    setError("");
    try {
      const request = encoding === "form"
        ? { method: "POST", body: new URLSearchParams(payload) }
        : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) };
      const response = await fetch(endpoint, request);
      if (!response.ok) throw new Error("Lead endpoint rejected the request");
      try { (window as TrackerWindow).acrTracker?.trackLead?.(payload); } catch {}
      window.location.assign("/thank-you");
    } catch {
      try {
        const tracker = (window as TrackerWindow).acrTracker?.trackLead;
        if (tracker) {
          tracker(payload);
          window.location.assign("/thank-you");
          return;
        }
      } catch {}
      setError("We could not submit your request. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="sa-form-card">
      <h2>Find Growth In Your Business By Hiring Industry Experienced Virtual Assistants</h2>
      <form onSubmit={submit} id="contactPageForm">
        <input className="sa-hp" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="sa-grid">
          <label>First Name *<input name="firstName" required autoComplete="given-name" /></label>
          <label>Last Name *<input name="lastName" required autoComplete="family-name" /></label>
        </div>
        <label>Business Email *<input name="email" type="email" required autoComplete="email" /><small>Not Accepting Personal Email</small></label>
        <label>Phone Number *<span className="sa-phone"><select aria-label="Country code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>{countryCodes.map(([flag, code], i) => <option value={code} key={`${code}-${i}`}>{flag} {code}</option>)}</select><input name="phoneLocal" type="tel" required autoComplete="tel-national" placeholder="Phone number" /></span></label>
        <div className="sa-grid">
          <label>Company Name *<input name="companyName" required autoComplete="organization" /></label>
          <label>Website / URL<input name="website" placeholder="example.com" autoComplete="url" /></label>
        </div>
        <div className="sa-grid">
          <label>Company Size *<select name="companySize" required defaultValue=""><option value="" disabled>Select...</option>{companySizes.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>How Many Positions to Fill *<select name="positions" required defaultValue=""><option value="" disabled>Select...</option>{positions.map((x) => <option key={x}>{x}</option>)}</select></label>
        </div>
        <label>How Did You Hear About Us? *<select name="referral" required value={referral} onChange={(e) => setReferral(e.target.value)}><option value="" disabled>Select...</option>{referrals.map((x) => <option key={x}>{x}</option>)}</select></label>
        {referral === "Other" ? <label>Please Specify *<input name="referralSpecify" required /></label> : null}
        <label>Message<textarea name="message" rows={4} /></label>
        {error ? <p className="sa-error" role="alert">{error}</p> : null}
        <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Book a Free Consultation"}</button>
      </form>
      <style jsx>{`
        .sa-form-card{width:100%;max-width:876px;margin:0 auto;background:#fff;border:1px solid #e3e8ef;border-radius:22px;padding:34px 48px 48px;box-shadow:0 18px 48px rgba(15,34,58,.16);color:#34415a;text-align:left}
        h2{margin:0 0 30px;color:#111827;font-size:30px;line-height:1.35;font-weight:800;letter-spacing:-.02em;max-width:700px}
        form{display:flex;flex-direction:column;gap:22px}.sa-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        label{display:flex;flex-direction:column;gap:8px;font-size:18px;line-height:1.3;font-weight:500;color:#34415a}
        input,select,textarea{box-sizing:border-box;width:100%;border:1px solid #cfd7e3;border-radius:12px;background:#fff;color:#1f2937;font:inherit;font-size:17px;padding:15px 17px;outline:none;min-height:58px}
        input:focus,select:focus,textarea:focus{border-color:#00adf4;box-shadow:0 0 0 3px rgba(0,173,244,.14)}
        small{margin-top:-3px;color:#7b869b;font-size:15px;font-weight:400}.sa-phone{display:grid;grid-template-columns:146px 1fr;border:1px solid #cfd7e3;border-radius:12px;overflow:hidden}.sa-phone:focus-within{border-color:#00adf4;box-shadow:0 0 0 3px rgba(0,173,244,.14)}
        .sa-phone select,.sa-phone input{border:0;border-radius:0;box-shadow:none!important}.sa-phone select{border-right:1px solid #dbe1ea;padding-right:8px}.sa-phone input{min-width:0}
        textarea{resize:vertical;min-height:150px}button{width:100%;border:0;border-radius:12px;background:linear-gradient(100deg,#05acec,#79cdf1);color:#fff;padding:20px 24px;font-size:21px;font-weight:700;cursor:pointer;box-shadow:0 7px 16px rgba(0,173,244,.22)}
        button:hover{filter:brightness(.98)}button:disabled{cursor:wait;opacity:.65}.sa-error{margin:0;color:#b42318;font-size:14px}.sa-hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}
        @media(max-width:700px){.sa-form-card{padding:26px 20px 30px;border-radius:18px}h2{font-size:25px}.sa-grid{grid-template-columns:1fr;gap:22px}label{font-size:17px}.sa-phone{grid-template-columns:122px 1fr}button{font-size:19px}}
      `}</style>
    </div>
  );
}
