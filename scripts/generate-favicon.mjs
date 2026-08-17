/**
 * Membuat berkas favicon dari logo pesantren.
 *
 *   node scripts/generate-favicon.mjs
 *
 * Sumbernya logoPolos.png (lambang perisai tanpa teks). Logo bertulisan tidak
 * bisa dipakai: bentuknya memanjang, dan hurufnya tidak akan terbaca di 48px.
 *
 * Dijalankan manual, tidak masuk `npm run build` — hasilnya ikut ter-commit
 * supaya build di CI tidak bergantung pada sharp.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SUMBER = join(ROOT, "src/assets/logoPolos.png");
const PUBLIC = join(ROOT, "public");

/**
 * Logo dipasang di kanvas persegi. `contain` menjaga rasio perisai — tanpa itu
 * lambangnya melar jadi gemuk. Sisa 4% jadi ruang napas supaya tidak menempel
 * ke tepi lingkaran yang digambar Google di sekeliling favicon.
 */
async function persegi(ukuran, latar) {
  const isi = Math.round(ukuran * 0.92);
  const logo = await sharp(SUMBER)
    .resize(isi, isi, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Ditempel ke kanvas yang dibuat sendiri, bukan lewat extend + flatten.
  // sharp menjalankan flatten SEBELUM extend apa pun urutan penulisannya, jadi
  // bagian bening di sekeliling perisai lolos dan ikon iOS jadi berbingkai
  // hitam. Cara ini tidak bergantung pada urutan internal itu.
  return sharp({ create: { width: ukuran, height: ukuran, channels: 4, background: latar } })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

const BENING = { r: 0, g: 0, b: 0, alpha: 0 };
const PUTIH  = { r: 255, g: 255, b: 255, alpha: 1 };

/**
 * Menyusun berkas .ico dari beberapa PNG.
 *
 * sharp tidak bisa menulis .ico, tapi formatnya sederhana: satu header, satu
 * baris keterangan per ukuran, lalu data gambarnya. Sejak Windows Vista data
 * itu boleh berupa PNG apa adanya — dan semua peramban yang masih relevan
 * membacanya. Jadi tidak perlu dependency tambahan.
 */
function rakitIco(gambar) {
  const HEADER = 6;
  const ENTRI = 16;
  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // cadangan, selalu 0
  header.writeUInt16LE(1, 2); // 1 = ikon
  header.writeUInt16LE(gambar.length, 4);

  let offset = HEADER + ENTRI * gambar.length;
  const entri = gambar.map(({ ukuran, data }) => {
    const e = Buffer.alloc(ENTRI);
    e.writeUInt8(ukuran >= 256 ? 0 : ukuran, 0); // 0 berarti 256
    e.writeUInt8(ukuran >= 256 ? 0 : ukuran, 1);
    e.writeUInt8(0, 2);  // jumlah warna palet — 0 untuk truecolor
    e.writeUInt8(0, 3);  // cadangan
    e.writeUInt16LE(1, 4);   // bidang warna
    e.writeUInt16LE(32, 6);  // bit per piksel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...entri, ...gambar.map((g) => g.data)]);
}

const UKURAN_ICO = [16, 32, 48];

const berkas = [
  // Google lebih suka kelipatan 48px dan memakai yang terbesar yang tersedia.
  ["favicon-96x96.png",   96,  BENING],
  ["favicon-192x192.png", 192, BENING],
  // iOS meratakan transparansi jadi hitam, jadi yang ini wajib berlatar solid.
  ["apple-touch-icon.png", 180, PUTIH],
];

const ico = await Promise.all(
  UKURAN_ICO.map(async (ukuran) => ({ ukuran, data: await persegi(ukuran, BENING) })),
);
await writeFile(join(PUBLIC, "favicon.ico"), rakitIco(ico));
console.log(`favicon.ico          ${UKURAN_ICO.join(", ")} px`);

for (const [nama, ukuran, latar] of berkas) {
  await writeFile(join(PUBLIC, nama), await persegi(ukuran, latar));
  console.log(`${nama.padEnd(20)} ${ukuran} px`);
}
