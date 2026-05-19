import { useEffect, useState } from "react";

export default function useCountdown(targetDate) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetMs = new Date(targetDate).getTime();

    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          mins: Math.floor((diff / 60000) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return countdown;
}
