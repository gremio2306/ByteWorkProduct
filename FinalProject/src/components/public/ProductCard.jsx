// src/components/public/ProductCard.jsx
const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);

export default function ProductCard({ product, onBuy, onFav, onDetail }) {
  const inStock = product.stock > 0;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative h-44 bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 border">
            {product.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              inStock ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}
          >
            {inStock ? `Stok ${product.stock}` : "Habis"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">Harga</p>
            <p className="text-lg font-bold text-slate-900">Rp {rupiah(product.price)}</p>
          </div>

          <button
            onClick={() => onDetail(product)}
            className="text-sm px-3 py-2 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition"
          >
            Detail
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onBuy(product)}
            disabled={!inStock}
            className="rounded-2xl bg-slate-900 text-white py-3 font-medium hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Beli
          </button>

          <button
            onClick={() => onFav(product)}
            className="rounded-2xl border border-slate-200 py-3 font-medium hover:bg-slate-50 active:scale-[0.98] transition"
          >
            ❤ Favorit
          </button>
        </div>
      </div>
    </div>
  );
}
