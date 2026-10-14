import { readdir, stat } from 'node:fs/promises';
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
