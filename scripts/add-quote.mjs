#!/usr/bin/env node
/**
 * Add a new quote to src/data/quotes.json
 *
 * Usage:
 *   node scripts/add-quote.mjs \
 *     --text "Your quote here" \
 *     --author "Author Name" \
 *     --author-slug "author-name" \
 *     --categories "wisdom,motivation" \
 *     [--translation "Vietnamese translation"] \
 *     [--source "Book title"] \
 *     [--language "en|vi"] \
 *     [--featured]
 *
 * Example:
 *   node scripts/add-quote.mjs \
 *     --text "The only way to do great work is to love what you do." \
 *     --author "Steve Jobs" \
 *     --author-slug "steve-jobs" \
 *     --categories "motivation,success" \
 *     --translation "Cách duy nhất để làm việc tuyệt vời là yêu những gì bạn làm." \
 *     --featured
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

// --- Parse args ---
const args = process.argv.slice(2);
function getArg(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
}
function hasFlag(name) {
  return args.includes(`--${name}`);
}

const text       = getArg("text");
const author     = getArg("author");
const authorSlug = getArg("author-slug");
const categories = getArg("categories");
const translation = getArg("translation");
const source     = getArg("source");
const language   = getArg("language") ?? "en";
const featured   = hasFlag("featured");

// --- Validate ---
const missing = [];
if (!text)       missing.push("--text");
if (!author)     missing.push("--author");
if (!authorSlug) missing.push("--author-slug");
if (!categories) missing.push("--categories");

if (missing.length) {
  console.error("Missing required arguments:", missing.join(", "));
  process.exit(1);
}

const catList = categories.split(",").map(c => c.trim());
const invalid = catList.filter(c => !VALID_CATEGORIES.includes(c));
if (invalid.length) {
  console.error(`Invalid categories: ${invalid.join(", ")}`);
  console.error(`Valid: ${VALID_CATEGORIES.join(", ")}`);
  process.exit(1);
}

// --- Generate ID ---
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const data = JSON.parse(readFileSync(QUOTES_PATH, "utf8"));
const existing = data.quotes;

// Find next index for this author
const prefix = `${authorSlug}-${slugify(catList[0])}`;
const samePrefix = existing.filter(q => q.id.startsWith(prefix));
const nextNum = String(samePrefix.length + 1).padStart(3, "0");
const id = `${prefix}-${nextNum}`;

// Check for duplicate text
const duplicate = existing.find(q => q.text.trim() === text.trim());
if (duplicate) {
  console.error(`Duplicate quote already exists with id: ${duplicate.id}`);
  process.exit(1);
}

// --- Build new quote ---
const newQuote = { id, text, author, authorSlug, language, categories: catList };
if (translation) newQuote.translation = translation;
if (source)      newQuote.source = source;
if (featured)    newQuote.featured = true;

// --- Append and save ---
data.quotes.push(newQuote);
writeFileSync(QUOTES_PATH, JSON.stringify(data, null, 2) + "\n");

console.log(`✓ Added quote [${id}]`);
console.log(`  Total quotes: ${data.quotes.length}`);
console.log();
console.log(JSON.stringify(newQuote, null, 2));
