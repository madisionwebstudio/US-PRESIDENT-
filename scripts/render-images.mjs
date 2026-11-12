// Renders social-sharing (Open Graph) images and app icons with Playwright.
// Usage: node scripts/render-images.mjs   (then run the build)
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
@font-face{font-family:S;src:url('${asset('fonts/source-serif-4-latin-opsz-normal.woff2')}') format('woff2');font-weight:200 900}
@font-face{font-family:SI;src:url('${asset('fonts/source-serif-4-latin-opsz-italic.woff2')}') format('woff2');font-weight:200 900;font-style:italic}
@font-face{font-family:P;src:url('${asset('fonts/public-sans-latin-wght-normal.woff2')}') format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:radial-gradient(900px 500px at 85% 10%,rgba(23,74,133,.6),transparent 60%),#101D35;color:#fff;font-family:P;position:relative}
.ros{position:absolute;width:900px;height:900px;right:-300px;top:-135px;opacity:.15;background:url('${pathToFileURL(join(ROOT, 'src/assets/img/guilloche.svg')).href}') center/contain no-repeat}
.wrap{position:absolute;inset:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
.wm{display:flex;align-items:stretch;gap:16px;line-height:1}
.wm .a{font-size:14px;font-weight:700;letter-spacing:.42em;color:#C5A15B;text-transform:uppercase}
.wm .b{font-family:S;font-weight:600;font-size:34px;letter-spacing:.08em;text-transform:uppercase;margin-top:4px}
.wm .r{width:1px;background:rgba(197,161,91,.6)}
.wm .y{font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#b7c1d3;width:7em;line-height:1.35;align-self:center}
.k{font-size:18px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C5A15B;display:flex;align-items:center;gap:16px;margin-bottom:22px}
.k:before{content:'';width:40px;height:1px;background:#C5A15B}
h1{font-family:S;font-weight:600;font-size:76px;line-height:1.02;letter-spacing:-.02em;max-width:820px}
h1.long{font-size:60px}
.foot{display:flex;justify-content:space-between;align-items:center;font-size:18px;color:#b7c1d3;letter-spacing:.04em}
.foot b{color:#fff;font-weight:600}
.tag{font-family:SI;font-style:italic;font-size:30px;color:#dcc28c}
.ph{position:absolute;right:72px;top:150px;width:330px;height:330px}
.ph:before{content:'';position:absolute;inset:0;transform:translate(16px,16px);border:1px solid #C5A15B}
.ph img{position:relative;width:100%;height:100%;object-fit:cover;box-shadow:0 30px 60px -20px rgba(0,0,0,.6)}
`;

const card = ({ kicker, title, photo = false, tagline = true }) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="ros"></div>
${photo ? `<div class="ph"><img src="${asset('img/doug-jenkins-portrait.jpg')}"></div>` : ''}
<div class="wrap">
  <div class="wm"><div><div class="a">Doug</div><div class="b">Jenkins</div></div><div class="r"></div><div class="y">President 2028</div></div>
  <div style="${photo ? 'max-width:640px' : ''}"><div class="k">${kicker}</div><h1 class="${title.length > 34 ? 'long' : ''}">${title}</h1></div>
  <div class="foot"><span class="tag">${tagline ? 'End the Nonsense.' : ''}</span><span><b>dougjenkinsforpresident.com</b></span></div>
</div></body></html>`;

const icon = (size) => `<!doctype html><html><head><style>${css}
body{width:${size}px;height:${size}px;background:#101D35;display:grid;place-items:center}
.r{width:${size * 0.86}px;height:${size * 0.86}px;border:${Math.max(1, size / 64)}px solid #C5A15B;border-radius:50%;display:grid;place-items:center}
.t{font-family:S;font-weight:600;font-size:${size * 0.4}px;letter-spacing:-.02em;color:#fff;line-height:1;margin-top:-${size * 0.02}px}
</style></head><body><div class="r"><div class="t">DJ</div></div></body></html>`;

const jobs = [
  { out: 'src/assets/og/home.png', html: card({ kicker: 'Independent Write-In Candidate', title: 'Doug Jenkins for President 2028', photo: true }) },
  { out: 'src/assets/og/about.png', html: card({ kicker: 'About Doug', title: 'Vietnam veteran. Business owner. Candidate for President.', photo: true }) },
  { out: 'src/assets/og/platform.png', html: card({ kicker: 'The Platform', title: 'Ten commitments for America' }) },
  { out: 'src/assets/og/contact.png', html: card({ kicker: 'Contact the campaign', title: 'Get in touch with Doug' }) },
  ...policies.map((p, i) => ({ out: `src/assets/og/${p.slug}.png`, html: card({ kicker: `Policy ${i + 1} of ${policies.length}`, title: p.fullTitle && p.fullTitle.length < 60 ? p.fullTitle : p.title }) })),
];
const icons = [
  { out: 'src/static/favicon-32.png', size: 32 },
  { out: 'src/static/apple-touch-icon.png', size: 180 },
  { out: 'src/assets/img/icon-192.png', size: 192 },
  { out: 'src/assets/img/icon-512.png', size: 512 },
];

await mkdir(join(ROOT, 'src/assets/og'), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const j of jobs) {
  await writeFile(TMP, j.html);
  await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(ROOT, j.out), type: 'png' });
  console.log('✓', j.out);
}
for (const ic of icons) {
  await page.setViewportSize({ width: ic.size, height: ic.size });
  await writeFile(TMP, icon(ic.size));
  await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(ROOT, ic.out), type: 'png', omitBackground: false });
  console.log('✓', ic.out);
}
await browser.close();
await rm(TMP, { force: true });
