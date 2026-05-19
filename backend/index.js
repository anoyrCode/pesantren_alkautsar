require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const path     = require("path");
const fs       = require("fs");

const pendaftaranRoute = require("./routes/pendaftaran");

const app  = express();
const PORT = process.env.PORT || 3001;


const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(uploadsDir));

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
