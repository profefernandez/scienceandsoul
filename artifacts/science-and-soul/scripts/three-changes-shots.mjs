import { chromium } from "playwright-core";
import { execSync } from "child_process";

const exe = execSync("which chromium").toString().trim();
const base = "http://localhost:23173/";
const browser = await chromium.launch({ executablePath: exe });

async function page(width, height, dark) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const p = await ctx.newPage();
  await p.goto(base, { waitUntil: "networkidle" });
  if (dark) await p.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
  await p.evaluate(() => { document.querySelectorAll(".fi").forEach(el => { el.style.opacity = "1"; el.style.animation = "none"; }); });
  await p.waitForTimeout(600);
  return { ctx, p };
}

async function shotSection(name, sel, width, dark, pad = 40) {
  const { ctx, p } = await page(width, 900, dark);
  const el = p.locator(sel);
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const box = await el.boundingBox();
  const scrollY = await p.evaluate(() => window.scrollY);
  const vp = p.viewportSize();
  await p.screenshot({ path: `screens/${name}.png`, clip: {
    x: 0, y: Math.max(0, box.y + scrollY - pad),
    width: vp.width, height: Math.min(box.height + pad * 2, 4000)
  }, fullPage: true });
  await ctx.close();
  console.log("done", name);
}

// Methods/Approach step row
await shotSection("approach-desktop-light", "#approach", 1280, false);
await shotSection("approach-desktop-dark", "#approach", 1280, true);
await shotSection("approach-mobile-light", "#approach", 375, false);
await shotSection("approach-mobile-dark", "#approach", 375, true);
// Methods untouched check
await shotSection("methods-desktop-light", "#methods", 1280, false);

// Bottom of page at 375 showing widget clearance
for (const [name, dark] of [["bottom-375-light", false], ["bottom-375-dark", true]]) {
  const { ctx, p } = await page(375, 812, dark);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: `screens/${name}.png` });
  await ctx.close();
  console.log("done", name);
}
// 320px width bottom
{
  const { ctx, p } = await page(320, 700, false);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: "screens/bottom-320-light.png" });
  await ctx.close();
  console.log("done bottom-320");
}

// Logo launcher: idle, focus, cover vs contain, light + dark
for (const dark of [false, true]) {
  const sfx = dark ? "dark" : "light";
  const { ctx, p } = await page(1280, 800, dark);
  await p.evaluate(() => window.scrollTo(0, 800));
  await p.waitForTimeout(600);
  const btn = p.locator(".orbbtn");
  await btn.waitFor();
  await p.screenshot({ path: `screens/launcher-cover-idle-${sfx}.png`, clip: { x: 1280 - 140, y: 800 - 140, width: 140, height: 140 } });
  await p.keyboard.press("Tab");
  await p.evaluate(() => document.querySelector(".orbbtn").focus());
  // force focus-visible via keyboard: blur then tab to it
  await p.evaluate(() => {
    const b = document.querySelector(".orbbtn");
    b.blur();
  });
  await p.keyboard.press("Shift+Tab");
  // simplest: apply focus-visible styles manually for the shot
  await p.addStyleTag({ content: ".orbbtn{outline:3px solid var(--teal);outline-offset:3px}" });
  await p.screenshot({ path: `screens/launcher-cover-focus-${sfx}.png`, clip: { x: 1280 - 140, y: 800 - 140, width: 140, height: 140 } });
  await p.addStyleTag({ content: ".orbbtn{outline:none}.orbbtn-logo{object-fit:contain;padding:7px;box-sizing:border-box}" });
  await p.screenshot({ path: `screens/launcher-contain-idle-${sfx}.png`, clip: { x: 1280 - 140, y: 800 - 140, width: 140, height: 140 } });
  await ctx.close();
  console.log("done launcher", sfx);
}
await browser.close();
