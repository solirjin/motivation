#!/usr/bin/env node
/**
 * Crawl new quotes from ZenQuotes API and append to quotes.json.
 * Runs automatically every 2 days via GitHub Actions.
 *
 * Manual run: node scripts/crawl-quotes.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const QUOTES_PATH = resolve(__dir, "../src/data/quotes.json");

const VALID_CATEGORIES = [
  "success", "life", "perseverance", "happiness",
  "wisdom", "motivation", "love", "courage",
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Simple keyword-based category inference */
function inferCategory(text) {
  const t = text.toLowerCase();
  if (/\blove\b|heart|compassion|romance/.test(t))           return "love";
  if (/happy|happiness|joy|smile|delight/.test(t))           return "happiness";
  if (/wisdom|knowledge|learn|educati|truth|mind/.test(t))   return "wisdom";
  if (/success|achieve|goal|win|great|excellence/.test(t))   return "success";
  if (/courage|brave|fear|strength|bold/.test(t))            return "courage";
  if (/life|living|death|exist|time|moment/.test(t))         return "life";
  if (/persist|never give|keep going|try again|endure/.test(t)) return "perseverance";
  return "motivation";
}

// ── Fetch from ZenQuotes ─────────────────────────────────────────────────────

async function fetchBatch() {
  // ZenQuotes returns 50 random quotes per call, no auth required
  const res = await fetch("https://zenquotes.io/api/quotes", {
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) throw new Error(`ZenQuotes API returned ${res.status}`);
  return await res.json(); // [{ q: "text", a: "Author" }, ...]
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const data = JSON.parse(readFileSync(QUOTES_PATH, "utf8"));
  const existing = data.quotes;

  // Build dedup set of normalised texts
  const seen = new Set(existing.map((q) => normalize(q.text)));

  console.log(`Existing quotes: ${existing.length}`);
  console.log("Fetching from ZenQuotes API…");

  let raw;
  try {
    raw = await fetchBatch();
  } catch (err) {
    console.error("Fetch failed:", err.message);
    process.exit(1);
  }

  console.log(`Received: ${raw.length} quotes`);

  let added = 0;
  for (const item of raw) {
    const text   = item.q?.trim();
    const author = item.a?.trim();

    // Skip bad entries
    if (!text || !author) continue;
    if (text.includes("Too many requests")) continue;
    if (normalize(text).length < 25) continue;     // too short
    if (normalize(text).length > 600) continue;    // too long
    if (seen.has(normalize(text))) continue;        // duplicate

    const authorSlug = slugify(author);
    const category   = inferCategory(text);

    // Generate unique id
    const prefix     = `${authorSlug}-${category}`;
    const count      = existing.filter((q) => q.id.startsWith(prefix)).length;
    const id         = `${prefix}-${String(count + added + 1).padStart(3, "0")}`;

    existing.push({ id, text, author, authorSlug, language: "en", categories: [category] });
    seen.add(normalize(text));
    added++;
    console.log(`  + [${id}] "${text.slice(0, 60)}…"`);
  }

  if (added === 0) {
    console.log("No new quotes found.");
    // Exit 0 but signal "nothing changed" via env for CI
    if (process.env.GITHUB_OUTPUT) {
      const { appendFileSync } = await import("fs");
      appendFileSync(process.env.GITHUB_OUTPUT, "changed=false\n");
    }
    return;
  }

  data.quotes = existing;
  writeFileSync(QUOTES_PATH, JSON.stringify(data, null, 2) + "\n");
  console.log(`\nAdded ${added} new quotes. Total: ${existing.length}`);

  if (process.env.GITHUB_OUTPUT) {
    const { appendFileSync } = await import("fs");
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=true\nadded=${added}\n`);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
