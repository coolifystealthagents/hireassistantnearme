import { blogPosts } from './data';
import { researchPosts } from './fleet-data';

// Explicit editorial release manifest. These five cornerstone guides were retained
// after source and claim review. Date-generated article batches are deliberately
// excluded rather than cosmetically rewritten or scored by mutable similarity rules.
export const approvedBlogSlugs = new Set([
  'local-vs-remote-administrative-assistant-benchmark-2026',
  'administrative-assistant-benchmarks-small-business-2026',
  'hire-filipino-virtual-assistant',
  'virtual-assistant-security-checklist',
  'general-office-clerk-outlook-task-design-2026',
  'assistant-trial-task-safety',
  'assistant-reference-consent-control',
  'interview-schedule-accommodation-route',
  'candidate-equipment-readiness-check',
  'availability-claim-verification',
  'language-assessment-evidence',
  'background-check-vendor-coordination',
  'offer-letter-version-control',
  'onboarding-buddy-assignment',
  'probation-checkin-evidence',
  'offboarding-knowledge-capture',
  'provider-replacement-continuity',
]);

export const publishedBlogPosts = blogPosts.filter((post) => approvedBlogSlugs.has(post.slug));

const editorialCards: Record<string, { src: string; alt: string; width: number; height: number }> = {
  'local-vs-remote-administrative-assistant-benchmark-2026': {
    src: '/images/local-vs-remote-admin-benchmark-2026.webp',
    alt: 'Editorial comparison of local and remote administrative support',
    width: 1672, height: 941,
  },
  'administrative-assistant-benchmarks-small-business-2026': {
    src: '/images/administrative-assistant-benchmarks-2026.webp',
    alt: 'Editorial chart for administrative assistant workload benchmarks',
    width: 1672, height: 941,
  },
  'hire-filipino-virtual-assistant': {
    src: '/images/aug21-blog-role-briefs.webp',
    alt: 'Editorial illustration of a structured assistant role brief',
    width: 1536, height: 1024,
  },
  'virtual-assistant-security-checklist': {
    src: '/images/sep3-research-least-privilege.webp',
    alt: 'Editorial illustration of least-privilege access controls',
    width: 1536, height: 1024,
  },
  'general-office-clerk-outlook-task-design-2026': {
    src: '/images/aug20-blog-meeting-notes.webp',
    alt: 'Editorial illustration of office notes and assigned follow-up tasks',
    width: 1024, height: 1024,
  },
  'assistant-trial-task-safety': { src: '/images/oct22-assistant-trial-task-safety.png', alt: 'Assistant trial task safety illustrated workflow', width: 1200, height: 630 },
  'assistant-reference-consent-control': { src: '/images/oct22-assistant-reference-consent-control.png', alt: 'Assistant reference consent control illustrated workflow', width: 1200, height: 630 },
  'interview-schedule-accommodation-route': { src: '/images/oct22-interview-schedule-accommodation-route.png', alt: 'Interview schedule accommodation route illustrated workflow', width: 1200, height: 630 },
  'candidate-equipment-readiness-check': { src: '/images/oct22-candidate-equipment-readiness-check.png', alt: 'Candidate equipment readiness check illustrated workflow', width: 1200, height: 630 },
  'availability-claim-verification': { src: '/images/oct22-availability-claim-verification.png', alt: 'Availability claim verification illustrated workflow', width: 1200, height: 630 },
  'language-assessment-evidence': { src: '/images/oct22-language-assessment-evidence.png', alt: 'Language assessment evidence illustrated workflow', width: 1200, height: 630 },
  'background-check-vendor-coordination': { src: '/images/oct22-background-check-vendor-coordination.png', alt: 'Background check vendor coordination illustrated workflow', width: 1200, height: 630 },
  'offer-letter-version-control': { src: '/images/oct22-offer-letter-version-control.png', alt: 'Offer letter version control illustrated workflow', width: 1200, height: 630 },
  'onboarding-buddy-assignment': { src: '/images/oct22-onboarding-buddy-assignment.png', alt: 'Onboarding buddy assignment illustrated workflow', width: 1200, height: 630 },
  'probation-checkin-evidence': { src: '/images/oct22-probation-checkin-evidence.png', alt: 'Probation checkin evidence illustrated workflow', width: 1200, height: 630 },
  'offboarding-knowledge-capture': { src: '/images/oct22-offboarding-knowledge-capture.png', alt: 'Offboarding knowledge capture illustrated workflow', width: 1200, height: 630 },
  'provider-replacement-continuity': { src: '/images/oct22-provider-replacement-continuity.png', alt: 'Provider replacement continuity illustrated workflow', width: 1200, height: 630 },
};

export function editorialCard(slug: string) {
  const card = editorialCards[slug];
  if (!card) throw new Error(`Missing approved editorial card for ${slug}`);
  return card;
}

export const retiredBlogSlugs = new Set(blogPosts.filter((post) => !approvedBlogSlugs.has(post.slug)).map((post) => post.slug));

// The former research collection consisted of repeated date-batch templates.
// Preserve its URLs through redirects, but do not advertise those pages as research.
const oct22ResearchSlugs = new Set(['trial-task-evidence-completeness-study','reference-check-latency-study','interview-reschedule-impact-study','equipment-readiness-failure-study','replacement-continuity-evidence-study']);
export const publishedResearchPosts = researchPosts.filter((post) => oct22ResearchSlugs.has(post.slug));
export const retiredResearchSlugs = new Set(researchPosts.filter((post) => !oct22ResearchSlugs.has(post.slug)).map((post) => post.slug));

function topicTarget(slug: string) {
  if (/(security|access|permission|privacy|mfa|phishing|credential|incident|offboard|retention)/.test(slug)) return '/blog/virtual-assistant-security-checklist';
  if (/(bookkeep|accounting|invoice|payment|financial|month-end)/.test(slug)) return '/services/bookkeeping-administration';
  if (/(calendar|appointment|schedule|inbox|email)/.test(slug)) return '/services/calendar-and-inbox-support';
  if (/(customer|support|ticket|escalation|feedback)/.test(slug)) return '/services/customer-service-assistance';
  if (/(sales|crm|lead|follow-up|renewal)/.test(slug)) return '/services/sales-administrative-support';
  if (/(ecommerce|order|product|inventory|return|refund)/.test(slug)) return '/services/ecommerce-assistance';
  if (/(real-estate|property|listing|transaction)/.test(slug)) return '/services/real-estate-assistance';
  if (/(content|marketing|newsletter|podcast|social|research|source|claim|publish)/.test(slug)) return '/services/marketing-coordination';
  if (/(recruit|candidate|hiring|interview|applicant)/.test(slug)) return '/services/recruitment-assistance';
  if (/(executive|meeting|project|operations|workflow|handoff|task|document|dashboard)/.test(slug)) return '/services/project-coordination';
  return '/services';
}

export function consolidationTarget(slug: string, family: 'blog' | 'research') {
  const target = topicTarget(slug);
  return target === '/services' && family === 'research' ? '/blog' : target;
}

export function canonicalContentHref(href: string) {
  if (href === '/research' || href.startsWith('/research?') || href.startsWith('/research#')) return '/blog';
  const blog = href.match(/^\/blog\/([^/?#]+)/);
  if (blog && retiredBlogSlugs.has(blog[1])) return consolidationTarget(blog[1], 'blog');
  const research = href.match(/^\/research\/([^/?#]+)/);
  if (research && retiredResearchSlugs.has(research[1])) return consolidationTarget(research[1], 'research');
  return href;
}
