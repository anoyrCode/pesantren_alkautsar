import { UtensilsCrossed, BedDouble, Shirt, Monitor, BookOpen, Shirt as Uniform, Zap, Users, MessageCircle } from "lucide-react";
import { GILDA_FONT } from "../../utils/constants";
import { KEUANGAN_SD } from "../../utils/jenjang";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

const FEES_MTS_SMA = [
  { tag: "Pendaftaran", l: "Biaya Daftar", amt: "Rp 450", suf: "rb", n: "Biaya pendaftaran sebesar Rp 450.000 dibayarkan saat pengisian formulir dan pengunggahan dokumen." },
  { tag: "Paket Lengkap", l: "Biaya Awal Masuk", amt: "Rp 23", suf: "jt", n: "Termasuk biaya gedung, SPP 1 bulan, seragam, discovery task, dan perlengkapan asrama.", featured: true },
  { tag: "Bulanan", l: "SPP Bulanan", amt: "Rp 2,1", suf: "jt", n: "Sudah termasuk biaya pendidikan, asrama, makan 3x sehari bergizi, dan laundry harian." },
];

const FACILITIES_MTS_SMA = [
  [UtensilsCrossed, "Makan 3x"], [BedDouble, "Asrama"], [Shirt, "Laundry"],
  [Monitor, "SIPOS Digital"], [BookOpen, "discovery task"], [Uniform, "Seragam"],
];

// SD pulang-pergi: tidak ada asrama, laundry, maupun makan 3x. Isi SPP mengikuti
// panduan pendaftaran resmi. Item "SPP bulanan" di daftar panduan sengaja tidak
// disalin — kartunya sendiri sudah bernama SPP Bulanan, jadi akan berputar.
const FEES_SD = [
  { tag: "Pendaftaran", l: "Biaya Daftar", amt: "Rp 300", suf: "rb", n: "Biaya pendaftaran sebesar Rp 300.000 dibayarkan saat pengisian formulir, lalu bukti transfer diunggah." },
  { tag: "Uang Pangkal", l: "Uang Pangkal", amt: "Rp 6,5", suf: "jt", n: "Biaya pendidikan selama 6 tahun (jenjang SD), sudah termasuk SPP bulan Juli 2027. Dibayarkan setelah calon santri dinyatakan diterima.", featured: true },
  { tag: "Bulanan", l: "SPP Bulanan", amt: "Rp 700", suf: "rb", n: "Sudah termasuk makan siang, listrik dan air, serta pendampingan dan pengawasan selama KBM di sekolah." },
];

const FACILITIES_SD = [
  [UtensilsCrossed, "Makan siang"], [Zap, "Listrik & air"], [Users, "Pendampingan KBM"],
];

const KONTEN = {
  MTS_SMA: {
    fees: FEES_MTS_SMA,
    facilities: FACILITIES_MTS_SMA,
    judulFasilitas: "Sudah Termasuk Fasilitas",
    kolomFasilitas: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
    deskripsi: "Dengan biaya terjangkau, santri mendapatkan fasilitas lengkap: pendidikan, asrama, makan 3x sehari, laundry, hingga SIPOS digital",
  },
  SD: {
    fees: FEES_SD,
    facilities: FACILITIES_SD,
    judulFasilitas: "Sudah Termasuk dalam SPP Bulanan",
    kolomFasilitas: "grid-cols-1 sm:grid-cols-3",
    deskripsi: "Biaya terjangkau untuk pendidikan dasar 6 tahun, lengkap dengan makan siang serta pendampingan dan pengawasan selama kegiatan belajar mengajar",
  },
};

export default function PPDBBiaya({ jenjang = "MTS_SMA" }) {
  const { fees: FEES, facilities: FACILITIES, judulFasilitas, kolomFasilitas, deskripsi } = KONTEN[jenjang];
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-[min(1180px,92vw)] mx-auto">
        <SectionHeader
          tag="Informasi Biaya"
          title="Biaya"
          italic="Terjangkau"
          description={deskripsi}
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
            <h4 className="text-center text-[13px] font-bold text-[#284061] mb-6 uppercase tracking-wider">{judulFasilitas}</h4>
            <div className={`grid ${kolomFasilitas} gap-4`}>
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

        {jenjang === "SD" && (
          <Reveal>
            <div className="mt-5 rounded-2xl bg-[#1a2d47] p-7 lg:p-8 text-white">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-amber-300 mb-3">Cara Pembayaran Uang Pangkal</h4>
              <p className="text-[13px] leading-[1.8] text-white/70 font-light">
                Transfer ke rekening <b className="font-semibold text-white">BSI 6006001104</b> (kode bank 451) a.n.{" "}
                <b className="font-semibold text-white">Pondok Pesantren Al Kautsar Sidoarjo</b>, atau lewat QRIS di halaman formulir.
                Kemudian konfirmasi ke WhatsApp keuangan <b className="font-semibold text-white">{KEUANGAN_SD.nomor}</b> dengan format:
              </p>
              <div className="mt-4 rounded-xl bg-white/8 px-4 py-3 text-center font-mono text-[12.5px] font-semibold text-amber-200 break-all">
                {KEUANGAN_SD.formatUangPangkal}
              </div>
              <p className="mt-2 text-[11.5px] text-white/50 text-center">(disertai bukti transfer)</p>
              <a
                href={`https://wa.me/${KEUANGAN_SD.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-[#D48C1A] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#c07f16] transition-colors"
              >
                <MessageCircle size={15} /> Konfirmasi via WhatsApp
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}