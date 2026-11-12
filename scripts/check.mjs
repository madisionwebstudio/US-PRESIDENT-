// Automated QA: node scripts/check.mjs [--shots dir]
// Starts a local server on public/, crawls every page at 390 / 768 / 1440 px and checks:
// horizontal overflow, broken images, broken internal links, one <h1>, heading order,
// unique <title>/<meta description>, canonical, JSON-LD validity, console errors, alt text.
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4199;
const BASE = `http://localhost:${PORT}`;
const shotsIdx = process.argv.indexOf('--shots');
const SHOTS = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null;

const server = spawn('node', [join(ROOT, 'scripts/serve.mjs'), String(PORT)], { stdio: 'pipe' });
await new Promise((r) => server.stdout.once('data', r));

const browser = await chromium.launch();
const problems = [];
const titles = new Map(), descs = new Map();
const queue = ['/'], seen = new Set(), linkTargets = new Set();

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`${page.url()}: ${m.text()}`); });
page.on('pageerror', (e) => consoleErrors.push(`${page.url()}: ${e.message}`));

// 1) Crawl
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await page.goto(BASE + path, { waitUntil: 'load' });
  if (!res || res.status() !== 200) { problems.push(`${path}: HTTP ${res?.status()}`); continue; }
  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    og: document.querySelector('meta[property="og:image"]')?.content,
    h1: document.querySelectorAll('h1').length,
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => +h.tagName[1]),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    placeholder: /lorem|ipsum|placeholder|TODO|TBD/i.test(document.body.innerText),
  }));
  if (info.h1 !== 1) problems.push(`${path}: ${info.h1} <h1> elements`);
  for (let i = 1; i < info.headings.length; i++) if (info.headings[i] - info.headings[i - 1] > 1) problems.push(`${path}: heading level skips h${info.headings[i - 1]}→h${info.headings[i]}`);
  if (!info.desc) problems.push(`${path}: missing meta description`);
  if (!info.canonical) problems.push(`${path}: missing canonical`);
  if (!info.og) problems.push(`${path}: missing og:image`);
  if (info.imgsNoAlt) problems.push(`${path}: ${info.imgsNoAlt} images without alt`);
  if (info.placeholder) problems.push(`${path}: placeholder-like text found`);
  for (const j of info.jsonld) { try { JSON.parse(j); } catch { problems.push(`${path}: invalid JSON-LD`); } }
  if (titles.has(info.title)) problems.push(`${path}: duplicate title with ${titles.get(info.title)}`); else titles.set(info.title, path);
  if (descs.has(info.desc)) problems.push(`${path}: duplicate description with ${descs.get(info.desc)}`); else descs.set(info.desc, path);
  if (info.og) linkTargets.add(new URL(info.og).pathname);
  for (const href of info.links) {
    if (/^(mailto:|tel:)/.test(href)) continue;
    if (/^https?:/.test(href)) { problems.push(`${path}: external link ${href}`); continue; }
    const u = new URL(href, BASE + path);
    linkTargets.add(u.pathname);
    if (u.hash) linkTargets.add(u.pathname + u.hash);
    if (u.pathname.endsWith('/') && !seen.has(u.pathname)) queue.push(u.pathname);
  }
}

// 2) Link targets + fragment targets
for (const t of linkTargets) {
  const [p, hash] = t.split('#');
  const r = await page.goto(BASE + p, { waitUntil: 'load' });
  if (!r || r.status() !== 200) problems.push(`broken link target ${t} (HTTP ${r?.status()})`);
  else if (hash && !(await page.$('#' + hash))) problems.push(`missing anchor ${t}`);
}

// 3) Viewport checks
const widths = [390, 768, 1440];
if (SHOTS) await mkdir(SHOTS, { recursive: true });
for (const w of widths) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const pg = await c.newPage();
  for (const path of seen) {
    await pg.goto(BASE + path, { waitUntil: 'load' });
    await pg.evaluate(async () => { await document.fonts.ready; });
    const r = await pg.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('body *')].filter((el) => {
        const b = el.getBoundingClientRect();
        return b.right > de.clientWidth + 1 && getComputedStyle(el).position !== 'fixed' && !el.closest('[aria-hidden="true"],.mega,.mobile-nav');
      }).map((el) => el.className || el.tagName).slice(0, 3);
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
      return { overflow: de.scrollWidth > de.clientWidth, wide, broken };
    });
    if (r.overflow) problems.push(`${path} @${w}px: horizontal overflow`);
    if (r.wide.length) problems.push(`${path} @${w}px: elements past viewport: ${r.wide.join(', ')}`);
    if (r.broken.length) problems.push(`${path} @${w}px: broken images ${r.broken.join(', ')}`);
    if (SHOTS) await pg.screenshot({ path: join(SHOTS, `${path.replace(/\//g, '_') || 'home'}-${w}.png`), fullPage: true });
  }
  // Mobile nav interaction
  if (w === 390) {
    await pg.goto(BASE + '/', { waitUntil: 'load' });
    await pg.click('[data-nav-toggle]');
    if (!(await pg.isVisible('[data-mobile-nav]'))) problems.push('mobile nav did not open');
    await pg.keyboard.press('Escape');
    if (await pg.isVisible('[data-mobile-nav]')) problems.push('mobile nav did not close on Escape');
    if (SHOTS) { await pg.click('[data-nav-toggle]'); await pg.screenshot({ path: join(SHOTS, 'mobile-menu-390.png') }); }
  }
  if (w === 1440) {
    await pg.goto(BASE + '/', { waitUntil: 'load' });
    await pg.hover('.has-mega > a');
    await pg.waitForTimeout(400);
    if (!(await pg.isVisible('.mega-list'))) problems.push('desktop mega menu did not open on hover');
    if (SHOTS) await pg.screenshot({ path: join(SHOTS, 'mega-menu-1440.png') });
    // keyboard: tab into nav
    await pg.goto(BASE + '/', { waitUntil: 'load' });
    await pg.keyboard.press('Tab');
    const skip = await pg.evaluate(() => document.activeElement.className);
    if (!skip.includes('skip-link')) problems.push('first Tab does not reach skip link');
  }
  await c.close();
}

// 4) Contact form validation
{
  const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await c.newPage();
  await pg.goto(BASE + '/contact/');
  await pg.click('form[data-mailto-form]:not([data-signup]) button[type=submit]');
  if (!(await pg.isVisible('#c-email-err'))) problems.push('contact form: no validation error shown for empty email');
  await c.close();
}

problems.push(...consoleErrors.map((e) => `console error: ${e}`));
await browser.close();
server.kill();

console.log(`Checked ${seen.size} pages × ${widths.length} widths, ${linkTargets.size} link targets.`);
if (problems.length) { console.log(`\n${problems.length} problem(s):\n- ` + problems.join('\n- ')); process.exit(1); }
console.log('All checks passed.');
