// Kompres foto galeri: resize maks 1600px + JPEG quality 80 (mozjpeg).
// Nama & ekstensi file tetap (.JPG) → tidak perlu ubah import di kode.
// Foto asli sudah di-backup di _original_fotogaleri/ (gitignored).
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const DIR = "src/assets/fotogaleri";
const MAX_WIDTH = 1600;
const QUALITY = 80;

const files = readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f));
let totalBefore = 0;
let totalAfter = 0;

console.log(`Mengompres ${files.length} foto...\n`);

for (const file of files) {
  const path = join(DIR, file);
  const before = statSync(path).size;

  // Baca ke memori dulu agar sharp tidak mengunci file (cegah file-lock Windows)
  const input = readFileSync(path);

  // .rotate() tanpa argumen = auto-rotate sesuai EXIF (cegah foto miring)
  const buf = await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  writeFileSync(path, buf);
  const after = buf.length;
  totalBefore += before;
  totalAfter += after;

  const pct = (100 - (after / before) * 100).toFixed(0);
  console.log(
    `${file.padEnd(28)} ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024).toFixed(0).padStart(4)} KB  (-${pct}%)`
  );
}

console.log(
  `\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(totalAfter / 1024 / 1024).toFixed(1)} MB  (hemat ${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`
);
