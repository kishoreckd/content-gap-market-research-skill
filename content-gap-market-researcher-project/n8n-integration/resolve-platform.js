const PLATFORM_CONFIGS = {
  drupal:
  {
    "platform_id": "drupal",
    "platform_name": "Drupal",
    "display_name": "Drupal",
    "description": "Open-source DXP",
    "aliases": [
      "Drupal CMS",
      "Drupal Core"
    ],
    "scope": "Drupal Core, Drupal CMS, Drupal AI, and the community ecosystem.",
    "sources": [
      {
        "order": 1,
        "name": "Drupal product home",
        "category": "PRODUCT",
        "source_label": "Official / product",
        "authority": "OFFICIAL",
        "priority": 1,
        "url": "https://new.drupal.org/home"
      },
      {
        "order": 2,
        "name": "Core releases and lifecycle",
        "category": "RELEASES",
        "source_label": "Releases / docs",
        "authority": "OFFICIAL",
        "priority": 1,
        "url": "https://www.drupal.org/about/core/policies/core-release-cycles/schedule"
      },
      {
        "order": 3,
        "name": "Security advisories",
        "category": "SECURITY",
        "source_label": "Security / status",
        "authority": "OFFICIAL",
        "priority": 1,
        "url": "https://www.drupal.org/security/core/all"
      },
      {
        "order": 4,
        "name": "Documentation",
        "category": "DOCUMENTATION",
        "source_label": "Releases / docs",
        "authority": "OFFICIAL",
        "priority": 1,
        "url": "https://www.drupal.org/docs/"
      },
      {
        "order": 5,
        "name": "Drupal blog and announcements",
        "category": "BLOG",
        "source_label": "Official / product",
        "authority": "OFFICIAL",
        "priority": 1,
        "url": "https://www.drupal.org/blog"
      },
      {
        "order": 6,
        "name": "Case studies",
        "category": "CASE_STUDIES",
        "source_label": "Customer proof",
        "authority": "OFFICIAL",
        "priority": 2,
        "url": "https://www.drupal.org/case-studies"
      },
      {
        "order": 7,
        "name": "DrupalCon events",
        "category": "EVENTS",
        "source_label": "Events",
        "authority": "OFFICIAL",
        "priority": 2,
        "url": "https://events.drupal.org"
      },
      {
        "order": 8,
        "name": "Community events",
        "category": "EVENTS",
        "source_label": "Events",
        "authority": "OFFICIAL",
        "priority": 2,
        "url": "https://www.drupal.org/community/events"
      },
      {
        "order": 9,
        "name": "Drupal Association",
        "category": "COMMUNITY",
        "source_label": "Community",
        "authority": "OFFICIAL",
        "priority": 2,
        "url": "https://www.drupal.org/association"
      },
      {
        "order": 10,
        "name": "Drupal Association blog",
        "category": "COMMUNITY",
        "source_label": "Community",
        "authority": "OFFICIAL",
        "priority": 2,
        "url": "https://www.drupal.org/association/blog/"
      },
      {
        "order": 11,
        "name": "Drupal community and contribution ecosystem",
        "category": "COMMUNITY",
        "source_label": "Community",
        "authority": "OFFICIAL",
        "priority": 2,
        "url": "https://www.drupal.org/community"
      },
      {
        "order": 12,
        "name": "Become a Drupal Certified Partner",
        "category": "PARTNERS",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://www.drupal.org/association/become-a-drupal-certified-partner"
      },
      {
        "order": 13,
        "name": "Drupal Certified Partner directory",
        "category": "PARTNERS",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://www.drupal.org/association/find-a-drupal-certified-partner"
      },
      {
        "order": 14,
        "name": "Drupal services marketplace",
        "category": "MARKETPLACE",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://www.drupal.org/drupal-services"
      },
      {
        "order": 15,
        "name": "Become a Drupal AI Partner",
        "category": "AI",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://new.drupal.org/ai/become-a-partner"
      },
      {
        "order": 16,
        "name": "Drupal AI partner directory",
        "category": "AI",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://new.drupal.org/ai/partners"
      },
      {
        "order": 17,
        "name": "Contributed modules",
        "category": "MODULES",
        "source_label": "Official / product",
        "authority": "OFFICIAL",
        "priority": 1,
        "url": "https://www.drupal.org/project/project_module"
      },
      {
        "order": 18,
        "name": "Contributed themes",
        "category": "THEMES",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://www.drupal.org/project/project_theme"
      },
      {
        "order": 19,
        "name": "Site Template Marketplace",
        "category": "MARKETPLACE",
        "source_label": "Partners / ecosystem",
        "authority": "PARTNER_ECOSYSTEM",
        "priority": 3,
        "url": "https://www.drupal.org/browse/site-templates"
      }
    ]
  },

  // Add the next platform here once you've built its source map, e.g.:
  // shopify: { ...contents of shopify.json... },
  // acquia: { ...contents of acquia.json... },
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
    platformConfigJson: config
      ? JSON.stringify(config, null, 2)
      : JSON.stringify({ error: 'no config found for requested platform' }),
  },
}];
