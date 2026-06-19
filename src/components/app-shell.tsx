import { Link } from "@tanstack/react-router";
import { Syringe, LayoutDashboard, Building2, Shield, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { patient } from "@/data/vaccinations";

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <a
        href="#hoofdinhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Direct naar hoofdinhoud
      </a>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Syringe className="h-5 w-5" />
            </span>
            <span className="text-lg leading-tight">
              Beeld<span className="text-secondary">+</span>
              <span className="block text-xs font-normal text-muted-foreground">PGO — MedMij</span>
            </span>
          </Link>
          <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-1 md:flex">
            <NavItem to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</NavItem>
            <NavItem to="/vaccinaties" icon={<Syringe className="h-4 w-4" />}>Vaccinaties</NavItem>
            <NavItem to="/bronnen" icon={<Building2 className="h-4 w-4" />}>Bronnen</NavItem>
            <NavItem to="/toegankelijkheid" icon={<Shield className="h-4 w-4" />}>Toegankelijkheid</NavItem>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium">{patient.name}</div>
              <div className="text-xs text-muted-foreground">Geboortedatum {new Date(patient.birthDate).toLocaleDateString("nl-NL")}</div>
            </div>
            <Link
              to="/"
              aria-label="Uitloggen"
              className="inline-flex min-h-11 items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-accent/10"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Uitloggen</span>
            </Link>
          </div>
        </div>
        <nav aria-label="Mobiele navigatie" className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-2 [-webkit-overflow-scrolling:touch]">
            <NavItem to="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</NavItem>
            <NavItem to="/vaccinaties" icon={<Syringe className="h-4 w-4" />}>Vaccinaties</NavItem>
            <NavItem to="/bronnen" icon={<Building2 className="h-4 w-4" />}>Bronnen</NavItem>
            <NavItem to="/toegankelijkheid" icon={<Shield className="h-4 w-4" />}>WCAG</NavItem>
          </div>
        </nav>
      </header>
      <main id="hoofdinhoud" className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {title ? <h1 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1> : null}
        {children}
      </main>
      <footer className="mt-16 border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <p>
            Prototype — visueel ontwerp t.b.v. UX-validatie. Geen echte authenticatie of live data.
            Conform Functioneel Ontwerp Vaccinatie-Immunisatie 2.0.4 en MedMij weergaverichtlijn.
          </p>
          <p>© MedMij prototype · WCAG 2.1 AA · Patiëntgegevens fictief.</p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ to, icon, children }: { to: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-primary text-primary-foreground" }}
      inactiveProps={{ className: "text-foreground hover:bg-accent/15" }}
      className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors"
    >
      <span aria-hidden>{icon}</span>
      {children}
    </Link>
  );
}