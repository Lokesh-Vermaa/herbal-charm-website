/**
 * Image Optimization Script — BSR Green Gold
 * Compresses and converts images to WebP format for faster page loading.
 * Original images are kept as .jpg/.png fallbacks.
 * Run: node optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat, rename } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "src", "assets");

// Configuration per image: max width, quality, format
const IMAGE_CONFIG = {
  // Hero background — large but is heavily darkened, reduce resolution
  "hero-bg.jpg": { width: 1280, quality: 70, format: "webp" },

  // Product main image — most important visible image
  "product-main.jpg": { width: 900, quality: 82, format: "webp" },

  // Logo — small icon, keep small
  "product-logo.jpeg": { width: 96, quality: 85, format: "webp" },

  // Gallery images — medium resolution
  "product-gallery-1.jpg": { width: 800, quality: 80, format: "webp" },
  "product-gallery-2.jpg": { width: 800, quality: 80, format: "webp" },
  "product-gallery-3.jpg": { width: 800, quality: 80, format: "webp" },

  // Thumbnails — keep very small
  "product-gallery-1-thumb.jpg": { width: 200, quality: 75, format: "webp" },
  "product-gallery-2-thumb.jpg": { width: 200, quality: 75, format: "webp" },
  "product-gallery-3-thumb.jpg": { width: 200, quality: 75, format: "webp" },

  // Nutrients chart (PNG) — keep as PNG but compress
  "nutrients-chart.png": { width: 800, quality: 85, format: "webp" },

  // Product jar
  "product-jar.png": { width: 600, quality: 82, format: "webp" },
};

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeImage(filename, config) {
  const inputPath = join(ASSETS_DIR, filename);
  const baseName = basename(filename, extname(filename));
  const outputFilename = `${baseName}.webp`;
  const outputPath = join(ASSETS_DIR, outputFilename);

  try {
    const beforeStat = await stat(inputPath);
    const beforeSize = beforeStat.size;

    await sharp(inputPath)
      .resize(config.width, null, {
        withoutEnlargement: true, // never upscale
        fit: "inside",
      })
      .webp({ quality: config.quality, effort: 6 })
      .toFile(outputPath);

    const afterStat = await stat(outputPath);
    const afterSize = afterStat.size;
    const saving = Math.round((1 - afterSize / beforeSize) * 100);

    console.log(
      `✅ ${filename.padEnd(38)} ${formatSize(beforeSize).padStart(9)} → ${formatSize(afterSize).padStart(9)}   (-${saving}%)  → ${outputFilename}`,
    );

    return { filename, outputFilename, beforeSize, afterSize };
  } catch (err) {
    console.error(`❌ Failed to process ${filename}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("🌿 BSR Green Gold — Image Optimization\n");
  console.log("=".repeat(85));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const [filename, config] of Object.entries(IMAGE_CONFIG)) {
    const result = await optimizeImage(filename, config);
    if (result) {
      totalBefore += result.beforeSize;
      totalAfter += result.afterSize;
    }
  }

  console.log("=".repeat(85));
  console.log(
    `\n📦 Total before: ${formatSize(totalBefore)}   →   After: ${formatSize(totalAfter)}   (-${Math.round((1 - totalAfter / totalBefore) * 100)}% saved)`,
  );
  console.log(
    "\n✨ Done! WebP files created. Now update image imports in index.tsx to use .webp files.\n",
  );
}

main().catch(console.error);
