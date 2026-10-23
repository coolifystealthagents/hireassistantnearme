# Service-led research link ledger

Updated: 2026-10-23

This is an execution ledger, not a published page or a claim about rankings. It records whether an existing reader path can be changed safely. It does not create a new reader-facing link when the proposed source no longer renders as a page.

## Reconciled retired research routes

| Former research source | Intended service destination | Artifact result | Current relationship | Next safe action |
| --- | --- | --- | --- | --- |
| `/research/bookkeeping-source-records-boundary` | `/services/bookkeeping-administration` | The former research URL returns a local `308` to the service route. The service route renders the H1 `Bookkeeping Administration`, has its self-canonical, and is in the generated sitemap. | The source has no route-local `<main>` where a contextual link can render. It is not a valid handoff source and is non-duplicable. | Do not add a link to the retired source. Select a published blog or another generated route only after it has a self-canonical artifact. |
| `/research/ecommerce-order-exception-ownership` | `/services/ecommerce-assistance` | The former research URL returns a local `308` to the service route. The service route renders the H1 `Ecommerce Assistance`, has its self-canonical, and is in the generated sitemap. | The source has no route-local `<main>` where a contextual link can render. It is not a valid handoff source and is non-duplicable. | Do not add a link to the retired source. Select a published blog or another generated route only after it has a self-canonical artifact. |

## Existing connected control pair

`/research/lead-follow-up-consent-records` is also retired by the current content policy. Do not use it as an active source or add a second service link.

## Published-cornerstone handoff — 2026-10-23

| Published source | Replaced path | Reader-useful destination | Local artifact result | Decision boundary |
| --- | --- | --- | --- | --- |
| `/blog/general-office-clerk-outlook-task-design-2026` | Retired `/research/general-office-clerk-outlook-2024-2034` | `/services/project-coordination` | The fresh route artifact has one self-canonical, its expected H1, and one route-local `/services/project-coordination` anchor. The destination has its own expected H1, self-canonical, and generated-sitemap entry. | The guide keeps payments, account recovery, sensitive exports, final customer promises, and other listed decisions with the accountable owner. The service link prepares a coordination lane; it does not grant authority. |

## Verification record

- Fresh local build on 2026-10-23 passed `npm run lint`, the declared source suite (19 optimization contracts plus the H1 contract), `next build`, and the 16/16 artifact contract.
- A local production-server probe with the canonical host and HTTPS forwarding headers parsed the source and destination HTML independently. It found the source H1, its sole canonical, and the new service anchor in `<main>`; it also found the destination H1 and sole canonical.
- Both canonical URLs are in the generated sitemap. The sitemap deliberately has no `<lastmod>` fields. This evidence is local source proof only and makes no deployment or public-route claim.
