import { useNavigate } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import TickerSection from "../components/home/TickerSection";
import BentoSection from "../components/home/BentoSection";
import ProgramSection from "../components/home/ProgramSection";
import CTABlock from "../components/common/CTABlock";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <HeroSection />
      <TickerSection />
      <BentoSection />
      <ProgramSection />
      <section className="py-16">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <CTABlock
            title="Wujudkan Generasi"
            emTitle="Bertauhid & Kompetitif"
            sub="Bergabunglah dalam ekosistem pendidikan Islam terpadu di Pesantren Al Kautsar Sidoarjo"
            onPrimary={() => navigate("/ppdb")}
            onSecondary={() => navigate("/kurikulum")}
            secondaryLabel="Lihat Kurikulum"
          />
        </div>
      </section>
    </>
  );
}