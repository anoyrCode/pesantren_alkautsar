import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { ShieldCheck, Mail, Lock, User, ArrowRight, RefreshCw } from "lucide-react";

const OTP_EXPIRE_SEC = 5 * 60; // 5 menit

export default function AdminLogin() {
  const navigate  = useNavigate();
  const [step, setStep]       = useState("login"); // "login" | "otp"
  const [form, setForm]       = useState({ username: "", password: "" });
  const [otp, setOtp]         = useState(["", "", "", "", "", ""]);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(OTP_EXPIRE_SEC);
  const [username, setUsername]   = useState(""); // simpan username untuk verify-otp
  const otpRefs = useRef([]);
  const timerRef = useRef(null);

  // Countdown timer saat step OTP
  useEffect(() => {
    if (step !== "otp") return;
    setCountdown(OTP_EXPIRE_SEC);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step]);

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  // Handle input OTP per kotak
  function handleOtpChange(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  }

  function handleOtpKeyDown(i, e) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  }

  function handleOtpPaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
      e.preventDefault();
    }
  }

  // Step 1: Login
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await apiFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Error ${res.status}`);
      setUsername(form.username);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify OTP
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    const otpCode = otp.join("");
    if (otpCode.length < 6) { setError("Masukkan 6 digit kode OTP."); return; }
    if (countdown === 0) { setError("Kode OTP sudah kedaluwarsa. Silakan login ulang."); return; }
    setLoading(true);
    try {
      const res  = await apiFetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp: otpCode }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Error ${res.status}`);
      localStorage.setItem("admin_token", json.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  function backToLogin() {
    clearInterval(timerRef.current);
    setStep("login");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4"
      style={{ backgroundImage: "radial-gradient(circle, rgba(40,64,97,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-[#284061] px-8 py-6 text-center">
          <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            {step === "login" ? <Lock size={20} className="text-amber-300" /> : <ShieldCheck size={20} className="text-amber-300" />}
          </div>
          <h1 className="text-[17px] font-bold text-white">
            {step === "login" ? "Login Admin" : "Verifikasi Email"}
          </h1>
          <p className="text-white/50 text-[12px] mt-0.5">
            {step === "login" ? "Pesantren Al Kautsar" : "Masukkan kode yang dikirim ke email admin"}
          </p>
        </div>

        <div className="px-8 py-7">

          {/* ── STEP 1: Login form ── */}
          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Username</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#284061]/30 focus:border-[#284061] transition-all"
                    placeholder="Masukkan username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#284061]/30 focus:border-[#284061] transition-all"
                    placeholder="Masukkan password"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-600 text-[12.5px] text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#284061] hover:bg-[#1a2d47] text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#284061]/20"
              >
                {loading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <><span>Lanjutkan</span><ArrowRight size={15} /></>
                )}
              </button>
            </form>
          )}

          {/* ── STEP 2: OTP form ── */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <Mail size={15} className="text-[#284061] mt-0.5 shrink-0" />
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Kode 6 digit telah dikirim ke email admin. Berlaku selama{" "}
                  <span className={`font-bold tabular-nums ${countdown < 60 ? "text-red-500" : "text-[#284061]"}`}>
                    {formatTime(countdown)}
                  </span>
                </p>
              </div>

              {/* 6-kotak OTP */}
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 mb-3 uppercase tracking-wide text-center">Kode OTP</label>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-11 h-12 text-center text-[20px] font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#284061] focus:ring-2 focus:ring-[#284061]/20 transition-all text-[#284061]"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-600 text-[12.5px] text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || countdown === 0}
                className="w-full bg-[#284061] hover:bg-[#1a2d47] text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-40 shadow-lg shadow-[#284061]/20"
              >
                {loading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <><ShieldCheck size={15} /><span>Verifikasi & Masuk</span></>
                )}
              </button>

              <button
                type="button"
                onClick={backToLogin}
                className="w-full text-[12.5px] text-slate-400 hover:text-[#284061] transition-colors text-center"
              >
                ← Kembali & login ulang
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
