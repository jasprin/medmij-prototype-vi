# Prototype Beeld in PGO

## Doel

Maak een visueel prototype om schermontwerp, informatiestructuur en UX te valideren. Geen echte authenticatie, geen live data-koppelingen.

## Wat is een PGO?

Een persoonlijke gezondheidsomgeving (PGO) is een app of website waarin je informatie over je eigen gezondheid bij kunt houden en waarmee je actief aan de slag kunt gaan met je gezondheid. Zo kun je jouw medische gegevens verzamelen en beheren. Op deze manier houd je grip op je gegevens: van behandelingen tot labuitslagen, medicijngebruik en inentingen. https://medmij.nl/wat-is-een-pgo/

## Eisen

Het prototype moet voldoen aan de volgende specificaties

### Functioneel Ontwerp Vaccinatie-Immunisatie 2.0.4

https://informatiestandaarden.nictiz.nl/wiki/imm:V2_Ontwerp_Vaccinatie-Immunisatie

### FHIR Implementation Guide: Vaccination-Immunization 2.0.4

https://informatiestandaarden.nictiz.nl/wiki/imm:V2_FHIR_Vaccination-Immunization

### Weergaverichtlijn Verzamelen vaccinaties

https://medmij.atlassian.net/wiki/external/NmZhMGYxMTQ5ZTI3NGRkNGI3YjQ5ZjBlYmZmODE3Njk

### Huisstijl MedMij

- Font: Fira sans
- Primaire kleuren
  - blauw: HEX #384b96
  - groen: HEX #4ab8a7
- Secundaire kleuren
  - oranje: HEX #f49835
  - grijs: HEX #878787

### WCAG richtlijnen

https://www.w3.org/TR/WCAG21/

## Testdata

Gebruik testdata van de patient met identifier 999900390 uit 6.1 Scenario 1.1 van het kwalificatiescript

- https://informatiestandaarden.nictiz.nl/wiki/imm:V2_Kwalificatiescript_Vaccinatie-Immunisatie_Raadplegen#Scenario_1.1
- https://github.com/Nictiz/Nictiz-testscripts/tree/main/src/Immunization-2-0/Cert/_reference/resources