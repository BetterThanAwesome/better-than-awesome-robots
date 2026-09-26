# Robot Signal

Robot Signal is the market-intelligence layer for Better Than Awesome.

## Product idea

Turn fragmented robotics activity into normalized signals that can be monitored over time.

A signal is not a post. It is a measurable change.

Examples:
- Google Search Console impressions for "firefighting robot" rise 48% week over week.
- A robot product page begins ranking in Germany.
- A manufacturer launches three new humanoids in seven days.
- A product price changes.
- Reddit discussion velocity doubles for companion robots.
- A robotics YouTube channel publishes a video that exceeds its recent view baseline.
- A tracked company gains followers faster than its 30-day baseline.
- A competitor begins ranking for a keyword Better Than Awesome tracks.
- A Better Than Awesome article creates a measurable affiliate click spike.

## Data model

### entities
- brand
- product
- category
- keyword
- domain
- social account
- article
- source

### observations
Each raw observation should include:
- observed_at
- source
- entity_id
- metric
- value
- source_url
- source_payload_hash
- confidence
- collection_method

### signals
Derived from observations:
- signal_type
- current_value
- baseline_value
- change_absolute
- change_percent
- velocity
- z_score or percentile when appropriate
- confidence
- importance
- first_seen
- last_seen

### snapshots
Daily and weekly frozen summaries so changes remain auditable even if source content disappears.

## MVP sources

### First party
1. Google Search Console
   - queries
   - pages
   - countries
   - devices
   - clicks
   - impressions
   - CTR
   - average position

2. GA4
   - users
   - sessions
   - page views
   - engaged sessions
   - landing pages
   - countries
   - referrals
   - key events
   - affiliate outbound clicks

3. Better Than Awesome
   - robot records
   - price changes
   - category growth
   - article publishing
   - affiliate link clicks

### Public / external
4. Reddit
   - approved API access only for production commercial use
   - post score
   - comments
   - age
   - subreddit
   - topic / entity mentions
   - store minimal metadata and honor deletions

5. YouTube
   - channel subscriber counts where available
   - video views
   - comments
   - publication velocity
   - tracked robotics searches

6. Bluesky / open social
   - public robotics keyword / account activity where platform terms permit

7. Manufacturer and competitor websites
   - sitemap changes
   - page additions / removals
   - title / meta changes
   - price and product-page changes
   - robots.txt and structured-data changes
   - never bypass access controls

## Signal examples

### Search Lift
Query impressions accelerating faster than clicks:
"humanoid robot for hospital"
Possible action: improve title, snippet and page relevance.

### Product Heat
Product page traffic + Reddit mentions + YouTube views all rising.
Possible action: feature product, publish explainer, increase affiliate prominence.

### Category Heat
Aggregate movement across multiple products and sources.
Example: firefighting robots show growing search and conversation velocity.

### Brand Momentum
Manufacturer follower growth + product launch frequency + search lift + article mentions.

### Opportunity Gap
A monitored keyword has meaningful search impressions but Better Than Awesome has no dedicated landing page.

### Competitor Displacement
A competitor domain begins outranking Better Than Awesome for a tracked keyword cluster.

## Sentiment

Do not reduce sentiment to one magic positive / negative number.

Store:
- positive
- neutral
- negative
- mixed
- question / information-seeking
- purchase intent
- skepticism
- safety concern
- excitement
- deployment report

Publish snapshots with sample size and source mix.

## Public product

Public Robot Signal pages should show:
- Robot Market Pulse
- categories gaining attention
- notable search movement
- top current discussions
- new products
- weekly sentiment snapshots
- "what moved this week" articles

These pages create indexable editorial content and internal links.

## Paid product

### Free
- public weekly pulse
- basic trend charts
- delayed data
- 5 tracked keywords
- Better Than Awesome robotics index

### Pro
- daily refresh
- saved watchlists
- alerts
- keyword tracking
- category / brand comparisons
- CSV export
- historical charts
- competitor domain monitoring

### Team / Agency
- multiple projects
- client dashboards
- white-label reports
- API / webhook access
- custom source lists
- scheduled reports
- team permissions

## Architecture

Collection:
Cloudflare Cron / Workers -> source adapters

Storage:
Cloudflare D1 for normalized observations and signals
R2 for snapshots / raw permitted payloads
KV for short-lived cache

Processing:
scheduled normalization -> entity matching -> baseline calculation -> signal generation

Frontend:
Astro public pages + authenticated dashboard

Alerts:
email first
webhooks later

## Important principles

1. Measure movement, not noise.
2. Preserve provenance.
3. Never pretend third-party popularity is factual validation.
4. Do not scrape around platform restrictions.
5. Keep historical snapshots so the dashboard can explain why a signal fired.
6. Public summaries drive SEO. Private depth drives subscriptions.
7. Better Than Awesome is the destination. Social platforms are data sources and distribution channels.
