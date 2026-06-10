import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AppRoutes from "./routes/AppRoutes";
import { initGA } from "./utils/analytics";
import usePageTracking from "./hooks/usePageTracking";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Pesantren Al Kautsar",
  "alternateName": ["Pondok Pesantren Al Kautsar Sidoarjo", "PP Al Kautsar"],
  "url": "https://pesantrenalkautsar.id",
  "logo": "https://pesantrenalkautsar.id/favicon.png",
  "image": "https://pesantrenalkautsar.id/og-image.png",
  "description": "Lembaga pendidikan Islam modern yang memadukan kurikulum pesantren, nasional, dan internasional untuk mencetak generasi muslim yang berilmu dan berakhlak mulia.",
  "telephone": "+62-822-4169-6699",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Besuk RT 11 RW 04 Sambungrejo",
    "addressLocality": "Sukodono",
    "addressRegion": "Sidoarjo",
    "postalCode": "61258",
    "addressCountry": "ID"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Sidoarjo, Jawa Timur"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "admissions",
      "name": "Humas Putra",
      "telephone": "+62-822-4169-6699",
      "areaServed": "ID",
      "availableLanguage": ["id"]
    },
    {
      "@type": "ContactPoint",
      "contactType": "admissions",
      "name": "Humas Putri",
      "telephone": "+62-851-8607-7077",
      "areaServed": "ID",
      "availableLanguage": ["id"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/share/18pHZcpQzX/",
    "https://www.instagram.com/pesantrenalkautsarsidoarjo",
    "https://m.youtube.com/@pesantrenalkautsarsidoarjo"
  ]
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
