const express   = require("express");
const multer    = require("multer");
const path      = require("path");
const pool      = require("../db");
const supabase  = require("../supabase");
const auth      = require("../middleware/auth");

const BUCKET = "ppdb";

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
  penghasilan:   ["< Rp 1.000.000", "Rp 1.000.000 – 3.000.000", "Rp 3.000.000 – 5.000.000", "Rp 5.000.000 – 10.000.000", "> Rp 10.000.000"],
  statusNikah:   ["Menikah", "Cerai Hidup", "Cerai Mati"],
};

function validasiForm(b) {
  const errors = [];
  const isDigit = (v, len) => new RegExp(`^\\d{${len}}$`).test(v);
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
  if (!isDigit(b.npsn?.trim(), 8))                   errors.push("NPSN harus 8 digit angka.");
  if (!b.alamatSekolah?.trim())                      errors.push("Alamat sekolah wajib diisi.");

  return errors;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Format file tidak didukung. Gunakan JPG, PNG, atau PDF."));
  },
});


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

router.post(
  "/",
  upload.fields([
    { name: "foto_santri",     maxCount: 1 },
    { name: "bukti_transfer",  maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const b = req.body;

      if (!req.files?.foto_santri || !req.files?.bukti_transfer) {
        return res.status(400).json({ error: "File foto santri dan bukti transfer wajib diupload." });
      }

      const errors = validasiForm(b);
      if (errors.length) {
        return res.status(400).json({ error: errors[0], errors });
      }

      const uploadedPaths = [];
      let urlFoto, urlTransfer;

      try {
        const foto     = await uploadToSupabase(req.files.foto_santri[0],    "foto_santri");
        uploadedPaths.push(foto.path);
        const transfer = await uploadToSupabase(req.files.bukti_transfer[0], "bukti_transfer");
        uploadedPaths.push(transfer.path);
        urlFoto     = foto.url;
        urlTransfer = transfer.url;
      } catch (uploadErr) {
        await hapusFileSupabase(uploadedPaths);
        return res.status(500).json({ error: uploadErr.message });
      }

      const nomor = await generateNomor();

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
          url_foto_santri, url_bukti_transfer
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

      const trim = (v) => (v ? String(v).trim() : null);

      const values = [
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
        urlFoto, urlTransfer,
      ];

      const { rows } = await pool.query(query, values);

      res.status(201).json({
        message: "Pendaftaran berhasil dikirim.",
        data: rows[0],
      });
    } catch (err) {
      console.error("Error pendaftaran:", err.message);
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

module.exports = router;
