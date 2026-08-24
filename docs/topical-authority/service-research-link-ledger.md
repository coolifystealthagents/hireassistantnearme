# Service-led research link ledger

Updated: 2026-08-24

This is an execution ledger, not a published page or a claim about rankings. It maps already-rendered research questions to the Philippines-only service pages that answer the next practical question. The reader should see the link only when the research page has established the boundary for that task lane.

## Confirmed routes

| Research source | Reader question answered by the source | Service destination | Destination intent | Current relationship | Next safe edit |
| --- | --- | --- | --- | --- | --- |
| `/research/bookkeeping-source-records-boundary` | What work can be prepared after source records are complete, and what must remain with the owner or bookkeeper? | `/services/bookkeeping-administration` | Philippines-based bookkeeping administration with record, approval, and review boundaries | The research route currently links only to `/research`; its source data has no `/services/bookkeeping-administration` href. | Add one related-service link after the source list. Label it around planning bookkeeping administration, not tax, reconciliation, payments, or filing. |
| `/research/ecommerce-order-exception-ownership` | Which order-status tasks can be prepared without granting refund or customer-remedy authority? | `/services/ecommerce-assistance` | Philippines-based ecommerce support with documented responsibilities and manager review | The research route currently links only to `/research`; its source data has no `/services/ecommerce-assistance` href. | Add one related-service link after the source list. Keep refunds, substitutions, disputes, and customer promises with the owner. |

## Already connected control pair

`/research/lead-follow-up-consent-records` already points to `/services/sales-administrative-support`. Do not add a second service link to that route unless the existing handoff is replaced after an editorial review.

## Release checks for either candidate

1. Confirm the route data still contains the research question, its listed sources, and no existing destination href.
2. Confirm the service remains in `fleetServices`, then build and inspect both generated routes for their expected H1 values and the new source-side label/href.
3. Confirm both routes remain in the generated sitemap. The current sitemap has no `<lastmod>` fields, so route inclusion rather than an invented freshness date is the contract.
4. Run the repository build. Commit, push, use the established deployment workflow only if its required environment is present, and verify the exact marker, H1, and canonical on apex and `www` before calling a public change complete.
