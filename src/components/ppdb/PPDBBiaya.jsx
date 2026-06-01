import { UtensilsCrossed, BedDouble, Shirt, Monitor, BookOpen, Shirt as Uniform } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const FEES = [
  { tag: "Pendaftaran", l: "Biaya Daftar", amt: "Rp 450", suf: "rb", n: "Biaya pendaftaran sebesar Rp 450.000 dibayarkan saat pengisian formulir dan pengunggahan dokumen." },
  { tag: "Paket Lengkap", l: "Biaya Awal Masuk", amt: "Rp 23", suf: "jt", n: "Termasuk biaya gedung, SPP 1 bulan, seragam, discovery task, dan perlengkapan asrama.", featured: true },
  { tag: "Bulanan", l: "SPP Bulanan", amt: "Rp 2,1", suf: "jt", n: "Sudah termasuk biaya pendidikan, asrama, makan 3x sehari bergizi, dan laundry harian." },
];

const FACILITIES = [
  [UtensilsCrossed, "Makan 3x"], [BedDouble, "Asrama"], [Shirt, "Laundry"],
  [Monitor, "LMS Digital"], [BookOpen, "discovery task"], [Uniform, "Seragam"],
];

export default function PPDBBiaya() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader
          tag="Informasi Biaya"
          title="Biaya"
          italic="Terjangkau"
          description="Dengan biaya terjangkau, santri mendapatkan fasilitas lengkap: pendidikan, asrama, makan 3x sehari, laundry, hingga LMS digital"
        />

        <div className="grid lg:grid-cols-3 gap-5">
          {FEES.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`rounded-2xl p-7 text-center hover:-translate-y-1 transition-all h-full ${f.featured ? "bg-linear-to-br from-[#284061] to-[#1a2d47] text-white shadow-2xl shadow-[#284061]/25" : "bg-white border border-slate-100 hover:shadow-xl"}`}>
                <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${f.featured ? "bg-amber-500/20 text-amber-300" : "bg-amber-500/10 text-amber-500"}`}>
                  {f.tag}
                </div>
                <div className={`text-[11.5px] font-semibold uppercase tracking-wider mb-2 ${f.featured ? "text-white/50" : "text-slate-500"}`}>{f.l}</div>
                <div className={`mb-4 ${f.featured ? "text-white" : "text-[#284061]"}`} style={{ ...GILDA_FONT, fontSize: "38px", lineHeight: 1 }}>
                  {f.amt}{f.suf && <span className="text-[.45em]">{f.suf}</span>}
                </div>
                <p className={`text-[12px] leading-[1.6] font-light ${f.featured ? "text-white/60" : "text-slate-500"}`}>{f.n}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 bg-slate-50 border border-slate-100 rounded-2xl p-7">
            <h4 className="text-center text-[13px] font-bold text-[#284061] mb-6 uppercase tracking-wider">Sudah Termasuk Fasilitas</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {FACILITIES.map(([Icon, t]) => (
                <div key={t} className="text-center">
                  <div className="w-11 h-11 mx-auto rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#284061] mb-2">
                    <Icon size={18} />
                  </div>
                  <div className="text-[11.5px] font-semibold text-[#284061]">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}