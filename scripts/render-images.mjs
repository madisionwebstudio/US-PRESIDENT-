// Renders social-sharing (Open Graph) images and app icons with Playwright.
// Usage: npm run images
// Output: src/assets/og/*.png, src/assets/img/icon-*.png, src/static/*.png
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { policies } from '../src/content.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TMP = join(ROOT, 'scripts/.render-tmp.html');
const asset = (p) => pathToFileURL(join(ROOT, 'src/assets', p)).href;

const css = `
@font-face{font-family:A;src:url('${asset('fonts/archivo-latin-wdth-normal.woff2')}') format('woff2');font-weight:100 900;font-stretch:62% 125%}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#1b3a8c;color:#fff;font-family:A;position:relative}
.wrap{position:absolute;inset:60px 72px 0}
.name{font-size:30px;font-weight:900;font-stretch:118%;text-transform:uppercase;line-height:1}
.sub{margin-top:6px;font-size:16px;font-weight:800;font-stretch:110%;letter-spacing:.14em;text-transform:uppercase;color:#ff8a8f}
.k{display:inline-block;margin-top:96px;background:#c1272d;padding:8px 12px;font-size:18px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
h1{margin-top:20px;font-size:88px;font-weight:900;font-stretch:112%;line-height:.95;text-transform:uppercase;max-width:1000px}
h1.m{font-size:66px}
h1.s{font-size:52px}
.sw{position:absolute;left:0;right:0;bottom:62px;height:34px;fill:#c1272d}
.url{position:absolute;left:72px;bottom:18px;font-size:20px;font-weight:700;color:#dfe6f8}
.ph{position:absolute;right:72px;top:150px;width:340px;height:340px;border:10px solid #fff;box-shadow:0 24px 48px -16px rgba(0,0,0,.5)}
.ph img{width:100%;height:100%;object-fit:cover}
`;
const sw = '<svg class="sw" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0 30 C 300 6, 900 6, 1200 26 L 1200 48 C 900 26, 300 26, 0 54 Z"/></svg>';

const card = ({ kicker, title, photo = false }) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
${photo ? `<div class="ph"><img src="${asset('img/doug-jenkins-portrait.jpg')}"></div>` : ''}
<div class="wrap" style="${photo ? 'right:460px' : ''}">
  <div class="name">Doug Jenkins</div><div class="sub">For President 2028</div>
  <div class="k">${kicker}</div>
  <h1 class="${title.length > 40 ? 's' : title.length > 18 || photo ? 'm' : ''}">${title}</h1>
</div>
${sw}<div class="url">dougjenkinsforpresident.com</div>
</body></html>`;

const icon = (size) => `<!doctype html><html><head><style>${css}
body{width:${size}px;height:${size}px;display:grid;place-items:center;background:#1b3a8c}
.t{font-size:${size * 0.5}px;font-weight:900;font-stretch:115%;line-height:1;letter-spacing:-.02em}
.b{position:absolute;left:${size * 0.18}px;right:${size * 0.18}px;bottom:${size * 0.16}px;height:${Math.max(2, size * 0.07)}px;background:#c1272d;border-radius:99px}
</style></head><body><div class="t">DJ</div><div class="b"></div></body></html>`;

const jobs = [
  { out: 'src/assets/og/home.png', html: card({ kicker: 'Independent Write-In for President 2028', title: 'End the Nonsense.', photo: true }) },
  { out: 'src/assets/og/meet-doug.png', html: card({ kicker: 'Meet Doug', title: 'Vietnam War veteran. 24 years in the US Army.', photo: true }) },
  { out: 'src/assets/og/our-vision.png', html: card({ kicker: 'Independent Write-In for President 2028', title: 'Our Vision' }) },
  { out: 'src/assets/og/contact.png', html: card({ kicker: 'Connect with Doug', title: 'Get in Touch' }) },
  ...policies.map((p) => ({ out: `src/assets/og/${p.slug}.png`, html: card({ kicker: 'Our Vision', title: p.title }) })),
];
const icons = [
  { out: 'src/static/favicon-32.png', size: 32 },
  { out: 'src/static/apple-touch-icon.png', size: 180 },
  { out: 'src/assets/img/icon-192.png', size: 192 },
  { out: 'src/assets/img/icon-512.png', size: 512 },
];

await rm(join(ROOT, 'src/assets/og'), { recursive: true, force: true });
await mkdir(join(ROOT, 'src/assets/og'), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const render = async (html, out) => {
  await writeFile(TMP, html);
  await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(ROOT, out), type: 'png' });
  console.log('✓', out);
};
for (const j of jobs) await render(j.html, j.out);
for (const ic of icons) {
  await page.setViewportSize({ width: ic.size, height: ic.size });
  await render(icon(ic.size), ic.out);
}
await browser.close();
await rm(TMP, { force: true });
