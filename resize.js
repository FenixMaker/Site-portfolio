import Jimp from 'jimp';

async function resizeCursor() {
  try {
    const image = await Jimp.read('/public/cursor.png');
    await image.resize(48, Jimp.AUTO);
    await image.writeAsync('/public/cursor.png');
    console.log('Cursor resized successfully');
  } catch (error) {
    console.error('Error resizing cursor:', error);
  }
}

resizeCursor();
