import { useNavigate } from "react-router-dom";
import PPDBHero from "../components/ppdb/PPDBHero";
import PPDBTimeline from "../components/ppdb/PPDBTimeline";
import PPDBDokumen from "../components/ppdb/PPDBDokumen";
import PPDBBiaya from "../components/ppdb/PPDBBiaya";
import PPDBTestimoni from "../components/ppdb/PPDBTestimoni";
import PPDBFaq from "../components/ppdb/PPDBFaq";
import CTABlock from "../components/common/CTABlock";

export default function PPDBPage() {
  const navigate = useNavigate();

  return (
    <>
      <PPDBHero />
      <PPDBTimeline />
      <PPDBDokumen />
      <PPDBBiaya />
      <PPDBTestimoni />
      <PPDBFaq />
      <section className="pb-16">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <CTABlock
            title="Pendaftaran Dibuka"
            emTitle="Tahun Ajaran 2027/2028"
            sub="Segera lengkapi formulir dan dokumen pendaftaran. Tempat terbatas — pastikan putra-putri Anda terdaftar tepat waktu."
            onPrimary={() => navigate("/ppdb/formulir")}
            onSecondary={() => window.open("https://wa.me/6282241696699", "_blank")}
            primaryLabel="Isi Formulir"
            secondaryLabel="Hubungi Admin"
          />
        </div>
      </section>
    </>
  );
}
