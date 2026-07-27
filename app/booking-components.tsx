'use client';
import { useState } from 'react';

const testimonials = [
  { name: "Erika Giron", quote: "We went from 300 hours a month to over 2,500 hours with Stealth Agents." },
  { name: "Owen Hone", quote: "Outstanding service. Less than 24-hour VA placement. Fast, high-quality. I have hired multiple times." },
  { name: "McKay Jaeckel", quote: "The easiest VA onboarding process. Communicative and helpful throughout." },
];

export function TestimonialsRail({ contact = false }: { contact?: boolean }) {
  const [paused, setPaused] = useState(false);
  const repeated = [...testimonials, ...testimonials];
  return (
    <section className={`sa-testimonials${contact ? ' sa-testimonials-contact' : ''}${paused ? ' is-paused' : ''}`} aria-labelledby={contact ? 'contact-client-reviews' : 'booking-client-reviews'}>
      <div className="sa-testimonial-heading">
        <span aria-hidden="true">★★★★★</span>
        <h2 id={contact ? 'contact-client-reviews' : 'booking-client-reviews'}>What Stealth Agents clients say</h2>
      </div>
      <button className="sa-testimonial-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
        {paused ? 'Play testimonials' : 'Pause testimonials'}
      </button>
      <div className="sa-testimonial-viewport">
        <div className="sa-testimonial-track">
          {repeated.map((review, index) => (
            <article className="sa-testimonial-card" key={`${review.name}-${index}`} aria-hidden={index >= testimonials.length ? true : undefined}>
              <div className="sa-testimonial-stars"><span aria-hidden="true">★★★★★</span><span className="sa-sr-only">5 out of 5 stars</span></div>
              <blockquote>“{review.quote}”</blockquote>
              <p>— {review.name}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="sa-testimonial-source">Source: <a href="https://stealthagents.com/" target="_blank" rel="noopener noreferrer">Stealth Agents client testimonials</a>.</p>
    </section>
  );
}
