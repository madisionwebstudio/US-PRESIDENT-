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
  static/            ← favicon files and .htaccess copied to the site root
scripts/
  render-images.mjs  ← renders Open Graph images + app icons (Playwright)
  serve.mjs          ← local preview server
  check.mjs          ← automated QA (links, overflow, images, headings, metadata)
public_html/         ← BUILT SITE: Netlify publishes this; upload its contents to the real domain
netlify.toml         ← Netlify settings (publish = public_html, no build step)
archive/original-site/ ← backup of the original site's images (flyer + Campaign Moments)
```

## Commands

```bash
npm run build    # regenerate public_html/ from src/
npm run serve    # preview at http://localhost:4173
npm run check    # QA at 390 / 768 / 1440 px (needs Playwright)
npm run images   # re-render social images + icons after changing titles (needs Playwright)
```

Node 18 or later is required. The build has no npm dependencies.

## Editing content

* All text lives in `src/content.mjs`, in the campaign's own wording. After editing it, run `npm run build`.
* **Campaign news:** add entries to the `news` array. The build then generates `/news/` and an article page for each entry (with Article schema), and adds the latest items to the home page. The array is empty because the campaign has published no updates.
* **Forms:** both forms open the visitor's email app, addressed to the campaign. To use a form service instead (for example Formspree or Netlify Forms), add `data-endpoint="https://…"` to the `<form>` elements in `src/build.mjs`.

## Deploying

The built site is committed in `public_html/`, so neither host needs a build step.

### Netlify (preview and staging)

1. In Netlify, choose **Add new site → Import an existing project → GitHub**, then pick `madisionwebstudio/US-PRESIDENT-`.
2. Set the branch to **`main`**. `netlify.toml` sets the publish directory to `public_html` with no build command.
3. Every push to `main` redeploys automatically. `public_html/_redirects` handles the legacy `/ols/` URLs.

### Real domain (dougjenkinsforpresident.com)

**Option A: Netlify.** In Netlify, open **Domain management**, add `dougjenkinsforpresident.com`, then update the DNS records at GoDaddy as Netlify shows. HTTPS is set up automatically.

**Option B: regular web hosting** (GoDaddy cPanel, Hostinger, etc.). Upload the **contents** of `public_html/`, including the hidden `.htaccess` file, into the host's `public_html` folder. `.htaccess` forces HTTPS and non-www, redirects the old `/ols/` URLs, and sets caching and compression.

Canonical URLs, the sitemap and social tags always point at `https://dougjenkinsforpresident.com`, so the Netlify preview address will not compete with the real domain in Google.

**Nothing is live on the real domain yet.** Moving the domain away from GoDaddy Website Builder needs the campaign's approval.
