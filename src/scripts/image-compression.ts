import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get directory path using import.meta.url for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the images directory
const imagesDir = path.resolve(__dirname, '../../src/content/images');

// Supported image formats to convert
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.avif'];

async function convertToWebp() {
  try {
    console.log(`Scanning directory: ${imagesDir}`);

    // Read all files from the directory
    const files = fs.readdirSync(imagesDir);

    let convertedCount = 0;
    let skippedCount = 0;
    let deletedCount = 0;

    // Process each file
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const extension = path.extname(file).toLowerCase();
      const baseName = path.basename(file, extension);
      const webpPath = path.join(imagesDir, `${baseName}.webp`);

      // Skip if already WebP or not a supported format
      if (extension === '.webp' || !supportedExtensions.includes(extension)) {
        skippedCount++;
        continue;
      }

      // Skip if WebP version already exists
      if (fs.existsSync(webpPath)) {
        console.log(`WebP version already exists for ${file}, skipping.`);
        skippedCount++;
        continue;
      }

      // Convert to WebP
      console.log(`Converting ${file} to WebP...`);
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      convertedCount++;

      // Delete original file after successful conversion
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted original file: ${file}`);
        deletedCount++;
      } catch (deleteError) {
        console.error(`Error deleting ${file}:`, deleteError);
      }
    }

    console.log(`
    Conversion completed:
    - Converted: ${convertedCount}
    - Deleted: ${deletedCount}
    - Skipped: ${skippedCount}
    `);
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertToWebp();
