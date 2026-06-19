// Mock data afgeleid van FHIR IG Vaccination-Immunization 2.0.4
// Patient: BSN 999900390 (Scenario 1.1 kwalificatiescript)
// Gegevens zijn fictief; coderingen volgen SNOMED CT / G-Standaard zoals in
// de Nictiz-testresources. Alle informatie is uitsluitend voor UX-validatie.

export type VaccinationStatus = "completed" | "not-done" | "entered-in-error";

export type Vaccination = {
  id: string;
  status: VaccinationStatus;
  statusReason?: string;
  occurrenceDate: string; // ISO YYYY-MM-DD
  // FHIR CodeableConcept — een coderingsconcept kan meerdere codings hebben
  // (bv. SNOMED CT én G-Standaard) plus een vrije-tekst weergave.
  vaccineCode: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text?: string;
  };
  targetDisease: string; // ziekte/groep — voor groepering in overzicht
  product?: {
    name: string;
    manufacturer?: string;
    lotNumber?: string;
    expirationDate?: string;
  };
  doseNumber?: number;
  seriesDoses?: number;
  series?: string;
  site?: string; // bv. "bovenarm links"
  route?: string; // bv. "intramusculair"
  doseQuantity?: string; // bv. "0,5 ml"
  performer?: {
    name: string;
    role?: string;
  };
  organization: {
    id: string;
    name: string;
    type?: string; // huisarts / GGD / jeugdgezondheidszorg / ziekenhuis
  };
  note?: string;
  reaction?: {
    date: string;
    description: string;
  };
  primarySource: boolean;
};

export const patient = {
  name: "Sanne Boekwijt",
  gender: "vrouw",
  birthDate: "2007-04-18",
};

export const sources = [
  {
    id: "jgz-amsterdam",
    name: "Jeugdgezondheidszorg Amsterdam (RIVM Rijksvaccinatieprogramma)",
    type: "Jeugdgezondheidszorg",
    lastSync: "2026-05-28T08:21:00+02:00",
  },
  {
    id: "huisarts-de-pijp",
    name: "Huisartsenpraktijk De Pijp",
    type: "Huisartsenpraktijk",
    lastSync: "2026-06-02T14:05:00+02:00",
  },
  {
    id: "ggd-amsterdam",
    name: "GGD Amsterdam — Vaccinatieteam",
    type: "GGD",
    lastSync: "2026-06-07T10:42:00+02:00",
  },
];

