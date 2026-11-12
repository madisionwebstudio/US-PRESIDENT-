// Static site generator for dougjenkinsforpresident.com
// Usage: node src/build.mjs   → writes the deployable site to ./public
// No runtime dependencies. Content lives in src/content.mjs.

import { mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, bio, policies, news } from './content.mjs';
import { icon } from './icons.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'public');
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (path) => site.url + path;
const VISION = '/our-vision/';
const policyUrl = (slug) => `${VISION}${slug}/`;
const label = (p) => p.shortTitle || p.title;

const hashOf = async (p) => createHash('sha256').update(await readFile(p)).digest('hex').slice(0, 10);
const v = {
  css: await hashOf(join(SRC, 'assets/css/main.css')),
  js: await hashOf(join(SRC, 'assets/js/main.js')),
};

// The swoosh at the foot of the campaign flyer, reused as the campaign's graphic mark.
const swoosh = (cls = '') =>
  `<svg class="swoosh ${cls}" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 30 C 300 6, 900 6, 1200 26 L 1200 48 C 900 26, 300 26, 0 54 Z"/></svg>`;

// ---------------------------------------------------------------------------
const navItems = [
  { href: '/meet-doug/', label: 'Meet Doug' },
  { href: VISION, label: 'Our Vision' },
  ...(news.length ? [{ href: '/news/', label: 'News' }] : []),
  { href: '/contact/', label: 'Contact' },
];

const logo = (cls = '') => `
  <a class="logo ${cls}" href="/" aria-label="${esc(site.name)}, home">
    <span class="logo-name">Doug Jenkins</span>
    <span class="logo-sub">For President 2028</span>
  </a>`;

function header(path) {
  const cur = (href) => (path.startsWith(href) ? ' aria-current="page"' : '');
  return `
<header class="site-header" data-header>
  <div class="wrap header-inner">
    ${logo()}
    <nav class="nav" aria-label="Main">
      <ul>${navItems.map((n) => `<li><a href="${n.href}"${cur(n.href)}>${n.label}</a></li>`).join('')}</ul>
      <a class="btn btn-red btn-sm" href="#join">Join the Movement</a>
    </nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-nav-toggle>
      <span class="menu-open">${icon('menu')} Menu</span><span class="menu-close">${icon('close')} Close</span>
    </button>
  </div>
  <div class="menu" id="menu" data-mobile-nav hidden>
    <nav class="wrap" aria-label="Mobile">
      <ul class="menu-main">
        <li><a href="/"${path === '/' ? ' aria-current="page"' : ''}>Home</a></li>
        ${navItems.map((n) => `<li><a href="${n.href}"${cur(n.href)}>${n.label}</a></li>`).join('')}
      </ul>
      <ul class="menu-sub">
        ${policies.map((p) => `<li><a href="${policyUrl(p.slug)}"${cur(policyUrl(p.slug))}>${esc(label(p))}</a></li>`).join('')}
      </ul>
      <a class="btn btn-red btn-block" href="#join">Join the Movement</a>
    </nav>
  </div>
</header>`;
}

const signupForm = (id) => `
  <form class="signup" data-mailto-form data-signup data-subject="Join the Movement" novalidate>
    <label class="visually-hidden" for="${id}">Email address (required)</label>
    <div class="signup-row">
      <input id="${id}" name="email" type="email" autocomplete="email" placeholder="Email address" required aria-describedby="${id}-err">
      <button class="btn btn-red" type="submit">Sign up</button>
    </div>
    <p class="field-error" id="${id}-err" hidden>Please enter a valid email address.</p>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;

const joinBand = () => `
<section class="join" id="join" aria-labelledby="join-h">
  <div class="wrap join-inner">
    <div>
      <h2 id="join-h" class="join-title">${esc(site.join.heading)}</h2>
      <p class="join-text">${esc(site.join.text)}</p>
    </div>
    ${signupForm('join-email')}
  </div>
</section>`;

function footer() {
  return `
