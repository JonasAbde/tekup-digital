"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Ydelser", href: "/#ydelser" },
  { label: "Priser", href: "/#priser" },
  { label: "Sådan virker det", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
          aria-label="Tekup Digital — Forside"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-bold text-white">
            T
          </span>
          Tekup
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Hovednavigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-dark"
          >
            Gratis samtale
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="border-t border-white/10 bg-black/95 px-4 pb-6 pt-4 md:hidden"
          aria-label="Mobil navigation"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-gray-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-block rounded-lg bg-brand px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Gratis samtale
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
