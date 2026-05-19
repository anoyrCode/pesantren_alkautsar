import { Clock, ArrowRight, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";
import useCountdown from "../../hooks/useCountdown";

export default function PPDBHero() {
  const navigate = useNavigate();
  const countdown = useCountdown("2026-07-15");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a2d47] via-[#284061] to-[#3a5a8c]">
      <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse 60% 70% at 70% 30%,rgba(192,155,90,.18) 0%,transparent 55%)" }} />
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border border-white/5 animate-[spin_25s_linear_infinite] pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full border border-amber-500/10 animate-[spin_20s_linear_infinite_reverse] pointer-events-none" />

      <div className="relative z-10 w-[min(1180px,92vw)] mx-auto py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-300 text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
                <ClipboardList size={12} /> PPDB 2027/2028 · Segera Dibuka
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-white leading-[1.1] tracking-tight mb-5" style={{ ...GILDA_FONT, fontSize: "clamp(32px,5vw,54px)" }}>
                Daftarkan Putra-Putri Anda di<br />
                <em className="italic text-amber-300">Pesantren Al Kautsar</em>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-[15px] leading-[1.85] font-light text-white/65 max-w-xl mb-8">
                Pendaftaran jenjang MTs dan SMA tahun ajaran 2027/2028 kini dibuka mulai <span className="text-amber-300 font-medium">15 Juli</span> hingga <span className="text-amber-300 font-medium">15 September</span>. Kuota terbatas — segera daftarkan putra-putri Anda sebelum kehabisan tempat.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => navigate("/ppdb/formulir")} className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl text-[13.5px] font-semibold shadow-xl shadow-amber-500/30 hover:-translate-y-0.5 transition-all">
                  Daftar Sekarang <ArrowRight size={15} />
                </button>
                <a href="#timeline-ppdb" className="inline-flex items-center gap-2 text-white px-6 py-3 border border-white/25 rounded-xl text-[13.5px] font-semibold hover:bg-white/10 transition-all">
                  Lihat Timeline
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="right">
            <div className="bg-white/[.07] border border-white/15 rounded-3xl p-7 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-amber-300 mb-2">
                  <Clock size={12} /> Pendaftaran Dibuka Dalam
                </div>
                <h3 className="text-white mb-5" style={{ ...GILDA_FONT, fontSize: "20px" }}>Jangan Sampai Terlewat</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[["Hari", countdown.days], ["Jam", countdown.hours], ["Menit", countdown.mins], ["Detik", countdown.secs]].map(([l, v]) => (
                    <div key={l} className="bg-white/[.08] border border-white/[.12] rounded-xl p-3 hover:bg-amber-500/15 transition-all">
                      <div className="text-white tabular-nums" style={{ ...GILDA_FONT, fontSize: "24px", lineHeight: 1 }}>
                        {String(v).padStart(2, "0")}
                      </div>
                      <div className="text-[9.5px] text-white/50 mt-1 uppercase tracking-wider">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11.5px] text-white/60 mb-2">
                    <span>Periode Pendaftaran</span>
                    <span className="font-bold text-amber-300">15 Jul – 15 Sep</span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-white/60 mb-3">
                    <span>Status Pendaftaran</span>
                    <span className="font-bold text-amber-400">Segera Dibuka</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                    </span>
                    <span className="text-[12px] text-amber-300 font-semibold">MTs & SMA · Dibuka 15 Juli 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>



        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12 pt-8 border-t border-white/10">
            {[["Terakreditasi", "Lembaga Resmi"], ["2027/2028", "Tahun Ajaran"], ["Juli", "Mulai Belajar"], ["Rp 450rb", "Biaya Daftar"]].map(([n, l]) => (
              <div key={l} className="text-center sm:text-left">
                <div className="text-white mb-1" style={{ ...GILDA_FONT, fontSize: "24px", lineHeight: 1 }}>{n}</div>
                <div className="text-[11.5px] text-white/45">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}