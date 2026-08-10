const express   = require("express");
const multer    = require("multer");
const path      = require("path");
const pool      = require("../db");
const supabase  = require("../supabase");
const auth      = require("../middleware/auth");

const BUCKET = "ppdb";
const PLACEHOLDER_URL = "https://placehold.co/400x500/e2e8f0/64748b?text=Belum+Upload";

function extractStoragePath(url) {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url?.indexOf(marker) ?? -1;
  return idx === -1 ? null : url.slice(idx + marker.length);
}

async function uploadToSupabase(file, folder) {
  const ext      = path.extname(file.originalname);
  const nama     = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
  const filePath = `${folder}/${nama}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file.buffer, { contentType: file.mimetype });

  if (error) throw new Error(`Gagal upload ${folder}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
}

async function hapusFileSupabase(paths) {
  if (!paths || !paths.length) return;
  await supabase.storage.from(BUCKET).remove(paths);
}

const router = express.Router();

const ENUM = {
  jenisKelamin:  ["Laki-laki", "Perempuan"],
  golDarah:      ["A", "B", "AB", "O", "Tidak Diketahui"],
  statusRumah:   ["Milik Pribadi", "Sewa", "Kontrak", "Milik Orang Tua"],
  pendidikan:    ["Tidak Sekolah", "SD/Sederajat", "SMP/Sederajat", "SMA/SMK/Sederajat", "D3", "S1", "S2", "S3"],
  // Harus sama persis dengan GAJI di src/utils/constants.jsx (pemisah rentang = en dash)
  penghasilan:   ["Tidak Berpenghasilan", "< Rp 1.000.000", "Rp 1.000.000 – 3.000.000", "Rp 3.000.000 – 5.000.000", "Rp 5.000.000 – 10.000.000", "Rp 10.000.000 – 15.000.000", "Rp 15.000.000 – 30.000.000", "> Rp 30.000.000"],
  statusNikah:   ["Menikah", "Cerai Hidup", "Cerai Mati"],
};

