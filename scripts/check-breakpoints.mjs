import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['src', 'scripts'];
const TARGET_EXTENSIONS = new Set(['.astro', '.css', '.js', '.ts', '.mjs', '.cjs']);
const IGNORE_LITERAL_WIDTH_QUERY_FILES = new Set([
  'src/styles/foundation/custom-media.css',
]);
const WIDTH_QUERY_PATTERN = /\((min|max)-width:\s*\d+px\)/g;

async function collectFiles(dirPath, out = []) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await collectFiles(fullPath, out);
      continue;
    }
    if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(fullPath);
    }
  }
  return out;
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function toPosixPath(targetPath) {
  return targetPath.split(path.sep).join('/');
}

async function main() {
  const files = [];
  for (const scanDir of SCAN_DIRS) {
    await collectFiles(path.join(ROOT_DIR, scanDir), files);
  }
  const violations = [];

  for (const filePath of files) {
    const relativePath = toPosixPath(path.relative(ROOT_DIR, filePath));
    if (IGNORE_LITERAL_WIDTH_QUERY_FILES.has(relativePath)) continue;

    const body = await readFile(filePath, 'utf8');
    WIDTH_QUERY_PATTERN.lastIndex = 0;
    let match;
    while ((match = WIDTH_QUERY_PATTERN.exec(body)) !== null) {
      violations.push({
        path: relativePath,
        line: lineOf(body, match.index),
        query: match[0],
      });
    }
  }

  if (violations.length > 0) {
    console.error('Literal breakpoint media queries are not allowed. Use custom media names.');
    for (const item of violations) {
      console.error(`- ${item.path}:${item.line} ${item.query}`);
    }
    process.exit(1);
  }

  console.log('Breakpoint check passed (custom media only).');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
