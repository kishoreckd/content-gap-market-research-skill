# Wiring the Content Gap & Market Researcher into n8n

This skill can't run through Anthropic's formal Skills API (upload → `container.skills`),
because that runs in a network-isolated sandbox and this skill's entire job is calling
out to your internal KB, the live web, and Semrush. Instead, wire it up as an **AI Agent
node with real tools**, using `system-prompt.md` as the reasoning contract.

## Node layout

```
[Chat Trigger / Webhook]
        ↓
[Code node: "Resolve Platform"]
        ↓
[AI Agent node]  ←── tools: [Pinecone/Vector Store] [HTTP Request Tool(s)] [Semrush tool]
        ↓
[Respond / downstream node]
```

## 1. Resolve Platform (Code node)

Parses the platform out of the incoming query and looks up its config. Start simple —
you only have one platform today:

```javascript
const PLATFORM_CONFIGS = {
  drupal: /* paste the full contents of drupal.json here as a JS object */,
  // shopify: { ... },
  // acquia: { ... },
};

const query = $input.item.json.chatInput || $input.item.json.query || '';
const lower = query.toLowerCase();

let platformId = null;
if (lower.includes('drupal')) platformId = 'drupal';
// else if (lower.includes('shopify')) platformId = 'shopify';
// else if (lower.includes('acquia')) platformId = 'acquia';

const config = platformId ? PLATFORM_CONFIGS[platformId] : null;

return [{
  json: {
    query,
    platformId,
    // stringified so it drops cleanly into the system prompt text
    platformConfigJson: config ? JSON.stringify(config, null, 2) : '{"error": "no config found for requested platform"}',
  },
}];
```

As you add platforms, either extend this object inline or move `PLATFORM_CONFIGS` to a
small external store (Airtable/Google Sheet/Postgres node) if you want to update source
maps without redeploying the workflow. Inline is fine while you only have Drupal.

## 2. AI Agent node — System Message

1. Open `system-prompt.md` and copy its full contents into the AI Agent's **System
   Message** field.
2. Find the block that looks like:
   ```
   {{PLATFORM_CONFIG_JSON}}
   ```
   **Replace that literal text with an n8n expression**, not just paste it in as-is —
   n8n also uses `{{ }}` for expressions, so leaving the placeholder as inert text will
   silently pass the literal string to the model instead of the real config. Replace it
   with:
   ```
   {{ $('Resolve Platform').item.json.platformConfigJson }}
   ```
3. Leave the rest of the system message untouched — it's the workflow logic, decision
   rules, and output format, and doesn't change per request.

## 3. Attach tools to the AI Agent

- **Internal KB search** → a Pinecone/Vector Store node (or whatever your SharePoint→Pinecone
  indexing pipeline exposes) wired in as a Tool. This is what step 2 of the workflow
  ("Search the internal KB") actually calls.
- **External market research** → an HTTP Request Tool (or a web-search tool if you have
  one connected) for step 6. If you want the agent to respect source priority order
  rather than fetching arbitrarily, give the tool a clear description like "Fetch a URL
  from the platform's configured source list" so the model reaches for it deliberately
  rather than guessing URLs.
- **Keyword/competitor intelligence** → a Semrush tool, once you have one wired up, for
  step 10. Until then the skill's own guardrails already prevent it from inventing
  metrics — it'll just note that keyword data wasn't available.

## 4. Test before trusting it

Run a query like "What Drupal AI content gaps do we have?" and check the transcript for:

- Did it actually call the internal KB tool before proposing new content? (Step 2/9
  guardrail — "never recommend new content before checking internal KB coverage.")
- Did it use the *injected* `drupal.json` sources rather than inventing URLs?
- Does the output match the three-section structure (Existing Content to Improve / New
  Content Opportunities / Strong Existing Content)?

If any of those fail, it's almost always the system message substitution (step 2 above)
or a missing/misconfigured tool — not the reasoning logic itself.

## Files in this folder

- `system-prompt.md` — flattened SKILL.md + decision-framework.md + output-format.md,
  ready to paste into the AI Agent's system message
- `drupal.json` — the configured Drupal source map
- `TEMPLATE.json` — scaffold for the next platform you configure
