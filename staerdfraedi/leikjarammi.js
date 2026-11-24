/* Sameiginlegur rammi allra leikja á síðunni.
   Sér um:
   - upphafsskjá (val á efni),
   - upprifjun á undan hverju efni,
   - lokaskjá með niðurstöðuspjaldi,
   - beinar slóðir á efni, t.d. forgangsrod.html?efni=svigar,long,
   - framvindu: hak við efni sem nemandinn hefur lokið (vistað í vafranum).

   Síðan þarf að hafa <section id="upphaf">, <section id="leikur" class="hidden"> og <section id="lok" class="hidden">.

   Notkun í aðferð eða æfingaprófi:
     RAMMI.upphaf({titill, inngangur, efni:[{id, heiti, lysing, hopur, fjoldi}], byrja:function(ids){…}, …})
     RAMMI.hefja(["svigar","svigar",…])    // eitt efnis-id fyrir hvert dæmi í umferðinni
     RAMMI.skra("svigar", true)            // eftir hvert dæmi: var það leyst án villu?
     RAMMI.lok({hnappar:[…]})              // niðurstöður
     RAMMI.upprifjun({titill, atridi, mynd, eftir})
*/
(function(){
  "use strict";
  var FRAMVINDA = "studningur-framvinda", NAFN = "studningur-nafn";
  var MAN = ["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember"];
  var L = null;   // stillingar leiksins úr upphaf()
  var U = null;   // núverandi umferð
  var eftirUpprifjun = null;

  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; }); }
  function audkenni(s){
    return String(s).toLowerCase()
      .replace(/[áà]/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/[úü]/g, "u").replace(/ý/g, "y")
      .replace(/ð/g, "d").replace(/þ/g, "th").replace(/æ/g, "ae").replace(/ö/g, "o")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  /* Vafrageymsla er aðeins til þæginda: ef hún virkar ekki gengur leikurinn samt */
  function lesa(lykill, sjalfg){ try { var v = JSON.parse(localStorage.getItem(lykill)); return v == null ? sjalfg : v; } catch(e){ return sjalfg; } }
  function skrifa(lykill, v){ try { localStorage.setItem(lykill, JSON.stringify(v)); } catch(e){} }
  function leikId(){ return (location.pathname.split("/").pop() || "leikur").replace(/\.html?$/, ""); }
  function dagsetning(){ var d = new Date(); return d.getDate() + ". " + MAN[d.getMonth()] + " " + d.getFullYear(); }
  function efniEftirId(id){ for(var i = 0; i < L.efni.length; i++) if(L.efni[i].id === id) return L.efni[i]; return null; }
  function heiti(id){ var e = efniEftirId(id); return e ? e.heiti : ((U && U.heiti && U.heiti[id]) || id); }

  /* L.einingar: [eintala, fleirtala] í þolfalli, t.d. ["spurningu", "spurningar"]. Sjálfgefið: dæmi. */
  function eining(n){ var e = L.einingar || ["dæmi", "dæmi"]; return (n % 10 === 1 && n % 100 !== 11) ? e[0] : e[1]; }
  function framvinda(){ return lesa(FRAMVINDA, {})[L.id] || {}; }
  /* Geymir besta árangur í hverju efni */
  function vista(lykill, an, alls){
    var f = lesa(FRAMVINDA, {}), g = f[L.id] || (f[L.id] = {});
    var e = g[lykill];
    if(!e || an / alls >= e.an / e.alls) g[lykill] = {an:an, alls:alls};
    g._efni = L.efni.length;
    skrifa(FRAMVINDA, f);
  }

  function syna(id){
    if(id === "upphaf" && L && $("rEfni")){       /* efnalistinn teiknaður aftur svo að hak við lokin efni sjáist */
      $("rEfni").innerHTML = efnalisti(valdir());
      var pr = $("rProf"); if(pr) pr.innerHTML = profTexti();
      uppfaera();
    }
    ["upphaf", "leikur", "lok"].forEach(function(s){ var el = $(s); if(el) el.classList.toggle("hidden", s !== id); });
    window.scrollTo(0, 0);
  }

  /* ================= Upphafsskjár ================= */
  function upphaf(o){
    L = o; L.id = o.id || leikId();
    o.efni.forEach(function(e){ if(!e.id) e.id = audkenni(e.heiti); });
    teiknaUpphaf();

    /* Bein slóð: ?efni=a,b opnar leikinn beint með þessum efnum */
    var p = new URLSearchParams(location.search).get("efni");
    if(p){
      var ids = p === "allt" ? o.efni.map(function(e){ return e.id; })
                             : p.split(",").map(function(s){ return s.trim(); }).filter(function(id){ return efniEftirId(id); });
      if(ids.length){
        merkja(ids);
        o.byrja(ids);
        return {beinSlod:true};
      }
    }
    return {beinSlod:false};
  }

  function sjalfgefin(){
    var s = L.sjalfgefid, allir = L.efni.map(function(e){ return e.id; });
    if(s === "allt") return allir;
    if(typeof s === "number") return allir.slice(0, s);
    if(Array.isArray(s)) return s;
    return allir.slice(0, 1);
  }

  function profTexti(){
    var f = framvinda();
    return "Æfing fyrir kaflapróf: spurningar úr öllum efnum kaflans, án upprifjunar." +
           (f.kaflaprof ? " Besti árangur: " + f.kaflaprof.an + " af " + f.kaflaprof.alls + " án villu." : "");
  }
  function efnalisti(valin){
    var f = framvinda(), hopar = [];
    L.efni.forEach(function(e){
      var sidasti = hopar[hopar.length - 1];
      if(!sidasti || sidasti.heiti !== (e.hopur || "")) hopar.push({heiti:e.hopur || "", efni:[e]});
      else sidasti.efni.push(e);
    });
    return hopar.map(function(g){
      return (g.heiti ? "<h3 class=\"r-hopur\">" + g.heiti + "</h3>" : "") + "<div class=\"r-efnalisti\">" + g.efni.map(function(e){
        var lokid = f[e.id];
        return "<label class=\"r-efni" + (lokid ? " lokid" : "") + "\"><input type=\"checkbox\" value=\"" + esc(e.id) + "\"" + (valin.indexOf(e.id) !== -1 ? " checked" : "") + ">" +
               "<span class=\"r-efni-texti\"><b>" + e.heiti + "</b>" + (e.lysing ? "<span class=\"d\">" + e.lysing + "</span>" : "") +
               (lokid ? "<span class=\"r-besti\">Besti árangur: " + lokid.an + " af " + lokid.alls + " án villu</span>" : "") + "</span>" +
               (lokid ? "<span class=\"r-lokid\">✓ Lokið</span>" : "") + "</label>";
      }).join("") + "</div>";
    }).join("");
  }

  function teiknaUpphaf(){
    var o = L, h = "", valin = sjalfgefin();
    h += "<header class=\"stack r-haus\"><h1>" + o.titill + "</h1>" + (o.inngangur ? "<p class=\"r-inngangur\">" + o.inngangur + "</p>" : "") + "</header>";
    if(o.skref) h += "<div class=\"skref\" aria-label=\"Skrefin\">" + o.skref.map(function(s, i){
      return "<span class=\"flis\"><span class=\"nr\">" + (i + 1) + "</span>" + s.heiti + (s.takn ? " <span class=\"takn\">" + s.takn + "</span>" : "") + "</span>";
    }).join("") + "</div>";

    h += "<div class=\"card stack\"><div class=\"r-titilrod\"><h2>Veldu efni</h2><button type=\"button\" class=\"r-textahnappur\" id=\"rAllt\">Velja allt</button></div>";
    h += "<div id=\"rEfni\">" + efnalisti(valin) + "</div>";
    if(o.stillingar) h += "<div class=\"r-stillingar\">" + o.stillingar + "</div>";
    h += "<div class=\"row\"><button type=\"button\" class=\"btn acc\" id=\"rByrja\">Byrja</button>" +
         (o.hnappar || []).map(function(b, i){ return "<button type=\"button\" class=\"btn ghost\" id=\"rHnappur" + i + "\">" + b.texti + "</button>"; }).join("") +
         "<span class=\"r-villa\" id=\"rVilla\" role=\"alert\"></span></div>";
    h += "<p class=\"muted\" id=\"rFjoldi\"></p>";
    if(o.kaflaprof) h += "<p class=\"muted\" id=\"rProf\">" + profTexti() + "</p>";
    h += "</div>";
    if(o.aukaspjald) h += o.aukaspjald;
    h += "<div class=\"r-fotur\">" +
         (o.tengill ? "<p>" + (o.tengill.forskeyti || "Viltu rifja upp?") + " <a class=\"r-tengill\" href=\"" + o.tengill.slod + "\">" + o.tengill.texti + "</a></p>" : "<span></span>") +
         "<div class=\"r-kennari\"><button type=\"button\" class=\"r-textahnappur\" id=\"rAfrita\">Fyrir kennara: afrita tengil á valin efni</button>" +
         "<span id=\"rAfritaSkilabod\" class=\"muted\" role=\"status\"></span></div></div>";

    var box = $("upphaf");
    box.innerHTML = h;
    box.classList.add("stack");

    box.querySelector("#rEfni").addEventListener("change", function(){ $("rVilla").textContent = ""; uppfaera(); });
    $("rAllt").addEventListener("click", function(){
      var allt = valdir().length === L.efni.length;
      box.querySelectorAll("#rEfni input").forEach(function(c){ c.checked = !allt; });
      uppfaera();
    });
    $("rByrja").addEventListener("click", function(){
      var ids = valdir();
      if(!ids.length){ $("rVilla").textContent = "Veldu að minnsta kosti eitt efni."; return; }
      $("rVilla").textContent = "";
      L.byrja(ids);
    });
    (o.hnappar || []).forEach(function(b, i){ $("rHnappur" + i).addEventListener("click", b.smellt); });
    $("rAfrita").addEventListener("click", afritaTengil);
    uppfaera();
  }

  function valdir(){ return Array.prototype.map.call($("upphaf").querySelectorAll("#rEfni input:checked"), function(c){ return c.value; }); }
  function merkja(ids){ $("upphaf").querySelectorAll("#rEfni input").forEach(function(c){ c.checked = ids.indexOf(c.value) !== -1; }); uppfaera(); }
  function uppfaera(){
    var ids = valdir();
    $("rAllt").textContent = ids.length === L.efni.length ? "Hreinsa val" : "Velja allt";
    var t = typeof L.fjoldiTexti === "function" ? L.fjoldiTexti(ids) : (L.fjoldiTexti || "");
    $("rFjoldi").textContent = t;
  }

  function afritaTengil(){
    var ids = valdir(), skilabod = $("rAfritaSkilabod");
    if(!ids.length){ skilabod.textContent = "Veldu efni fyrst."; return; }
    var slod = location.href.split(/[?#]/)[0] + "?efni=" + (ids.length === L.efni.length ? "allt" : ids.join(","));
    function synaSlod(){
      skilabod.innerHTML = "Afritaðu tengilinn: <input class=\"r-slod\" readonly value=\"" + esc(slod) + "\">";
      var inn = skilabod.querySelector("input"); inn.focus(); inn.select();
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(slod).then(function(){
        skilabod.textContent = "Tengillinn er afritaður. Límdu hann inn í Google Classroom. Hann opnar síðuna beint með völdu efnunum.";
      }, synaSlod);
    } else synaSlod();
  }

  /* ================= Umferð ================= */
  /* rod: eitt efnis-id fyrir hvert dæmi. opt.prof: æfing fyrir kaflapróf. opt.heiti: heiti efna sem eru ekki í listanum */
  function hefja(rod, opt){
    opt = opt || {};
    U = {prof:!!opt.prof, heiti:opt.heiti || {}, fjoldi:{}, skrad:{}, rodEfna:[]};
    rod.forEach(function(id){
      if(!U.fjoldi[id]){ U.fjoldi[id] = 0; U.rodEfna.push(id); }
      U.fjoldi[id]++;
    });
  }
  /* Kallað eftir hvert dæmi. Þegar öll dæmi í efni eru búin er árangurinn vistaður. */
  function skra(id, anVillu){
    if(!U) return;
    var s = U.skrad[id] || (U.skrad[id] = {an:0, alls:0});
    s.alls++; if(anVillu) s.an++;
    var e = efniEftirId(id);
    if(!U.prof && e && s.alls === U.fjoldi[id] && (!e.fjoldi || s.alls >= e.fjoldi)) vista(id, s.an, s.alls);
  }

  /* ================= Lokaskjár ================= */
  /* o.ofan: HTML undir niðurstöðuspjaldinu · o.nedan: HTML neðst · o.hnappar: [{texti, adal, smellt}] · o.eftir: kallað þegar skjárinn er tilbúinn */
  function lok(o){
    o = o || {};
    var heild = {an:0, alls:0}, rodir = "";
    U.rodEfna.forEach(function(id){
      var s = U.skrad[id]; if(!s) return;
      heild.an += s.an; heild.alls += s.alls;
      rodir += "<li><span>" + heiti(id) + "</span><b>" + s.an + " af " + s.alls + " án villu" + (s.an === s.alls ? " <span class=\"r-hak\">✓</span>" : "") + "</b></li>";
    });
    if(U.prof && heild.alls) vista("kaflaprof", heild.an, heild.alls);
    var nafn = lesa(NAFN, "");
    var h = "<header class=\"stack r-haus\"><h1>" + (heild.alls && heild.an === heild.alls ? "Frábært!" : "Vel gert!") + "</h1>" +
            "<p class=\"r-inngangur\">Þú kláraðir " + heild.alls + " " + eining(heild.alls) + ". " + heild.an + " án villu.</p></header>";
    h += "<div class=\"card stack r-spjald\" id=\"rSpjald\">" +
         "<div class=\"r-spjald-haus\"><div><span class=\"r-merki\">Niðurstöðuspjald</span><h2>" + (U.prof ? (L.profTitill || L.titill + " · Æfing fyrir kaflapróf") : L.titill) + "</h2></div>" +
         "<span class=\"r-dags\">" + dagsetning() + "</span></div>" +
         "<label class=\"r-nafn\"><span>Nafn</span><input id=\"rNafn\" autocomplete=\"off\" placeholder=\"Skrifaðu nafnið þitt\" value=\"" + esc(nafn) + "\"></label>" +
         "<ul class=\"r-listi\">" + rodir + "</ul>" +
         "<p class=\"r-samtals\">Samtals: " + heild.an + " af " + heild.alls + " án villu</p></div>";
    h += "<p class=\"muted r-skjamynd\">Kennarinn gæti beðið þig um að taka skjámynd af spjaldinu og skila henni í Google Classroom.</p>";
    if(o.ofan) h += o.ofan;
    h += "<div class=\"row\">" + (o.hnappar || []).map(function(b, i){
      return "<button type=\"button\" class=\"btn " + (b.adal ? "acc" : "ghost") + "\" id=\"rLok" + i + "\">" + b.texti + "</button>";
    }).join("") + "</div>";
    if(o.nedan) h += o.nedan;
    var box = $("lok");
    box.innerHTML = h;
    box.classList.add("stack");
    (o.hnappar || []).forEach(function(b, i){ $("rLok" + i).addEventListener("click", b.smellt); });
    $("rNafn").addEventListener("input", function(e){ skrifa(NAFN, e.target.value); });
    syna("lok");
    if(o.eftir) o.eftir(box);
  }

  /* ================= Upprifjun ================= */
  /* o.titill · o.atridi: [HTML] · o.mynd: HTML eða DOM-hnútur · o.tengill: {texti, slod} · o.hnappur · o.eftir: kallað þegar henni er lokað */
  function upprifjun(o){
    var y = $("rUpprifjun");
    if(!y){
      y = document.createElement("div");
      y.id = "rUpprifjun"; y.className = "r-yfirlag hidden";
      y.setAttribute("role", "dialog"); y.setAttribute("aria-modal", "true"); y.setAttribute("aria-labelledby", "rUppTitill");
      y.innerHTML = "<div class=\"card stack r-upp\"><span class=\"r-merki\">Upprifjun</span><h2 id=\"rUppTitill\"></h2>" +
                    "<ul class=\"recap-list\" id=\"rUppAtridi\"></ul><div id=\"rUppMynd\" class=\"r-upp-mynd\"></div>" +
                    "<div class=\"row\"><button type=\"button\" class=\"btn acc\" id=\"rUppTakki\"></button></div></div>";
      document.body.appendChild(y);
      $("rUppTakki").addEventListener("click", lokaUpprifjun);
      y.addEventListener("click", function(e){ if(e.target === y) lokaUpprifjun(); });
      document.addEventListener("keydown", function(e){ if(e.key === "Escape" && !y.classList.contains("hidden")) lokaUpprifjun(); });
    }
    $("rUppTitill").textContent = o.titill;
    $("rUppAtridi").innerHTML = (o.atridi || []).map(function(a){ return "<li>" + a + "</li>"; }).join("") +
      (o.tengill ? "<li><a href=\"" + o.tengill.slod + "\">" + o.tengill.texti + "</a></li>" : "");
    var m = $("rUppMynd");
    m.innerHTML = "";
    if(o.mynd && typeof o.mynd === "object") m.appendChild(o.mynd); else m.innerHTML = o.mynd || "";
    m.classList.toggle("hidden", !o.mynd);
    $("rUppTakki").textContent = o.hnappur || "Byrja á dæmunum";
    eftirUpprifjun = o.eftir || null;
    y.classList.remove("hidden");
    y.scrollTop = 0;
    setTimeout(function(){ $("rUppTakki").focus(); }, 30);
  }
  function lokaUpprifjun(){
    $("rUpprifjun").classList.add("hidden");
    var f = eftirUpprifjun; eftirUpprifjun = null;
    if(f) f();
  }
  function upprifjunOpin(){ var y = $("rUpprifjun"); return !!y && !y.classList.contains("hidden"); }

  window.RAMMI = {upphaf:upphaf, hefja:hefja, skra:skra, lok:lok, upprifjun:upprifjun, upprifjunOpin:upprifjunOpin, lokaUpprifjun:lokaUpprifjun,
                  syna:syna, audkenni:audkenni, framvinda:function(id){ return lesa(FRAMVINDA, {})[id] || {}; }};
})();
