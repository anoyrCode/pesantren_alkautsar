import { useState } from "react";
import { BookOpen, Languages, FlaskConical, Globe2 } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";
import ProgressBar from "../common/ProgressBar";
import { GILDA_FONT } from "../../utils/constants";
import useParallax from "../../hooks/useParallax";

const SUBJECTS = [
  { icon: BookOpen,     label: "Aqidah & Ilmu Agama",  value: "48jp", pct: "31.6%", width: 100   },
  { icon: Languages,    label: "Bahasa Arab Intensif",  value: "48jp", pct: "31.6%", width: 100   },
  { icon: FlaskConical, label: "Matematika & Sains",    value: "42jp", pct: "27.6%", width: 87.5  },
  { icon: Globe2,       label: "Bahasa Inggris",        value: "14jp", pct: "9.2%",  width: 29.2  },
];

const LEGEND = [
  ["#F59E0B",                "Aqidah & Agama",    "48jp"],
  ["#CA8A04",                "Bahasa Arab",        "48jp"],
  ["rgba(255,255,255,0.28)", "Matematika & Sains", "42jp"],
  ["rgba(255,255,255,0.10)", "Bahasa Inggris",     "14jp"],
];

export default function KurikulumProgress() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [px, setPx]   = useState({ x: 0, y: 0 });
  const { ref: cardRef, y: pY } = useParallax(0.6);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
    setPx({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <>
      <SectionHeader
        tag="Kurikulum Terpadu"
        title="Sistem Pembelajaran"
        italic="Terintegrasi"
        description="MTs & SMA — ratusan jam pelajaran dirancang untuk keseimbangan sempurna antara agama, bahasa, dan akademik modern"
      />

      <Reveal>
        <div
          ref={cardRef}
          className="bg-linear-to-br from-[#284061] to-[#1a2d47] rounded-3xl p-8 lg:p-12 relative overflow-hidden mb-14"
          onMouseMove={onMove}
        >
          {/* cursor glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 460px at ${px.x}px ${px.y}px, rgba(212,140,26,.08), transparent 65%)` }} />
          {/* parallax orbs */}
          <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(192,155,90,.16) 0%, transparent 60%)", transform: `translate3d(${pos.x * 22}px, ${pos.y * 16 + pY * 0.1}px, 0)`, transition: "transform 0.18s linear" }} />
          <div className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,.07) 0%, transparent 65%)", transform: `translate3d(${pos.x * -14}px, ${pos.y * -10 + pY * -0.07}px, 0)`, transition: "transform 0.25s linear" }} />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">

            {/* kiri: donut + legenda + teks */}
            <div>
              <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-white/60 mb-6">
                <span className="w-5 h-[1.5px] bg-amber-400 rounded" /> Alokasi Per Pekan
              </div>

              {/* donut + legenda */}
              <div className="flex gap-6 items-center mb-7">
                {/* donut */}
                <div className="relative w-30 h-30 shrink-0">
                  <div
                    className="w-full h-full rounded-full"
                    style={{ background: "conic-gradient(#F59E0B 0deg 113.68deg, #CA8A04 113.68deg 227.37deg, rgba(255,255,255,.22) 227.37deg 326.84deg, rgba(255,255,255,.07) 326.84deg 360deg)" }}
                  >
                    <div className="absolute inset-[24%] rounded-full bg-[#1a2d47] flex flex-col items-center justify-center">
                      <span className="text-[20px] leading-none text-amber-300" style={GILDA_FONT}>152</span>
                      <span className="text-[8.5px] text-white/35 tracking-widest mt-0.5 uppercase">jp/pekan</span>
                    </div>
                  </div>
                </div>
                {/* legenda */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {LEGEND.map(([color, label, val]) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: color }} />
                      <span className="text-[12px] text-white/55 flex-1 leading-tight">{label}</span>
                      <span className="text-[12px] font-semibold text-amber-300/80">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-white mb-2" style={{ ...GILDA_FONT, fontSize: "clamp(20px,2.2vw,28px)" }}>
                Distribusi <em className="italic text-amber-300">152 Jam</em>
              </h3>
              <p className="text-[13.5px] text-white/50 leading-[1.8] font-light max-w-sm">
                Total 152 jam pelajaran per pekan. Komitmen kami agar santri tidak tertinggal di bidang apapun — agama, bahasa, maupun sains.
              </p>
            </div>

            {/* kanan: progress bars */}
            <div className="flex flex-col gap-3">
              {SUBJECTS.map((s) => (
                <ProgressBar key={s.label} {...s} />
              ))}
            </div>

          </div>
        </div>
      </Reveal>
    </>
  );
}