function validasiForm(b) {
  const errors = [];
  // Cek `typeof v === "string"` wajib: RegExp.test() memaksa argumennya jadi string,
  // sehingga field yang tidak dikirim (undefined) diuji sebagai kata "undefined" —
  // 9 karakter alfanumerik, yang lolos pola rentang seperti {8,20}.
  const isDigit = (v, len)      => typeof v === "string" && new RegExp(`^\\d{${len}}$`).test(v);
  const isAlnum = (v, min, max) => typeof v === "string" && new RegExp(`^[A-Za-z0-9]{${min},${max}}$`).test(v);
  const inEnum  = (v, key) => ENUM[key].includes(v);

 
  if (!b.namaLengkap?.trim())                       errors.push("Nama lengkap wajib diisi.");
  if (!b.nomorOrtu?.trim())                          errors.push("Nomor HP orang tua wajib diisi.");
  if (!inEnum(b.jenisKelamin, "jenisKelamin"))       errors.push("Jenis kelamin tidak valid.");
  if (!b.tempatLahir?.trim())                        errors.push("Tempat lahir wajib diisi.");
  if (!isDigit(b.nikSantri?.trim(), 16))             errors.push("NIK santri harus 16 digit angka.");
  if (!isDigit(b.nomorKK?.trim(), 16))               errors.push("Nomor KK harus 16 digit angka.");
  if (!isDigit(b.nisn?.trim(), 10))                  errors.push("NISN harus 10 digit angka.");

  if (!b.alamatRumah?.trim())                        errors.push("Alamat rumah wajib diisi.");
  if (!b.kelurahan?.trim())                          errors.push("Kelurahan wajib diisi.");
  if (!b.kecamatan?.trim())                          errors.push("Kecamatan wajib diisi.");
  if (!b.kabupaten?.trim())                          errors.push("Kabupaten wajib diisi.");
  if (!b.provinsi?.trim())                           errors.push("Provinsi wajib diisi.");
  if (!inEnum(b.statusRumah, "statusRumah"))         errors.push("Status rumah tidak valid.");


  if (!b.namaAyah?.trim())                           errors.push("Nama ayah wajib diisi.");
  if (!isDigit(b.nikAyah?.trim(), 16))               errors.push("NIK ayah harus 16 digit angka.");
  if (!b.waAyah?.trim())                             errors.push("No. WA ayah wajib diisi.");
  if (!inEnum(b.pendidikanAyah, "pendidikan"))       errors.push("Pendidikan ayah tidak valid.");
  if (!b.pekerjaanAyah?.trim())                      errors.push("Pekerjaan ayah wajib diisi.");
  if (!inEnum(b.gajiAyah, "penghasilan"))            errors.push("Penghasilan ayah tidak valid.");
  if (!inEnum(b.statusNikahAyah, "statusNikah"))     errors.push("Status nikah ayah tidak valid.");

  
  if (!b.namaIbu?.trim())                            errors.push("Nama ibu wajib diisi.");
  if (!isDigit(b.nikIbu?.trim(), 16))                errors.push("NIK ibu harus 16 digit angka.");
  if (!b.waIbu?.trim())                              errors.push("No. WA ibu wajib diisi.");
  if (!inEnum(b.pendidikanIbu, "pendidikan"))        errors.push("Pendidikan ibu tidak valid.");
  if (!b.pekerjaanIbu?.trim())                       errors.push("Pekerjaan ibu wajib diisi.");
  if (!inEnum(b.gajiIbu, "penghasilan"))             errors.push("Penghasilan ibu tidak valid.");
  if (!inEnum(b.statusNikahIbu, "statusNikah"))      errors.push("Status nikah ibu tidak valid.");

  
  if (!b.sekolahAsal?.trim())                        errors.push("Nama sekolah asal wajib diisi.");
  if (!isAlnum(b.npsn?.trim(), 8, 20))               errors.push("NPSN harus 8–20 karakter (huruf atau angka).");
  if (!b.alamatSekolah?.trim())                      errors.push("Alamat sekolah wajib diisi.");

  // Kolom angka punya batas di database: anak_ke smallint (maks 32.767),
  // berat/tinggi numeric(5,2) (maks 999,99). Tanpa penjaga ini, isian seperti
  // tinggi badan dalam milimeter (1750) menembus batas dan Postgres menolak
  // dengan error 22003 — yang sampai ke pendaftar sebagai "Terjadi kesalahan
  // server" tanpa petunjuk apa pun.
  const rentang = (v, min, max) => {
    const n = Number(v);
    return Number.isFinite(n) && n >= min && n <= max;
  };
  if (b.anakKe      && !rentang(b.anakKe, 1, 20))        errors.push("Anak ke- harus antara 1 sampai 20.");
  if (b.beratBadan  && !rentang(b.beratBadan, 10, 250))  errors.push("Berat badan harus antara 10 sampai 250 kg.");
  if (b.tinggiBadan && !rentang(b.tinggiBadan, 50, 250)) errors.push("Tinggi badan harus antara 50 sampai 250 cm (isi dalam sentimeter, bukan milimeter).");

  // Tiap kolom teks punya batas keras di database. Tanpa penjaga ini, isian yang
  // kepanjangan lolos validasi lalu ditolak Postgres dengan kode 22001, dan yang
  // sampai ke pendaftar cuma "Terjadi kesalahan server" — tanpa petunjuk field
  // mana yang bermasalah, sehingga diulang berapa kali pun tetap gagal.
  // Angka di sini HARUS sama dengan lebar kolomnya di tabel `pendaftaran`.
  // `alamat_rumah` & `alamat_sekolah` tidak didaftar: tipenya `text`, tanpa batas.
  const BATAS_TEKS = [
    ["namaLengkap",   255, "Nama lengkap"],
    ["nomorOrtu",      40, "Nomor HP orang tua"],
    ["emailOrtu",     255, "Email orang tua"],
    ["tempatLahir",   100, "Tempat lahir"],
    ["hobi",          255, "Hobi"],
    ["citaCita",      255, "Cita-cita"],
    ["golDarah",       20, "Golongan darah"],
    ["kelurahan",     100, "Kelurahan"],
    ["kecamatan",     100, "Kecamatan"],
    ["kabupaten",     100, "Kabupaten"],
    ["provinsi",      100, "Provinsi"],
    ["namaAyah",      255, "Nama ayah"],
    ["waAyah",         40, "No. WA ayah"],
    ["pekerjaanAyah", 100, "Pekerjaan ayah"],
    ["namaIbu",       255, "Nama ibu"],
    ["waIbu",          40, "No. WA ibu"],
    ["pekerjaanIbu",  100, "Pekerjaan ibu"],
    ["namaWali",      255, "Nama wali"],
    ["waWali",         40, "No. WA wali"],
    ["sekolahAsal",   255, "Nama sekolah asal"],
  ];
  for (const [field, batas, label] of BATAS_TEKS) {
    const v = b[field];
    if (typeof v === "string" && v.trim().length > batas) {
      errors.push(`${label} terlalu panjang (maksimal ${batas} karakter).`);
    }
  }

  return errors;
}

