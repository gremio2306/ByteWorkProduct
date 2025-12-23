export default function AdminHeader() {
  return (
    <header className="bg-black text-white px-4 py-3 flex items-center justify-between">
      <h1 className="font-bold">Admin Guitar Store</h1>
      <button
        className="px-3 py-1 rounded bg-white text-black"
        onClick={() => console.log("Tambah clicked")}
      >
        + Tambah
      </button>
    </header>
  );
}
