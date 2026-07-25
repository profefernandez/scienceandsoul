#!/usr/bin/env node
/**
 * Repeatable accessibility audit for Science & Soul Counseling.
 *
 * Runs axe-core (WCAG 2.1 A/AA/AAA + best practices) against every route,
 * in light and dark themes, at desktop / tablet / mobile viewports.
 *
 * Usage:  node scripts/a11y-audit.mjs [baseUrl]
 *   baseUrl defaults to http://localhost:80/
 */
import { chromium } from "playwright-core";
import { AxeBuilder } from "@axe-core/playwright";
import { execSync } from "node:child_process";

const baseUrl = (process.argv[2] || "http://localhost:80/").replace(/\/$/, "");

const allViewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

const routes = (process.env.ROUTES || "/,/privacy,/hipaa,/accessibility").split(",");
const viewports = allViewports.filter((v) =>
  (process.env.VIEWPORTS || "desktop,tablet,mobile").split(",").includes(v.name),
);
const themes = (process.env.THEMES || "light,dark").split(",");

const tags = [
  "wcag2a",
  "wcag2aa",
  "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "wcag21aaa",
  "best-practice",
];

function chromiumPath() {
  try {
    return execSync("which chromium").toString().trim();
  } catch {
    throw new Error("chromium not found on PATH");
  }
}

const browser = await chromium.launch({
  executablePath: chromiumPath(),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let totalViolations = 0;
const summary = {};

for (const route of routes) {
  for (const vp of viewports) {
    for (const theme of themes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme === "dark" ? "dark" : "light",
      });
      const page = await context.newPage();
      await page.addInitScript((t) => {
        try {
          localStorage.setItem("theme", t);
        } catch { }
      }, theme);
      await page.goto(baseUrl + route, { waitUntil: "load", timeout: 30000 });
      await page.waitForSelector("main", { timeout: 15000 });
      await page.waitForTimeout(700);

      const results = await new AxeBuilder({ page })
        .withTags(tags)
        // Dev-only Vite overlay, not shipped to production.
        .exclude("vite-error-overlay")
        .analyze();

      const key = `${route} [${vp.name}/${theme}]`;
      console.log(`scanned ${key}: ${results.violations.length} violation group(s)`);
      if (results.violations.length > 0) {
        totalViolations += results.violations.length;
        summary[key] = results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
          nodeCount: v.nodes.length,
        }));
      }
      await context.close();
    }
  }
}

await browser.close();

if (totalViolations === 0) {
  console.log("PASS — no axe-core violations (WCAG 2.1 A/AA/AAA + best-practice) across all routes, viewports, and themes.");
} else {
  console.log(`FAIL — ${totalViolations} violation group(s) found:\n`);
  console.log(JSON.stringify(summary, null, 2));
  process.exitCode = 1;
}
