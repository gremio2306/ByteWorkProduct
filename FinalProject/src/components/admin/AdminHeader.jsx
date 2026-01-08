export default function AdminHeader({
  total = 0,
  status = "Active",
  query = "",
  onQueryChange,
  onAdd,
}) {
  return (
    <header className="rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-5 shadow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-lg">Admin Guitar Store</h1>
          <p className="text-xs text-white/70">Kelola data produk (Table • Input • Dialog)</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
            Total Produk: <b>{total}</b>
          </span>

          <span className="rounded-full bg-emerald-500/15 text-emerald-200 px-3 py-1 text-xs">
            Status: <b>{status}</b>
          </span>

          <button
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 active:scale-[0.98] transition"
            onClick={onAdd}
            type="button"
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="mt-4">
        <input
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder="Cari produk..."
          className="w-full sm:w-80 rounded-xl bg-white/10 border border-white/15 px-4 py-2 text-sm outline-none placeholder:text-white/50 focus:bg-white/15"
        />
      </div>
    </header>
  );
}
