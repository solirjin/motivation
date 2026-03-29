#!/usr/bin/env node
// scripts/generate-icons.mjs
// Generates PNG icons from public/icons/icon.svg using sharp.
// Run in CI: npm install --no-save sharp && node scripts/generate-icons.mjs

import { readFileSync, mkdirSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const svg = readFileSync("public/icons/icon.svg");
mkdirSync("public/icons", { recursive: true });

const sizes = [
  { size: 512, name: "icon-512.png" },
  { size: 192, name: "icon-192.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 32,  name: "favicon-32.png" },
  { size: 16,  name: "favicon-16.png" },
];

for (const { size, name } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(`public/icons/${name}`);
  console.log(`✓ public/icons/${name} (${size}×${size})`);
}

console.log("\nIcon generation complete.");
