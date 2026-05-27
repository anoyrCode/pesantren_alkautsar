import { GILDA_FONT } from "../../utils/constants";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export default function SectionHeader({ tag, title, italic, description, align = "center", className = "" }) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} mb-12 ${className}`}>
      <Reveal>
        <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
          <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> {tag}
        </div>
      </Reveal>

      <h2
        className="mb-3.5"
        style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", color: "#284061", lineHeight: "1.15" }}
      >
        <SplitReveal delay={0.05} stagger={0.06}>{title}</SplitReveal>
        {italic && (
          <>
            {" "}
            <SplitReveal delay={0.35} stagger={0.045} as="em" className="italic text-amber-500">
              {italic}
            </SplitReveal>
          </>
        )}
      </h2>

      {description && (
        <Reveal delay={350}>
          <p className={`text-[15px] text-slate-500 leading-relaxed ${align === "center" ? "max-w-xl mx-auto" : "max-w-xl"}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
