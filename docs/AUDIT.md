# Phase 1: Website audit (dougjenkinsforpresident.com)

Audit date: 12 November 2026

## How the site was inspected

| Method | Result |
|---|---|
| Direct HTTPS/HTTP request from the build environment (`curl`) | **Blocked.** The connection was reset at the network edge, so raw HTML could not be downloaded. |
| Web fetcher (rendered page to text) | **Worked.** All text, links, image URLs and forms were captured. Exact quotes are limited to short excerpts, so the content inventory below combines quotes with sentence-by-sentence paraphrase. |
| `sitemap.xml` (index), `sitemap.website.xml`, `sitemap.ols.xml`, `robots.txt` | **Read in full.** |
| Wayback Machine raw snapshot (14 July 2026) | **Blocked** by the environment's egress policy. |
| Campaign image on the GoDaddy CDN (`img1.wsimg.com`) | **Downloaded** at full resolution. It turned out to be a photo of the printed campaign flyer, which contains the candidate's biography. It is archived in `archive/original-site/`. |
| Live rendering on desktop, tablet and mobile | **Not possible.** The site could not be loaded in a browser from this environment, so the device findings below come from the captured markup and GoDaddy Website Builder's known behaviour, not from screenshots. |

## Platform and technology

* **Builder:** GoDaddy Website Builder (the "Powered by GoDaddy" footer link, `img1.wsimg.com/isteam` asset paths and the `/ols/` online-store route).
* **Source code:** none. The Git repository was empty when the project started, and GoDaddy Website Builder does not export code.
* **Integrations:** a GoDaddy contact form with Google reCAPTCHA and file attachments, a GoDaddy email sign-up ("Join the Movement!"), a cookie banner and traffic-analysis cookies, and a "Contribute" button linked to `#` (no payment processor is connected).

## Page inventory

| # | URL | Status | Notes |
|---|---|---|---|
| 1 | `/` | Live, 200 | **The only content page.** It is a single long page holding every policy section, the contact form and the sign-up. Last modified 25 June 2026 (per the sitemap). |
| 2 | `/ols/products` | Listed in `sitemap.ols.xml` | A leftover of GoDaddy's online store. It renders the site's home content, with no products. |
| 3 | `/404` | Disallowed in `robots.txt` | GoDaddy's system error page. |

No other URLs exist: not in the sitemaps, not in the navigation, not in the footer and not linked from the body. The site has **no** About, policy, news, contact or FAQ pages.

## Content inventory (everything on `/`)

**Header:** "Doug Jenkins for President 2028" (linked to `/`, repeated twice). There is no navigation menu.

**Our Vision**, with the campaign photo:

1. **Community Dedication:** "Doug has committed years of service, tirelessly working to improve our community."
2. **Economy:**
   * Freeze prices for one year on rent, gas, groceries, medications and utilities. The section cites Nixon (1973, three months) and FDR (over a year) as precedent.
   * Support a 10 percent flat income tax and a 5 percent "grateful tax".
3. **Climate Change:**
   * Commit resources to collaborate with scientists and environmentalists worldwide.
   * Figures: pollution is a global crisis; 6 million people die annually from contaminated water and 7 million from poor air quality; 100 million people in the US suffer due to unhealthy air.
   * "Take decisive action now to protect our planet for future generations."
4. **Stop the Killing!**
   * Over 100 wars in the past, and around 100 million people killed.
   * Obey the Sixth Commandment, "thou shall not kill".
   * The US produces 40% of all military hardware and arms.
   * Establish the 16th department, the Department of Peace, and "put focus on peace, and not war!"
5. **Eradicate Homelessness:**
   * Figures: eradicating homelessness would save taxpayers over $25 billion a year; 10–12 million people are homeless, of whom 7 million are children.
   * Housing should be one of our rights as an American.
   * A family agent in all 58,000 fire stations in America, providing daily coaching.
6. **Feed the Starving and Help the Sick:**
   * Figures: around 50,000 starve to death or die from preventable sickness and disease (no time period given); in 2022 Americans wasted $408 billion on food; the average person wasted $1,600 per year.
   * Give farmers, engineers and medical personnel the power to help our less fortunate brothers and sisters.
   * "We can't just sit here and do nothing!"
7. **Federal Budget Reform:**
   * Reduce the federal budget by 5% by stopping careless and wasteful spending.
   * A 10% flat income tax.
   * A 5% grateful tax, with incentives, from the IRS.
   * Reduce the national debt by 5%.
8. **Medical, Dental, and Car Care:**
   * Affordable coverage for all.
   * Over 12% of Americans are estimated to be depressed, and many take illegal street drugs.
   * Coverage for mental illness and major drug reform laws.
   * Medicare for all.
   * Car care similar to AAA coverage.
9. **Prison and Criminal Justice Reform:**
   * Around 4 million people are incarcerated.
   * Focus on rehabilitation and education so they become more productive citizens.
   * The current prison system is "financially and morally unsustainable."
   * "My reform plan can save taxpayers over $40 billion annually" while creating safer and more just communities.
10. **Immigration** (the heading is spelled "Immagration" on the live site):
    * Create a more just way to process immigrants in their home countries.
    * Prioritize much-needed workers.
    * Partner with Mexico in their security and economic growth.
    * Create real solutions, not NIMBY ("not in my back yard").
