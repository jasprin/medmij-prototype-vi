import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Syringe, ShieldCheck, Lock } from "lucide-react";
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
          <h2 id="login-heading" className="text-xl font-semibold">Inloggen met DigiD</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo-omgeving — gebruik onderstaande knop om als testpatiënt {patient.name} in te loggen.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => navigate({ to: "/dashboard" }), 350);
            }}
          >
            <div>
              <label htmlFor="bsn" className="mb-1 block text-sm font-medium">BSN</label>
              <input
                id="bsn"
                name="bsn"
                type="text"
                inputMode="numeric"
                defaultValue={patient.bsn}
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring"
                aria-describedby="bsn-help"
              />
              <p id="bsn-help" className="mt-1 text-xs text-muted-foreground">
                Testpatiënt 999900390 (Scenario 1.1 Nictiz kwalificatiescript).
              </p>
            </div>
            <div>
              <label htmlFor="code" className="mb-1 block text-sm font-medium">Code</label>
              <input
                id="code"
                name="code"
                type="password"
                defaultValue="••••••"
                className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              <Lock className="h-4 w-4" aria-hidden />
              {loading ? "Een moment…" : "Inloggen (demo)"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Geen echte authenticatie. Alleen voor UX-validatie.
            </p>
          </form>
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
