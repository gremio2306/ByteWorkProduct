import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Headphones,
  PackageCheck,
} from "lucide-react";
import dummyProducts from "../data/dummyProducts.jsx";
import { useCart } from "../context/CartContext.jsx";

const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

function Pill({ children, tone = "slate" }) {
  const map = {
    slate: "bg-slate-900 text-white",
    ghost: "bg-white/90 text-slate-900 ring-1 ring-slate-200",
    emerald: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
    rose: "bg-rose-100 text-rose-800 ring-1 ring-rose-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function InfoCard({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
        <Icon className="h-5 w-5 text-slate-700" />
      </div>
      <div>
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        <div className="mt-0.5 text-xs text-slate-600">{desc}</div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const productId = Number(id);
  const product = dummyProducts.find((p) => Number(p.id) === productId);

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <div className="text-xl font-extrabold text-slate-900">
            Produk tidak ditemukan
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Mungkin produk sudah dihapus atau ID tidak valid.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white hover:bg-slate-800 active:scale-[0.98]"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const isOut = Number(product.stock || 0) <= 0;

  return (
    <div className="w-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        {/* Top row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          {/* Breadcrumb */}
          <div className="text-sm text-slate-600">
            <Link to="/" className="font-bold text-slate-700 hover:text-slate-900">
              Home
            </Link>{" "}
            <span className="mx-2 text-slate-300">/</span>
            <a
              href="/#katalog"
              className="font-bold text-slate-700 hover:text-slate-900"
            >
              Katalog
            </a>{" "}
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-bold text-slate-900">{product.name}</span>
          </div>

          <a
            href="/#katalog"
            className="text-sm font-extrabold text-slate-700 hover:text-slate-900"
          >
            Lihat katalog →
          </a>
        </div>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Image */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[560px]"
                  loading="lazy"
                />

                {/* premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

                {/* top badges */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <Pill tone="ghost">{product.category}</Pill>
                  <Pill tone={isOut ? "rose" : "emerald"}>
                    {isOut ? "Habis" : `Stok ${product.stock}`}
                  </Pill>
                </div>

                {/* bottom name on image (pro look) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="max-w-[680px]">
                    <div className="text-lg sm:text-xl font-black text-white drop-shadow">
                      {product.name}
                    </div>
                    <div className="mt-1 text-sm text-white/85">
                      Produk {product.category} pilihan — cocok untuk pemula & harian.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={ShieldCheck}
                title="Garansi Toko"
                desc="7 hari (demo)"
              />
              <InfoCard
                icon={PackageCheck}
                title="Return Mudah"
                desc="S&K berlaku"
              />
              <InfoCard
                icon={Truck}
                title="Pengiriman"
                desc="1–3 hari (demo)"
              />
              <InfoCard
                icon={Headphones}
                title="Support"
                desc="09.00–21.00"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-black text-slate-900">
                  {product.name}
                </div>

                <div className="text-2xl font-black text-emerald-700">
                  {rupiah(product.price)}
                </div>

                <div className="text-sm text-slate-600 leading-relaxed">
                  Produk kategori <b>{product.category}</b> dengan stok{" "}
                  <b>{isOut ? "habis" : product.stock}</b>. Cocok untuk
                  kebutuhan latihan, rekaman, maupun tampil.
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-extrabold text-slate-500">
                    Kategori
                  </div>
                  <div className="mt-1 font-extrabold text-slate-900">
                    {product.category}
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-extrabold text-slate-500">
                    Stok
                  </div>
                  <div className="mt-1 font-extrabold text-slate-900">
                    {isOut ? "0 (Habis)" : product.stock}
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs font-extrabold text-slate-500">
                    Estimasi
                  </div>
                  <div className="mt-1 font-extrabold text-slate-900">
                    1–3 hari
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => addToCart(product)}
                  disabled={isOut}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-extrabold active:scale-[0.98] ${
                    isOut
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <ShoppingCart size={18} />
                  Tambah ke Keranjang
                </button>

                <Link
                  to="/#katalog"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-extrabold text-slate-900 hover:bg-slate-50 active:scale-[0.98]"
                >
                  Lanjut Belanja
                </Link>
              </div>

              {/* Spec / Notes */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-extrabold text-slate-900">
                  Catatan Produk
                </div>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• Foto menggunakan placeholder (picsum) sesuai produk.</li>
                  <li>• Harga & stok dari data dummy kamu.</li>
                  <li>• Kamu bisa tambah deskripsi detail kapan saja.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sticky action bar (pro look) */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur sm:hidden">
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold text-slate-900">
                {product.name}
              </div>
              <div className="text-sm font-black text-emerald-700">
                {rupiah(product.price)}
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={isOut}
              className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-extrabold active:scale-[0.98] ${
                isOut
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <ShoppingCart size={18} />
              Tambah
            </button>
          </div>
        </div>

        {/* spacer for mobile sticky */}
        <div className="h-16 sm:hidden" />
      </div>
    </div>
  );
}
