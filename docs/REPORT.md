# Delivery report: Doug Jenkins for President 2028 redesign

Date: 12 November 2026 · Status: **built and verified locally, not deployed**

## 1. Pages

The original site had one content page (`/`). Its content now spans the pages below.

| URL | Status | Content source |
|---|---|---|
| `/` | Redesigned (original URL) | Original home page and campaign flyer |
| `/meet-doug/` | New | Flyer biography (flyer wording), "Community Dedication" |
| `/our-vision/` | New | The "Our Vision" section |
| `/our-vision/economy/` | New | "Economy" |
| `/our-vision/climate-change/` | New | "Climate Change" |
| `/our-vision/stop-the-killing/` | New | "Stop the Killing!" |
| `/our-vision/eradicate-homelessness/` | New | "Eradicate Homelessness" |
| `/our-vision/feed-the-starving-and-help-the-sick/` | New | "Feed the Starving and Help the Sick" |
| `/our-vision/federal-budget-reform/` | New | "Federal Budget Reform" |
| `/our-vision/medical-dental-and-car-care/` | New | "Medical, Dental, and Car Care" |
| `/our-vision/prison-and-criminal-justice-reform/` | New | "Prison and Criminal Justice Reform" |
| `/our-vision/immigration/` | New | "Immigration" (the original misspells it "Immagration") |
| `/our-vision/addictions/` | New | "Drug, Alcohol, Cell Phone, Pornography, Gambling, and Other Addictions" |
| `/contact/` | New | "Get in Touch", "Connect with Doug", "Join the Movement!" |
| `/404.html` | New | — |
| `/ols/products` | 301 redirect to `/` | Empty GoDaddy store route |

**Wording rules**

* Issue headings and text are the campaign's own, in the original order.
* Only spelling and punctuation were corrected: "Immagration", "fortunat3", "medical personal", "will creating", "Nixon di".
* No new claims, statistics, taglines or section copy were added.

**Removed**

* The empty "Campaign Moments" slider.
* The "Contribute" button, which linked to `#`.
* The cookie banner. The new site sets no cookies.
* File attachments on the contact form.

## 2. Pages proposed (not built)

* **News:** the template is ready and switches on when the first real update is added.
* **FAQ:** needs approved answers, for example how to cast a write-in vote in each state.
* **Veterans policy** and **Gun safety:** these topics do not appear in the campaign's material.
* **Donate, Volunteer, Endorsements, Store:** these need approval and infrastructure.
* **Privacy policy:** needed once a form service is added.

## 3. Technical

* **Platform:** a static site that runs on any host. No frameworks, no trackers, no cookies.
* **Assets:** one font (Archivo variable, self-hosted), one CSS file and one small JS file.
* **Responsive and accessible:**
  * Checked at 390, 768 and 1440 px.
  * Mobile menu, skip link, visible focus states, one H1 per page and labelled form fields.
  * The flyer text is now real page text, and the flyer image has full alt text.
* **SEO:**
  * Unique title, description and canonical on every page.
  * Open Graph and Twitter cards, with a sharing image for each page.
  * Sitemap, robots.txt and breadcrumbs.
  * JSON-LD for WebSite, Organization, Person, BreadcrumbList and ItemList; Article schema is ready for news.
* **Performance:** WebP images, lazy loading, explicit image sizes and fingerprinted CSS/JS.
* **QA:** `npm run check` passes on all 14 pages at 3 widths.
  * Links and anchors resolve.
  * No broken images, no horizontal overflow and no console errors.
  * The menu and form validation work.
  * A banned-phrase check blocks template wording such as "at a glance" and "keep reading".

## 4. Client approvals needed

1. **Biography:** confirm the flyer text (it says "highly decorated", "24 years in the US Army", "sergeant and life coach since 1969").
2. **Figures to fact-check** (published as the campaign stated them):
   * **Homelessness:** "10–12 million homeless, 7 million children". Official counts are far lower.
   * **Hunger:** "around 50,000 starve" (no time period is given).
   * **Nixon price freeze:** given as 1973 for three months. The main freeze was 1971 (90 days); a second freeze in 1973 lasted about 60 days.
   * **Other figures:** "40% of all military hardware", "$25B" and "$40B" in savings, and the air and water death figures.
3. **Unexplained terms:** "grateful tax" and "car care similar to AAA coverage".
4. **Status and hours:** confirm "Independent Write-In" status for 2028, and the days and time zone for the hours.
5. **Disclaimer:** confirm the committee name "Friends of Doug Jenkins", and whether an authorization statement is required.

## 5. Configuration needed

* **Hosting and domain:** deploy `public/` and repoint DNS. This needs the campaign's authorization.
* **Forms:** they currently open the visitor's email app. Connect a form or email-list service using `data-endpoint` (see README).
* **Photos:** the only genuine photo is the small portrait on the flyer. A professional photo shoot is the top priority.
* **Social links:** none are verified. Add official handles when available.
* **After launch:** run PageSpeed Insights and submit the sitemap in Search Console.
