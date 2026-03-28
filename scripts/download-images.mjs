#!/usr/bin/env node
// scripts/download-images.mjs
// Downloads author thumbnails via Wikipedia REST API.

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const AUTHORS = [
  { slug: "albert-einstein",     title: "Albert_Einstein" },
  { slug: "steve-jobs",          title: "Steve_Jobs" },
  { slug: "nelson-mandela",      title: "Nelson_Mandela" },
  { slug: "ho-chi-minh",         title: "Ho_Chi_Minh" },
  { slug: "winston-churchill",   title: "Winston_Churchill" },
  { slug: "marie-curie",         title: "Marie_Curie" },
  { slug: "martin-luther-king",  title: "Martin_Luther_King_Jr." },
  { slug: "abraham-lincoln",     title: "Abraham_Lincoln" },
  { slug: "mark-twain",          title: "Mark_Twain" },
  { slug: "thomas-edison",       title: "Thomas_Edison" },
  { slug: "helen-keller",        title: "Helen_Keller" },
  { slug: "maya-angelou",        title: "Maya_Angelou" },
  { slug: "oprah-winfrey",       title: "Oprah_Winfrey" },
  { slug: "paulo-coelho",        title: "Paulo_Coelho" },
  { slug: "anne-frank",          title: "Anne_Frank" },
  { slug: "dalai-lama",          title: "Dalai_Lama" },
  { slug: "theodore-roosevelt",  title: "Theodore_Roosevelt" },
  { slug: "confucius",           title: "Confucius" },
  { slug: "socrates",            title: "Socrates" },
  { slug: "marcus-aurelius",     title: "Marcus_Aurelius" },
  { slug: "rumi",                title: "Rumi" },
  { slug: "nguyen-du",           title: "Nguyen_Du" },
  { slug: "ralph-waldo-emerson", title: "Ralph_Waldo_Emerson" },
  { slug: "oscar-wilde",         title: "Oscar_Wilde" },
  { slug: "pablo-picasso",       title: "Pablo_Picasso" },
  { slug: "henry-david-thoreau", title: "Henry_David_Thoreau" },
  { slug: "vincent-van-gogh",    title: "Vincent_van_Gogh" },
  { slug: "khalil-gibran",       title: "Khalil_Gibran" },
  { slug: "duc-phat",            title: "Gautama_Buddha" },
  { slug: "lao-tu",              title: "Laozi" },
  { slug: "aristotle",           title: "Aristotle" },
  { slug: "seneca",              title: "Seneca_the_Younger" },
  { slug: "albert-camus",        title: "Albert_Camus" },
  { slug: "plato",               title: "Plato" },
  { slug: "tran-hung-dao",       title: "Tran_Hung_Dao" },
  { slug: "nguyen-cong-tru",     title: "Nguyen_Cong_Tru" },
  { slug: "richard-branson",     title: "Richard_Branson" },
  { slug: "epictetus",           title: "Epictetus" },
];

const OUT_DIR = "public/authors";
mkdirSync(OUT_DIR, { recursive: true });

const UA = "MotivationApp/1.0 (https://github.com/solirjin/motivation)";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let success = 0;
let failed = 0;

for (const { slug, title } of AUTHORS) {
  try {
    // Step 1: get thumbnail URL from Wikipedia summary API
    const apiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { "User-Agent": UA, Accept: "application/json" } }
    );

    if (!apiRes.ok) {
      console.log(`✗ ${slug} — API ${apiRes.status}`);
      failed++;
      await delay(500);
      continue;
    }

    const data = await apiRes.json();
    // Prefer thumbnail (small, fast) over originalimage (huge, slow)
    const imgUrl = data?.thumbnail?.source;

    if (!imgUrl) {
      console.log(`✗ ${slug} — no thumbnail`);
      failed++;
      await delay(300);
      continue;
    }

    // Step 2: download the thumbnail image
    const imgRes = await fetch(imgUrl, { headers: { "User-Agent": UA } });

    if (!imgRes.ok) {
      console.log(`✗ ${slug} — img fetch ${imgRes.status}`);
      failed++;
      await delay(300);
      continue;
    }

    const buffer = Buffer.from(await imgRes.arrayBuffer());

    if (buffer.length < 1000) {
      console.log(`✗ ${slug} — suspiciously small (${buffer.length}B)`);
      failed++;
      await delay(300);
      continue;
    }

    writeFileSync(join(OUT_DIR, `${slug}.jpg`), buffer);
    console.log(`✓ ${slug} (${Math.round(buffer.length / 1024)}KB)`);
    success++;
  } catch (err) {
    console.log(`✗ ${slug} — ${err.message}`);
    failed++;
  }

  // Polite delay between requests to avoid rate limiting
  await delay(400);
}

console.log(`\nDone: ${success} succeeded, ${failed} failed`);
if (success === 0) process.exit(1);
