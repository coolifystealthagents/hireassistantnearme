# HIRA-102 expanded source audit

## Scope

Read-only production QA was requested after the successful 17-route verification. The deployed SHA remains `f25a8bf3191f1702a5846aff5f543f7db5fde424`. No production push or deployment is authorized for this correction.

Exact source files examined:

- `app/oct2-blog.ts`
- `app/research-oct2-hira101.ts`
- `app/data.ts` import and Blog aggregation
- `app/fleet-data.ts` import and Research aggregation
- `app/blog/[slug]/page.tsx` rich Blog renderer
- `app/research/[slug]/page.tsx` Research renderer
- `scripts/validate-oct2-research.mjs`
- `publishing-runs/2026-10-02-combined-hira-102.json`

## Finding

The earlier qualitative verdict was incorrect. Exact paragraph comparison and unique heading sequences did not reveal the source-level construction method.

`app/oct2-blog.ts` contains a shared article engine:

- `profiles.map(...)`
- `rawSections`
- `voices`
- `personalize(...)`
- `sectionPlans`

This creates the same long argument blocks, substitutes topic nouns, and reorders a common frame. The twelve Blog articles therefore fail the expanded independence requirement even though their exact-paragraph duplicate count is zero and their five-word-shingle score is below 50%.

`app/research-oct2-hira101.ts` also contains a shared article engine:

- `seeds.map(post)`
- `post(...)`
- `baseSections`
- `researchPlans`

The five studies contain substantial topic-specific case material, but shared wrapper paragraphs and reordered common sections still make the source non-independent under the clarified rule.

## Verdict

Expanded source audit: **FAIL for both families**. The successful deployment and 17-route live evidence remain historically accurate, but they do not cure this editorial defect.

## Local correction controls

The local-only branch is `hira-102-independent-rewrite-local`, based on the deployed SHA. `scripts/audit-oct2-independent-source.mjs` is a new blocking control. It rejects the known mapped builders and substitution/reordering constants, repeated substantive paragraphs, and repeated heading sequences. Final review also requires manual comparison of scenario, argument, examples, analysis, and outcomes, because a numeric control cannot prove editorial independence.

Gemini CLI was attempted once and returned `API_KEY_INVALID`. No credential-restoration claim is made. The correction must be written directly and remain local until review authorizes any later action.
