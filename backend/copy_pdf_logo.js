const fs = require('fs');
const path = require('path');

const srcPath = 'c:/Users/Lenovo/OneDrive/Desktop/CRM/frontend/public/watermark.png';
const destPdfLogo = 'c:/Users/Lenovo/OneDrive/Desktop/CRM/frontend/public/pdf-logo.png';

try {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPdfLogo);
    console.log('[SUCCESS] pdf-logo.png created from watermark.png!');
  }
} catch (err) {
  console.error('[ERROR]', err);
}
