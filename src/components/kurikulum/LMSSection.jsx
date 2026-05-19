import { BarChart3, Smartphone, Users } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";
import lms from "../../assets/lms.png";
import lms2 from "../../assets/lms2.png"

const FEATURES = [
  [BarChart3, "Penilaian Real-Time", "Nilai, absensi, dan poin karakter santri dapat dipantau langsung oleh guru, santri, dan orang tua setiap saat."],
  [Smartphone, "Dashboard Digital", "Setiap capaian belajar tercatat otomatis, mendukung pembelajaran yang transparan, adaptif, dan berorientasi pada pertumbuhan santri."],
  [Users, "Multi-Role: Musyrif, Guru & Admin", "Setiap peran memiliki akses dan fitur tersendiri — poin keseharian, nilai mapel, absensi, dan wali kelas tersentralisasi."],
];

export default function LMSSection() {
  return (
    <div className="mt-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal direction="left">
          <div className="rounded-2xl border-4 border-slate-500/50 overflow-hidden shadow-xl">
            <img src={lms2} alt="LMS Dashboard" className="w-full"/>
          </div>
        </Reveal>

        

        <Reveal direction="right">
          <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
            <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Teknologi Digital
          </div>
          <h2 className="mb-4" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", color: "#284061", lineHeight: "1.15" }}>
            LMS <em className="italic text-amber-500">Al Kautsar</em>
          </h2>
          <p className="text-[15px] leading-[1.82] font-light text-slate-600 mb-6">
            Transformasi pendidikan pesantren berbasis digital — memudahkan proses belajar, kolaborasi guru-santri, dan pelibatan orang tua secara transparan.
          </p>
          <ul className="space-y-4">
            {FEATURES.map(([Icon, t, d]) => (
              <li key={t} className="flex gap-3.5 items-start">
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="text-[13.5px] font-bold text-[#284061] mb-1">{t}</div>
                  <div className="text-[12.5px] text-slate-500 leading-[1.6] font-light">{d}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}