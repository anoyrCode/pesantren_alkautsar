/**
 * Membuat public/og-image.png — gambar pratinjau saat tautan situs dibagikan
 * di WhatsApp, Facebook, atau X.
 *
 *   npm run gen:og
 *
 * Ukurannya 1200×630 (rasio 1,91:1) mengikuti anjuran Open Graph. Isi
 * pentingnya sengaja ditaruh di kiri-tengah: sebagian aplikasi memangkas
 * gambar jadi lebih persegi, dan bagian itu yang paling aman.
 *
 * Susunannya meniru hero beranda supaya orang yang mengeklik tautannya
 * mendarat di halaman yang terasa sama: hamparan krem, foto gedung berwarna
 * yang dipudarkan ke kiri, logo dan nama di atasnya.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LEBAR = 1200;
const TINGGI = 630;

const KREM  = "#F6F2EA";
const NAVY  = "#1a2d47";
const AMBER = "#D48C1A";

/**
 * Foto dipasang menutup separuh kanan. Penyesuaian warnanya disamakan dengan
 * yang dipakai hero: sedikit diturunkan kejenuhannya dan dinaikkan
 * kecerahannya, supaya tidak berebut perhatian dengan tulisan di sebelahnya.
 */
const foto = await sharp(join(ROOT, "src/assets/konten/gedung.webp"))
  .resize(760, TINGGI, { fit: "cover", position: "centre" })
  .modulate({ saturation: 0.88, brightness: 1.05 })
  .png()
  .toBuffer();

/**
 * Pudaran mendatar. Titiknya banyak dengan alasan yang sama seperti di hero:
 * dengan tiga atau empat titik, perpindahannya terbaca mata sebagai sapuan
 * bergaris alih-alih pudar alami.
 */
const pudar = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${LEBAR}" height="${TINGGI}">
  <defs>
    <linearGradient id="p" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${KREM}" stop-opacity="1"/>
      <stop offset="34%"  stop-color="${KREM}" stop-opacity="1"/>
      <stop offset="45%"  stop-color="${KREM}" stop-opacity="0.985"/>
      <stop offset="54%"  stop-color="${KREM}" stop-opacity="0.93"/>
      <stop offset="62%"  stop-color="${KREM}" stop-opacity="0.82"/>
      <stop offset="70%"  stop-color="${KREM}" stop-opacity="0.64"/>
      <stop offset="79%"  stop-color="${KREM}" stop-opacity="0.42"/>
      <stop offset="89%"  stop-color="${KREM}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${KREM}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${LEBAR}" height="${TINGGI}" fill="url(#p)"/>
</svg>`);

/**
 * Gilda Display — huruf judul di situs — hanya dimuat dari Google Fonts saat
 * peramban membukanya, jadi tidak tersedia di sini. Georgia dipakai sebagai
 * gantinya: sama-sama serif transisional, jadi kesannya berdekatan.
 */
const teks = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${LEBAR}" height="${TINGGI}">
  <text x="76" y="266" font-family="Segoe UI, Arial, sans-serif" font-size="21"
        font-weight="600" letter-spacing="7.5" fill="${NAVY}" fill-opacity="0.55">PESANTREN</text>

  <text x="72" y="368" font-family="Georgia, Times New Roman, serif" font-size="94"
        fill="${NAVY}">Al Kautsar</text>

  <rect x="76" y="404" width="58" height="3" rx="1.5" fill="${AMBER}"/>

  <text x="76" y="450" font-family="Segoe UI, Arial, sans-serif" font-size="23"
        fill="${NAVY}" fill-opacity="0.62">Sukodono, Sidoarjo · Ahlussunnah wal Jama'ah</text>

  <text x="76" y="487" font-family="Segoe UI, Arial, sans-serif" font-size="23"
        fill="${NAVY}" fill-opacity="0.62">Kemenag &amp; Kemendikdasmen · Kepesantrenan 6 Tahun</text>

  <text x="76" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="19"
        font-weight="600" letter-spacing="1.5" fill="${NAVY}" fill-opacity="0.4">pesantrenalkautsar.id</text>
</svg>`);

const logo = await sharp(join(ROOT, "src/assets/logoPolos.png"))
  .resize(null, 104, { fit: "contain" })
  .png()
  .toBuffer();

await sharp({
  create: { width: LEBAR, height: TINGGI, channels: 4, background: KREM },
})
  .composite([
    { input: foto,  left: LEBAR - 760, top: 0 },
    { input: pudar, left: 0, top: 0 },
    { input: logo,  left: 72, top: 68 },
    { input: teks,  left: 0, top: 0 },
  ])
  // Tanpa dua pilihan ini berkasnya sekitar 650 KB. WhatsApp kerap melewatkan
  // gambar pratinjau yang berat, jadi pratinjaunya balik jadi teks polos.
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(join(ROOT, "public/og-image.png"));

const { size } = await stat(join(ROOT, "public/og-image.png"));
console.log(`og-image.png  ${LEBAR}x${TINGGI}  ${(size / 1024).toFixed(0)} KB`);
