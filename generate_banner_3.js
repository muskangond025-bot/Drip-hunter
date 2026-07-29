const fs = require('fs');
const path = require('path');
const { Jimp, rgbaToInt, intToRGBA } = require('jimp');

async function run() {
  try {
    const sourcePath = path.join(__dirname, 'public', 'images', 'deal_banner_3.png');
    const backupPath = path.join(__dirname, 'public', 'images', 'deal_banner_3_backup.png');
    
    // Backup original image
    fs.copyFileSync(sourcePath, backupPath);
    console.log(`Backed up original banner to ${backupPath}`);
    
    const img = await Jimp.read(sourcePath);
    console.log(`Loaded source image: ${img.width}x${img.height}`);
    
    // Read left edge colors
    const cTopLeft = img.getPixelColor(2, 2);
    const cBotLeft = img.getPixelColor(2, img.height - 3);
    
    const r1 = intToRGBA(cTopLeft);
    const r2 = intToRGBA(cBotLeft);
    console.log('Top Left Color (RGBA):', r1);
    console.log('Bot Left Color (RGBA):', r2);
    
    // Create a 1200x600 canvas
    const canvasWidth = 1200;
    const canvasHeight = 600;
    const canvas = new Jimp({ width: canvasWidth, height: canvasHeight });
    
    // Fill canvas with vertical gradient from top-left to bot-left color
    for (let y = 0; y < canvasHeight; y++) {
      const ratio = y / canvasHeight;
      const r = Math.round(r1.r + (r2.r - r1.r) * ratio);
      const g = Math.round(r1.g + (r2.g - r1.g) * ratio);
      const b = Math.round(r1.b + (r2.b - r1.b) * ratio);
      const a = Math.round(r1.a + (r2.a - r1.a) * ratio);
      
      const pixelColor = rgbaToInt(r, g, b, a);
      for (let x = 0; x < canvasWidth; x++) {
        canvas.setPixelColor(pixelColor, x, y);
      }
    }
    
    // Resize square image to 600x600
    console.log('Resizing square image to 600x600');
    img.resize({ w: 600, h: 600 });
    
    // Draw the resized image on the right side of the canvas
    const xOffset = 600;
    canvas.composite(img, xOffset, 0);
    
    // Overwrite the original banner
    await canvas.write(sourcePath);
    console.log(`Generated widescreen banner 3 successfully saved to ${sourcePath}`);
    
  } catch (err) {
    console.error('Error generating banner 3:', err);
  }
}

run();
