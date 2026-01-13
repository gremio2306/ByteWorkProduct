import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function Toast() {
  const { toast, setToast } = useCart();

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[80] w-[92vw] max-w-sm">
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="mt-0.5">
          <CheckCircle2 className="text-emerald-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-extrabold text-slate-900">{toast.title}</div>
          <div className="mt-0.5 line-clamp-2 text-sm text-slate-600">{toast.desc}</div>
        </div>
        <button
          onClick={() => setToast(null)}
          className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
          aria-label="Close toast"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
