# Better Than Awesome Site Factory

## Goal

Build each LGX / Better Than Awesome web property from the same reusable infrastructure instead of repeating setup manually.

The factory principle is:
content + brand configuration + domain configuration -> deployable site

Common infrastructure should be inherited, not rebuilt.

## Current production-first site

### BetterThanAwesome.com
Purpose:
- robot discovery
- robot affiliate commerce
- Robot Pulse
- Robot Signal
- agent procurement / machine-readable data

Status:
- primary site to finish and validate before cloning the stack

## Next sites in the factory queue

### STRadvertising.com
Purpose:
- performance marketing / STR advertising
- lead generation
- case studies
- service conversion
- analytics and retargeting

### MADvertising.agency
Purpose:
- paid media / advertising agency
- audits, consulting, managed media and lead generation
- case studies, offers and conversion tracking
- separate client analytics from Better Than Awesome commerce data

### BetonStreetwear.com
Purpose:
- BéTON Streetwear ecommerce / art apparel
- product discovery
- editorial collections
- separate product and finance data from Skin-A-Maxx

### Skin-A-Maxx.com
Purpose:
- Skin-A-Maxx art / photography / event ecosystem
- public portfolio and editorial site
- consent-aware model/artwork publishing
- product links and future commerce
- replace expensive hosted dependencies where practical with Cloudflare-hosted static assets and owned storage

### TheRedOctoberfest.com
Purpose:
- future political / satirical / affiliate experiment
- keep editorial, tracking, legal, and brand concerns isolated from other properties
- do not mix its audience data into commercial brand audiences without a clear reason and appropriate consent

## Shared factory modules

Every site should inherit:

1. Cloudflare hosting
2. GitHub source repository
3. Astro static site foundation
4. canonical URLs
5. XML sitemap
6. robots.txt
7. Organization / WebSite schema
8. page-specific structured data
9. Open Graph / social metadata
10. first-party BTA/LGX event vocabulary
11. consent controls
12. Google Tag Manager configuration slot
13. GA4 configuration slot
14. Google Ads configuration slot
15. Meta Pixel configuration slot
16. Reddit Pixel configuration slot
17. Pinterest Tag configuration slot
18. first-party analytics endpoint
19. optional Cloudflare D1 event storage
20. privacy / tracking page
21. UTM preservation
22. outbound conversion / handoff tracking
23. Search Console sitemap registration
24. GSC Wizard connection
25. optional agent / API layer where appropriate

## Per-site configuration

Each site should have one config file containing:

- site name
- canonical domain
- brand description
- contact email
- logo / icon
- social profile URLs
- GTM container ID
- GA4 measurement ID
- Google Ads ID
- Meta Pixel ID
- Reddit Pixel ID
- Pinterest Tag ID
- Search Console property
- sitemap URL
- analytics database binding
- consent copy overrides
- affiliate destinations if applicable

## Deployment checklist

### Domain
- add domain to Cloudflare
- set nameservers
- enable DNSSEC after nameservers are stable
- configure WWW / apex redirect
- verify HTTPS

### Search
- create Google Search Console domain property
- verify with Cloudflare DNS TXT record
- register property in GSC Wizard
- submit sitemap
- inspect homepage
- inspect sitemap
- track important URLs

### Measurement
- create GTM web container
- add GTM ID to site config
- create / connect GA4
- map BTA events to GA4
- add Google Ads tags
- add Meta Pixel
- add Reddit Pixel
- add Pinterest Tag
- verify consent gating
- verify browser events
- later add server-side conversion APIs

### Content
- launch minimum useful pages
- category architecture
- article / editorial architecture
- internal links
- schema
- image provenance
- Search Console baseline

## Factory rule

Do not fork infrastructure by hand.

When a shared module improves, update the reusable starter and deliberately propagate that improvement to sites that need it.

Brand content and commerce logic can differ. Measurement, consent, SEO plumbing, deployment conventions and diagnostics should remain standardized.

## Cost-control principle

Prefer:
- Cloudflare Pages / Workers / D1 / R2 where free or low-cost tiers are sufficient
- GitHub for source control
- owned static sites over recurring hosted portfolio subscriptions when the hosted feature set is no longer economically justified

Do not cancel a paid platform until:
1. its content has been exported,
2. URLs / SEO implications are understood,
3. the replacement is working,
4. important customer / model / order data is preserved,
5. redirects are planned where necessary.
