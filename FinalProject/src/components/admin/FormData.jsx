export default function FormData() {
  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="font-semibold mb-2">Form (Statis)</h2>
      <button
        className="rounded bg-blue-600 text-white px-3 py-2"
        onClick={() => console.log("Simpan clicked")}
      >
        Simpan (dummy)
      </button>
    </div>
  );
}
