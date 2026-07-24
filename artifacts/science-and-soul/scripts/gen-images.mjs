#!/usr/bin/env node
/**
 * Generates responsive WebP variants (480/768/1024w) for site imagery.
 * Also downloads remote S3-hosted illustrations into public/img/ so the
 * site serves everything locally with srcset support.
 *
 * Usage: node scripts/gen-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const out = path.join(pub, "img");
await mkdir(out, { recursive: true });

const remote = {
  "services-individual": "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/e4bd94ce-72e8-490a-9d84-147dae6c3020.png",
  "sound-healing": "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/7cd4a7d9-e8ec-4f7a-88ed-74fc2d48b0f3.png",
  "kelly-portrait": "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/db7664bf-57c6-41fe-b725-868539c597b3.png",
  "services-group": "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/1d80a0ab-3752-4880-bc0a-df1780b022eb.png",
};

const local = {
  hero: path.join(pub, "hero-illustration.png"),
  philosophy: path.join(pub, "philosophy-illustration.png"),
  methods: path.join(pub, "methods-illustration.png"),
  goodfaith: path.join(pub, "goodfaith-illustration.png"),
};

const widths = [480, 768, 1024];

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

const sources = {};

for (const [name, url] of Object.entries(remote)) {
  const dest = path.join(out, `${name}.png`);
  if (!(await exists(dest))) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${name}.png`);
  }
  sources[name] = dest;
}
Object.assign(sources, local);

for (const [name, src] of Object.entries(sources)) {
  const meta = await sharp(src).metadata();
  for (const w of widths) {
    if (w > meta.width) continue;
    const dest = path.join(out, `${name}-${w}.webp`);
    if (await exists(dest)) continue;
    await sharp(src).resize(w).webp({ quality: 82 }).toFile(dest);
    console.log(`wrote ${path.basename(dest)}`);
  }
  // Full-size webp fallback at native width
  const full = path.join(out, `${name}-${meta.width}.webp`);
  if (!(await exists(full))) {
    await sharp(src).webp({ quality: 82 }).toFile(full);
    console.log(`wrote ${path.basename(full)} (native)`);
  }
}
console.log("done");
