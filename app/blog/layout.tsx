import type { ReactNode } from 'react';
import { BlogBanner } from '../blog-banners';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>
    <BlogBanner position="top" />
    {children}
    <BlogBanner position="middle" />
    <BlogBanner position="bottom" />
  </>;
}
