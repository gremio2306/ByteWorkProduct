import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Save, RotateCcw } from "lucide-react";

export default function FormData({ mode = "add", initialValue = null, onSave }) {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    if (mode === "edit" && initialValue) {
      setForm({
        name: initialValue.name ?? "",
        price: String(initialValue.price ?? ""),
        stock: String(initialValue.stock ?? ""),
      });
    } else {
      setForm({ name: "", price: "", stock: "" });
    }
  }, [mode, initialValue]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = () => {
    const payload = {
      name: form.name.trim(),
      price: Number(form.price || 0),
      stock: Number(form.stock || 0),
    };

    if (!payload.name) return alert("Nama produk wajib diisi.");
    onSave?.(payload);

    if (mode === "add") setForm({ name: "", price: "", stock: "" });
  };

  const onReset = () => {
    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          {mode === "edit" ? "Edit Produk" : "Tambah Produk"}
        </h2>
        <p className="text-xs text-slate-500">
          Form input untuk data produk (dummy).
        </p>
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
          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-medium active:scale-[0.98] transition inline-flex items-center gap-2"
          onClick={onSubmit}
          type="button"
        >
          <Save className="h-4 w-4" />
          {mode === "edit" ? "Simpan Perubahan" : "Simpan"}
        </button>

        <button
          className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2.5 text-sm font-medium active:scale-[0.98] transition inline-flex items-center gap-2"
          onClick={onReset}
          type="button"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </section>
  );
}
