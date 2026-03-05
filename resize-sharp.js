import sharp from 'sharp';

async function resizeCursor() {
  try {
    await sharp('./public/cursor.png')
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile('./public/cursor-resized.png');
    console.log('Cursor resized successfully');
  } catch (error) {
    console.error('Error resizing cursor:', error);
  }
}

resizeCursor();
