const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');
const fs = require('fs');

try {
  const websiteLogoSource = 'C:/Users/Lenovo/.gemini/antigravity-ide/brain/2817511c-fad8-4ad7-abfb-1346fbf107bf/media__1785908307778.jpg';
  const pdfLogoSource = 'C:/Users/Lenovo/.gemini/antigravity-ide/brain/a741bec8-7cab-4498-ab41-44ded0543905/media__1785837081510.png';

  const destJpg = path.resolve(__dirname, './public/logo.jpg');
  const destPng = path.resolve(__dirname, './public/logo.png');
  const watermarkPath = path.resolve(__dirname, './public/watermark.png');
  const pdfLogoPath = path.resolve(__dirname, './public/pdf-logo.png');

  if (fs.existsSync(websiteLogoSource)) {
    fs.copyFileSync(websiteLogoSource, destJpg);
    fs.copyFileSync(websiteLogoSource, destPng);
  }
  if (fs.existsSync(pdfLogoSource)) {
    fs.copyFileSync(pdfLogoSource, watermarkPath);
    fs.copyFileSync(pdfLogoSource, pdfLogoPath);
  }
} catch (e) {
  console.warn('[Logo Sync Warning] Failed to auto-copy logo:', e.message || e);
}

module.exports = defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    'process.env.NEXT_PUBLIC_API_URL': JSON.stringify('http://localhost:5000/api/v1'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
