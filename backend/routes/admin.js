const express = require("express");
const jwt     = require("jsonwebtoken");
const { Resend } = require("resend");
const crypto  = require("crypto");

const router = express.Router();

// In-memory OTP store: username -> { otp, expiresAt, attempts }
const otpStore = new Map();

// In-memory rate limiter: ip -> { count, resetAt }
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

async function sendOTPEmail(otp) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "PPDB Al Kautsar <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL,
    subject: "Kode OTP Login Admin — Pesantren Al Kautsar",
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:420px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
        <div style="background:#284061;padding:24px 28px;">
          <h2 style="color:#fff;margin:0;font-size:18px;font-weight:700;">Verifikasi Login Admin</h2>
          <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px;">Pesantren Al Kautsar — Sistem PPDB</p>
        </div>
        <div style="padding:28px;">
          <p style="color:#475569;font-size:14px;margin:0 0 20px;">Seseorang baru saja mencoba login ke panel admin. Gunakan kode berikut untuk melanjutkan:</p>
          <div style="background:#f8fafc;border:2px dashed #284061;border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;">
            <span style="font-size:40px;font-weight:800;letter-spacing:10px;color:#284061;font-family:monospace;">${otp}</span>
          </div>
          <p style="color:#64748b;font-size:13px;margin:0 0 8px;">⏱ Kode berlaku selama <strong>5 menit</strong>.</p>
          <p style="color:#94a3b8;font-size:12px;margin:0;border-top:1px solid #f1f5f9;padding-top:16px;margin-top:16px;">Jika Anda tidak melakukan login ini, segera amankan akun Anda dan hubungi developer.</p>
        </div>
      </div>
    `,
  });
}

// Step 1: Validasi credentials → kirim OTP ke email
router.post("/login", async (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Terlalu banyak percobaan login. Coba lagi dalam 15 menit." });
  }

  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Username atau password salah." });
  }

  const otp = generateOTP();
  otpStore.set(username, { otp, expiresAt: Date.now() + 5 * 60 * 1000, attempts: 0 });

  try {
    await sendOTPEmail(otp);
    res.json({ step: "otp", message: "Kode OTP dikirim ke email admin." });
  } catch (err) {
    console.error("Gagal kirim OTP email:", err.message);
    otpStore.delete(username);
    res.status(500).json({ error: "Gagal mengirim kode verifikasi. Hubungi administrator." });
  }
});

// Step 2: Validasi OTP → keluarkan JWT
router.post("/verify-otp", (req, res) => {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: "Terlalu banyak percobaan. Coba lagi dalam 15 menit." });
  }

  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ error: "Data tidak lengkap." });
  }

  const stored = otpStore.get(username);

  if (!stored) {
    return res.status(400).json({ error: "Sesi OTP tidak ditemukan. Silakan login ulang." });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(username);
    return res.status(400).json({ error: "Kode OTP sudah kedaluwarsa. Silakan login ulang." });
  }

  stored.attempts++;
  if (stored.attempts > 5) {
    otpStore.delete(username);
    return res.status(400).json({ error: "Terlalu banyak percobaan OTP. Silakan login ulang." });
  }

  if (otp !== stored.otp) {
    return res.status(400).json({ error: `Kode OTP salah. Sisa percobaan: ${5 - stored.attempts}` });
  }

  otpStore.delete(username);

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

module.exports = router;
