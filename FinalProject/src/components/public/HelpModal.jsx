// src/components/public/HelpModal.jsx
import React from "react";
import { X } from "lucide-react";

export default function HelpModal({ open, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[80] bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        className={`fixed left-1/2 top-1/2 z-[90] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl transition-all ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <div className="text-lg font-extrabold text-slate-900">Bantuan</div>
            <div className="text-sm text-slate-600">
              FAQ singkat + kontak support (demo).
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 hover:bg-slate-50"
          >
            <X size={18} className="text-slate-700" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto px-5 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-extrabold text-slate-900">Bagaimana cara membeli?</div>
              <p className="mt-2 text-sm text-slate-600">
                Klik <b>Beli</b> untuk demo checkout, atau klik <b>Tambah ke Keranjang</b>{" "}
                untuk menyimpan item.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-extrabold text-slate-900">Apakah bisa COD?</div>
              <p className="mt-2 text-sm text-slate-600">
                Ini versi demo. Opsi COD/Transfer/E-wallet bisa ditambah nanti.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-extrabold text-slate-900">Berapa lama pengiriman?</div>
              <p className="mt-2 text-sm text-slate-600">
                Estimasi 1–3 hari (demo). Bisa dibuat dinamis pakai API ongkir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="font-extrabold text-slate-900">Garansi produk?</div>
              <p className="mt-2 text-sm text-slate-600">
                Garansi toko 7 hari (demo). Bisa diubah sesuai kebutuhanmu.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-base font-extrabold text-slate-900">Kontak Support</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs font-extrabold text-slate-500">Email</div>
                <div className="font-bold">support@byteworkstore.demo</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs font-extrabold text-slate-500">WhatsApp</div>
                <div className="font-bold">+62 812-0000-0000</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-xs font-extrabold text-slate-500">Jam Operasional</div>
                <div className="font-bold">09.00 - 21.00</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-extrabold text-white hover:bg-slate-800"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
