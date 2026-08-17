import { Clock, ArrowRight, CheckCircle2, CalendarX2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GILDA_FONT } from "../../utils/constants";
import useCountdown from "../../hooks/useCountdown";
import useParallax from "../../hooks/useParallax";
import gedung2 from "../../assets/konten/gedung2.png";

const PPDB_START = "2026-08-01T00:00:00+07:00";
const PPDB_END   = "2026-09-30T23:59:59+07:00";

// Status dihitung dari tanggal hari ini, bukan disetel manual — supaya halaman
// ini tidak perlu disunting tiap ganti periode.
function getPpdbStatus() {
  const now = Date.now();
  if (now < new Date(PPDB_START).getTime()) return "belum";
  if (now <= new Date(PPDB_END).getTime()) return "dibuka";
  return "tutup";
}

// Latar terang mengikuti beranda. Nilai gradasinya sengaja sama persis supaya
// kedua hero terasa satu bahasa; kalau salah satu diubah, ubah keduanya.
const KREM = "#F6F2EA";
const PUDAR_DESKTOP =
  "linear-gradient(100deg, #F6F2EA 0%, #F6F2EA 20%, rgba(246,242,234,.985) 29%, rgba(246,242,234,.94) 37%, rgba(246,242,234,.85) 45%, rgba(246,242,234,.70) 53%, rgba(246,242,234,.50) 62%, rgba(246,242,234,.28) 72%, rgba(246,242,234,.10) 84%, rgba(246,242,234,0) 100%)";
const PUDAR_MOBILE =
  "linear-gradient(180deg, rgba(246,242,234,.97) 0%, rgba(246,242,234,.93) 38%, rgba(246,242,234,.82) 60%, rgba(246,242,234,.55) 78%, rgba(246,242,234,.28) 100%)";

const LABEL_STATUS = {
  belum:  "Segera Dibuka",
  dibuka: "Pendaftaran Dibuka",
  tutup:  "Pendaftaran Ditutup",
};

