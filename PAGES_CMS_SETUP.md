# Pages CMS Setup

This repository already contains `.pages.yml`.

Fastest hosted setup:

1. Create the GitHub repository and push this project.
2. Open Pages CMS at app.pagescms.org.
3. Sign in with GitHub.
4. Install the Pages CMS GitHub App for this repository.
5. Open the repository.
6. Pages CMS reads `.pages.yml` and exposes Robots, Blog and Site settings.

Pages CMS writes edits directly back to GitHub.

For automation, use GitHub branches and pull requests so machine generated changes can be reviewed before production.

If you later want a CMS fully hosted under your own domain, Pages CMS is open source and can be self hosted. That is not necessary for the MVP.
