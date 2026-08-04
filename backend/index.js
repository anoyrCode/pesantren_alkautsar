require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const helmet   = require("helmet");

const pendaftaranRoute = require("./routes/pendaftaran");
const adminRoute       = require("./routes/admin");
const galeriRoute      = require("./routes/galeri");
const statistikRoute   = require("./routes/statistik");

const app  = express();
const PORT = process.env.PORT || 3001;

// Baca IP asli client dari header X-Forwarded-For saat di belakang reverse proxy (Nginx),
// supaya rate limiter login tidak keliru menganggap semua orang satu IP yang sama
app.set("trust proxy", 1);

// Security headers
app.use(helmet());
app.set("x-powered-by", false);

const allowedOrigins = (process.env.FRONTEND_URL || "").split(",").map(o => o.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : (process.env.NODE_ENV === "production" ? false : "*"),
}));

app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use("/api/admin",       adminRoute);
app.use("/api/pendaftaran", pendaftaranRoute);
app.use("/api/galeri",      galeriRoute);
app.use("/api/statistik",   statistikRoute);

app.get("/", (req, res) => {
  res.json({ message: "API PPDB Pesantren Al Kautsar aktif." });
});

// Jangan bocorkan detail error internal ke client
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Ukuran file melebihi batas 5MB." });
  }
  if (err.type === "entity.too.large") {
    return res.status(400).json({ error: "Ukuran request terlalu besar." });
  }
  console.error("Unhandled error:", err.message);
  res.status(400).json({ error: "Terjadi kesalahan. Silakan coba lagi." });
});

// Jaring pengaman: tanpa ini, promise yang ditolak tanpa catch atau error yang
// lolos dari semua handler menghentikan proses tanpa meninggalkan jejak apa pun
// di log — sulit sekali didiagnosis saat terjadi di server.
process.on("unhandledRejection", (reason) => {
  console.error("Promise ditolak tanpa penanganan:", reason?.message || reason);
});

process.on("uncaughtException", (err) => {
  console.error("Error tak tertangani, proses dihentikan:", err.message);
  console.error(err.stack);
  // Keadaan proses sudah tidak bisa dipercaya — keluar dan biarkan Docker
  // menghidupkan ulang container.
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
