import { useState, useEffect, useCallback, useMemo } from "react";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "../utils/constants";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const CATEGORY_LABEL = { pembelajaran: "Pembelajaran", fasilitas: "Fasilitas", kajian: "Kajian", kegiatan: "Kegiatan" };

export default function GaleriPage() {
  const [filter, setFilter]           = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = useMemo(
    () => filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter),
    [filter]
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
            tag="Dokumentasi"
            title="Galeri"
            italic="Kehidupan Santri"
            description="Sekilas pandang kegiatan, pembelajaran, dan kehidupan sehari-hari di Pesantren Al Kautsar Sidoarjo"
          />

          {/* Filter pills */}
          <Reveal>
            <div className="flex gap-2 flex-wrap justify-center mb-10">
              {GALLERY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                    filter === f.id
                      ? "bg-[#284061] text-white shadow-lg shadow-[#284061]/25 -translate-y-0.5"
                      : "bg-white border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid seragam */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((photo, i) => (
              <div
                key={`${filter}-${i}`}
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
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#284061]/90 via-[#284061]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-[13px] font-bold leading-tight mb-1">{photo.alt}</p>
                  <span className="text-amber-300 text-[10px] font-bold tracking-wider uppercase">
                    {CATEGORY_LABEL[photo.category]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
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
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              className="max-h-[80vh] max-w-[calc(100vw-8rem)] rounded-xl object-contain shadow-2xl"
            />
            <div className="flex flex-col items-center gap-1">
              <p className="text-white text-[14px] font-semibold">{filtered[lightboxIdx].alt}</p>
              <span className="text-amber-400 text-[11px] font-bold tracking-wider uppercase">
                {CATEGORY_LABEL[filtered[lightboxIdx].category]}
              </span>
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
        </div>
      )}
    </>
  );
}
