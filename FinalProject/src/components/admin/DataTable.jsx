const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);

export default function DataTable({ data = [] }) {
  return (
    <div className="border rounded-2xl bg-white overflow-hidden shadow-sm">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-semibold">Tabel Produk</h2>
        <span className="text-sm text-slate-500">Total: {data.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left p-3 border-b">Nama</th>
              <th className="text-left p-3 border-b">Harga</th>
              <th className="text-left p-3 border-b">Stok</th>
              <th className="text-left p-3 border-b">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-3 border-b font-medium">{p.name}</td>
                <td className="p-3 border-b">Rp {rupiah(p.price)}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.stock > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {p.stock > 0 ? p.stock : "Habis"}
                  </span>
                </td>
                <td className="p-3 border-b">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition"
                      onClick={() => console.log("Edit clicked:", p.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white active:scale-[0.98] transition"
                      onClick={() => console.log("Hapus clicked:", p.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-slate-500">
                  Tidak ada data produk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
