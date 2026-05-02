// script.js
// Run: node script.js

import { readFileSync } from "fs";
import { createClient } from "@sanity/client";

// ─── Load .env manually ───────────────────────────────────────────────────────
const env = readFileSync(".env", "utf-8");
env.split("\n").forEach(line => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
});

const client = createClient({
  projectId: "q25rp2ae",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
});

const COLLECTION_ID = "914eac2d-bf7a-446c-b3fd-432ad7462939";

// ─── All HexaLam products from the catalogue ─────────────────────────────────

const products = [
  // WT — Solid Whites & Cream
  { name: "Salt White",        designCode: "HL WT-01", finish: "Acrylic" },
  { name: "Absolute White",    designCode: "HL WT-02", finish: "Acrylic" },
  { name: "Milky White",       designCode: "HL WT-03", finish: "Acrylic" },
  { name: "White Forest",      designCode: "HL WT-04", finish: "Acrylic" },
  { name: "Cream",             designCode: "HL WT-05", finish: "Acrylic" },
  { name: "Pure White",        designCode: "HL WT-06", finish: "Acrylic" },

  // GY — Greys
  { name: "Pebble Grey",       designCode: "HL GY-01", finish: "Acrylic" },
  { name: "Ash Grey",          designCode: "HL GY-02", finish: "Acrylic" },
  { name: "Ceramic Grey",      designCode: "HL GY-03", finish: "Acrylic" },
  { name: "Dark Grey",         designCode: "HL GY-04", finish: "Acrylic" },
  { name: "Smoke Grey",        designCode: "HL GY-05", finish: "Acrylic" },
  { name: "Ashwood Grey",      designCode: "HL GY-06", finish: "Acrylic" },

  // GR — Greens
  { name: "Light Green",       designCode: "HL GR-01", finish: "Acrylic" },
  { name: "Ceramic Green",     designCode: "HL GR-02", finish: "Acrylic" },
  { name: "Sage Green",        designCode: "HL GR-03", finish: "Acrylic" },
  { name: "Sea Green",         designCode: "HL GR-04", finish: "Acrylic" },
  { name: "Light Sea Green",   designCode: "HL GR-05", finish: "Acrylic" },
  { name: "Spearmint Green",   designCode: "HL GR-06", finish: "Acrylic" },
  { name: "Olive Green",       designCode: "HL GR-07", finish: "Acrylic" },
  { name: "Grey Green",        designCode: "HL GR-08", finish: "Acrylic" },
  { name: "Turquoise Green",   designCode: "HL GR-09", finish: "Acrylic" },
  { name: "Mint Green",        designCode: "HL GR-10", finish: "Acrylic" },
  { name: "Chiffon Green",     designCode: "HL GR-11", finish: "Acrylic" },
  { name: "Dark Green Hue",    designCode: "HL GR-12", finish: "Acrylic" },

  // BR — Browns + Black
  { name: "Pale Brown",        designCode: "HL BR-01", finish: "Acrylic" },
  { name: "Light Brown",       designCode: "HL BR-02", finish: "Acrylic" },
  { name: "Blonde Brown",      designCode: "HL BR-03", finish: "Acrylic" },
  { name: "Sand Brown",        designCode: "HL BR-04", finish: "Acrylic" },
  { name: "Mocha Brown",       designCode: "HL BR-05", finish: "Acrylic" },
  { name: "Khaki Brown",       designCode: "HL BR-06", finish: "Acrylic" },
  { name: "Dark Brown",        designCode: "HL BR-07", finish: "Acrylic" },
  { name: "Grey Brown",        designCode: "HL BR-08", finish: "Acrylic" },
  { name: "Black",             designCode: "HL BK-01", finish: "Acrylic" },

  // BL — Blues
  { name: "Baroque Blue",      designCode: "HL BL-01", finish: "Acrylic" },
  { name: "Twilight Blue",     designCode: "HL BL-02", finish: "Acrylic" },
  { name: "Navy Blue",         designCode: "HL BL-03", finish: "Acrylic" },

  // PK — Pinks, Red + Gold
  { name: "Dusty Pink",        designCode: "HL PK-01", finish: "Acrylic" },
  { name: "Dark Cherry Pink",  designCode: "HL PK-02", finish: "Acrylic" },
  { name: "Peach Pink",        designCode: "HL PK-03", finish: "Acrylic" },
  { name: "Rose Hue Pink",     designCode: "HL PK-04", finish: "Acrylic" },
  { name: "Cherry Red",        designCode: "HL PK-05", finish: "Acrylic" },
  { name: "Golden Yellow",     designCode: "HL GL-01", finish: "Acrylic" },

  // SH — Shimmer
  { name: "Milky White",       designCode: "HL SH-01", finish: "Shimmer" },
  { name: "Ivory White",       designCode: "HL SH-02", finish: "Shimmer" },
  { name: "Ivory",             designCode: "HL SH-03", finish: "Shimmer" },
  { name: "Brown",             designCode: "HL SH-04", finish: "Shimmer" },
  { name: "Beige Brown",       designCode: "HL SH-05", finish: "Shimmer" },
  { name: "Bronze Brown",      designCode: "HL SH-06", finish: "Shimmer" },
  { name: "Golden",            designCode: "HL SH-07", finish: "Shimmer" },
  { name: "Golden Brown",      designCode: "HL SH-08", finish: "Shimmer" },
  { name: "Silver",            designCode: "HL SH-09", finish: "Shimmer" },
  { name: "Dark Grey",         designCode: "HL SH-10", finish: "Shimmer" },
  { name: "Grey",              designCode: "HL SH-11", finish: "Shimmer" },
  { name: "Green",             designCode: "HL SH-12", finish: "Shimmer" },

  // MT — Metallic
  { name: "Rose Gold",         designCode: "HL MT-01", finish: "Metallic" },
  { name: "Copper",            designCode: "HL MT-02", finish: "Metallic" },
  { name: "Golden",            designCode: "HL MT-03", finish: "Metallic" },
  { name: "Sky Blue",          designCode: "HL MT-04", finish: "Metallic" },
  { name: "Dark Grey",         designCode: "HL MT-05", finish: "Metallic" },
  { name: "Dark Ash Grey",     designCode: "HL MT-06", finish: "Metallic" },

  // MB — Marble
  { name: "Black & White Marble", designCode: "HL MB-01", finish: "Marble" },
  { name: "Satvario",             designCode: "HL MB-02", finish: "Marble" },
  { name: "Natural Stone",        designCode: "HL MB-03", finish: "Marble" },
  { name: "White Golden",         designCode: "HL MB-04", finish: "Marble" },
];

// ─── Slug helper ─────────────────────────────────────────────────────────────

function toSlug(name, code) {
  return `${name}-${code}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Import ──────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n🚀 Starting import of ${products.length} products...\n`);

  let success = 0;
  let failed = 0;

  for (const p of products) {
    const doc = {
      _type: "product",
      name: p.name,
      slug: {
        _type: "slug",
        current: toSlug(p.name, p.designCode),
      },
      designCode: p.designCode,
      finish: p.finish,
      collection: {
        _type: "reference",
        _ref: COLLECTION_ID,
      },
      images: [],
    };

    try {
      const result = await client.create(doc);
      console.log(`✅ ${p.designCode} — ${p.name} (${result._id})`);
      success++;
    } catch (err) {
      console.error(`❌ ${p.designCode} — ${p.name}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────`);
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed:  ${failed}`);
  console.log(`Total:      ${products.length}`);
  console.log(`─────────────────────────────\n`);
}

run();