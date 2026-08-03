'use client';

import { useEffect, useState } from 'react';
import profileData from './blog-banner-profile.json';

type Position = 'top' | 'middle' | 'bottom';
type Variant = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  weight: number;
};
type Profile = { siteKey: string; positions: Record<Position, Variant[]> };
type StoredStats = Record<string, Record<string, { impressions: number; clicks: number }>>;

const profile = profileData as Profile;

function isoWeek(date: Date) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const start = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  return Math.ceil((((utc.getTime() - start.getTime()) / 86400000) + 1) / 7);
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function pickVariant(items: Variant[], seed: string) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let point = hash(seed) % total;
  for (const item of items) {
    if (point < item.weight) return item;
    point -= item.weight;
  }
  return items[0];
}

function taggedHref(href: string, position: Position, variant: string, week: number) {
  const separator = href.includes('?') ? '&' : '?';
  const query = new URLSearchParams({
    utm_source: 'blog',
    utm_medium: 'banner',
    utm_campaign: 'weekly_cta',
    utm_content: `${position}_${variant}`,
    utm_term: `week_${week}`,
  });
  return `${href}${separator}${query.toString()}`;
}

function record(position: Position, variant: string, field: 'impressions' | 'clicks') {
  const key = `blog-banner-stats:${profile.siteKey}`;
  try {
    const stats = JSON.parse(localStorage.getItem(key) || '{}') as StoredStats;
    stats[position] ||= {};
    stats[position][variant] ||= { impressions: 0, clicks: 0 };
    stats[position][variant][field] += 1;
    localStorage.setItem(key, JSON.stringify(stats));
  } catch {
    // Analytics must never block the planning link.
  }
}

function pushEvent(event: 'blog_banner_impression' | 'blog_banner_click', position: Position, variant: string, week: number) {
  const browserWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  browserWindow.dataLayer ||= [];
  browserWindow.dataLayer.push({
    event,
    site_key: profile.siteKey,
    banner_position: position,
    banner_variant: variant,
    banner_week: week,
    utm_content: `${position}_${variant}`,
  });
}

export function BlogBanner({ position }: { position: Position }) {
  const variants = profile.positions[position];
  const week = isoWeek(new Date());
  const [variant, setVariant] = useState(variants[0]);

  useEffect(() => {
    const seedKey = `blog-banner-seed:${profile.siteKey}`;
    let browserSeed = localStorage.getItem(seedKey);
    if (!browserSeed) {
      browserSeed = `${Date.now()}-${Math.random()}`;
      localStorage.setItem(seedKey, browserSeed);
    }
    const selected = pickVariant(variants, `${browserSeed}:${position}:${week}`);
    setVariant(selected);
    record(position, selected.id, 'impressions');
    pushEvent('blog_banner_impression', position, selected.id, week);
  }, [position, variants, week]);

  const href = taggedHref(variant.href, position, variant.id, week);
  return <aside
    className="article-rotation-banner article-banner blog-conversion-banner"
    data-blog-banner-slot={position}
    data-blog-banner-variant={variant.id}
    aria-label={`${position} article offer`}
  >
    <div>
      <p className="eyebrow article-kicker">{variant.eyebrow}</p>
      <h2>{variant.title}</h2>
      <p>{variant.body}</p>
    </div>
    <a
      className="btn primary"
      href={href}
      onClick={() => {
        record(position, variant.id, 'clicks');
        pushEvent('blog_banner_click', position, variant.id, week);
      }}
    >{variant.cta}</a>
  </aside>;
}
