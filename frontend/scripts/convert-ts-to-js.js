const fs = require('fs');
const path = require('path');
const sucrase = require('sucrase');

const root = path.resolve(__dirname, '..');
const excludeDirs = new Set(['node_modules', '.next', '.next-dev', 'public', '.git', 'dist', 'out']);
const deleteFiles = ['tsconfig.json', 'next-env.d.ts'];

const isTsFile = (file) => file.endsWith('.ts') || file.endsWith('.tsx');
const getOutPath = (filePath) => {
  if (filePath.endsWith('.tsx')) return filePath.slice(0, -4) + '.jsx';
  if (filePath.endsWith('.ts')) return filePath.slice(0, -3) + '.js';
  return filePath;
};

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (excludeDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile() && isTsFile(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertFile(filePath) {
  const source = await fs.promises.readFile(filePath, 'utf8');
  const outputPath = getOutPath(filePath);
  const transformed = sucrase.transform(source, {
    transforms: ['typescript', 'jsx'],
    production: false,
    filePath,
  }).code;
  await fs.promises.writeFile(outputPath, transformed, 'utf8');
  if (outputPath !== filePath) {
    await fs.promises.unlink(filePath);
  }
  console.log(`Converted ${path.relative(root, filePath)} -> ${path.relative(root, outputPath)}`);
}

(async () => {
  try {
    const files = await walk(root);
    files.sort();
    for (const file of files) {
      await convertFile(file);
    }
    for (const fileName of deleteFiles) {
      const fullPath = path.join(root, fileName);
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
        console.log(`Removed ${fileName}`);
      }
    }
    console.log('TS/TSX to JS conversion complete.');
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
})();
