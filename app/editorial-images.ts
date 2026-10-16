const groups: readonly { terms: readonly string[]; images: readonly string[] }[] = [
  { terms: ['calendar', 'schedule', 'booking', 'timezone', 'appointment'], images: ['/images/aug20-blog-calendar-conflicts.webp', '/images/aug21-blog-calendar-repair.webp', '/images/aug23-research-timezone-handoff.webp', '/images/aug20-research-calendar-handoff.webp'] },
  { terms: ['inbox', 'email', 'message'], images: ['/images/aug20-blog-inbox-triage.webp', '/images/aug21-blog-newsletter-queues.webp', '/images/aug20-blog-reminder-queues.webp'] },
  { terms: ['crm', 'sales', 'lead', 'followup', 'follow-up'], images: ['/images/aug20-blog-crm-cleanup.webp', '/images/aug21-research-followup-consent.webp', '/images/aug20-research-record-provenance.webp'] },
  { terms: ['customer', 'support', 'ticket', 'escalation'], images: ['/images/aug20-blog-support-escalations.webp', '/images/aug20-research-dispatch-exception-queue.webp', '/images/aug21-research-role-boundary.webp'] },
  { terms: ['ecommerce', 'order', 'inventory', 'refund', 'return'], images: ['/images/aug20-blog-order-exceptions.webp', '/images/aug20-research-record-provenance.webp', '/images/aug21-blog-task-fit.webp'] },
  { terms: ['bookkeep', 'accounting', 'invoice', 'month-end', 'payment'], images: ['/images/aug20-blog-invoice-followup.webp', '/images/aug20-blog-source-ledger.webp', '/images/aug20-research-record-provenance.webp'] },
  { terms: ['recruit', 'candidate', 'interview', 'hiring'], images: ['/images/aug21-blog-interview-notes.webp', '/images/aug21-blog-role-briefs.webp', '/images/aug21-research-role-boundary.webp'] },
  { terms: ['real-estate', 'listing', 'transaction', 'property'], images: ['/images/aug20-blog-listing-admin.webp', '/images/aug20-blog-reminder-queues.webp', '/images/aug20-research-record-provenance.webp'] },
  { terms: ['content', 'editor', 'publish', 'research', 'source', 'claim', 'fact'], images: ['/images/aug21-blog-content-briefs.webp', '/images/aug21-blog-fact-checking.webp', '/images/aug20-blog-source-ledger.webp', '/images/aug23-research-source-scope.webp', '/images/aug23-research-claim-provenance.webp'] },
  { terms: ['marketing', 'campaign', 'newsletter', 'creative'], images: ['/images/aug20-blog-content-calendar.webp', '/images/aug21-blog-newsletter-queues.webp', '/images/aug21-blog-publishing-checklists.webp'] },
  { terms: ['meeting', 'project', 'handoff', 'approval', 'status'], images: ['/images/aug20-blog-meeting-notes.webp', '/images/aug21-blog-role-briefs.webp', '/images/aug21-research-evidence-map.webp', '/images/aug23-research-editor-boundary.webp'] },
  { terms: ['security', 'access', 'permission', 'privacy', 'mfa'], images: ['/images/sep3-research-least-privilege.webp', '/images/aug20-research-offboarding.webp', '/images/aug21-research-records-lifecycle.webp'] },
  { terms: ['vendor', 'onboarding'], images: ['/images/aug20-blog-vendor-onboarding.webp', '/images/aug21-blog-task-fit.webp'] },
];

const general = [
  '/images/aug21-blog-service-research.webp',
  '/images/aug21-blog-reading-queues.webp',
  '/images/aug21-blog-update-audits.webp',
  '/images/aug23-research-question-selection.webp',
  '/images/sep3-research-topic-distance.webp',
  '/images/sep3-research-counterevidence.webp',
  '/images/sep3-research-correction-reasons.webp',
] as const;

function stableIndex(value: string, size: number) {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % size;
}

export function editorialImage(slug: string) {
  const normalized = slug.toLowerCase();
  const group = groups.find(({ terms }) => terms.some((term) => normalized.includes(term)));
  const images = group?.images || general;
  return images[stableIndex(normalized, images.length)];
}
