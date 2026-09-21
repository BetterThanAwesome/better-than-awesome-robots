# Cloudflare Pages Deployment

Recommended production setup:

Repository: this repository
Production branch: main
Framework preset: Astro
Build command: npm run build
Build output directory: dist

Connect `betterthanawesome.com` to this project after the temporary pages.dev deployment is verified.

Use a second Cloudflare Pages project for `buyrobots.betterthanawesome.com` if the procurement presentation remains visually separate.

Store secrets and API credentials in Cloudflare environment variables, never in the repository.
