import { useState } from "react";
import { BookOpen, Languages, Target, Monitor, ShieldCheck, Heart, School } from "lucide-react";
import { ARABIC_FONT, GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";
import useParallax from "../../hooks/useParallax";

const POINTS = [
  [BookOpen, "Aqidah Ahlussunnah — 48 jp/pekan, sistematis dan mendalam sejak dini"],
  [Languages, "Bahasa Arab aktif sebagai bahasa lingkungan dan pengantar ilmu agama"],
  [Target, "Discovery Task berbasis PISA untuk Diniyah dan pelajaran umum"],
  [Monitor, "LMS Al Kautsar — penilaian real-time, absensi, dan poin karakter digital"],
  [ShieldCheck, "3 shift musyrif, 110 CCTV online & offline, rasio 1:10"],
  [Heart, "Libur 5 hari/bulan untuk berbakti dan melepas rindu kepada orang tua"],
];

export default function TentangIntro() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { ref: sectionRef, y: pY } = useParallax(1);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  }

  return (
    <section ref={sectionRef} className="py-12 lg:py-12" onMouseMove={onMove}>
      <div className="w-[min(1180px,92vw)] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="bg-linear-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                {/* mouse parallax + scroll parallax combined */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle,rgba(192,155,90,.15) 0%,transparent 65%)", transform: `translate3d(${pos.x * 20}px, ${pos.y * 15 + pY * 0.1}px, 0)`, transition: "transform 0.18s linear" }} />

                <div className="text-[clamp(22px,3vw,32px)] text-white/14 text-right mb-6 leading-snug font-bold relative z-10" style={{ ...ARABIC_FONT, direction: "rtl" }}>
                  الكوثر — تربية على منهج السلف الصالح بالتوحيد والعلم والإيمان والتقوى
                </div>
                <blockquote className="border-l-2 border-amber-500 pl-5 text-[14px] leading-[1.85] font-light italic text-white/70 mb-7 relative z-10">
                  "Lembaga Pendidikan Islam di Sidoarjo yang memadukan pendidikan di bawah naungan Kementerian Agama dan Kementerian Pendidikan Dasar & Menengah RI dengan sistem kepesantrenan selama 6 tahun."
                </blockquote>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
                  {[["901", "Santri Aktif"], ["6th", "Masa Studi"], ["110", "CCTV"], ["1:10", "Musyrif"]].map(([n, l]) => (
                    <div key={n} className="bg-white/6 border border-white/8 rounded-xl p-3.5 text-center hover:bg-amber-500/15 transition-all">
                      <div className="text-[22px] text-amber-300 mb-1" style={GILDA_FONT}>{n}</div>
                      <div className="text-[10.5px] text-white/40">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-3.5 shadow-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white">
                  <School size={18} />
                </div>
                <div className="leading-tight">
                  <div className="text-[13px] font-bold text-[#284061]">2 Kementerian</div>
                  <div className="text-[11px] text-slate-500">Kemenag + Kemdikbud RI</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
              <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Tentang Kami
            </div>
            <h2 className="mb-5" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", color: "#284061", lineHeight: "1.15" }}>
              Tempat Tumbuh <em className="italic text-amber-500">Generasi Ahlus Sunnah</em>
            </h2>
            <p className="text-[15px] leading-[1.8] font-light text-slate-600 mb-3">
              Kami membina santri dalam lingkungan yang menjunjung prinsip dakwah Ahlussunnah wal Jama'ah, dengan pendekatan pola pembelajaran Discovery Task untuk memahami konsep secara mendalam.
            </p>
            <p className="text-[14px] leading-[1.75] font-light text-slate-500 mb-7">
              Bukan sekadar tempat belajar — Al Kautsar adalah ekosistem pembentukan generasi yang benar-benar siap menghadapi kehidupan modern tanpa kehilangan identitas Islam.
            </p>
            <ul className="space-y-2.5">
              {POINTS.map(([Icon, tx]) => (
                <li key={tx} className="group flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:translate-x-1 transition-all">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-linear-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Icon size={14} />
                  </div>
                  <span className="text-[13px] text-slate-700 leading-relaxed pt-1">{tx}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
