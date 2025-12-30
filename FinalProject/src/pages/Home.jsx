import { useMemo, useState } from "react";
import Navbar from "../components/public/Navbar";
import ProductCard from "../components/public/ProductCard";
import dummyProducts from "../data/dummyProducts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(dummyProducts.map((p) => p.category)));
    return ["All", ...uniq];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dummyProducts.filter((p) => {
      const matchQuery =
        !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat = category === "All" || p.category === category;
      return matchQuery && matchCat;
    });
  }, [query, category]);

  const onBell = () => {
    console.log("Bell clicked");
  };

  const onBuy = (p) => {
    console.log("Beli:", p);
  };

  const onFav = (p) => {
    console.log("Favorit:", p);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar query={query} setQuery={setQuery} onBell={onBell} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Katalog Produk
          </h2>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600">Kategori</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onBuy={onBuy}
              onFav={onFav}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
