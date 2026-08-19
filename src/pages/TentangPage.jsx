import SEO from "../components/common/SEO";
import TentangIntro from "../components/tentang/TentangIntro";
import VisiMisi from "../components/tentang/VisiMisi";
import QualityAssurance from "../components/tentang/QualityAssurance";
import CTABlock from "../components/common/CTABlock";

function TentangPage() {
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
      <CTABlock title="Menitipkan Amanah," emTitle="Merajut Masa Depan" sub="Di Pesantren Al Kautsar Sidoarjo, kami memahami bahwa pendidikan adalah perjalanan panjang. Mari berkolaborasi menyiapkan generasi yang kokoh akidahnya dan luas wawasannya." to="/ppdb" />
    </>
  );
}

export default TentangPage