<footer class="site-footer">
  ${swoosh('swoosh-footer')}
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        ${logo('logo-light')}
        <p class="footer-slogan">${esc(site.slogan)}.</p>
      </div>
      <nav aria-label="Footer">
        <h2 class="footer-h">Campaign</h2>
        <ul>
          <li><a href="/">Home</a></li>
          ${navItems.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
        </ul>
      </nav>
      <nav aria-label="Our Vision">
        <h2 class="footer-h">Our Vision</h2>
        <ul class="footer-issues">
          ${policies.map((p) => `<li><a href="${policyUrl(p.slug)}">${esc(label(p))}</a></li>`).join('')}
        </ul>
      </nav>
      <div>
        <h2 class="footer-h">Connect with Doug</h2>
        <ul class="footer-contact">
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li><a href="tel:${site.phoneHref}">${site.phone}</a></li>
          <li>${site.hours}</li>
          <li>${site.hometown}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="paid-for">${esc(site.disclaimer)}</p>
      <p>Copyright © ${YEAR} ${esc(site.copyright)}</p>
    </div>
  </div>
</footer>`;
}

const breadcrumbs = (trail) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((c, i) => (i === trail.length - 1
  ? `<li><span aria-current="page">${esc(c.name)}</span></li>`
  : `<li><a href="${c.path}">${esc(c.name)}</a></li>`)).join('')}</ol></nav>`;

const breadcrumbSchema = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
});

const ids = { site: abs('/#website'), org: abs('/#campaign'), doug: abs('/#doug-jenkins') };
const orgSchema = {
  '@type': 'Organization', '@id': ids.org, name: site.name, url: abs('/'), logo: abs('/assets/img/icon-512.png'),
  email: site.email, telephone: '+1-608-630-6648',
  address: { '@type': 'PostalAddress', addressLocality: 'Madison', addressRegion: 'WI', addressCountry: 'US' },
};
const personSchema = {
  '@type': 'Person', '@id': ids.doug, name: 'Doug Jenkins',
  description: 'Independent write-in candidate for President of the United States in 2028; Vietnam War veteran who served 24 years in the US Army.',
  url: abs('/meet-doug/'), image: abs('/assets/img/doug-jenkins-portrait.jpg'),
  homeLocation: { '@type': 'Place', name: 'Madison, Wisconsin' },
};
const websiteSchema = { '@type': 'WebSite', '@id': ids.site, name: site.name, url: abs('/'), inLanguage: 'en-US', publisher: { '@id': ids.org } };

function layout({ path, title, description, body, schema = [], ogImage = 'home', type = 'website', noindex = false }) {
  const url = abs(path);
  const og = abs(`/assets/og/${ogImage}.png`);
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description, isPartOf: { '@id': ids.site }, inLanguage: 'en-US' },
    ...schema,
  ] };
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.className+=' js'</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#1b3a8c">
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
<link rel="preload" href="/assets/fonts/archivo-latin-wdth-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css?v=${v.css}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
<script src="/assets/js/main.js?v=${v.js}" defer></script>
</head>
<body>
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
const portrait = (eager = false) => `
  <picture class="photo">
    <source type="image/webp" srcset="/assets/img/doug-jenkins-portrait.webp">
    <img src="/assets/img/doug-jenkins-portrait.jpg" alt="Doug Jenkins wearing his veterans cap and glasses" width="386" height="386" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  </picture>`;

const flyer = () => `
  <figure class="flyer">
    <picture>
      <source type="image/webp" srcset="/assets/img/campaign-flyer-800.webp 800w, /assets/img/campaign-flyer-1400.webp 1400w" sizes="(min-width: 960px) 440px, 90vw">
      <img src="/assets/img/campaign-flyer-800.jpg" srcset="/assets/img/campaign-flyer-800.jpg 800w, /assets/img/campaign-flyer-1400.jpg 1400w" sizes="(min-width: 960px) 440px, 90vw" alt="Campaign flyer: Doug Jenkins, Independent Write In, For President 2028, End the Nonsense. Doug, a father of 4, 10 grandkids, and 2 great grandkids, ran for President in 2020 and 2024. A highly decorated Vietnam War veteran; a sergeant and life coach since 1969 and had served 24 years in the US Army. He ran his own successful painting business for almost 40 years. Paid for by Friends of Doug Jenkins." width="800" height="1067" loading="lazy" decoding="async">
    </picture>
    <figcaption>Campaign flyer, 2028</figcaption>
  </figure>`;

const issueGrid = () => `
  <ul class="issues">
    ${policies.map((p) => `<li><a class="issue" href="${policyUrl(p.slug)}">
      <span class="issue-title">${esc(label(p))}</span>
      <span class="issue-text">${esc(p.excerpt)}</span>
      <span class="issue-more">Read more ${icon('arrow')}</span>
    </a></li>`).join('')}
  </ul>`;

