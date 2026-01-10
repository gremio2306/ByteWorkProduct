import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Boxes,
  BarChart3,
  AlertTriangle,
  DollarSign,
  Flame,
  Sparkles,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import dummyProducts from "../../data/dummyProducts";

const rupiah = (n) => new Intl.NumberFormat("id-ID").format(Number(n || 0));

export default function AdminHome() {
  const nav = useNavigate();

  const computed = useMemo(() => {
    const data = dummyProducts ?? [];

    const stokHabisList = data.filter((p) => Number(p.stock) <= 0);
    const stokRendahList = data.filter(
      (p) => Number(p.stock) > 0 && Number(p.stock) < 3
    );

    const totalProduk = data.length;
    const totalStok = data.reduce((acc, p) => acc + Number(p.stock || 0), 0);
    const totalNilaiStok = data.reduce(
      (acc, p) => acc + Number(p.price || 0) * Number(p.stock || 0),
      0
    );

    const terbaru = data.slice(0, 6);
    const kritis = [...stokHabisList, ...stokRendahList].slice(0, 8);

    return {
      totalProduk,
      totalStok,
      totalNilaiStok,
      stokHabis: stokHabisList.length,
      stokRendah: stokRendahList.length,
      kritis,
      terbaru,
    };
  }, []);

  return (
    <AdminLayout>
      <div className="grid gap-4">
        {/* Header */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Dashboard Admin
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Ringkasan data, stok kritis, dan produk terbaru.
              </p>
            </div>

            <button
              className="mt-2 sm:mt-0 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm font-medium transition"
              onClick={() => nav("/admin/data-barang")}
              type="button"
            >
              Kelola Data Barang
            </button>
          </div>
        </div>

        {/* Alert stok */}
        {(computed.stokHabis > 0 || computed.stokRendah > 0) && (
          <div className="rounded-2xl border bg-amber-50 border-amber-200 p-4 text-amber-900">
            <div className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-5 w-5" />
              Perhatian Stok
            </div>
            <div className="mt-1 text-sm">
              {computed.stokHabis > 0 && (
                <div>
                  • Produk stok habis: <b>{computed.stokHabis}</b>
                </div>
              )}
              {computed.stokRendah > 0 && (
                <div>
                  • Produk stok rendah (&lt; 3): <b>{computed.stokRendah}</b>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardStat
            title="Total Produk"
            value={computed.totalProduk}
            desc="Jumlah item di katalog"
            Icon={Boxes}
          />
          <CardStat
            title="Total Stok"
            value={computed.totalStok}
            desc="Akumulasi stok semua produk"
            Icon={BarChart3}
          />
          <CardStat
            title="Stok Habis"
            value={computed.stokHabis}
            desc="Produk perlu restock"
            Icon={AlertTriangle}
          />
          <CardStat
            title="Nilai Stok"
            value={`Rp ${rupiah(computed.totalNilaiStok)}`}
            desc="Estimasi nilai total stok"
            Icon={DollarSign}
          />
        </div>

        {/* Stok kritis + Produk terbaru */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Stok Kritis */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Flame className="h-5 w-5" />
                  Stok Kritis
                </div>
                <p className="text-sm text-slate-500">
                  Produk habis / hampir habis (prioritas).
                </p>
              </div>

              <button
                className="text-sm font-medium text-sky-700 hover:underline"
                onClick={() => nav("/admin/data-barang")}
                type="button"
              >
                Kelola →
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {computed.kritis.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Aman! Tidak ada produk stok kritis.
                </div>
              ) : (
                computed.kritis.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium text-slate-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Harga: Rp {rupiah(p.price)}
                      </div>
                    </div>

                    <span
                      className={
                        "shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold " +
                        (Number(p.stock) > 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-700")
                      }
                    >
                      {Number(p.stock) > 0 ? `${p.stock} tersisa` : "Habis"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Produk Terbaru */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Sparkles className="h-5 w-5" />
                  Produk Terbaru
                </div>
                <p className="text-sm text-slate-500">
                  Daftar produk terbaru (dummy).
                </p>
              </div>

              <button
                className="text-sm font-medium text-sky-700 hover:underline"
                onClick={() => nav("/admin/data-barang")}
                type="button"
              >
                Lihat semua →
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              {computed.terbaru.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Belum ada produk.
                </div>
              ) : (
                computed.terbaru.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium text-slate-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Rp {rupiah(p.price)}
                      </div>
                    </div>

                    <span className="shrink-0 text-xs text-slate-500">
                      Stok: <b className="text-slate-700">{p.stock}</b>
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

function CardStat({ title, value, desc, Icon }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500">{title}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
          <div className="mt-1 text-xs text-slate-500">{desc}</div>
        </div>
        <Icon className="h-6 w-6 text-slate-500" />
      </div>
    </div>
  );
}
