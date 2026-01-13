import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";

const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

// 🔧 GANTI NOMOR WA KAMU (format: 628xxxxxxxxxx)
const WHATSAPP_NUMBER = "6281234567890";

function stockBadge(stock) {
  if (stock === 0) {
    return { text: "Habis", cls: "bg-rose-100 text-rose-700" };
  }
  return { text: `Stok ${stock}`, cls: "bg-emerald-100 text-emerald-700" };
}

export default function ProductCard({ p }) {
  const { addItem } = useCart();
  const stock = stockBadge(p.stock);

  const ratingValue = typeof p.rating === "number" ? p.rating : 4.8;
  const soldValue = typeof p.sold === "number" ? p.sold : 120;

  const handleBuyWA = () => {
    const message = `
Halo ByteWork Store 👋

Saya tertarik membeli:
• ${p.name}
• Harga: ${rupiah(p.price)}

Mohon info cara ordernya ya.
Terima kasih 🙏
    `.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={p.image}
          alt={p.name}
          className="h-48 w-full object-cover sm:h-52"
        />

        {/* CATEGORY + STOCK */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-slate-800">
            {p.category}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-extrabold ${stock.cls}`}
          >
            {stock.text}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* NAMA PRODUK — navy medium */}
        <div className="line-clamp-1 text-[15px] font-extrabold text-slate-700">
          {p.name}
        </div>

        {/* HARGA + RATING */}
        <div className="mt-2 flex items-center justify-between">
          {/* Harga — paling dominan */}
          <div className="text-lg font-black tracking-tight text-[rgb(var(--navy-900))]">
            {rupiah(p.price)}
          </div>

          {/* Rating — kecil & rapi */}
          <div className="flex items-center gap-1 text-[11px]">
            <Star size={14} className="text-amber-500" />
            <span className="font-bold text-slate-700">
              {ratingValue.toFixed(1)}
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-slate-500">
              {soldValue} terjual
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleBuyWA}
            disabled={p.stock === 0}
            className="h-11 rounded-xl bg-[rgb(var(--navy-900))] text-sm font-extrabold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            Beli
          </button>

          <Link
            to={`/detail-produk/${p.id}`}
            className="grid h-11 place-items-center rounded-xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 transition hover:bg-slate-50"
          >
            Detail
          </Link>
        </div>

        {/* CART */}
        <button
          onClick={() => addItem(p)}
          disabled={p.stock === 0}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <ShoppingCart size={18} />
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
