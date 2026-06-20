import { ShieldCheck, BookOpen, Users, Wifi, Clock, Award } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const KEUNGGULAN = [
  {
    icon: ShieldCheck,
    title: "Manhaj Ahlussunnah",
    body: "Aqidah lurus berbasis Al-Qur'an dan As-Sunnah sesuai pemahaman salafush shalih, jauh dari bid'ah dan khurafat.",
  },
  {
    icon: BookOpen,
    title: "Kurikulum Terpadu",
    body: "Memadukan kurikulum Kemenag & Kemdikbud dengan sistem kepesantrenan 6 tahun — Diniyah dan Umum berjalan seimbang.",
  },
  {
    icon: Users,
    title: "Musyrif 3 Shift 24 Jam",
    body: "Pengawasan penuh oleh musyrif berpengalaman dengan rasio 1:10. Anti-bullying, anti-LGBT, lingkungan aman dan kondusif.",
  },
  {
    icon: Wifi,
    title: "SIPOS Digital Real-Time",
    body: "Orang tua bisa pantau poin perilaku dan rekam medis santri kapan saja melalui dashboard SIPOS Al Kautsar.",
  },
  {
    icon: Clock,
    title: "Jadwal Terstruktur",
    body: "Mulai dari tahajud, muroja'ah, belajar, olahraga, hingga istirahat — semua terjadwal rapi membentuk karakter disiplin.",
  },
  {
    icon: Award,
    title: "Rekam Jejak Prestasi",
    body: "Alumni Al Kautsar telah diterima di PTN terkemuka. Program Super Camp UTBK & kerjasama ITS Tekno Web Design.",
  },
];

export default function PPDBTestimoni() {
  return (
    <section className="py-20 lg:py-24 bg-linear-to-b from-slate-50 to-white">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader
          tag="Keunggulan"
          title="Kenapa Pilih"
          italic="Al Kautsar?"
          description="Bukan sekadar pesantren biasa — Al Kautsar memadukan aqidah, akademik, dan karakter dalam satu sistem kepesantrenan yang terukur"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {KEUNGGULAN.map((k, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                <div className="w-11 h-11 rounded-xl bg-[#284061]/8 flex items-center justify-center mb-4">
                  <k.icon size={20} className="text-[#284061]" />
                </div>
                <div className="text-[15px] font-bold text-[#284061] mb-2">{k.title}</div>
                <p className="text-[13px] text-slate-500 leading-[1.7] font-light">{k.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
