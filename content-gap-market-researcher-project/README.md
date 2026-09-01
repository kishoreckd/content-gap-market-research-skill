# Content Gap & Market Researcher

Two things live in this repo:

- **`skill/`** — the actual Agent Skill source (SKILL.md + references + platform configs).
  This is what you'd upload to Claude.ai/Claude Code/the Skills API. Commit this folder;
  don't commit the built `.skill` zip — regenerate it from source instead:
  ```
  python3 scripts/package_skill.py skill/ ./dist
  ```
  (scripts live in Anthropic's skill-creator tooling, not in this repo)

- **`n8n-integration/`** — the same skill flattened into a single system prompt
  (`system-prompt.md`), because n8n has no on-demand file loading. Also includes
  `drupal.json`/`TEMPLATE.json` (copies of the platform configs, for the Code node) and
  `resolve-platform.js` (the "Resolve Platform" Code node, ready to paste in).

## Keeping these in sync

`skill/` is the source of truth. `n8n-integration/system-prompt.md` is *derived* from it —
if you edit `skill/SKILL.md` or `skill/references/*.md`, regenerate the n8n prompt rather
than hand-editing it, or the two will drift. The regeneration also has to re-flatten every
`references/*.md` pointer into an in-document anchor (n8n has no filesystem to resolve
`references/decision-framework.md` against) — that's not optional busywork, a stale pointer
there means the model gets pointed at a section that doesn't exist in that context. If you
add a new platform (`skill/platforms/<id>.json`), copy it into `n8n-integration/` too and
add it to the `PLATFORM_CONFIGS` object in `resolve-platform.js`.

## Should you commit the built `.skill` file?

Your call — it's included in `dist/` in this bundle either way. Technically fine to commit
(it's a small zip, ~14KB); the only real cost is it's a derived artifact, so if you edit
`skill/SKILL.md` or `skill/references/*.md` later, you need to regenerate and recommit it
or it quietly goes stale relative to the source:
```
python3 scripts/package_skill.py skill/ ./dist
```
(scripts live in Anthropic's skill-creator tooling, not in this repo)

If you'd rather not think about that sync step, drop `*.skill` in `.gitignore` instead and
regenerate on demand. Either is reasonable — there's no correctness issue with committing
it, just a bit of upkeep discipline if you do.
