# September 2, 2026 deployment manifest

Source batch: `6394375b07e668e79015dcc1bb6e8114486be580`

This manifest is intentionally unchanged. It is the deployment input for HIRA-75; it does not authorize deployment from an agent session.

## Blog (12)

- `/blog/morning-editorial-inbox-sort-for-daily-publishing`
- `/blog/assign-one-review-owner-to-every-daily-article`
- `/blog/prepare-a-writer-handoff-from-an-approved-research-note`
- `/blog/track-draft-versions-without-losing-editor-decisions`
- `/blog/run-a-prepublication-title-and-slug-collision-check`
- `/blog/record-source-access-dates-in-a-daily-claim-ledger`
- `/blog/separate-copy-edits-from-factual-corrections`
- `/blog/prepare-alt-text-review-using-approved-site-assets`
- `/blog/hold-late-breaking-edits-behind-a-release-gate`
- `/blog/verify-index-links-against-the-approved-daily-manifest`
- `/blog/write-an-end-of-shift-editorial-continuity-note`
- `/blog/audit-the-live-ready-manifest-before-deployment-handoff`

## Research (5)

- `/research/review-owner-clarity-in-daily-editorial-work`
- `/research/version-lineage-for-fast-moving-article-drafts`
- `/research/index-discoverability-as-a-publication-control`
- `/research/late-edit-risk-in-daily-publication-batches`
- `/research/handoff-reproducibility-for-daily-content-operations`

## Required operator checks

- Deploy the exact descendant SHA reported on HIRA-75.
- Confirm every route returns a direct HTTP 200 with no redirect or fallback.
- Confirm self-canonical metadata and visible `September 2, 2026`.
- Confirm structured `datePublished=2026-09-02`.
- Confirm Blog/Research index and sitemap inclusion.
- Confirm 17 unique rendered content hashes.
