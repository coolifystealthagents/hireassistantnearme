import StandardContactForm from "./StandardContactForm";
export default function ContactUsPage() { return <main style={{padding: "48px 20px", background: "#063866"}}><StandardContactForm endpoint="/api/contact" encoding="form" /></main>; }
