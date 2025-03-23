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

// Maximum width for images
const MAX_WIDTH = 1000;

async function convertToWebp() {
  try {
    console.log(`Scanning directory: ${imagesDir}`);

    // Read all files from the directory
    const files = fs.readdirSync(imagesDir);

    let convertedCount = 0;
    let skippedCount = 0;
    let deletedCount = 0;
    let resizedCount = 0;

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

      // Get image metadata
      const metadata = await sharp(filePath).metadata();
      const needsResize = metadata.width && metadata.width > MAX_WIDTH;

      // Convert to WebP with resizing if needed
      console.log(`Converting ${file} to WebP${needsResize ? ' with resize' : ''}...`);

      let sharpInstance = sharp(filePath);

      // Resize if width exceeds max width
      if (needsResize) {
        sharpInstance = sharpInstance.resize({
          width: MAX_WIDTH,
          fit: 'inside',
          withoutEnlargement: true
        });
        resizedCount++;
      }

      // Convert to WebP and save
      await sharpInstance
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
    - Resized: ${resizedCount}
    - Deleted: ${deletedCount}
    - Skipped: ${skippedCount}
    `);
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertToWebp();
