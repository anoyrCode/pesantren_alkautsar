import { Helmet } from "react-helmet-async";

const SITE_NAME = "Pesantren Al Kautsar";
const BASE_URL  = import.meta.env.VITE_SITE_URL || "https://alkautsar.sch.id";

export default function SEO({ title, description, path = "", image = "/og-image.png" }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Boarding School Islam Modern`;
  const url       = `${BASE_URL}${path}`;
  const imageUrl  = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={imageUrl} />
    </Helmet>
  );
}
