import { useState } from "react";
import { Input } from "@/components/ui/input.jsx";

export default function FormData() {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSave = () => {
    console.log("Simpan clicked:", form);
    alert("Simpan (dummy) - cek console");
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Tambah Produk</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Nama Produk
          </label>
          <Input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Contoh: Fender Stratocaster"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Harga</label>
          <Input
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="Contoh: 2500000"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Stok</label>
          <Input
            name="stock"
            value={form.stock}
            onChange={onChange}
            placeholder="Contoh: 12"
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-medium active:scale-[0.98] transition"
          onClick={onSave}
        >
          Simpan (dummy)
        </button>

        <button
          className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2.5 text-sm font-medium active:scale-[0.98] transition"
          onClick={() => {
            setForm({ name: "", price: "", stock: "" });
            console.log("Reset clicked");
          }}
        >
          Reset
        </button>
      </div>
    </section>
  );
}