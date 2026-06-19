import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { ArrowLeft, Building2, Calendar, MapPin, Syringe, User, AlertCircle, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { vaccinations, formatDateNL, vaccineDisplay } from "@/data/vaccinations";

export const Route = createFileRoute("/vaccinaties/$id")({
  loader: ({ params }) => {
    const item = vaccinations.find((v) => v.id === params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.item.product?.name ?? (loaderData ? vaccineDisplay(loaderData.item.vaccineCode) : "Vaccinatie")} — Beeld+ PGO` },
      { name: "description", content: "Detailweergave van een vaccinatie volgens FHIR IG Vaccination-Immunization 2.0.4." },
    ],
  }),
  notFoundComponent: NotFound,
  errorComponent: ErrorBlock,
  component: VaccinationDetail,
});

function NotFound() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Vaccinatie niet gevonden</h1>
      <p className="mt-2 text-muted-foreground">Deze vaccinatie bestaat niet of is niet zichtbaar.</p>
      <Link to="/vaccinaties" className="mt-4 inline-flex items-center gap-1 text-primary underline">
        <ArrowLeft className="h-4 w-4" /> Terug naar overzicht
      </Link>
    </AppShell>
  );
}

function ErrorBlock({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">Er ging iets mis</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button
        onClick={() => { router.invalidate(); reset(); }}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >Opnieuw proberen</button>
    </AppShell>
  );
}

function VaccinationDetail() {
  const { item: v } = Route.useLoaderData();

  return (
    <AppShell>
      <Link to="/vaccinaties" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Terug naar overzicht
      </Link>

      <header className="rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-medium uppercase tracking-wide text-secondary">{v.targetDisease}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          {v.product?.name ?? vaccineDisplay(v.vaccineCode)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatDateNL(v.occurrenceDate)}
          {v.doseNumber && v.seriesDoses ? ` · Dosis ${v.doseNumber} van ${v.seriesDoses}` : ""}
          {v.series ? ` · ${v.series}` : ""}
        </p>
        <div className="mt-3">
          {v.status === "completed" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium">
              ✓ Toegediend
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-3 py-1 text-sm font-medium">
              <AlertCircle className="h-4 w-4" aria-hidden /> Niet toegediend
              {v.statusReason ? ` — ${v.statusReason}` : ""}
            </span>
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card icon={<Syringe />} title="Vaccin">
          <Row label="Vaccinnaam">{vaccineDisplay(v.vaccineCode)}</Row>
          {v.vaccineCode.coding.map((c: { system: string; code: string; display: string }) => (
            <Row key={`${c.system}-${c.code}`} label={c.system.includes("snomed") ? "SNOMED CT" : "Code"}>
              {c.code}
            </Row>
          ))}
          {v.product ? (
            <>
              <Row label="Product">{v.product.name}</Row>
              {v.product.manufacturer ? <Row label="Fabrikant">{v.product.manufacturer}</Row> : null}
              {v.product.lotNumber ? <Row label="Batch / lotnummer">{v.product.lotNumber}</Row> : null}
            </>
          ) : null}
        </Card>

        <Card icon={<Calendar />} title="Toediening">
          <Row label="Datum">{formatDateNL(v.occurrenceDate)}</Row>
          {v.doseNumber ? <Row label="Dosis in serie">{v.doseNumber}{v.seriesDoses ? ` van ${v.seriesDoses}` : ""}</Row> : null}
          {v.series ? <Row label="Serie">{v.series}</Row> : null}
          {v.doseQuantity ? <Row label="Hoeveelheid">{v.doseQuantity}</Row> : null}
        </Card>

        <Card icon={<MapPin />} title="Locatie op lichaam">
          {v.site ? <Row label="Plaats">{v.site}</Row> : <Row label="Plaats">Niet vastgelegd</Row>}
          {v.route ? <Row label="Toedieningsweg">{v.route}</Row> : null}
        </Card>

        <Card icon={<User />} title="Toediener">
          {v.performer ? (
            <>
              <Row label="Naam">{v.performer.name}</Row>
              {v.performer.role ? <Row label="Rol">{v.performer.role}</Row> : null}
            </>
          ) : (
            <Row label="Naam">Niet vastgelegd</Row>
          )}
        </Card>

        <Card icon={<Building2 />} title="Bronvermelding" wide>
          <Row label="Zorgaanbieder">{v.organization.name}</Row>
          {v.organization.type ? <Row label="Type">{v.organization.type}</Row> : null}
          <Row label="Primaire bron">{v.primarySource ? "Ja — direct van toedienende organisatie" : "Nee"}</Row>
        </Card>

        {v.note ? (
          <Card icon={<FileText />} title="Notitie" wide>
            <p className="text-sm">{v.note}</p>
          </Card>
        ) : null}

        {v.reaction ? (
          <Card icon={<AlertCircle />} title="Reactie" wide>
            <Row label="Datum">{formatDateNL(v.reaction.date)}</Row>
            <Row label="Omschrijving">{v.reaction.description}</Row>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}

function Card({ icon, title, wide, children }: { icon: React.ReactNode; title: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <section className={"rounded-xl border border-border bg-card p-5 " + (wide ? "sm:col-span-2" : "")}>
      <header className="mb-3 flex items-center gap-2">
        <span aria-hidden className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      </header>
      <dl className="grid gap-1.5 text-sm">{children}</dl>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[140px_1fr] sm:gap-2">
      <dt className="text-xs text-muted-foreground sm:text-sm">{label}</dt>
      <dd className="font-medium break-words">{children}</dd>
    </div>
  );
}