import reviewProvenance from './review-provenance.json';

const stealthAgentsReviewSource = reviewProvenance.source;
const stealthAgentsReviews = reviewProvenance.records;

export function TestimonialsRail({ contact = false }: { contact?: boolean }) {
  const headingId = contact ? 'contact-stealth-agents-reviews' : 'booking-stealth-agents-reviews';

  return <section className={`sa-testimonials${contact ? ' sa-testimonials-contact' : ''}`} aria-labelledby={headingId}>
    <div className="sa-testimonial-heading"><div><p>Verified first-party collection</p><h2 id={headingId}>StealthAgents reviews</h2></div><a href={stealthAgentsReviewSource} rel="noreferrer">Source</a></div>
    <div className="sa-testimonial-viewport" role="region" aria-labelledby={headingId} aria-describedby={`${headingId}-hint`}>
      <div className="sa-testimonial-track">
        {[...stealthAgentsReviews, ...stealthAgentsReviews].map((item, index) => <article className="sa-testimonial-card" key={`${item.name}-${index}`} tabIndex={index < stealthAgentsReviews.length ? 0 : -1} aria-hidden={index >= stealthAgentsReviews.length ? true : undefined} data-review-copy={index >= stealthAgentsReviews.length ? "true" : undefined} aria-label={`Review ${index + 1} of ${stealthAgentsReviews.length}`}>
          <div className="sa-testimonial-stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
          <h3>{item.headline}</h3><blockquote>“{item.body}”</blockquote><p>{item.name}</p><span className="sa-testimonial-source">{item.detail}</span>
        </article>)}
      </div>
    </div>
    <p className="sa-testimonial-hint" id={`${headingId}-hint`}>Reviews scroll automatically. Use Tab to read each review <span aria-hidden="true">→</span></p>
  </section>;
}
