const express = require("express");
const pool    = require("../db");
const auth    = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const range = req.query.range === "week" ? "week" : "day";

    // Filter jenjang opsional. Tanpa parameter, query sama persis seperti dulu
    // dan tidak menyentuh kolom `jenjang` — jadi statistik tetap jalan walau
    // migrasi SQL jenjang belum dijalankan.
    const jenjang = ["MTS_SMA", "SD"].includes(req.query.jenjang) ? req.query.jenjang : null;
    const dgnJenjang = jenjang ? [jenjang] : [];

    const [ringkasanRes, trenRes, statusRes, daerahRes] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (WHERE status = 'Diterima') AS diterima,
          COUNT(*) FILTER (WHERE status = 'Ditolak')  AS ditolak,
          COUNT(*) FILTER (WHERE status IS NULL OR status = 'Menunggu') AS menunggu
        FROM pendaftaran
        ${jenjang ? "WHERE jenjang = $1" : ""}
      `, dgnJenjang),
      pool.query(
        `SELECT date_trunc($1, created_at)::date AS periode, COUNT(*) AS jumlah
         FROM pendaftaran
         ${jenjang ? "WHERE jenjang = $2" : ""}
         GROUP BY periode
         ORDER BY periode ASC`,
        [range, ...dgnJenjang]
      ),
      pool.query(`
        SELECT COALESCE(status, 'Menunggu') AS status, COUNT(*) AS jumlah
        FROM pendaftaran
        ${jenjang ? "WHERE jenjang = $1" : ""}
        GROUP BY COALESCE(status, 'Menunggu')
      `, dgnJenjang),
      pool.query(`
        SELECT UPPER(TRIM(kabupaten)) AS daerah, COUNT(*) AS jumlah
        FROM pendaftaran
        WHERE kabupaten IS NOT NULL AND TRIM(kabupaten) <> ''
        ${jenjang ? "AND jenjang = $1" : ""}
        GROUP BY UPPER(TRIM(kabupaten))
        ORDER BY jumlah DESC
      `, dgnJenjang),
    ]);

    const daerahAll = daerahRes.rows;
    const daerahTop = daerahAll.slice(0, 10);
    const daerahSisa = daerahAll.slice(10).reduce((sum, r) => sum + Number(r.jumlah), 0);
    const daerah = daerahSisa > 0 ? [...daerahTop, { daerah: "Lainnya", jumlah: daerahSisa }] : daerahTop;

    res.json({
      ringkasan: ringkasanRes.rows[0],
      tren: trenRes.rows,
      status: statusRes.rows,
      daerah,
    });
  } catch (err) {
    // 42703 = kolom `jenjang` belum ada: filter jenjang dipakai sebelum migrasi
    // backend/sql/2026-11-ppdb-sd.sql dijalankan.
    const migrasi = err.code === "42703";
    console.error("Error statistik:", err.message, migrasi ? "— migrasi PPDB SD belum dijalankan." : "");
    res.status(500).json({
      error: migrasi
        ? "Database belum diperbarui untuk PPDB SD. Hubungi pengelola server."
        : "Gagal mengambil data statistik.",
    });
  }
});

module.exports = router;
