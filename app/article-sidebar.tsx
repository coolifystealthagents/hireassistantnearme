'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; label: string; level: 2 };

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'section';
}

export function ArticleSidebar({ title, headings = [], kind = 'guide' }: { title: string; headings?: TocItem[]; kind?: 'guide' | 'research brief' }) {
  const [items, setItems] = useState<TocItem[]>(headings);
  const [active, setActive] = useState('');

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-article-body]');
    if (!root) return;
    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2'));
    const used = new Set<string>();
    const next = headings.map((heading) => {
      const base = heading.id || slugify(heading.textContent || 'section');
      let id = base;
      let count = 2;
      while (used.has(id)) id = `${base}-${count++}`;
      used.add(id);
      heading.id = id;
      const level: TocItem['level'] = 2;
      return { id: heading.id, label: heading.textContent?.trim() || 'Section', level };
    });
    setItems(next);
    setActive(next[0]?.id || '');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target.id) setActive(visible[0].target.id);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 1] });
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  const links = items.map((item) => <a className={`toc-level-${item.level}${active === item.id ? ' is-active' : ''}`} href={`#${item.id}`} key={item.id} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>);

  return <>
    <details className="mobile-toc"><summary>On this page</summary><nav>{links}</nav></details>
    <aside className="article-sidebar" aria-label={`On this page: ${title}`}>
      <div><p>On this page</p><nav>{links}</nav><section className="article-sidebar-context" aria-label={`${kind === 'guide' ? 'Guide' : 'Research'} context`}><strong>Published by Hire Assistant Near Me</strong><span>Use this {kind} to evaluate {title.toLowerCase()} before discussing a Philippines-based role.</span><a href="/services">Browse related services</a><a href={kind === 'guide' ? '/blog' : '/research'}>{kind === 'guide' ? 'Read all hiring guides' : 'Browse the research library'}</a></section><a className="article-sidebar-cta" href="/contact-us">Discuss this role</a></div>
    </aside>
  </>;
}
