import { GILDA_FONT } from "../../utils/constants";
import Reveal from "./Reveal";

export default function SectionHeader({ tag, title, italic, description, align = "center", className = "" }) {
  return (
    <Reveal className={`${align === "center" ? "text-center mx-auto" : ""} mb-12 ${className}`}>
      <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-wider uppercase text-[#284061] mb-4">
        <span className="w-5 h-[1.5px] bg-amber-500 rounded" /> {tag}
      </div>
      <h2
        className="mb-3.5"
        style={{ ...GILDA_FONT, fontSize: "clamp(26px,3.5vw,42px)", color: "#284061", lineHeight: "1.15" }}
      >
        {title} {italic && <em className="italic text-amber-500">{italic}</em>}
      </h2>
      {description && (
        <p className={`text-[15px] text-slate-500 leading-relaxed ${align === "center" ? "max-w-xl mx-auto" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}