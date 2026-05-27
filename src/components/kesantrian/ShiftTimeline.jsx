import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";
import SplitReveal from "../common/SplitReveal";

const SHIFTS = [
  { n: "1", t: "Pagi — Siang", h: "05.00 — 13.00", d: "Mendampingi santri dari setelah Subuh, kajian pagi, olahraga, sarapan, dan sesi pembelajaran pagi hingga siang hari." },
  { n: "2", t: "Siang — Malam", h: "13.00 — 21.00", d: "Mendampingi sesi siang hingga malam: Dhuhur, Bahasa Inggris, makan siang, istirahat, Ashar, pembelajaran sore, Maghrib, kajian." },
  { n: "3", t: "Malam — Subuh", h: "21.00 — 05.00", d: "Menjaga keamanan santri sepanjang malam, memastikan istirahat aman hingga persiapan Qiyamul Lail dan Subuh." },
];

export default function ShiftTimeline() {
  return (
    <div className="mb-16">
      {/* Tag pill */}
      <Reveal>
        <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
          <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Sistem Pengawasan
        </div>
      </Reveal>

      {/* Heading — letter-by-letter reveal */}
      <h2 className="mb-3" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,40px)", color: "#284061", lineHeight: "1.15" }}>
        <SplitReveal delay={0.05} stagger={0.05}>{"3 Shift Musyrif — "}</SplitReveal>
        <SplitReveal delay={0.55} stagger={0.035} as="em" className="italic text-[#3a5a8c]">
          Selalu Segar, Selalu Siaga
        </SplitReveal>
      </h2>

      {/* Description */}
      <Reveal delay={400}>
        <p className="text-[14px] text-slate-500 max-w-xl mb-8 font-light leading-relaxed">
          Pembagian shift memastikan musyrif senantiasa fresh ketika menjalankan tugas, sehingga santri mendapatkan perhatian optimal setiap saat.
        </p>
      </Reveal>

      <div className="space-y-3">
        {SHIFTS.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <div className="group relative bg-white border border-slate-100 rounded-2xl px-5 py-4 hover:shadow-lg hover:shadow-[#284061]/10 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-default">
              {/* Left amber accent bar */}
              <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-linear-to-b from-amber-400 to-amber-600 rounded-r-full" />
              {/* Hover bg wash */}
              <div className="absolute inset-0 bg-linear-to-r from-[#284061]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex items-start gap-4 pl-3">
                <div className="w-11 h-11 shrink-0 bg-linear-to-br from-[#284061] to-[#1a2d47] rounded-xl flex flex-col items-center justify-center shadow-sm shadow-[#284061]/20 mt-0.5">
                  <span className="text-[7px] font-bold tracking-widest text-amber-300 uppercase leading-none">Shift</span>
                  <span className="text-[16px] font-bold text-white leading-tight mt-0.5">{s.n}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                    <h3 className="text-[14.5px] font-bold text-[#284061]">{s.t}</h3>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">{s.h}</span>
                  </div>
                  <p className="text-[12.5px] text-slate-500 leading-[1.7] font-light">{s.d}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
