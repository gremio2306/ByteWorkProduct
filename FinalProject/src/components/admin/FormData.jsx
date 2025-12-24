import { useState } from "react";

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
    <div className="border rounded-2xl p-5 bg-white shadow-sm">
      <h2 className="font-semibold mb-4">Form (Statis)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Nama produk"
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
        />
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          placeholder="Harga"
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={onChange}
          placeholder="Stok"
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
        />
      </div>

      <div className="mt-4 flex gap-3">
        <button
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-medium active:scale-[0.98] transition"
          onClick={onSave}
        >
          Simpan (dummy)
        </button>

        <button
          className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-3 font-medium active:scale-[0.98] transition"
          onClick={() => console.log("Reset clicked")}
        >
          Reset (log)
        </button>
      </div>
    </div>
  );
}
