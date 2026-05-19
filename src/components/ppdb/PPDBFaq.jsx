import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";
import Reveal from "../common/Reveal";

export default function PPDBFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="w-[min(1180px,92vw)] mx-auto max-w-4xl">
        <SectionHeader
          tag="Pertanyaan Umum"
          title="FAQ"
          italic="PPDB"
          description="Jawaban atas pertanyaan yang sering ditanyakan calon wali santri"
        />


        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className={`border rounded-xl overflow-hidden transition-all ${open === i ? "border-[#284061] shadow-md" : "border-slate-200 hover:border-slate-300"}`}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className={`text-[14px] font-semibold pr-4 ${open === i ? "text-[#284061]" : "text-slate-700"}`}>{f.q}</span>
                  <span className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${open === i ? "bg-[#284061] text-white rotate-45" : "bg-slate-100 text-slate-500"}`}>
                    <Plus size={14} />
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-6 pb-5 text-[13px] text-slate-600 leading-[1.75] font-light border-t border-slate-100 pt-4">
                    {f.a}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}