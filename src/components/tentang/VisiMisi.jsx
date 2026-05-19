import { GILDA_FONT } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const MISI = [
  "Menyelenggarakan pendidikan aqidah Ahlussunnah yang kuat dan sistematis",
  "Membangun lingkungan berbahasa Arab aktif sebagai dasar memahami ilmu agama",
  "Mengintegrasikan Discovery Task dan bimbel intensif untuk akademik modern",
  "Mengembangkan LMS digital untuk transparansi dan monitoring real-time",
  "Membentuk karakter mandiri, disiplin, dan 5R: Ringkas, Rapi, Resik, Rawat, Rajin",
];

export default function VisiMisi() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader tag="Arah & Tujuan" title="Visi &" italic="Misi" />

        <div className="grid lg:grid-cols-2 gap-5">
          <Reveal>
            <div className="bg-gradient-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-8 lg:p-10 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle,rgba(192,155,90,.12) 0%,transparent 65%)" }} />
              <div className="text-[11px] font-bold tracking-wider uppercase text-amber-300 inline-flex items-center gap-2 mb-4 relative z-10">
                <span className="w-4 h-[1.5px] rounded bg-amber-300" /> Visi
              </div>
              <h3 className="text-[22px] text-white mb-4 relative z-10" style={{ ...GILDA_FONT, lineHeight: "1.3" }}>
                Generasi Muslim yang Lurus, Berilmu & Kompetitif
              </h3>
              <p className="text-[13.5px] text-white/60 leading-[1.8] font-light relative z-10">
                Menjadi lembaga pendidikan Islam terpadu diatas manhaj Ahlussunnah wal Jamaah yang melahirkan generasi muslim berakidah lurus, berilmu, berakhlak mulia, dan kompetitif di era global.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 h-full">
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#284061] inline-flex items-center gap-2 mb-4">
                <span className="w-4 h-[1.5px] rounded bg-[#284061]" /> Misi
              </div>
              <h3 className="text-[22px] text-[#284061] mb-4" style={{ ...GILDA_FONT, lineHeight: "1.3" }}>
                Lima Komitmen Kami
              </h3>
              <ul className="space-y-3 mt-4">
                {MISI.map((t, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-[13px] leading-[1.6] font-light text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}