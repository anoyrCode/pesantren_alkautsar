import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, className = "", as: As = "div", direction = "up" }) {
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
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const translate =
    direction === "left" ? "-translate-x-6" : direction === "right" ? "translate-x-6" : "translate-y-6";
  return (
    <As
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translate}`
      } ${className}`}
    >
      {children}
    </As>
  );
}