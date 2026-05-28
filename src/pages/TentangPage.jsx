import { useNavigate } from "react-router-dom";
import SEO from "../components/common/SEO";
import TentangIntro from "../components/tentang/TentangIntro";
import VisiMisi from "../components/tentang/VisiMisi";
import QualityAssurance from "../components/tentang/QualityAssurance";
import CTABlock from "../components/common/CTABlock";

function TentangPage() {
  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="Tentang Kami"
        description="Kenali lebih dekat Pesantren Al Kautsar — sejarah berdiri, visi misi, nilai-nilai, dan komitmen kami dalam mencetak generasi muslim yang berilmu dan berakhlak mulia."
        path="/tentang"
      />
      <TentangIntro />
      <VisiMisi />
      <QualityAssurance />
      <section className="pb-16">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <CTABlock title="Percayakan Pendidikan" emTitle="Putra-Putri Anda" sub="Bersama Al Kautsar, kami membangun fondasi kokoh untuk generasi penerus bangsa dan agama" onPrimary={() => navigate("/ppdb")} />
        </div>
      </section>
    </>
  );
}

export default TentangPage
