import { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { apiFetch } from "../utils/api";

export default function GaleriPage() {
  const [photos, setPhotos]   = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]           = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/galeri").then((r) => r.json()),
      apiFetch("/api/galeri/kategori").then((r) => r.json()),
    ])
      .then(([pJson, kJson]) => {
        setPhotos(pJson.data || []);
        setKategori(kJson.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => filter === "all" ? photos : photos.filter((p) => String(p.kategori_id) === String(filter)),
    [photos, filter]
  );

  // Tutup lightbox saat filter berubah (hindari index out-of-range)
  useEffect(() => { setLightboxIdx(null); }, [filter]);

  // Scroll lock saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const prev = useCallback(() =>
    setLightboxIdx((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() =>
    setLightboxIdx((i) => (i + 1) % filtered.length), [filtered.length]);
  const close = useCallback(() => setLightboxIdx(null), []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    function onKey(e) {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, prev, next, close]);

  return (
    <>
      <SEO
        title="Galeri"
        description="Galeri foto dan dokumentasi kegiatan Pesantren Al Kautsar — kehidupan santri, kegiatan belajar, ibadah, olahraga, dan berbagai program unggulan pesantren."
        path="/galeri"
      />
      <section className="pt-10 pb-20 lg:pt-10 lg:pb-24">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <SectionHeader
            as="h1"
            tag="Dokumentasi"
            title="Galeri"
            italic="Kehidupan Santri"
            description="Sekilas pandang kegiatan, pembelajaran, dan kehidupan sehari-hari di Pesantren Al Kautsar Sidoarjo"
          />

          {/* Filter pills */}
          {!loading && kategori.length > 0 && (
            <Reveal>
              <div className="flex gap-2 flex-wrap justify-center mb-10">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                    filter === "all"
                      ? "bg-[#284061] text-white shadow-lg shadow-[#284061]/25 -translate-y-0.5"
                      : "bg-white border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Semua
                </button>
                {kategori.map((k) => (
                  <button
                    key={k.id}
                    onClick={() => setFilter(String(k.id))}
                    className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                      filter === String(k.id)
                        ? "bg-[#284061] text-white shadow-lg shadow-[#284061]/25 -translate-y-0.5"
                        : "bg-white border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {k.nama}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {/* Grid seragam */}
          {loading ? (
            <p className="text-center text-slate-400 text-sm py-10">Memuat galeri...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-10">Belum ada foto galeri.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((photo, i) => (
                <div
                  key={photo.id}
                  role="button"
                  tabIndex={0}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-4/3"
                  style={{
                    animation: "galleryFadeUp 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
                    animationDelay: `${Math.min(i * 0.055, 0.55)}s`,
                    opacity: 0,
                  }}
                  onClick={() => setLightboxIdx(i)}
                  onKeyDown={(e) => e.key === "Enter" && setLightboxIdx(i)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#284061]/90 via-[#284061]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-[13px] font-bold leading-tight mb-1">{photo.caption}</p>
                    {photo.kategori && (
                      <span className="text-amber-300 text-[10px] font-bold tracking-wider uppercase">
                        {photo.kategori}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox — render via portal ke document.body agar tidak terjebak containing block ancestor (overflow-x-hidden di MainLayout) */}
      {lightboxIdx !== null && filtered[lightboxIdx] && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox galeri foto"
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center"
          onClick={close}
        >
          {/* Kontainer foto */}
          <div
            className="relative flex flex-col items-center gap-3 px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIdx].url}
              alt={filtered[lightboxIdx].caption}
              className="max-h-[80vh] max-w-[calc(100vw-8rem)] rounded-xl object-contain shadow-2xl"
            />
            <div className="flex flex-col items-center gap-1">
              <p className="text-white text-[14px] font-semibold">{filtered[lightboxIdx].caption}</p>
              {filtered[lightboxIdx].kategori && (
                <span className="text-amber-400 text-[11px] font-bold tracking-wider uppercase">
                  {filtered[lightboxIdx].kategori}
                </span>
              )}
              <p className="text-white/40 text-[11px]">{lightboxIdx + 1} / {filtered.length}</p>
            </div>
          </div>

          {/* Prev */}
          <button
            aria-label="Foto sebelumnya"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            aria-label="Foto berikutnya"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
          >
            <ChevronRight size={22} />
          </button>

          {/* Close */}
          <button
            aria-label="Tutup lightbox"
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
