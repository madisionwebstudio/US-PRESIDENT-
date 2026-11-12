# Doug Jenkins for President 2028: website

The redesigned campaign website for **dougjenkinsforpresident.com**. It is a fast, dependency-free static site that can be hosted anywhere.

* **[docs/AUDIT.md](docs/AUDIT.md):** audit of the original GoDaddy site, page inventory and design direction.
* **[docs/REPORT.md](docs/REPORT.md):** delivery report covering the pages built, open approvals and remaining configuration.

## Structure

```
src/
  content.mjs        ← ALL campaign copy (edit text here)
  build.mjs          ← static site generator (templates, SEO, schema, sitemap)
  icons.mjs          ← inline line icons
  assets/            ← css, js, self-hosted fonts, images, social images
  static/            ← favicon files copied to the site root
scripts/
  render-images.mjs  ← renders Open Graph images + app icons (Playwright)
  serve.mjs          ← local preview server
  check.mjs          ← automated QA (links, overflow, images, headings, metadata)
public/              ← BUILT SITE: deploy this folder
archive/original-site/ ← backup of the original site's only image (campaign flyer)
```

## Commands

```bash
npm run build    # regenerate public/ from src/
npm run serve    # preview at http://localhost:4173
npm run check    # QA at 390 / 768 / 1440 px (needs Playwright)
npm run images   # re-render social images + icons after changing titles (needs Playwright)
```

Node 18 or later is required. The build has no npm dependencies.

## Editing content

* All text lives in `src/content.mjs`. After editing it, run `npm run build`.
* **Campaign news:** add entries to the `news` array. The build then generates `/news/` and an article page for each entry (with Article schema), and adds a "Latest updates" section to the home page. The array is empty because the campaign has published no updates.
* **Forms:** both forms open the visitor's email app, addressed to the campaign. To use a form service instead (for example Formspree or Netlify Forms), add `data-endpoint="https://…"` to the `<form>` elements in `src/build.mjs`.

## Deploying

Upload the contents of `public/` to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3, or GoDaddy hosting via FTP).

* `public/_redirects` handles legacy-URL and HTTPS/www redirects on Netlify and Cloudflare Pages.
* Other hosts fall back to the static redirect pages under `/ols/`.

**Nothing has been deployed.** Pointing the domain away from GoDaddy Website Builder requires the campaign's authorization; see the report.
