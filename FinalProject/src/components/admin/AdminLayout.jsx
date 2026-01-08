import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  const menu = [
    { label: "Dashboard", icon: "🏠", to: "/admin" },
    { label: "Data Barang", icon: "📁", to: "/admin/data-barang" },
    { label: "Entry Penjualan", icon: "🧾", to: "/admin/entry-penjualan" },
    { label: "Ganti Foto", icon: "🖼️", to: "/admin/ganti-foto" },
    { label: "Logout", icon: "🚪", to: "/admin/logout" },
  ];

  const linkClass = ({ isActive }) =>
    [
      "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition",
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-700 hover:bg-slate-50",
    ].join(" ");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="sm:hidden rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
              onClick={() => setOpen(true)}
              type="button"
            >
              ☰
            </button>
            <div className="font-semibold text-slate-900">Admin Panel</div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="text-slate-600">Hy, admin</div>
            <div className="h-8 w-8 rounded-full bg-slate-200" />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-4">
          {/* Sidebar desktop */}
          <aside className="hidden sm:block">
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <div className="text-sm font-semibold text-slate-900">
                  GUITAR STORE
                </div>
                <div className="text-xs text-slate-500">Admin Menu</div>
              </div>

              <nav className="p-3 grid gap-2">
                {menu.map((m) => (
                  <NavLink
                    key={m.label}
                    to={m.to}
                    className={linkClass}
                    end={m.to === "/admin"}   // ✅ hanya Dashboard yang end
                  >
                    <span className="text-lg">{m.icon}</span>
                    <span>{m.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sidebar mobile */}
          {open && (
            <div className="sm:hidden fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpen(false)}
              />
              <div className="absolute left-0 top-0 h-full w-[80%] max-w-[300px] bg-white shadow-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold text-slate-900">Menu</div>
                  <button
                    className="rounded-lg border border-slate-200 px-2 py-1"
                    onClick={() => setOpen(false)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>

                <nav className="grid gap-2">
                  {menu.map((m) => (
                    <NavLink
                      key={m.label}
                      to={m.to}
                      onClick={() => setOpen(false)}
                      end={m.to === "/admin"}
                      className={({ isActive }) =>
                        [
                          "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition border",
                          isActive
                            ? "bg-slate-900 text-white border-slate-900"
                            : "border-slate-200 text-slate-700",
                        ].join(" ")
                      }
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span>{m.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
