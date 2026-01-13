// src/pages/Home.jsx
import React from "react";
import dummyProducts from "../data/dummyProducts.jsx";
import ProductCard from "../components/public/ProductCard.jsx";

const ALL = "All Categories";

/* ================= HERO + SEARCH ================= */
function HeroBanner({ q, setQ }) {
  const slides = [
    {
      title: "Promo Minggu Ini",
      desc: "Belanja alat musik favoritmu — cepat, rapi, dan responsif.",
      tag: "HOT OFFERS",
      image: "https://picsum.photos/seed/hero-guitar/1600/700",
    },
    {
      title: "Gitar Electric untuk Rock",
      desc: "Tone tajam, sustain mantap, dan tampilan modern.",
      tag: "ELECTRIC",
      image: "https://picsum.photos/seed/hero-electric/1600/700",
    },
    {
      title: "Ukulele untuk Daily Fun",
      desc: "Ringan, enak dimainkan, cocok untuk pemula.",
      tag: "UKULELE",
      image: "https://picsum.photos/seed/hero-ukulele/1600/700",
    },
  ];

  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    // ✅ bikin card jadi flex-col agar hero bisa flex-1 (ngisi sisa ruang)
    <div className="flex h-full flex-col rounded-2xl border border-[rgba(1,46,85,0.25)] bg-[rgba(1,46,85,0.04)] p-4 shadow-sm">
      {/* SEARCH */}
      <div>
        <div className="text-xs font-extrabold text-[rgb(var(--navy-900))]">
          Search Products
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari produk..."
          className="mt-1 h-11 w-full rounded-xl border border-[rgba(1,46,85,0.25)] bg-white px-4 text-sm outline-none
          focus:border-[rgb(var(--navy-900))] focus:ring-2 focus:ring-[rgba(1,46,85,0.25)]"
        />
      </div>

      {/* HERO — ✅ flex-1 supaya ngisi sisa ruang card (hilang space kosong) */}
      <div className="relative mt-4 flex-1 overflow-hidden rounded-2xl">
        {/* IMAGE FULL */}
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(1,46,85,0.92)] via-[rgba(1,46,85,0.45)] to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full items-center">
          <div className="ml-6 w-[85%] md:w-[60%]">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold text-white ring-1 ring-white/20">
              {slide.tag}
            </span>

            <h2 className="mt-2 text-2xl font-black text-white md:text-4xl">
              {slide.title}
            </h2>

            <p className="mt-2 text-sm text-white/90 md:text-base">
              {slide.desc}
            </p>
          </div>
        </div>

        {/* DOTS */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function Home() {
  const categories = React.useMemo(() => {
    const set = new Set(dummyProducts.map((p) => p.category));
    return [ALL, ...Array.from(set)];
  }, []);

  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState(ALL);
  const [quickFilter, setQuickFilter] = React.useState("none");

  const products = React.useMemo(() => {
    let base = [...dummyProducts];

    if (category !== ALL) base = base.filter((p) => p.category === category);

    if (q.trim()) {
      base = base.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    if (quickFilter === "inStock") base = base.filter((p) => p.stock > 0);
    else if (quickFilter === "outOfStock") base = base.filter((p) => p.stock === 0);
    else if (quickFilter === "priceLow") base.sort((a, b) => a.price - b.price);
    else if (quickFilter === "priceHigh") base.sort((a, b) => b.price - a.price);

    return base;
  }, [q, category, quickFilter]);

  const QBtn = ({ id, label }) => {
    const active = quickFilter === id;
    return (
      <button
        onClick={() => setQuickFilter(id)}
        className={`h-10 rounded-xl px-3 text-sm font-extrabold transition ${
          active
            ? "bg-[rgb(var(--navy-900))] text-white"
            : "bg-white text-[rgb(var(--navy-900))] ring-1 ring-[rgba(1,46,85,0.22)] hover:bg-[rgba(1,46,85,0.06)]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full bg-[rgb(var(--bg-soft))]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-10">
        {/* ✅ items-stretch bikin HeroBanner tinggi sejajar dengan sidebar */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <aside className="flex h-full flex-col gap-4">
            {/* CATEGORY */}
            <div className="rounded-2xl border border-[rgba(1,46,85,0.25)] bg-[rgba(1,46,85,0.04)] p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-black text-[rgb(var(--navy-900))]">
                  CATEGORY
                </div>
                <div className="text-xs font-bold text-[rgb(var(--navy-900))]">
                  {dummyProducts.length}
                </div>
              </div>

              <div className="mt-3 space-y-1">
                {categories.map((c) => {
                  const active = c === category;
                  const count =
                    c === ALL
                      ? dummyProducts.length
                      : dummyProducts.filter((p) => p.category === c).length;

                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold ${
                        active
                          ? "bg-[rgb(var(--navy-900))] text-white"
                          : "text-[rgb(var(--navy-900))] hover:bg-[rgba(1,46,85,0.08)]"
                      }`}
                    >
                      <span>{c}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          active
                            ? "bg-white/15 text-white"
                            : "bg-[rgba(1,46,85,0.12)] text-[rgb(var(--navy-900))]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUICK FILTER */}
            <div className="rounded-2xl border border-[rgba(1,46,85,0.25)] bg-[rgba(1,46,85,0.04)] p-4 shadow-sm">
              <div className="text-sm font-black text-[rgb(var(--navy-900))]">
                Quick Filter
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                <QBtn id="inStock" label="Stok Tersedia" />
                <QBtn id="outOfStock" label="Stok Habis" />
                <QBtn id="priceLow" label="Harga Termurah" />
                <QBtn id="priceHigh" label="Harga Termahal" />
                <button
                  onClick={() => setQuickFilter("none")}
                  className="h-10 rounded-xl bg-white text-sm font-extrabold text-[rgb(var(--navy-900))] ring-1 ring-[rgba(1,46,85,0.22)] hover:bg-[rgba(1,46,85,0.06)]"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </aside>

          {/* HERO */}
          <HeroBanner q={q} setQ={setQ} />
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="w-full pb-14">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { ALL };