export const vaccinations: Vaccination[] = [
  // ===== RVP — zuigeling/peuter =====
  {
    id: "imm-001",
    status: "completed",
    occurrenceDate: "2007-06-25",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836500008", display: "vaccin tegen difterie + kinkhoest + tetanus + poliomyelitis + Haemophilus influenzae type b + hepatitis B (DKTP-Hib-HepB)" }], text: "vaccin tegen difterie + kinkhoest + tetanus + poliomyelitis + Haemophilus influenzae type b + hepatitis B (DKTP-Hib-HepB)" },
    targetDisease: "DKTP-Hib-HepB",
    product: { name: "Infanrix hexa", manufacturer: "GlaxoSmithKline", lotNumber: "A21CB175A" },
    doseNumber: 1, seriesDoses: 4, series: "Rijksvaccinatieprogramma",
    site: "bovenbeen links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "M. de Wit", role: "Jeugdarts" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-002",
    status: "completed",
    occurrenceDate: "2007-08-20",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836500008", display: "DKTP-Hib-HepB" }], text: "DKTP-Hib-HepB" },
    targetDisease: "DKTP-Hib-HepB",
    product: { name: "Infanrix hexa", manufacturer: "GlaxoSmithKline", lotNumber: "A21CB182A" },
    doseNumber: 2, seriesDoses: 4, series: "Rijksvaccinatieprogramma",
    site: "bovenbeen rechts", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "M. de Wit", role: "Jeugdarts" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-003",
    status: "completed",
    occurrenceDate: "2007-10-15",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836500008", display: "DKTP-Hib-HepB" }], text: "DKTP-Hib-HepB" },
    targetDisease: "DKTP-Hib-HepB",
    product: { name: "Infanrix hexa", manufacturer: "GlaxoSmithKline", lotNumber: "A21CB190A" },
    doseNumber: 3, seriesDoses: 4, series: "Rijksvaccinatieprogramma",
    site: "bovenbeen links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "M. de Wit", role: "Jeugdarts" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-004",
    status: "completed",
    occurrenceDate: "2008-04-22",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836500008", display: "DKTP-Hib-HepB" }], text: "DKTP-Hib-HepB" },
    targetDisease: "DKTP-Hib-HepB",
    product: { name: "Infanrix hexa", manufacturer: "GlaxoSmithKline", lotNumber: "A22CB011A" },
    doseNumber: 4, seriesDoses: 4, series: "Rijksvaccinatieprogramma",
    site: "bovenbeen rechts", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "M. de Wit", role: "Jeugdarts" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-005",
    status: "completed",
    occurrenceDate: "2008-06-18",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "871866001", display: "vaccin tegen bof + mazelen + rodehond (BMR)" }], text: "vaccin tegen bof + mazelen + rodehond (BMR)" },
    targetDisease: "BMR",
    product: { name: "M-M-RVAXPRO", manufacturer: "MSD", lotNumber: "M020734" },
    doseNumber: 1, seriesDoses: 2, series: "Rijksvaccinatieprogramma",
    site: "bovenarm links", route: "subcutaan", doseQuantity: "0,5 ml",
    performer: { name: "M. de Wit", role: "Jeugdarts" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-006",
    status: "completed",
    occurrenceDate: "2008-06-18",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836383005", display: "vaccin tegen meningokokken serogroep C" }], text: "vaccin tegen meningokokken serogroep C" },
    targetDisease: "MenC",
    product: { name: "NeisVac-C", manufacturer: "Pfizer", lotNumber: "MC0814" },
    doseNumber: 1, seriesDoses: 1, series: "Rijksvaccinatieprogramma",
    site: "bovenarm rechts", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "M. de Wit", role: "Jeugdarts" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  // ===== RVP — 4 jaar boost =====
  {
    id: "imm-007",
    status: "completed",
    occurrenceDate: "2011-04-12",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836398006", display: "vaccin tegen difterie + kinkhoest + tetanus + poliomyelitis (DKTP)" }], text: "vaccin tegen difterie + kinkhoest + tetanus + poliomyelitis (DKTP)" },
    targetDisease: "DKTP",
    product: { name: "Boostrix-Polio", manufacturer: "GlaxoSmithKline", lotNumber: "AC52B097AA" },
    doseNumber: 5, seriesDoses: 5, series: "Rijksvaccinatieprogramma — 4 jaar",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "L. Janssens", role: "Jeugdverpleegkundige" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  // ===== RVP — 9 jaar =====
  {
    id: "imm-008",
    status: "completed",
    occurrenceDate: "2016-09-05",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836379007", display: "vaccin tegen difterie + tetanus + poliomyelitis (DTP)" }], text: "vaccin tegen difterie + tetanus + poliomyelitis (DTP)" },
    targetDisease: "DTP",
    product: { name: "Revaxis", manufacturer: "Sanofi", lotNumber: "J1A091V" },
    doseNumber: 6, seriesDoses: 6, series: "Rijksvaccinatieprogramma — 9 jaar",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "L. Janssens", role: "Jeugdverpleegkundige" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-009",
    status: "completed",
    occurrenceDate: "2016-09-05",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "871866001", display: "BMR" }], text: "BMR" },
    targetDisease: "BMR",
    product: { name: "M-M-RVAXPRO", manufacturer: "MSD", lotNumber: "M042881" },
    doseNumber: 2, seriesDoses: 2, series: "Rijksvaccinatieprogramma — 9 jaar",
    site: "bovenarm rechts", route: "subcutaan", doseQuantity: "0,5 ml",
    performer: { name: "L. Janssens", role: "Jeugdverpleegkundige" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  // ===== HPV — meisjes 12-13 (testresource patroon) =====
  {
    id: "imm-010",
    status: "completed",
    occurrenceDate: "2019-09-10",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836379009", display: "vaccin met antigeen van humaan papillomavirus" }], text: "vaccin met antigeen van humaan papillomavirus" },
    targetDisease: "HPV",
    product: { name: "Cervarix", manufacturer: "GlaxoSmithKline", lotNumber: "AHPVA064BB" },
    doseNumber: 1, seriesDoses: 2, series: "Rijksvaccinatieprogramma — HPV",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "L. Janssens", role: "Jeugdverpleegkundige" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    primarySource: true,
  },
  {
    id: "imm-011",
    status: "completed",
    occurrenceDate: "2020-03-04",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836379009", display: "vaccin met antigeen van humaan papillomavirus" }], text: "vaccin met antigeen van humaan papillomavirus" },
    targetDisease: "HPV",
    product: { name: "Cervarix", manufacturer: "GlaxoSmithKline", lotNumber: "AHPVA071CC" },
    doseNumber: 2, seriesDoses: 2, series: "Rijksvaccinatieprogramma — HPV",
    site: "bovenarm rechts", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "L. Janssens", role: "Jeugdverpleegkundige" },
    organization: { id: "jgz-amsterdam", name: "Jeugdgezondheidszorg Amsterdam", type: "Jeugdgezondheidszorg" },
    note: "Korte hoofdpijn na vaccinatie, vanzelf overgegaan.",
    primarySource: true,
  },
  // ===== Reis: hepatitis A =====
  {
    id: "imm-012",
    status: "completed",
    occurrenceDate: "2022-06-30",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836401000", display: "vaccin met antigeen van hepatitis A-virus" }], text: "vaccin met antigeen van hepatitis A-virus" },
    targetDisease: "Hepatitis A",
    product: { name: "Havrix Junior 720", manufacturer: "GlaxoSmithKline", lotNumber: "AHAVB145" },
    doseNumber: 1, seriesDoses: 2, series: "Reizigersvaccinatie",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Reisadvies Marokko, vakantie juli 2022.",
    primarySource: true,
  },
  // ===== COVID-19 — testresource patroon =====
  {
    id: "imm-013",
    status: "completed",
    occurrenceDate: "2023-10-02",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "28531000087107", display: "vaccin tegen 'Severe acute respiratory syndrome'-coronavirus 2" }], text: "vaccin tegen 'Severe acute respiratory syndrome'-coronavirus 2" },
    targetDisease: "COVID-19",
    product: { name: "COVID-19 VACCIN PFIZER INJVLST 0,3 ML", manufacturer: "Pfizer/BioNTech", lotNumber: "FF4213" },
    doseNumber: 1, seriesDoses: 1, series: "Najaarsronde 2023",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,3 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    primarySource: true,
  },
  // ===== Niet toegediend — geweigerd =====
  {
    id: "imm-014",
    status: "not-done",
    statusReason: "Geweigerd door patiënt",
    occurrenceDate: "2024-10-15",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "1252708008", display: "vaccin tegen influenzavirus (seizoen 2024-2025)" }], text: "vaccin tegen influenzavirus (seizoen 2024-2025)" },
    targetDisease: "Influenza",
    series: "Najaarsronde griep 2024",
    performer: { name: "Dr. R. el Amrani", role: "Huisarts" },
    organization: { id: "huisarts-de-pijp", name: "Huisartsenpraktijk De Pijp", type: "Huisartsenpraktijk" },
    primarySource: true,
  },
  // ===== Tetanus na verwonding =====
  {
    id: "imm-015",
    status: "completed",
    occurrenceDate: "2025-07-21",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836382000", display: "vaccin tegen tetanus" }], text: "vaccin tegen tetanus" },
    targetDisease: "Tetanus",
    product: { name: "Tetavax", manufacturer: "Sanofi", lotNumber: "T2J119" },
    series: "Wondbehandeling",
    site: "bovenarm rechts", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "Dr. R. el Amrani", role: "Huisarts" },
    organization: { id: "huisarts-de-pijp", name: "Huisartsenpraktijk De Pijp", type: "Huisartsenpraktijk" },
    note: "Toegediend na snijwond aan rechterhand bij tuinieren.",
    primarySource: true,
  },
  // ===== Reis: hepatitis A — 2e dosis (boost Marokko-reis) =====
  {
    id: "imm-016",
    status: "completed",
    occurrenceDate: "2023-01-12",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836401000", display: "vaccin met antigeen van hepatitis A-virus" }], text: "vaccin met antigeen van hepatitis A-virus" },
    targetDisease: "Hepatitis A",
    product: { name: "Havrix 1440", manufacturer: "GlaxoSmithKline", lotNumber: "AHAVB212" },
    doseNumber: 2, seriesDoses: 2, series: "Reizigersvaccinatie",
    site: "bovenarm rechts", route: "intramusculair", doseQuantity: "1,0 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Afsluitende dosis ~6 maanden na 1e dosis; langdurige bescherming.",
    primarySource: true,
  },
  // ===== Reis: DTP-reisbooster (Suriname 2024) =====
  {
    id: "imm-017",
    status: "completed",
    occurrenceDate: "2024-05-14",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836379007", display: "vaccin tegen difterie + tetanus + poliomyelitis (DTP)" }], text: "vaccin tegen difterie + tetanus + poliomyelitis (DTP)" },
    targetDisease: "DTP",
    product: { name: "Revaxis", manufacturer: "Sanofi", lotNumber: "K2C047V" },
    series: "Reizigersvaccinatie — booster",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Booster i.v.m. reis naar Suriname (juni 2024).",
    primarySource: true,
  },
  // ===== Reis: gele koorts =====
  {
    id: "imm-018",
    status: "completed",
    occurrenceDate: "2024-05-14",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836382008", display: "vaccin met antigeen van gelekoortsvirus" }], text: "vaccin met antigeen van gelekoortsvirus" },
    targetDisease: "Gele koorts",
    product: { name: "Stamaril", manufacturer: "Sanofi Pasteur", lotNumber: "YF1J083" },
    doseNumber: 1, seriesDoses: 1, series: "Reizigersvaccinatie",
    site: "bovenarm rechts", route: "subcutaan", doseQuantity: "0,5 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Internationaal vaccinatiebewijs (ICVP) afgegeven; levenslang geldig.",
    primarySource: true,
  },
  // ===== Reis: buiktyfus (Suriname 2024) =====
  {
    id: "imm-019",
    status: "completed",
    occurrenceDate: "2024-05-28",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836403002", display: "vaccin met antigeen van Salmonella typhi" }], text: "vaccin met antigeen van Salmonella typhi" },
    targetDisease: "Buiktyfus",
    product: { name: "Typhim Vi", manufacturer: "Sanofi Pasteur", lotNumber: "TY4H218" },
    doseNumber: 1, seriesDoses: 1, series: "Reizigersvaccinatie",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Bescherming circa 3 jaar.",
    primarySource: true,
  },
  // ===== Reis: rabiës pre-expositie — serie 3 doses (stage Indonesië 2025) =====
  {
    id: "imm-020",
    status: "completed",
    occurrenceDate: "2025-02-03",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836404008", display: "vaccin met antigeen van rabiësvirus" }], text: "vaccin met antigeen van rabiësvirus" },
    targetDisease: "Rabiës",
    product: { name: "Rabipur", manufacturer: "Bavarian Nordic", lotNumber: "RB5A011" },
    doseNumber: 1, seriesDoses: 3, series: "Reizigersvaccinatie — pre-expositie",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "1,0 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Pre-expositie i.v.m. stage Indonesië (april–juli 2025).",
    primarySource: true,
  },
  {
    id: "imm-021",
    status: "completed",
    occurrenceDate: "2025-02-10",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836404008", display: "vaccin met antigeen van rabiësvirus" }], text: "vaccin met antigeen van rabiësvirus" },
    targetDisease: "Rabiës",
    product: { name: "Rabipur", manufacturer: "Bavarian Nordic", lotNumber: "RB5A011" },
    doseNumber: 2, seriesDoses: 3, series: "Reizigersvaccinatie — pre-expositie",
    site: "bovenarm rechts", route: "intramusculair", doseQuantity: "1,0 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    primarySource: true,
  },
  {
    id: "imm-022",
    status: "completed",
    occurrenceDate: "2025-03-03",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836404008", display: "vaccin met antigeen van rabiësvirus" }], text: "vaccin met antigeen van rabiësvirus" },
    targetDisease: "Rabiës",
    product: { name: "Rabipur", manufacturer: "Bavarian Nordic", lotNumber: "RB5A019" },
    doseNumber: 3, seriesDoses: 3, series: "Reizigersvaccinatie — pre-expositie",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "1,0 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    note: "Serie compleet; bij beet alsnog 2 booster-doses nodig.",
    primarySource: true,
  },
  // ===== Reis: Japanse encefalitis (stage Indonesië 2025) =====
  {
    id: "imm-023",
    status: "completed",
    occurrenceDate: "2025-03-10",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836405009", display: "vaccin met antigeen van Japanse-encefalitisvirus" }], text: "vaccin met antigeen van Japanse-encefalitisvirus" },
    targetDisease: "Japanse encefalitis",
    product: { name: "Ixiaro", manufacturer: "Valneva", lotNumber: "JE5C204" },
    doseNumber: 1, seriesDoses: 2, series: "Reizigersvaccinatie",
    site: "bovenarm rechts", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    primarySource: true,
  },
  {
    id: "imm-024",
    status: "completed",
    occurrenceDate: "2025-03-31",
    vaccineCode: { coding: [{ system: "http://snomed.info/sct", code: "836405009", display: "vaccin met antigeen van Japanse-encefalitisvirus" }], text: "vaccin met antigeen van Japanse-encefalitisvirus" },
    targetDisease: "Japanse encefalitis",
    product: { name: "Ixiaro", manufacturer: "Valneva", lotNumber: "JE5C211" },
    doseNumber: 2, seriesDoses: 2, series: "Reizigersvaccinatie",
    site: "bovenarm links", route: "intramusculair", doseQuantity: "0,5 ml",
    performer: { name: "K. Vermeer", role: "Verpleegkundig specialist" },
    organization: { id: "ggd-amsterdam", name: "GGD Amsterdam — Vaccinatieteam", type: "GGD" },
    primarySource: true,
  },
];

