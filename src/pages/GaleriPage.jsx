import { useState } from "react";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "../utils/constants";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";

export default function GaleriPage() {
  const [filter, setFilter] = useState("all");

  return (
    <section className="pt-10 pb-20 lg:pt-10 lg:pb-24">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader
          tag="Dokumentasi"
          title="Galeri"
          italic="Kehidupan Santri"
          description="Sekilas pandang kegiatan, pembelajaran, dan kehidupan sehari-hari di Pesantren Al Kautsar Sidoarjo"
        />

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

        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            {GALLERY_ITEMS
              .filter((g) => filter === "all" || g.c === filter)
              .map((g, i) => (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:z-10 transition-all duration-300 ${
                    g.cls === "tall" ? "row-span-2" : g.cls === "wide" ? "col-span-2" : ""
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${g.gt} group-hover:scale-110 transition-transform duration-500`}>
                    <g.Icon size={48} className="text-white/70" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#284061]/95 via-[#284061]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="text-[13px] font-bold text-white mb-1">{g.title}</div>
                    <div className="text-[10.5px] text-amber-300 font-bold tracking-wider uppercase">{g.c}</div>
                  </div>
                </div>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}