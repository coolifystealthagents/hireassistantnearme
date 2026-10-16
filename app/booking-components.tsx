'use client';
import { useState } from 'react';

const commitments = [
  { headline: 'A scoped first conversation', body: 'The staffing discussion starts with recurring work, systems, working hours, and the decisions that stay with your team.' },
  { headline: 'A bounded role brief', body: 'Candidate matching uses the support area, schedule, tools, and review boundaries you provide rather than an all-purpose assistant label.' },
  { headline: 'A controlled first handoff', body: 'The initial plan uses examples, limited access, named reviewers, and a clear route for exceptions before the work expands.' },
];

export function TestimonialsRail({ contact = false }: { contact?: boolean }) {
  const [paused, setPaused] = useState(false);
  const repeated = [...commitments, ...commitments];
  const headingId = contact ? 'contact-process-commitments' : 'booking-process-commitments';
  return <section className={`sa-testimonials${contact ? ' sa-testimonials-contact' : ''}${paused ? ' is-paused' : ''}`} aria-labelledby={headingId}>
    <div className="sa-testimonial-heading"><h2 id={headingId}>What to expect from the staffing team</h2></div>
    <button className="sa-testimonial-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? 'Play guidance' : 'Pause guidance'}</button>
    <div className="sa-testimonial-viewport" tabIndex={0} aria-label="Staffing process guidance">
      <div className="sa-testimonial-track">
        {repeated.map((item, index) => <article className="sa-testimonial-card" key={`${item.headline}-${index}`} aria-hidden={index >= commitments.length ? true : undefined}><h3>{item.headline}</h3><p>{item.body}</p></article>)}
      </div>
    </div>
  </section>;
}
