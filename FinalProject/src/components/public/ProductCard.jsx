export default function ProductCard({ product }) {
  const handleBuy = () => {
    console.log("Beli gitar:", product.name);
    alert("Beli: " + product.name);
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      <p className="font-semibold">{product.name}</p>
      <p className="text-sm">Harga: Rp {product.price}</p>
      <p className="text-sm">Stok: {product.stock}</p>

      <button
        type="button"
        onClick={handleBuy}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded cursor-pointer"
      >
        Beli
      </button>
    </div>
  );
}
