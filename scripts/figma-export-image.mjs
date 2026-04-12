#!/usr/bin/env node
/**
 * Figma REST Images API でノードを PNG 書き出し（個人アクセストークン必須）
 * https://www.figma.com/developers/api#get-images-endpoint
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=figd_... node scripts/figma-export-image.mjs <fileKey> <nodeId> <outPath> [jpg|png|svg|pdf]
 *   nodeId は URL の 294-732 形式でも 294:732 形式でも可
 *
 * Example（佐藤講師・Figma 294:732）:
 *   FIGMA_ACCESS_TOKEN=... node scripts/figma-export-image.mjs mVJaZra8kGkMaIlwF14ZAs 294-732 public/images/instructor-sato.png
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function loadEnvFileToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return;
  const root = process.cwd();
  for (const name of ['.env.local', '.env']) {
    const p = path.join(root, name);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const m = trimmed.match(/^FIGMA_ACCESS_TOKEN\s*=\s*(.*)$/);
      if (m) {
        let v = m[1].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
          v = v.slice(1, -1);
        process.env.FIGMA_ACCESS_TOKEN = v;
        return;
      }
    }
  }
}
loadEnvFileToken();

const token = process.env.FIGMA_ACCESS_TOKEN;
const [, , fileKey, nodeIdRaw, outPath, formatRaw] = process.argv;
const format = ['jpg', 'jpeg', 'png', 'svg', 'pdf'].includes(
  String(formatRaw || 'png').toLowerCase(),
)
  ? String(formatRaw).toLowerCase() === 'jpeg'
    ? 'jpg'
    : String(formatRaw).toLowerCase()
  : 'png';

if (!fileKey || !nodeIdRaw || !outPath) {
  console.error(
    'Usage: FIGMA_ACCESS_TOKEN=... node scripts/figma-export-image.mjs <fileKey> <nodeId> <outPath> [jpg|png|svg|pdf]\n' +
      '  nodeId: e.g. 294-732 or 294:732',
  );
  process.exit(1);
}

if (!token) {
  console.error(
    'FIGMA_ACCESS_TOKEN が未設定です。\n' +
      '次のいずれかで指定してください:\n' +
      '  1) 環境変数: FIGMA_ACCESS_TOKEN=figd_... npm run figma:export:voice\n' +
      '  2) リポジトリ直下の .env.local または .env に一行: FIGMA_ACCESS_TOKEN=figd_...\n' +
      'Figma → Settings → Personal access tokens でトークンを発行できます。',
  );
  process.exit(1);
}

const nodeId = nodeIdRaw.replace(/-/g, ':');
const q = new URLSearchParams({
  ids: nodeId,
  format,
  scale: '2',
});
const metaUrl = `https://api.figma.com/v1/images/${fileKey}?${q}`;
const metaRes = await fetch(metaUrl, { headers: { 'X-Figma-Token': token } });
const metaText = await metaRes.text();
if (!metaRes.ok) {
  console.error('Figma images API error', metaRes.status, metaText);
  process.exit(1);
}
const meta = JSON.parse(metaText);
const imageUrl = meta.images?.[nodeId];
if (!imageUrl) {
  console.error('レスポンスに画像 URL がありません:', meta);
  process.exit(1);
}

const imgRes = await fetch(imageUrl);
if (!imgRes.ok) {
  console.error('画像ダウンロード失敗', imgRes.status);
  process.exit(1);
}
const buf = Buffer.from(await imgRes.arrayBuffer());
const dir = path.dirname(outPath);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(outPath, buf);
console.log('Wrote', outPath, `(${buf.length} bytes)`);

if (process.platform === 'darwin') {
  try {
    execSync(`sips -Z 1400 "${outPath}"`, { stdio: 'inherit' });
    console.log('Resized max dimension to 1400px (sips).');
  } catch {
    console.warn('sips によるリサイズをスキップしました。');
  }
}
