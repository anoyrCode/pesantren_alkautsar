import { GILDA_FONT } from "../../utils/constants";

export default function BentoCard({ dark, gold, span, tag, num, sub, title, body, emoji, chips, multiStats }) {
  const base = "group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1";
  let bgClass = "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl";
  if (dark) bgClass = "bg-gradient-to-br from-[#284061] to-[#1a2d47] hover:from-[#1a2d47] hover:to-[#142844]";
  if (gold) bgClass = "bg-gradient-to-br from-amber-500 to-amber-600";

  const tagColor = dark ? "text-amber-300" : gold ? "text-white/70" : "text-amber-500";
  const titleColor = dark || gold ? "text-white" : "text-[#284061]";
  const bodyColor = dark ? "text-white/50" : gold ? "text-white/85" : "text-slate-500";
  const numColor = dark || gold ? "text-white" : "text-[#284061]";
  const subColor = dark ? "text-white/40" : "text-slate-400";

  return (
    <div className={`${base} ${bgClass} ${span}`}>
      <span className={`text-[10px] font-bold tracking-wider uppercase mb-2 block ${tagColor}`}>{tag}</span>
      {multiStats ? (
        <>
          <div className="flex gap-5 flex-wrap mb-2">
            {multiStats.map(([n, s, t], i) => (
              <div key={i}>
                <div className={`${numColor} leading-none mb-1`} style={{ ...GILDA_FONT, fontSize: "clamp(24px,3vw,36px)" }}>
                  {n}{s && <sub className={`text-[.36em] ${subColor}`}>{s}</sub>}
                </div>
                <div className={`text-[13px] font-semibold ${titleColor}`}>{t}</div>
              </div>
            ))}
          </div>
          <div className={`text-[13px] ${bodyColor} leading-[1.6] font-light`}>{body}</div>
        </>
      ) : num ? (
        <>
          <div className={`${numColor} leading-none mb-1.5`} style={{ ...GILDA_FONT, fontSize: "clamp(32px,4vw,48px)", letterSpacing: "-.02em" }}>
            {num}{sub && <sub className={`text-[.36em] font-normal ${subColor}`}>{sub}</sub>}
          </div>
          <div className={`text-[15px] font-semibold mb-2 ${titleColor}`}>{title}</div>
          <div className={`text-[13px] ${bodyColor} leading-[1.6] font-light`}>{body}</div>
        </>
      ) : (
        <>
          <div className={`text-[15px] font-semibold mb-2 ${titleColor}`}>{title}</div>
          <div className={`text-[13px] ${bodyColor} leading-[1.6] font-light max-w-sm`}>{body}</div>
        </>
      )}

      {chips && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {chips.map((c) => (
            <span key={c} className={`px-2.5 rounded-full text-[11px] font-semibold ${dark || gold ? "bg-white/[.08] border border-white/[.12] text-white/65" : "bg-slate-100 border border-slate-200 text-[#3a5a8c]"}`}>
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="absolute -bottom-4 -right-3 text-[84px] opacity-[.06] group-hover:opacity-[.1] group-hover:rotate-6 group-hover:scale-110 transition-all pointer-events-none">{emoji}</div>
    </div>
  );
}