// Proxy Nginx di depan backend membatasi ukuran request sekitar 1MB (bukan
// dikonfigurasi oleh proyek ini). Batas di sini sengaja diselaraskan supaya
// backend menolak dengan pesan jelas, bukan Nginx menolak duluan dengan
// halaman error HTML yang membingungkan.
const MAKS_UKURAN_BUKTI = 1_000_000; // ~977 KiB, beri ruang untuk overhead multipart

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAKS_UKURAN_BUKTI },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (allowed.includes(file.mimetype)) return cb(null, true);

    // Dicatat lengkap supaya kalau ada pendaftar gagal, formatnya langsung
    // ketahuan dari log tanpa perlu menebak.
    console.warn(`Format ditolak: ${file.originalname} (${file.mimetype})`);

    // Ditandai `publik` supaya penangan error global meneruskan pesan ini apa
    // adanya. Tanpa tanda itu, pendaftar cuma melihat "Terjadi kesalahan" dan
    // tidak pernah tahu bahwa masalahnya sekadar format berkas.
    const err = new Error("Format file tidak didukung. Gunakan JPG, PNG, atau PDF.");
    err.publik = true;
    cb(err);
  },
});


// Parameter :id datang sebagai teks. Tanpa pemeriksaan ini, "/api/pendaftaran/abc"
// diteruskan mentah ke Postgres dan menghasilkan 500, bukan 404.
const idValid = (v) => /^\d+$/.test(v);

async function generateNomor() {
  const tahun = 2027;
  const { rows } = await pool.query(
    "SELECT nomor_pendaftaran FROM pendaftaran WHERE nomor_pendaftaran LIKE $1 ORDER BY nomor_pendaftaran DESC LIMIT 1",
    [`PPDB-${tahun}-%`]
  );
  let urutan = 1;
  if (rows.length > 0) {
    const bagian = rows[0].nomor_pendaftaran.split("-");
    urutan = parseInt(bagian[2]) + 1;
  }
  return `PPDB-${tahun}-${String(urutan).padStart(5, "0")}`;
}

// generateNomor() membaca nomor terakhir lalu menambah satu, jadi dua pendaftar
// yang mengirim nyaris bersamaan bisa mendapat nomor sama dan salah satunya kena
// constraint UNIQUE. Di sini bentrok itu ditangani dengan mengambil nomor baru
// dan mencoba lagi, bukan menggagalkan pendaftaran orangnya.
const KODE_BENTROK = "23505";
const MAKS_PERCOBAAN = 5;

async function insertDenganNomor(query, susunValues) {
  for (let percobaan = 1; ; percobaan++) {
    const nomor = await generateNomor();
    try {
      const { rows } = await pool.query(query, susunValues(nomor));
      return rows;
    } catch (err) {
      const bentrokNomor =
        err.code === KODE_BENTROK && String(err.constraint || "").includes("nomor_pendaftaran");
      if (!bentrokNomor || percobaan >= MAKS_PERCOBAAN) throw err;
      console.warn(`Nomor ${nomor} bentrok, mencoba nomor berikutnya (percobaan ${percobaan}).`);
    }
  }
}