const pageHead = ({ trail, title, sub = '' }) => `
  <section class="page-head">
    <div class="wrap">
      ${breadcrumbs(trail)}
      <h1 class="page-title">${title}</h1>
      ${sub}
    </div>
    ${swoosh('swoosh-head')}
  </section>`;

const renderBody = (blocks) => blocks.map((b) => (typeof b === 'string'
  ? `<p>${esc(b)}</p>`
  : `<ul class="checks">${b.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`)).join('\n');

const pages = [];

// HOME ----------------------------------------------------------------------
pages.push({
  path: '/',
  html: layout({
    path: '/',
    title: 'Doug Jenkins for President 2028 | End the Nonsense',
    description: 'Doug Jenkins, Independent Write-In for President 2028. A highly decorated Vietnam War veteran from Madison, Wisconsin who served 24 years in the US Army. End the Nonsense.',
    schema: [websiteSchema, orgSchema, personSchema],
    body: `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1 class="hero-kicker">Doug Jenkins <span>${esc(site.status)} for President 2028</span></h1>
      <p class="hero-slogan">${esc(site.slogan)}.</p>
      ${swoosh('swoosh-hero')}
      <div class="hero-join">
        <p class="hero-join-label"><strong>${esc(site.join.heading)}</strong> ${esc(site.join.text)}</p>
        ${signupForm('hero-email')}
      </div>
    </div>
    <div class="hero-photo">
      ${portrait(true)}
    </div>
  </div>
</section>

<section class="section meet" aria-labelledby="meet-h">
  <div class="wrap meet-grid">
    <div class="meet-copy">
      <h2 id="meet-h" class="h2">Meet Doug</h2>
      ${bio.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`).join('')}
      <h3 class="h3">${esc(site.communityDedication.heading)}</h3>
      <p>${esc(site.communityDedication.text)}</p>
      <a class="btn btn-blue" href="/meet-doug/">Meet Doug</a>
    </div>
    ${flyer()}
  </div>
</section>

<section class="section vision" aria-labelledby="vision-h">
  <div class="wrap">
    <div class="vision-head">
      <h2 id="vision-h" class="h2">Our Vision</h2>
      <a class="link" href="${VISION}">See all ${icon('arrow')}</a>
    </div>
    ${issueGrid()}
  </div>
</section>

<section class="statement" aria-label="From Doug">
  <div class="wrap">
    <p class="statement-text">“We can’t just sit here and do nothing!”</p>
    <p class="statement-source">Doug Jenkins, on <a href="${policyUrl('feed-the-starving-and-help-the-sick')}">Feed the Starving and Help the Sick</a></p>
  </div>
</section>

${news.length ? `<section class="section"><div class="wrap"><h2 class="h2">News</h2><ul class="news">${[...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((n) => `<li><time datetime="${n.date}">${n.date}</time><h3><a href="/news/${n.slug}/">${esc(n.title)}</a></h3><p>${esc(n.summary)}</p></li>`).join('')}</ul></div></section>` : ''}

${joinBand()}
`,
  }),
});

// MEET DOUG -----------------------------------------------------------------
{
  const trail = [{ name: 'Home', path: '/' }, { name: 'Meet Doug', path: '/meet-doug/' }];
  pages.push({
    path: '/meet-doug/',
    html: layout({
      path: '/meet-doug/',
      title: 'Meet Doug Jenkins | Doug Jenkins for President 2028',
      description: 'Doug Jenkins is a highly decorated Vietnam War veteran, a sergeant and life coach since 1969, who served 24 years in the US Army and ran his own painting business for almost 40 years.',
      ogImage: 'meet-doug', type: 'profile',
      schema: [personSchema, breadcrumbSchema(trail)],
      body: `
${pageHead({ trail, title: 'Meet Doug', sub: `<p class="page-sub">${esc(site.status)} for President 2028</p>` })}
<section class="section">
  <div class="wrap about-grid">
    <div class="about-photo">${portrait(true)}</div>
    <div class="prose">
      ${bio.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`).join('')}
      <h2 class="h3">${esc(site.communityDedication.heading)}</h2>
      <p>${esc(site.communityDedication.text)}</p>
      <p>Read where Doug stands in <a href="${VISION}">Our Vision</a>, or <a href="/contact/">get in touch</a>.</p>
    </div>
    ${flyer()}
  </div>
</section>
${joinBand()}
`,
    }),
  });
}

