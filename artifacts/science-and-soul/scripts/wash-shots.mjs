import { chromium } from "playwright-core";
import { execSync } from "child_process";

const exe = execSync("which chromium").toString().trim();
const base = "http://localhost:23173/";
const browser = await chromium.launch({ executablePath: exe });

async function shot(name, { width = 1280, height = 800, dark = false, url = base, fullPage = true, heroWash = false, clip } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: dark ? "dark" : "light" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  if (dark) await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
  if (heroWash) await page.addStyleTag({ content: ".hero{background:transparent!important}" });
  await page.evaluate(() => { document.querySelectorAll(".fi").forEach(el => { el.style.opacity = "1"; el.style.animation = "none"; }); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `screens/${name}.png`, fullPage: clip ? false : fullPage, clip });
  await ctx.close();
  console.log("done", name);
}

await shot("full-light", {});
await shot("full-dark", { dark: true });
await shot("mobile-light", { width: 375, height: 812 });
await shot("legal-light", { url: base + "privacy" });
await shot("nf404-light", { url: base + "bogus-page" });
await shot("hero-masked", { fullPage: false });
await shot("hero-wash", { fullPage: false, heroWash: true });
await browser.close();
