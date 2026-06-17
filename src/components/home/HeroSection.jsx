import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, BookOpen, ShieldCheck, GraduationCap, Globe2 } from "lucide-react";
import { ARABIC_FONT, GILDA_FONT } from "../../utils/constants";
import useParallax from "../../hooks/useParallax";

export default function HeroSection() {
  const navigate = useNavigate();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [px, setPx] = useState({ x: 0, y: 0 });
  const { ref: sectionRef, y: pY } = useParallax(1);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
    setPx({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#1a2d47]" onMouseMove={onMove}>
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-linear-to-br from-[#1a2d47] via-[#284061] to-[#3a5a8c]" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 80% 20%,rgba(192,155,90,.18) 0%,transparent 55%)",
          transform: `translateY(${pY * 0.12}px)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 75%)",
          transform: `translateY(${pY * 0.07}px)`,
        }}
      />

      {/* Cursor glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 380px at ${px.x}px ${px.y}px, rgba(212,140,26,.08), transparent 65%)` }} />

      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 pointer-events-none" style={{ transform: `translate3d(${pos.x * 24}px, ${pos.y * 18 + pY * -0.1}px, 0)`, transition: "transform 0.12s linear" }}>
        <div className="w-120 h-120 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
      </div>
      <div className="absolute -left-16 -bottom-16 pointer-events-none" style={{ transform: `translate3d(${pos.x * -16}px, ${pos.y * -12 + pY * 0.08}px, 0)`, transition: "transform 0.18s linear" }}>
        <div className="w-90 h-90 rounded-full border border-amber-500/10 animate-[spin_28s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 w-[min(1180px,92vw)] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center py-16 lg:py-12">

        {/* ── LEFT: main content ── */}
        <div className="flex-1">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 rounded-full pr-4 pl-2 py-1.5 mb-7 backdrop-blur-md animate-[fU_.7s_ease-out]">
            <div className="w-5 h-5 rounded-full bg-amber-500/80 flex items-center justify-center">
              <MapPin size={10} className="text-white" />
            </div>
            <span className="text-[11px] font-semibold text-white/80 tracking-wider uppercase">
              Sidoarjo · 901 Santri · MTs & SMA
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white leading-[1.05] tracking-tight mb-5 animate-[fU_.7s_.08s_ease-out_both]"
            style={{ ...GILDA_FONT, fontSize: "clamp(36px,5.5vw,64px)" }}
          >
            Pesantren<br />
            <span className="text-amber-300">Al Kautsar</span>
            <span className="block text-amber-300/60 mt-1" style={{ fontSize: "clamp(14px,1.8vw,22px)", fontStyle: "normal", letterSpacing: "0.18em" }}>— SIDOARJO</span>
          </h1>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-2 mb-6 animate-[fU_.7s_.12s_ease-out_both]">
            {["Kemenag RI", "Kemendikbud RI", "6 Tahun Sistem Pesantren"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/25 bg-amber-500/10 text-amber-200/80 text-[11px] font-semibold tracking-wide">
                <span className="w-1 h-1 rounded-full bg-amber-400/60 inline-block" />
                {b}
              </span>
            ))}
          </div>

          {/* Tagline — ringkas */}
          <p className="text-[15px] leading-[1.85] font-light text-white/60 max-w-md mb-8 animate-[fU_.7s_.18s_ease-out_both]">
            Lembaga pendidikan Islam bermanhaj Ahlussunnah wal Jama'ah di Sidoarjo — terbingkai dalam sistem kepesantrenan 6 tahun, dengan program Super Camp untuk persiapan perguruan tinggi nasional dan internasional.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10 animate-[fU_.7s_.24s_ease-out_both]">
            <button
              onClick={() => navigate("/ppdb")}
              className="inline-flex items-center gap-2 bg-linear-to-br from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl text-[13.5px] font-semibold shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all hover:cursor-pointer"
            >
              Daftar PPDB <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/tentang")}
              className="inline-flex items-center gap-2 text-white px-6 py-3 border border-white/25 rounded-xl text-[13.5px] font-semibold hover:bg-white/10 hover:border-white/50 transition-all hover:cursor-pointer"
            >
              Tentang Kami
            </button>
          </div>

          {/* Stats row */}
          <div className="flex border-t border-white/10 pt-7 animate-[fU_.7s_.32s_ease-out_both]">
            {[
              ["901", "+", "Santri Aktif"],
              ["6", "th", "MTs – SMA"],
              ["24", "h", "Pengawasan"],
              ["110", "", "CCTV Aktif"],
            ].map(([n, sup, l], i) => (
              <div
                key={i}
                className={`flex-1 ${i > 0 ? "border-l border-white/10 pl-4 sm:pl-5" : ""} ${i < 3 ? "pr-4 sm:pr-5" : ""}`}
              >
                <div className="text-white leading-none mb-1" style={{ ...GILDA_FONT, fontSize: "26px" }}>
                  {n}{sup && <span className="text-amber-300 text-[.55em] align-super">{sup}</span>}
                </div>
                <div className="text-[11px] text-white/40 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: visual panel ── */}
        <div className="hidden lg:flex flex-col gap-3.5 animate-[fL_.75s_.22s_ease-out_both] w-[400px] shrink-0 lg:self-start lg:mt-8">

          {/* Top: Kurikulum stats card */}
          <div className="bg-linear-to-br from-[#33507a]/85 to-[#22395c]/80 border border-white/18 ring-1 ring-inset ring-white/8 rounded-3xl p-6 backdrop-blur-xl shadow-2xl shadow-[#0a1426]/50 relative overflow-hidden">
            {/* Top edge highlight */}
            <div className="absolute top-0 inset-x-6 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
            {/* Decorative amber glow */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,140,26,.28) 0%, transparent 65%)" }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-5 relative z-10">
              <div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-amber-300/80 mb-1.5">Kurikulum Terpadu</div>
                <div className="text-[19px] font-bold text-white leading-tight" style={GILDA_FONT}>Program Akademik</div>
              </div>
              <div className="flex gap-1 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400/45" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>

            {/* jp stats grid */}
            <div className="grid grid-cols-3 gap-2.5 relative z-10 mb-5">
              {[
                { n: "48jp", l: "Diniyah\n& Agama", Icon: BookOpen },
                { n: "42jp", l: "Sains\n& UTBK", Icon: GraduationCap },
                { n: "14jp", l: "Bahasa\nInggris", Icon: Globe2 },
              ].map(({ n, l, Icon }) => (
                <div
                  key={n}
                  className="group bg-[#1a2d47]/55 border border-white/12 rounded-2xl p-3.5 text-center hover:bg-amber-500/15 hover:border-amber-400/30 transition-all duration-300"
                >
                  <Icon size={14} className="text-amber-300/70 mx-auto mb-2 group-hover:text-amber-300 transition-colors" />
                  <div className="text-amber-300 text-[18px] leading-none mb-1.5" style={GILDA_FONT}>{n}</div>
                  <div className="text-[9.5px] text-white/45 leading-tight whitespace-pre-line">{l}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-[#1a2d47]/70 overflow-hidden">
                <div className="h-full w-[68%] rounded-full bg-linear-to-r from-amber-600 to-amber-300" />
              </div>
              <span className="text-[10.5px] font-medium text-white/55 shrink-0">152 jp / pekan</span>
            </div>
          </div>

          {/* Bottom: 2 feature cards */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="group bg-linear-to-br from-[#33507a]/85 to-[#22395c]/80 border border-white/18 ring-1 ring-inset ring-white/8 rounded-2xl p-4 backdrop-blur-xl shadow-xl shadow-[#0a1426]/40 hover:-translate-y-0.5 hover:border-amber-400/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 inset-x-4 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 group-hover:bg-amber-500/30 transition-colors">
                <ShieldCheck size={16} />
              </div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-amber-300/65 mb-1.5">Keamanan</div>
              <div className="text-[14px] font-semibold text-white mb-1 leading-tight">3 Shift Musyrif</div>
              <div className="text-[11px] text-white/50 leading-relaxed font-light">110 CCTV · Rasio 1:10</div>
            </div>
            <div className="group bg-linear-to-br from-[#33507a]/85 to-[#22395c]/80 border border-white/18 ring-1 ring-inset ring-white/8 rounded-2xl p-4 backdrop-blur-xl shadow-xl shadow-[#0a1426]/40 hover:-translate-y-0.5 hover:border-amber-400/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 inset-x-4 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 group-hover:bg-amber-500/30 transition-colors">
                <GraduationCap size={16} />
              </div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-amber-300/65 mb-1.5">Super Camp</div>
              <div className="text-[14px] font-semibold text-white mb-1 leading-tight">UTBK & PTN</div>
              <div className="text-[11px] text-white/50 leading-relaxed font-light">Nasional & Internasional</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arabic marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t border-white/5">
        <div className="flex whitespace-nowrap animate-[marq_26s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-5 px-6 text-base text-white/7 shrink-0" style={{ ...ARABIC_FONT, direction: "rtl" }}>
              الكوثر — للعلم والإيمان — أهل السنة والجماعة — على منهج السلف الصالح
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
