import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// Admin
import AdminHome from "./components/admin/AdminHome.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import EntryPenjualan from "./components/admin/EntryPenjualan.jsx";
import GantiFoto from "./components/admin/GantiFoto.jsx";
import Logout from "./components/admin/Logout.jsx";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/detail-produk/:id" element={<ProductDetail />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/data-barang" element={<AdminDashboard />} />
      <Route path="/admin/entry-penjualan" element={<EntryPenjualan />} />
      <Route path="/admin/ganti-foto" element={<GantiFoto />} />
      <Route path="/admin/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
