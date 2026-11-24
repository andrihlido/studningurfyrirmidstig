/* Reiknivél fyrir leikina „Forgangsröð reikniaðgerða“ og „Hvaða tölu táknar x?“.
   Dæmi eru lesin úr texta, t.d. "60 + 5 · 4" eða "(29 − x) : 4 = 6", og geymd sem tré.
   Hnútar: {t:"n", v} tala · {t:"x"} · {t:"op", o:"+|−|·|:", a, b, sv} þar sem sv merkir sviga. */
(function(){
  "use strict";
  var NB = " ", nr = 0;
  function nytt(h){ h.id = ++nr; return h; }

  /* ---------- Lestur ---------- */
  function lesa(texti){
    var tok = texti.replace(/\s+/g, "").match(/\d+|[x+−\-·*:()]/g), i = 0;
    function sja(){ return tok[i]; }
    function taka(){ return tok[i++]; }
    function sida(){ var t = taka(); if(t === "("){ var e = lidur(); taka(); e = afrita(e); if(e.t === "op") e.sv = true; return e; } if(t === "x") return nytt({t:"x"}); return nytt({t:"n", v:Number(t)}); }
    function thattur(){ var a = sida(); while(sja() === "·" || sja() === "*" || sja() === ":"){ var o = taka(); if(o === "*") o = "·"; a = nytt({t:"op", o:o, a:a, b:sida()}); } return a; }
    function lidur(){ var a = thattur(); while(sja() === "+" || sja() === "−" || sja() === "-"){ var o = taka(); if(o === "-") o = "−"; a = nytt({t:"op", o:o, a:a, b:thattur()}); } return a; }
    return lidur();
  }
  function lesaJofnu(texti){ var p = texti.split("="); return {v:lesa(p[0]), h:lesa(p[1])}; }

  /* ---------- Hjálparföll fyrir tré ---------- */
  function afrita(h){ if(!h) return h; var c = {}; for(var k in h) c[k] = h[k]; if(h.t === "op"){ c.a = afrita(h.a); c.b = afrita(h.b); } return c; }
  function finna(h, id){ if(!h) return null; if(h.id === id) return h; if(h.t !== "op") return null; return finna(h.a, id) || finna(h.b, id); }
  function foreldri(h, id){ if(!h || h.t !== "op") return null; if(h.a.id === id || h.b.id === id) return h; return foreldri(h.a, id) || foreldri(h.b, id); }
  function skipta(h, id, nyr){ if(h.id === id) return nyr; if(h.t !== "op") return h; var c = afrita(h); c.a = skipta(h.a, id, nyr); c.b = skipta(h.b, id, nyr); return c; }
  function hefurX(h){ return h.t === "x" || (h.t === "op" && (hefurX(h.a) || hefurX(h.b))); }
  function erTala(h){ return h.t === "n"; }
  function reikna(o, a, b){ return o === "+" ? a + b : o === "−" ? a - b : o === "·" ? a * b : a / b; }
  function gildi(h, x){ if(h.t === "n") return h.v; if(h.t === "x") return x; return reikna(h.o, gildi(h.a, x), gildi(h.b, x)); }
  function inniISviga(rot, id){
    var leid = [];
    (function f(h, ofar){ if(!h) return false; if(h.id === id){ leid = ofar.concat([h]); return true; } if(h.t !== "op") return false; return f(h.a, ofar.concat([h])) || f(h.b, ofar.concat([h])); })(rot, []);
    return leid.some(function(n){ return n.sv; });
  }
  function opHnutar(h, out){ out = out || []; if(h.t === "op"){ out.push(h); opHnutar(h.a, out); opHnutar(h.b, out); } return out; }
  function stig(o){ return (o === "·" || o === ":") ? 2 : 1; }

  /* Svæði aðgerðar: næsti svigi utan um hana, annars allt dæmið */
  function svaedi(rot, id){
    var leid = [];
    (function f(h, ofar){ if(!h) return false; if(h.id === id){ leid = ofar.concat([h]); return true; } if(h.t !== "op") return false; return f(h.a, ofar.concat([h])) || f(h.b, ofar.concat([h])); })(rot, []);
    for(var i = leid.length - 1; i >= 0; i--) if(leid[i].sv) return leid[i];
    return rot;
  }
  /* Aðgerðir í svæði, án þeirra sem eru inni í öðrum sviga */
  function adgerdirISvaedi(h){
    var out = [];
    (function f(n, fyrst){ if(n.t !== "op") return; if(n.sv && !fyrst) return; out.push(n); f(n.a, false); f(n.b, false); })(h, true);
    return out;
  }
  /* Aðgerðir sem má reikna núna. Svigar fyrst, svo margföldun og deiling, svo samlagning og frádráttur. */
  function gildar(rot){
    var kostir = opHnutar(rot).filter(function(n){ return erTala(n.a) && erTala(n.b); });
    var svigi = opHnutar(rot).some(function(n){ return n.sv; });
    if(svigi){ var inni = kostir.filter(function(n){ return inniISviga(rot, n.id); }); if(inni.length) kostir = inni; }
    return kostir.filter(function(n){
      return stig(n.o) === 2 || !adgerdirISvaedi(svaedi(rot, n.id)).some(function(k){ return stig(k.o) === 2; });
    });
  }
  /* Skýring þegar smellt er á aðgerð sem á ekki að reikna fyrst */
  function astaeda(rot, id){
    var n = finna(rot, id);
    var born = [n.a, n.b];
    if(born.some(hefurX)) return "Þetta er ekki hægt að reikna því að x er óþekkt tala.";
    var svigi = opHnutar(rot).some(function(k){ return k.sv; });
    if(svigi && !inniISviga(rot, id)) return "Svigar fyrst. Reiknaðu fyrst það sem er inni í sviganum.";
    if(born.some(function(b){ return b.t === "op" && b.sv; })) return "Svigar fyrst. Reiknaðu fyrst það sem er inni í sviganum.";
    var ops = adgerdirISvaedi(svaedi(rot, id));
    var erMarg = ops.some(function(k){ return stig(k.o) === 2; }), erSaml = ops.some(function(k){ return stig(k.o) === 1; });
    if(stig(n.o) === 1 && erMarg) return "Margföldun og deiling koma á undan samlagningu og frádrætti.";
    if(stig(n.o) === 2 && erSaml) return "Margföldun og deiling eru reiknaðar frá vinstri til hægri. Byrjaðu á þeirri sem er lengst til vinstri.";
    if(stig(n.o) === 2) return "Hér er bara margfaldað og deilt. Þá er reiknað frá vinstri til hægri.";
    return "Hér er bara lagt saman og dregið frá. Þá er reiknað frá vinstri til hægri.";
  }
  /* Ábending um hvar á að byrja */
  function abending(rot){
    var g = gildar(rot);
    if(!g.length) return "";
    var n = g[0], s = svaedi(rot, n.id), ops = adgerdirISvaedi(s);
    var erMarg = ops.some(function(k){ return stig(k.o) === 2; }), erSaml = ops.some(function(k){ return stig(k.o) === 1; });
    var texti = "";
    if(s.sv) texti = "Í dæminu er svigi. Byrjaðu inni í sviganum. ";
    if(ops.length === 1) return (texti + (s.sv ? "" : "Nú er bara ein aðgerð eftir.")).trim();
    if(erMarg && erSaml) return texti + (s.sv ? "Inni í sviganum koma margföldun og deiling á undan samlagningu og frádrætti."
                                              : "Margföldun og deiling koma á undan samlagningu og frádrætti. Hvar er margfaldað eða deilt í dæminu?");
    return texti + (s.sv ? "Inni í sviganum er" : "Hér er") + " bara " + (erMarg ? "margfaldað og deilt" : "lagt saman og dregið frá") + ". Byrjaðu vinstra megin og reiknaðu frá vinstri til hægri.";
  }
  /* Ábending fyrir sjálfan útreikninginn, t.d. rúðuaðferð fyrir stærri margföldun */
  function reikniAbending(o, a, b){
    if(o === "·"){
      var st = Math.max(a, b), li = Math.min(a, b);
      if(st >= 11 && st % 10 !== 0 && li <= 12){
        var T = st - st % 10, E = st % 10;
        return "Bútaðu dæmið niður: " + tala(st) + " · " + li + " = " + T + " · " + li + " + " + E + " · " + li + " = " + tala(T * li) + " + " + (E * li) + ".";
      }
      return "Hugsaðu um margföldunartöfluna: " + a + " · " + b + ".";
    }
    if(o === ":") return "Hvaða tala sinnum " + b + " er " + tala(a) + "?";
    if(b >= 10 && String(b).replace(/0/g, "").length > 1){
      var butar = String(b).split("").map(function(c, i, arr){ return Number(c) * Math.pow(10, arr.length - 1 - i); }).filter(Boolean).map(tala);
      if(o === "+") return "Leggðu saman í bútum: " + tala(a) + " + " + tala(b) + " = " + tala(a) + " + " + butar.join(" + ") + ". Leggðu einn bút við í einu.";
      return "Dragðu frá í bútum: " + tala(a) + " − " + tala(b) + " = " + tala(a) + " − " + butar.join(" − ") + ". Dragðu einn bút frá í einu.";
    }
    if(b < 10 && o === "+") return "Byrjaðu á " + tala(Math.max(a, b)) + " og teldu " + Math.min(a, b) + " áfram.";
    if(b < 10) return "Byrjaðu á " + tala(a) + " og teldu " + b + " aftur á bak.";
    if(o === "+") return "Leggðu saman: " + tala(a) + " + " + tala(b) + ".";
    return "Dragðu frá: " + tala(a) + " − " + tala(b) + ".";
  }

  /* ---------- Tölur ---------- */
  function tala(v){ var s = String(v); return s.length >= 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, NB) : s; }
  function lesaSvar(s){ s = String(s).replace(/[\s ]/g, ""); return /^-?\d+$/.test(s) ? Number(s) : null; }

  /* ---------- Teikning ----------
     o.takkar: aðgerðir eru hnappar · o.valid: id aðgerðar sem er valin
     o.kassi: id hnúts sem er hulinn · o.hylja: id hnúta sem má smella á til að hylja */
  function teikna(h, o){
    o = o || {};
    var t = 0;
    function f(n){
      var s;
      if(n.id === o.kassi) return "<span class=\"kassi\" aria-label=\"kassi\">?</span>";
      if(n.t === "n") s = "<span class=\"tk tala" + (n.merkt ? " merkt" : "") + "\" data-t=\"" + (t++) + "\">" + tala(n.v) + "</span>";
      else if(n.t === "x") s = "<span class=\"tk ox\" data-t=\"" + (t++) + "\">x</span>";
      else {
        var vinstri = f(n.a);
        var op = o.takkar ? "<button type=\"button\" class=\"tk opk\" data-id=\"" + n.id + "\" data-t=\"" + (t++) + "\" aria-label=\"Reikna þennan hluta: " + texti(n) + "\">" + n.o + "</button>"
                          : "<span class=\"tk op\" data-t=\"" + (t++) + "\">" + n.o + "</span>";
        var haegri = f(n.b);
        s = vinstri + op + haegri;
        if(n.sv) s = "<span class=\"tk sv\">(</span>" + s + "<span class=\"tk sv\">)</span>";
        if(n.id === o.valid) s = "<span class=\"valid\">" + s + "</span>";
      }
      if(o.hylja && o.hylja.indexOf(n.id) !== -1) s = "<button type=\"button\" class=\"hylkostur\" data-hid=\"" + n.id + "\">" + s + "</button>";
      return s;
    }
    return f(h);
  }
  function texti(h){
    if(h.t === "n") return tala(h.v);
    if(h.t === "x") return "x";
    var s = texti(h.a) + " " + h.o + " " + texti(h.b);
    return h.sv ? "(" + s + ")" : s;
  }

  /* ---------- Skref fyrir skref (forgangsröð) ----------
     Notað í forgangsraðarleiknum og þegar einfaldað er eða prófað í x-leiknum. */
  function Skref(rot, adeinsTolur){
    this.rot = afrita(rot); this.linur = [afrita(rot)]; this.fasi = "velja"; this.valid = null; this.adeinsTolur = !!adeinsTolur;
  }
  Skref.prototype.kostir = function(){
    return this.adeinsTolur ? opHnutar(this.rot).filter(function(n){ return erTala(n.a) && erTala(n.b); }) : gildar(this.rot);
  };
  Skref.prototype.lokid = function(){ return this.kostir().length === 0; };
  Skref.prototype.smella = function(id){
    var ok = this.kostir().some(function(n){ return n.id === id; });
    if(!ok) return {ok:false, s: astaeda(this.rot, id)};
    this.valid = id; this.fasi = "reikna";
    var n = finna(this.rot, id);
    return {ok:true, s:"Rétt! Reiknaðu " + texti({t:"op", o:n.o, a:n.a, b:n.b}) + "."};
  };
  Skref.prototype.svarid = function(){ var n = finna(this.rot, this.valid); return reikna(n.o, n.a.v, n.b.v); };
  Skref.prototype.svara = function(v){
    var n = finna(this.rot, this.valid), rett = this.svarid();
    if(v !== rett) return {ok:false, s:"Ekki alveg. Reiknaðu " + tala(n.a.v) + " " + n.o + " " + tala(n.b.v) + " aftur."};
    this.rot = skipta(this.rot, this.valid, nytt({t:"n", v:rett}));
    this.linur.push(afrita(this.rot)); this.valid = null; this.fasi = this.lokid() ? "lokid" : "velja";
    return {ok:true, s:"Rétt! " + tala(n.a.v) + " " + n.o + " " + tala(n.b.v) + " = " + tala(rett) + "."};
  };
  Skref.prototype.rettSkref = function(){
    if(this.fasi === "velja") return this.smella(this.kostir()[0].id);
    if(this.fasi === "reikna") return this.svara(this.svarid());
    return null;
  };

  window.RK = {lesa:lesa, lesaJofnu:lesaJofnu, afrita:afrita, finna:finna, foreldri:foreldri, skipta:skipta, hefurX:hefurX, gildi:gildi,
    gildar:gildar, astaeda:astaeda, abending:abending, reikniAbending:reikniAbending, tala:tala, lesaSvar:lesaSvar, teikna:teikna, texti:texti,
    nytt:nytt, Skref:Skref, stig:stig, inniISviga:inniISviga, reikna:reikna};
})();
