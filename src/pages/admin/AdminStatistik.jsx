import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import { apiFetch } from "../../utils/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

const NAVY = "#284061";
const STATUS_COLOR = { Menunggu: "#d97706", Diterima: "#059669", Ditolak: "#dc2626" };
const STATUS_ICON  = { Menunggu: Clock, Diterima: CheckCircle2, Ditolak: XCircle };

function formatTanggal(iso, range) {
  const d = new Date(iso);
  if (range === "week") return `${d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}`;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
}

function KpiCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3.5">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={19} />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function TooltipTren({ active, payload, label, range }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="text-gray-500 mb-0.5">{formatTanggal(label, range)}</p>
      <p className="font-bold text-[#284061]">{payload[0].value} pendaftar</p>
    </div>
  );
}

export default function AdminStatistik() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [range, setRange]     = useState("day");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/statistik?range=${range}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("admin_token");
          navigate("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((json) => { if (json) setData(json); })
      .catch(() => setError("Gagal mengambil data statistik."))
      .finally(() => setLoading(false));
  }, [range, navigate]);

  if (loading && !data) {
    return <main className="px-6 py-6 max-w-7xl mx-auto"><div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500 text-sm">Memuat statistik...</div></main>;
  }
  if (error) {
    return <main className="px-6 py-6 max-w-7xl mx-auto"><div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-red-500 text-sm">{error}</div></main>;
  }
  if (!data) return null;

  const { ringkasan, tren, status, daerah } = data;
  const maxDaerah = Math.max(...daerah.map((d) => Number(d.jumlah)), 1);

  return (
    <main className="px-6 py-6 max-w-7xl mx-auto">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">Statistik Pendaftaran</h2>
        <p className="text-xs text-gray-500 mt-0.5">Ringkasan data pendaftar PPDB secara keseluruhan</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <KpiCard icon={Users} label="Total Pendaftar" value={ringkasan.total} color="bg-[#284061]/10 text-[#284061]" />
        <KpiCard icon={CheckCircle2} label="Diterima" value={ringkasan.diterima} color="bg-emerald-100 text-emerald-600" />
        <KpiCard icon={XCircle} label="Ditolak" value={ringkasan.ditolak} color="bg-red-100 text-red-600" />
        <KpiCard icon={Clock} label="Menunggu" value={ringkasan.menunggu} color="bg-amber-100 text-amber-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-5">
        {/* Tren chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Tren Pendaftar</h3>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {[["day", "Harian"], ["week", "Mingguan"]].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setRange(val)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                    range === val ? "bg-white text-[#284061] shadow-sm" : "text-gray-500"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {tren.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-16">Belum ada data pendaftar.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={tren} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trenFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={NAVY} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={NAVY} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="periode"
                  tickFormatter={(v) => formatTanggal(v, range)}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip content={<TooltipTren range={range} />} />
                <Area type="monotone" dataKey="jumlah" stroke={NAVY} strokeWidth={2} fill="url(#trenFill)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Donut status */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Status Seleksi</h3>
          {ringkasan.total === "0" ? (
            <p className="text-center text-gray-400 text-sm py-16">Belum ada data.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={status} dataKey="jumlah" nameKey="status" innerRadius={45} outerRadius={70} paddingAngle={2}>
                    {status.map((s) => (
                      <Cell key={s.status} fill={STATUS_COLOR[s.status] || "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} pendaftar`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-2">
                {status.map((s) => {
                  const Icon = STATUS_ICON[s.status] || Clock;
                  return (
                    <div key={s.status} className="flex items-center gap-2 text-xs">
                      <Icon size={13} style={{ color: STATUS_COLOR[s.status] }} />
                      <span className="text-gray-600 flex-1">{s.status}</span>
                      <span className="font-bold text-gray-800">{s.jumlah}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sebaran daerah */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-1">Sebaran Asal Daerah</h3>
        <p className="text-xs text-gray-400 mb-4">Berdasarkan kabupaten/kota yang diisi pendaftar (top 10)</p>
        {daerah.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">Belum ada data.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {daerah.map((d) => (
              <div key={d.daerah} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-32 shrink-0 truncate">{d.daerah}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md bg-amber-500"
                    style={{ width: `${(Number(d.jumlah) / maxDaerah) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 w-8 text-right shrink-0">{d.jumlah}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
