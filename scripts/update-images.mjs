import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const desktop = "C:\\Users\\ADMIN\\OneDrive\\Desktop";
const assetsDir = path.resolve("src/assets");

const jobs = [
  { source: "1.jpeg", target: "product-main.webp", width: 800, quality: 80 },
  { source: "2.jpeg", target: "product-gallery-1.webp", width: 900, quality: 80, thumb: "product-gallery-1-thumb.webp", thumbWidth: 320 },
  { source: "3.jpeg", target: "product-gallery-2.webp", width: 900, quality: 80, thumb: "product-gallery-2-thumb.webp", thumbWidth: 320 },
  { source: "4.jpeg", target: "product-gallery-3.webp", width: 900, quality: 80, thumb: "product-gallery-3-thumb.webp", thumbWidth: 320 },
];

async function optimizeImages() {
  console.log("Starting image optimization...");
  for (const job of jobs) {
    const inputPath = path.join(desktop, job.source);
    
    try {
        await fs.access(inputPath);
    } catch (e) {
        console.error(`Missing input file: ${inputPath}`);
        continue;
    }

    const outputPath = path.join(assetsDir, job.target);
    
    await sharp(inputPath)
      .rotate()
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(outputPath);
      
    console.log(`✓ Created ${job.target}`);

    if (job.thumb) {
      const thumbPath = path.join(assetsDir, job.thumb);
      await sharp(inputPath)
        .rotate()
        .resize({ width: job.thumbWidth, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(thumbPath);
      console.log(`✓ Created ${job.thumb}`);
    }
  }
  console.log("Done optimizing images.");
}

optimizeImages();
