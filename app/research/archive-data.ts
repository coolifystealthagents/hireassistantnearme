import { publishedResearchPosts } from '../content-policy';

export const researchArchivePageSize = 24;

export function sortedResearchPosts() {
  return [...publishedResearchPosts].sort((a, b) =>
    b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug),
  );
}

export function archivedResearchPosts() {
  return sortedResearchPosts().slice(9);
}

export function researchArchivePageCount() {
  return Math.ceil(archivedResearchPosts().length / researchArchivePageSize);
}
