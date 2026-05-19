import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { initGA } from "./utils/analytics";
import usePageTracking from "./hooks/usePageTracking";

function AppContent() {
  usePageTracking();
  return <AppRoutes />;
}

export default function App() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Outfit:wght@300;400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Init Google Analytics
    initGA();

    return () => document.head.removeChild(link);
  }, []);

  return <AppContent />;
}
