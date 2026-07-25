import { chromium } from "playwright-core";
import { execSync } from "child_process";

const exe = execSync("which chromium").toString().trim();
const base = "http://localhost:23173/";
const browser = await chromium.launch({ executablePath: exe });

function lum([r, g, b]) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const parseRgb = (s) => s.match(/\d+(\.\d+)?/g).map(Number).slice(0, 3);

async function open(width, height, dark) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: "networkidle" });
  if (dark) await p.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
  await p.evaluate(() => { document.querySelectorAll(".fi").forEach(el => { el.style.opacity = "1"; el.style.animation = "none"; }); });
  await p.locator("#approach").scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  return { ctx, p };
}

// ---- 1. Contrast proof ----
for (const dark of [false, true]) {
  const sfx = dark ? "dark" : "light";
  const { ctx, p } = await open(1280, 900, dark);
  const cards = p.locator(".apprstep");
  const n = await cards.count();
  const colors = await p.evaluate(() => ({
    title: getComputedStyle(document.querySelector(".apprititle")).color,
    desc: getComputedStyle(document.querySelector(".appridesc")).color,
  }));
  // hide text so we can sample the true rendered card surface behind it
  await p.addStyleTag({ content: ".apprititle,.appridesc,.appricon,.apprstep-num{visibility:hidden}.orbroot,.a11y-root,[class*=a11y]{display:none!important}" });
  await p.waitForTimeout(200);
  let worst = { title: Infinity, desc: Infinity, card: -1 };
  for (let i = 0; i < n; i++) {
    const box = await cards.nth(i).boundingBox();
    const buf = await p.screenshot({ clip: { x: box.x + 4, y: box.y + 4, width: box.width - 8, height: box.height - 8 } });
    const dataUrl = "data:image/png;base64," + buf.toString("base64");
    const { minL, maxL } = await p.evaluate(async (src) => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const g = c.getContext("2d");
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      let minL = 1, maxL = 0;
      for (let j = 0; j < d.length; j += 4) {
        const L = 0.2126 * f(d[j]) + 0.7152 * f(d[j + 1]) + 0.0722 * f(d[j + 2]);
        if (L < minL) minL = L;
        if (L > maxL) maxL = L;
      }
      return { minL, maxL };
    }, dataUrl);
    for (const key of ["title", "desc"]) {
      const tl = lum(parseRgb(colors[key]));
      // worst-case pixel: the one closest in luminance to the text
      const c1 = contrast(tl, minL), c2 = contrast(tl, maxL);
      const w = Math.min(c1, c2);
      if (w < worst[key]) { worst[key] = w; worst.card = i; }
    }
  }
  console.log(`[${sfx}] title color ${colors.title} worst-pixel contrast: ${worst.title.toFixed(2)}:1`);
  console.log(`[${sfx}] desc  color ${colors.desc} worst-pixel contrast: ${worst.desc.toFixed(2)}:1`);
  await ctx.close();
}

// ---- 2. Title wrap check ----
for (const width of [769, 800, 900, 1024, 1100, 1280]) {
  const { ctx, p } = await open(width, 900, false);
  const info = await p.evaluate(() => {
    const els = [...document.querySelectorAll(".apprititle")];
    const t = els.find(e => e.textContent.includes("Add Spiritual Practices"));
    const cs = getComputedStyle(t);
    const lh = parseFloat(cs.lineHeight);
    const range = document.createRange();
    range.selectNodeContents(t);
    const h = range.getBoundingClientRect().height;
    return { lines: Math.round(h / lh), h, lh };
  });
  console.log(`width ${width}: "Add Spiritual Practices When Useful" = ${info.lines} line(s)`);
  await ctx.close();
}

// ---- 3. Screenshots desktop/tablet/mobile x themes ----
for (const dark of [false, true]) {
  const sfx = dark ? "dark" : "light";
  for (const [name, w] of [["desktop", 1280], ["tablet", 900], ["mobile", 375]]) {
    const { ctx, p } = await open(w, 900, dark);
    const box = await p.locator("#approach").boundingBox();
    const scrollY = await p.evaluate(() => window.scrollY);
    await p.screenshot({ path: `screens/process-${name}-${sfx}.png`, fullPage: true, clip: { x: 0, y: box.y + scrollY, width: w, height: Math.min(box.height, 3000) } });
    await ctx.close();
    console.log("shot", name, sfx);
  }
}
await browser.close();