const PPDB_START = new Date("2026-08-01T00:00:00+07:00");

router.post(
  "/",
  upload.fields([
    { name: "bukti_transfer",  maxCount: 1 },
  ]),
  async (req, res) => {
    // Dideklarasikan di luar try supaya catch terluar bisa ikut membersihkan.
    // Upload ke Storage terjadi sebelum INSERT, jadi kalau INSERT gagal filenya
    // sudah terlanjur ada di sana dan tanpa pembersihan jadi sampah permanen.
    const uploadedPaths = [];
    try {
      const now = new Date();
      if (now < PPDB_START) {
        return res.status(403).json({ error: "Pendaftaran belum dibuka. Formulir tersedia mulai 1 Agustus 2026." });
      }

      const b = req.body;

      if (!req.files?.bukti_transfer) {
        return res.status(400).json({ error: "File bukti transfer wajib diupload." });
      }

      const errors = validasiForm(b);
      if (errors.length) {
        return res.status(400).json({ error: errors[0], errors });
      }

      let urlTransfer;

      try {
        const transfer = await uploadToSupabase(req.files.bukti_transfer[0], "bukti_transfer");
        uploadedPaths.push(transfer.path);
        urlTransfer = transfer.url;
      } catch (uploadErr) {
        await hapusFileSupabase(uploadedPaths);
        return res.status(500).json({ error: uploadErr.message });
      }

      const query = `
        INSERT INTO pendaftaran (
          nomor_pendaftaran,
          -- Data Santri
          nama_lengkap, nomor_hp_ortu, email_ortu, jenis_kelamin,
          tempat_lahir, nik_santri, nomor_kk, nisn,
          hobi, cita_cita, anak_ke, berat_badan, tinggi_badan,
          golongan_darah, penyakit,
          -- Alamat
          alamat_rumah, kelurahan, kecamatan, kabupaten, provinsi, status_rumah,
          -- Ayah
          nama_ayah, nik_ayah, wa_ayah, pendidikan_ayah, pekerjaan_ayah, gaji_ayah, status_nikah_ayah,
          -- Ibu
          nama_ibu, nik_ibu, wa_ibu, pendidikan_ibu, pekerjaan_ibu, gaji_ibu, status_nikah_ibu,
          -- Wali
          nama_wali, wa_wali,
          -- Sekolah
          sekolah_asal, npsn, alamat_sekolah,
          -- Dokumen
          url_bukti_transfer
        ) VALUES (
          $1,
          $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,
          $17,$18,$19,$20,$21,$22,
          $23,$24,$25,$26,$27,$28,$29,
          $30,$31,$32,$33,$34,$35,$36,
          $37,$38,
          $39,$40,$41,
          $42
        )
        RETURNING id, nomor_pendaftaran, created_at
      `;

      const trim = (v) => (v ? String(v).trim() : null);

      const rows = await insertDenganNomor(query, (nomor) => [
        nomor,
        trim(b.namaLengkap), trim(b.nomorOrtu), trim(b.emailOrtu) || null, trim(b.jenisKelamin),
        trim(b.tempatLahir), trim(b.nikSantri), trim(b.nomorKK), trim(b.nisn),
        trim(b.hobi)      || null, trim(b.citaCita) || null,
        b.anakKe      ? parseInt(b.anakKe)        : null,
        b.beratBadan  ? parseFloat(b.beratBadan)  : null,
        b.tinggiBadan ? parseFloat(b.tinggiBadan) : null,
        trim(b.golDarah)  || null, trim(b.penyakit) || null,
        trim(b.alamatRumah), trim(b.kelurahan), trim(b.kecamatan), trim(b.kabupaten), trim(b.provinsi), trim(b.statusRumah),
        trim(b.namaAyah), trim(b.nikAyah), trim(b.waAyah), trim(b.pendidikanAyah), trim(b.pekerjaanAyah), trim(b.gajiAyah), trim(b.statusNikahAyah),
        trim(b.namaIbu), trim(b.nikIbu), trim(b.waIbu), trim(b.pendidikanIbu), trim(b.pekerjaanIbu), trim(b.gajiIbu), trim(b.statusNikahIbu),
        trim(b.namaWali)  || null, trim(b.waWali) || null,
        trim(b.sekolahAsal), trim(b.npsn), trim(b.alamatSekolah),
        urlTransfer,
      ]);

      res.status(201).json({
        message: "Pendaftaran berhasil dikirim.",
        data: rows[0],
      });
    } catch (err) {
      console.error("Error pendaftaran:", err.message);
      // Buang file yang sudah terunggah supaya kegagalan tidak meninggalkan sampah.
      await hapusFileSupabase(uploadedPaths);
      res.status(500).json({ error: "Terjadi kesalahan server. Silakan coba lagi." });
    }
  }
);


