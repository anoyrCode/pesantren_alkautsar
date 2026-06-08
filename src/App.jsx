import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AppRoutes from "./routes/AppRoutes";
import { initGA } from "./utils/analytics";
import usePageTracking from "./hooks/usePageTracking";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Pesantren Al Kautsar",
  "alternateName": "Pondok Pesantren Al Kautsar Sidoarjo",
  "url": "https://pesantrenalkautsar.id",
  "logo": "https://pesantrenalkautsar.id/favicon.png",
  "description": "Lembaga pendidikan Islam modern yang memadukan kurikulum pesantren, nasional, dan internasional untuk mencetak generasi muslim yang berilmu dan berakhlak mulia.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Besuk RT 11 RW 04 Sambungrejo",
    "addressLocality": "Sukodono",
    "addressRegion": "Sidoarjo",
    "postalCode": "61258",
    "addressCountry": "ID"
  },
  "sameAs": []
};

function AppContent() {
  usePageTracking();
  return <AppRoutes />;
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Outfit:wght@300;400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    initGA();

    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(JSON_LD)}
        </script>
      </Helmet>
      <AppContent />
    </>
  );
}
