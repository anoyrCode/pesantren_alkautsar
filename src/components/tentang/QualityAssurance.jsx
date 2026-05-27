import { GraduationCap, Flag, Sparkles } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const QA = [
  { Icon: GraduationCap, t: "Kemurnian Aqidah", n: "01", list: ["Menanamkan akidah Ahlussunnah wal jama'ah secara kokoh dan terarah"] },
  { Icon: Flag, t: "Ketaatan Bernegara", n: "02", list: ["Mendidik santri dalam semangat ketaatan terhadap pemerintah", "Menjauhkan dari paham radikalisme dan terorisme", "Mendukung program pemerintah dalam pengembangan pendidikan nasional"] },
  { Icon: Sparkles, t: "Kebiasaan Mulia", n: "03", list: ["Membiasakan adab-adab Islami dalam interaksi sehari-hari", "Rutinitas menghafal Al-Qur'an setiap hari", "Kemampuan berbahasa Arab secara aktif", "Pola hidup 5R: Ringkas, Rapi, Resik, Rawat, Rajin", "Tutur kata yang baik, santun, dan jujur"] },
];

export default function QualityAssurance() {
  return (
    <section className="py-20 lg:py-24">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader
          tag="Penjaminan Mutu"
          title="Quality"
          italic="Assurance"
          description="Segala upaya merupakan bentuk ikhtiar yang tidak mungkin terwujud tanpa taufik dan pertolongan Allah Subhanahu wa Ta'ala"
        />

        <div className="grid lg:grid-cols-3 gap-5">
          {QA.map((q, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group bg-white border border-slate-100 rounded-2xl p-7 relative overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <q.Icon size={18} />
                </div>
                <h3 className="text-[15px] font-bold text-[#284061] mb-3">{q.t}</h3>
                <ul className="space-y-2">
                  {q.list.map((li, j) => (
                    <li key={j} className="flex gap-2 text-[12.5px] text-slate-500 leading-[1.6] font-light">
                      <span className="text-amber-500 text-lg leading-none">·</span> {li}
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-3 right-5 text-[56px] text-slate-100 leading-none pointer-events-none" style={GILDA_FONT}>{q.n}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}