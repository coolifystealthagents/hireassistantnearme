import { permanentRedirect } from 'next/navigation';

export const metadata = { title: 'Cancellation Policy', robots: { index: false, follow: true } };

export default function LegacyCancellationPage() {
  permanentRedirect('/cancellation-policy');
}
