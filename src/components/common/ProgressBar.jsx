import { useEffect, useRef, useState } from "react";
import { GILDA_FONT } from "../../utils/constants";

export default function ProgressBar({ width, label, value, pct, icon: Icon }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimate(true); obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white/[0.05] border border-white/8 rounded-2xl p-4 hover:bg-white/[0.08] transition-colors duration-200">
      <div className="flex justify-between items-center mb-3">
        <span className="flex items-center gap-2.5 text-[13px] font-medium text-white/80">
          {Icon && (
            <span className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
              <Icon size={13} className="text-amber-300" />
            </span>
          )}
          {label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[22px] leading-none text-amber-300" style={GILDA_FONT}>{value}</span>
          {pct && <span className="text-[11px] text-white/25">{pct}</span>}
        </div>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-amber-600 to-amber-300 origin-left transition-transform duration-[1400ms] ease-out"
          style={{ transform: animate ? `scaleX(${width / 100})` : "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
