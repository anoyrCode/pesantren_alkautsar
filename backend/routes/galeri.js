const express  = require("express");
const multer   = require("multer");
const sharp    = require("sharp");
const pool     = require("../db");
const supabase = require("../supabase");
const auth     = require("../middleware/auth");

const BUCKET = "galeri";

async function uploadFoto(file) {
  const compressed = await sharp(file.buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  const nama     = `${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`;
  const filePath = `foto/${nama}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, compressed, { contentType: "image/jpeg" });

  if (error) throw new Error(`Gagal upload foto: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return { url: data.publicUrl, path: filePath };
}

async function hapusFoto(paths) {
  if (!paths || !paths.length) return;
  await supabase.storage.from(BUCKET).remove(paths);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP."));
  },
});

const router = express.Router();

// ── Publik ──────────────────────────────────────────────

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT g.id, g.url, g.caption, g.urutan, g.kategori_id, k.nama AS kategori
      FROM galeri g
      LEFT JOIN galeri_kategori k ON k.id = g.kategori_id
      ORDER BY g.urutan ASC, g.id ASC
    `);
    res.json({ data: rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Gagal mengambil data galeri." });
  }
});

router.get("/kategori", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, nama FROM galeri_kategori ORDER BY nama ASC");
    res.json({ data: rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Gagal mengambil kategori." });
  }
});

// ── Admin: Foto ─────────────────────────────────────────

router.post("/", auth, upload.single("foto"), async (req, res) => {
  try {
    const { caption, kategoriId } = req.body;
    if (!caption?.trim()) return res.status(400).json({ error: "Caption wajib diisi." });
    if (!req.file) return res.status(400).json({ error: "Foto wajib diupload." });

    const foto = await uploadFoto(req.file);

    const { rows: maxRows } = await pool.query("SELECT COALESCE(MAX(urutan), 0) + 1 AS next FROM galeri");
    const urutan = maxRows[0].next;

    const { rows } = await pool.query(
      "INSERT INTO galeri (url, storage_path, caption, kategori_id, urutan) VALUES ($1,$2,$3,$4,$5) RETURNING id, url, caption, urutan, kategori_id",
      [foto.url, foto.path, caption.trim(), kategoriId || null, urutan]
    );

    res.status(201).json({ message: "Foto berhasil ditambahkan.", data: rows[0] });
  } catch (err) {
    console.error("Error tambah foto galeri:", err.message);
    res.status(500).json({ error: err.message || "Gagal menambahkan foto." });
  }
});

router.put("/:id", auth, upload.single("foto"), async (req, res) => {
  try {
    const existing = await pool.query("SELECT * FROM galeri WHERE id = $1", [req.params.id]);
    if (!existing.rows.length) return res.status(404).json({ error: "Foto tidak ditemukan." });
    const old = existing.rows[0];

    const { caption, kategoriId } = req.body;
    if (!caption?.trim()) return res.status(400).json({ error: "Caption wajib diisi." });

    let url = old.url;
    let storagePath = old.storage_path;

    if (req.file) {
      const foto = await uploadFoto(req.file);
      await hapusFoto([old.storage_path]);
      url = foto.url;
      storagePath = foto.path;
    }

    const { rows } = await pool.query(
      "UPDATE galeri SET caption = $1, kategori_id = $2, url = $3, storage_path = $4 WHERE id = $5 RETURNING id, url, caption, urutan, kategori_id",
      [caption.trim(), kategoriId || null, url, storagePath, req.params.id]
    );

    res.json({ message: "Foto berhasil diperbarui.", data: rows[0] });
  } catch (err) {
    console.error("Error edit foto galeri:", err.message);
    res.status(500).json({ error: err.message || "Gagal memperbarui foto." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM galeri WHERE id = $1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Foto tidak ditemukan." });

    await hapusFoto([rows[0].storage_path]);
    await pool.query("DELETE FROM galeri WHERE id = $1", [req.params.id]);

    res.json({ message: "Foto berhasil dihapus." });
  } catch (err) {
    console.error("Error hapus foto galeri:", err.message);
    res.status(500).json({ error: "Gagal menghapus foto." });
  }
});

router.patch("/reorder", auth, async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order) || !order.length) {
      return res.status(400).json({ error: "Data urutan tidak valid." });
    }

    await Promise.all(
      order.map(({ id, urutan }) =>
        pool.query("UPDATE galeri SET urutan = $1 WHERE id = $2", [urutan, id])
      )
    );

    res.json({ message: "Urutan berhasil disimpan." });
  } catch (err) {
    console.error("Error reorder galeri:", err.message);
    res.status(500).json({ error: "Gagal menyimpan urutan." });
  }
});

// ── Admin: Kategori ─────────────────────────────────────

router.post("/kategori", auth, async (req, res) => {
  try {
    const nama = req.body.nama?.trim();
    if (!nama) return res.status(400).json({ error: "Nama kategori wajib diisi." });

    const { rows } = await pool.query(
      "INSERT INTO galeri_kategori (nama) VALUES ($1) RETURNING id, nama",
      [nama]
    );
    res.status(201).json({ message: "Kategori berhasil ditambahkan.", data: rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Kategori dengan nama itu sudah ada." });
    }
    console.error("Error tambah kategori:", err.message);
    res.status(500).json({ error: "Gagal menambahkan kategori." });
  }
});

router.put("/kategori/:id", auth, async (req, res) => {
  try {
    const nama = req.body.nama?.trim();
    if (!nama) return res.status(400).json({ error: "Nama kategori wajib diisi." });

    const { rows } = await pool.query(
      "UPDATE galeri_kategori SET nama = $1 WHERE id = $2 RETURNING id, nama",
      [nama, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Kategori tidak ditemukan." });

    res.json({ message: "Kategori berhasil diperbarui.", data: rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Kategori dengan nama itu sudah ada." });
    }
    console.error("Error edit kategori:", err.message);
    res.status(500).json({ error: "Gagal memperbarui kategori." });
  }
});

router.delete("/kategori/:id", auth, async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM galeri_kategori WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "Kategori tidak ditemukan." });

    res.json({ message: "Kategori berhasil dihapus." });
  } catch (err) {
    if (err.code === "23503") {
      return res.status(409).json({ error: "Kategori masih dipakai oleh foto lain. Pindahkan atau hapus foto tersebut dulu." });
    }
    console.error("Error hapus kategori:", err.message);
    res.status(500).json({ error: "Gagal menghapus kategori." });
  }
});

module.exports = router;
