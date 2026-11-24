// Efnisyfirlit síðunnar. Forsíðan les þessa skrá sjálfkrafa.
// Nýtt efni: bættu við einni línu í EFNI.
//   tegund: "utskyring" (veggspjald), "adferd" (aðferð æfð skref fyrir skref) eða "aefingaprof" (æfingapróf úr kafla)
//   flokkar: einn eða fleiri kaflar úr FLOKKAR
//   kaflaprof: true ef æfingaprófið býður líka upp á æfingu fyrir kaflapróf

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
  { titill: "Talnarunur", tegund: "utskyring", flokkar: ["tolur"],
    lysing: "Finndu regluna og haltu áfram með hana.", slod: "staerdfraedi/veggspjald.html?v=talnarunur" },
  { titill: "Námundun og slumpreikningur", tegund: "utskyring", flokkar: ["tolur"],
    lysing: "Námundað upp eða niður og reiknað um það bil.", slod: "staerdfraedi/veggspjald.html?v=namundun" },
  { titill: "Tíðasta gildi, miðgildi og meðaltal", tegund: "utskyring", flokkar: ["tolfraedi"],
    lysing: "Þrjú gildi sem segja til um hvar „miðjan“ er í gögnunum.", slod: "staerdfraedi/veggspjald.html?v=midsaekni" },
  { titill: "Myndrit: súlurit, línurit og skífurit", tegund: "utskyring", flokkar: ["tolfraedi"],
    lysing: "Hvernig súlurit er búið til og hvaða myndrit hentar hverju sinni.", slod: "staerdfraedi/veggspjald.html?v=myndrit" },
  { titill: "Líkur", tegund: "utskyring", flokkar: ["tolfraedi"],
    lysing: "Líkur skráðar sem brot, frá 0 upp í 1.", slod: "staerdfraedi/veggspjald.html?v=likur" },
  { titill: "Hlutföll", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Það sem er nefnt fyrst kemur fyrst. Jöfn og fullstytt hlutföll.", slod: "staerdfraedi/veggspjald.html?v=hlutfoll" },
  { titill: "Fjöldi möguleika", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Tré, tafla og margföldun gefa sama svar.", slod: "staerdfraedi/veggspjald.html?v=moguleikar" },
  { titill: "Frumtölur og samsettar tölur", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Þættir í tölu og frumtölurnar upp í 50.", slod: "staerdfraedi/veggspjald.html?v=frumtolur" },
  { titill: "Margföldun – rúðuaðferð", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Dæminu bútað niður í minni hluta, t.d. 22 · 12 = 22 · 10 + 22 · 2.", slod: "staerdfraedi/veggspjald.html?v=margfoldun" },
  { titill: "Deiling – Stikuaðferð", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Deilt með margföldun sem þú kannt, skref fyrir skref.", slod: "staerdfraedi/veggspjald.html?v=deiling" },
  { titill: "Deiling – Ausuaðferð", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Deila, margfalda, draga frá, færa niður og endurtaka.", slod: "staerdfraedi/veggspjald.html?v=ausa" },
  { titill: "Tugabrot – margföldun og deiling", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Rúðunet, tíundu hlutar og hvar komman á að vera.", slod: "staerdfraedi/veggspjald.html?v=tugabrot" },
  { titill: "Forgangsröð reikniaðgerða", tegund: "utskyring", flokkar: ["tolur", "margfoldun"],
    lysing: "Svigar fyrst, síðan margföldun og deiling, síðast samlagning og frádráttur.", slod: "staerdfraedi/veggspjald.html?v=forgangsrod" },
  { titill: "Hvaða tölu táknar x?", tegund: "utskyring", flokkar: ["margfoldun"],
    lysing: "Hyldu hlutann sem x er í og finndu töluna.", slod: "staerdfraedi/veggspjald.html?v=jofnur" },
  { titill: "Hringurinn", tegund: "utskyring", flokkar: ["rumfraedi"],
    lysing: "Miðja, hringferill, geisli, þvermál og geiri.", slod: "staerdfraedi/veggspjald.html?v=hringur" },
  { titill: "Þríhyrningar og ferhyrningar", tegund: "utskyring", flokkar: ["rumfraedi"],
    lysing: "Sérstök heiti eftir hliðum og hornum.", slod: "staerdfraedi/veggspjald.html?v=formin" },
  { titill: "Hornasumma", tegund: "utskyring", flokkar: ["rumfraedi"],
    lysing: "Hornin í þríhyrningi eru 180° og í ferhyrningi 360°.", slod: "staerdfraedi/veggspjald.html?v=hornasumma" },
  { titill: "Mælikvarði og einslaga myndir", tegund: "utskyring", flokkar: ["rumfraedi"],
    lysing: "Hlutfall, stækkun og minnkun.", slod: "staerdfraedi/veggspjald.html?v=maelikvardi" },

  /* Aðferðir og æfingapróf */
  { titill: "Tölur", tegund: "aefingaprof", flokkar: ["tolur"], kaflaprof: true,
    lysing: "Sætisgildi, tugabrot, negatífar tölur, námundun og fleira.", slod: "staerdfraedi/tolur-og-reikningur.html" },
  { titill: "Tölfræði og líkur", tegund: "aefingaprof", flokkar: ["tolfraedi"], kaflaprof: true,
    lysing: "Meðaltal, miðgildi, tíðnitöflur, súlurit, skífurit og líkur.", slod: "staerdfraedi/tolfraedi-og-likur.html" },
  { titill: "Margföldun og deiling", tegund: "aefingaprof", flokkar: ["margfoldun"], kaflaprof: true,
    lysing: "Hlutföll, möguleikar, frumtölur, margföldun, deiling, tugabrot og svigar.", slod: "staerdfraedi/margfoldun-og-deiling.html" },
  { titill: "Deiling – Stikuaðferð", tegund: "adferd", flokkar: ["margfoldun"],
    lysing: "Æfðu deilingu með margföldun sem þú kannt.", slod: "staerdfraedi/deiling-stikuadferd.html" },
  { titill: "Deiling – Ausuaðferð", tegund: "adferd", flokkar: ["margfoldun"],
    lysing: "Deila, margfalda, draga frá, færa niður og endurtaka.", slod: "staerdfraedi/deiling-ausuadferd.html" },
  { titill: "Forgangsröð reikniaðgerða", tegund: "adferd", flokkar: ["tolur", "margfoldun"],
    lysing: "Smelltu á það sem á að reikna fyrst og reiknaðu eina línu í einu.", slod: "staerdfraedi/forgangsrod.html" },
  { titill: "Hvaða tölu táknar x?", tegund: "adferd", flokkar: ["margfoldun"],
    lysing: "Einfaldaðu, hyldu hlutann með x, finndu töluna og prófaðu svarið.", slod: "staerdfraedi/hvada-tolu-taknar-x.html" },
  { titill: "Rúmfræði", tegund: "aefingaprof", flokkar: ["rumfraedi"], kaflaprof: true,
    lysing: "Horn, snúningur, hringir, þríhyrningar, ferhyrningar, einslaga form og mælikvarði.", slod: "staerdfraedi/rumfraedi.html" }
];
