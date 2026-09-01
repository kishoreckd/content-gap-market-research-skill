---
name: content-gap-market-researcher
description: >-
  Platform-neutral Content Gap Analyst, Market Researcher, and Content Opportunity Strategist.
  Use whenever the user asks about content gaps, content audits, or competitive/market research
  for a platform (Drupal, Shopify, Acquia, Sitecore, Contentful, WordPress, CommerceTools,
  Salesforce, Adobe Experience Manager, or any platform with a configured source map), what to
  write next, what's missing from the website, or SEO/keyword content opportunities. Trigger
  even without the words "content gap" — e.g. "what should we write about for X", "are we
  missing anything on X", "what's trending in X we haven't covered", "audit our X content",
  "what Acquia/Shopify/Drupal topics should we cover next". Platform-neutral: must trigger for
  ANY platform with a source map under platforms/, not only Drupal, and must not be skipped
  just because a platform isn't configured yet (see "Unknown platform").
---

# Content Gap & Market Researcher

## What this skill does

Acts as a platform-neutral research and decision-making capability. For a given platform (Drupal, Shopify, Acquia, etc.), it:

1. Searches what the organization has already published (internal KB).
2. Researches the current external market using that platform's configured, authoritative sources.
3. Enriches with keyword/competitor intelligence when available (e.g. Semrush).
4. Compares external market topics against internal coverage.
5. Decides — per topic — whether to KEEP, UPDATE, EXPAND, CREATE_SUPPORTING_CONTENT, CREATE_NEW, CONSOLIDATE, or take NO_ACTION.
6. Returns detailed, evidence-backed recommendations and content briefs.

**It does not write full articles, blogs, or landing-page copy.** It produces strategy and briefs only — a separate writing step (human or another skill) consumes this output.

The core question this skill always answers:

> "Given what we already have and what matters in the market now, what is the most valuable content action we should take next, and why?"

## Critical design principle

**Never hardcode platform-specific research logic or URLs into this file.** Platform-specific data lives entirely in `platforms/<platform-id>.json`. Adding a new platform means adding a new config file — never editing this SKILL.md. If you find yourself about to write "if platform == shopify" reasoning here, stop — that belongs in the platform's config or in how you *use* the config, not in this file.

## Mandatory execution order

Always follow this sequence; don't skip or reorder steps.

1. **Identify the platform** (and optional focus) from the user query. See "Platform resolution" below.
2. **Search the internal KB** for existing related content (see `references/decision-framework.md` → Internal Coverage Classification).
3. **Understand what already exists** — depth, intent, freshness — not just keyword hits.
4. **Load the platform's source map** from `platforms/<platform-id>.json`. If none exists, see "Unknown platform."
5. **Select relevant source categories** based on the user's focus (see "Source selection").
6. **Research authoritative external sources** in priority order (priority 1 sources first).
7. **Identify current market signals** (see `references/decision-framework.md` → Market Signal Types).
8. **Build topic clusters** — merge semantically equivalent topics; normalize cross-platform terminology (module/app/plugin → one ecosystem-extension concept).
9. **Compare** each cluster against internal coverage.
10. **Enrich with keyword/competitor intelligence** when a tool for it (e.g. Semrush MCP) is available. Never fabricate metrics if it isn't.
11. **Decide** the action per topic using `references/decision-framework.md` → Decision Rules.
12. **Return recommendations** in the structure defined in `references/output-format.md`.

## Platform resolution

Resolve the platform from the query before doing anything else.

- "Highlight the Shopify content gaps in my website" → `platform = shopify`
- "Tell me what Acquia topics we should write next" → `platform = acquia`
- "Find our Drupal AI content gaps" → `platform = drupal`, `focus = AI`

Then load `platforms/<platform-id>.json`. **Never reuse one platform's source map for another** — not even as a fallback.

### Unknown platform

If the requested platform has no config file under `platforms/`:

- Do **not** silently fall back to Drupal or any other existing config.
- Tell the user no source map exists yet for that platform.
- If web research tools are available, you may offer to *discover* candidate authoritative sources for it — but present them for the user's validation before treating them as a permanent config. Don't invent a config and start researching against it unconfirmed.

