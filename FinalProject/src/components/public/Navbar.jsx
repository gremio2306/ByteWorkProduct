// src/components/public/Navbar.jsx
export default function Navbar({ query, setQuery, onBell }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center">
            🎸
          </div>
          <div className="leading-tight">
            <h1 className="font-semibold text-slate-900">Guitar Store</h1>
            <p className="text-xs text-slate-500">Simple • Elegan • Cepat</p>
          </div>
        </div>

        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              console.log("Search:", e.target.value);
            }}
            placeholder="Cari produk... (nama / kategori)"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <button
          onClick={onBell}
          className="rounded-2xl border border-slate-200 px-4 py-3 hover:bg-slate-50 active:scale-[0.98] transition"
          title="Notifikasi"
        >
          🔔
        </button>
      </div>
    </header>
  );
}
