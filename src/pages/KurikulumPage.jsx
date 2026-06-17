import { useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import KurikulumProgress from "../components/kurikulum/KurikulumProgress";
import KurikulumPilar from "../components/kurikulum/KurikulumPilar";
import MataPelajaran from "../components/kurikulum/MataPelajaran";
import LMSSection from "../components/kurikulum/LMSSection";
import SuperCampCard from "../components/kurikulum/SuperCampCard";
import CTABlock from "../components/common/CTABlock";

export default function KurikulumPage() {
  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="Kurikulum"
        description="Program pendidikan Pesantren Al Kautsar — kurikulum terpadu yang menggabungkan ilmu agama (Quran, Fiqh, Hadits), ilmu umum, dan pengembangan karakter santri."
        path="/kurikulum"
      />
      <section className="pt-10 pb-20 lg:pt-12 lg:pb-24">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <KurikulumProgress />
          <SuperCampCard />
          <KurikulumPilar />
          <MataPelajaran />
          <LMSSection />
        </div>
      </section>
      <section className="pb-16">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <CTABlock title="Semua Kebutuhan" emTitle="Sudah Terintegrasi" sub="Tidak perlu bimbel tambahan. Semua kebutuhan akademik, bahasa, dan karakter ada di dalam kurikulum pesantren." onPrimary={() => navigate("/ppdb")} />
        </div>
      </section>
    </>
  );
}

