import { useMemo, useState } from "react";
import { Receipt, Search } from "lucide-react";
import AdminLayout from "./AdminLayout";

const rupiah = (n) => new Intl.NumberFormat("id-ID").format(Number(n || 0));

const dummySales = [
  { id: 1, tanggal: "2026-01-01", produk: "Yamaha F310 Akustik", qty: 1, total: 1450000 },
  { id: 2, tanggal: "2026-01-02", produk: "Squier Stratocaster Elektrik", qty: 1, total: 3950000 },
  { id: 3, tanggal: "2026-01-03", produk: "Capo Gitar Aluminium", qty: 2, total: 90000 },
];

export default function EntryPenjualan() {
  const [data] = useState(dummySales);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter((x) => x.produk.toLowerCase().includes(s));
  }, [data, q]);

  return (
    <AdminLayout>
      <div className="rounded-2xl border bg-white shadow-sm p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Receipt className="h-5 w-5" />
            Entry Penjualan
          </div>

          <div className="w-full sm:w-90">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari produk terjual..."
                className="w-full text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-180 text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b">
                <th className="text-left p-3">Tanggal</th>
                <th className="text-left p-3">Produk</th>
                <th className="text-left p-3">Qty</th>
                <th className="text-left p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x) => (
                <tr key={x.id} className="border-b hover:bg-slate-50/70">
                  <td className="p-3">{x.tanggal}</td>
                  <td className="p-3 font-medium text-slate-900">{x.produk}</td>
                  <td className="p-3">{x.qty}</td>
                  <td className="p-3">Rp {rupiah(x.total)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500">
                    Data penjualan tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
