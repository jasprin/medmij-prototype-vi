import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/toegankelijkheid")({
  head: () => ({
    meta: [
      { title: "Toegankelijkheid — Beeld+ PGO" },
      { name: "description", content: "Toegankelijkheidsverklaring conform WCAG 2.1 niveau AA." },
      { property: "og:title", content: "Toegankelijkheid — Beeld+ PGO" },
      { property: "og:description", content: "Toegankelijkheidsverklaring conform WCAG 2.1 niveau AA." },
    ],
  }),
  component: A11yPage,
});

function A11yPage() {
  return (
    <AppShell title="Toegankelijkheidsverklaring">
      <div className="max-w-3xl space-y-6 text-sm leading-relaxed">
        <p>
          Dit prototype streeft naar conformiteit met{" "}
          <a className="text-primary underline" href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noreferrer">
            WCAG 2.1 niveau AA
          </a>
          . Hieronder vatten we de belangrijkste maatregelen samen.
        </p>
        <Section title="Waarneembaar">
          <li>Tekstcontrast minimaal 4.5:1 voor body en 3:1 voor grote tekst en UI-componenten.</li>
          <li>Status van vaccinaties wordt zowel tekstueel (woord + icoon) als met kleur weergegeven.</li>
          <li>Iconen zijn als decoratief gemarkeerd (<code>aria-hidden</code>) of hebben een tekstueel alternatief.</li>
        </Section>
        <Section title="Bedienbaar">
          <li>Volledige toetsenbordnavigatie inclusief skip-link naar hoofdinhoud.</li>
          <li>Zichtbare focus-indicator op alle interactieve elementen.</li>
          <li>Beweging wordt beperkt bij <code>prefers-reduced-motion</code>.</li>
        </Section>
        <Section title="Begrijpelijk">
          <li>Pagina-taal is Nederlands (<code>lang="nl"</code>).</li>
          <li>Formuliervelden hebben een zichtbaar label en hulptekst.</li>
          <li>Consistente navigatie en koppenstructuur (één <code>h1</code> per pagina).</li>
        </Section>
        <Section title="Robuust">
          <li>Semantische HTML: <code>main</code>, <code>nav</code>, <code>header</code>, <code>article</code>, <code>section</code>.</li>
          <li>ARIA-attributen alleen waar nodig (icon-only knoppen en tab-toggles).</li>
        </Section>
        <p className="rounded-md border border-border bg-card p-4 text-xs text-muted-foreground">
          Dit is een prototype voor UX-validatie. Volledige audit (geautomatiseerd én handmatig)
          volgt voorafgaand aan productie-release.
        </p>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <ul className="list-disc space-y-1 pl-5">{children}</ul>
    </section>
  );
}