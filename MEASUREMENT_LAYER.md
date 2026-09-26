# Better Than Awesome Measurement Layer

## Principle

Better Than Awesome owns the event vocabulary. Advertising and analytics vendors consume that vocabulary.

Do not make Meta, Google, Reddit, Pinterest or another vendor the source of truth for site behavior.

## Event flow

Browser interaction
-> BTA event
-> consent check
-> BTA first-party collector
-> GTM web container
-> GA4 / Google Ads / Meta / Reddit / Pinterest
-> later: server-side GTM / vendor conversion APIs

## Current BTA events

- bta_page_view
- bta_robot_click
- bta_category_click
- bta_toolkit_click
- bta_affiliate_handoff
- bta_marketplace_click
- bta_pulse_click
- bta_signal_click
- bta_agent_resource_click
- bta_consent_update
- bta_consent_loaded

## Recommended future events

- bta_robot_view
- bta_article_view
- bta_compare_start
- bta_compare_complete
- bta_quote_intent
- bta_email_signup
- bta_search
- bta_filter_use
- bta_return_visit
- bta_agent_handoff
- bta_external_purchase_confirmation when seller reporting makes this possible

## Dimensions worth preserving

- source / medium / campaign
- landing page
- referring domain
- robot slug
- category
- manufacturer
- price band
- buyer-intent class
- region
- country
- device family
- agent vs human source
- first visit / return visit where consent permits
- affiliate destination
- event timestamp

## Knowledge layer questions

The system should eventually answer:

1. Which pages create seller handoffs?
2. Which traffic sources create high-intent behavior?
3. Which robot categories attract repeat research?
4. Which countries show demand for which robot categories?
5. Which manufacturers receive disproportionate interest?
6. Which articles create product discovery?
7. Which keywords create engaged visitors rather than empty impressions?
8. Which agents or AI surfaces create procurement handoffs?
9. Which social posts create qualified site sessions?
10. What content should be created next?

## Advertising destinations

### Google
GTM + GA4 + Google Ads.
Use consent mode and separate analytics consent from advertising consent.

### Meta
Meta Pixel through GTM after marketing consent.
Later add Conversions API with event_id deduplication.

### Reddit
Reddit Pixel through GTM after marketing consent.
Later add Reddit CAPI. Deduplicate browser and server events.

### Pinterest
Pinterest Tag through GTM after marketing consent.
Later add Pinterest Conversions API. Deduplicate with event_id.

## First-party storage

Cloudflare D1 database binding name: BTA_ANALYTICS
Migration: migrations/0001_analytics.sql

Until a D1 binding exists, the event endpoint writes structured events to Cloudflare logs.

## Retargeting audiences to build later

- all consented visitors
- robot product viewers
- firefighting / public-safety researchers
- healthcare / medical researchers
- companion / social robot researchers
- commercial cleaning buyers
- warehouse / logistics buyers
- humanoid researchers
- repeat visitors
- buyer toolkit users
- seller handoff users
- high-value robot viewers
- international region cohorts

Avoid sensitive-person inference and keep audience definitions based on content interaction rather than protected or sensitive personal traits.
