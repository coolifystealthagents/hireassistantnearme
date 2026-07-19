import { Header, Footer } from '../components';
import { blogPosts, site } from '../data';
export const metadata = { title: 'Virtual assistant hiring blog' };
export default function Blog(){ return <><Header/><main className="section"><div className="container"><p className="eyebrow">Blog</p><h1>Plain guides for hiring assistant help</h1><p className="lead">Use these guides to compare costs, tasks, providers, and onboarding steps before you hire.</p><div className="cards">{blogPosts.map((p)=><a className="card" href={`/blog/${p.slug}`} key={p.slug}><h3>{p.title}</h3><p>{p.excerpt}</p><span className="pill">{p.minutes} min read</span></a>)}</div></div></main><Footer/></> }
