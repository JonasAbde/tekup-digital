"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { TekkoAssistantWidget, TekkoMascot } from "@/components/tekko";

/* ============================================
   DATA
   ============================================ */

const services = [
  {
    id: "support-agent",
    title: "AI Support Agent",
    tag: "Agent",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description:
      "24/7 kundeservice chatbot der håndterer spørgsmål, billetter og bookinger. Integreres med jeres systemer på én dag.",
    price: "2.499 kr./md.",
    setup: "4.999 kr.",
    features: [
      "AI-drevet svar på dansk",
      "Integration med jeres systemer",
      "Løbende træning af AI",
      "Analyse & rapportering",
    ],
  },
  {
    id: "sales-agent",
    title: "AI Sales Agent",
    tag: "Agent",
    tagColor: "bg-amber-500/10 text-amber-400",
    description:
      "Automatisk lead-generering, kvalificering og opfølgning. AI der finder, kontakter og booker møder for dig.",
    price: "3.999 kr./md.",
    setup: "7.999 kr.",
    features: [
      "Automatisk lead-scanning",
      "Personlige outreach emails",
      "Pipeline management",
      "Booking af møder",
    ],
  },
  {
    id: "admin-agent",
    title: "Admin Agent",
    tag: "Agent",
    tagColor: "bg-purple-500/10 text-purple-400",
    description:
      "AI-assistent der håndterer administration, fakturering, rapporter og kalenderstyring. Spar timer hver uge.",
    price: "1.999 kr./md.",
    setup: "3.999 kr.",
    features: [
      "Fakturering & bogføring",
      "Kalenderstyring",
      "Rapportgenerering",
      "Dokumenthåndtering",
    ],
  },
  {
    id: "starter",
    title: "Website Starter",
    tag: "Website",
    tagColor: "bg-blue-500/10 text-blue-400",
    description:
      "Moderne 1-side hjemmeside med dark theme, kontaktformular og mobiloptimering. Klar på 3 hverdage.",
    price: "4.999 kr.",
    setup: "Inkluderet",
    features: [
      "Responsivt design",
      "Dark theme",
      "Kontaktformular",
      "SEO-optimering",
      "Mobilvenlig",
    ],
  },
  {
    id: "pro",
    title: "Website Pro",
    tag: "Website",
    tagColor: "bg-blue-500/10 text-blue-400",
    description:
      "Fuld 5-siders hjemmeside med blog, CMS, booking/kalender, SEO og cookie-compliance. Den komplette løsning.",
    price: "14.999 kr.",
    setup: "Inkluderet",
    features: [
      "5 sider + blog",
      "CMS (rediger selv)",
      "Cookie-compliance",
      "SEO-pakke inkluderet",
      "Booking/kalender modul",
    ],
  },
  {
    id: "chatbot",
    title: "Chatbot Basis",
    tag: "Chatbot",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description:
      "Smart FAQ-chatbot til din hjemmeside. Svarer på kunders spørgsmål 24/7 og samler leads ind.",
    price: "999 kr./md.",
    setup: "2.999 kr.",
    features: [
      "FAQ-baseret AI",
      "Lead-indsamling",
      "Chat history",
      "1 times support/md.",
    ],
  },
  {
    id: "bundle",
    title: "Fuldt Bundle",
    tag: "Populær",
    tagColor: "bg-brand/10 text-brand-light",
    description:
      "Support Agent + Website Pro + Chatbot + Compliance. Alt hvad en SMV har brug for. Rabat: 25%.",
    price: "5.999 kr./md.",
    setup: "19.999 kr.",
    highlight: true,
    features: [
      "AI Support Agent",
      "Website Pro",
      "Chatbot Basis",
      "Cookie-compliance",
      "Prioriteret support",
      "Månedlig SEO-rapport",
    ],
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Book en gratis samtale",
    description:
      "Vi tager en uforpligtende snak om dine behov — 30 minutter. Du bestemmer, vi rådgiver.",
  },
  {
    step: "2",
    title: "Vi bygger din løsning",
    description:
      "Vi sætter din agent/website op på 1-5 hverdage afhængig af pakken. Du følger med undervejs.",
  },
  {
    step: "3",
    title: "Kør, mål, optimér",
    description:
      "Løsningen kører 24/7. Vi følger op månedligt med rapport og optimering — du får resultater.",
  },
];

