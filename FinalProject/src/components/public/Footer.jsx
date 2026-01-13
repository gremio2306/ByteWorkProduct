import React from "react";
import { HelpCircle, Mail, Phone, Clock } from "lucide-react";

export default function Footer({ onHelp }) {
  return (
    <footer className="mt-10 border-t border-[rgba(1,46,85,0.18)] bg-[rgb(var(--navy-900))]">
      <div className="bg-gradient-to-b from-[rgba(255,255,255,0.06)] via-transparent to-transparent">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            {/* ================= BRAND ================= */}
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[rgb(var(--navy-900))] font-black shadow-sm ring-1 ring-white/20">
                  BW
                </div>

                <div className="leading-tight">
                  <div className="text-base font-black text-white">
                    ByteWork Store
                  </div>
                  <div className="text-xs text-white/70">Demo e-commerce</div>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                Demo e-commerce modern yang responsif, cepat, dan mudah
                dikembangkan menggunakan React dan Tailwind CSS.
              </p>
            </div>

            {/* ================= MENU + BANTUAN ================= */}
            <div>
              <div className="text-sm font-black text-white">Menu</div>

              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#katalog"
                    className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Katalog
                  </a>
                </li>
              </ul>

              {/* ✅ BANTUAN DIPINDAHKAN KE SINI */}
              <button
                type="button"
                onClick={onHelp}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-extrabold text-[rgb(var(--navy-900))] shadow-sm ring-1 ring-white/20 transition hover:bg-white/90 active:scale-[0.98]"
              >
                <HelpCircle size={18} />
                Bantuan
              </button>
            </div>

            {/* ================= KONTAK ================= */}
            <div>
              <div className="text-sm font-black text-white">Kontak</div>

              <div className="mt-4 grid gap-3">
                {/* Email */}
                <div className="rounded-2xl bg-white/6 p-4 ring-1 ring-white/12 backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-white/70">
                    <Mail size={14} /> Email
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    support@byteworkstore.demo
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="rounded-2xl bg-white/6 p-4 ring-1 ring-white/12 backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-white/70">
                    <Phone size={14} /> WhatsApp
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    +62 856-5224-4246
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="rounded-2xl bg-white/6 p-4 ring-1 ring-white/12 backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-white/70">
                    <Clock size={14} /> Jam Operasional
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    09.00 – 21.00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} ByteWork Store. All rights reserved.
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-lg px-2 py-1 transition hover:bg-white/10 hover:text-white"
              >
                Privacy
              </button>
              <button
                type="button"
                className="rounded-lg px-2 py-1 transition hover:bg-white/10 hover:text-white"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
