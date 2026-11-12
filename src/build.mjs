// Static site generator for dougjenkinsforpresident.com
// Usage: node src/build.mjs   → writes the deployable site to ./public
// No runtime dependencies. Content lives in src/content.mjs.

import { mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, bio, quotes, highlights, policies, news } from './content.mjs';
import { icon, policyIcon } from './icons.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'public');
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const roman = (n) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][n - 1];
const bySlug = Object.fromEntries(policies.map((p, i) => [p.slug, { ...p, n: i + 1 }]));
const policyUrl = (slug) => `/platform/${slug}/`;
const abs = (path) => site.url + path;

// ---------------------------------------------------------------------------
// Asset fingerprints (cache-busting query strings)
const hashOf = async (p) => createHash('sha256').update(await readFile(p)).digest('hex').slice(0, 10);
const v = {
  css: await hashOf(join(SRC, 'assets/css/main.css')),
  js: await hashOf(join(SRC, 'assets/js/main.js')),
};

// ---------------------------------------------------------------------------
// Guilloche rosette (engraved-banknote motif), generated as a lightweight SVG
function guilloche() {
  const cx = 400, cy = 400, lines = [];
  const curves = 16, steps = 480;
  for (let k = 0; k < curves; k++) {
    const pts = [];
    const phase = (k / curves) * Math.PI * 2 / 8;
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const r = 262 + 58 * Math.sin(8 * t + phase * 8) + 12 * Math.sin(24 * t - phase * 4);
      pts.push(`${Math.round(cx + r * Math.cos(t))} ${Math.round(cy + r * Math.sin(t))}`);
    }
    lines.push(`<path d="M${pts.join('L')}Z"/>`);
  }
  const rings = [370, 380, 160, 152].map((r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" fill="none" stroke="#C5A15B" stroke-width=".7">${rings}${lines.join('')}</svg>`;
}

// ---------------------------------------------------------------------------
// Partials
const navItems = [
  { href: '/about/', label: 'About Doug' },
  { href: '/platform/', label: 'The Platform', mega: true },
  ...(news.length ? [{ href: '/news/', label: 'News' }] : []),
  { href: '/contact/', label: 'Contact' },
];

const wordmark = (extra = '') => `
  <a class="wordmark ${extra}" href="/" aria-label="${esc(site.name)}, home">
    <span class="wm-first">Doug</span>
    <span class="wm-last">Jenkins</span>
    <span class="wm-meta"><span class="wm-rule" aria-hidden="true"></span><span class="wm-year">President 2028</span></span>
  </a>`;

function header(path) {
  const isCurrent = (href) => (href === '/' ? path === '/' : path.startsWith(href));
  const mega = `
      <div class="mega" id="mega-platform">
        <div class="mega-inner">
          <div class="mega-intro">
            <p class="eyebrow">The Platform</p>
            <p class="mega-lead">Ten policy commitments from Doug’s campaign.</p>
            <a class="text-link" href="/platform/">View the full platform ${icon('arrow')}</a>
          </div>
          <ul class="mega-list">
            ${policies.map((p, i) => `<li><a href="${policyUrl(p.slug)}"><span class="mega-num">${roman(i + 1)}</span>${esc(p.title)}</a></li>`).join('')}
          </ul>
        </div>
      </div>`;
  return `
<header class="site-header" data-header>
  <div class="container header-inner">
    ${wordmark()}
    <nav class="primary-nav" aria-label="Primary">
      <ul class="nav-list">
        ${navItems.map((n) => `<li class="${n.mega ? 'has-mega' : ''}">
          <a href="${n.href}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}</a>${n.mega ? mega : ''}
        </li>`).join('')}
      </ul>
      <a class="btn btn-gold btn-sm" href="/contact/#join">Join the Movement</a>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
      <span class="nav-toggle-open">${icon('menu')}<span class="nav-toggle-label">Menu</span></span>
      <span class="nav-toggle-close">${icon('close')}<span class="nav-toggle-label">Close</span></span>
    </button>
  </div>
  <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
    <nav class="container" aria-label="Mobile">
      <ul class="mobile-list">
        <li><a href="/"${path === '/' ? ' aria-current="page"' : ''}>Home</a></li>
        ${navItems.map((n) => `<li><a href="${n.href}"${isCurrent(n.href) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
      </ul>
      <p class="eyebrow mobile-sub">Policies</p>
      <ul class="mobile-policies">
        ${policies.map((p) => `<li><a href="${policyUrl(p.slug)}"${path === policyUrl(p.slug) ? ' aria-current="page"' : ''}>${esc(p.title)}</a></li>`).join('')}
      </ul>
      <a class="btn btn-gold btn-block" href="/contact/#join">Join the Movement</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `
<footer class="site-footer">
  <div class="footer-rosette" aria-hidden="true"></div>
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        ${wordmark('wordmark-lg')}
        <p class="footer-tag">${esc(site.tagline)}.</p>
        <p class="footer-note">${esc(site.status)} for President of the United States · ${esc(site.hometown)}</p>
      </div>
      <nav class="footer-col" aria-label="Campaign">
        <h2 class="footer-h">Campaign</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About Doug</a></li>
          <li><a href="/platform/">The Platform</a></li>
          ${news.length ? '<li><a href="/news/">News</a></li>' : ''}
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/contact/#join">Join the Movement</a></li>
        </ul>
      </nav>
      <nav class="footer-col footer-col-wide" aria-label="Policies">
        <h2 class="footer-h">Policies</h2>
        <ul class="footer-policies">
          ${policies.map((p) => `<li><a href="${policyUrl(p.slug)}">${esc(p.title)}</a></li>`).join('')}
        </ul>
      </nav>
      <div class="footer-col">
        <h2 class="footer-h">Contact</h2>
        <ul class="footer-contact">
          <li>${icon('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
          <li>${icon('phone')}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
          <li>${icon('clock')}<span>${site.hours}</span></li>
          <li>${icon('pin')}<span>${site.hometown}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="paid-for">${esc(site.disclaimer)}</p>
      <p class="copyright">© ${YEAR} ${esc(site.copyright)}</p>
    </div>
  </div>
</footer>`;
}

function breadcrumbs(trail) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>
    ${trail.map((c, i) => (i === trail.length - 1
      ? `<li><span aria-current="page">${esc(c.name)}</span></li>`
      : `<li><a href="${c.path}">${esc(c.name)}</a></li>`)).join('')}
  </ol></nav>`;
}

const breadcrumbSchema = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
});

const ids = { site: abs('/#website'), org: abs('/#campaign'), doug: abs('/#doug-jenkins') };
const orgSchema = {
  '@type': 'Organization',
  '@id': ids.org,
  name: site.name,
  url: abs('/'),
  logo: abs('/assets/img/icon-512.png'),
  email: site.email,
  telephone: '+1-608-630-6648',
  address: { '@type': 'PostalAddress', addressLocality: 'Madison', addressRegion: 'WI', addressCountry: 'US' },
};
const personSchema = {
  '@type': 'Person',
  '@id': ids.doug,
  name: 'Doug Jenkins',
  description: 'Independent write-in candidate for President of the United States in 2028; U.S. Army veteran of the Vietnam War.',
  url: abs('/about/'),
  image: abs('/assets/img/doug-jenkins-portrait.jpg'),
  homeLocation: { '@type': 'Place', name: 'Madison, Wisconsin' },
};
const websiteSchema = { '@type': 'WebSite', '@id': ids.site, name: site.name, url: abs('/'), inLanguage: 'en-US', publisher: { '@id': ids.org } };

function layout({ path, title, description, body, schema = [], ogImage = 'home', type = 'website', bodyClass = '', noindex = false }) {
  const url = abs(path);
  const og = abs(`/assets/og/${ogImage}.png`);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description, isPartOf: { '@id': ids.site }, inLanguage: 'en-US' },
      ...schema,
    ],
  };
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.className+=' js'</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#101D35">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(title)}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<link rel="preload" href="/assets/fonts/source-serif-4-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/public-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css?v=${v.css}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
<script src="/assets/js/main.js?v=${v.js}" defer></script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to main content</a>
${header(path)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Shared sections
const picture = ({ name, alt, w, h, cls = '', eager = false, sizes }) => `
  <picture class="${cls}">
    <source type="image/webp" srcset="/assets/img/${name}.webp">
    <img src="/assets/img/${name}.jpg" alt="${esc(alt)}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${sizes ? ` sizes="${sizes}"` : ''}>
  </picture>`;

const flyerPicture = (cls = '') => `
  <picture class="${cls}">
    <source type="image/webp" srcset="/assets/img/campaign-flyer-800.webp 800w, /assets/img/campaign-flyer-1400.webp 1400w" sizes="(min-width: 960px) 420px, 90vw">
    <img src="/assets/img/campaign-flyer-800.jpg" srcset="/assets/img/campaign-flyer-800.jpg 800w, /assets/img/campaign-flyer-1400.jpg 1400w" sizes="(min-width: 960px) 420px, 90vw" alt="Doug Jenkins campaign flyer: Doug Jenkins, Independent Write-In for President 2028, End the Nonsense. Doug, a father of 4, 10 grandkids and 2 great-grandkids, ran for President in 2020 and 2024. A highly decorated Vietnam War veteran; a sergeant and life coach since 1969 who served 24 years in the U.S. Army. He ran his own successful painting business for almost 40 years. Paid for by Friends of Doug Jenkins." width="800" height="1067" loading="lazy" decoding="async">
  </picture>`;

const portrait = (eager = false, caption = true) => `
  <figure class="portrait">
    <div class="portrait-frame">
      ${picture({ name: 'doug-jenkins-portrait', alt: 'Doug Jenkins wearing his veterans’ cap and glasses', w: 386, h: 386, eager })}
    </div>
    ${caption ? '<figcaption><strong>Doug Jenkins</strong><span>U.S. Army veteran · 24 years of service</span></figcaption>' : ''}
  </figure>`;

const factsStrip = (cls = '') => `
  <ul class="facts ${cls}" aria-label="Doug Jenkins at a glance">
    ${bio.facts.map((f) => `<li class="fact"><span class="fact-figure">${f.pre ? `<small>${esc(f.pre)}</small>` : ''}${esc(f.figure)}${f.post ? `<small>${esc(f.post)}</small>` : ''}</span><span class="fact-label">${esc(f.label)}</span></li>`).join('')}
  </ul>`;

const recordTimeline = () => `
  <ol class="timeline">
    ${bio.record.map((r, i) => `<li class="${i === bio.record.length - 1 ? 'is-current' : ''}"><span class="tl-year">${r.year}</span><span class="tl-text">${esc(r.text)}</span></li>`).join('')}
  </ol>`;

const highlightsGrid = () => `
  <ul class="highlights">
    ${highlights.map((h) => `<li><a class="highlight" href="${policyUrl(h.policy)}">
      <span class="hl-figure">${esc(h.figure)}</span>
      <span class="hl-label">${esc(h.label)}</span>
      <span class="hl-link">${esc(bySlug[h.policy].title)} ${icon('arrow')}</span>
    </a></li>`).join('')}
  </ul>`;

const policyIndex = () => `
  <ol class="policy-index">
    ${policies.map((p, i) => `<li><a class="pi-item reveal" href="${policyUrl(p.slug)}">
      <span class="pi-num">${roman(i + 1)}</span>
      <span class="pi-icon">${icon(policyIcon[p.icon])}</span>
      <span class="pi-body"><span class="pi-title">${esc(p.title)}</span><span class="pi-short">${esc(p.short)}</span></span>
      <span class="pi-arrow">${icon('arrow')}</span>
    </a></li>`).join('')}
  </ol>`;

const policyCard = (p, headingLevel = 'h3') => `
  <a class="policy-card reveal" href="${policyUrl(p.slug)}">
    <span class="pc-top"><span class="pc-num">${roman(p.n)}</span><span class="pc-icon">${icon(policyIcon[p.icon])}</span></span>
    <${headingLevel} class="pc-title">${esc(p.title)}</${headingLevel}>
    <span class="pc-short">${esc(p.short)}</span>
    <span class="pc-link">Read the policy ${icon('arrow')}</span>
  </a>`;

const ctaBand = (heading = 'Stand for change.') => `
  <section class="section cta-section" aria-labelledby="cta-h">
    <div class="container">
      <div class="cta-head">
        <p class="eyebrow">Get involved</p>
        <h2 id="cta-h" class="h2">${esc(heading)}</h2>
      </div>
      <ul class="cta-grid">
        <li><a class="cta-tile" href="/about/"><span class="cta-k">01</span><span class="cta-t">Learn about Doug</span><span class="cta-d">A veteran, a business owner and a grandfather.</span>${icon('arrow')}</a></li>
        <li><a class="cta-tile" href="/platform/"><span class="cta-k">02</span><span class="cta-t">Read the platform</span><span class="cta-d">Ten policy commitments, one page each.</span>${icon('arrow')}</a></li>
        <li><a class="cta-tile" href="/contact/"><span class="cta-k">03</span><span class="cta-t">Contact the campaign</span><span class="cta-d">Email, call or send a message.</span>${icon('arrow')}</a></li>
        <li><a class="cta-tile" href="/contact/#join"><span class="cta-k">04</span><span class="cta-t">Join the movement</span><span class="cta-d">Get campaign updates by email.</span>${icon('arrow')}</a></li>
      </ul>
    </div>
  </section>`;

const pageHero = ({ trail, eyebrow, title, lead, extra = '', cls = '' }) => `
  <section class="page-hero ${cls}">
    <div class="hero-rosette" aria-hidden="true"></div>
    <div class="container">
      ${breadcrumbs(trail)}
      <div class="page-hero-inner">
        <div>
          ${eyebrow ? `<p class="eyebrow eyebrow-gold">${eyebrow}</p>` : ''}
          <h1 class="page-title">${title}</h1>
          ${lead ? `<p class="page-lead">${lead}</p>` : ''}
        </div>
        ${extra}
      </div>
    </div>
  </section>`;

const newsCard = (n) => `
  <article class="news-card">
    <time datetime="${n.date}">${new Date(n.date + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time>
    <h3 class="news-title"><a href="/news/${n.slug}/">${esc(n.title)}</a></h3>
    <p>${esc(n.summary)}</p>
  </article>`;

// ---------------------------------------------------------------------------
// Pages
const pages = [];

// HOME ----------------------------------------------------------------------
pages.push({
  path: '/',
  html: layout({
    path: '/',
    title: 'Doug Jenkins for President 2028 | Independent Write-In Candidate',
    description: 'Doug Jenkins, a Vietnam War veteran and small-business owner from Madison, Wisconsin, is an independent write-in candidate for President in 2028. End the Nonsense.',
    bodyClass: 'is-home',
    schema: [websiteSchema, orgSchema, personSchema],
    body: `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-clip" aria-hidden="true"><div class="hero-rosette"></div></div>
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow eyebrow-gold">${esc(site.status)} · ${esc(site.hometown)}</p>
      <h1 class="hero-title" id="hero-title">
        <span class="ht-name">Doug Jenkins</span>
        <span class="ht-for">for President <span class="ht-year">2028</span></span>
      </h1>
      <p class="hero-tag"><span class="rule" aria-hidden="true"></span>End the Nonsense.</p>
      <p class="hero-lead">A Vietnam War veteran, a sergeant and life coach since 1969, and the owner of his own painting business for almost 40 years, Doug Jenkins is running on a plain-spoken platform: a price freeze for working families, a leaner federal budget and a nation focused on peace.</p>
      <div class="btn-row">
        <a class="btn btn-gold" href="/about/">Meet Doug</a>
        <a class="btn btn-ghost" href="/platform/">Explore the Platform</a>
      </div>
    </div>
    <div class="hero-media">${portrait(true)}</div>
  </div>
  <div class="container">${factsStrip('facts-hero')}</div>
</section>

<section class="section meet" aria-labelledby="meet-h">
  <div class="container meet-grid">
    <div class="meet-copy reveal">
      <p class="eyebrow">Meet Doug Jenkins</p>
      <h2 id="meet-h" class="h2">A soldier, a small-business owner, a grandfather, and a three-time candidate for President.</h2>
      ${bio.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
      <blockquote class="inline-quote"><p>${esc(site.communityDedication)}</p></blockquote>
      <a class="text-link" href="/about/">Read Doug’s story ${icon('arrow')}</a>
    </div>
    <aside class="meet-record reveal" aria-labelledby="record-h">
      <h3 id="record-h" class="eyebrow">Campaign record</h3>
      ${recordTimeline()}
    </aside>
  </div>
</section>

<section class="section platform-home" aria-labelledby="platform-h">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Campaign priorities</p>
        <h2 id="platform-h" class="h2">The Platform</h2>
      </div>
      <p class="section-intro">Ten areas of policy, from the cost of living to a new Department of Peace. Each has its own page with Doug’s full proposal.</p>
    </div>
    ${policyIndex()}
  </div>
</section>

<section class="section why" aria-labelledby="why-h">
  <div class="hero-rosette rosette-right" aria-hidden="true"></div>
  <div class="container">
    <p class="eyebrow eyebrow-gold">Why Doug is running</p>
    <h2 id="why-h" class="why-title">End the Nonsense.</h2>
    <p class="why-lead">Doug’s campaign message fits in three words. His platform explains what he means by them, in statements like these.</p>
    <ul class="quotes">
      ${quotes.map((q) => `<li class="reveal"><figure class="quote-card">
        <blockquote><p>${esc(q.text)}</p></blockquote>
        <figcaption><a href="${policyUrl(q.policy)}">${esc(bySlug[q.policy].title)} ${icon('arrow')}</a></figcaption>
      </figure></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section glance" aria-labelledby="glance-h">
  <div class="container">
    <div class="section-head">
      <div>
        <p class="eyebrow">Policy highlights</p>
        <h2 id="glance-h" class="h2">The plan at a glance</h2>
      </div>
      <p class="section-intro">Specific, measurable proposals from Doug’s platform.</p>
    </div>
    ${highlightsGrid()}
  </div>
</section>

${news.length ? `
<section class="section updates" aria-labelledby="updates-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">From the campaign</p><h2 id="updates-h" class="h2">Latest updates</h2></div><a class="text-link" href="/news/">All updates ${icon('arrow')}</a></div>
    <div class="news-grid">${[...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map(newsCard).join('')}</div>
  </div>
</section>` : ''}

${ctaBand('Stand for change. Join today.')}
`,
  }),
});

// ABOUT ---------------------------------------------------------------------
{
  const trail = [{ name: 'Home', path: '/' }, { name: 'About Doug', path: '/about/' }];
  pages.push({
    path: '/about/',
    html: layout({
      path: '/about/',
      title: 'About Doug Jenkins | Vietnam Veteran, Business Owner, Candidate for President',
      description: 'Doug Jenkins is a highly decorated Vietnam War veteran who served 24 years in the U.S. Army and ran his own painting business for almost 40 years. Now he is running for President in 2028.',
      ogImage: 'about',
      type: 'profile',
      schema: [personSchema, breadcrumbSchema(trail)],
      body: `
${pageHero({ trail, eyebrow: 'About Doug', title: 'Doug Jenkins', lead: 'Vietnam War veteran. Sergeant and life coach since 1969. Small-business owner. Father, grandfather and great-grandfather. Independent write-in candidate for President in 2028.', extra: `<div class="page-hero-media">${portrait(true, false)}</div>`, cls: 'page-hero-about' })}

<section class="section about-facts-wrap" aria-label="At a glance">
  <div class="container">${factsStrip('facts-light')}</div>
</section>

<section class="section about-story" aria-labelledby="story-h">
  <div class="container about-grid">
    <div class="prose reveal">
      <p class="eyebrow">His story</p>
      <h2 id="story-h" class="h2">Service first.</h2>
      <p class="prose-lead">${esc(bio.paragraphs[0])}</p>
      <h3 class="h3">Business</h3>
      <p>${esc(bio.paragraphs[1])}</p>
      <h3 class="h3">Family</h3>
      <p>${esc(bio.paragraphs[2])}</p>
      <h3 class="h3">Community</h3>
      <p>${esc(site.communityDedication)}</p>
      <h3 class="h3">The campaign</h3>
      <p>${esc(bio.paragraphs[3])}</p>
    </div>
    <aside class="about-aside reveal" aria-label="Family">
      <dl class="family">
        <div><dt>Children</dt><dd>${bio.family.children}</dd></div>
        <div><dt>Grandchildren</dt><dd>${bio.family.grandchildren}</dd></div>
        <div><dt>Great-grandchildren</dt><dd>${bio.family.greatGrandchildren}</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="section about-record" aria-labelledby="record-h">
  <div class="container record-grid">
    <div class="reveal">
      <p class="eyebrow eyebrow-gold">Campaign record</p>
      <h2 id="record-h" class="h2">Running for the third time.</h2>
      <p class="on-dark-lead">Doug has stood for President before, and he is standing again, as an independent.</p>
      ${recordTimeline()}
    </div>
    <figure class="flyer reveal">
      ${flyerPicture()}
      <figcaption>The 2028 campaign flyer.</figcaption>
    </figure>
  </div>
</section>

<section class="section" aria-labelledby="about-platform-h">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Where Doug stands</p><h2 id="about-platform-h" class="h2">The Platform</h2></div>
      <a class="text-link" href="/platform/">View all ten policies ${icon('arrow')}</a>
    </div>
    <div class="card-grid card-grid-3">
      ${['economy', 'department-of-peace', 'homelessness'].map((s) => policyCard(bySlug[s])).join('')}
    </div>
  </div>
</section>

${ctaBand()}
`,
    }),
  });
}

// PLATFORM INDEX ------------------------------------------------------------
{
  const trail = [{ name: 'Home', path: '/' }, { name: 'The Platform', path: '/platform/' }];
  pages.push({
    path: '/platform/',
    html: layout({
      path: '/platform/',
      title: 'The Platform | Doug Jenkins for President 2028',
      description: 'Doug Jenkins’ campaign platform: a one-year price freeze, federal budget reform, a Department of Peace, ending homelessness, health coverage for all, criminal justice reform, immigration, climate and more.',
      ogImage: 'platform',
      schema: [breadcrumbSchema(trail), {
        '@type': 'ItemList',
        name: 'Doug Jenkins campaign platform',
        itemListElement: policies.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: abs(policyUrl(p.slug)) })),
      }],
      body: `
${pageHero({ trail, eyebrow: 'Campaign platform', title: 'The Platform', lead: 'Ten policy commitments from Doug Jenkins’ 2028 campaign, from the cost of living and the federal budget to peace, homelessness and health care.' })}

<section class="section" aria-labelledby="all-h">
  <div class="container">
    <h2 id="all-h" class="visually-hidden">All policies</h2>
    <div class="card-grid card-grid-2">
      ${policies.map((p) => policyCard(bySlug[p.slug])).join('')}
    </div>
  </div>
</section>

<section class="section glance glance-alt" aria-labelledby="glance-h">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Policy highlights</p><h2 id="glance-h" class="h2">The plan at a glance</h2></div>
      <p class="section-intro">Specific, measurable proposals from across the platform.</p>
    </div>
    ${highlightsGrid()}
  </div>
</section>

${ctaBand('Questions about the platform?')}
`,
    }),
  });
}

// POLICY PAGES --------------------------------------------------------------
for (const p of policies.map((x) => bySlug[x.slug])) {
  const path = policyUrl(p.slug);
  const trail = [{ name: 'Home', path: '/' }, { name: 'The Platform', path: '/platform/' }, { name: p.title, path }];
  const figures = p.figures.length ? `
      <section class="figures reveal" aria-labelledby="fig-h">
        <h2 id="fig-h" class="eyebrow">${p.figuresAreProposals ? 'The proposal in numbers' : 'By the numbers'}</h2>
        <ul class="figure-list">
          ${p.figures.map((f) => `<li><span class="fig-figure">${esc(f.figure)}</span><span class="fig-label">${esc(f.label)}</span></li>`).join('')}
        </ul>
        ${p.figuresAreProposals ? '' : '<p class="fig-note">Figures as stated by the campaign.</p>'}
      </section>` : '';
  pages.push({
    path,
    html: layout({
      path,
      title: `${p.title} | Doug Jenkins for President 2028`,
      description: p.seo,
      ogImage: p.slug,
      bodyClass: 'is-policy',
      schema: [breadcrumbSchema(trail)],
      body: `
${pageHero({ trail, eyebrow: `Policy ${roman(p.n)} of ${policies.length}`, title: esc(p.fullTitle || p.title), lead: esc(p.lead), extra: `<span class="page-hero-icon" aria-hidden="true">${icon(policyIcon[p.icon])}</span>`, cls: 'page-hero-policy' })}

<div class="section policy-body">
  <div class="container policy-grid">
    <article class="policy-main">
      <section class="proposal reveal" aria-labelledby="prop-h">
        <h2 id="prop-h" class="h2">Doug’s proposal</h2>
        <ol class="proposal-list">
          ${p.proposals.map((x) => `<li>${esc(x)}</li>`).join('')}
        </ol>
      </section>
      ${p.context.length ? `<section class="context reveal" aria-labelledby="ctx-h"><h2 id="ctx-h" class="h3">Why it matters</h2>${p.context.map((c) => `<p>${esc(c)}</p>`).join('')}</section>` : ''}
      ${figures}
      ${p.quote ? `<figure class="policy-quote reveal"><blockquote><p>${esc(p.quote)}</p></blockquote><figcaption>Doug Jenkins</figcaption></figure>` : ''}
      <p class="policy-back"><a class="text-link" href="/platform/">${icon('arrow', 'icon icon-flip')} Back to the full platform</a></p>
    </article>
    <aside class="policy-aside" aria-labelledby="aside-h">
      <div class="aside-card">
        <h2 id="aside-h" class="eyebrow">The Platform</h2>
        <ol class="aside-list">
          ${policies.map((q, i) => `<li><a href="${policyUrl(q.slug)}"${q.slug === p.slug ? ' aria-current="page"' : ''}><span>${roman(i + 1)}</span>${esc(q.title)}</a></li>`).join('')}
        </ol>
      </div>
    </aside>
  </div>
</div>

<section class="section related" aria-labelledby="rel-h">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Keep reading</p><h2 id="rel-h" class="h2">Related policies</h2></div><a class="text-link" href="/platform/">All policies ${icon('arrow')}</a></div>
    <div class="card-grid card-grid-3">
      ${p.related.map((s) => policyCard(bySlug[s])).join('')}
    </div>
  </div>
</section>

${ctaBand()}
`,
    }),
  });
}

// CONTACT -------------------------------------------------------------------
{
  const trail = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];
  pages.push({
    path: '/contact/',
    html: layout({
      path: '/contact/',
      title: 'Contact the Campaign | Doug Jenkins for President 2028',
      description: `Contact Doug Jenkins for President 2028 by email at ${site.email} or by phone at ${site.phone}, or join the campaign email list.`,
      ogImage: 'contact',
      schema: [{ ...orgSchema, contactPoint: { '@type': 'ContactPoint', contactType: 'campaign', email: site.email, telephone: '+1-608-630-6648', areaServed: 'US', availableLanguage: 'English' } }, breadcrumbSchema(trail)],
      body: `
${pageHero({ trail, eyebrow: 'Contact', title: 'Get in touch', lead: 'Questions, ideas or support for the campaign? Doug wants to hear from you.' })}

<section class="section contact" aria-labelledby="connect-h">
  <div class="container contact-grid">
    <div class="contact-details reveal">
      <h2 id="connect-h" class="h2">Connect with Doug</h2>
      <ul class="contact-list">
        <li><span class="ci">${icon('mail')}</span><span><span class="cl">Email</span><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li><span class="ci">${icon('phone')}</span><span><span class="cl">Phone</span><a href="tel:${site.phoneHref}">${site.phone}</a></span></li>
        <li><span class="ci">${icon('clock')}</span><span><span class="cl">Hours</span>${site.hours}</span></li>
        <li><span class="ci">${icon('pin')}</span><span><span class="cl">Based in</span>${site.hometown}</span></li>
      </ul>
    </div>
    <div class="form-card reveal">
      <h2 class="h3">Send a message</h2>
      <form class="form" data-mailto-form data-subject="Message from dougjenkinsforpresident.com" novalidate>
        <div class="field">
          <label for="c-name">Name</label>
          <input id="c-name" name="name" type="text" autocomplete="name">
        </div>
        <div class="field">
          <label for="c-email">Email <span class="req" aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
          <input id="c-email" name="email" type="email" autocomplete="email" required aria-describedby="c-email-err">
          <p class="field-error" id="c-email-err" hidden>Please enter a valid email address.</p>
        </div>
        <div class="field">
          <label for="c-source">Where did you hear about us?</label>
          <input id="c-source" name="source" type="text">
        </div>
        <div class="field">
          <label for="c-message">Message <span class="req" aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
          <textarea id="c-message" name="message" rows="5" required aria-describedby="c-message-err"></textarea>
          <p class="field-error" id="c-message-err" hidden>Please enter a message.</p>
        </div>
        <button class="btn btn-blue" type="submit">Send message</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-help">Sending opens your email app with your message ready to send to ${site.email}.</p>
      </form>
    </div>
  </div>
</section>

<section class="section join" id="join" aria-labelledby="join-h">
  <div class="hero-rosette rosette-right" aria-hidden="true"></div>
  <div class="container join-grid">
    <div>
      <p class="eyebrow eyebrow-gold">Join the movement</p>
      <h2 id="join-h" class="why-title">Stand for change. Join today.</h2>
      <p class="on-dark-lead">Sign up to hear from the campaign by email.</p>
    </div>
    <form class="form form-inline" data-mailto-form data-signup data-subject="Please add me to the campaign email list" novalidate>
      <div class="field">
        <label for="j-email">Email address <span class="visually-hidden">(required)</span></label>
        <div class="inline-row">
          <input id="j-email" name="email" type="email" autocomplete="email" required aria-describedby="j-email-err">
          <button class="btn btn-gold" type="submit">Sign up</button>
        </div>
        <p class="field-error" id="j-email-err" hidden>Please enter a valid email address.</p>
      </div>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
`,
    }),
  });
}

