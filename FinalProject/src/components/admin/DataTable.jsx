export default function DataTable({ data }) {
  return (
    <div className="border rounded bg-white overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Tabel Produk</h2>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Nama</th>
            <th className="text-left p-3 border-b">Harga</th>
            <th className="text-left p-3 border-b">Stok</th>
            <th className="text-left p-3 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td className="p-3 border-b">{p.name}</td>
              <td className="p-3 border-b">Rp {p.price}</td>
              <td className="p-3 border-b">{p.stock}</td>
              <td className="p-3 border-b">
                <button
                  className="text-red-600"
                  onClick={() => console.log("Hapus clicked:", p.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