export default function PPDBHero() {
  const navigate = useNavigate();
  const status = getPpdbStatus();
  const countdown = useCountdown(status === "belum" ? PPDB_START : PPDB_END);
  const { ref: sectionRef, y: pY } = useParallax(1);

  // Warna status di latar terang: dipilih yang lolos kontras, bukan sekadar
  // versi terang dari warna aslinya.
  const warnaStatus =
    status === "belum" ? "text-amber-700" : status === "dibuka" ? "text-emerald-700" : "text-slate-400";

  return (
    // -mt-20 menetralkan pt-20 di <main> supaya latar hero menerus sampai tepi
    // atas, di belakang navbar pil yang mengambang.
    <section ref={sectionRef} className="relative -mt-20 overflow-hidden" style={{ backgroundColor: KREM }}>
      <div
        className="absolute -inset-y-8 inset-x-0"
        style={{
          backgroundImage: `url(${gedung2})`,
          backgroundSize: "cover",
          backgroundPosition: "center 42%",
          filter: "saturate(.88) contrast(1.02) brightness(1.05)",
          transform: `translateY(${pY * 0.08}px)`,
        }}
      />
      <div className="absolute inset-0 hidden lg:block" style={{ background: PUDAR_DESKTOP }} />
      <div className="absolute inset-0 lg:hidden" style={{ background: PUDAR_MOBILE }} />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(246,242,234,.55) 0%, rgba(246,242,234,0) 26%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(246,242,234,0) 0%, rgba(246,242,234,.5) 50%, #F6F2EA 100%)" }}
      />

      <div className="relative z-10 w-[min(1180px,92vw)] mx-auto pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-14 items-start">

          {/* ── KIRI ── */}
          <div className="min-w-0">
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.42em] text-slate-500 animate-[fU_.7s_ease-out_both]">
              PPDB 2027 / 2028
            </div>

            <h1
              className="text-[#1a2d47] leading-[0.96] tracking-tight mt-3.5 animate-[fU_.7s_.08s_ease-out_both]"
              style={{ ...GILDA_FONT, fontSize: "clamp(42px,6.5vw,76px)" }}
            >
              Pendaftaran
            </h1>

            <div className="flex items-center gap-3.75 mt-5 animate-[fU_.7s_.14s_ease-out_both]">
              <span className="w-13 h-0.5 rounded-full bg-[#D48C1A]" />
              <span className="text-[12px] font-semibold tracking-[0.26em] text-slate-500 uppercase">
                Pesantren Al Kautsar · Sidoarjo
              </span>
            </div>

            <p className="text-[15.5px] leading-[1.95] font-light text-slate-600 max-w-xl mt-7 animate-[fU_.7s_.2s_ease-out_both]">
              {status === "tutup" ? (
                <>
                  Periode pendaftaran jenjang MTs dan SMA tahun ajaran 2027/2028 telah berakhir pada{" "}
                  <b className="font-semibold text-[#1a2d47]">30 September</b>. Nantikan informasi
                  pendaftaran untuk periode berikutnya.
                </>
              ) : (
                <>
                  Pendaftaran jenjang MTs dan SMA tahun ajaran 2027/2028{" "}
                  {status === "dibuka" ? "kini dibuka" : "akan dibuka"} mulai{" "}
                  <b className="font-semibold text-[#1a2d47]">1 Agustus</b> hingga{" "}
                  <b className="font-semibold text-[#1a2d47]">30 September</b>. Terbuka untuk lulusan
                  SD/MI dan SMP/MTs.
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-6.5 mt-8.5 animate-[fU_.7s_.26s_ease-out_both]">
              {status === "tutup" ? (
                <button
                  disabled
                  className="inline-flex items-center gap-2 bg-[#1a2d47]/12 text-[#1a2d47]/45 px-7 py-3.75 rounded-xl text-[13.5px] font-semibold cursor-not-allowed"
                >
                  Pendaftaran Ditutup
                </button>
              ) : (
                <button
                  onClick={() => navigate("/ppdb/formulir")}
                  className="inline-flex items-center gap-2.25 bg-[#1a2d47] text-white px-7 py-3.75 rounded-xl text-[13.5px] font-semibold shadow-[0_14px_30px_-14px_rgba(26,45,71,.7)] hover:-translate-y-0.5 transition-transform hover:cursor-pointer"
                >
                  Daftar Sekarang <ArrowRight size={15} />
                </button>
              )}
              <a
                href="#timeline-ppdb"
                className="text-[13.5px] font-semibold text-[#1a2d47] border-b-[1.5px] border-[#1a2d47]/25 pb-0.75 hover:border-[#1a2d47]/60 transition-colors"
              >
                Lihat timeline
              </a>
            </div>
          </div>

          {/* ── KANAN: countdown ── */}
          <div className="animate-[fL_.75s_.22s_ease-out_both]">
            <div className="rounded-2xl bg-[#1a2d47] px-6.5 pt-6 pb-6 shadow-[0_30px_60px_-30px_rgba(26,45,71,.55),0_4px_12px_-6px_rgba(26,45,71,.18)] animate-[apung_7s_ease-in-out_infinite]">
              <div className="flex items-center gap-1.75 text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-amber-400/90">
                {status === "belum"  && <><Clock size={12} /> Pendaftaran Dibuka Dalam</>}
                {status === "dibuka" && <><CheckCircle2 size={12} /> Pendaftaran Ditutup Dalam</>}
                {status === "tutup"  && <><CalendarX2 size={12} /> Periode Telah Berakhir</>}
              </div>

              <div className="text-[21px] text-white mt-2.25 mb-5" style={GILDA_FONT}>
                {status === "belum"  && "Menuju Pembukaan"}
                {status === "dibuka" && "Pendaftaran Berlangsung"}
                {status === "tutup"  && "Sampai Jumpa Tahun Depan"}
              </div>

              {status === "tutup" ? (
                <p className="text-[13px] leading-relaxed text-white/55">
                  Pendaftaran PPDB 2027/2028 sudah ditutup. Terima kasih atas antusiasme Anda.
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-2.5">
                  {[["Hari", countdown.days], ["Jam", countdown.hours], ["Menit", countdown.mins], ["Detik", countdown.secs]].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-white/8 py-3 text-center">
                      <div className="text-white tabular-nums" style={{ ...GILDA_FONT, fontSize: "24px", lineHeight: 1 }}>
                        {String(v).padStart(2, "0")}
                      </div>
                      <div className="text-[9.5px] text-white/50 mt-1.25 uppercase tracking-wider">{l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pelat terang di bawah kartu — pola sama seperti panel beranda */}
            <div className="rounded-xl bg-white/92 px-5 py-4.5 mt-3.75 shadow-[0_14px_34px_-20px_rgba(26,45,71,.38)] animate-[apungKecil_9s_ease-in-out_infinite] [animation-delay:.8s]">
              <div className="flex items-center justify-between text-[11.5px] text-slate-500">
                <span>Periode pendaftaran</span>
                <span className="font-semibold text-[#1a2d47]">1 Ags – 30 Sep</span>
              </div>
              <div className="flex items-center justify-between text-[11.5px] text-slate-500 mt-2.25 pt-2.25 border-t border-[#1a2d47]/8">
                <span>Status</span>
                <span className={`font-semibold inline-flex items-center gap-2 ${warnaStatus}`}>
                  {status !== "tutup" && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === "belum" ? "bg-amber-500" : "bg-emerald-500"}`} />
                      <span className={`relative inline-flex h-2 w-2 rounded-full ${status === "belum" ? "bg-amber-500" : "bg-emerald-500"}`} />
                    </span>
                  )}
                  {LABEL_STATUS[status]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
