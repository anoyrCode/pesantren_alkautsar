import { BookOpen, Languages, FlaskConical, Globe2, Rocket, Briefcase } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

const PILARS = [
  { Icon: BookOpen, n: "48", u: "jp/pekan", t: "Aqidah & Ilmu Agama", d: "Aqidah, fiqh, hadits, tafsir, mutun tauhid, mutun hadits — semua dengan pengantar Bahasa Arab aktif." },
  { Icon: Languages, n: "48", u: "jp/pekan", t: "Bahasa Arab Intensif", d: "Bahasa pengantar dan bahasa lingkungan pesantren. Santri mampu mengakses langsung literatur ulama klasik." },
  { Icon: FlaskConical, n: "42", u: "jp/pekan", t: "Matematika & Sains", d: "Pola bimbel terstruktur. Siap UTBK dan seleksi PTN dalam dan luar negeri sejak dini." },
  { Icon: Globe2, n: "14", u: "jp/pekan", t: "Bahasa Inggris", d: "Diajarkan sebagai mata pelajaran pendukung untuk membekali santri dengan kemampuan dasar akademik internasional." },
  { Icon: Rocket, n: "Super", u: "Camp", t: "Program Super Camp", d: "Bagi santri berprestasi: fokus UTBK dan seleksi PTN dalam & luar negeri, berpikir kritis tingkat lanjut." },
  { Icon: Briefcase, n: "Karir", u: "& Kapasitas", t: "Jalur Karir & Wirausaha", d: "Magang, Agrobisnis, Manajemen Trainee, Grafika (Kl.12), Web Design bersama ITS Tekno (Kl.10-11)." },
];

export default function KurikulumPilar() {
  return (
    <>
      <Reveal>
        <h3 className="mb-6" style={{ ...GILDA_FONT, fontSize: "clamp(20px,2.5vw,28px)", color: "#284061" }}>
          <em className="italic text-[#3a5a8c]">Pilar Utama</em>
        </h3>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PILARS.map((k, i) => (
          <Reveal key={i} delay={i * 70}>
            <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col">
              <div className="p-6 pb-3 flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white">
                  <k.Icon size={18} />
                </div>
                <div className="text-right">
                  <div className={`text-[#284061] leading-none ${typeof k.n === "string" && k.n.length > 3 ? "text-[15px]" : "text-[22px]"}`} style={GILDA_FONT}>{k.n}</div>
                  <div className="text-[10px] text-slate-400">{k.u}</div>
                </div>
              </div>
              <div className="h-[2px] bg-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="p-6 pt-4 flex-1">
                <h4 className="text-[14px] font-bold text-[#284061] mb-2">{k.t}</h4>
                <p className="text-[12.5px] text-slate-500 leading-[1.65] font-light">{k.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}