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
import { getProductById } from "../services/productsApi";
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

  // ================== STATE & FETCH ==================
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message || "Produk tidak ditemukan");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadProduct();
  }, [id]);

  // ================== LOADING ==================
  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-14 text-center">
        <p className="text-lg font-extrabold">Loading...</p>
      </div>
    );
  }

  // ================== ERROR ==================
  if (error || !product) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-14 text-center">
        <p className="text-lg font-extrabold">Produk tidak ditemukan</p>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 h-11 rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const isOut = Number(product.stock || 0) <= 0;

  // ================== UI ==================
  return (
    <div className="w-full bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-extrabold"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* IMAGE */}
          <div className="lg:col-span-7">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full rounded-3xl object-cover"
            />
          </div>

          {/* DETAIL */}
          <div className="lg:col-span-5 rounded-3xl border bg-white p-6">
            <h1 className="text-2xl font-black">{product.name}</h1>
            <p className="mt-2 text-2xl font-black text-emerald-700">
              {rupiah(product.price)}
            </p>

            <div className="mt-4 flex gap-2">
              <Pill tone="ghost">{product.category}</Pill>
              <Pill tone={isOut ? "rose" : "emerald"}>
                {isOut ? "Habis" : `Stok ${product.stock}`}
              </Pill>
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={isOut}
              className={`mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-extrabold ${
                isOut
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <ShoppingCart size={18} />
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
