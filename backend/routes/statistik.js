const express = require("express");
const pool    = require("../db");
const auth    = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const range = req.query.range === "week" ? "week" : "day";

    const [ringkasanRes, trenRes, statusRes, daerahRes] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*) AS total,
          COUNT(*) FILTER (WHERE status = 'Diterima') AS diterima,
          COUNT(*) FILTER (WHERE status = 'Ditolak')  AS ditolak,
          COUNT(*) FILTER (WHERE status IS NULL OR status = 'Menunggu') AS menunggu
        FROM pendaftaran
      `),
      pool.query(
        `SELECT date_trunc($1, created_at)::date AS periode, COUNT(*) AS jumlah
         FROM pendaftaran
         GROUP BY periode
         ORDER BY periode ASC`,
        [range]
      ),
      pool.query(`
        SELECT COALESCE(status, 'Menunggu') AS status, COUNT(*) AS jumlah
        FROM pendaftaran
        GROUP BY COALESCE(status, 'Menunggu')
      `),
      pool.query(`
        SELECT UPPER(TRIM(kabupaten)) AS daerah, COUNT(*) AS jumlah
        FROM pendaftaran
        WHERE kabupaten IS NOT NULL AND TRIM(kabupaten) <> ''
        GROUP BY UPPER(TRIM(kabupaten))
        ORDER BY jumlah DESC
      `),
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
    console.error("Error statistik:", err.message);
    res.status(500).json({ error: "Gagal mengambil data statistik." });
  }
});

module.exports = router;
