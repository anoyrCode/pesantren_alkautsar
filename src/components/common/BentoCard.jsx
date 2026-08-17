import { GILDA_FONT } from "../../utils/constants";

// Dua material saja, dan aturannya tetap: navy untuk pilar utama, krem untuk
// pendukung. Varian emas dihapus — dulu dipakai kartu SIPOS, yang membuatnya
// jadi benda paling mencolok di halaman padahal SIPOS sistem pendukung, bukan
// klaim utama. Bobot visual harus mengikuti kepentingan.
export default function BentoCard({ dark, span, tag, num, sub, title, body, multiStats }) {
  const base = "relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1";

  // Solid, bukan gradasi. Gradasi lama (#284061 → #1a2d47) hanya berbeda tipis
  // dan terbaca sebagai "gradasi karena gradasi", bukan sebagai cahaya.
  const bgClass = dark
    ? "bg-[#1a2d47] shadow-[0_24px_50px_-28px_rgba(26,45,71,.5)]"
    : "bg-[#FBF9F4] shadow-[0_14px_34px_-22px_rgba(26,45,71,.32)]";

  const tagColor   = dark ? "text-amber-400/90" : "text-[#B5760F]";
  const titleColor = dark ? "text-white" : "text-[#1a2d47]";
  const bodyColor  = dark ? "text-white/55" : "text-slate-500";
  const numColor   = dark ? "text-white" : "text-[#1a2d47]";
  const subColor   = dark ? "text-white/40" : "text-slate-400";

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
    </div>
  );
}
