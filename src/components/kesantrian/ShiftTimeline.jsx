import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

const SHIFTS = [
  { n: "1", t: "Pagi — Siang", h: "05.00 — 13.00", d: "Mendampingi santri dari setelah Subuh, kajian pagi, olahraga, sarapan, dan sesi pembelajaran pagi hingga siang hari." },
  { n: "2", t: "Siang — Malam", h: "13.00 — 21.00", d: "Mendampingi sesi siang hingga malam: Dhuhur, Bahasa Inggris, makan siang, istirahat, Ashar, pembelajaran sore, Maghrib, kajian." },
  { n: "3", t: "Malam — Subuh", h: "21.00 — 05.00", d: "Menjaga keamanan santri sepanjang malam, memastikan istirahat aman hingga persiapan Qiyamul Lail dan Subuh." },
];

export default function ShiftTimeline() {
  return (
    <Reveal>
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
          <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Sistem Pengawasan
        </div>
        <h2 className="mb-3" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,40px)", color: "#284061", lineHeight: "1.15" }}>
          3 Shift Musyrif — <em className="italic text-[#3a5a8c]">Selalu Segar, Selalu Siaga</em>
        </h2>
        <p className="text-[14px] text-slate-500 max-w-xl mb-8 font-light leading-relaxed">
          Pembagian shift memastikan musyrif senantiasa fresh ketika menjalankan tugas, sehingga santri mendapatkan perhatian optimal setiap saat.
        </p>

        <div className="relative pl-16 sm:pl-20">
          <div className="absolute left-6 sm:left-6.5 top-0 bottom-0 w-[1.5px] bg-linear-to-b from-amber-500 to-slate-200" />
          {SHIFTS.map((s) => (
            <div key={s.n} className="relative flex gap-5 py-5 group hover:translate-x-1 transition-transform">
              <div className="absolute -ml-16 sm:-ml-20 w-13 h-13 shrink-0 bg-linear-to-br from-[#284061] to-[#1a2d47] border-2 border-amber-500 rounded-xl flex flex-col items-center justify-center z-10 shadow-lg shadow-[#284061]/25">
                <span className="text-[9px] font-bold tracking-wider text-amber-300 uppercase">Shift</span>
                <span className="text-[13px] font-bold text-white">{s.n}</span>
              </div>
              <div className="pl-4">
                <h3 className="text-[14px] font-bold text-[#284061] mb-1">{s.t}</h3>
                <div className="inline-block text-[11.5px] font-semibold text-[#3a5a8c] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md mb-2">{s.h}</div>
                <p className="text-[13px] text-slate-500 leading-[1.65] font-light">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
