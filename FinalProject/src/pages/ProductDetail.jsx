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

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden">
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-4">
          {/* BASIC INFO */}
          <h1 className="text-2xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="text-slate-600">
            Kategori: {product.category}
          </p>

          <p className="text-slate-900 font-semibold text-lg">
            Harga: Rp {rupiah(product.price)}
          </p>

          <p className="text-slate-600">
            Stok:{" "}
            <span className="font-medium">
              {product.stock > 0 ? "TERSEDIA" : "HABIS"}
            </span>
          </p>

          {/* DESKRIPSI */}
          <p className="pt-2 text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* SPESIFIKASI & DESKRIPSI */}
          <div className="pt-6 border-t">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Spesifikasi & Deskripsi
            </h2>

            {/* TABLE */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Bahan</span>
                <span className="font-medium text-slate-900">
                  {product.category === "Acoustic" && "Kayu Spruce & Mahogany"}
                  {product.category === "Electric" && "Solid Wood & Maple Neck"}
                  {product.category === "Ukulele" && "Kayu Mahogany"}
                  {product.category === "Accessories" && "Material Berkualitas"}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Kategori</span>
                <span className="font-medium text-slate-900">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Kondisi</span>
                <span className="font-medium text-slate-900">
                  Baru
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Asal Produk</span>
                <span className="font-medium text-slate-900">
                  Indonesia
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Penggunaan</span>
                <span className="font-medium text-slate-900">
                  {product.category === "Accessories"
                    ? "Aksesoris Musik"
                    : "Alat Musik"}
                </span>
              </div>
            </div>

            {/* BULLET DESCRIPTION */}
            <div className="mt-5 text-sm text-slate-600">
              <p className="font-semibold text-slate-900 mb-2">
                Detail Produk:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Produk original dengan kualitas terjamin</li>
                <li>Material pilihan untuk daya tahan dan performa suara</li>
                <li>Nyaman digunakan untuk pemula maupun profesional</li>
                <li>Cocok untuk latihan, rekaman, dan pertunjukan</li>
              </ul>

              <p className="mt-3 text-xs text-slate-500">
                * Perbedaan warna dapat terjadi akibat pencahayaan dan layar
                perangkat. Toleransi ukuran ±1–3 cm.
              </p>
            </div>
          </div>

          {/* BACK BUTTON */}
          <div className="pt-4">
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
