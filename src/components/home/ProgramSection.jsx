import { Target, Globe2, FlaskConical, Briefcase, Monitor, ShieldCheck } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const PROGRAMS = [
  { Icon: Target, title: "Tahfidz Al-Qur'an", desc: "Program hafalan Al-Qur'an dengan metode mutqin, rutin setiap hari setelah ashar." },
  { Icon: Globe2, title: "Bahasa Arab Aktif", desc: "Bahasa Arab sebagai bahasa utama lingkungan pesantren dan pengantar ilmu agama. Bahasa Inggris diajarkan sebagai mata pelajaran pendukung." },
  { Icon: FlaskConical, title: "Super Camp UTBK", desc: "Program intensif untuk santri berprestasi mempersiapkan UTBK, SNBP, dan seleksi PTN." },
  { Icon: Briefcase, title: "Wirausaha & Magang", desc: "Agrobisnis, Manajemen Trainee, dan Grafika untuk kelas 12 sebagai bekal karir." },
  { Icon: Monitor, title: "Web Design ITS Tekno", desc: "Pelatihan tersertifikasi bidang teknologi bersama ITS untuk kelas 10 & 11." },
  { Icon: ShieldCheck, title: "Karakter & 5R", desc: "Pembiasaan Ringkas, Rapi, Resik, Rawat, Rajin sebagai pondasi karakter santri." },
];

export default function ProgramSection() {
  return (
    <section className="py-20 lg:py-24 bg-linear-to-b from-slate-50 to-white">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader tag="Program Unggulan" title="Program" italic="Pembentukan Santri" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="group bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-[#284061]/8 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <p.Icon size={20} />
                </div>
                <h3 className="text-[16px] font-bold text-[#284061] mb-2">{p.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed font-light">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}