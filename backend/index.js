require("dotenv").config();
const express  = require("express");
const cors     = require("cors");

const pendaftaranRoute = require("./routes/pendaftaran");
const adminRoute       = require("./routes/admin");

const app  = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.FRONTEND_URL || "").split(",").map(o => o.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : "*",
}));
// Bypass ngrok browser warning untuk semua request
app.use((req, res, next) => {
  res.setHeader("ngrok-skip-browser-warning", "true");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin",       adminRoute);
app.use("/api/pendaftaran", pendaftaranRoute);

app.get("/", (req, res) => {
  res.json({ message: "API PPDB Pesantren Al Kautsar aktif." });
});

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Ukuran file melebihi batas 5MB." });
  }
  res.status(400).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
