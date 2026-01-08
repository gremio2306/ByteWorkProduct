import { useMemo, useState } from "react";

import AdminLayout from "../components/admin/AdminLayout.jsx";
import FormData from "../components/admin/FormData.jsx";
import DataTable from "../components/admin/DataTable.jsx";

import dummyProducts from "../data/dummyProducts";

export default function AdminDashboard() {
  const [data, setData] = useState(dummyProducts ?? []);
  const [query, setQuery] = useState("");

  const [mode, setMode] = useState("add"); // add | edit
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [data, query]);

  const handleSave = (payload) => {
    if (mode === "add") {
      setData((prev) => [{ id: Date.now(), ...payload }, ...prev]);
      return;
    }

    // edit mode
    if (!selected) return;

    setData((prev) =>
      prev.map((x) => (x.id === selected.id ? { ...x, ...payload } : x))
    );
    setMode("add");
    setSelected(null);
  };

  const handleEdit = (p) => {
    setMode("edit");
    setSelected(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <AdminLayout>
      <div className="grid gap-4">
        {/* Header konten */}
        <div className="rounded-2xl border bg-white shadow-sm p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg font-semibold text-slate-900">📁 Data Barang</h1>
              <p className="text-xs text-slate-500">
                Kelola produk (Table • Input • Dialog)
              </p>
            </div>

            <div className="w-full sm:w-[360px]">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <span className="text-slate-400">🔎</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari barang di sini..."
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form tambah / edit */}
        <FormData mode={mode} initialValue={selected} onSave={handleSave} />

        {/* Table */}
        <DataTable data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  );
}
