import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/common/SEO";
import { GILDA_FONT, NAV_LINKS } from "../utils/constants";

/**
 * Halaman 404.
 *
 * Sebelumnya rute `*` mengalihkan semua URL tak dikenal ke beranda. Akibatnya
 * setiap alamat ngawur membalas 200 dengan isi beranda, dan Google menandainya
 * "Soft 404" — jatah crawl terbuang untuk halaman yang sebenarnya tidak ada.
 *
 * SPA tidak bisa membalas status 404 dari sisi klien, jadi `noindex` di sinilah
 * yang menjadi penandanya: Google tetap tidak akan mengindeks halaman ini.
 *
 * Tautan ke seluruh halaman utama sengaja disertakan — pengunjung yang tersesat
 * dapat jalan keluar, dan crawler yang mendarat di sini tetap menemukan jalan
 * kembali ke isi situs.
 */
export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak ada atau sudah dipindahkan."
        path="/404"
        noindex
      />

      <section className="-mt-20 min-h-svh bg-[#F6F2EA] flex items-center">
        <div className="w-[min(1180px,92vw)] mx-auto pt-32 pb-24">
          <div className="max-w-xl">
            <div className="text-[11.5px] font-semibold tracking-[0.26em] text-[#1a2d47]/45 uppercase">
              Kesalahan 404
            </div>

            <h1
              className="mt-5 text-[#1a2d47]"
              style={{ ...GILDA_FONT, fontSize: "clamp(38px,7vw,72px)", lineHeight: "1.05" }}
            >
              Halaman ini tidak ada
            </h1>

            <div className="w-14 h-0.75 bg-[#D48C1A] rounded mt-7" />

            <p className="text-[15.5px] leading-[1.9] font-light text-slate-600 mt-6">
              Alamat yang Anda buka mungkin salah ketik, atau halamannya sudah
              dipindahkan. Silakan lanjutkan dari salah satu halaman berikut.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2.25 bg-[#1a2d47] text-white px-7 py-3.75 rounded-xl text-[13.5px] font-semibold shadow-[0_14px_30px_-14px_rgba(26,45,71,.7)] hover:-translate-y-0.5 transition-transform mt-9"
            >
              Kembali ke Beranda <ArrowRight size={15} />
            </Link>

            <nav aria-label="Halaman lain" className="flex flex-wrap gap-x-6 gap-y-3 mt-10">
              {NAV_LINKS.filter((l) => l.path !== "/").map((l) => (
                <Link
                  key={l.id}
                  to={l.path}
                  className="text-[13.5px] font-semibold text-[#1a2d47] border-b-[1.5px] border-[#1a2d47]/25 pb-0.75 hover:border-[#1a2d47]/60 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
