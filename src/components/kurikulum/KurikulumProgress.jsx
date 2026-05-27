import { BookOpen, Languages, FlaskConical, Globe2 } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import ProgressBar from "../common/ProgressBar";
import { GILDA_FONT } from "../../utils/constants";

export default function KurikulumProgress() {
  return (
    <>
      <SectionHeader
        tag="Kurikulum Terpadu"
        title="Sistem Pembelajaran"
        italic="Terintegrasi"
        description="MTs & SMA — ratusan jam pelajaran dirancang untuk keseimbangan sempurna antara agama, bahasa, dan akademik modern"
      />

      <Reveal>
        <div className="bg-linear-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-8 lg:p-12 relative overflow-hidden mb-14">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 90% 10%,rgba(192,155,90,.12) 0%,transparent 55%)" }} />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-white/60 mb-4">
                <span className="w-5 h-[1.5px] bg-amber-400 rounded" /> Alokasi Per Pekan
              </div>
              <h3 className="text-white mb-3" style={{ ...GILDA_FONT, fontSize: "clamp(22px,2.5vw,30px)" }}>
                Distribusi <em className="italic text-amber-300">152 Jam</em>
              </h3>
              <p className="text-[14px] text-white/55 leading-[1.8] font-light max-w-sm">
                Total 152 jam pelajaran per pekan. Komitmen kami agar santri tidak tertinggal di bidang apapun — agama, bahasa, maupun sains.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <ProgressBar width={100} icon={BookOpen} label="Aqidah & Ilmu Agama" value="48jp" />
              <ProgressBar width={100} icon={Languages} label="Bahasa Arab Intensif" value="48jp" />
              <ProgressBar width={87.5} icon={FlaskConical} label="Matematika & Sains" value="42jp" />
              <ProgressBar width={29.2} icon={Globe2} label="Bahasa Inggris" value="14jp" />
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}