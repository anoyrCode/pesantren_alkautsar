import logoPolos from "../../assets/logoPolos.png";

export default function Loader({ loading }) {
  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#1a2d47] flex flex-col items-center justify-center gap-7 transition-all duration-700 ${
        loading ? "opacity-100" : "opacity-0 scale-105 pointer-events-none"
      }`}
    >
      <img src={logoPolos} className="w-20 animate-pulse" alt="logo" />
      <div className="w-[180px] h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full animate-[ldFill_1.5s_ease-out_forwards]" />
      </div>
      <div className="text-[11px] font-medium tracking-[.12em] uppercase text-white/30">
        Pesantren Al Kautsar · Sidoarjo
      </div>
      <style>{`@keyframes ldFill{from{width:0}to{width:100%}}`}</style>
    </div>
  );
}