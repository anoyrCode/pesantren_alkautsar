require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host:                    process.env.DB_HOST,
  port:                    Number(process.env.DB_PORT),
  database:                process.env.DB_NAME,
  user:                    process.env.DB_USER,
  password:                process.env.DB_PASSWORD,
  ssl:                     { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis:       30000,
  max:                     5,
});

// Supabase memutus koneksi idle secara berkala. Tanpa listener ini, Pool
// memancarkan event "error" yang tak tertangani dan Node menghentikan proses —
// backend mati mendadak tanpa jejak sebab. Koneksi bermasalah dibuang sendiri
// oleh pool, jadi cukup dicatat.
pool.on("error", (err) => {
  console.error("Koneksi database idle bermasalah:", err.message);
});

pool.query("SELECT 1")
  .then(() => console.log("Terhubung ke database PostgreSQL"))
  .catch((err) => console.error("Gagal koneksi DB:", err.message));

module.exports = pool;