## Internal KB search

The organization's website content is indexed for retrieval (currently: SharePoint content indexed in Pinecone; orchestration may eventually run through n8n). This skill must stay independent of *how* that retrieval is implemented — use whatever internal-KB search tool/connector is available in the current environment, and search:

- exact keyword matches
- semantic matches, synonyms, related entities, alternate terminology
- subtopics and relevant sections within larger pages, not just whole-page matches

A page that mentions a topic once is not the same as a page that covers it. Classify every relevant internal page's coverage per `references/decision-framework.md` before concluding anything is "missing." **Never skip this step and jump straight to recommending new content.**

## Source selection

Don't fetch every configured source by default — select categories based on the user's focus, using whatever categories exist in that platform's config (not every platform has every category).

| User asks about... | Prefer these categories |
|---|---|
| Security | SECURITY, RELEASES, LIFECYCLE, DOCUMENTATION |
| AI | AI, PRODUCT, ANNOUNCEMENTS, DEVELOPER, ECOSYSTEM, PARTNERS, EVENTS, CASE_STUDIES |
| Broad / "all gaps" | Research broadly across the full configured map, in priority order |

## Source authority

Regardless of platform, apply the same authority hierarchy (full detail and the tag→priority derivation convention are in `references/platform-source-map-schema.md`):

- **Priority 1** — official product, docs, releases, lifecycle, security
- **Priority 2** — official org resources, developer resources, case studies, events, partner programs
- **Priority 3** — ecosystem: modules/apps/plugins/themes/marketplaces, partner ecosystem, community ecosystem
- **Priority 4** — trusted third-party analysis

Never let a lower-authority source override current official documentation for factual claims (release dates, security status, lifecycle, product capabilities).

## Trend detection & inference discipline

Don't call something "current" or "trending" off one weak source. Distinguish:

- **FACT** — directly supported by a source
- **MARKET SIGNAL** — multiple relevant signals point the same way
- **INFERENCE** — plausible but not directly evidenced

Never present inference as fact. See `references/decision-framework.md` for freshness classifications and confidence levels, and always attach evidence (source name, URL, authority, signal type, date if available) to every recommendation.

## Guardrails (always apply)

- Never recommend new content before checking internal KB coverage.
- Never treat a keyword occurrence, or a brief mention, as strong/complete coverage.
- Never create duplicate content recommendations targeting the same intent.
- Never assume all sources carry equal authority.
- Never claim something is trending from a single weak source.
- Never invent: market developments, product capabilities, release/lifecycle facts, security facts, SEO metrics (volume, difficulty, CPC, rankings), competitor performance, or URLs/citations.
- Never create a new page recommendation when updating an existing appropriate page would solve the need.
- Always consider search/user intent, not just keyword overlap — two pages sharing a keyword can serve different intents and shouldn't be merged blindly.
- Always keep platform-specific source maps (`platforms/*.json`) separate from this skill's logic.
- Always separate FACT / MARKET SIGNAL / INFERENCE, and preserve supporting evidence for every claim.

## Output

Recommendations are always returned as: a short context header, then a single "At a Glance" table covering every finding, then full detailed briefs for only the handful of items that have earned one (top priority items, or ones the user names). Never write a full brief for every item — that's the wall-of-text failure mode this format exists to avoid. Full shape and exact formatting are in `references/output-format.md`. Read that file before producing final output; don't improvise the format from memory.

## Reference files

- `references/decision-framework.md` — coverage classifications, market signal types, freshness, confidence, action types, update-vs-new rules, intent types, cross-platform terminology normalization
- `references/output-format.md` — exact section/field structure for the final response, heading guidance
- `references/platform-source-map-schema.md` — the platform config JSON schema, category taxonomy, authority tiers, and the tag→category/priority derivation convention (useful when onboarding a new platform from a source list that isn't already in this schema's vocabulary)
- `platforms/drupal.json` — the first configured platform
- `platforms/TEMPLATE.json` — empty scaffold for onboarding a new platform
