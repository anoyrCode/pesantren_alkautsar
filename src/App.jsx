import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  // Load fonts once
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Outfit:wght@300;400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return <AppRoutes />;
}
