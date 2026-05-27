import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export default function Reveal({ children, delay = 0, className = "", as: As = "div", direction = "up", blur = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const tx =
    direction === "left"  ? "-38px,0,0"  :
    direction === "right" ? "38px,0,0"   :
    direction === "down"  ? "0,-28px,0"  :
                            "0,40px,0";

  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0,0,0) scale(1)"
          : `translate3d(${tx}) scale(0.97)`,
        filter: blur ? (visible ? "blur(0px)" : "blur(8px)") : undefined,
        transition: visible
          ? `opacity 0.85s ${EASE}, transform 0.85s ${EASE}${blur ? ", filter 0.65s ease" : ""}`
          : undefined,
      }}
    >
      {children}
    </As>
  );
}
