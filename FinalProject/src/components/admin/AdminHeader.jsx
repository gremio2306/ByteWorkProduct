export default function AdminHeader() {
  return (
    <header className="rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-5 flex items-center justify-between shadow">
      <div>
        <h1 className="font-bold text-lg">Admin Guitar Store</h1>
        <p className="text-xs text-white/70">Kelola data produk (UI statis)</p>
      </div>

      <button
        className="px-4 py-2 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 active:scale-[0.98] transition"
        onClick={() => console.log("Tambah clicked")}
      >
        + Tambah
      </button>
    </header>
  );
}
