# Decision Framework

Read this before classifying internal coverage, tagging market signals, or deciding an action. This framework is identical for every platform — only the source data changes.

## Internal Coverage Classification

For every relevant internal page found during KB search, classify it based on topic depth, page purpose/intent, headings, concepts covered, questions answered, freshness, and whether the page could logically be expanded — **not** just whether a keyword appears.

| Coverage | Meaning |
|---|---|
| `STRONG` | Meaningfully and currently covers the topic |
| `PARTIAL` | Covered, but important information is missing |
| `WEAK` | Exists, but coverage is too shallow |
| `MENTION_ONLY` | Topic is only briefly referenced |
| `OUTDATED` | Exists, but key information is no longer current |
| `MISSING` | No meaningful content exists |

When comparing against a market topic, use the fuller comparison set: `STRONG_EXISTING`, `PARTIAL_EXISTING`, `OUTDATED_EXISTING`, `WEAK_EXISTING`, `MENTION_ONLY`, `MISSING`, `OVERLAPPING`.

## Market Signal Types

Use these to tag what an external source actually tells you — don't just summarize the source.

| Signal | What it captures |
|---|---|
| `PRODUCT_SIGNAL` | New products, features, capabilities, architecture |
| `RELEASE_SIGNAL` | New versions/releases |
| `LIFECYCLE_SIGNAL` | End-of-life, deprecation, migration, supported-version changes |
| `SECURITY_SIGNAL` | Advisories, vulnerabilities, security guidance |
| `TECHNICAL_SIGNAL` | Implementation/architecture changes |
| `API_SIGNAL` | New/changed API capabilities |
| `INTEGRATION_SIGNAL` | New integrations, ecosystem connections |
| `ECOSYSTEM_SIGNAL` | Apps/modules/plugins/extensions, partner or developer activity |
| `AI_SIGNAL` | AI agents, generative AI, semantic search, AI workflows, AI governance |
| `ENTERPRISE_SIGNAL` | Governance, security, scalability, compliance, accessibility, ops |
| `CUSTOMER_SIGNAL` | Customer use cases, recurring problems, implementation challenges |
| `COMMUNITY_SIGNAL` | Rising community activity or recurring topics |
| `PARTNER_SIGNAL` | Partner ecosystem growth, strategic partnerships |
| `EVENT_SIGNAL` | Topics repeatedly appearing at major official events |
| `EMERGING_SIGNAL` | A new topic showing rising activity across credible sources |

A market topic only earns "current/important" status when it's backed by more than one signal or source where possible — see Trend Detection in the main SKILL.md.

## Freshness

| Classification | When to use |
|---|---|
| `CURRENT` | Security, product announcements — prefer very recent info |
| `EMERGING` | New, rising activity |
| `ESTABLISHED` | Settled, broadly adopted |
| `EVERGREEN` | Older authoritative technical guidance that's still valid |
| `DECLINING` | Losing relevance |
| `HISTORICAL` | No longer actionable, background only |

## Confidence

| Level | Criteria |
|---|---|
| `HIGH` | Multiple current, authoritative sources support the conclusion |
| `MEDIUM` | Good evidence exists, some uncertainty remains |
| `LOW` | Evidence is limited or early-stage |

Don't make strong recommendations from LOW-confidence evidence unless the user explicitly wants experimental/emerging opportunities — flag it as such if you do.

## Search/User Intent

Consider intent, not just keyword overlap. Two pages sharing a keyword can still serve different purposes and shouldn't be merged or expanded into each other.

`INFORMATIONAL`, `COMMERCIAL`, `TRANSACTIONAL`, `NAVIGATIONAL`, `COMPARISON`, `IMPLEMENTATION`, `MIGRATION`, `TROUBLESHOOTING`, `STRATEGIC`

## Action Types

| Action | When |
|---|---|
| `KEEP` | Existing coverage is strong and current |
| `MINOR_UPDATE` | Small changes would improve an already-good page |
| `UPDATE_EXISTING` | Page exists but is outdated |
| `EXPAND_EXISTING` | Page is relevant but important current topics are missing |
| `CREATE_SUPPORTING_CONTENT` | An existing page covers a different intent (e.g. commercial) than the new opportunity (e.g. informational) — add a supporting page that links to it |
| `CREATE_NEW` | Topic is meaningfully missing and deserves independent, dedicated coverage |
| `CONSOLIDATE` | Multiple existing pages overlap heavily |
| `NO_ACTION` | The market topic doesn't justify a content change |

### Deciding UPDATE vs. NEW

**Prefer improving an existing page** when: the topic already exists, the user/search intent matches, the page could logically contain the new material, and the content is merely incomplete or outdated.

**Create new content** when: meaningful coverage is genuinely missing, the existing page serves a different intent, the subject needs independent depth, or folding it into an existing page would make that page unfocused.

**Example — CREATE_SUPPORTING_CONTENT:**
Existing page = "Platform Migration Services" (commercial intent). New market opportunity = "Platform Migration Checklist" (informational intent). → Recommend a new supporting guide that internally links back to the service page — don't force the checklist content into the commercial page, and don't skip the commercial page's existing link opportunity.

## Cross-Platform Terminology Normalization

Different platforms name the same underlying concept differently. Normalize to the underlying signal so core logic stays platform-neutral:

- Drupal "Contributed Module" / Shopify "App" / WordPress "Plugin" → `ECOSYSTEM_EXTENSION_SIGNAL`
- Drupal "Theme" / Shopify "Theme" / WordPress "Theme" → `FRONTEND_ECOSYSTEM_SIGNAL`

When a new platform introduces yet another term for an existing concept, normalize it the same way rather than treating it as a new category.

## Topic Clustering

Merge semantically equivalent topics into one cluster before comparing against internal content or making recommendations — never produce multiple recommendations targeting the same intent.

Example:
"Shopify AI search," "AI-powered Shopify search," "Shopify semantic search," "Shopify generative search" → cluster as **Shopify AI Search**.

Example:
"Drupal 11 migration," "Drupal 11 upgrade," "Drupal 10 to Drupal 11," "Drupal 11 requirements/compatibility" → cluster as **Drupal 11 Upgrade & Migration**, with subtopics (requirements, compatibility, modules, themes, custom code, testing, deployment, migration risks) rather than separate recommendations.

## Quality over quantity

For broad research: discover many candidate topics → normalize → cluster → deduplicate → rank → filter → return only the meaningful opportunities. Don't pad the output with shallow ideas to look thorough.
