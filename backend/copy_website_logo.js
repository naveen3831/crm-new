const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/Lenovo/.gemini/antigravity-ide/brain/2817511c-fad8-4ad7-abfb-1346fbf107bf/media__1785908307778.jpg';
const destJpg = 'c:/Users/Lenovo/OneDrive/Desktop/CRM/frontend/public/logo.jpg';
const destPng = 'c:/Users/Lenovo/OneDrive/Desktop/CRM/frontend/public/logo.png';

try {
  fs.copyFileSync(srcPath, destJpg);
  fs.copyFileSync(srcPath, destPng);
  console.log('[SUCCESS] Logo updated successfully in frontend/public!');
} catch (err) {
  console.error('[ERROR]', err);
}
