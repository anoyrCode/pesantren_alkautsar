import { ArrowRight } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";

export default function CTABlock({
  title, emTitle, sub, onPrimary, onSecondary,
  primaryLabel = "Daftar PPDB", secondaryLabel,
}) {
  return (
    <div className="bg-linear-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 30% 50%,rgba(192,155,90,.12) 0%,transparent 55%),radial-gradient(ellipse 40% 60% at 70% 50%,rgba(255,255,255,.04) 0%,transparent 55%)" }} />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-300 text-[11px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5">
          Pesantren Al Kautsar Sidoarjo
        </div>
        <h2 className="text-white mb-4" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,44px)", lineHeight: "1.15" }}>
          {title}<br /><em className="italic text-amber-300">{emTitle}</em>
        </h2>
        <p className="text-[15px] text-white/55 mb-8 max-w-md mx-auto font-light">{sub}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={onPrimary} className="inline-flex items-center gap-2 bg-linear-to-br from-amber-500 to-amber-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all hover:cursor-pointer">
            {primaryLabel} <ArrowRight size={16} />
          </button>
          {secondaryLabel && (
            <button onClick={onSecondary} className="inline-flex items-center gap-2 text-white px-7 py-3.5 border border-white/25 rounded-xl text-sm font-semibold hover:bg-white/10 hover:border-white/50 transition-all hover:cursor-pointer">
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
