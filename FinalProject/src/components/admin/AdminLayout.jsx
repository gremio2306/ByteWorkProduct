import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    { label: "Data Barang", to: "/admin/data-barang", icon: Package },
    { label: "Entry Penjualan", to: "/admin/entry-penjualan", icon: Receipt },
    { label: "Ganti Foto", to: "/admin/ganti-foto", icon: ImageIcon },
    { label: "Logout", to: "/admin/logout", icon: LogOut },
  ];

  const linkClass = ({ isActive }) =>
    [
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
      isActive ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10",
    ].join(" ");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* TOPBAR */}
      <header className="sticky top-0 z-40 h-14 bg-slate-900 text-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              className="sm:hidden rounded-lg border border-white/20 px-2 py-1 hover:bg-white/10"
              onClick={() => setOpen(true)}
              type="button"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-semibold">Admin Panel</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-white/80">Hi, admin</span>
            <div className="h-8 w-8 rounded-full bg-white/20" />
          </div>
        </div>
      </header>

      {/* ✅ HILANGKAN "SISA PUTIH" */}
      {/* Outer full width tanpa padding kiri */}
      <div className="w-full">
        {/* max width hanya untuk konten kanan, bukan sidebar */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr]">
            {/* ===== SIDEBAR DESKTOP (FULL NAVY NEMPEL KIRI) ===== */}
            <aside className="hidden sm:block bg-slate-900 text-white">
              {/* sticky + full height */}
              <div className="sticky top-14 h-[calc(100vh-3.5rem)] p-4">
                {/* Optional: card dalam sidebar (biar tetap rapi) */}
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="mb-4">
                    <div className="text-sm font-semibold">GUITAR STORE</div>
                    <div className="text-xs text-white/60">Admin Menu</div>
                  </div>

                  <nav className="grid gap-2">
                    {menu.map((m) => {
                      const Icon = m.icon;
                      return (
                        <NavLink
                          key={m.label}
                          to={m.to}
                          end={m.to === "/admin"}
                          className={linkClass}
                        >
                          <Icon className="h-5 w-5" />
                          {m.label}
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* ===== MAIN (kasih padding normal) ===== */}
            <main className="min-w-0 px-4 py-4">{children}</main>
          </div>
        </div>
      </div>

      {/* ===== SIDEBAR MOBILE ===== */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] bg-slate-900 p-4 text-white">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                className="rounded-lg border border-white/20 px-2 py-1 hover:bg-white/10"
                onClick={() => setOpen(false)}
                type="button"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="grid gap-2">
              {menu.map((m) => {
                const Icon = m.icon;
                return (
                  <NavLink
                    key={m.label}
                    to={m.to}
                    end={m.to === "/admin"}
                    onClick={() => setOpen(false)}
                    className={linkClass}
                  >
                    <Icon className="h-5 w-5" />
                    {m.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
