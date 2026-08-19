import SEO from "../components/common/SEO";
import HeroSection from "../components/home/HeroSection";
import TickerSection from "../components/home/TickerSection";
import BentoSection from "../components/home/BentoSection";
import ProgramSection from "../components/home/ProgramSection";
import CTABlock from "../components/common/CTABlock";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Boarding School Islam Modern"
        description="Pesantren Al Kautsar Sidoarjo — lembaga pendidikan Islam terpadu yang memadukan kurikulum pesantren, nasional, dan internasional. Daftarkan putra-putri Anda sekarang."
        path="/"
      />
      <HeroSection />
      <TickerSection />
      <BentoSection />
      <ProgramSection />
      {/* CTABlock kini merender section selebar layar sendiri — jangan dibungkus
          container berlebar terbatas, pitanya jadi terpotong. */}
      <CTABlock
        title="Wujudkan Generasi"
        emTitle="Bertauhid & Kompetitif"
        sub="Bergabunglah dalam ekosistem pendidikan Islam terpadu di Pesantren Al Kautsar Sidoarjo"
        to="/ppdb"
        secondaryTo="/kurikulum"
        secondaryLabel="Lihat Kurikulum"
      />
    </>
  );
}