// NEWS (generated only when genuine updates exist) ---------------------------
if (news.length) {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const trail = [{ name: 'Home', path: '/' }, { name: 'News', path: '/news/' }];
  pages.push({
    path: '/news/',
    html: layout({
      path: '/news/', title: 'Campaign News | Doug Jenkins for President 2028',
      description: 'Announcements and updates from the Doug Jenkins for President 2028 campaign.',
      ogImage: 'home', schema: [breadcrumbSchema(trail)],
      body: `${pageHero({ trail, eyebrow: 'From the campaign', title: 'Campaign News' })}
<section class="section"><div class="container"><div class="news-grid">${sorted.map(newsCard).join('')}</div></div></section>${ctaBand()}`,
    }),
  });
  for (const n of sorted) {
    const path = `/news/${n.slug}/`;
    const t = [...trail, { name: n.title, path }];
    pages.push({
      path,
      html: layout({
        path, title: `${n.title} | Doug Jenkins for President 2028`, description: n.summary, ogImage: 'home', type: 'article',
        schema: [breadcrumbSchema(t), { '@type': 'Article', headline: n.title, datePublished: n.date, dateModified: n.date, author: { '@id': ids.org }, publisher: { '@id': ids.org }, mainEntityOfPage: abs(path), image: abs('/assets/og/home.png') }],
        body: `${pageHero({ trail: t, eyebrow: `<time datetime="${n.date}">${n.date}</time>`, title: esc(n.title), lead: esc(n.summary) })}
<section class="section"><div class="container"><div class="prose">${n.body.map((x) => `<p>${esc(x)}</p>`).join('')}</div></div></section>${ctaBand()}`,
      }),
    });
  }
}

