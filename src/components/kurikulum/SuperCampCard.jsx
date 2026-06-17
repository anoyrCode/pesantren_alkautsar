import { Trophy } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

export default function SuperCampCard() {
  return (
    <Reveal>
      <div className="relative rounded-3xl overflow-hidden p-7 lg:p-8 mb-14" style={{ background: "linear-gradient(135deg, #1a2d47 0%, #284061 50%, #1e3352 100%)" }}>
        {/* top amber accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212,140,26,.65), transparent)" }} />
        {/* glow orbs */}
        <div className="absolute -top-16 right-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,140,26,.18) 0%, transparent 60%)" }} />
        <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,.07) 0%, transparent 65%)" }} />

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
          {/* icon */}
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
            <Trophy size={22} />
          </div>

          {/* teks */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2.5">
              <span className="text-[10.5px] font-bold tracking-widest uppercase text-amber-400">Program Unggulan</span>
              <span className="w-1 h-1 rounded-full bg-amber-400/40 hidden sm:block" />
              <span className="text-[10.5px] font-bold tracking-widest uppercase text-white/30">Eksklusif Al Kautsar</span>
            </div>
            <h3 className="text-white mb-2.5 leading-tight" style={{ ...GILDA_FONT, fontSize: "clamp(17px,1.8vw,22px)" }}>
              Super Camp — Bimbel Intensif PTN &amp; Internasional
            </h3>
            <p className="text-[13px] text-white/55 leading-[1.8] font-light max-w-lg">
              Program bimbingan belajar intensif khusus santri berprestasi, mempersiapkan mereka untuk masuk perguruan tinggi negeri terbaik dan universitas internasional.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["UTBK / SNBT", "PTN Unggulan", "Univ. Internasional", "ITS Tekno", "Seleksi Mandiri"].map(chip => (
                <span key={chip} className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 border border-amber-400/25 text-amber-300">{chip}</span>
              ))}
            </div>
          </div>

          {/* stat kanan */}
          <div className="shrink-0 self-center bg-white/[0.06] border border-white/10 rounded-2xl px-6 py-4 text-center hidden sm:block">
            <div className="text-[30px] leading-none text-amber-300 mb-1" style={GILDA_FONT}>100%</div>
            <div className="text-[10.5px] text-white/35 leading-snug">santri berprestasi<br />mendapat akses</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
