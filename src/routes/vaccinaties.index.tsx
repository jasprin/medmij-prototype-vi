import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListTree, GanttChartSquare, Filter, CheckCircle2, XCircle, Building2, ArrowUpDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  vaccinations,
  groupByDisease,
  formatDateNL,
  getYears,
  getDiseases,
  vaccineDisplay,
  type Vaccination,
} from "@/data/vaccinations";
import { z } from "zod";

const searchSchema = z.object({
  view: z.enum(["groups", "timeline"]).optional(),
  year: z.string().optional(),
  disease: z.string().optional(),
  status: z.enum(["all", "completed", "not-done"]).optional(),
  sort: z.enum(["desc", "asc"]).optional(),
});

export const Route = createFileRoute("/vaccinaties/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Vaccinaties — Beeld+ PGO" },
      { name: "description", content: "Overzicht van al je vaccinaties, gegroepeerd per ziekte, met bron en datum." },
      { property: "og:title", content: "Vaccinaties — Beeld+ PGO" },
      { property: "og:description", content: "Overzicht van al je vaccinaties, gegroepeerd per ziekte." },
    ],
  }),
  component: VaccinationOverview,
});

type View = "groups" | "timeline";
type Sort = "desc" | "asc";

function VaccinationOverview() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const view: View = search.view ?? "groups";
  const year = search.year ?? "all";
  const disease = search.disease ?? "all";
  const status = search.status ?? "all";
  const sort: Sort = search.sort ?? "desc";

  const update = (patch: Record<string, string | undefined>) =>
    navigate({
      search: (prev: Record<string, string | undefined>) => {
        const next = { ...prev, ...patch } as Record<string, string | undefined>;
        for (const k of Object.keys(next)) if (next[k] === "all" || next[k] === undefined) delete next[k];
        return next;
      },
      replace: true,
    });

  const years = useMemo(() => getYears(vaccinations), []);
  const diseases = useMemo(() => getDiseases(vaccinations), []);

  const filtered = useMemo(() => {
    const list = vaccinations.filter((v) => {
      if (year !== "all" && !v.occurrenceDate.startsWith(year)) return false;
      if (disease !== "all" && v.targetDisease !== disease) return false;
      if (status !== "all" && v.status !== status) return false;
      return true;
    });
    return [...list].sort((a, b) =>
      sort === "desc"
        ? b.occurrenceDate.localeCompare(a.occurrenceDate)
        : a.occurrenceDate.localeCompare(b.occurrenceDate),
    );
  }, [year, disease, status, sort]);

  const groups = useMemo(() => groupByDisease(filtered), [filtered]);

  return (
    <AppShell>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Persoonlijke gezondheidsomgeving</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Vaccinaties</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Overzicht conform de MedMij weergaverichtlijn <em>Verzamelen vaccinaties</em> en
            FHIR IG Vaccination-Immunization 2.0.4.
          </p>
        </div>
        <div role="tablist" aria-label="Weergave" className="inline-flex w-full rounded-md border border-border bg-background p-1 sm:w-auto">
          <ViewToggle current={view} value="groups" onChange={(v) => update({ view: v })} icon={<ListTree className="h-4 w-4" />} id="tab-groups" controls="tabpanel-vaccinaties">
            Per ziekte
          </ViewToggle>
          <ViewToggle current={view} value="timeline" onChange={(v) => update({ view: v })} icon={<GanttChartSquare className="h-4 w-4" />} id="tab-timeline" controls="tabpanel-vaccinaties">
            Tijdlijn
          </ViewToggle>
        </div>
      </header>

      <section
        aria-label="Filters"
        className="mb-6 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[auto_1fr_1fr_1fr_auto]"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="h-4 w-4" aria-hidden /> Filteren
        </div>
        <FilterSelect label="Jaar" value={year} onChange={(v) => update({ year: v })}>
          <option value="all">Alle jaren</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </FilterSelect>
        <FilterSelect label="Ziekte" value={disease} onChange={(v) => update({ disease: v })}>
          <option value="all">Alle ziekten</option>
          {diseases.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </FilterSelect>
        <FilterSelect label="Status" value={status} onChange={(v) => update({ status: v })}>
          <option value="all">Alle statussen</option>
          <option value="completed">Toegediend</option>
          <option value="not-done">Niet toegediend</option>
        </FilterSelect>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => update({ sort: sort === "desc" ? "asc" : "desc" })}
            aria-label={`Sorteer op datum, nu ${sort === "desc" ? "nieuwste eerst" : "oudste eerst"}`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent/15 sm:w-auto"
          >
            <ArrowUpDown className="h-4 w-4" aria-hidden />
            {sort === "desc" ? "Nieuwste eerst" : "Oudste eerst"}
          </button>
        </div>
      </section>

      <div
        role="tabpanel"
        id="tabpanel-vaccinaties"
        aria-labelledby={view === "groups" ? "tab-groups" : "tab-timeline"}
        tabIndex={0}
      >
      {filtered.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
          Geen vaccinaties gevonden met de huidige filters.
        </p>
      ) : view === "groups" ? (
        <ol className="space-y-6">
          {groups.map((g) => (
            <li key={g.targetDisease}>
              <article className="overflow-hidden rounded-xl border border-border bg-card">
                <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-muted/40 px-5 py-3">
                  <div>
                    <h2 className="text-lg font-semibold text-primary">{g.targetDisease}</h2>
                    <p className="text-xs text-muted-foreground">
                      {g.completedCount} toegediend · laatst {formatDateNL(g.lastDate)}
                    </p>
                  </div>
                </header>
                <ul className="divide-y divide-border">
                  {g.items.map((v) => (
                    <li key={v.id}>
                      <VaccinationRow v={v} />
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <Timeline items={filtered} />
      )}
      </div>
    </AppShell>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
      >
        {children}
      </select>
    </div>
  );
}

function ViewToggle({
  current,
  value,
  onChange,
  icon,
  children,
  id,
  controls,
}: {
  current: View;
  value: View;
  onChange: (v: View) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  controls?: string;
}) {
  const selected = current === value;
  return (
    <button
      role="tab"
      id={id}
      aria-controls={controls}
      aria-selected={selected}
      onClick={() => onChange(value)}
      className={
        "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors sm:flex-initial " +
        (selected ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent/15")
      }
    >
      <span aria-hidden>{icon}</span>
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: Vaccination["status"] }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Toegediend
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-2 py-0.5 text-xs font-medium text-accent-foreground">
      <XCircle className="h-3.5 w-3.5" aria-hidden /> Niet toegediend
    </span>
  );
}

function VaccinationRow({ v }: { v: Vaccination }) {
  const name = v.product?.name ?? vaccineDisplay(v.vaccineCode);
  return (
    <Link
      to="/vaccinaties/$id"
      params={{ id: v.id }}
      aria-label={`Details van ${name} (${v.targetDisease}) op ${formatDateNL(v.occurrenceDate)}`}
      className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-accent/10 sm:px-5"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{name}</span>
          <StatusBadge status={v.status} />
          {v.doseNumber && v.seriesDoses ? (
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              Dosis {v.doseNumber}/{v.seriesDoses}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDateNL(v.occurrenceDate)} · {v.series ?? "—"}
        </p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" aria-hidden /> Bron: {v.organization.name}
        </p>
      </div>
      <span aria-hidden className="shrink-0 text-sm font-medium text-primary">Details →</span>
    </Link>
  );
}

function Timeline({ items }: { items: Vaccination[] }) {
  const byYear = new Map<string, Vaccination[]>();
  for (const v of items) {
    const y = v.occurrenceDate.slice(0, 4);
    byYear.set(y, [...(byYear.get(y) ?? []), v]);
  }
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-20" />
      <ol className="space-y-8">
        {[...byYear.entries()].map(([year, list]) => (
          <li key={year}>
            <div className="relative pl-12 sm:pl-28">
              <div
                aria-hidden
                className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground sm:left-12"
              >
                {year.slice(2)}
              </div>
              <h2 className="text-xl font-semibold text-primary">{year}</h2>
              <ul className="mt-3 space-y-3">
                {list.map((v) => (
                  <li key={v.id} className="rounded-lg border border-border bg-card p-4">
                    <Link
                      to="/vaccinaties/$id"
                      params={{ id: v.id }}
                      aria-label={`Details van ${v.product?.name ?? vaccineDisplay(v.vaccineCode)} (${v.targetDisease}) op ${formatDateNL(v.occurrenceDate)}`}
                      className="block"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium">{v.product?.name ?? vaccineDisplay(v.vaccineCode)}</div>
                        <StatusBadge status={v.status} />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatDateNL(v.occurrenceDate)} · <span className="text-primary">{v.targetDisease}</span> · {v.organization.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}