import { Sunrise, Sun, Moon } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

const JADWAL = [
  { Icon: Sunrise, t: "Pagi Hari", r: "03.00 — 13.00", list: [["Qiyamul Lail", "03.00"], ["Sholat Subuh Berjamaah", "05.00"], ["Kajian Pagi & Tahfidz", "05.30"], ["Olahraga & 5R", "06.15"], ["Sarapan Bergizi", "06.45"], ["Pembelajaran Sesi I", "07.30"], ["Pembelajaran Sesi II", "10.00"]] },
  { Icon: Sun, t: "Siang Hari", r: "13.00 — 17.00", list: [["Sholat Dhuhur Berjamaah", "12.00"], ["Bahasa Inggris Intensif", "12.30"], ["Makan Siang Bergizi", "12.50"], ["Istirahat / Qailulah", "13.00"], ["Sholat Ashar Berjamaah", "15.30"], ["Pembelajaran Tahfidzul Quran", "16.00"],['Murojaah','17.00']] },
  { Icon: Moon, t: "Malam Hari", r: "18.00 — 03.00", list: [["Sholat Maghrib Berjamaah", "18.00"], ["Kajian ba'da maghrib", "18.30"], ["Sholat Isya Berjamaah", "19.00"], ["Hafalan Mutun Tauhid dan Hadist", "19.30"],['Jajan ke kantin','19.45'] ,["Istirahat Malam", "22.00"]] },
];

export default function JadwalHarian() {
  return (
    <Reveal>
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
          <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Rutinitas Harian
        </div>
        <h2 className="mb-7" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,40px)", color: "#284061", lineHeight: "1.15" }}>
          Jadwal <em className="italic text-amber-500">Harian Santri</em>
        </h2>

        <div className="grid lg:grid-cols-3 gap-5">
          {JADWAL.map((j, k) => (
            <Reveal key={k} delay={k * 80}>
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="bg-gradient-to-br from-[#284061] to-[#1a2d47] p-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center text-white">
                    <j.Icon size={18} />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-white">{j.t}</div>
                    <div className="text-[11px] text-white/50">{j.r}</div>
                  </div>
                </div>
                <div className="p-5 px-6">
                  {j.list.map(([act, time], i) => (
                    <div key={i} className={`flex justify-between items-center py-2.5 ${i < j.list.length - 1 ? "border-b border-dashed border-slate-100" : ""} hover:translate-x-1 transition-transform`}>
                      <span className="text-[12.5px] text-slate-900 font-medium">{act}</span>
                      <span className="text-[11px] font-bold text-[#284061] bg-slate-100 px-2.5 py-1 rounded-md">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}