# Platform Source Map Schema

Every platform gets exactly one config file at `platforms/<platform-id>.json`. This skill's logic never changes when a platform is added — only a new file here.

## Schema

```json
{
  "platform_id": "drupal",
  "platform_name": "Drupal",
  "display_name": "Drupal",
  "aliases": ["Drupal CMS", "Drupal Core"],
  "scope": "One-line description of what this platform config covers",
  "sources": [
    {
      "order": 1,
      "name": "Human-readable source name",
      "category": "PRODUCT",
      "source_label": "Verbatim label/tag as given by whoever supplied the source list, if any",
      "authority": "OFFICIAL",
      "priority": 1,
      "url": "https://..."
    }
  ]
}
```

- `order` — the sequence the source should be researched in when doing a broad sweep (lower = earlier). Preserve whatever order the source list came in; don't re-sort.
- `category` — one of the Source Types below.
- `source_label` — if the source list came with its own tags (e.g. from a spreadsheet or tool export), keep the original label verbatim here even after deriving `category`/`priority` from it. Never discard the original wording.
- `authority` / `priority` — see Authority Tiers below.

## Source Types (category values)

`PRODUCT`, `RELEASES`, `LIFECYCLE`, `SECURITY`, `DOCUMENTATION`, `BLOG`, `ANNOUNCEMENTS`, `DEVELOPER`, `API`, `CASE_STUDIES`, `EVENTS`, `COMMUNITY`, `PARTNERS`, `MARKETPLACE`, `MODULES`, `PLUGINS`, `EXTENSIONS`, `THEMES`, `AI`, `ENTERPRISE`, `COMMERCE`, `INTEGRATIONS`, `ECOSYSTEM`

Not every platform uses every category — only include the ones that actually exist for that platform's real sources.

## Authority Tiers

| Priority | Tier | Examples |
|---|---|---|
| 1 | Official — product/docs/releases/lifecycle/security | Official product pages, official docs, official release/lifecycle info, official security advisories |
| 2 | Official — organization/programs | Official org pages, official developer resources, official case studies, official events, official partner programs |
| 3 | Ecosystem | Modules/apps/plugins/themes/marketplaces, partner ecosystem, community ecosystem |
| 4 | Third-party | Trusted third-party analysis |

Priority 1 always overrides lower tiers for factual claims (release status, security status, lifecycle, product capabilities).

## Tag → category/priority derivation convention

Source lists sometimes arrive pre-tagged with shorthand labels (e.g. from an internal research tool) that don't already use this schema's vocabulary. When that happens, derive `category`/`priority` with a single consistent lookup rather than judging each row individually — and always preserve the original tag in `source_label`.

Convention established for the Drupal onboarding (reuse for future platforms that arrive the same way, adjusting as the user corrects it):

| Original tag | → priority | → category (pick from name) |
|---|---|---|
| "Official / product" | 1 | PRODUCT (or ANNOUNCEMENTS/BLOG/MODULES if the name says so) |
| "Releases / docs" | 1 | RELEASES or DOCUMENTATION (per name) |
| "Security / status" | 1 | SECURITY |
| "Customer proof" | 2 | CASE_STUDIES |
| "Events" | 2 | EVENTS |
| "Community" | 2 | COMMUNITY |
| "Partners / ecosystem" | 3 | PARTNERS (or MARKETPLACE/THEMES/AI if the name says so) |

**Note:** this is a mechanical derivation, not a judgment call on each source's real-world importance — e.g. "Contributed modules" was tagged "Official / product" in the source tool even though it's ecosystem content, so it was mapped to priority 1 per the tag rather than re-classified. If this ever produces a mapping that looks wrong for a specific source, flag it to the user rather than silently overriding the tag.

## Unknown platform

If a query names a platform with no file in `platforms/`, do not fall back to another platform's file. Say so, and only build a new config after the user (or a validated discovery pass) confirms real sources — see the main SKILL.md "Unknown platform" section.
