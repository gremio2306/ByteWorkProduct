import { useParams, Link } from "react-router-dom";
import dummyProducts from "../data/dummyProducts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AdminEditProduct() {
  const { id } = useParams();
  const original = dummyProducts.find((p) => String(p.id) === id);

  const [form, setForm] = useState(
    original || { name: "", price: "", stock: "" }
  );

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSave = () => {
    console.log("Edit save (dummy):", form);
  };

  if (!original) {
    return <p className="p-6">Produk tidak ditemukan.</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        <h1 className="text-xl font-semibold">Edit Produk (ID: {id})</h1>

        <div className="grid md:grid-cols-3 gap-3">
          <Input name="name" value={form.name} onChange={onChange} />
          <Input name="price" value={form.price} onChange={onChange} />
          <Input name="stock" value={form.stock} onChange={onChange} />
        </div>

        <div className="flex gap-2">
          <Button onClick={onSave}>Simpan (dummy)</Button>
          <Button asChild variant="outline">
            <Link to="/admin">Kembali</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
