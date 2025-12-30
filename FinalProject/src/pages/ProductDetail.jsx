import { useParams, Link } from "react-router-dom";
import dummyProducts from "../data/dummyProducts";

const rupiah = (n) => new Intl.NumberFormat("id-ID").format(n);

export default function ProductDetail() {
  const { id } = useParams();
  const product = dummyProducts.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="text-center">
          <p className="font-semibold">Produk tidak ditemukan</p>
          <Link className="text-blue-600 underline" to="/">
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  console.log("Detail page opened:", id);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />

        <div className="p-6 space-y-3">
          <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-slate-600">Kategori: {product.category}</p>
          <p className="text-slate-900 font-semibold">Harga: Rp {rupiah(product.price)}</p>
          <p className="text-slate-600">Stok: {product.stock}</p>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-block rounded-2xl border border-slate-200 px-4 py-2 hover:bg-slate-50"
            >
              ← Kembali ke Katalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
