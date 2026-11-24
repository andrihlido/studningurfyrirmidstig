# Stuðningur fyrir miðstig

Stærðfræðiefni eftir köflum í Stiku 3a: veggspjöld, aðferðir, æfingapróf, æfing fyrir kaflapróf og hugtakasafn.

## Tegundir efnis

- **Veggspjald** – aðferð skref fyrir skref og ólíkar leiðir að sama svari.
- **Hugtök** – orð og hugtök úr kaflanum með skýringu, dæmi og mynd.
- **Aðferð** – nemandinn vinnur dæmi skref fyrir skref með aðferðinni, t.d. Stikuaðferð, ausuaðferð, forgangsröð reikniaðgerða og Hvaða tölu táknar x?
- **Æfingapróf** – spurningar úr kaflanum. Nemandinn velur efni og fær upprifjun á undan hverju efni.
- **Kaflapróf** – æfing fyrir kaflapróf: spurningar úr öllum efnum kaflans, án upprifjunar.

## Skipulag

- `index.html` – forsíðan. Hún les `efni.js` og raðar efninu eftir köflum í *Skilja* og *Æfa*. Hver kafli opnast og lokast með einum smelli.
- `efni.js` – efnisyfirlitið. Ný lína hér birtist sjálfkrafa á forsíðunni.
- `sameiginlegt.css` – sameiginlegt útlit, þar á meðal litir hverrar tegundar (veggspjald, hugtök, aðferð, æfingapróf, kaflapróf).
- `staerdfraedi/` – aðferðirnar, æfingaprófin, veggspjöldin og hugtakasafnið.
  - `veggspjald.html?v=…` – opnar veggspjald. Efnið er í `veggspjold.js`.
  - `prenta.html?v=…` – prentútgáfa veggspjalds á eina A3- eða A4-síðu. Hún velur sjálf stefnu blaðs og hvað kemst fyrir.
  - `myndir.js` – myndirnar sem veggspjöldin og hugtakasafnið nota.
  - `hugtakasafn.html` – hugtök úr öllum köflum. `#kafli-3` opnar 3. kafla.
  - `leikjarammi.js` og `leikjarammi.css` – sameiginlegur rammi allra aðferða og æfingaprófa: upphafsskjár (val á efni), upprifjun, lokaskjár með niðurstöðuspjaldi og framvinda.
    - **Bein slóð á efni:** `?efni=…` aftan við slóðina opnar síðuna beint með þeim efnum, t.d. `forgangsrod.html?efni=svigar,long` eða `?efni=allt`. Neðst á upphafsskjánum er hnappurinn *Fyrir kennara: afrita tengil á valin efni* sem býr tengilinn til.
    - **Framvinda:** þegar nemandi klárar öll dæmi í efni fær það hak á upphafsskjánum og framvindan sést á forsíðunni. Hún er vistuð í vafranum á tækinu (`studningur-framvinda`), án innskráningar.
    - **Niðurstöðuspjald:** í lokin með nafni, dagsetningu og árangri í hverju efni, til að taka skjámynd af og skila í Google Classroom.
  - Æfingaprófin bjóða líka upp á *Æfingu fyrir kaflapróf*. `#kaflaprof` aftan við slóðina opnar hana beint.
  - `forgangsrod.html` og `hvada-tolu-taknar-x.html` – aðferðir þar sem dæmið styttist línu fyrir línu eins og í reikningsbók. Þær nota báðar `reikningur.js` (les dæmi og reiknar skref fyrir skref) og `reikningur.css`. Ný dæmi eru búin til í `EFNI` neðst í hvorri skrá, t.d. `"(x + 3) · 4 = 36"`.

## Nýtt efni

1. Settu skrána í `staerdfraedi/`.
2. Bættu við einni línu í `EFNI` í `efni.js` með `tegund` ("utskyring", "adferd" eða "aefingaprof") og `flokkar`.
