import { createFileRoute, Link } from "@tanstack/react-router";
import { Syringe, Pill, FlaskConical, Stethoscope, ChevronRight, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { patient, sources, vaccinations, formatDateNL } from "@/data/vaccinations";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Beeld+ PGO" },
      { name: "description", content: "Persoonlijk overzicht van je gezondheidsgegevens en vaccinaties." },
      { property: "og:title", content: "Dashboard — Beeld+ PGO" },
      { property: "og:description", content: "Persoonlijk overzicht van je gezondheidsgegevens en vaccinaties." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const total = vaccinations.length;
  const completed = vaccinations.filter((v) => v.status === "completed").length;
  const lastVacc = [...vaccinations]
    .filter((v) => v.status === "completed")
    .sort((a, b) => b.occurrenceDate.localeCompare(a.occurrenceDate))[0];

  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Welkom terug,</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{patient.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hieronder zie je een samenvatting van je persoonlijke gezondheidsomgeving.
        </p>
      </div>

      {/* Vaccinaties — hoofdtegel */}
      <Link
        to="/vaccinaties"
        className="group block rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/85 p-6 text-primary-foreground shadow-sm transition-shadow hover:shadow-md sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
              <Syringe className="h-3.5 w-3.5" aria-hidden /> Vaccinaties
            </div>
            <h2 className="text-2xl font-semibold leading-tight">Verzamelen vaccinaties</h2>
            <p className="mt-2 text-sm text-primary-foreground/85">
              {completed} toegediende vaccinaties van {sources.length} zorgaanbieders.
              {lastVacc ? ` Laatste vaccinatie op ${formatDateNL(lastVacc.occurrenceDate)}.` : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-foreground/10 px-4 py-3 text-center">
              <div className="text-3xl font-semibold leading-none">{total}</div>
              <div className="text-xs uppercase tracking-wide text-primary-foreground/70">registraties</div>
            </div>
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden />
          </div>
        </div>
      </Link>

      {/* Andere PGO-domeinen — placeholders */}
      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Overige onderwerpen
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlaceholderTile icon={<Pill />} title="Medicatie" desc="Recepten en gebruik" />
        <PlaceholderTile icon={<FlaskConical />} title="Labuitslagen" desc="Bloed, urine en meer" />
        <PlaceholderTile icon={<Stethoscope />} title="Behandelingen" desc="Consulten en verwijzingen" />
      </div>

      {/* Sync status */}
      <section aria-labelledby="bron-heading" className="mt-10 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="bron-heading" className="text-base font-semibold">Aangesloten zorgaanbieders</h2>
            <p className="text-sm text-muted-foreground">{sources.length} bronnen leveren je vaccinatiegegevens.</p>
          </div>
          <Link to="/bronnen" className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent/15">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden /> Beheer
          </Link>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {sources.map((s) => (
            <li key={s.id} className="rounded-md border border-border bg-background p-3 text-sm">
              <div className="font-medium">{s.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{s.type}</div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}

function PlaceholderTile({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div
      role="group"
      aria-label={`${title} — binnenkort beschikbaar`}
      className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-card p-5 text-muted-foreground"
    >
      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-foreground/60">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 font-medium text-foreground/80">
          {title}
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">Binnenkort</span>
        </div>
        <p className="mt-0.5 text-sm">{desc}</p>
      </div>
    </div>
  );
}