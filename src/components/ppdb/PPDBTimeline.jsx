import { Check } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import { GILDA_FONT } from "../../utils/constants";

const STEPS = [
  { n: "01", t: "Pendaftaran Online", start: "2026-08-01", end: "2026-09-30", d: "1 Agustus – 30 Sep 2026", c: "Isi formulir pendaftaran & unggah dokumen. Biaya pendaftaran Rp 450.000." },
  { n: "02", t: "Tes Seleksi", start: "2026-10-03", end: "2026-10-11", d: "3–4 & 10–11 Oktober 2026", c: "Tes potensi akademik, baca Al-Qur'an, dan wawancara orang tua & calon santri dalam dua gelombang." },
  { n: "03", t: "Pengumuman dan Daftar Ulang", start: "2026-10-15", end: "2026-11-15", d: "15 Oktober – 15 November 2026", c: "Hasil seleksi diumumkan 15 Oktober, dilanjutkan daftar ulang dan pembayaran biaya awal masuk." },
  { n: "04", t: "Awal Tahun Ajaran", start: "2027-06-01", end: "2027-06-30", d: "Juni 2027", c: "Santri mulai masuk pesantren dan mengikuti awal tahun ajaran baru 2027/2028." },
];

function getStepStatus(start, end) {
  const now = Date.now();
  const s = new Date(`${start}T00:00:00+07:00`).getTime();
  const e = new Date(`${end}T23:59:59+07:00`).getTime();
  if (now < s) return "segera";
  if (now <= e) return "berlangsung";
  return "selesai";
}

const BADGE_LABEL = { segera: "Segera", berlangsung: "Berlangsung" };

export default function PPDBTimeline() {
  const steps = STEPS.map((s) => ({ ...s, status: getStepStatus(s.start, s.end) }));
  const nextIndex = steps.findIndex((s) => s.status !== "selesai");
  const highlightIndex = nextIndex === -1 ? steps.length - 1 : nextIndex;

  return (
    <section id="timeline-ppdb" className="py-20 lg:py-24 bg-slate-50">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader tag="Alur Pendaftaran" title="Timeline" italic="PPDB 2027/2028" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => {
            const isCurrent = i === highlightIndex;
            const isDone = s.status === "selesai";
            return (
            <Reveal key={i} delay={i * 80}>
              <div className={`relative rounded-2xl p-6 text-center hover:-translate-y-1 transition-all h-full ${isCurrent ? "bg-linear-to-br from-[#284061] to-[#1a2d47] shadow-xl shadow-[#284061]/25" : "bg-white border border-slate-100 hover:shadow-xl"}`}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4 ${isCurrent ? "bg-white/15 border-2 border-white/25 text-amber-300" : isDone ? "bg-emerald-50 border-2 border-emerald-200 text-emerald-600" : "bg-slate-50 border-2 border-slate-200 text-[#284061]"}`} style={GILDA_FONT}>
                  {isDone ? <Check size={18} strokeWidth={3} /> : <span className="text-base font-bold">{s.n}</span>}
                </div>
                <h3 className={`text-[14px] font-bold mb-1.5 ${isCurrent ? "text-white" : isDone ? "text-slate-400" : "text-[#284061]"}`}>{s.t}</h3>
                <div className={`text-[11.5px] font-semibold mb-2.5 ${isCurrent ? "text-amber-300" : isDone ? "text-slate-400" : "text-amber-500"}`}>{s.d}</div>
                <p className={`text-[12px] leading-[1.6] font-light ${isCurrent ? "text-white/60" : isDone ? "text-slate-400" : "text-slate-500"}`}>{s.c}</p>
                {isCurrent && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[9.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${s.status === "berlangsung" ? "bg-emerald-500" : "bg-sky-500"}`}>
                    {BADGE_LABEL[s.status] || "Segera"}
                  </div>
                )}
                {isDone && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9.5px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Selesai
                  </div>
                )}
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}