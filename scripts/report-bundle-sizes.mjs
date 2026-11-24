import { readdir, stat, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { join, relative } from 'node:path';

const root = 'dist/assets';

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(path));
    else if (/\.(?:js|mjs)$/i.test(entry.name)) files.push(path);
  }
  return files;
}

let files;
try {
  files = await collect(root);
} catch {
  console.error('Bundle report unavailable: dist/assets was not found. Run the production build first.');
  process.exitCode = 1;
}

if (files?.length) {
  const rows = await Promise.all(files.map(async path => {
    const [info, { readFile }] = await Promise.all([
      stat(path),
      import('node:fs/promises'),
    ]);
    const bytes = await readFile(path);
    return {
      path: relative('dist', path).replaceAll('\\\\', '/'),
      raw: info.size,
      gzip: gzipSync(bytes, { level: 9 }).byteLength,
    };
  }));
  rows.sort((a, b) => b.raw - a.raw);
  const kb = value => (value / 1024).toFixed(1) + ' KB';
  console.log('Production JavaScript bundle sizes (gzip is a local estimate):');
  console.log('Asset'.padEnd(54) + 'Raw'.padStart(12) + 'Gzip'.padStart(12));
  for (const row of rows) {
    const marker = row.raw >= 500 * 1024 ? '  <-- over 500 KB' : '';
    console.log(row.path.padEnd(54) + kb(row.raw).padStart(12) + kb(row.gzip).padStart(12) + marker);
  }
  const totalRaw = rows.reduce((sum, row) => sum + row.raw, 0);
  const totalGzip = rows.reduce((sum, row) => sum + row.gzip, 0);
  console.log('\nTotal emitted JS: ' + kb(totalRaw) + ' raw / ' + kb(totalGzip) + ' gzip estimate');
  console.log('Note: this reports emitted file sizes, not a dependency treemap or per-route network waterfall.');
}

try {
  const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
  const byKey = new Map(Object.entries(manifest));
  const entry = [...byKey].find(([, value]) => value.isEntry && /main\.(?:tsx|ts)$/.test(value.src || '')) || [...byKey].find(([, value]) => value.isEntry);
  const closure = keys => {
    const visited = new Set();
    const assets = new Set();
    function visit(key) {
      if (visited.has(key)) return;
      visited.add(key);
      const value = byKey.get(key);
      if (!value) return;
      if (/\.m?js$/.test(value.file)) assets.add(value.file);
      for (const child of value.imports || []) visit(child);
    }
    keys.forEach(visit);
    return [...assets];
  };
  if (!entry) throw new Error('No manifest entry');
  const report = async (name, keys) => {
    const assets = closure(keys);
    const bytes = await Promise.all(assets.map(file => readFile(join('dist', file))));
    console.log(name + ': ' + (bytes.reduce((n,b) => n + b.length,0)/1024).toFixed(1) + ' KB raw / ' + (bytes.reduce((n,b) => n + gzipSync(b,{level:9}).length,0)/1024).toFixed(1) + ' KB gzip; ' + assets.length + ' JS assets');
  };
  console.log('\nStatic dependency closure (excludes runtime dynamic imports unless explicitly included):');
  await report('Application shell', [entry[0]]);
  for (const page of ['Home','ArticlePage','ToolPage','FrameTimeAnalyzerPage','ProductReviewPage','GalleryPage']) {
    const match = [...byKey].find(([key,value]) => (value.src || key).endsWith('/'+page+'.tsx'));
    if (match) await report(page + ' + shell', [entry[0],match[0]]);
  }
} catch (error) {
  console.error('Manifest dependency report failed: ' + error.message);
  process.exitCode = 1;
}
