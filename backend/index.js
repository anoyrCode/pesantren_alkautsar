require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const helmet   = require("helmet");

const pendaftaranRoute = require("./routes/pendaftaran");
const adminRoute       = require("./routes/admin");

const app  = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
