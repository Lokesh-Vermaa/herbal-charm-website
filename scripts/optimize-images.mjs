import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.resolve("src/assets");

const jobs = [
  { file: "product-logo.jpeg", width: 128, quality: 82 },
  { file: "hero-bg.jpg", width: 1600, quality: 78 },
  { file: "product-main.jpg", width: 800, quality: 80 },
  { file: "product-gallery-1.jpg", width: 900, quality: 80, thumbWidth: 320 },
  { file: "product-gallery-2.jpg", width: 900, quality: 80, thumbWidth: 320 },
  { file: "product-gallery-3.jpg", width: 900, quality: 80, thumbWidth: 320 },
];

async function optimize({ file, width, quality, thumbWidth }) {
  const input = path.join(assetsDir, file);
  const output = path.join(assetsDir, `.opt-${file}`);

  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(output);

  await unlink(input).catch(() => {});
  const { rename } = await import("node:fs/promises");
  await rename(output, input);

  if (thumbWidth) {
    const thumbName = file.replace(/\.jpg$/i, "-thumb.jpg");
    const thumbPath = path.join(assetsDir, thumbName);
    await sharp(input)
      .resize({ width: thumbWidth, withoutEnlargement: true })
      .jpeg({ quality: 75, mozjpeg: true, progressive: true })
      .toFile(thumbPath);
  }

  const s = await stat(input);
  console.log(`✓ ${file} → ${Math.round(s.size / 1024)} KB`);
}

console.log("Optimizing images...\n");
for (const job of jobs) {
  await optimize(job);
}

const files = await readdir(assetsDir);
for (const f of files.filter((n) => n.endsWith("-thumb.jpg"))) {
  const s = await stat(path.join(assetsDir, f));
  console.log(`✓ ${f} → ${Math.round(s.size / 1024)} KB`);
}

console.log("\nDone.");
