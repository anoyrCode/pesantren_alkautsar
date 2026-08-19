/**
 * Pembatas laju berbasis memori untuk endpoint publik.
 *
 * Dipakai `POST /api/pendaftaran` — satu-satunya endpoint yang bisa menulis ke
 * database DAN mengunggah berkas tanpa perlu login. Tanpa pembatas, satu skrip
 * dari satu mesin bisa membanjiri tabel pendaftaran dan menghabiskan kuota
 * Supabase Storage (1 MB per kiriman) hanya dalam hitungan menit.
 *
 * Ini menaikkan biaya serangan, bukan menutupnya: penyerang dengan banyak IP
 * tetap lolos. Penahan yang sebenarnya untuk itu ada di tepi jaringan
 * (Cloudflare rate limiting / Turnstile), bukan di sini.
 *
 * Catatan: `routes/admin.js` punya pembatas sendiri yang penghitungnya
 * menyatu dengan penyimpanan OTP. Sengaja tidak digabung ke sini — modul itu
 * sudah berjalan di produksi dan pembersihannya terikat pada masa berlaku OTP.
 */
module.exports = function rateLimit({ jendelaMs, maks, pesan }) {
  const jejak = new Map();
  let sapuTerakhir = Date.now();

  // Disapu berkala, bukan tiap permintaan. Justru saat dibanjiri, peta ini
  // membesar — menyapunya setiap kali membuat biayanya kuadratik, persis ketika
  // servernya paling tertekan.
  function sapu(now) {
    if (now - sapuTerakhir < 60_000) return;
    sapuTerakhir = now;
    for (const [ip, entri] of jejak) {
      if (now > entri.resetAt) jejak.delete(ip);
    }
  }

  return function pembatas(req, res, next) {
    const now = Date.now();
    sapu(now);

    // `app.set("trust proxy", 1)` di index.js membuat req.ip berisi IP asli
    // pengunjung, bukan IP Nginx. Tanpa itu pembatas ini berlaku global.
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    const entri = jejak.get(ip);

    if (!entri || now > entri.resetAt) {
      jejak.set(ip, { count: 1, resetAt: now + jendelaMs });
      return next();
    }

    if (entri.count >= maks) {
      const detik = Math.ceil((entri.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(detik));
      return res.status(429).json({ error: pesan });
    }

    entri.count++;
    next();
  };
};
