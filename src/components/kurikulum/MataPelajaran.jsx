import { useState } from "react";
import { GILDA_FONT, MTS_SUBJECTS, SMA_SUBJECTS } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

export default function MataPelajaran() {
  const [mpTab, setMpTab] = useState("mts");
  const subjects = mpTab === "mts" ? MTS_SUBJECTS : SMA_SUBJECTS;

  return (
    <div className="mt-20">
      <SectionHeader tag="Detail Mata Pelajaran" title="Daftar" italic="Mata Pelajaran" />

      <Reveal>
        <div className="flex gap-2 mb-6 justify-center">
          {[
            { id: "mts", l: "Jenjang MTs" },
            { id: "sma", l: "Jenjang SMA" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setMpTab(t.id)}
              className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                mpTab === t.id
                  ? "bg-[#284061] text-white shadow-lg shadow-[#284061]/25"
                  : "border-[1.5px] border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {subjects.map(([name, jp]) => (
            <div key={name} className="flex justify-between items-center px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
              <span className="text-[13px] font-semibold text-[#284061]">{name}</span>
              <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-[#3a5a8c] text-[15px] min-w-[32px] text-center" style={GILDA_FONT}>{jp}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}