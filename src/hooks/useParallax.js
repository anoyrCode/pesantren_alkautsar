import { useEffect, useRef, useState } from "react";

export default function useParallax(speed = 0.25) {
  const ref = useRef(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf;
    function update() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setY((window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed);
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return { ref, y };
}
