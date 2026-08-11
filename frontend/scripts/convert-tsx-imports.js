const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const appDir = path.join(root, 'app');
const patterns = ['.tsx', '.ts'];

function updateImports(text) {
  return text
    .replace(/from\s+['\"](\.\/.+?)\.tsx['\"]/g, 'from "$1.jsx"')
    .replace(/from\s+['\"](\.\/.+?)\.ts['\"]/g, 'from "$1.js"')
    .replace(/from\s+['\"](\.{2}\/.*?\/page)\.tsx['\"]/g, 'from "$1.jsx"')
    .replace(/from\s+['\"](\.{2}\/.*?\/page)\.ts['\"]/g, 'from "$1.js"')
    .replace(/import\s+\{([^}]+)\}\s+from\s+['\"](\.\/.+?)['\"]/g, (m, imports, file) => {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) return m;
      return m;
    });
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(path.join(dir, entry.name));
    } else if (patterns.some(ext => entry.name.endsWith(ext)) || entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      const filePath = path.join(dir, entry.name);
      let text = fs.readFileSync(filePath, 'utf8');
      const updated = updateImports(text);
      if (updated !== text) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log('Updated imports:', path.relative(root, filePath));
      }
    }
  }
}

walk(srcDir);
walk(appDir);
console.log('Import update run complete.');
