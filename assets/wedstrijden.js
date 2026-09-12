/* ============================================================
   vv Noordwijk — programma seizoen 2026/2027
   Eén bron voor de aftelklok, de agenda en het programma.
   De site kiest zelf de eerstvolgende wedstrijd, dus het
   overzicht veroudert niet.
   ============================================================ */

window.NOORDWIJK = {

  /* Competitie: derde divisie zaterdag B */
  programma: [
    { datum: '2026-09-12T14:30', tegen: 'VVSB',                 thuis: true,  soort: 'competitie', logo: 'vvsb.png' },
    { datum: '2026-09-19T15:00', tegen: 'TOGB',                 thuis: false, soort: 'competitie', logo: 'togb.png' },
    { datum: '2026-09-22T20:00', tegen: 'LAC Frisia 1883',      thuis: true,  soort: 'beker',      logo: null },
    { datum: '2026-09-26T14:30', tegen: 'Zwaluwen',             thuis: true,  soort: 'competitie', logo: 'zwaluwen.png' },
    { datum: '2026-10-03T19:30', tegen: 'EVV Echt',             thuis: false, soort: 'competitie', logo: 'evv-echt.png' },
    { datum: '2026-10-10T14:30', tegen: 'Gemert',               thuis: true,  soort: 'competitie', logo: 'gemert.png' },
    { datum: '2026-10-17T14:30', tegen: 'Rijnvogels',           thuis: false, soort: 'competitie', logo: 'rijnvogels.png' },
    { datum: '2026-10-24T14:30', tegen: 'Goes',                 thuis: true,  soort: 'competitie', logo: 'goes.png' },
    { datum: '2026-11-07T18:00', tegen: 'Dongen',               thuis: false, soort: 'competitie', logo: 'dongen.png' },
    { datum: '2026-11-14T14:30', tegen: 'UNA',                  thuis: true,  soort: 'competitie', logo: 'una.png' },
    { datum: '2026-11-21T14:30', tegen: 'sv Poortugaal',        thuis: false, soort: 'competitie', logo: 'poortugaal.png' },
    { datum: '2026-11-28T14:30', tegen: "UDI'19/Swiss Sense",   thuis: true,  soort: 'competitie', logo: 'udi19.png' },
    { datum: '2026-12-05T19:30', tegen: 'Groene Ster',          thuis: false, soort: 'competitie', logo: 'groene-ster.png' },
    { datum: '2026-12-12T14:00', tegen: 'FC Lisse',             thuis: true,  soort: 'competitie', logo: 'fc-lisse.png' },
    { datum: '2027-01-09T15:30', tegen: "Blauw Geel'38/JUMBO",  thuis: false, soort: 'competitie', logo: 'blauw-geel.png' },
    { datum: '2027-01-16T14:30', tegen: 'Achilles Veen',        thuis: true,  soort: 'competitie', logo: 'achilles-veen.png' },
    { datum: '2027-01-23T18:00', tegen: 'RBC',                  thuis: false, soort: 'competitie', logo: 'rbc.png' },
    { datum: '2027-01-30T14:30', tegen: 'Excelsior Maassluis',  thuis: true,  soort: 'competitie', logo: 'excelsior-maassluis.png' },
    { datum: '2027-02-13T15:30', tegen: 'VVSB',                 thuis: false, soort: 'competitie', logo: 'vvsb.png' },
    { datum: '2027-02-20T14:30', tegen: 'TOGB',                 thuis: true,  soort: 'competitie', logo: 'togb.png' },
    { datum: '2027-02-27T14:30', tegen: 'Zwaluwen',             thuis: false, soort: 'competitie', logo: 'zwaluwen.png' },
    { datum: '2027-03-06T14:30', tegen: 'EVV Echt',             thuis: true,  soort: 'competitie', logo: 'evv-echt.png' }
  ],

  /* Recente uitslagen */
  uitslagen: [
    { datum: '2026-09-05', thuisteam: 'Excelsior Maassluis', uitteam: 'Noordwijk', uitslag: '0 - 0' },
    { datum: '2026-09-02', thuisteam: 'Goes',                uitteam: 'Noordwijk', uitslag: '0 - 1' },
    { datum: '2026-08-29', thuisteam: 'Noordwijk',           uitteam: 'RBC',       uitslag: '1 - 0' }
  ],

  /* Stand derde divisie zaterdag — na 4 speelronden */
  stand: [
    { p: 1,  team: 'FC Lisse',            gs: 4, gw: 4, gl: 0, vl: 0, v: 8,  t: 2,  pt: 12, logo: 'fc-lisse.png' },
    { p: 2,  team: 'Noordwijk',           gs: 4, gw: 3, gl: 1, vl: 0, v: 7,  t: 0,  pt: 10, logo: null, eigen: true },
    { p: 3,  team: 'sv Poortugaal',       gs: 4, gw: 3, gl: 0, vl: 1, v: 7,  t: 3,  pt: 9,  logo: 'poortugaal.png' },
    { p: 4,  team: 'Dongen',              gs: 4, gw: 3, gl: 0, vl: 1, v: 12, t: 9,  pt: 9,  logo: 'dongen.png' },
    { p: 5,  team: 'Rijnvogels',          gs: 4, gw: 2, gl: 2, vl: 0, v: 11, t: 5,  pt: 8,  logo: 'rijnvogels.png' },
    { p: 6,  team: "UDI'19/Swiss Sense",  gs: 4, gw: 2, gl: 1, vl: 1, v: 5,  t: 3,  pt: 7,  logo: 'udi19.png' },
    { p: 7,  team: 'UNA',                 gs: 4, gw: 1, gl: 3, vl: 0, v: 7,  t: 4,  pt: 6,  logo: 'una.png' },
    { p: 8,  team: 'RBC',                 gs: 4, gw: 2, gl: 0, vl: 2, v: 6,  t: 3,  pt: 6,  logo: 'rbc.png' }
  ],

  /* Clubagenda (naast het voetbal) */
  agenda: [
    { datum: '2026-09-18T20:00', titel: 'Bingo Supportersclub',                wat: 'Sportcafé' },
    { datum: '2026-10-02T19:30', titel: 'Klaverjassen Supportersclub',         wat: 'Sportcafé' },
    { datum: '2026-10-16T20:00', titel: 'Bingo Supportersclub',                wat: 'Sportcafé' },
    { datum: '2026-11-06T19:30', titel: 'Klaverjassen Supportersclub',         wat: 'Sportcafé' },
    { datum: '2026-11-20T20:00', titel: 'Bingo Supportersclub',                wat: 'Sportcafé' },
    { datum: '2026-12-04T19:30', titel: 'Klaverjassen Supportersclub',         wat: 'Sportcafé' },
    { datum: '2026-12-18T20:00', titel: 'Bingo Supportersclub',                wat: 'Sportcafé' }
  ],

  /* Toegangsprijzen (los kaartje) */
  prijzen: {
    'staan-regulier':  { label: 'Staanplaats · volwassenen',            prijs: 9 },
    'staan-korting':   { label: 'Staanplaats · t/m 18 jaar en 65+',     prijs: 7 },
    'tribune-regulier':{ label: 'Tribune · volwassenen',                prijs: 13 },
    'tribune-korting': { label: 'Tribune · t/m 18 jaar en 65+',         prijs: 10 }
  }
};
