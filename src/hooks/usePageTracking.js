import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/analytics";

const PAGE_TITLES = {
  "/":              "Beranda — Pesantren Al Kautsar",
  "/tentang":       "Tentang Kami — Pesantren Al Kautsar",
  "/kurikulum":     "Kurikulum — Pesantren Al Kautsar",
  "/kesantrian":    "Kesantrian — Pesantren Al Kautsar",
  "/galeri":        "Galeri — Pesantren Al Kautsar",
  "/ppdb":          "PPDB — Pesantren Al Kautsar",
  "/ppdb/formulir": "Formulir Pendaftaran — Pesantren Al Kautsar",
};

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || document.title;
    document.title = title;
    trackPageView(location.pathname + location.search, title);
  }, [location]);
}
