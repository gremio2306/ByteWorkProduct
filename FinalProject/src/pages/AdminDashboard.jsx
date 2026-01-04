import FormData from "../components/admin/FormData";
import DataTable from "../components/admin/DataTable";
import dummyProducts from "../data/dummyProducts"; // sesuaikan nama file kamu

export default function AdminDashboard() {
  // kalau kamu sudah punya state/data sendiri, pakai itu.
  const data = dummyProducts ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              Total Produk: {data.length}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
              Status: Active
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 grid gap-6">
        {/* Form */}
        <FormData />

        {/* Table */}
        <DataTable data={data} />
      </div>
    </div>
  );
}