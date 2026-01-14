import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import FormData from "../components/admin/FormData.jsx";
import DataTable from "../components/admin/DataTable.jsx";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsApi"; 

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("add"); 
  const [selected, setSelected] = useState(null);

  // async state (CP3)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProducts();
      setData(res);
    } catch (e) {
      setError(e.message || "Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [data, query]);

  // CREATE / UPDATE (POST / PUT)
  const handleSave = async (payload) => {
    try {
      setSaving(true);
      setError(null);

      // ✅ untuk edit: pakai id dari selected
      if (mode === "edit" && selected) {
        await updateProduct(selected.id, payload);
        setMode("add");
        setSelected(null);
        await loadData();
        return;
      }

      // ✅ untuk add: POST
      await addProduct(payload);
      await loadData();
    } catch (e) {
      setError(e.message || "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p) => {
    setMode("edit");
    setSelected(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      setSaving(true);
      setError(null);
      await deleteProduct(id);
      await loadData();
    } catch (e) {
      setError(e.message || "Gagal menghapus");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="grid gap-4">
        {/* Header + Search */}
        <div className="rounded-2xl border bg-white shadow-sm p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Data Barang
              </h1>
              <p className="text-xs text-slate-500">
                Tambah, edit, hapus produk (MockAPI).
              </p>
            </div>

            <div className="w-full sm:w-90">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <span className="text-slate-400">🔎</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {loading && (
              <span className="text-xs text-slate-500">
                Loading data dari server...
              </span>
            )}
            {saving && (
              <span className="text-xs text-slate-500">
                Memproses perubahan...
              </span>
            )}
            {error && (
              <span className="text-xs font-semibold text-rose-600">
                Error: {error}
              </span>
            )}

            <button
              onClick={loadData}
              type="button"
              className="ml-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Form */}
        <FormData mode={mode} initialValue={selected} onSave={handleSave} />

        {/* Table */}
        {loading ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600">
            Mengambil data...
          </div>
        ) : (
          <DataTable data={filtered} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </AdminLayout>
  );
}
