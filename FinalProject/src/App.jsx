import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Public pages
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

// Public components
import Navbar from "./components/public/Navbar.jsx";
import Footer from "./components/public/Footer.jsx";
import HelpModal from "./components/public/HelpModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Admin (biarin seperti punyamu)
import AdminHome from "./components/admin/AdminHome.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EntryPenjualan from "./components/admin/EntryPenjualan.jsx";
import GantiFoto from "./components/admin/GantiFoto.jsx";
import Logout from "./components/admin/Logout.jsx";

function PublicLayout({ children }) {
  const [helpOpen, setHelpOpen] = React.useState(false);

  return (
    <>
      {/* Navbar fixed/normal sesuai Navbar kamu, tapi kita kasih trigger bantuan */}
      <Navbar onHelp={() => setHelpOpen(true)} />

      {/* Modal Bantuan (sekali saja, biar gak dobel) */}
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Home yang ngatur layout, jangan max-w di sini */}
      <main className="w-full">{children}</main>

      {/* Footer profesional */}
      <Footer onHelp={() => setHelpOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          {/* Public */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/detail-produk/:id"
            element={
              <PublicLayout>
                <ProductDetail />
              </PublicLayout>
            }
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/data-barang" element={<AdminDashboard />} />
          <Route path="/admin/entry-penjualan" element={<EntryPenjualan />} />
          <Route path="/admin/ganti-foto" element={<GantiFoto />} />
          <Route path="/admin/logout" element={<Logout />} />
        </Routes>
      </div>
    </CartProvider>
  );
}
