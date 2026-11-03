// Efnisyfirlit síðunnar. Forsíðan les þessa skrá sjálfkrafa.
// Nýtt efni: bættu við einni línu í EFNI.
//   tegund: "utskyring" (veggspjald) eða "leikur"
//   flokkar: einn eða fleiri kaflar úr FLOKKAR
//   kaflaprof: true ef leikurinn býður upp á æfingu fyrir kaflapróf

window.FLOKKAR = [
  { id: "tolur",      heiti: "Tölur",                 kafli: 1 },
  { id: "tolfraedi",  heiti: "Tölfræði og líkur",     kafli: 2 },
  { id: "margfoldun", heiti: "Margföldun og deiling", kafli: 3 },
  { id: "rumfraedi",  heiti: "Rúmfræði",              kafli: 4 }
];

window.EFNI = [
  /* Útskýringar (veggspjöld) */
  { titill: "Tugakerfið og sætisgildi", tegund: "utskyring", flokkar: ["tolur"],
    lysing: "Hvað hver tölustafur táknar og hvernig tugabrot eru borin saman.", slod: "staerdfraedi/veggspjald.html?v=tugakerfid" },
  { titill: "Negatífar tölur", tegund: "utskyring", flokkar: ["tolur"],
    lysing: "Talnalína, mismunur og hiti sem hækkar og lækkar.", slod: "staerdfraedi/veggspjald.html?v=negatifar" },
  { titill: "Tíðasta gildi, miðgildi og meðaltal", tegund: "utskyring", flokkar: ["tolfraedi"],
    lysing: "Þrjú gildi sem segja til um hvar „miðjan“ er í gögnunum.", slod: "staerdfraedi/veggspjald.html?v=midsaekni" },
  { titill: "Líkur", tegund: "utskyring", flokkar: ["tolfraedi"],
    lysing: "Líkur skráðar sem brot, frá 0 upp í 1.", slod: "staerdfraedi/veggspjald.html?v=likur" },
  { titill: "Forgangsröð reikniaðgerða", tegund: "utskyring", flokkar: ["tolur", "margfoldun"],
    lysing: "Svigar fyrst, síðan margföldun og deiling, síðast samlagning og frádráttur.", slod: "staerdfraedi/veggspjald.html?v=forgangsrod" },
  { titill: "Margföldun – rúðuaðferð", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Dæminu bútað niður í minni hluta, t.d. 22 · 12 = 22 · 10 + 22 · 2.", slod: "staerdfraedi/veggspjald.html?v=margfoldun" },
  { titill: "Deiling – Stikuaðferð", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Deilt með margföldun sem þú kannt, skref fyrir skref.", slod: "staerdfraedi/veggspjald.html?v=deiling" },
  { titill: "Tugabrot – margföldun og deiling", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Rúðunet, tíundu hlutar og hvar komman á að vera.", slod: "staerdfraedi/veggspjald.html?v=tugabrot" },
  { titill: "Hornasumma", tegund: "utskyring", flokkar: ["rumfraedi"],
    lysing: "Hornin í þríhyrningi eru 180° og í ferhyrningi 360°.", slod: "staerdfraedi/veggspjald.html?v=hornasumma" },
  { titill: "Mælikvarði og einslaga myndir", tegund: "utskyring", flokkar: ["rumfraedi"],
    lysing: "Hlutfall, stækkun og minnkun.", slod: "staerdfraedi/veggspjald.html?v=maelikvardi" },

  /* Leikir */
  { titill: "Tölur", tegund: "leikur", flokkar: ["tolur"], kaflaprof: true,
    lysing: "Sætisgildi, tugabrot, negatífar tölur, námundun og fleira.", slod: "staerdfraedi/tolur-og-reikningur.html" },
  { titill: "Tölfræði og líkur", tegund: "leikur", flokkar: ["tolfraedi"], kaflaprof: true,
    lysing: "Meðaltal, miðgildi, tíðnitöflur, súlurit, skífurit og líkur.", slod: "staerdfraedi/tolfraedi-og-likur.html" },
  { titill: "Margföldun og deiling", tegund: "leikur", flokkar: ["margfoldun"], kaflaprof: true,
    lysing: "Hlutföll, möguleikar, frumtölur, margföldun, deiling, tugabrot og svigar.", slod: "staerdfraedi/margfoldun-og-deiling.html" },
  { titill: "Deiling – Stikuaðferð", tegund: "leikur", flokkar: ["margfoldun"],
    lysing: "Æfðu deilingu með margföldun sem þú kannt.", slod: "staerdfraedi/deiling-stikuadferd.html" },
  { titill: "Rúmfræði", tegund: "leikur", flokkar: ["rumfraedi"], kaflaprof: true,
    lysing: "Horn, snúningur, hringir, þríhyrningar, ferhyrningar, einslaga form og mælikvarði.", slod: "staerdfraedi/rumfraedi.html" }
];
