import { useState } from "react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";
import useParallax from "../../hooks/useParallax";

const STATS = [["901", "Santri Aktif"], ["24h", "Pengawasan"], ["1:10", "Rasio Musyrif"], ["110", "CCTV Aktif"]];

export default function KesantrianBanner() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { ref: bannerRef, y: pY } = useParallax(1);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  }

  return (
    <Reveal>
      <div ref={bannerRef} className="bg-linear-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-9 lg:p-14 relative overflow-hidden mb-14" onMouseMove={onMove}>
        {/* Decorative orbs — mouse parallax + scroll parallax combined */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-amber-400/7 blur-3xl" style={{ transform: `translate3d(${pos.x * 22}px, ${pos.y * 16 + pY * -0.12}px, 0)`, transition: "transform 0.15s linear" }} />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-[#3a6090]/40 blur-2xl" style={{ transform: `translate3d(${pos.x * -16}px, ${pos.y * -12 + pY * 0.1}px, 0)`, transition: "transform 0.2s linear" }} />
          <div className="absolute top-0 right-0 w-full h-full" style={{ background: "radial-gradient(ellipse 55% 70% at 85% 15%, rgba(192,155,90,.1) 0%, transparent 60%)", transform: `translateY(${pY * 0.07}px)` }} />
        </div>

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />

        <div className="relative z-10">
          {/* Text block */}
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-white/55 mb-4">
              <span className="w-5 h-px bg-amber-400 rounded" /> Kehidupan Santri
            </div>
            <h2 className="text-white mb-4" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", lineHeight: "1.15" }}>
              Disiplin, <em className="italic text-amber-300">Bersih</em>, Rapi & Terbimbing
            </h2>
            <p className="text-[14px] text-white/60 max-w-xl leading-[1.85] font-light">
              Santri Al Kautsar dibangun dalam satu budaya yang kuat: disiplin dalam waktu dan belajar, bersih dalam lingkungan dan karakter, rapi dalam menempatkan dan menjaga barang pribadi.
            </p>
          </div>

          {/* Stats strip — 2 col mobile, 4 col desktop */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
            {STATS.map(([n, l]) => (
              <div key={l} className="group flex items-center gap-4 bg-white/6 border border-white/10 rounded-xl px-5 py-4 hover:bg-amber-500/20 hover:border-amber-400/30 transition-all duration-300">
                <div className="text-amber-300 group-hover:text-amber-200 transition-colors shrink-0" style={{ ...GILDA_FONT, fontSize: "26px", lineHeight: 1 }}>{n}</div>
                <div className="text-[11px] text-white/50 leading-snug">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />
      </div>
    </Reveal>
  );
}
