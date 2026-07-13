import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Image, LogOut, BarChart3 } from "lucide-react";

const TAB_CLASS = ({ isActive }) =>
  `flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? "bg-[#284061] text-white" : "text-gray-600 hover:bg-gray-100"
  }`;

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">Admin PPDB</h1>
            <p className="text-xs text-gray-500">Pesantren Al Kautsar</p>
          </div>
          <nav className="flex items-center gap-1">
            <NavLink to="/admin/dashboard" className={TAB_CLASS}>
              <LayoutDashboard size={15} />
              Dashboard PPDB
            </NavLink>
            <NavLink to="/admin/galeri" className={TAB_CLASS}>
              <Image size={15} />
              Kelola Galeri
            </NavLink>
            <NavLink to="/admin/statistik" className={TAB_CLASS}>
              <BarChart3 size={15} />
              Statistik
            </NavLink>
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </header>

      <Outlet />
    </div>
  );
}
