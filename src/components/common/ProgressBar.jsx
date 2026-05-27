import { useEffect, useRef, useState } from "react";
import { GILDA_FONT } from "../../utils/constants";

export default function ProgressBar({ width, label, value, icon: Icon }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="flex items-center gap-2 text-[13px] font-medium text-white/80">
          {Icon && <Icon size={14} className="text-amber-300 shrink-0" />}
          {label}
        </span>
        <span className="text-[20px] text-amber-300" style={GILDA_FONT}>{value}</span>
      </div>
      <div className="h-[6px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-amber-500 to-amber-300 origin-left transition-transform duration-[1250ms] ease-out"
          style={{ transform: animate ? `scaleX(${width / 100})` : "scaleX(0)" }}
        />
      </div>
    </div>
  );
}