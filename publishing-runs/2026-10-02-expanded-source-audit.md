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

## Local correction result

The replacement source graph was examined through these exact exports and composition points:

- `oct2IndependentBlogContent` in `app/oct2-blog-independent-content.ts`
- `oct2BlogPosts` in `app/oct2-blog-independent-posts.ts`
- `oct2IndependentResearchContent` in `app/research-oct2-independent-content.ts`
- `oct2Hira101ResearchPosts` in `app/research-oct2-independent-posts.ts`
- Blog aggregation import in `app/data.ts`
- Research aggregation import in `app/fleet-data.ts`
- `paragraphsFor`, independent inventory construction, paragraph ownership, and pairwise shingle loops in `scripts/audit-oct2-independent-source.mjs`
- rendered route loop and per-route checks in `scripts/validate-oct2-rendered.mjs`

The active adapters compose route metadata around already independent article bodies. They do not interpolate topic strings into common long prose. They do not reorder a common section bank. They do not generate a common scenario or argument. The scenario shown by the Blog renderer is drawn from that article's first five independently written sections, so it retains the article's own example sequence instead of a shared five-step script.

### Qualitative comparison

The twelve Blog articles use different opening situations, operational records, failure modes, review questions, and closing outcomes. Examples include a fence package moving to an HOA board packet, a recent-death call reaching an on-call funeral director, an optometry recall list separated from symptom triage, vendor documents tied to one wedding, and a surveying inquiry stopped before professional scope. No article can be reproduced by replacing the customer or industry nouns in another article.

The five Research studies also use different inquiry designs and analytical units. Payment-change research compares message evidence and independent vendor contact. Account recovery follows channel continuity and repeated attempts. Background screening tracks disclosure versions, consent, disputes, and adverse-action ownership. Comment moderation analyzes conversation clusters, edits, public support handoffs, and safety escalation. Fair-housing routing uses paired inquiries and compares the complete opportunity path. Their methods, examples, evidence treatment, analysis, and bounded conclusions are not reordered versions of one framework.

No shared long prose, common scenario engine, noun-substitution frame, or reordered argument sequence remains in the active October source graph.

### Automated evidence

- Exact inventory: 12 Blog and 5 Research
- Blog body lengths: 900 to 941 substantive words
- Research rendered body lengths: 1,311 to 1,348 substantive words
- Maximum pairwise five-word-shingle overlap across the independent source corpus: 0.66%
- Maximum pairwise five-word-shingle overlap within rendered Research: 0.11%
- Repeated substantive paragraphs: 0
- Repeated heading sequences: 0
- Forbidden shared-builder patterns in the active graph: 0
- Expanded source audit: PASS
- Research validator: PASS
- TypeScript: PASS
- Homepage H1 contract: PASS
- Clean production build: PASS, 731 static pages
- Rendered October routes: 17/17 pass exact title/H1, date, canonical-path, image reference, unique-body presence, and rendered-hash capture

## Corrected verdict

The local correction is **READY FOR REVIEW**. This verdict applies only to branch `hira-102-independent-rewrite-local`; it does not alter the already deployed production SHA. No production push or deployment was performed.