// OUR VISION ------------------------------------------------------------------
{
  const trail = [{ name: 'Home', path: '/' }, { name: 'Our Vision', path: VISION }];
  pages.push({
    path: VISION,
    html: layout({
      path: VISION,
      title: 'Our Vision | Doug Jenkins for President 2028',
      description: 'Where Doug Jenkins stands: the economy, climate change, the Department of Peace, homelessness, hunger, the federal budget, health care, prison reform, immigration and addictions.',
      ogImage: 'our-vision',
      schema: [breadcrumbSchema(trail), { '@type': 'ItemList', name: 'Our Vision', itemListElement: policies.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: abs(policyUrl(p.slug)) })) }],
      body: `
${pageHead({ trail, title: 'Our Vision' })}
<section class="section">
  <div class="wrap">
    <div class="dedication">
      <h2 class="h3">${esc(site.communityDedication.heading)}</h2>
      <p>${esc(site.communityDedication.text)}</p>
    </div>
    <h2 class="visually-hidden">Issues</h2>
    ${issueGrid()}
  </div>
</section>
${joinBand()}
`,
    }),
  });
}

// ISSUE PAGES ---------------------------------------------------------------
policies.forEach((p, i) => {
  const path = policyUrl(p.slug);
  const trail = [{ name: 'Home', path: '/' }, { name: 'Our Vision', path: VISION }, { name: label(p), path }];
  const next = policies[(i + 1) % policies.length];
  pages.push({
    path,
    html: layout({
      path,
      title: `${label(p)} | Doug Jenkins for President 2028`,
      description: p.seo,
      ogImage: p.slug,
      schema: [breadcrumbSchema(trail)],
      body: `
${pageHead({ trail, title: esc(p.title) })}
<section class="section">
  <div class="wrap issue-grid">
    <article class="prose issue-body">
      ${renderBody(p.body)}
      <p class="next">Next: <a href="${policyUrl(next.slug)}">${esc(label(next))} ${icon('arrow')}</a></p>
    </article>
    <aside class="issue-side" aria-labelledby="side-h">
      <h2 id="side-h" class="side-h">Our Vision</h2>
      <ul>
        ${policies.map((q) => `<li><a href="${policyUrl(q.slug)}"${q.slug === p.slug ? ' aria-current="page"' : ''}>${esc(label(q))}</a></li>`).join('')}
      </ul>
    </aside>
  </div>
</section>
${joinBand()}
`,
    }),
  });
});

// CONTACT -------------------------------------------------------------------
{
  const trail = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];
  pages.push({
    path: '/contact/',
    html: layout({
      path: '/contact/',
      title: 'Get in Touch | Doug Jenkins for President 2028',
      description: `Get in touch with Doug Jenkins for President 2028: ${site.email}, ${site.phone}.`,
      ogImage: 'contact',
      schema: [{ ...orgSchema, contactPoint: { '@type': 'ContactPoint', contactType: 'campaign', email: site.email, telephone: '+1-608-630-6648', areaServed: 'US', availableLanguage: 'English' } }, breadcrumbSchema(trail)],
      body: `
${pageHead({ trail, title: 'Get in Touch' })}
<section class="section">
  <div class="wrap contact-grid">
    <div>
      <h2 class="h2">Connect with Doug</h2>
      <dl class="contact">
        <div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
        <div><dt>Phone</dt><dd><a href="tel:${site.phoneHref}">${site.phone}</a></dd></div>
        <div><dt>Hours</dt><dd>${site.hours}</dd></div>
        <div><dt>Location</dt><dd>${site.hometown}</dd></div>
      </dl>
    </div>
    <form class="form" data-mailto-form data-subject="Message from dougjenkinsforpresident.com" novalidate>
      <h2 class="h3">Send a message</h2>
      <div class="field">
        <label for="c-name">Name</label>
        <input id="c-name" name="name" type="text" autocomplete="name">
      </div>
      <div class="field">
        <label for="c-email">Email <span aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
        <input id="c-email" name="email" type="email" autocomplete="email" required aria-describedby="c-email-err">
        <p class="field-error" id="c-email-err" hidden>Please enter a valid email address.</p>
      </div>
      <div class="field">
        <label for="c-source">Where did you hear about us?</label>
        <input id="c-source" name="source" type="text">
      </div>
      <div class="field">
        <label for="c-message">Message <span aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
        <textarea id="c-message" name="message" rows="5" required aria-describedby="c-message-err"></textarea>
        <p class="field-error" id="c-message-err" hidden>Please enter a message.</p>
      </div>
      <button class="btn btn-red" type="submit">Send</button>
      <p class="form-status" role="status" aria-live="polite"></p>
      <p class="form-help">This opens your email app with your message to ${site.email}.</p>
    </form>
  </div>
</section>
${joinBand()}
`,
    }),
  });
}

