// src/components/public/Navbar.jsx
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { items, openCart } = useCart();
  const [scrolled, setScrolled] = React.useState(false);

  const cartCount =
    items?.reduce((total, item) => total + (item.qty || 0), 0) ?? 0;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-[rgba(11,28,45,0.92)] backdrop-blur border-b border-white/10"
          : "bg-[rgb(var(--navy-900))]"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[rgb(var(--navy-900))] shadow-sm">
            <span className="text-sm font-black">BW</span>
          </div>

          <div className="leading-tight text-left">
            <div className="text-base font-black text-white">
              ByteWork Store
            </div>
            <div className="text-[11px] font-medium text-white/70">
              Demo e-commerce
            </div>
          </div>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-extrabold text-white hover:bg-white/15 active:scale-[0.99]"
        >
          <ShoppingBag size={18} />
          Keranjang

          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-white px-2 text-xs font-black text-[rgb(var(--navy-900))] shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
