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

## Active published-topic map — October 2026

| Published reader question | Existing service path | Current artifact state | Next safe action |
| --- | --- | --- | --- |
| Should a local administrative hire or a Philippines-based remote assistant handle this work? | `/services/calendar-and-inbox-support` | `/blog/local-vs-remote-administrative-assistant-benchmark-2026` has one route-local service anchor. | Keep the comparison focused on task location and review rules. Do not add a second generic service link. |
| What do current administrative benchmarks mean for a small-business role brief? | `/services/project-coordination` | `/blog/administrative-assistant-benchmarks-small-business-2026` has one route-local service anchor. | Keep the next step tied to a written scope, evidence, and owner. |
| How can an owner plan a Filipino virtual-assistant role? | `/services/executive-assistance`; `/services/calendar-and-inbox-support` | `/blog/hire-filipino-virtual-assistant` has one route-local anchor for each service. | Keep the two paths distinct: executive support for executive work and calendar support for routine scheduling or inbox work. |
| What should the first month of assistant access protect? | `/services/executive-assistance`; `/services/calendar-and-inbox-support` | `/blog/virtual-assistant-security-checklist` has scoped service anchors inside its published route. | Do not add a security-themed link unless it gives a different, immediate reader decision. |
| How can a team turn a general-office-clerk task list into a remote support brief? | `/services/project-coordination` | `/blog/general-office-clerk-outlook-task-design-2026` has one route-local service anchor. | Keep the existing coordination handoff. The accountable owner still decides on sensitive work and customer commitments. |

The five inventoried cornerstone articles already have reader-useful service paths. Their service links are rendered, so they are delivered and non-duplicable until a distinct reader question and destination are verified. This ledger does not claim a ranking effect or public rollout.

## Verification record

- Fresh local build on 2026-10-23 passed `npm run lint`, the declared source suite (19 optimization contracts plus the H1 contract), `next build`, and the 16/16 artifact contract.
- A local production-server probe with the canonical host and HTTPS forwarding headers parsed the source and destination HTML independently. It found the source H1, its sole canonical, and the new service anchor in `<main>`; it also found the destination H1 and sole canonical.
- Both canonical URLs are in the generated sitemap. The sitemap deliberately has no `<lastmod>` fields. This evidence is local source proof only and makes no deployment or public-route claim.
