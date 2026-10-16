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
]);

export const publishedBlogPosts = blogPosts.filter((post) => approvedBlogSlugs.has(post.slug));
export const retiredBlogSlugs = new Set(blogPosts.filter((post) => !approvedBlogSlugs.has(post.slug)).map((post) => post.slug));

// The former research collection consisted of repeated date-batch templates.
// Preserve its URLs through redirects, but do not advertise those pages as research.
export const publishedResearchPosts = researchPosts.filter(() => false);
export const retiredResearchSlugs = new Set(researchPosts.map((post) => post.slug));

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