const faqItems = [
  {
    q: "Hvad koster det, hvis jeg vil afprøve en AI-agent?",
    a: "Alle agenter har en opsætningspris og en månedlig pris. Opsætningen er engang — du betaler kun for den tid, det tager at træne din agent og integrere den. Bagefter kører den automatisk.",
  },
  {
    q: "Kan I integrere med mine eksisterende systemer?",
    a: "Ja. Vi understøtter integration med de fleste danske systemer — herunder e-conomic, Shopify, WooCommerce, WordPress, kalendersystemer og CRM'er. Hvis dit system ikke er på listen, kigger vi på det.",
  },
  {
    q: "Hvor lang tid tager det at lave en hjemmeside?",
    a: "Starter-pakken er klar på 3 hverdage. Pro-pakken tager 5-7 hverdage. Det skyldes, at vores skabeloner er forudbyggede — vi tilpasser dem til dit brand og dit indhold.",
  },
  {
    q: "Er I GDPR-compliant?",
    a: "Ja. Alle vores løsninger leveres med cookie-consent banner, privatlivspolitik, CVR i footer og overholdelse af gældende dansk lovgivning. Vi tilbyder også en compliance-pakke som tilvalg.",
  },
  {
    q: "Hvad hvis jeg ikke er tilfreds?",
    a: "Vi har 14 dages fortrydelsesret på alle vores pakker. Og løbende opsigelse på månedsabonnementer — ingen binding.",
  },
];