// 404 -----------------------------------------------------------------------
const notFound = layout({
  path: '/404.html',
  title: 'Page Not Found | Doug Jenkins for President 2028',
  description: 'The page you were looking for could not be found.',
  noindex: true,
  body: `
${pageHero({ trail: [{ name: 'Home', path: '/' }, { name: 'Page not found', path: '/404.html' }], eyebrow: 'Error 404', title: 'Page not found', lead: 'The page you were looking for has moved or no longer exists.' })}
<section class="section"><div class="container"><div class="btn-row">
  <a class="btn btn-blue" href="/">Go to the home page</a>
  <a class="btn btn-outline" href="/platform/">Read the platform</a>
</div></div></section>`,
});

// Legacy GoDaddy store URL → home (server redirect is in _redirects; this is the static fallback)
const redirectStub = (to) => `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><title>Redirecting…</title><meta name="robots" content="noindex"><link rel="canonical" href="${abs(to)}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p><a href="${to}">Continue to ${esc(site.name)}</a></p></body></html>`;

// ---------------------------------------------------------------------------
// Write output
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await writeFile(join(SRC, 'assets/img/guilloche.svg'), guilloche());
await cp(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
await cp(join(SRC, 'static'), OUT, { recursive: true });

for (const p of pages) {
  const dir = join(OUT, p.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), p.html);
}
await writeFile(join(OUT, '404.html'), notFound);
for (const legacy of ['/ols/products/', '/ols/']) {
  await mkdir(join(OUT, legacy), { recursive: true });
  await writeFile(join(OUT, legacy, 'index.html'), redirectStub('/'));
}

await writeFile(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${BUILD_DATE}</lastmod><priority>${p.path === '/' ? '1.0' : p.path.split('/').length > 3 ? '0.7' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
await writeFile(join(OUT, '_redirects'), `# Netlify / Cloudflare Pages redirects\n/ols/products   /   301\n/ols/products/  /   301\n/ols/*          /   301\n/404            /   301\nhttp://dougjenkinsforpresident.com/*      https://dougjenkinsforpresident.com/:splat  301!\nhttp://www.dougjenkinsforpresident.com/*  https://dougjenkinsforpresident.com/:splat  301!\nhttps://www.dougjenkinsforpresident.com/* https://dougjenkinsforpresident.com/:splat  301!\n`);
await writeFile(join(OUT, 'site.webmanifest'), JSON.stringify({
  name: site.name, short_name: site.shortName, start_url: '/', display: 'standalone',
  background_color: '#F6F5F1', theme_color: '#101D35',
  icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2));

console.log(`Built ${pages.length} pages + 404 → ${OUT}`);
console.log(pages.map((p) => '  ' + p.path).join('\n'));
