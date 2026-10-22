# Service-led research link ledger

Updated: 2026-10-22

This is an execution ledger, not a published page or a claim about rankings. It records whether an existing reader path can be changed safely. It does not create a new reader-facing link when the proposed source no longer renders as a page.

## Reconciled retired research routes

| Former research source | Intended service destination | Artifact result | Current relationship | Next safe action |
| --- | --- | --- | --- | --- |
| `/research/bookkeeping-source-records-boundary` | `/services/bookkeeping-administration` | The former research URL returns a local `308` to the service route. The service route renders the H1 `Bookkeeping Administration`, has its self-canonical, and is in the generated sitemap. | The source has no route-local `<main>` where a contextual link can render. It is not a valid handoff source and is non-duplicable. | Do not add a link to the retired source. Select a published blog or another generated route only after it has a self-canonical artifact. |
| `/research/ecommerce-order-exception-ownership` | `/services/ecommerce-assistance` | The former research URL returns a local `308` to the service route. The service route renders the H1 `Ecommerce Assistance`, has its self-canonical, and is in the generated sitemap. | The source has no route-local `<main>` where a contextual link can render. It is not a valid handoff source and is non-duplicable. | Do not add a link to the retired source. Select a published blog or another generated route only after it has a self-canonical artifact. |

## Existing connected control pair

`/research/lead-follow-up-consent-records` is also retired by the current content policy. Do not use it as an active source or add a second service link.

## Verification record

- Fresh local build on 2026-10-22 passed the declared test, type, build, and artifact gates.
- Both former research URLs redirect under the local production server, and both intended service routes have a self-canonical, expected H1, and sitemap inclusion.
- The sitemap deliberately has no `<lastmod>` fields. This is a source-only ledger reconciliation, so no deployment or public-route claim is made.
