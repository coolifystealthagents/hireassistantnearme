type EditorialCardProps = {
  href: string;
  title: string;
  excerpt: string;
  image: { src: string; alt: string; width: number; height: number };
  published: string;
  kind: 'Guide' | 'Research brief';
  minutes?: number;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatEditorialDate(value: string) {
  return dateFormatter.format(new Date(`${value.slice(0, 10)}T00:00:00Z`));
}

export function EditorialCard({ href, title, excerpt, image, published, kind, minutes }: EditorialCardProps) {
  return <article className="editorial-card">
    <a className="editorial-image-link" href={href} aria-label={`Read ${title}`}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
    </a>
    <div className="editorial-card-body">
      <p className="editorial-meta">
        <span>{kind}</span>
        {minutes ? <span>{minutes} min read</span> : null}
        <time dateTime={published}>{formatEditorialDate(published)}</time>
      </p>
      <h2><a href={href}>{title}</a></h2>
      <p>{excerpt}</p>
      <a className="text-link" href={href}>Read {kind.toLowerCase()} <span aria-hidden="true">→</span></a>
    </div>
  </article>;
}