/* ============================================
   COMPONENTS
   ============================================ */

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => setVisible(true);
    const hasHashTarget = () => {
      const targetId = window.location.hash.slice(1);
      return Boolean(targetId && el.querySelector(`#${CSS.escape(targetId)}`));
    };

    const revealOnHashTarget = () => {
      if (!hasHashTarget()) return undefined;
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    };

    const cleanupHashReveal = revealOnHashTarget();
    if (cleanupHashReveal) return cleanupHashReveal;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    const onHashChange = () => {
      if (hasHashTarget()) reveal();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <div ref={ref} className={`${visible ? "visible" : ""} reveal ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-light">{subtitle}</p>}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-accent" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-950/15 via-black to-black" />
        <div
          className="animate-blob pointer-events-none absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-blob-delayed pointer-events-none absolute -bottom-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="animate-fade-in-up stagger-1">
            <span className="inline-block rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-medium text-brand-light">
              AI-drevne løsninger til danske SMV&apos;er
            </span>
          </div>

          <h1 className="animate-fade-in-up stagger-2 mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Din virksomhed fortjener{" "}
            <span className="animate-gradient bg-gradient-to-r from-emerald-400 via-brand to-accent bg-clip-text text-transparent">
              mere intelligente værktøjer
            </span>
          </h1>

          <p className="animate-fade-in-up stagger-3 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-light">
            AI-agenter der arbejder 24/7, hjemmesider der sælger, og chatbots der supporterer.
            Få mere gjort for færre penge — med Tekup Digital.
          </p>

          <div className="animate-fade-in-up stagger-4 mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#ydelser"
              className="rounded-lg bg-brand px-8 py-3 font-semibold text-white transition-all hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-brand"
            >
              Se vores ydelser
            </Link>
            <Link
              href="#kontakt"
              className="rounded-lg border border-white/20 px-8 py-3 font-semibold text-gray-300 transition-all hover:border-white/40 hover:text-white"
            >
              Gratis samtale
            </Link>
          </div>

          <div className="animate-fade-in-up stagger-5 mx-auto mt-10 max-w-xl text-left">
            <TekkoAssistantWidget
              state="idle"
              title="Tekko holder styr på næste skridt"
              message="Start med ydelserne eller book en gratis samtale, så hjælper vi med at finde den enkleste AI-løsning først."
              progress={35}
              actions={[
                { label: "Se agentpakker", href: "#ydelser" },
                { label: "Kontakt os", href: "#kontakt" },
              ]}
            />
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in-up stagger-5 mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Baseret i Aarhus
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Dansk support
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              14 dages fortrydelsesret
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Løbende uden binding
            </span>
          </div>
        </div>
      </section>

      {/* ============ SERVICES / AGENT PACKS ============ */}
      <RevealSection>
        <section id="ydelser" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              title="Vores ydelser"
              subtitle="AI-agenter, hjemmesider og chatbots — skræddersyet til danske SMV'er"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`group scroll-mt-24 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 ${
                    service.highlight
                      ? "border-brand/40 bg-gradient-to-b from-brand/10 to-card hover:border-brand/60"
                      : "border-border bg-card/50 hover:border-border-hover hover:bg-card"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${service.tagColor}`}
                    >
                      {service.tag}
                    </span>
                    {service.highlight && (
                      <span className="rounded-md bg-brand/20 px-2.5 py-1 text-xs font-medium text-brand-light">
                        Spar 25%
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-light">
                    {service.description}
                  </p>

                  <ul className="mb-6 space-y-2" role="list" aria-label={`Funktioner for ${service.title}`}>
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border pt-4">
                    <p className="text-2xl font-bold text-white">
                      {service.price}
                      {service.price.includes("kr./md.") && (
                        <span className="ml-1 text-xs font-normal text-muted">/md.</span>
                      )}
                    </p>
                    {service.setup && (
                      <p className="mt-0.5 text-xs text-muted">Opsætning: {service.setup}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ============ HOW IT WORKS ============ */}
      <RevealSection>
        <section id="how-it-works" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeader
              title="Sådan virker det"
              subtitle="Fra første samtale til kørende løsning på få dage"
            />

            <div className="grid gap-8 sm:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-xl font-bold text-white shadow-lg shadow-brand/20">
                    {item.step}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-light">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ============ PRICING TABLE (prisliste) ============ */}
      <RevealSection>
        <section id="priser" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              title="Prisoversigt"
              subtitle="Gennemsigtige priser — ingen skjulte gebyrer"
            />

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm" role="table">
                <thead>
                  <tr className="border-b border-border bg-card text-xs uppercase tracking-wider text-muted">
                    <th className="px-5 py-4 font-semibold" scope="col">Ydelse</th>
                    <th className="px-5 py-4 font-semibold" scope="col">Type</th>
                    <th className="px-5 py-4 font-semibold" scope="col">Opsætning</th>
                    <th className="px-5 py-4 font-semibold" scope="col">Månedligt</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s, i) => (
                    <tr
                      key={s.id}
                      className={`border-b border-border transition-colors hover:bg-card/80 ${
                        s.highlight ? "bg-brand/5" : ""
                      } ${i === services.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-5 py-4 font-medium text-white">{s.title}</td>
                      <td className="px-5 py-4 text-muted-light">{s.tag}</td>
                      <td className="px-5 py-4 text-muted-light">{s.setup}</td>
                      <td className="px-5 py-4 font-semibold text-white">{s.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-center text-xs text-muted">
              Alle priser er ekskl. moms. Opsætningspris betales én gang. Månedlige abonnementer kan opsiges løbende.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ============ FAQ ============ */}
      <RevealSection>
        <section id="faq" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionHeader
              title="Ofte stillede spørgsmål"
              subtitle="Svar på det du måske tænker"
            />

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ============ ABOUT ============ */}
      <RevealSection>
        <section id="om-os" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              title="Om Tekup Digital"
              subtitle="Vi bygger AI-løsninger der virker — til danske SMV&apos;er"
            />

            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  AI skal ikke være kompliceret
                </h3>
                <p className="text-sm leading-relaxed text-muted-light">
                  Tekup Digital er grundlagt med én mission: gøre AI tilgængeligt for danske
                  SMV&apos;er uden store IT-afdelinger. Vi bygger AI-agenter, hjemmesider og
                  chatbots der sparer tid og skaber resultater — fra dag ét.
                </p>
                <p className="text-sm leading-relaxed text-muted-light">
                  Vores løsninger kører på Cloudflare&apos;s infrastruktur og er designet til at
                  være hurtige, sikre og GDPR-compliant. Vi bruger selv teknologieme vi sælger
                  — vores egen AI-assistent Tekko er et levende bevis.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <TekkoMascot state="idle" size="sm" />
                  <span className="text-xs text-muted">
                    Tekko, vores interne AI-maskot — til stede i hele produktet.
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Vores værdier
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "Enkelthed", desc: "Vi skærer igennem kompleksiteten. AI skal være lige til at tage i brug." },
                    { title: "Gennemsigtighed", desc: "Faste priser, ingen skjulte gebyrer, løbende opsigelse." },
                    { title: "Dansk support", desc: "Vi er baseret i Aarhus og taler dansk — også når det gælder support." },
                  ].map((v) => (
                    <li key={v.title} className="rounded-lg border border-border bg-card/40 p-4">
                      <p className="text-sm font-bold text-white">{v.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-light">{v.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ============ CONTACT ============ */}
      <RevealSection>
        <section id="kontakt" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              title="Klar til at komme i gang?"
              subtitle="Book en uforpligtende 30-minutters samtale. Vi finder den rigtige løsning til dig."
            />

            <div className="mx-auto max-w-4xl rounded-xl border border-border bg-gradient-to-b from-emerald-950/20 to-amber-950/20 p-8 sm:p-12">
              <div className="grid gap-10 md:grid-cols-2">
                {/* Contact info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Kontaktinformation</h3>
                  <div className="space-y-4">
                    <ContactInfo
                      icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      }
                      label="Email"
                      value="hej@tekup.dk"
                      href="mailto:hej@tekup.dk"
                    />
                    <ContactInfo
                      icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      }
                      label="Telefon"
                      value="+45 91 72 55 99"
                      href="tel:+4591725599"
                    />
                    <ContactInfo
                      icon={
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      }
                      label="Adresse"
                      value="M.P. Bruuns Gade 36, 8000 Aarhus C"
                    />
                  </div>

                  <p className="text-xs text-muted">
                    Vi svarer typisk inden for 2 timer i hverdagene.
                  </p>

                  <div className="flex items-center gap-4 border-t border-border pt-6">
                    <TekkoMascot state="idle" size="md" />
                    <div>
                      <p className="text-sm font-semibold text-white">Tekko læser med på behovet.</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-light">
                        Skriv bare kort. Vi omsætter det til næste praktiske skridt.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </RevealSection>
    </>
  );
}

/* ============================================
   SUB-COMPONENTS
   ============================================ */

function ContactInfo({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-light">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted">{label}</p>
        {href ? (
          <a href={href} className="font-medium text-white transition-colors hover:text-brand-light">
            {value}
          </a>
        ) : (
          <p className="font-medium text-white">{value}</p>
        )}
      </div>
    </div>
  );
}

const SERVICE_OPTIONS = [
  { value: "", label: "Vælg hvad du er interesseret i..." },
  { value: "website-starter", label: "Website Starter — 14.999 kr." },
  { value: "website-pro", label: "Website Pro — 34.999 kr." },
  { value: "support-agent", label: "AI Support Agent — 2.499 kr./md." },
  { value: "sales-agent", label: "AI Sales Agent — 3.999 kr./md." },
  { value: "admin-agent", label: "Admin Agent — 1.999 kr./md." },
  { value: "bundle-full", label: "Fuld pakke — spar 20%" },
  { value: "seo-compliance", label: "SEO & Compliance — fra 999 kr." },
  { value: "other", label: "Andet / ved ikke endnu" },
];

function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    const service = data.get("service") as string;
    const company = data.get("company") as string;

    if (!name || !email || !message) return;

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://chat.tekup.dk/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, service, company }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Kunne ikke sende besked");
      }

      setState("sent");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Der skete en fejl");
    }
  }, []);

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-6 py-12 text-center">
        <TekkoMascot state="success" size="lg" />
        <h3 className="mt-4 text-lg font-bold text-white">Tak for din henvendelse!</h3>
        <p className="mt-2 text-sm text-muted-light">
          Tekko har sendt beskeden videre. Vi vender tilbage inden for 24 timer — typisk meget hurtigere.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="service" className="mb-1 block text-sm font-medium text-muted-light">
          Jeg er interesseret i
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-card text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-muted-light">
            Navn <span className="text-brand">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Dit navn"
            className="w-full rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-muted-light">
            Email <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="din@email.dk"
            className="w-full rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-muted-light">
          Virksomhed
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Dit firmanavn (valgfrit)"
          className="w-full rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-muted-light">
          Besked <span className="text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Fortæl lidt om din virksomhed og hvad du har brug for..."
          className="w-full resize-none rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm text-white placeholder-muted outline-none transition-colors focus:border-brand/50 focus:ring-1 focus:ring-brand/20"
        />
      </div>
      {state === "error" && (
        <p className="text-sm text-red-400">{errorMsg || "Der skete en fejl. Prøv igen eller skriv direkte til hej@tekup.dk"}</p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-brand px-6 py-3 font-semibold text-white transition-all hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-50"
      >
        {state === "sending" ? "Sender..." : "Send besked"}
      </button>
      <p className="text-center text-xs text-muted">
        Vi deler aldrig dine oplysninger med tredjepart.
      </p>
    </form>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card/50 transition-colors hover:bg-card/80">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 text-sm font-medium text-white">{question}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border px-6 pb-4 pt-3">
          <p className="text-sm leading-relaxed text-muted-light">{answer}</p>
        </div>
      )}
    </div>
  );
}
