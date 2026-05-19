import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { ARABIC_FONT, GILDA_FONT } from "../../utils/constants";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#1a2d47]">
      {/* layer background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2d47] via-[#284061] to-[#3a5a8c]" />
      <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 20%,rgba(192,155,90,.18) 0%,transparent 55%)" }} />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 75%)",
        }}
      />

      {/* buletan muter animasi */}
      <div className="absolute -right-20 -top-20 w-[480px] h-[480px] rounded-full border border-white/5 animate-[spin_20s_linear_infinite] pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-[360px] h-[360px] rounded-full border border-amber-500/10 animate-[spin_28s_linear_infinite_reverse] pointer-events-none" />

      <div className="relative z-10 w-[min(1180px,92vw)] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center py-12 lg:py-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2.5 bg-white/[.08] border border-white/15 rounded-full pr-4 pl-2 py-1.5 mb-6 backdrop-blur-md animate-[fU_.7s_ease-out]">
            <div className="w-5 h-5 rounded-full bg-amber-500/80 flex items-center justify-center">
              <MapPin size={10} className="text-white" />
            </div>
            <span className="text-[11px] font-semibold text-white/80 tracking-wider uppercase">
              Sidoarjo · 901 Santri · MTs & SMA
            </span>
          </div>
        
          <h1
            className="text-white leading-[1.05] tracking-tight mb-6 animate-[fU_.7s_.08s_ease-out_both]"
            style={{ ...GILDA_FONT, fontSize: "clamp(36px,5.5vw,64px)" }}
          >
            Pesantren<br />
            <span className="text-amber-300">Al Kautsar</span><br />
            <span className="text-white/45 italic">Generasi Bertauhid</span>
          </h1>

          <p className="text-[15px] leading-[1.85] font-light text-white/60 max-w-md mb-8 animate-[fU_.7s_.16s_ease-out_both]">
            Lembaga pendidikan Islam terpadu di Sidoarjo, di bawah naungan Kemenag dan Kemdikbud, bermanhaj Ahlussunnah wal Jamaah — memadukan aqidah, bahasa, dan akademik dalam satu sistem kepesantrenan 6 tahun.
          </p>
          <div className="flex flex-wrap gap-3 mb-12 animate-[fU_.7s_.24s_ease-out_both]">
            <button onClick={() => navigate("/ppdb")} className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl text-[13.5px] font-semibold shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all hover:cursor-pointer">
              Daftar PPDB <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate("/tentang")} className="inline-flex items-center gap-2 text-white px-6 py-3 border border-white/25 rounded-xl text-[13.5px] font-semibold hover:bg-white/10 hover:border-white/50 transition-all hover:cursor-pointer">
              Tentang Kami
            </button>
          </div>

          <div className="flex border-t border-white/10 pt-7 animate-[fU_.7s_.32s_ease-out_both]">
            {[
              ["901", "+", "Santri Aktif"],
              ["6", "th", "MTs – SMA"],
              ["24", "h", "Pengawasan"],
              ["110", "", "CCTV Aktif"],
            ].map(([n, sup, l], i) => (
              <div key={i} className={`flex-1 ${i > 0 ? "border-l border-white/10 pl-4 sm:pl-5" : ""} ${i < 3 ? "pr-4 sm:pr-5" : ""}`}>
                <div className="text-white leading-none mb-1" style={{ ...GILDA_FONT, fontSize: "26px" }}>
                  {n}{sup && <span className="text-amber-300 text-[.55em] align-super">{sup}</span>}
                </div>
                <div className="text-[11px] text-white/40 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* kartu info sebelah kanan */}
        <div className="hidden lg:flex flex-col gap-3 animate-[fL_.75s_.22s_ease-out_both] w-[420px] flex-shrink-0">
          {[
            { tag: "Inovasi Pembelajaran", title: "Discovery Task — Standar PISA", body: "Diskusi kelompok kecil, guru sebagai fasilitator, diterapkan untuk Diniyah dan Umum.", chips: ["PISA", "Diniyah", "LMS"] },
            { tag: "Akademik Kompetitif", title: "48jp Diniyah · 42jp Sains", body: "Pola bimbel intensif terstruktur. Super Camp UTBK untuk santri berprestasi.", chips: ["UTBK", "Super Camp", "ITS Tekno"] },
            { tag: "Keamanan & Kenyamanan", title: "3 Shift Musyrif · Rasio 1:10", body: "Sambungrejo, Sukodono, Sidoarjo. Anti-bullying, anti-LGBT.", chips: ["Sidoarjo", "Anti-Bullying"] },
          ].map((c, i) => (
            <div key={i} className="group bg-white/[.07] border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-x-1 transition-all">
              <div className="text-[10px] font-bold tracking-wider uppercase text-amber-300 mb-2">{c.tag}</div>
              <div className="text-[15px] font-semibold text-white mb-1.5">{c.title}</div>
              <div className="text-[12.5px] text-white/50 leading-relaxed font-light">{c.body}</div>
              <div className="flex gap-1.5 flex-wrap mt-2.5">
                {c.chips.map((ch) => (
                  <span key={ch} className="px-2 py-[2px] rounded-full text-[10.5px] font-semibold bg-white/[.08] border border-white/[.12] text-white/60">{ch}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* teks arab jalan di bawah */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t border-white/5">
        <div className="flex whitespace-nowrap animate-[marq_26s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-5 px-6 text-base text-white/[.07] flex-shrink-0" style={{ ...ARABIC_FONT, direction: "rtl" }}>
              الكوثر — للعلم والإيمان — أهل السنة والجماعة — نهضة الأمة
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fU{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
        @keyframes fL{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:none}}
        @keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>
    </section>
  );
}