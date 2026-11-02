# Stuðningur fyrir miðstig

Æfingar og leikir í kjarnafögum, birt með GitHub Pages.

## Uppbygging

```
index.html          forsíða, les efni.js sjálfkrafa
efni.js             efnisyfirlit, ein færsla fyrir hvert efni
sameiginlegt.css    útlit sem allar síður deila
staerdfraedi/       efni í stærðfræði
islenska/           efni í íslensku
```

## Nýtt efni

1. Settu HTML-skrána í möppu fagsins, t.d. `staerdfraedi/nyr-leikur.html`.
2. Bættu við einni færslu í `EFNI` í `efni.js`:

```js
{
  titill: "Heiti",
  fag: "staerdfraedi",
  vidfangsefni: "Viðfangsefni",
  lysing: "Ein lína um hvað er æft.",
  slod: "staerdfraedi/nyr-leikur.html"
}
```

## Nýtt fag

Bættu faginu við `FOG` í `efni.js`, búðu til möppu fyrir það og settu lit fagsins í `sameiginlegt.css` (t.d. `.fag-enska{...}`).

## Persónuvernd

Síðan er opin öllum. Engin nöfn nemenda, innskráning eða vistaðar niðurstöður.
