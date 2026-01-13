import React from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

export default function CartDrawer() {
  const { open, closeCart, items, subtotal, inc, dec, removeItem, clearCart } = useCart();

  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-full max-w-md border-l border-slate-200 bg-white shadow-2xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-slate-700" />
              <div className="font-extrabold text-slate-900">Keranjang</div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {items.length} item
              </span>
            </div>

            <button
              onClick={closeCart}
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-50"
              aria-label="Close"
            >
              <X size={18} className="text-slate-700" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="text-lg font-black text-slate-900">Keranjang masih kosong</div>
                <div className="mt-1 text-sm text-slate-600">Tambahkan produk dulu ya.</div>
                <button
                  onClick={closeCart}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-extrabold text-white hover:bg-slate-800"
                >
                  Lanjut Belanja
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3"
                  >
                    <div className="h-16 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-extrabold text-slate-900">{it.name}</div>
                      <div className="mt-0.5 text-sm text-slate-700">{rupiah(it.price)}</div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => dec(it.id)}
                            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
                          >
                            <Minus size={16} className="text-slate-700" />
                          </button>

                          <div className="min-w-10 text-center text-sm font-bold text-slate-900">
                            {it.qty}
                          </div>

                          <button
                            onClick={() => inc(it.id)}
                            disabled={it.stock != null && it.qty >= it.stock}
                            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
                          >
                            <Plus size={16} className="text-slate-700" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(it.id)}
                          className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
                        >
                          <Trash2 size={16} />
                          Hapus
                        </button>
                      </div>

                      {it.stock != null && it.qty >= it.stock && it.stock > 0 && (
                        <div className="mt-2 text-xs font-semibold text-amber-700">
                          Maksimum sesuai stok ({it.stock})
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-extrabold text-slate-900">{rupiah(subtotal)}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={clearCart}
                disabled={items.length === 0}
                className="h-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
              >
                Clear
              </button>
              <button
                disabled={items.length === 0}
                className="h-10 rounded-xl bg-slate-900 text-sm font-extrabold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                Checkout (Demo)
              </button>
            </div>

            <div className="mt-2 text-xs text-slate-500">
              *Checkout masih demo, bisa disambung ke payment/API.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
