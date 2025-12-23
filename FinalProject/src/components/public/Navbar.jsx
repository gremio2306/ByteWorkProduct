export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
      <h1 className="font-bold">Guitar Store</h1>
      <button
        className="px-3 py-1 rounded bg-gray-800"
        onClick={() => console.log("Bell clicked")}
      >
        🔔
      </button>
    </nav>
  );
}