11. **Drug, Alcohol, Cell Phone, Pornography, Gambling, and Other Addictions:**
    * Educate those addicted on the negative effects on family and communities, with treatment options.

**Other sections on the page:**

* **Campaign Moments:** a slideshow labelled "1/5" that contains only a 1×1 transparent placeholder.
* **Support the Campaign:** the text "secure payment options" and a **Contribute** button linking to `#` (no destination).
* **Get in Touch:** a form with Name, Email (required), "Where did you hear about us?", file attachments and a Send button.
* **Connect with Doug:** dougjenkins.1890@gmail.com | (608) 630-6648, with hours "09:00 am – 05:00 pm".
* **Join the Movement!** "Stand for Change. Join Today!", with an email sign-up.
* **Footer:** "Copyright © 2026 Doug Jenkins for President 2028 – All Rights Reserved", "Powered by GoDaddy", and the cookie notice.
* **Social links:** none.

## Campaign flyer (the only image on the site)

The flyer is the campaign's own printed material. It is the source of the biography used in the redesign:

* "DOUG JENKINS, Independent Write In, For President 2028, **End the Nonsense**"
* "Doug, a father of 4, 10 Grandkids, and 2 great grandkids, ran for President in 2020 & 2024."
* "A highly decorated Vietnam War Veteran; a sergeant and life coach since 1969 and had served 24 years in the US Army. He ran his own successful painting business for almost 40 years."
* **Disclaimer:** "Paid for by Friends of Doug Jenkins"
* Web: www.dougjenkinsforpresident.com · Email: dougjenkins.1890@gmail.com · Cell: 608-630-6648

## Problems found

**Information architecture**

* The site is a single page with no navigation, so policies cannot be linked to, shared or found in search individually.
* There is no About page, even though a strong biography exists (it appears only inside a photographed flyer, as image text that search engines and screen readers cannot read).
* The page has no "Paid for by" disclaimer, although the flyer has one.

**Broken or unfinished elements**

* "Campaign Moments" is an empty slider (1/5, placeholder GIF).
* The "Contribute" button goes nowhere (`#`).
* `/ols/products` is an empty store route that sits in the sitemap.

**Content quality**

* Typos: "Immagration", "fortunat3", "medical personal", "will creating", "Nixon di".
* Statistics have no sources.
* There is no introduction to the candidate.

**Design**

* A default builder template with no brand identity, wordmark or design system.
* Headings appear twice, and there is no visual hierarchy between the policy blocks.
* All 10 policy areas are long uniform text blocks with no scannability.
* The one image is a phone photo of a printed flyer, used as a hero photo.

**Accessibility**

* The images have no alt text.
* The biography exists only as text inside an image.
* The cookie banner obscures content on mobile (typical of this builder).

**Technical SEO**

* There is one page title for the whole site, no per-topic URLs and no Open Graph image.
* There is no structured data.
* The sitemap advertises `http://` URLs while the site serves `https://`.

**Performance**

* GoDaddy's runtime JavaScript, reCAPTCHA, the analytics cookie script and a 2.5 MB source image served through the builder's resizer.

---

# Phase 2: Design direction

**Concept: "Plain-spoken, nationally serious."** Doug's message ("End the Nonsense") is direct. The design answers with the restraint of a quality American newspaper or a federal document: confident serif headlines, generous whitespace, a disciplined navy-and-gold palette, and one engraved-line motif borrowed from US banknote and bond engraving (a guilloche rosette). That motif gives an American reference without flags, stars or stripes.

**Palette**

| Token | Hex | Use |
|---|---|---|
| Navy | `#101D35` | Hero, feature bands and footer |
| Presidential Blue | `#174A85` | Links, primary buttons on light backgrounds, icons |
| White | `#FFFFFF` | Cards |
| Warm Off-White | `#F6F5F1` | Page background |
| Muted Gold | `#C5A15B` | Rules, numerals and accents on navy (6.9:1 contrast on navy) |
| Deep Gold | `#7A5C22` | Gold *text* on light backgrounds (meets WCAG AA; Muted Gold does not on off-white) |
| Ink | `#17202D` | Body text (15.6:1 on off-white) |

**Typography**

* **Source Serif 4** (variable, with optical sizing) for headlines and pull quotes. It reads as editorial and authoritative.
* **Public Sans** (variable) for navigation, body text and buttons. It was developed from the US Web Design System, which suits a federal campaign.
* Both fonts are self-hosted WOFF2 files under the SIL Open Font License.

**Wordmark**

* "DOUG" in tracked sans capitals sits above "JENKINS" in serif capitals, with a gold rule and "2028".
* The monogram, used for the favicon and social images, is a serif "DJ" in a gold-ringed navy roundel.

**Photography**

* Only one genuine photograph of Doug exists: the portrait printed on the flyer. It is used as provided, cropped but not retouched or AI-enhanced, framed by an offset gold hairline.
* No stock or AI imagery of the candidate is used.
* A professional portrait session is the top recommendation in the final report.

**Components**

* **Policy cards:** Roman-numeral index, line icon, title, one-line summary and an arrow link.
* **Proposal blocks:** numbered statements.
* **"As stated by the campaign" figure panels:** large figures that keep the campaign's own numbers clearly attributed.
* **Pull quotes:** serif italic.
* **Breadcrumbs, related-policy rail and CTA band.**