router.post(
  "/admin",
  auth,
  upload.fields([
    { name: "bukti_transfer",  maxCount: 1 },
  ]),
  async (req, res) => {
    // Di luar try — alasan sama seperti endpoint publik: upload mendahului INSERT.
    const uploadedPaths = [];
    try {
      const b = req.body;

      const errors = validasiForm(b);
      if (errors.length) {
        return res.status(400).json({ error: errors[0], errors });
      }

      let urlTransfer = PLACEHOLDER_URL;

      try {
        if (req.files?.bukti_transfer?.[0]) {
          const transfer = await uploadToSupabase(req.files.bukti_transfer[0], "bukti_transfer");
          uploadedPaths.push(transfer.path);
          urlTransfer = transfer.url;
        }
      } catch (uploadErr) {
        await hapusFileSupabase(uploadedPaths);
        return res.status(500).json({ error: uploadErr.message });
      }

      const trim = (v) => (v ? String(v).trim() : null);

      const query = `
        INSERT INTO pendaftaran (
          nomor_pendaftaran,
          nama_lengkap, nomor_hp_ortu, email_ortu, jenis_kelamin,
          tempat_lahir, nik_santri, nomor_kk, nisn,
          hobi, cita_cita, anak_ke, berat_badan, tinggi_badan,
          golongan_darah, penyakit,
          alamat_rumah, kelurahan, kecamatan, kabupaten, provinsi, status_rumah,
          nama_ayah, nik_ayah, wa_ayah, pendidikan_ayah, pekerjaan_ayah, gaji_ayah, status_nikah_ayah,
          nama_ibu, nik_ibu, wa_ibu, pendidikan_ibu, pekerjaan_ibu, gaji_ibu, status_nikah_ibu,
          nama_wali, wa_wali,
          sekolah_asal, npsn, alamat_sekolah,
          url_bukti_transfer, status
        ) VALUES (
          $1,
          $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,
          $17,$18,$19,$20,$21,$22,
          $23,$24,$25,$26,$27,$28,$29,
          $30,$31,$32,$33,$34,$35,$36,
          $37,$38,
          $39,$40,$41,
          $42,$43
        )
        RETURNING id, nomor_pendaftaran, created_at
      `;

      const rows = await insertDenganNomor(query, (nomor) => [
        nomor,
        trim(b.namaLengkap), trim(b.nomorOrtu), trim(b.emailOrtu) || null, trim(b.jenisKelamin),
        trim(b.tempatLahir), trim(b.nikSantri), trim(b.nomorKK), trim(b.nisn),
        trim(b.hobi)      || null, trim(b.citaCita) || null,
        b.anakKe      ? parseInt(b.anakKe)        : null,
        b.beratBadan  ? parseFloat(b.beratBadan)  : null,
        b.tinggiBadan ? parseFloat(b.tinggiBadan) : null,
        trim(b.golDarah)  || null, trim(b.penyakit) || null,
        trim(b.alamatRumah), trim(b.kelurahan), trim(b.kecamatan), trim(b.kabupaten), trim(b.provinsi), trim(b.statusRumah),
        trim(b.namaAyah), trim(b.nikAyah), trim(b.waAyah), trim(b.pendidikanAyah), trim(b.pekerjaanAyah), trim(b.gajiAyah), trim(b.statusNikahAyah),
        trim(b.namaIbu), trim(b.nikIbu), trim(b.waIbu), trim(b.pendidikanIbu), trim(b.pekerjaanIbu), trim(b.gajiIbu), trim(b.statusNikahIbu),
        trim(b.namaWali)  || null, trim(b.waWali) || null,
        trim(b.sekolahAsal), trim(b.npsn), trim(b.alamatSekolah),
        urlTransfer, trim(b.status) || "Menunggu",
      ]);

      res.status(201).json({
        message: "Data pendaftar berhasil ditambahkan.",
        data: rows[0],
      });
    } catch (err) {
      console.error("Error tambah data admin:", err.message);
      await hapusFileSupabase(uploadedPaths);
      res.status(500).json({ error: "Terjadi kesalahan server. Silakan coba lagi." });
    }
  }
);