export type VaccinationGroup = {
  targetDisease: string;
  items: Vaccination[];
  lastDate: string;
  completedCount: number;
};

export function groupByDisease(items: Vaccination[]): VaccinationGroup[] {
  const map = new Map<string, Vaccination[]>();
  for (const v of items) {
    const arr = map.get(v.targetDisease) ?? [];
    arr.push(v);
    map.set(v.targetDisease, arr);
  }
  return [...map.entries()]
    .map(([targetDisease, list]) => {
      const sorted = [...list].sort((a, b) => a.occurrenceDate.localeCompare(b.occurrenceDate));
      return {
        targetDisease,
        items: sorted,
        lastDate: sorted[sorted.length - 1].occurrenceDate,
        completedCount: sorted.filter((v) => v.status === "completed").length,
      };
    })
    .sort((a, b) => b.lastDate.localeCompare(a.lastDate));
}

export function formatDateNL(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

export function getYears(items: Vaccination[]): number[] {
  return [...new Set(items.map((v) => parseInt(v.occurrenceDate.slice(0, 4), 10)))].sort((a, b) => b - a);
}

export function getDiseases(items: Vaccination[]): string[] {
  return [...new Set(items.map((v) => v.targetDisease))].sort();
}

/** FHIR CodeableConcept helpers — leesbare weergave + primaire coding. */
export function vaccineDisplay(c: Vaccination["vaccineCode"]): string {
  return c.text ?? c.coding[0]?.display ?? "Onbekend vaccin";
}
export function vaccinePrimaryCoding(c: Vaccination["vaccineCode"]) {
  return c.coding[0];
}