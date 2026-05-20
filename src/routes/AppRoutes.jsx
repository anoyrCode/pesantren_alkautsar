import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import HomePage from "../pages/HomePage";
import TentangPage from "../pages/TentangPage";
import KurikulumPage from "../pages/KurikulumPage";
import PPDBPage from "../pages/PPDBPages";
import FormulirPage from "../pages/FormulirPage";
import GaleriPage from "../pages/GaleriPage";
import KesantrianPage from "../pages/KesantrianPage";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDetail from "../pages/admin/AdminDetail";
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
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/santri/:id"
        element={<ProtectedRoute><AdminDetail /></ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
