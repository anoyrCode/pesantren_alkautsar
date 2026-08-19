import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/HomePage";
import TentangPage from "../pages/TentangPage";
import KurikulumPage from "../pages/KurikulumPage";
import PPDBPage from "../pages/PPDBPages";
import FormulirPage from "../pages/FormulirPage";
import GaleriPage from "../pages/GaleriPage";
import KesantrianPage from "../pages/KesantrianPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDetail from "../pages/admin/AdminDetail";
import AdminSantriForm from "../pages/admin/AdminSantriForm";
import AdminGaleri from "../pages/admin/AdminGaleri";
import AdminStatistik from "../pages/admin/AdminStatistik";
import ProtectedRoute from "../components/admin/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/kurikulum" element={<KurikulumPage />} />
        <Route path="/ppdb" element={<PPDBPage />} />
        <Route path="/ppdb/formulir" element={<FormulirPage />} />
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/kesantrian" element={<KesantrianPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/galeri" element={<AdminGaleri />} />
        <Route path="/admin/statistik" element={<AdminStatistik />} />
      </Route>

      <Route
        path="/admin/santri/baru"
        element={<ProtectedRoute><AdminSantriForm /></ProtectedRoute>}
      />
      <Route
        path="/admin/santri/:id"
        element={<ProtectedRoute><AdminDetail /></ProtectedRoute>}
      />
      <Route
        path="/admin/santri/:id/edit"
        element={<ProtectedRoute><AdminSantriForm /></ProtectedRoute>}
      />

      {/* Halaman 404 sungguhan, bukan pengalihan ke beranda. Pengalihan membuat
          setiap URL ngawur membalas 200 dengan isi beranda — Google menandainya
          "Soft 404" dan jatah crawl terbuang untuk halaman yang tidak ada.
          Dibungkus MainLayout supaya navbar & footer ikut tampil: pengunjung
          yang tersesat langsung punya jalan keluar. */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
