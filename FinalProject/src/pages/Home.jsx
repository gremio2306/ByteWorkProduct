import { useState } from "react";
import Navbar from "../components/public/Navbar";
import ProductCard from "../components/public/ProductCard";
import { dummyProducts } from "../data/dummyProducts";

export default function Home() {
  const [products] = useState(dummyProducts);

  return (
    <>
      <Navbar />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Katalog Gitar</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
