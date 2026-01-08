import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.jsx";

const empty = { name: "", price: "", stock: "" };

export default function FormData({ mode = "add", initialValue, onSave }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (mode === "edit" && initialValue) {
      setForm({
        name: initialValue.name ?? "",
        price: String(initialValue.price ?? ""),
        stock: String(initialValue.stock ?? ""),
      });
    } else {
      setForm(empty);
    }
  }, [mode, initialValue]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Nama produk wajib diisi.";
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) <= 0)
      return "Harga harus angka dan > 0.";
    if (form.stock === "" || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      return "Stok harus angka dan >= 0.";
    return "";
  };

  const handleSave = () => {
    const msg = validate();
    if (msg) return setError(msg);

    onSave?.({
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setForm(empty);
    setError("");
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          {mode === "edit" ? "Edit Produk" : "Tambah Produk"}
        </h2>
        <p className="text-xs text-slate-500">
          Isi nama, harga, dan stok lalu simpan.
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

      {error && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-medium active:scale-[0.98] transition"
          onClick={handleSave}
          type="button"
        >
          {mode === "edit" ? "Simpan Perubahan" : "Simpan"}
        </button>

        <button
          className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2.5 text-sm font-medium active:scale-[0.98] transition"
          onClick={() => {
            setForm(empty);
            setError("");
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
