import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Globe } from "lucide-react";
import KesantrianBanner from "../components/kesantrian/KesantrianBanner";
import ShiftTimeline from "../components/kesantrian/ShiftTimeline";
import JadwalHarian from "../components/kesantrian/JadwalHarian";
import FasilitasGrid from "../components/kesantrian/FasilitasGrid";
import CTABlock from "../components/common/CTABlock";
import Reveal from "../components/common/Reveal";

const CONTACTS = [
  [MapPin, "Jl. Besuk RT 11 RW 04 Sambungrejo, Sukodono, Sidoarjo 61258"],
  [Phone, "Pesantren Al Kautsar Sidoarjo"],
  [Globe, "YouTube · Facebook · Instagram"],
];

export default function KesantrianPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="pt-10 pb-20 lg:pt-12 lg:pb-24">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <KesantrianBanner />
          <ShiftTimeline />
          <JadwalHarian />
          <FasilitasGrid />


          <Reveal>
            <div className="flex items-center justify-center gap-6 flex-wrap p-6 bg-slate-50 rounded-2xl border border-slate-100 mt-12">
              {CONTACTS.map(([Icon, t], i) => (
                <div key={i} className="flex items-center gap-3 text-[13.5px] text-slate-700 font-medium">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#284061] to-[#1a2d47] flex items-center justify-center text-white flex-shrink-0">
                    <Icon size={14} />
                  </div>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    
      <section className="pb-16">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <CTABlock
            title="Pendaftaran Dibuka"
            emTitle="Tahun Ajaran 2027/2028"
            sub="Segera lengkapi formulir dan dokumen pendaftaran. Tempat terbatas — pastikan putra-putri Anda terdaftar tepat waktu."
            onPrimary={() => navigate("/ppdb")}
            onSecondary={() => window.open("https://wa.me/6282241696699", "_blank")}
            primaryLabel="Daftar PPDB"
            secondaryLabel="Hubungi Kami"
          />
        </div>
      </section>
    </>
  );
}