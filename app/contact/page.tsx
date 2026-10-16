import { permanentRedirect } from 'next/navigation';

export const metadata = { title: 'Contact Us', robots: { index: false, follow: true } };

export default function LegacyContactPage() {
  permanentRedirect('/contact-us');
}
