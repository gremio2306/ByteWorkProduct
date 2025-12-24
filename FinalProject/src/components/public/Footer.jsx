export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>CP1 - UI Statis Guitar Store</p>
        <p>© {new Date().getFullYear()} — Vite + React + Tailwind</p>
      </div>
    </footer>
  );
}
