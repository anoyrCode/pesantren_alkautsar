import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

const STATS = [["901", "Santri Aktif"], ["24h", "Pengawasan"], ["1:10", "Rasio Musyrif"], ["110", "CCTV Aktif"]];

export default function KesantrianBanner() {
  return (
    <Reveal>
      <div className="bg-gradient-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-9 lg:p-14 relative overflow-hidden mb-14">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 80% 20%,rgba(192,155,90,.12) 0%,transparent 55%)" }} />
        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-white/55 mb-4">
              <span className="w-5 h-[1.5px] bg-amber-400 rounded" /> Kehidupan Santri
            </div>
            <h2 className="text-white mb-4" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", lineHeight: "1.15" }}>
              Disiplin, <em className="italic text-amber-300">Bersih</em>, Rapi & Terbimbing
            </h2>
            <p className="text-[14px] text-white/60 max-w-lg leading-[1.85] font-light">
              Santri Al Kautsar dibangun dalam satu budaya yang kuat: disiplin dalam waktu dan belajar, bersih dalam lingkungan dan karakter, rapi dalam menempatkan dan menjaga barang pribadi.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-72">
            {STATS.map(([n, l]) => (
              <div key={l} className="bg-white/[.06] border border-white/[.1] rounded-xl p-4 text-center hover:bg-amber-500/15 hover:scale-105 transition-all">
                <div className="text-amber-300 mb-1.5" style={{ ...GILDA_FONT, fontSize: "28px", lineHeight: 1 }}>{n}</div>
                <div className="text-[10.5px] text-white/45 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}