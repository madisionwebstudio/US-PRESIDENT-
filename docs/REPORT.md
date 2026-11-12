# Delivery report: Doug Jenkins for President 2028 redesign

Date: 12 November 2026 · Status: **built and verified locally, not deployed**

## 1. Pages redesigned or created

The original site had one content page. All of its content is preserved and has been split into a proper site architecture.

| URL | Status | Source of content |
|---|---|---|
| `/` | **Redesigned** (original URL kept) | Original home page + campaign flyer |
| `/about/` | **New**: About Doug | Campaign flyer (biography), original "Community Dedication" text |
| `/platform/` | **New**: platform overview | Original "Our Vision" section |
| `/platform/economy/` | **New**, from the original "Economy" section | Original page |
| `/platform/federal-budget/` | **New**, from "Federal Budget Reform" | Original page |
| `/platform/department-of-peace/` | **New**, from "Stop the Killing!" | Original page |
| `/platform/homelessness/` | **New**, from "Eradicate Homelessness" | Original page |
| `/platform/hunger-and-health/` | **New**, from "Feed the Starving and Help the Sick" | Original page |
| `/platform/health-care/` | **New**, from "Medical, Dental, and Car Care" | Original page |
| `/platform/criminal-justice-reform/` | **New**, from "Prison and Criminal Justice Reform" | Original page |
| `/platform/immigration/` | **New**, from "Immagration" (spelling corrected) | Original page |
| `/platform/climate/` | **New**, from "Climate Change" | Original page |
| `/platform/addiction/` | **New**, from "Drug, Alcohol, Cell Phone, Pornography, Gambling, and Other Addictions" | Original page |
| `/contact/` | **New**, from "Get in Touch", "Connect with Doug" and "Join the Movement!" | Original page |
| `/404.html` | **New**: branded error page | — |
| `/ols/products` | **Redirected** (301) to `/` | Leftover GoDaddy store route with no products |

Every page shares the same header, mega menu, mobile menu, footer, "Paid for by" disclaimer, CTA band and design system.

### Content changes

* **Typos corrected:** "Immagration", "fortunat3", "medical personal", "will creating", "Nixon di".
* **Sentences restructured** into proposal lists and context paragraphs.
* **Nothing added in substance.** Each policy page contains only what the original section said. Statistics are labelled "Figures as stated by the campaign."

### Removed on purpose

* **The empty "Campaign Moments" slider:** it was a 1×1 placeholder.
* **The "Contribute" button:** it linked to `#`, and no donation infrastructure exists.
* **The cookie banner:** the new site sets no cookies and uses no trackers.
* **Contact-form file attachments:** these are not possible without a form backend.

## 2. Additional pages proposed (not built: need campaign content or approval)

| Page | Why it wasn't built |
|---|---|
| **Campaign News** (`/news/`) | The template is built and switches on automatically when the first genuine update is added to `src/content.mjs`. There are no published updates. |
| **Campaign FAQ** | Needs approved answers, for example how to cast a write-in vote in each state. Write-in rules vary by state and must not be guessed. |
| **Veterans** | Doug's service is on the About page, but the campaign has no published veterans *policy*. |
| **Gun safety** | Listed in the brief, but it does not appear anywhere in the campaign's material. |
| **Donate**, **Volunteer**, **Endorsements**, **Store** | Excluded as instructed. Each needs approval plus infrastructure: a compliant payment processor, a CRM, and verified endorsements. |
| **Privacy policy** | Recommended once a form service or analytics is added. Needs legal review. |

## 3. Technical improvements

**Platform**

* GoDaddy Website Builder replaced with a static site: semantic HTML, one CSS file (8.6 KB gzipped) and one JS file (1.8 KB gzipped).
* No frameworks, no third-party scripts and no cookies.

**Design system**

* Navy, Presidential Blue, Muted Gold and Warm Off-White palette, plus a darker gold for text so it passes WCAG AA.
* Source Serif 4 and Public Sans, self-hosted as variable fonts.
* A wordmark and a "DJ" monogram.
* A guilloche (banknote-engraving) motif as a tasteful American reference, with no flags or stripes.

**Responsive layouts**

* Verified at 390, 768 and 1440 px, with no horizontal overflow.
* Desktop mega menu. Full-screen mobile menu that closes on Escape and moves focus into the menu.

**Accessibility**

* Skip link, landmarks, one H1 per page, no skipped heading levels.
* Visible gold focus rings, `aria-current` on navigation, and form errors linked to their fields.
* Reduced-motion support.
* The biography that existed only as text inside the flyer image is now real text. The flyer has full alt text.

