# Stuðningur fyrir miðstig

Stærðfræðiefni eftir köflum í Stiku 3a: veggspjöld, leikir, æfing fyrir kaflapróf og hugtakasafn.

## Skipulag

- `index.html` – forsíðan. Hún les `efni.js` og raðar efninu eftir köflum í *Skilja* og *Æfa*. Hver kafli opnast og lokast með einum smelli.
- `efni.js` – efnisyfirlitið. Ný lína hér birtist sjálfkrafa á forsíðunni.
- `sameiginlegt.css` – sameiginlegt útlit.
- `staerdfraedi/` – leikirnir, veggspjöldin og hugtakasafnið.
  - `veggspjald.html?v=…` – opnar veggspjald. Efnið er í `veggspjold.js`.
  - `prenta.html?v=…` – prentútgáfa veggspjalds á eina A3- eða A4-síðu. Hún velur sjálf stefnu blaðs og hvað kemst fyrir.
  - `myndir.js` – myndirnar sem veggspjöldin og hugtakasafnið nota.
  - `hugtakasafn.html` – hugtök úr öllum köflum. `#kafli-3` opnar 3. kafla.
  - Leikirnir bjóða upp á *Æfingu fyrir kaflapróf*. `#kaflaprof` aftan við slóðina opnar hana beint.

## Nýtt efni

1. Settu skrána í `staerdfraedi/`.
2. Bættu við einni línu í `EFNI` í `efni.js` með `tegund` ("utskyring" eða "leikur") og `flokkar`.
