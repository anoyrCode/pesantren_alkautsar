import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/**
 * Reveals text letter-by-letter on scroll:
 * opacity 0→1, translateY 16px→0, blur 3px→0
 *
 * Props:
 *   children  — text string
 *   delay     — seconds before first letter starts (default 0.05)
 *   stagger   — seconds between each letter (default 0.06)
 *   as        — wrapper tag: "span" | "em" | "h2" etc. (default "span")
 *   className — classes applied to wrapper tag
 */
export default function SplitReveal({
  children,
  delay = 0.05,
  stagger = 0.06,
  as: As = "span",
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const text = String(children);
  const chars = text.split("");

  return (
    <As ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) =>
        char === " " ? (
          <span key={i} aria-hidden="true"> </span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              filter: visible ? "blur(0px)" : "blur(3px)",
              transition: visible
                ? `opacity 0.45s ease, transform 0.55s ${EASE}, filter 0.4s ease`
                : "none",
              transitionDelay: visible ? `${(delay + i * stagger).toFixed(3)}s` : "0s",
            }}
          >
            {char}
          </span>
        )
      )}
    </As>
  );
}
