/* Efni veggspjaldanna. Hvert veggspjald opnast á slóðinni veggspjald.html?v=<id>.
   Myndir eru teiknaðar með myndir.js. Í texta má merkja með [ ] það sem á að lita. */
window.VEGGSPJOLD = {

  tugakerfid: {
    titill:"Tugakerfið og sætisgildi",
    inngangur:"Gildi tölustafs fer eftir því í hvaða sæti hann er. Hvert sæti er tíu sinnum stærra en sætið hægra megin við það.",
    aefa:[{heiti:"Tölur", slod:"tolur-og-reikningur.html"}],
    skref:{daemi:"78 412,564", lidir:[
      {t:"Finndu sætin", x:"Byrjaðu við kommuna. Vinstra megin eru einingar, tugir, hundruð, þúsundir og tugþúsundir. Hægra megin eru tíundu hlutar, hundraðshlutar og þúsundustu hlutar.",
       m:{teg:"saeti", tala:"78412,564"}},
      {t:"Hvað táknar tölustafurinn?", x:"Tölustafurinn 7 er í tugþúsundasætinu. Hann táknar 70 000. Tölustafurinn 6 er í hundraðshlutasætinu. Hann táknar 0,06.",
       m:{teg:"saeti", tala:"78412,564", merkt:[0,7]}},
      {t:"Leystu töluna upp eftir sætum", x:"Skráðu hvað hver tölustafur táknar og leggðu saman.",
       m:{teg:"jofnur", linur:[{s:"70 000 + 8 000 + 400 + 10 + 2"},{s:"+ 0,5 + 0,06 + 0,004"},{s:"= [78 412,564]"}]}},
      {t:"Núll aftast breytir engu", x:"Það má bæta núlli aftast við aukastafina án þess að talan breytist.",
       m:{teg:"jofnur", linur:[{s:"0,1 = 0,10", a:"1 tíundi hluti = 10 hundraðshlutar"},{s:"0,4 = 0,40"}]}}
    ]},
    leidir:{x:"Hvort er stærra, 0,4 eða 0,35? Svarið er alltaf 0,4.", lidir:[
      {t:"Sæti fyrir sæti", x:"Byrjaðu vinstra megin og berðu saman eitt sæti í einu.", m:{teg:"jofnur", linur:[{s:"0,[4]", a:"4 tíundu hlutar"},{s:"0,[3]5", a:"3 tíundu hlutar"}]}, svar:"0,4"},
      {t:"Bæta við núlli", x:"Láttu báðar tölurnar hafa jafn marga aukastafi.", m:{teg:"jofnur", linur:[{s:"0,4 = 0,40"},{s:"[0,40] > 0,35"}]}, svar:"0,4"},
      {t:"Hugsa í sentimetrum", x:"Ímyndaðu þér metra.", m:{teg:"jofnur", linur:[{s:"0,4 m = 40 cm"},{s:"0,35 m = 35 cm"}]}, svar:"0,4"}
    ], nidur:"Allar leiðirnar sýna að 0,4 er stærra en 0,35."},
    villur:[
      {t:"Fleiri tölustafir þýða ekki stærri tölu", samhengi:"0,35 og 0,4", rangt:["0,35 er stærra af því að 35 er meira en 4."], rett:["0,4 = 0,40 og 0,40 er stærra en 0,35."],
       x:"Berðu saman sæti fyrir sæti frá vinstri."},
      {t:"Tómt sæti gleymist", samhengi:"Sjötíu þúsund og fimm", rangt:["705"], rett:["70 005"],
       x:"Ef sæti er tómt er skrifað 0 í það."},
      {t:"Rangt gildi tölustafs", samhengi:"Hvað táknar 6 í 78 412,564?", rangt:["6","60"], rett:["0,06"],
       x:"6 er í hundraðshlutasætinu, öðru sæti á eftir kommunni."}
    ]
  },

  negatifar: {
    titill:"Negatífar tölur",
    inngangur:"Negatífar tölur eru minni en 0. Á talnalínu eru þær vinstra megin við 0 og á hitamæli fyrir neðan 0.",
    aefa:[{heiti:"Tölur", slod:"tolur-og-reikningur.html"}],
    skref:{daemi:"Hver er mismunurinn á −20° og 15°?", lidir:[
      {t:"Teiknaðu talnalínu", x:"Negatífar tölur eru vinstra megin við 0. Því lengra til vinstri, því minni er talan.",
       m:{teg:"talnalina", fra:-25, til:20, bil:5, merki:[-20,15], w:440}},
      {t:"Teldu frá −20 að 0", x:"Frá −20 að 0 eru 20.",
       m:{teg:"talnalina", fra:-25, til:20, bil:5, merki:[-20,15], w:440, stokk:[{fra:-20, til:0, t:"20"}]}},
      {t:"Teldu frá 0 að 15", x:"Frá 0 að 15 eru 15.",
       m:{teg:"talnalina", fra:-25, til:20, bil:5, merki:[-20,15], w:440, stokk:[{fra:-20, til:0, t:"20"},{fra:0, til:15, t:"15"}]}},
      {t:"Leggðu saman", x:"Mismunurinn á −20° og 15° er 35°.",
       m:{teg:"jofnur", linur:[{s:"20 + 15 = [35]"}]}}
    ]},
    auka:{titill:"Hiti sem hækkar og lækkar", x:"Þegar hitinn lækkar förum við til vinstri á talnalínunni. Þegar hann hækkar förum við til hægri.",
      m:[{teg:"talnalina", fra:-15, til:5, bil:5, w:420, merki:[-7,-12], stokk:[{fra:-7, til:-12, t:"lækkar um 5"}], titill:"−7 − 5 = −12"},
         {teg:"talnalina", fra:-15, til:5, bil:5, w:420, merki:[-15,-8], stokk:[{fra:-15, til:-8, t:"hækkar um 7"}], titill:"−15 + 7 = −8"}]},
    leidir:{x:"Mismunurinn á −20 og 15 er alltaf 35.", lidir:[
      {t:"Í gegnum 0", x:"Teldu að 0 og svo frá 0.", m:{teg:"jofnur", linur:[{s:"20 + 15 = [35]"}]}, svar:"35"},
      {t:"Fimm í einu", x:"Teldu skref af 5 á hitamælinum frá −20 upp í 15.", m:{teg:"jofnur", linur:[{s:"−20, −15, −10, −5, 0, 5, 10, 15"},{s:"7 skref · 5 = [35]"}]}, svar:"35"}
    ], nidur:"Báðar leiðirnar gefa 35."},
    villur:[
      {t:"Dregið frá í stað þess að leggja saman", samhengi:"Mismunurinn á −20 og 15", rangt:["20 − 15 = 5"], rett:["20 + 15 = 35"],
       x:"Tölurnar eru sitt hvorum megin við 0. Þá eru fjarlægðirnar að 0 lagðar saman."},
      {t:"−5 talin stærri en −2", rangt:["−5 er stærra en −2 af því að 5 er meira en 2."], rett:["−5 er minna en −2."],
       x:"Því lengra til vinstri á talnalínunni, því minni er talan."},
      {t:"Farið í ranga átt", samhengi:"Hitinn er −7° og lækkar um 5°.", rangt:["−2°"], rett:["−12°"],
       x:"Þegar hitinn lækkar fer hann lengra niður fyrir 0."}
    ]
  },

  midsaekni: {
    titill:"Tíðasta gildi, miðgildi og meðaltal",
    inngangur:"Þessi þrjú gildi segja til um hvar „miðjan“ er í safni gagna.",
    aefa:[{heiti:"Tölfræði og líkur", slod:"tolfraedi-og-likur.html"}],
    skref:{daemi:"Börnin mældu kastið hans Jens og fengu 5,47 m, 5,42 m, 5,46 m, 5,42 m og 5,43 m.", lidir:[
      {t:"Tíðasta gildi", x:"Talan sem kemur oftast fyrir. 5,42 kemur tvisvar fyrir.",
       m:{teg:"jofnur", linur:[{s:"5,47 – [5,42] – 5,46 – [5,42] – 5,43"},{s:"Tíðasta gildið er [5,42 m]"}]}},
      {t:"Miðgildi", x:"Raðaðu tölunum í stækkandi röð. Miðgildið er talan í miðjunni.",
       m:{teg:"jofnur", linur:[{s:"5,42 – 5,42 – [5,43] – 5,46 – 5,47"},{s:"Miðgildið er [5,43 m]"}]}},
      {t:"Meðaltal", x:"Leggðu allar tölurnar saman og deildu með fjölda talnanna.",
       m:{teg:"jofnur", linur:[{s:"5,42 + 5,42 + 5,43"},{s:"+ 5,46 + 5,47 = 27,2"},{s:"27,2 : 5 = [5,44]"}]}},
      {t:"Tvær tölur í miðjunni", x:"Ef tölurnar eru fjórar eru tvær í miðjunni. Miðgildið er þá talan mitt á milli þeirra.",
       m:{teg:"jofnur", linur:[{s:"3 – [4] – [6] – 9"},{s:"(4 + 6) : 2 = [5]"}]}}
    ]},
    auka:{titill:"Meðaltal er að skipta jafnt", x:"Andrés á 4 kirsuber, Beta 3 og Sylvía 8. Ef þau skipta berjunum jafnt fær hvert þeirra 5.",
      m:[{teg:"sulurit", gildi:[4,3,8], max:8, lina:5, nofn:["Andrés","Beta","Sylvía"]},{teg:"jofnur", linur:[{s:"4 + 3 + 8 = 15"},{s:"15 : 3 = [5]"}]}]},
    leidir:{x:"Meðaltal kirsuberjanna, 4, 3 og 8. Svarið er alltaf 5.", lidir:[
      {t:"Leggja saman og deila", x:"Summa deilt með fjölda.", m:{teg:"jofnur", linur:[{s:"4 + 3 + 8 = 15"},{s:"15 : 3 = [5]"}]}, svar:"5"},
      {t:"Jafna út", x:"Sylvía gefur Andrési 1 ber og Betu 2.", m:{teg:"jofnur", linur:[{s:"4 + 1 = 5"},{s:"3 + 2 = 5"},{s:"8 − 3 = 5"}]}, svar:"5"},
      {t:"Súlurit", x:"Það sem er fyrir ofan línuna fyllir upp í það sem vantar.", m:{teg:"sulurit", gildi:[4,3,8], max:8, lina:5}, svar:"5"}
    ], nidur:"Allar leiðirnar gefa 5."},
    villur:[
      {t:"Ekki raðað fyrst", samhengi:"5,47 – 5,42 – 5,46 – 5,42 – 5,43", rangt:["Miðgildið er 5,46."], rett:["5,42 – 5,42 – 5,43 – 5,46 – 5,47","Miðgildið er 5,43."],
       x:"Raðaðu tölunum í stækkandi röð áður en þú finnur miðjuna."},
      {t:"Deilt með röngum fjölda", samhengi:"Úrkoma í eina viku: 7, 3, 0, 0, 5, 11 og 9 mm.", rangt:["35 : 5 = 7"], rett:["7 + 3 + 0 + 0 + 5 + 11 + 9 = 35","35 : 7 = 5"],
       x:"Dagarnir með 0 mm teljast líka með. Tölurnar eru sjö."},
      {t:"Talan eða hve oft hún kemur fyrir?", samhengi:"6, 3, 8, 5, 4, 5, 6, 2, 3, 6", rangt:["Tíðasta gildið er 3, því 6 kemur þrisvar fyrir."], rett:["Tíðasta gildið er 6."],
       x:"Tíðasta gildið er talan sjálf, ekki hve oft hún kemur fyrir."}
    ]
  },

  likur: {
    titill:"Líkur",
    inngangur:"Líkur segja til um möguleikana á því að atburður eigi sér stað. Þær eru skráðar með tölu frá 0 upp í 1.",
    aefa:[{heiti:"Tölfræði og líkur", slod:"tolfraedi-og-likur.html"}],
    skref:{daemi:"Í poka eru 12 plómur, 3 gular og 9 rauðar. Hverjar eru líkurnar á að fá gula plómu?", lidir:[
      {t:"Teldu allar plómurnar", x:"Í pokanum eru 12 plómur.", m:{teg:"plomur", gular:3, raudar:9}},
      {t:"Teldu þær sem passa", x:"3 plómur eru gular.", m:{teg:"plomur", gular:3, raudar:9, merkja:true}},
      {t:"Skrifaðu sem brot", x:"Gular plómur ofan við strikið, allar plómurnar fyrir neðan.", m:{teg:"jofnur", linur:[{s:"{3/12}"}]}},
      {t:"Styttu brotið", x:"Deildu í teljara og nefnara með 3.", m:{teg:"jofnur", linur:[{s:"{3/12} = [{1/4}]"}]}}
    ]},
    leidir:{x:"Hverjar eru líkurnar á að draga spaða úr spilastokki? Svarið er alltaf {1/4}.", lidir:[
      {t:"Telja spilin", x:"Í stokknum eru 52 spil og 13 þeirra eru spaðar.", m:{teg:"jofnur", linur:[{s:"{13/52} = [{1/4}]"}]}, svar:"{1/4}"},
      {t:"Telja sortirnar", x:"Sortirnar eru 4 og ein þeirra er spaði.", m:{teg:"jofnur", linur:[{s:"[{1/4}]"}]}, svar:"{1/4}"},
      {t:"Deila", x:"Hvert fjórða spil er spaði.", m:{teg:"jofnur", linur:[{s:"52 : 13 = 4"}]}, svar:"{1/4}"}
    ], nidur:"Allar leiðirnar gefa {1/4}."},
    villur:[
      {t:"Rangt fyrir neðan strikið", samhengi:"3 gular og 9 rauðar plómur", rangt:["{3/9}"], rett:["{3/12} = {1/4}"],
       x:"Fyrir neðan strikið eru allar plómurnar, líka þær gulu."},
      {t:"Líkur stærri en 1", rangt:["{12/3}"], rett:["{3/12}"],
       x:"Líkur eru aldrei stærri en 1. Plómurnar sem passa eru fyrir ofan strikið."},
      {t:"Líklegt er ekki öruggt", samhengi:"Magnea hittir körfuna 6 sinnum í 20 köstum.", rangt:["Hún hittir örugglega 3 sinnum í næstu 10 köstum."], rett:["Hún getur reiknað með að hitta um það bil 3 sinnum í 10 köstum."],
       x:"Líkur sem eru fundnar með tilraun segja hvað er líklegt, ekki hvað gerist örugglega."}
    ]
  },

  margfoldun: {
    titill:"Margföldun – rúðuaðferð",
    inngangur:"Bútaðu dæmið niður í minni hluta sem þú kannt að margfalda, reiknaðu hvern hluta og leggðu svo allt saman.",
    aefa:[{heiti:"Margföldun og deiling", slod:"margfoldun-og-deiling.html"}],
    skref:{daemi:"22 · 12", lidir:[
      {t:"Bútaðu aðra töluna niður", x:"12 = 10 + 2. Þá er 22 · 12 sama og 22 · 10 og 22 · 2 lögð saman.",
       m:{teg:"rudunet", a:[22], b:[10,2]}},
      {t:"Reiknaðu hvern hluta", x:"Margföldun með 10 og 2 er þægileg.",
       m:{teg:"jofnur", linur:[{s:"22 · 10 = 220"},{s:"22 · 2 = 44"}]}},
      {t:"Leggðu saman", x:"Svarið er summa hlutanna.",
       m:{teg:"jofnur", linur:[{s:"220 + 44 = [264]"}]}},
      {t:"Bútaðu báðar tölurnar", x:"Það má líka búta 22 niður í 20 + 2. Þá verða reitirnir fjórir.",
       m:{teg:"rudunet", a:[20,2], b:[10,2]}}
    ]},
    auka:{titill:"Stærra dæmi: 34 · 46", x:"34 = 30 + 4 og 46 = 40 + 6. Hver reitur er reiknaður og svo er allt lagt saman: 1 200 + 160 + 180 + 24 = 1 564.",
      m:{teg:"rudunet", a:[30,4], b:[40,6]}},
    leidir:{x:"Þú ræður hvernig þú bútar. Svarið við 22 · 12 er alltaf 264.", lidir:[
      {t:"12 = 10 + 2", x:"Bútaðu 12.", m:{teg:"jofnur", linur:[{s:"22 · 10 = 220"},{s:"22 · 2 = 44"},{s:"220 + 44 = [264]"}]}, svar:"264"},
      {t:"22 = 20 + 2", x:"Bútaðu 22.", m:{teg:"jofnur", linur:[{s:"12 · 20 = 240"},{s:"12 · 2 = 24"},{s:"240 + 24 = [264]"}]}, svar:"264"},
      {t:"12 = 6 + 6", x:"Bútaðu 12 í tvo jafna hluta.", m:{teg:"jofnur", linur:[{s:"22 · 6 = 132"},{s:"22 · 6 = 132"},{s:"132 + 132 = [264]"}]}, svar:"264"},
      {t:"Fjórir reitir", x:"Bútaðu báðar tölurnar.", m:{teg:"rudunet", a:[20,2], b:[10,2]}, svar:"200 + 20 + 40 + 4 = 264"}
    ], nidur:"Allar leiðirnar gefa 264. Veldu búta sem þér finnst þægilegt að margfalda með."},
    villur:[
      {t:"Aðeins tveir reitir", samhengi:"22 · 12", rangt:["20 · 10 + 2 · 2 = 200 + 4 = 204"], rett:["200 + 20 + 40 + 4 = 264"],
       x:"Þegar báðar tölurnar eru bútaðar verða reitirnir fjórir. Hér vantar 2 · 10 og 20 · 2."},
      {t:"Núll gleymist", samhengi:"30 · 40", rangt:["30 · 40 = 120"], rett:["3 · 4 = 12","30 · 40 = 1 200"],
       x:"Tugir sinnum tugir gefa hundruð. Tvö núll bætast aftan við."},
      {t:"Gleymt að leggja saman", samhengi:"22 · 12", rangt:["Svar: 44"], rett:["220 + 44 = 264"],
       x:"Svarið er summa allra hlutanna, ekki síðasti hlutinn."}
    ]
  },

  deiling: {
    titill:"Deiling – Stikuaðferð",
    inngangur:"Þú deilir með því að nota margföldun sem þú kannt. Þú ræður hve stór skrefin eru.",
    aefa:[{heiti:"Deiling – Stikuaðferð", slod:"deiling-stikuadferd.html"},{heiti:"Margföldun og deiling", slod:"margfoldun-og-deiling.html"}],
    skref:{daemi:"5 215 : 5", lidir:[
      {t:"Uppsetning", x:"Skrifaðu dæmið og dragðu lóðrétta línu. Vinstra megin reiknum við. Hægra megin skráum við hve oft 5 fer í.",
       m:{teg:"deiling", tala:"5215", deilir:5, skref:[1000,40,3], syna:0}},
      {t:"Hjálparlisti", x:"Skrifaðu margföldun með 5 sem þú kannt vel. Þú ræður hvaða tölur þú notar.",
       m:{teg:"jofnur", linur:[{s:"5 · 1 = 5"},{s:"5 · 10 = 50"},{s:"5 · 100 = 500"},{s:"5 · 1 000 = 5 000"}]}},
      {t:"Veldu margföldun og dragðu frá", x:"Hve oft fer 5 í 5 215? 5 · 1 000 = 5 000. Skrifaðu 1 000 hægra megin og dragðu 5 000 frá. Þá eru 215 eftir.",
       m:{teg:"deiling", tala:"5215", deilir:5, skref:[1000,40,3], syna:1}},
      {t:"Endurtaktu", x:"Hve oft fer 5 í 215? 5 · 40 = 200. Skrifaðu 40 hægra megin og dragðu 200 frá. Þá eru 15 eftir.",
       m:{teg:"deiling", tala:"5215", deilir:5, skref:[1000,40,3], syna:2}},
      {t:"Haltu áfram þar til 0 er eftir", x:"5 · 3 = 15 og 15 − 15 = 0. Leggðu svo saman tölurnar hægra megin: 1 000 + 40 + 3 = 1 043.",
       m:{teg:"deiling", tala:"5215", deilir:5, skref:[1000,40,3]}},
      {t:"Prófaðu svarið", x:"Margfaldaðu svarið með 5. Ef þú færð 5 215 er svarið rétt.",
       m:{teg:"jofnur", linur:[{s:"5 · 1 043 = [5 215]"}]}}
    ]},
    leidir:{x:"Allir nota sömu aðferð en velja margföldun sem þeir kunna. Svarið við 5 215 : 5 er alltaf 1 043.", lidir:[
      {t:"Stór skref", x:"Þúsund, svo tugir, svo einingar.", m:{teg:"deiling", tala:"5215", deilir:5, skref:[1000,40,3]}, svar:"1 000 + 40 + 3 = 1 043"},
      {t:"Tíu í einu", x:"Notar 5 · 10 = 50 aftur og aftur.", m:{teg:"deiling", tala:"5215", deilir:5, skref:[1000,10,10,10,10,3]}, svar:"1 000 + 10 + 10 + 10 + 10 + 3 = 1 043"},
      {t:"Fimm hundruð í einu", x:"Notar 5 · 500 og 5 · 20 tvisvar hvort.", m:{teg:"deiling", tala:"5215", deilir:5, skref:[500,500,20,20,3]}, svar:"500 + 500 + 20 + 20 + 3 = 1 043"},
      {t:"Eitt stórt skref", x:"Sér strax að 5 · 1 040 = 5 200.", m:{teg:"deiling", tala:"5215", deilir:5, skref:[1040,3]}, svar:"1 040 + 3 = 1 043"}
    ], nidur:"Fleiri skref eru ekki röng. Þau eru bara lengri leið að sama svari."},
    villur:[
      {t:"Of stórt skref", samhengi:"215 : 5", rangt:["5 · 50 = 250","215 − 250 gengur ekki"], rett:["5 · 40 = 200","215 − 200 = 15"],
       x:"Talan sem þú dregur frá má ekki vera stærri en talan fyrir ofan. Veldu minni margföldun."},
      {t:"Hætt of snemma", samhengi:"447 : 6", rangt:["6 · 70 = 420 og 27 eru eftir","Svar: 70 og 27 afgangs"], rett:["27 er stærra en 6, svo 6 fer oftar í.","6 · 4 = 24 og 3 eru eftir","Svar: 74 og 3 afgangs"],
       x:"Afgangurinn verður alltaf að vera minni en talan sem deilt er með."},
      {t:"Gleymt að leggja saman", samhengi:"5 215 : 5", rangt:["Svar: 3"], rett:["1 000 + 40 + 3 = 1 043"],
       x:"Svarið er summa allra talnanna hægra megin línunnar, ekki síðasta talan."}
    ]
  },

  tugabrot: {
    titill:"Tugabrot – margföldun og deiling",
    inngangur:"Reiknaðu eins og með heilar tölur en hafðu sætin í huga: einingar, tíundu hlutar og hundraðshlutar.",
    aefa:[{heiti:"Margföldun og deiling", slod:"margfoldun-og-deiling.html"}],
    skref:{daemi:"Froskur hoppar 2,7 cm í hverju hoppi. Hve langt kemst hann í 5 hoppum? 2,7 · 5", lidir:[
      {t:"Bútaðu tugabrotið", x:"2,7 = 2 + 0,7. Reiknaðu heilu töluna og tíundu hlutana hvort fyrir sig.",
       m:{teg:"rudunet", a:[2,0.7], b:[5]}},
      {t:"Tíundu hlutarnir", x:"0,7 eru 7 tíundu hlutar. 7 · 5 = 35 tíundu hlutar, sem eru 3,5.",
       m:{teg:"jofnur", linur:[{s:"7 · 5 = 35"},{s:"35 tíundu hlutar = [3,5]"}]}},
      {t:"Leggðu saman", x:"Froskurinn kemst 13,5 cm.",
       m:{teg:"jofnur", linur:[{s:"2 · 5 = 10"},{s:"0,7 · 5 = 3,5"},{s:"10 + 3,5 = [13,5]"}]}},
      {t:"Er svarið líklegt?", x:"2,7 er nálægt 3 og 3 · 5 = 15. Svarið 13,5 er nálægt 15, svo komman er á réttum stað.",
       m:{teg:"jofnur", linur:[{s:"3 · 5 = 15"},{s:"2,7 · 5 = [13,5]", a:"nálægt 15"}]}}
    ]},
    auka:{titill:"Deiling á sama hátt", x:"5 kg af perum kosta 67,5 kr. Hvað kostar 1 kg? 67,5 : 5. Fyrst er athugað hve mörgum tugum er hægt að skipta, síðan einingum og loks tíundu hlutum.",
      m:{teg:"deiling", tala:"67,5", deilir:5, skref:[10,3,0.5]}},
    leidir:{x:"Sama dæmi, ólíkar leiðir. Svarið við 2,7 · 5 er alltaf 13,5.", lidir:[
      {t:"Rúðunet", x:"Heila talan og tíundu hlutarnir hvor í sínum reit.", m:{teg:"rudunet", a:[2,0.7], b:[5]}, svar:"10 + 3,5 = 13,5"},
      {t:"Talnalína", x:"Fimm hopp sem eru 2,7 hvert.", m:{teg:"hopp", skref:2.7, fjoldi:5, max:15}, svar:"13,5"},
      {t:"Í tíundu hlutum", x:"2,7 eru 27 tíundu hlutar.", m:{teg:"jofnur", linur:[{s:"27 · 5 = 135"},{s:"135 tíundu hlutar = [13,5]"}]}, svar:"13,5"}
    ], nidur:"Allar leiðirnar gefa 13,5."},
    villur:[
      {t:"Tíundu sinnum tíundu", samhengi:"0,3 · 0,5", rangt:["0,3 · 0,5 = 1,5"], rett:["0,3 · 0,5 = 0,15"],
       x:"Tíundu hlutar sinnum tíundu hlutar verða hundraðshlutar. Á myndinni eru 15 litlir reitir af 100 litaðir.", m:{teg:"flatarmal", a:3, b:5}},
      {t:"Komman á röngum stað", rangt:["2,7 · 5 = 135","2,7 · 5 = 1,35"], rett:["2,7 · 5 = 13,5"],
       x:"Metið svarið fyrst: 2,7 er nálægt 3 og 3 · 5 = 15."},
      {t:"Aðeins annarri tölunni breytt", samhengi:"Hve margar 2,6 m langar gardínur fást úr 39 m af efni?", rangt:["39 : 2,6 = 39 : 26"], rett:["39 m = 390 dm og 2,6 m = 26 dm","390 : 26 = 15"],
       x:"Ef annarri tölunni er breytt verður að breyta hinni líka. Hér eru báðar lengdirnar skrifaðar í desímetrum."}
    ]
  },

  forgangsrod: {
    titill:"Forgangsröð reikniaðgerða",
    inngangur:"Í dæmum með fleiri en einni reikniaðgerð skiptir máli í hvaða röð er reiknað.",
    aefa:[{heiti:"Margföldun og deiling", slod:"margfoldun-og-deiling.html"},{heiti:"Tölur", slod:"tolur-og-reikningur.html"}],
    skref:{daemi:"Reglan", lidir:[
      {t:"Svigar fyrst", x:"Reiknaðu fyrst það sem er inni í sviganum.", m:{teg:"jofnur", jafnt:true, linur:[{s:"68 − [(18 − 14)]"},{s:"68 − 4"},{s:"[64]"}]}},
      {t:"Síðan margföldun og deiling", x:"Ef engir svigar eru er fyrst margfaldað og deilt.", m:{teg:"jofnur", jafnt:true, linur:[{s:"60 + [5 · 4]"},{s:"60 + 20"},{s:"[80]"}]}},
      {t:"Síðast samlagning og frádráttur", x:"Þegar búið er að margfalda og deila er lagt saman og dregið frá.", m:{teg:"jofnur", jafnt:true, linur:[{s:"[5 · 6] − [12 : 3]"},{s:"30 − 4"},{s:"[26]"}]}},
      {t:"Tveir svigar", x:"Reiknaðu báða svigana fyrst.", m:{teg:"jofnur", jafnt:true, linur:[{s:"[(5 + 3)] · [(12 − 5)]"},{s:"8 · 7"},{s:"[56]"}]}}
    ]},
    leidir:{x:"Fimm börn kaupa hvert blýant á 12 kr. og strokleður á 6 kr. Hvað borga þau samtals? Dæmið er 5 · (12 + 6).", lidir:[
      {t:"Svigann fyrst", x:"Hvað borgar hvert barn?", m:{teg:"jofnur", linur:[{s:"12 + 6 = 18"},{s:"5 · 18 = 90"}]}, svar:"90 kr."},
      {t:"Hvor hlutur fyrir sig", x:"Hvað kosta allir blýantarnir og öll strokleðrin?", m:{teg:"jofnur", linur:[{s:"5 · 12 = 60"},{s:"5 · 6 = 30"},{s:"60 + 30 = 90"}]}, svar:"90 kr."}
    ], nidur:"Báðar leiðirnar gefa 90 kr. Þú ræður hvora leiðina þú notar."},
    villur:[
      {t:"Lagt saman fyrst", samhengi:"40 + 3 · 50", rangt:["= 43 · 50 = 2 150"], rett:["= 40 + 150 = 190"],
       x:"Margföldun kemur á undan samlagningu. Fjórir tíkallar og þrír fimmtíukallar eru 190 kr."},
      {t:"Svigann vantar", samhengi:"Egill á 500 kr. Hann kaupir blöðrur á 260 kr. og kerti á 50 kr. Hve mikið á hann eftir?", rangt:["500 − 260 + 50 = 290"], rett:["500 − (260 + 50) = 500 − 310 = 190"],
       x:"Egill borgar fyrir báða hlutina. Sviginn sýnir að allt verðið er dregið frá."},
      {t:"Ekki reiknað allt í sviganum fyrst", samhengi:"8 · (4 + 5)", rangt:["= 32 + 5 = 37"], rett:["= 8 · 9 = 72"],
       x:"Það sem er í sviganum er reiknað í heild áður en margfaldað er."}
    ]
  },

  hornasumma: {
    titill:"Hornasumma",
    inngangur:"Hornin í þríhyrningi eru alltaf samtals 180° og hornin í ferhyrningi samtals 360°. Þannig finnurðu horn sem vantar.",
    aefa:[{heiti:"Rúmfræði", slod:"rumfraedi.html"}],
    skref:{daemi:"Í þríhyrningnum ABC er ∠A = 75° og ∠B = 35°. Hve stórt er ∠C?", lidir:[
      {t:"Hornasumma þríhyrnings er 180°", x:"Ef hornin þrjú eru klippt af og lögð hlið við hlið mynda þau beint strik, 180°.",
       m:{teg:"hornasumma", A:75, B:35}},
      {t:"Leggðu saman hornin sem eru gefin", x:"75° + 35° = 110°",
       m:{teg:"thri", A:75, B:35, merki:{A:"75°", B:"35°", C:"?"}, w:320, h:200}},
      {t:"Dragðu frá 180°", x:"180° − 110° = 70°",
       m:{teg:"thri", A:75, B:35, merki:{A:"75°", B:"35°", C:"70°"}, merkt:"C", w:320, h:200}},
      {t:"Prófaðu", x:"Leggðu öll hornin saman. Þú átt að fá 180°.",
       m:{teg:"jofnur", linur:[{s:"75° + 35° + 70° = [180°]"}]}}
    ]},
    auka:{titill:"Ferhyrningar: 360°", x:"Hornalína skiptir ferhyrningi í tvo þríhyrninga, svo hornasumman er 2 · 180° = 360°. Dæmi: ∠A = ∠B = 90° og ∠D = 125°. Þá er ∠C = 360° − 305° = 55°.",
      m:[{teg:"form", w:280, h:190, pts:[[30,160],[200,160],[250,40],[80,40]], hornalina:[0,2], nofn:["A","B","C","D"]},
         {teg:"form", w:250, h:240, pts:[[50,205],[206,205],[206,31],[50,140]], rett:[0,1], horn:{3:"125°", 2:"55°"}, merkt:"a2", nofn:["A","B","C","D"]}]},
    leidir:{x:"Sami þríhyrningur, ólíkar leiðir. ∠C er alltaf 70°.", lidir:[
      {t:"Leggja saman og draga frá", x:"Fyrst summa hornanna sem eru gefin.", m:{teg:"jofnur", linur:[{s:"75° + 35° = 110°"},{s:"180° − 110° = [70°]"}]}, svar:"70°"},
      {t:"Draga frá í tveimur skrefum", x:"Eitt horn í einu.", m:{teg:"jofnur", linur:[{s:"180° − 75° = 105°"},{s:"105° − 35° = [70°]"}]}, svar:"70°"},
      {t:"Telja upp í 180°", x:"Hvað vantar upp á 110° til að fá 180°?", m:{teg:"jofnur", linur:[{s:"110° + [70°] = 180°"}]}, svar:"70°"}
    ], nidur:"Allar leiðirnar gefa 70°."},
    villur:[
      {t:"360° í þríhyrningi", samhengi:"∠A = 75° og ∠B = 35°. Hve stórt er ∠C?", rangt:["360° − 110° = 250°"], rett:["180° − 110° = 70°"],
       x:"360° er hornasumma ferhyrnings. Í þríhyrningi eru hornin samtals 180°."},
      {t:"Rétta hornið gleymist", samhengi:"∠A er rétt horn og ∠B = 25°. Hve stórt er ∠C?", rangt:["180° − 25° = 155°"], rett:["90° + 25° = 115°","180° − 115° = 65°"],
       x:"Litli ferningurinn merkir rétt horn, 90°. Það þarf líka að draga það frá.", m:{teg:"thri", A:90, B:25, rett:"A", merki:{B:"25°", C:"?"}, w:240, h:160, pad:34}},
      {t:"Gleymt að deila með 2", samhengi:"Jafnarma þríhyrningur: ∠C = 40°. Hve stór eru ∠A og ∠B?", rangt:["∠A = ∠B = 180° − 40° = 140°"], rett:["180° − 40° = 140°","140° : 2 = 70°"],
       x:"Í jafnarma þríhyrningi eru tvö horn jafn stór. Þau skipta 140° á milli sín."}
    ]
  },

  maelikvardi: {
    titill:"Mælikvarði og einslaga myndir",
    inngangur:"Í einslaga myndum eru allar lengdir margfaldaðar með sömu tölu. Hlutfallið segir hve mörgum sinnum lengri eða styttri hliðarnar eru.",
    aefa:[{heiti:"Rúmfræði", slod:"rumfraedi.html"}],
    skref:{daemi:"Myndirnar 1 og 2 eru einslaga. Hve löng er hliðin FG?", lidir:[
      {t:"Finndu tvær samsvarandi hliðar", x:"AB = 5 cm og EF = 15 cm eru báðar gefnar.",
       m:{teg:"einslaga", a:[5,6,"5 cm","6 cm","h0"], b:[15,18,"15 cm","?","h0"], sc:9}},
      {t:"Finndu hlutfallið", x:"15 : 5 = 3. Hliðarnar í mynd 2 eru þrisvar sinnum lengri. Hlutfallið milli myndar 1 og myndar 2 er 1 : 3.",
       m:{teg:"jofnur", linur:[{s:"15 : 5 = [3]"},{s:"1 : 3", a:"mynd 1 : mynd 2"}]}},
      {t:"Margfaldaðu", x:"BC = 6 cm, svo FG = 6 cm · 3 = 18 cm.",
       m:{teg:"einslaga", a:[5,6,"5 cm","6 cm","h1"], b:[15,18,"15 cm","18 cm","h1"], sc:9}}
    ]},
    auka:{titill:"Mælikvarði á teikningu", x:"Fyrri talan á við teikninguna og seinni talan raunveruleikann.",
      m:{teg:"jofnur", linur:[{s:"[1] : 100", a:"Minnkun: 1 cm á teikningu táknar 100 cm í raun."},{s:"[2] : 1", a:"Stækkun: 2 cm á teikningu tákna 1 cm í raun."},{s:"[1] : 18", a:"Líkan af bíl sem er 25 cm: 25 · 18 = 450 cm í raun."}]}},
    leidir:{x:"Sama dæmi, ólíkar leiðir. FG er alltaf 18 cm.", lidir:[
      {t:"Margfalda með hlutfallinu", x:"Finndu hlutfallið og margfaldaðu.", m:{teg:"jofnur", linur:[{s:"15 : 5 = 3"},{s:"6 · 3 = [18]"}]}, svar:"18 cm"},
      {t:"Tafla", x:"Báðar hliðarnar eru margfaldaðar með sömu tölu.", m:{teg:"tafla", haus:["","AB og EF","BC og FG"], radir:[["Mynd 1","5 cm","6 cm"],["Mynd 2","15 cm","?"],["Margfaldað með","3","3"]], hl:2}, svar:"18 cm"},
      {t:"Leggja saman", x:"15 er 5 + 5 + 5. Þá er FG 6 + 6 + 6.", m:{teg:"jofnur", linur:[{s:"6 + 6 + 6 = [18]"}]}, svar:"18 cm"}
    ], nidur:"Allar leiðirnar gefa 18 cm."},
    villur:[
      {t:"Lagt við í stað þess að margfalda", samhengi:"AB = 5 cm, EF = 15 cm og BC = 6 cm. Hve löng er FG?", rangt:["15 − 5 = 10","FG = 6 + 10 = 16 cm"], rett:["15 : 5 = 3","FG = 6 · 3 = 18 cm"],
       x:"Í einslaga myndum eru allar hliðar margfaldaðar með sömu tölu. Ef sama tala er lögð við allar hliðar breytist lögunin."},
      {t:"Röðinni í mælikvarða ruglað", rangt:["1 : 100 merkir að teikningin sé 100 sinnum stærri."], rett:["1 : 100 merkir að 1 cm á teikningunni tákni 100 cm í raun. Það er minnkun."],
       x:"Fyrri talan á alltaf við teikninguna."},
      {t:"Margfaldað þegar á að deila", samhengi:"Hlutfallið milli hrings 1 og hrings 2 er 5 : 1. Geisli hrings 1 er 25 cm.", rangt:["Geisli hrings 2 = 25 · 5 = 125 cm"], rett:["Hringur 2 er minni.","25 : 5 = 5 cm"],
       x:"Athugaðu fyrst hvort myndin sem þú leitar að er stærri eða minni."}
    ]
  }
};
