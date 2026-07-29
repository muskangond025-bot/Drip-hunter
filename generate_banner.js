const fs = require('fs');
const path = require('path');
const { Jimp, rgbaToInt, intToRGBA } = require('jimp');

async function run() {
  try {
    const sourcePath = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\adf01b84-20b4-4b37-8ac6-8e01ffef5953\\media__1785305975007.png';
    const img = await Jimp.read(sourcePath);
    console.log(`Loaded source image: ${img.width}x${img.height}`);
    
    // Get colors at various points along the left edge to find the best background fill
    const cTopLeft = img.getPixelColor(2, 2);
    const cMidLeft = img.getPixelColor(2, Math.floor(img.height / 2));
    const cBotLeft = img.getPixelColor(2, img.height - 3);
    
    console.log('Top Left Color (RGBA):', intToRGBA(cTopLeft));
    console.log('Mid Left Color (RGBA):', intToRGBA(cMidLeft));
    console.log('Bot Left Color (RGBA):', intToRGBA(cBotLeft));
    
    // Create a 1200x600 canvas
    const canvasWidth = 1200;
    const canvasHeight = 600;
    const canvas = new Jimp({ width: canvasWidth, height: canvasHeight });
    
    // Fill the canvas with a vertical gradient from top-left color to bottom-left color
    const r1 = intToRGBA(cTopLeft);
    const r2 = intToRGBA(cBotLeft);
    
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
    
    // Scale the mockup to height 600
    // new width = 600 * (515 / 388) = 796.39
    const newHeight = 600;
    const newWidth = Math.round(newHeight * (img.width / img.height));
    console.log(`Resizing mockup image to ${newWidth}x${newHeight}`);
    img.resize({ w: newWidth, h: newHeight });
    
    // Draw the resized mockup image onto the right side of the canvas
    const xOffset = canvasWidth - newWidth; // 1200 - 796 = 404
    canvas.composite(img, xOffset, 0);
    
    // Save the generated image
    const outputPath = path.join(__dirname, 'public', 'images', 'deal_banner_2.png');
    await canvas.write(outputPath);
    console.log(`Generated banner successfully saved to ${outputPath}`);
    
  } catch (err) {
    console.error('Error generating banner:', err);
  }
}

run();
