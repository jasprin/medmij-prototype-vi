import { describe, it, expect } from "vitest";
import {
  vaccinations,
  groupByDisease,
  getYears,
  getDiseases,
  formatDateNL,
  vaccineDisplay,
} from "./vaccinations";

describe("vaccinations data helpers", () => {
  it("groupByDisease groepeert per ziekte en sorteert op laatste datum (desc)", () => {
    const groups = groupByDisease(vaccinations);
    expect(groups.length).toBeGreaterThan(0);
    // elke groep heeft minstens 1 item
    for (const g of groups) expect(g.items.length).toBeGreaterThan(0);
    // gesorteerd op lastDate aflopend
    for (let i = 1; i < groups.length; i++) {
      expect(groups[i - 1].lastDate >= groups[i].lastDate).toBe(true);
    }
    // completedCount klopt
    for (const g of groups) {
      const completed = g.items.filter((v) => v.status === "completed").length;
      expect(g.completedCount).toBe(completed);
    }
  });

  it("getYears geeft unieke jaren aflopend gesorteerd", () => {
    const years = getYears(vaccinations);
    expect(new Set(years).size).toBe(years.length);
    for (let i = 1; i < years.length; i++) {
      expect(years[i - 1]).toBeGreaterThan(years[i]);
    }
  });

  it("getDiseases geeft unieke ziekten alfabetisch", () => {
    const diseases = getDiseases(vaccinations);
    expect(new Set(diseases).size).toBe(diseases.length);
    expect([...diseases].sort()).toEqual(diseases);
  });

  it("formatDateNL formatteert ISO-datum naar Nederlandse weergave", () => {
    expect(formatDateNL("2024-10-15")).toBe("15 oktober 2024");
    expect(formatDateNL("2007-06-25")).toBe("25 juni 2007");
  });

  it("vaccineDisplay valt netjes terug op coding[0].display", () => {
    expect(
      vaccineDisplay({
        coding: [{ system: "x", code: "1", display: "Tetanus" }],
      }),
    ).toBe("Tetanus");
    expect(
      vaccineDisplay({
        coding: [{ system: "x", code: "1", display: "ignored" }],
        text: "Voorkeurstekst",
      }),
    ).toBe("Voorkeurstekst");
  });

  it("alle mock-vaccinaties hebben minstens één FHIR coding", () => {
    for (const v of vaccinations) {
      expect(v.vaccineCode.coding.length).toBeGreaterThan(0);
      expect(v.vaccineCode.coding[0].system).toMatch(/snomed/);
    }
  });
});