import { useNavigate } from "react-router-dom";
import KurikulumProgress from "../components/kurikulum/KurikulumProgress";
import KurikulumPilar from "../components/kurikulum/KurikulumPilar";
import MataPelajaran from "../components/kurikulum/MataPelajaran";
import LMSSection from "../components/kurikulum/LMSSection";
import CTABlock from "../components/common/CTABlock";

export default function KurikulumPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="pt-10 pb-20 lg:pt-12 lg:pb-24">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <KurikulumProgress />
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

