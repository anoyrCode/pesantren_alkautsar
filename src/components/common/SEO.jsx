import { Helmet } from "react-helmet-async";
import { NAV_LINKS } from "../../utils/constants";

const SITE_NAME = "Pesantren Al Kautsar";
const BASE_URL  = import.meta.env.VITE_SITE_URL || "https://pesantrenalkautsar.id";

/**
 * Menyusun BreadcrumbList dari `path`, jadi tiap halaman tidak perlu menulis
 * jenjangnya sendiri-sendiri — daftar yang ditulis dua kali cepat melenceng.
 *
 * Nama ruas perantara diambil dari NAV_LINKS supaya sama dengan yang tertulis
 * di navbar; ruas terakhir memakai judul halaman. Contoh untuk /ppdb/formulir:
 * Beranda › PPDB › Formulir Pendaftaran PPDB.
 *
 * Beranda sendiri tidak diberi breadcrumb — jenjang berisi satu tingkat tidak
 * memberi tahu Google apa pun.
 */
function breadcrumb(path, title) {
  if (!path || path === "/") return null;

  const ruas = path.split("/").filter(Boolean);
  const daftar = [{ name: "Beranda", url: `${BASE_URL}/` }];

  ruas.forEach((r, i) => {
    const jalur = "/" + ruas.slice(0, i + 1).join("/");
    const terakhir = i === ruas.length - 1;
    const nav = NAV_LINKS.find((l) => l.path === jalur);
    // Ruas perantara yang tidak ada di navbar pun tetap dimasukkan supaya
    // rantainya tidak putus; namanya diambil dari potongan URL-nya.
    const name = terakhir ? title : nav?.label || r.replace(/-/g, " ");
    daftar.push({ name, url: `${BASE_URL}${jalur}` });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: daftar.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      item: d.url,
    })),
  };
}

export default function SEO({ title, description, path = "", image = "/og-image.png" }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Boarding School Islam Modern`;
  const url       = `${BASE_URL}${path}`;
  const imageUrl  = image.startsWith("http") ? image : `${BASE_URL}${image}`;
  const jenjang   = breadcrumb(path, title);

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

      {jenjang && (
        <script type="application/ld+json">{JSON.stringify(jenjang)}</script>
      )}
    </Helmet>
  );
}
