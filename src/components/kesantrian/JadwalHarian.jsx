import { Sunrise, Sun, Moon } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";
import SplitReveal from "../common/SplitReveal";

const JADWAL = [
  {
    Icon: Sunrise,
    t: "Pagi Hari",
    r: "03.00 — 13.00",
    headerCls: "from-amber-500 to-amber-600",
    dot: "#d97706",
    list: [
      ["Qiyamul Lail", "03.00"],
      ["Sholat Subuh Berjamaah", "05.00"],
      ["Kajian Pagi & Tahfidz", "05.30"],
      ["Olahraga & 5R", "06.15"],
      ["Sarapan Bergizi", "06.45"],
      ["Pembelajaran Sesi I", "07.30"],
      ["Pembelajaran Sesi II", "10.00"],
    ],
  },
  {
    Icon: Sun,
    t: "Siang Hari",
    r: "13.00 — 17.00",
    headerCls: "from-[#284061] to-[#1a2d47]",
    dot: "#284061",
    list: [
      ["Sholat Dhuhur Berjamaah", "12.00"],
      ["Bahasa Inggris Intensif", "12.30"],
      ["Makan Siang Bergizi", "12.50"],
      ["Istirahat / Qailulah", "13.00"],
      ["Sholat Ashar Berjamaah", "15.30"],
      ["Pembelajaran Tahfidzul Quran", "16.00"],
      ["Murojaah", "17.00"],
    ],
  },
  {
    Icon: Moon,
    t: "Malam Hari",
    r: "18.00 — 03.00",
    headerCls: "from-[#1a2d47] to-[#0d1929]",
    dot: "#64748b",
    list: [
      ["Sholat Maghrib Berjamaah", "18.00"],
      ["Kajian ba'da maghrib", "18.30"],
      ["Sholat Isya Berjamaah", "19.00"],
      ["Hafalan Mutun Tauhid dan Hadist", "19.30"],
      ["Jajan ke kantin", "19.45"],
      ["Istirahat Malam", "22.00"],
    ],
  },
];

export default function JadwalHarian() {
  return (
    <div className="mb-14">
      {/* Tag pill */}
      <Reveal>
        <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
          <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Rutinitas Harian
        </div>
      </Reveal>

      {/* Heading — letter-by-letter reveal */}
      <h2 className="mb-7" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,40px)", color: "#284061", lineHeight: "1.15" }}>
        <SplitReveal delay={0.05} stagger={0.06}>Jadwal</SplitReveal>
        {" "}
        <SplitReveal delay={0.35} stagger={0.045} as="em" className="italic text-amber-500">
          Harian Santri
        </SplitReveal>
      </h2>

      <div className="grid lg:grid-cols-3 gap-5">
        {JADWAL.map((j, k) => (
          <Reveal key={k} delay={k * 80}>
            <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#284061]/8 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
              {/* Time-of-day themed header */}
              <div className={`bg-linear-to-br ${j.headerCls} p-5 flex items-center gap-3 relative overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                />
                <div className="relative z-10 w-10 h-10 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center text-white">
                  <j.Icon size={18} />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-[14px] font-bold text-white">{j.t}</div>
                  <div className="text-[11px] text-white/55">{j.r}</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-white/20 to-transparent" />
              </div>

              {/* Schedule rows */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {j.list.map(([act, time], i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center py-2.5 gap-3 ${i < j.list.length - 1 ? "border-b border-slate-50" : ""}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0 opacity-60"
                          style={{ backgroundColor: j.dot }}
                        />
                        <span className="text-[12.5px] text-slate-700 font-medium leading-snug">{act}</span>
                      </div>
                      <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg tabular-nums shrink-0">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
