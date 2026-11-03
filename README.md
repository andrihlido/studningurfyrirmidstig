# Stuðningur fyrir miðstig

Stærðfræðiefni eftir köflum í Stiku 3a: veggspjöld, leikir, æfing fyrir kaflapróf og hugtakasafn.

## Skipulag

- `index.html` – forsíðan. Hún les `efni.js` og raðar efninu eftir köflum í *Skilja* og *Æfa*.
- `efni.js` – efnisyfirlitið. Ný lína hér birtist sjálfkrafa á forsíðunni.
- `sameiginlegt.css` – sameiginlegt útlit.
- `staerdfraedi/` – leikirnir, veggspjöldin og hugtakasafnið.
  - `veggspjald.html?v=…` – opnar veggspjald. Efnið er í `veggspjold.js`.
  - `myndir.js` – myndirnar sem veggspjöldin og hugtakasafnið nota.
  - `hugtakasafn.html` – hugtök úr öllum köflum. `#kafli-3` opnar 3. kafla.
  - Leikirnir bjóða upp á *Æfingu fyrir kaflapróf*. `#kaflaprof` aftan við slóðina opnar hana beint.

## Nýtt efni

1. Settu skrána í `staerdfraedi/`.
2. Bættu við einni línu í `EFNI` í `efni.js` með `tegund` ("utskyring" eða "leikur") og `flokkar`.
