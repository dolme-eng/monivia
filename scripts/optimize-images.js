const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const imagesToOptimize = [
  {
    input: path.join(publicDir, 'android-chrome-512x512.png'),
    output: path.join(publicDir, 'android-chrome-512x512.optimized.png'),
    width: 512,
    height: 512,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'og-default.png'),
    output: path.join(publicDir, 'og-default.optimized.png'),
    width: 1200,
    height: 630,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'android-chrome-192x192.png'),
    output: path.join(publicDir, 'android-chrome-192x192.optimized.png'),
    width: 192,
    height: 192,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'apple-touch-icon.png'),
    output: path.join(publicDir, 'apple-touch-icon.optimized.png'),
    width: 180,
    height: 180,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'og-default.png'),
    output: path.join(publicDir, 'og-default.webp'),
    width: 1200,
    height: 630,
    quality: 85,
  },
  // Assets folder images - convert to WebP for better compression
  {
    input: path.join(publicDir, 'assets/about_hero_1.png'),
    output: path.join(publicDir, 'assets/about_hero_1.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/about_hero_2.png'),
    output: path.join(publicDir, 'assets/about_hero_2.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/business_bg.png'),
    output: path.join(publicDir, 'assets/business_bg.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/consultation.png'),
    output: path.join(publicDir, 'assets/consultation.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/hero_lifestyle.png'),
    output: path.join(publicDir, 'assets/hero_lifestyle.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/hero_lifestyle_new.png'),
    output: path.join(publicDir, 'assets/hero_lifestyle_new.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/premium_hero.png'),
    output: path.join(publicDir, 'assets/premium_hero.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/pro_bg.png'),
    output: path.join(publicDir, 'assets/pro_bg.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/stats_bg.png'),
    output: path.join(publicDir, 'assets/stats_bg.webp'),
    width: null,
    height: null,
    quality: 85,
  },
  {
    input: path.join(publicDir, 'assets/why_choose_us.png'),
    output: path.join(publicDir, 'assets/why_choose_us.webp'),
    width: null,
    height: null,
    quality: 85,
  },
];

async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');

  for (const image of imagesToOptimize) {
    try {
      if (!fs.existsSync(image.input)) {
        console.log(`⚠️  File not found: ${image.input}`);
        continue;
      }

      const originalSize = fs.statSync(image.input).size;
      console.log(`📸 Processing: ${path.basename(image.input)}`);
      console.log(`   Original size: ${(originalSize / 1024).toFixed(2)} KB`);

      let sharpInstance = sharp(image.input);
      
      // Resize only if dimensions are specified
      if (image.width && image.height) {
        sharpInstance = sharpInstance.resize(image.width, image.height, { fit: 'cover' });
      }
      
      // Use WebP for assets, PNG for favicons
      if (image.output.endsWith('.webp')) {
        await sharpInstance.webp({ quality: image.quality }).toFile(image.output);
      } else {
        await sharpInstance.png({ quality: image.quality, compressionLevel: 9 }).toFile(image.output);
      }

      const newSize = fs.statSync(image.output).size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      
      console.log(`   ✅ Optimized size: ${(newSize / 1024).toFixed(2)} KB`);
      console.log(`   💾 Savings: ${savings}%\n`);

      // For WebP files, keep both PNG and WebP
      if (image.output.endsWith('.webp')) {
        console.log(`   📝 Keeping both PNG and WebP versions\n`);
      } else {
        // Replace original with optimized
        fs.unlinkSync(image.input);
        fs.renameSync(image.output, image.input);
        console.log(`   🔄 Replaced original file\n`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${image.input}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!');
}

optimizeImages();
