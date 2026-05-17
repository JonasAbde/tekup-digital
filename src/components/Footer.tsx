import Link from "next/link";

const footerLinks = {
  ydelser: [
    { label: "AI Support Agent", href: "/#support-agent" },
    { label: "AI Sales Agent", href: "/#sales-agent" },
    { label: "Admin Agent", href: "/#admin-agent" },
    { label: "Website Starter", href: "/#starter" },
    { label: "Website Pro", href: "/#pro" },
    { label: "Chatbot Basis", href: "/#chatbot" },
  ],
  virksomhed: [
    { label: "Om os", href: "/#about" },
    { label: "Kontakt", href: "/#kontakt" },
  ],
  legal: [
    { label: "Privatlivspolitik", href: "/privatliv" },
    { label: "Cookiepolitik", href: "/cookies" },
    { label: "Handelsbetingelser", href: "/vilkar" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-card" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white" aria-label="Tekup Digital — Forside">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-[10px] font-bold text-white">
                T
              </span>
              Tekup Digital
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-light">
              AI-drevne agenter, moderne hjemmesider og smarte chatbots til danske SMV&apos;er.
              Baseret i Aarhus.
            </p>
            <p className="mt-4 text-xs text-muted">
              M.P. Bruuns Gade 36 · 8000 Aarhus C<br />
              CVR: 45 35 29 18<br />
              <a href="mailto:hej@tekup.dk" className="text-brand-light hover:underline">
                hej@tekup.dk
              </a>
              {" · "}
              <a href="tel:+4591725599" className="text-brand-light hover:underline">
                91 72 55 99
              </a>
            </p>
          </div>

          {/* Ydelser */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">Ydelser</h3>
            <ul className="space-y-3">
              {footerLinks.ydelser.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Virksomhed */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">Virksomhed</h3>
            <ul className="space-y-3">
              {footerLinks.virksomhed.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-muted">
          <p>© {currentYear} Tekup Digital. Alle rettigheder forbeholdes.</p>
          <p className="mt-1">
            Tekup Digital ApS · CVR: 45 35 29 18 · M.P. Bruuns Gade 36, 8000 Aarhus C
          </p>
        </div>
      </div>
    </footer>
  );
}