**SEO**

* Unique titles, descriptions and canonicals on every page.
* Open Graph and Twitter cards, with a unique 1200×630 social image for each page.
* `sitemap.xml` (HTTPS) and `robots.txt`.
* Breadcrumbs, with BreadcrumbList schema.
* JSON-LD for WebSite, Organization and Person (only facts from the campaign's own material), ItemList on the platform page, and Article schema ready for news.

**Performance**

* WebP images with JPEG fallback, lazy loading below the fold, explicit image dimensions (no layout shift), and preloaded fonts with `font-display: swap`.
* Fingerprinted asset URLs for long-term caching.

**Redirects**

* `/ols/*` and `/404` redirect to `/`.
* http → https and www → apex are handled in `_redirects`.

**Backup**

* The original site's only asset (the campaign flyer) is archived in `archive/original-site/`, and its full text is recorded in `docs/AUDIT.md`.

### Quality control results

`npm run check` passed with no problems on all 14 pages at 3 widths:

* 43 internal link targets and anchors resolve.
* No broken images, no missing alt text and no placeholder text.
* No duplicate titles or descriptions, and every JSON-LD block is valid.
* No console errors.
* The mobile menu opens and closes, the mega menu opens on hover and keyboard focus, and the first Tab reaches the skip link.
* Contact-form validation works.

A Lighthouse / PageSpeed run was not possible offline. Run it after deployment.

## 4. Outstanding client approvals

1. **Biography:** published from the campaign's own flyer. Please confirm:
   * the wording "highly decorated" (and whether to name specific decorations);
   * "sergeant and life coach since 1969";
   * "24 years in the U.S. Army";
   * the family details.
   * A third-party election archive (University of Minnesota) also lists a birthplace (Highland, WI), a birth date and "retired painting business owner". These were **not** published, because they don't come from the campaign.
2. **Statistics to fact-check before launch.** These are the campaign's own figures, published as stated and without sources:
   * **Homelessness:** "10–12 million homeless, 7 million children". Commonly cited U.S. counts are far lower.
   * **Hunger:** "around 50,000 starve to death" (no time period is given).
   * **History:** "Nixon … in 1973 for three months". Nixon's 90-day freeze began in **1971**, and a second freeze in 1973 lasted about 60 days.
   * **Other figures:** "100+ wars / 100 million killed", "U.S. produces 40% of all military hardware", "$25B" and "$40B" in savings, "12% depressed", and the air and water death figures.
   * Adding a source to each figure is strongly recommended.
3. **Unexplained terms:** the "grateful tax" and "car care similar to AAA coverage" are published as written. A one-sentence explanation of each from the campaign would help visitors.
4. **"Independent write-in" status:** taken from the flyer. Confirm it is current for 2028.
5. **Hours:** "9:00 am – 5:00 pm" is taken from the GoDaddy business-hours widget. Confirm the days and time zone.
6. **FEC disclaimer:** "Paid for by Friends of Doug Jenkins" is taken from the flyer and shown in every footer. If the committee is registered with the FEC, confirm the exact committee name and whether an authorization statement ("Authorized by Doug Jenkins") is required.

## 5. Requires configuration

| Item | Current state | Action |
|---|---|---|
| **Hosting and domain** | The site is built in `public/`. The domain still points at GoDaddy Website Builder. | With the campaign's authorization, deploy `public/` and repoint DNS. |
| **Contact form** | Opens the visitor's email app with the message prefilled. This works, but it is not a server-side submission. | Optionally connect a form service via `data-endpoint` (see README). |
| **Email list** ("Join the Movement") | Sends a sign-up request by email. | Connect an email provider (for example Mailchimp or Buttondown) through `data-endpoint`. |
| **Photography** | The only genuine photo is the portrait printed on the flyer. It is used as provided, cropped from a phone photo of the print (about 390 px). | **Top priority:** a professional portrait session and campaign event photos. The layout is ready to accept larger images. |
| **Social media** | No verified accounts exist, so none are linked. | Provide official handles and they can be added to the footer and the schema. |
| **Donations** | Not built. | Requires approval, an FEC-compliant processor and contribution-limit and disclaimer handling. |
| **Analytics** | None. | If wanted, use a cookieless option (for example Plausible) to avoid needing a cookie banner. |
| **Search Console** | — | After launch, submit `sitemap.xml` and run PageSpeed Insights. |
