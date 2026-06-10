import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Syringe, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { patient } from "@/data/vaccinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inloggen — Beeld+ PGO" },
      { name: "description", content: "Log in op je persoonlijke gezondheidsomgeving en bekijk je vaccinatieoverzicht." },
      { property: "og:title", content: "Inloggen — Beeld+ PGO" },
      { property: "og:description", content: "Persoonlijke gezondheidsomgeving voor het verzamelen en beheren van je vaccinaties." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <header className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold text-primary">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Syringe className="h-5 w-5" />
          </span>
          <span className="text-lg">
            Beeld<span className="text-secondary">+</span>
            <span className="block text-xs font-normal text-muted-foreground">PGO — MedMij</span>
          </span>
        </Link>
      </header>
      <main className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:items-center">
        <section>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Volgens MedMij afsprakenstelsel
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Jouw vaccinaties,<br />
            <span className="text-primary">op één plek bij elkaar.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Verzamel veilig je vaccinatiegegevens uit het Rijksvaccinatieprogramma,
            de huisarts en de GGD. Bekijk wanneer je welke prik kreeg, lees de details
            en deel ze met wie jij wilt.
          </p>
          <ul className="mt-8 grid gap-3 text-sm">
            <Feature>Inzicht in alle vaccinaties — RVP, reis, griep, COVID-19</Feature>
            <Feature>Bron en datum bij elke vaccinatie</Feature>
            <Feature>Toegankelijk volgens WCAG 2.1 AA</Feature>
          </ul>
        </section>

        <section aria-labelledby="login-heading" className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <h2 id="login-heading" className="text-xl font-semibold">Bekijk de demo</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Dit is een niet-functioneel prototype. Je gaat door als testpatiënt
            <span className="font-medium text-foreground"> {patient.name}</span> (BSN {patient.bsn}, Scenario 1.1 Nictiz kwalificatiescript).
          </p>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => navigate({ to: "/dashboard" }), 250);
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {loading ? "Een moment…" : "Doorgaan naar mijn PGO"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Geen echte authenticatie. Alleen voor UX-validatie.
          </p>
        </section>
      </main>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-secondary text-secondary-foreground">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
