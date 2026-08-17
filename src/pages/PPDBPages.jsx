import { useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
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
      <SEO
        title="PPDB 2027/2028 — Pendaftaran Santri Baru"
        description="Penerimaan Peserta Didik Baru (PPDB) Pesantren Al Kautsar. Informasi lengkap jadwal pendaftaran, persyaratan dokumen, biaya, dan alur seleksi masuk pesantren."
        path="/ppdb"
      />
      <PPDBHero />
      <PPDBTimeline />
      <PPDBDokumen />
      <PPDBBiaya />
      <PPDBTestimoni />
      <PPDBFaq />
      <CTABlock
        title="Pendaftaran Dibuka"
        emTitle="Tahun Ajaran 2027/2028"
        sub="Lengkapi formulir dan unggah dokumen yang diminta. Pendaftaran dibuka 1 Agustus sampai 30 September 2026."
        onPrimary={() => navigate("/ppdb/formulir")}
        onSecondary={() => window.open("https://wa.me/6282241696699", "_blank")}
        primaryLabel="Isi Formulir"
        secondaryLabel="Hubungi Admin"
      />
    </>
  );
}
