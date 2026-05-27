import { Camera, FileCheck, Check } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import Reveal from "../common/Reveal";

const DOCS = [
  { Icon: Camera, t: "Pas Foto Berwarna", d: "Foto terbaru ukuran 3x4 dengan latar belakang merah/biru" },
  { Icon: FileCheck, t: "Bukti Transfer Registrasi", d: "Bukti pembayaran registrasi santri baru sesuai nominal yang ditentukan" },
];

const STEPS = [
  { n: "1", t: "Daftar Online", d: "Isi formulir & unggah dokumen di website kami", time: "5 menit", done: true },
  { n: "2", t: "Verifikasi Admin", d: "Tim PPDB akan menghubungi Anda dalam 1×24 jam", time: "1 hari", done: true },
  { n: "3", t: "Tes & Wawancara", d: "Tes potensi, baca Al-Qur'an & wawancara orang tua", time: "1 hari", done: false },
  { n: "4", t: "Pengumuman & Daftar Ulang", d: "Pengumuman hasil & pembayaran biaya awal masuk", time: "2 minggu", done: false },
];

export default function PPDBDokumen() {
  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal direction="left">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
              <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> Persyaratan
            </div>
            <h2 className="mb-5" style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", color: "#284061", lineHeight: "1.15" }}>
              Dokumen yang <em className="italic text-amber-500">Disiapkan</em>
            </h2>
            <p className="text-[14px] text-slate-500 mb-7 leading-relaxed font-light">
              Siapkan dokumen-dokumen berikut sebelum mengisi formulir pendaftaran. Format file: JPG, PNG, atau PDF dengan ukuran maksimal 5MB.
            </p>
            <div className="space-y-3">
              {DOCS.map((d, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-linear-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <d.Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-[#284061] mb-0.5">{d.t}</h4>
                      <p className="text-[12px] text-slate-500 font-light leading-relaxed">{d.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="bg-white rounded-3xl p-7 lg:p-9 shadow-xl shadow-slate-200/40 border border-slate-100">
              <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-amber-500 mb-3">
                <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> 4 Langkah Mudah
              </div>
              <h3 className="mb-7" style={{ ...GILDA_FONT, fontSize: "24px", color: "#284061" }}>Proses Pendaftaran</h3>
              <div className="space-y-6">
                {STEPS.map((s, i, arr) => (
                  <div key={s.n} className="relative flex gap-4">
                    {i < arr.length - 1 && (
                      <div className={`absolute left-[19px] top-11 bottom-0 w-0.5 ${s.done ? "bg-linear-to-b from-amber-500 to-amber-200" : "bg-slate-200"}`} />
                    )}
                    <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-[13px] relative z-10 ${s.done ? "bg-linear-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30" : "bg-slate-100 text-slate-400 border-2 border-slate-200"}`}>
                      {s.done ? <Check size={15} /> : s.n}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[14px] font-bold text-[#284061]">{s.t}</h4>
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">{s.time}</span>
                      </div>
                      <p className="text-[12.5px] text-slate-500 font-light">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}