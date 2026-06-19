import { createFileRoute } from "@tanstack/react-router";
import { Building2, RefreshCw, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { sources, vaccinations } from "@/data/vaccinations";

export const Route = createFileRoute("/bronnen")({
  head: () => ({
    meta: [
      { title: "Bronnen — Beeld+ PGO" },
      { name: "description", content: "Aangesloten zorgaanbieders die je vaccinatiegegevens leveren." },
      { property: "og:title", content: "Bronnen — Beeld+ PGO" },
      { property: "og:description", content: "Aangesloten zorgaanbieders die je vaccinatiegegevens leveren." },
    ],
  }),
  component: BronnenPage,
});

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("nl-NL", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function BronnenPage() {
  return (
    <AppShell>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">Aangesloten zorgaanbieders</h1>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Hieronder zie je welke zorgaanbieders volgens het MedMij afsprakenstelsel
        gegevens leveren aan jouw PGO. Per bron kun je het aantal gedeelde vaccinaties
        en het laatste sync-moment zien.
      </p>
      <ul className="grid gap-4 md:grid-cols-2">
        {sources.map((s) => {
          const count = vaccinations.filter((v) => v.organization.id === s.id).length;
          return (
            <li key={s.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span aria-hidden className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold">{s.name}</h2>
                  <p className="text-xs text-muted-foreground">{s.type}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Verbonden
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Vaccinaties</dt>
                  <dd className="font-medium">{count}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Laatste sync</dt>
                  <dd className="font-medium">{fmt(s.lastSync)}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-4 inline-flex min-h-11 items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-accent/15"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden /> Vernieuwen
              </button>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}