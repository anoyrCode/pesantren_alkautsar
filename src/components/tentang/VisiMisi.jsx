import { GILDA_FONT } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const MISI = [
  "Menyelenggarakan pendidikan aqidah Ahlussunnah yang kuat dan sistematis serta membangun lingkungan berbahasa Arab aktif sebagai dasar memahami ilmu agama",
  "Bimbingan belajar intensif untuk perguruan tinggi nasional dan internasional melalui program Super Camp",
  "Membentuk pribadi taat bernegara dan terhindar dari pemikiran terorisme dan radikalisme",
  "Membentuk kebiasaan mulia",
];

export default function VisiMisi() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader tag="Arah & Tujuan" title="Visi &" italic="Misi" />

        <div className="grid lg:grid-cols-2 gap-6 mt-4">

          {/* VISI */}
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#1a2d47] via-[#284061] to-[#2d4a72] p-10 lg:p-12 h-full flex flex-col justify-between min-h-[380px]">
              {/* top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-amber-400/60 to-transparent" />
              {/* glow orb kanan atas */}
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,140,26,.22) 0%, transparent 60%)" }} />
              {/* glow orb kiri bawah */}
              <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,.10) 0%, transparent 65%)" }} />
              {/* dekorasi angka besar di latar */}
              <div className="absolute -bottom-6 -right-3 leading-none select-none pointer-events-none text-white/[0.04]" style={{ ...GILDA_FONT, fontSize: "160px" }}>
                ١
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2.5 mb-7">
                  <div className="w-5 h-[1.5px] rounded-full bg-amber-400" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-amber-400">Visi</span>
                </div>

                <h3 className="text-white mb-5 leading-[1.25]" style={{ ...GILDA_FONT, fontSize: "clamp(22px,2.3vw,30px)" }}>
                  Mencetak Generasi Bermanhaj Ahlussunnah wal Jama'ah
                </h3>

                <p className="text-white/55 text-[13.5px] leading-[1.9] font-light max-w-sm">
                  Menjadi lembaga pendidikan Islam terpadu di atas manhaj Ahlussunnah wal Jama'ah yang melahirkan generasi muslim berakidah lurus, berilmu, berakhlak mulia, dan kompetitif di era global.
                </p>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                <span className="text-[11.5px] text-white/35 tracking-wide font-light">Pesantren Al Kautsar · Sidoarjo</span>
              </div>
            </div>
          </Reveal>

          {/* MISI */}
          <Reveal delay={120}>
            <div className="bg-white border border-slate-100 rounded-3xl p-10 lg:p-12 h-full shadow-sm shadow-slate-100">
              <div className="inline-flex items-center gap-2.5 mb-7">
                <div className="w-5 h-[1.5px] rounded-full bg-amber-500" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-amber-500">Misi</span>
              </div>

              <h3 className="text-[#284061] mb-8 leading-[1.3]" style={{ ...GILDA_FONT, fontSize: "clamp(20px,2vw,26px)" }}>
                Empat Komitmen Kami
              </h3>

              <div>
                {MISI.map((t, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 py-5 ${i < MISI.length - 1 ? "border-b border-slate-100" : ""}`}
                  >
                    {/* nomor amber */}
                    <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mt-0.5 shadow-sm shadow-amber-200">
                      <span className="text-[11px] font-bold text-white" style={GILDA_FONT}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {/* teks */}
                    <div className="flex flex-col gap-0.5 pt-1">
                      <p className="text-[13px] leading-[1.8] text-slate-600 font-light">{t}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* footer accent */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-2">
                <div className="flex gap-1">
                  {[0,1,2,3].map(i => (
                    <div key={i} className={`h-1 rounded-full ${i === 0 ? "w-6 bg-amber-500" : "w-1.5 bg-slate-200"}`} />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-light ml-1">4 komitmen utama kami</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