// NEWS (only when genuine updates exist) -------------------------------------
if (news.length) {
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const trail = [{ name: 'Home', path: '/' }, { name: 'News', path: '/news/' }];
  pages.push({ path: '/news/', html: layout({
    path: '/news/', title: 'News | Doug Jenkins for President 2028', description: 'News from the Doug Jenkins for President 2028 campaign.', schema: [breadcrumbSchema(trail)],
    body: `${pageHead({ trail, title: 'News' })}<section class="section"><div class="wrap"><ul class="news">${sorted.map((n) => `<li><time datetime="${n.date}">${n.date}</time><h2><a href="/news/${n.slug}/">${esc(n.title)}</a></h2><p>${esc(n.summary)}</p></li>`).join('')}</ul></div></section>${joinBand()}`,
  }) });
  for (const n of sorted) {
    const path = `/news/${n.slug}/`;
    const t = [...trail, { name: n.title, path }];
    pages.push({ path, html: layout({
      path, title: `${n.title} | Doug Jenkins for President 2028`, description: n.summary, type: 'article',
      schema: [breadcrumbSchema(t), { '@type': 'Article', headline: n.title, datePublished: n.date, author: { '@id': ids.org }, publisher: { '@id': ids.org }, mainEntityOfPage: abs(path), image: abs('/assets/og/home.png') }],
      body: `${pageHead({ trail: t, title: esc(n.title), sub: `<p class="page-sub"><time datetime="${n.date}">${n.date}</time></p>` })}<section class="section"><div class="wrap"><div class="prose">${n.body.map((x) => `<p>${esc(x)}</p>`).join('')}</div></div></section>${joinBand()}`,
    }) });
  }
}

const notFound = layout({
  path: '/404.html', title: 'Page Not Found | Doug Jenkins for President 2028', description: 'This page could not be found.', noindex: true,
  body: `${pageHead({ trail: [{ name: 'Home', path: '/' }, { name: 'Page not found', path: '/404.html' }], title: 'Page not found' })}
<section class="section"><div class="wrap"><p class="lead">This page could not be found.</p><p><a class="btn btn-blue" href="/">Go to the home page</a></p></div></section>`,
});

const redirectStub = (to) => `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><title>Redirecting…</title><meta name="robots" content="noindex"><link rel="canonical" href="${abs(to)}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><p><a href="${to}">Continue to ${esc(site.name)}</a></p></body></html>`;

// ---------------------------------------------------------------------------
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
await cp(join(SRC, 'static'), OUT, { recursive: true });
for (const p of pages) {
  await mkdir(join(OUT, p.path), { recursive: true });
  await writeFile(join(OUT, p.path, 'index.html'), p.html);
}
await writeFile(join(OUT, '404.html'), notFound);
for (const legacy of ['/ols/products/', '/ols/']) {
  await mkdir(join(OUT, legacy), { recursive: true });
  await writeFile(join(OUT, legacy, 'index.html'), redirectStub('/'));
}
await writeFile(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${BUILD_DATE}</lastmod></url>`).join('\n')}
</urlset>
`);
await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
await writeFile(join(OUT, '_redirects'), `# Netlify / Cloudflare Pages redirects\n/ols/products   /   301\n/ols/products/  /   301\n/ols/*          /   301\n/404            /   301\nhttp://dougjenkinsforpresident.com/*      https://dougjenkinsforpresident.com/:splat  301!\nhttp://www.dougjenkinsforpresident.com/*  https://dougjenkinsforpresident.com/:splat  301!\nhttps://www.dougjenkinsforpresident.com/* https://dougjenkinsforpresident.com/:splat  301!\n`);
await writeFile(join(OUT, 'site.webmanifest'), JSON.stringify({
  name: site.name, short_name: site.shortName, start_url: '/', display: 'standalone',
  background_color: '#ffffff', theme_color: '#1b3a8c',
  icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2));

console.log(`Built ${pages.length} pages + 404 → ${OUT}`);
