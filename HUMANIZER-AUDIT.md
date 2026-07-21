# Humanizer audit

Date: 2026-07-21

## Scope

Reviewed the user-facing marketing and editorial copy across the homepage, shared site data, header, footer, contact flow, comparison page, blog index, article template, article data, and site metadata.

Reviewed files:

- `app/page.tsx`
- `app/data.ts`
- `app/components.tsx`
- `app/contact/page.tsx`
- `app/thank-you/page.tsx`
- `app/compare/local-vs-remote-assistant/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/layout.tsx`

## What changed

- Repaired copy damaged by an earlier broad replacement, including phrases such as "higher plan," "can plan less," "lower plan," and "staffing details changes."
- Rewrote the budget guide around duties, hours, location, pay structure, and review time without publishing invented prices.
- Removed unsupported claims that presented a fixed pilot size, review window, or ramp time as the best or common choice.
- Replaced broad corporate copy in the footer, shared CTA, metadata, and contact page with direct language about tasks, access, review, and owner approvals.
- Cut forced three-part fragments and replaced "cadence," "scaling," and generic "practical scope" wording where a simpler sentence worked better.
- Tightened the local-versus-remote comparison so each warning matches its option and no damaged pricing language remains.
- Reworked the shared article close and provider-call module so they read like useful instructions rather than a generic conclusion.
- Fixed three issues found during visual review: an unclear hero phrase, a location option that mixed place and schedule, and a portrait disclaimer that described the images as settings.
- Increased the size and contrast of helper text in the hero card, city cards, guide rail, planning box, and footer.

## Final anti-AI pass

The first pass still had a few tidy list patterns, unsupported safety language, and fixed pilot numbers that sounded more certain than the site could support. The final pass removed those claims, varied the sentence rhythm, and kept concrete details such as inboxes, calendars, CRM access, owner passwords, pay-rate changes, and review rules.

A focused scan found no remaining chatbot artifacts, significance puffery, common AI vocabulary from the audit list, em dashes, or curly quote marks in the reviewed source.

## Exclusions

The privacy, terms, cancellation, and cancellation-policy pages were excluded. Their legal meaning and wording were not changed. No testimonials, client results, candidate identities, prices, credentials, statistics, or first-person stories were added. Existing route slugs, schema types, citations, and conversion paths were preserved.
