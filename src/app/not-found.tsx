import Link from "next/link";

import { TekkoMascot } from "@/components/tekko";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-center">
          <TekkoMascot state="error" size="xl" />
        </div>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">404</h1>
        <p className="mt-4 text-lg text-muted-light">
          Siden findes ikke — Tekko har ledt, men kunne desværre ikke finde den.
        </p>
        <p className="mt-2 text-sm text-muted">
          Måske er linket forkert, eller siden er flyttet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-white transition-all hover:bg-brand-dark"
        >
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
