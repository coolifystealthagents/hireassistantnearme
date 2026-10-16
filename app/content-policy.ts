import { blogPosts } from './data';
import { researchPosts } from './fleet-data';

type UnknownRecord = Record<string, unknown>;

const wordCount = (value: string) => (value.match(/\b[\w'-]+\b/g) || []).length;

function narrativeStrings(value: unknown, out = new Set<string>()): Set<string> {
  if (typeof value === 'string') {
    const text = value.replace(/\s+/g, ' ').trim();
    if (text.length >= 100 && !/^https?:\/\//.test(text)) out.add(text);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => narrativeStrings(item, out));
    return out;
  }
  if (value && typeof value === 'object') {
    Object.entries(value as UnknownRecord).forEach(([key, item]) => {
      if (!['title', 'imageAlt', 'revision', 'slug', 'url', 'href', 'label', 'name'].includes(key)) narrativeStrings(item, out);
    });
  }
  return out;
}

function substantiveSet<T extends { slug: string }>(posts: readonly T[]) {
  const byPost = new Map(posts.map((post) => [post.slug, narrativeStrings(post)]));
  const frequency = new Map<string, number>();
  byPost.forEach((strings) => strings.forEach((text) => frequency.set(text, (frequency.get(text) || 0) + 1)));
  return new Set(posts.filter((post) => {
    const strings = byPost.get(post.slug) || new Set<string>();
    const distinctWords = [...strings].filter((text) => (frequency.get(text) || 0) < 3).reduce((sum, text) => sum + wordCount(text), 0);
    return distinctWords >= 300;
  }).map((post) => post.slug));
}

const substantiveBlogSlugs = substantiveSet(blogPosts);
const substantiveResearchSlugs = substantiveSet(researchPosts);

export const publishedBlogPosts = blogPosts.filter((post) => substantiveBlogSlugs.has(post.slug));
export const publishedResearchPosts = researchPosts.filter((post) => substantiveResearchSlugs.has(post.slug));
export const retiredBlogSlugs = new Set(blogPosts.filter((post) => !substantiveBlogSlugs.has(post.slug)).map((post) => post.slug));
export const retiredResearchSlugs = new Set(researchPosts.filter((post) => !substantiveResearchSlugs.has(post.slug)).map((post) => post.slug));

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
  return target === '/services' && family === 'research' ? '/research' : target;
}

export function canonicalContentHref(href: string) {
  const blog = href.match(/^\/blog\/([^/?#]+)/);
  if (blog && retiredBlogSlugs.has(blog[1])) return consolidationTarget(blog[1], 'blog');
  const research = href.match(/^\/research\/([^/?#]+)/);
  if (research && retiredResearchSlugs.has(research[1])) return consolidationTarget(research[1], 'research');
  return href;
}