router.get("/", auth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, nomor_pendaftaran, nama_lengkap, jenis_kelamin, nomor_hp_ortu, sekolah_asal, status, created_at FROM pendaftaran ORDER BY created_at DESC"
    );
    res.json({ data: rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Gagal mengambil data." });
  }
});


router.get("/:id", auth, async (req, res) => {
  try {
    if (!idValid(req.params.id)) return res.status(404).json({ error: "Data tidak ditemukan." });

    const { rows } = await pool.query(
      "SELECT * FROM pendaftaran WHERE id = $1",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Data tidak ditemukan." });
    res.json({ data: rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Gagal mengambil data." });
  }
});


const STATUS_OPTIONS = ["Menunggu", "Diterima", "Ditolak"];

router.patch("/:id/status", auth, async (req, res) => {
  try {
    if (!idValid(req.params.id)) return res.status(404).json({ error: "Data tidak ditemukan." });

    const { status } = req.body;
    if (!STATUS_OPTIONS.includes(status)) {
      return res.status(400).json({ error: "Status tidak valid." });
    }
    const { rows } = await pool.query(
      "UPDATE pendaftaran SET status = $1 WHERE id = $2 RETURNING id, status",
      [status, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Data tidak ditemukan." });
    res.json({ message: "Status berhasil diperbarui.", data: rows[0] });
  } catch (err) {
    console.error("Error update status:", err.message);
    res.status(500).json({ error: "Gagal memperbarui status." });
  }
});


router.put(
  "/:id",
  auth,
  upload.fields([
    { name: "bukti_transfer",  maxCount: 1 },
  ]),
  async (req, res) => {
    // File lama TIDAK boleh dihapus sebelum UPDATE berhasil. Kalau dihapus duluan
    // lalu UPDATE gagal, database masih menunjuk ke URL lama yang filenya sudah
    // tidak ada — bukti transfer pendaftar hilang permanen. Jadi: file baru dibuang
    // kalau UPDATE gagal, file lama dibuang hanya setelah UPDATE sukses.
    let pathBaru = null;
    let pathLama = null;
    try {
      if (!idValid(req.params.id)) return res.status(404).json({ error: "Data tidak ditemukan." });

      const existing = await pool.query("SELECT * FROM pendaftaran WHERE id = $1", [req.params.id]);
      if (!existing.rows.length) return res.status(404).json({ error: "Data tidak ditemukan." });
      const old = existing.rows[0];

      const b = req.body;
      const errors = validasiForm(b);
      if (errors.length) {
        return res.status(400).json({ error: errors[0], errors });
      }

      let urlTransfer = old.url_bukti_transfer;

      try {
        if (req.files?.bukti_transfer?.[0]) {
          const transfer = await uploadToSupabase(req.files.bukti_transfer[0], "bukti_transfer");
          pathBaru = transfer.path;
          pathLama = extractStoragePath(old.url_bukti_transfer);
          urlTransfer = transfer.url;
        }
      } catch (uploadErr) {
        return res.status(500).json({ error: uploadErr.message });
      }

      const trim = (v) => (v ? String(v).trim() : null);

      const query = `
        UPDATE pendaftaran SET
          nama_lengkap = $1, nomor_hp_ortu = $2, email_ortu = $3, jenis_kelamin = $4,
          tempat_lahir = $5, nik_santri = $6, nomor_kk = $7, nisn = $8,
          hobi = $9, cita_cita = $10, anak_ke = $11, berat_badan = $12, tinggi_badan = $13,
          golongan_darah = $14, penyakit = $15,
          alamat_rumah = $16, kelurahan = $17, kecamatan = $18, kabupaten = $19, provinsi = $20, status_rumah = $21,
          nama_ayah = $22, nik_ayah = $23, wa_ayah = $24, pendidikan_ayah = $25, pekerjaan_ayah = $26, gaji_ayah = $27, status_nikah_ayah = $28,
          nama_ibu = $29, nik_ibu = $30, wa_ibu = $31, pendidikan_ibu = $32, pekerjaan_ibu = $33, gaji_ibu = $34, status_nikah_ibu = $35,
          nama_wali = $36, wa_wali = $37,
          sekolah_asal = $38, npsn = $39, alamat_sekolah = $40,
          url_bukti_transfer = $41, status = $42
        WHERE id = $43
        RETURNING id, nomor_pendaftaran
      `;

      const values = [
        trim(b.namaLengkap), trim(b.nomorOrtu), trim(b.emailOrtu) || null, trim(b.jenisKelamin),
        trim(b.tempatLahir), trim(b.nikSantri), trim(b.nomorKK), trim(b.nisn),
        trim(b.hobi)      || null, trim(b.citaCita) || null,
        b.anakKe      ? parseInt(b.anakKe)        : null,
        b.beratBadan  ? parseFloat(b.beratBadan)  : null,
        b.tinggiBadan ? parseFloat(b.tinggiBadan) : null,
        trim(b.golDarah)  || null, trim(b.penyakit) || null,
        trim(b.alamatRumah), trim(b.kelurahan), trim(b.kecamatan), trim(b.kabupaten), trim(b.provinsi), trim(b.statusRumah),
        trim(b.namaAyah), trim(b.nikAyah), trim(b.waAyah), trim(b.pendidikanAyah), trim(b.pekerjaanAyah), trim(b.gajiAyah), trim(b.statusNikahAyah),
        trim(b.namaIbu), trim(b.nikIbu), trim(b.waIbu), trim(b.pendidikanIbu), trim(b.pekerjaanIbu), trim(b.gajiIbu), trim(b.statusNikahIbu),
        trim(b.namaWali)  || null, trim(b.waWali) || null,
        trim(b.sekolahAsal), trim(b.npsn), trim(b.alamatSekolah),
        urlTransfer, trim(b.status) || old.status || "Menunggu",
        req.params.id,
      ];

      const { rows } = await pool.query(query, values);

      // Baru sekarang file lama aman dibuang — datanya sudah tersimpan.
      if (pathLama) await hapusFileSupabase([pathLama]);

      res.json({ message: "Data pendaftar berhasil diperbarui.", data: rows[0] });
    } catch (err) {
      console.error("Error edit data admin:", err.message);
      // UPDATE gagal: buang file baru, biarkan file lama utuh supaya data lama
      // tetap bisa dibuka.
      if (pathBaru) await hapusFileSupabase([pathBaru]);
      res.status(500).json({ error: "Terjadi kesalahan server. Silakan coba lagi." });
    }
  }
);


router.delete("/:id", auth, async (req, res) => {
  try {
    if (!idValid(req.params.id)) return res.status(404).json({ error: "Data tidak ditemukan." });

    const { rows } = await pool.query("SELECT * FROM pendaftaran WHERE id = $1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Data tidak ditemukan." });

    const paths = [
      extractStoragePath(rows[0].url_bukti_transfer),
    ].filter(Boolean);

    await hapusFileSupabase(paths);
    await pool.query("DELETE FROM pendaftaran WHERE id = $1", [req.params.id]);

    res.json({ message: "Data pendaftar berhasil dihapus." });
  } catch (err) {
    console.error("Error hapus data admin:", err.message);
    res.status(500).json({ error: "Gagal menghapus data." });
  }
});


module.exports = router;
