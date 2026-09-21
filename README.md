# Better Than Awesome Robot Buyer Toolkit

Better Than Awesome is building a public, practical catalog for people and organizations trying to understand which robots are actually useful, what they cost, and how to evaluate them before buying.

This repository has two jobs.

First, it is the public content source for the Better Than Awesome robot site.

Second, it is an open robot buyer toolkit for households, businesses, schools, hospitals, public agencies, warehouses and researchers.

## Buyer toolkit

See `public/toolkit/` for:

* Robot purchase discovery worksheet
* Workplace robot readiness checklist
* Home robot readiness checklist
* Robot procurement RFP starter
* Robot ROI worksheet
* Robot evaluation scorecard
* Robot deployment questions

## Content workflow

Robot records and articles live in `src/content/`.

Pages CMS can provide a browser based editing interface over these files.

Cloudflare Pages can rebuild the public site whenever approved changes land in the GitHub repository.

Automation can propose changes through branches and pull requests instead of writing directly to production.

## Safety and privacy rule

Never commit customer leads, email lists, credentials, API keys, private quotes, personal information or confidential procurement material to this repository.

## Sites

Public discovery site: https://betterthanawesome.com

Procurement site: https://buyrobots.betterthanawesome.com
