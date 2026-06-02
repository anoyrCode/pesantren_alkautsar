import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import { GILDA_FONT } from "../../utils/constants";

const STEPS = [
  { n: "01", t: "Pendaftaran Online", d: "1 Agustus – 30 Sep 2026", c: "Isi formulir pendaftaran & unggah dokumen. Biaya pendaftaran Rp 450.000.", current: true },
  { n: "02", t: "Tes Seleksi", d: "15 – 16 Oktober 2026", c: "Tes potensi akademik, baca Al-Qur'an, dan wawancara orang tua & calon santri." },
  { n: "03", t: "Pengumuman", d: "30 November 2026", c: "Hasil seleksi diumumkan melalui website dan akun resmi Pesantren Al Kautsar." },
  { n: "04", t: "Daftar Ulang & Masuk", d: "Juni 2027", c: "Registrasi ulang, pembayaran biaya awal, dan awal tahun ajaran baru 2027/2028." },
];

export default function PPDBTimeline() {
  return (
    <section id="timeline-ppdb" className="py-20 lg:py-24 bg-slate-50">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader tag="Alur Pendaftaran" title="Timeline" italic="PPDB 2027/2028" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`relative rounded-2xl p-6 text-center hover:-translate-y-1 transition-all h-full ${s.current ? "bg-linear-to-br from-[#284061] to-[#1a2d47] shadow-xl shadow-[#284061]/25" : "bg-white border border-slate-100 hover:shadow-xl"}`}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4 ${s.current ? "bg-white/15 border-2 border-white/25 text-amber-300" : "bg-slate-50 border-2 border-slate-200 text-[#284061]"}`} style={GILDA_FONT}>
                  <span className="text-base font-bold">{s.n}</span>
                </div>
                <h3 className={`text-[14px] font-bold mb-1.5 ${s.current ? "text-white" : "text-[#284061]"}`}>{s.t}</h3>
                <div className={`text-[11.5px] font-semibold mb-2.5 ${s.current ? "text-amber-300" : "text-amber-500"}`}>{s.d}</div>
                <p className={`text-[12px] leading-[1.6] font-light ${s.current ? "text-white/60" : "text-slate-500"}`}>{s.c}</p>
                {s.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[9.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Segera
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}