const fs = require("fs");
const path = require("path");

// Simple script to create test thumbnails
// You'll need to install 'sharp' package: npm install sharp

try {
  const sharp = require("sharp");

  async function createThumbnails() {
    const inputDir = "./public/mainPhotos"; // Put your test images here
    const outputDir = "./public/uploads/spots/thumbnails";

    if (!fs.existsSync(inputDir)) {
      console.log(
        'Please create a "test-images" folder and put your photos there'
      );
      return;
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs
      .readdirSync(inputDir)
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    console.log(`Found ${files.length} images to resize...`);

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputName = `thumb_${file.replace(/\.[^/.]+$/, "")}.jpg`;
      const outputPath = path.join(outputDir, outputName);

      try {
        await sharp(inputPath)
          .resize(40, 40, {
            fit: "cover", // Crop to fill 40x40 square
            position: "center",
          })
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        console.log(`✓ Created: ${outputName}`);
      } catch (err) {
        console.log(`✗ Failed: ${file} - ${err.message}`);
      }
    }

    console.log("Done! Thumbnails created in public/uploads/spots/thumbnails/");
  }

  createThumbnails();
} catch (error) {
  console.log("\nTo use this script:");
  console.log("1. npm install sharp");
  console.log('2. Create "test-images" folder in project root');
  console.log('3. Put your test photos in "test-images" folder');
  console.log("4. Run: node scripts/create-thumbnails.js\n");
}
