import { ArrowRight } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";

// Kembali berupa kotak, tanpa foto. Versi pita berfoto selebar layar terlalu
// ramai untuk sebuah penutup halaman.
//
// Kotaknya sengaja lebih sempit dari container halaman (880px, bukan 1180px).
// Itu yang dulu bikin versi rata-kiri terlihat kosong: kotaknya selebar
// halaman sementara isinya dibatasi, jadi separuh kanan menganga. Dengan kotak
// yang lebih sempit, isi mengisi penuh dan tidak perlu perataan tengah sebagai
// penopang.
//
// Merender <section> sendiri berikut jarak atas-bawahnya — halaman pemakai
// tidak perlu membungkusnya lagi.
export default function CTABlock({
  title, emTitle, sub, onPrimary, onSecondary,
  primaryLabel = "Daftar PPDB", secondaryLabel,
}) {
  return (
    <section className="py-16 lg:py-20">
      <div className="w-[min(880px,92vw)] mx-auto">
        <div className="rounded-3xl bg-[#1a2d47] px-8 py-11 lg:px-12 lg:py-13 shadow-[0_30px_60px_-32px_rgba(26,45,71,.45)]">
          <h2 className="text-white" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.2vw,40px)", lineHeight: "1.14" }}>
            {title}<br /><em className="italic text-amber-300">{emTitle}</em>
          </h2>

          <p className="text-[14.5px] leading-[1.85] text-white/60 font-light mt-4.5">{sub}</p>

          <div className="flex flex-wrap items-center gap-6 mt-8">
            <button
              onClick={onPrimary}
              className="inline-flex items-center gap-2.25 bg-[#D48C1A] text-white px-6.5 py-3.5 rounded-xl text-[13.5px] font-semibold hover:bg-[#c07f16] transition-colors hover:cursor-pointer"
            >
              {primaryLabel} <ArrowRight size={15} />
            </button>
            {secondaryLabel && (
              <button
                onClick={onSecondary}
                className="text-[13.5px] font-semibold text-white border-b-[1.5px] border-white/30 pb-0.75 hover:border-white/70 transition-colors hover:cursor-pointer"
              >
                {secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
