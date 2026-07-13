require("dotenv").config();
const fs     = require("fs");
const path   = require("path");
const sharp  = require("sharp");
const pool   = require("../db");
const supabase = require("../supabase");

const ASSET_DIR = path.join(__dirname, "..", "..", "src", "assets", "fotogaleri");
const BUCKET = "galeri";

const KATEGORI_LABEL = {
  pembelajaran: "Pembelajaran",
  fasilitas:    "Fasilitas",
  kajian:       "Kajian",
  kegiatan:     "Kegiatan",
};

const ITEMS = [
  ["discovery-task-1.JPG",       "Pembelajaran Discovery Task 1", "pembelajaran"],
  ["discovery-task-2.JPG",       "Pembelajaran Discovery Task 2", "pembelajaran"],
  ["discovery-task-3.JPG",       "Pembelajaran Discovery Task 3", "pembelajaran"],
  ["discovery-task-4.JPG",       "Pembelajaran Discovery Task 4", "pembelajaran"],
  ["kantin-1.JPG",               "Kantin Pesantren 1",            "fasilitas"],
  ["kantin-2.JPG",               "Kantin Pesantren 2",            "fasilitas"],
  ["lapangan-1.JPG",             "Lapangan Olahraga 1",           "fasilitas"],
  ["lapangan-2.JPG",             "Lapangan Olahraga 2",           "fasilitas"],
  ["kolam-renang-1.JPG",         "Kolam Renang 1",                "fasilitas"],
  ["kolam-renang-2.JPG",         "Kolam Renang 2",                "fasilitas"],
  ["kolam-renang-3.JPG",         "Kolam Renang 3",                "fasilitas"],
  ["basket.JPG",                 "Lapangan Basket",               "kegiatan"],
  ["futsal.JPG",                 "Lapangan Futsal",               "kegiatan"],
  ["dauroh-1.JPG",               "Kegiatan Dauroh 1",             "kajian"],
  ["dauroh-2.JPG",               "Kegiatan Dauroh 2",             "kajian"],
  ["dauroh-3.JPG",               "Kegiatan Dauroh 3",             "kajian"],
  ["ceramah-idul-adha.JPG",      "Ceramah Idul Adha",             "kajian"],
  ["ceramah-idul-adha-2.JPG",    "Ceramah Idul Adha 2",           "kajian"],
  ["penyembelihan-3.JPG",        "Penyembelihan Qurban 3",        "kegiatan"],
  ["penyembelihan-4.JPG",        "Penyembelihan Qurban 4",        "kegiatan"],
  ["penyembelihan-5.JPG",        "Penyembelihan Qurban 5",        "kegiatan"],
];

async function main() {
  // 1. Buat kategori (idempotent — skip kalau sudah ada)
  const kategoriId = {};
  for (const slug of new Set(Object.keys(KATEGORI_LABEL))) {
    const nama = KATEGORI_LABEL[slug];
    const { rows } = await pool.query(
      `INSERT INTO galeri_kategori (nama) VALUES ($1)
       ON CONFLICT (nama) DO UPDATE SET nama = EXCLUDED.nama
       RETURNING id`,
      [nama]
    );
    kategoriId[slug] = rows[0].id;
    console.log(`Kategori "${nama}" -> id ${rows[0].id}`);
  }

  // 2. Upload tiap foto + insert row
  let urutan = 1;
  for (const [filename, caption, slug] of ITEMS) {
    const filePath = path.join(ASSET_DIR, filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`SKIP (file tidak ditemukan): ${filename}`);
      continue;
    }

    const buffer = fs.readFileSync(filePath);
    const compressed = await sharp(buffer)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const storageName = `${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`;
    const storagePath = `foto/${storageName}`;

    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, compressed, { contentType: "image/jpeg" });
    if (error) {
      console.error(`GAGAL upload ${filename}: ${error.message}`);
      continue;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    await pool.query(
      "INSERT INTO galeri (url, storage_path, caption, kategori_id, urutan) VALUES ($1,$2,$3,$4,$5)",
      [data.publicUrl, storagePath, caption, kategoriId[slug], urutan]
    );

    console.log(`OK (${urutan}/${ITEMS.length}): ${filename} -> ${caption}`);
    urutan++;
  }

  console.log("Migrasi selesai.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migrasi gagal:", err);
  process.exit(1);
});
