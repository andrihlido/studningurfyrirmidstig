/* Myndasafn fyrir veggspjöld og hugtakasafn.
   Notkun: MYNDIR.teikna({teg:"deiling", ...}) skilar HTML-streng. */
(function(){
  "use strict";

  /* ---------- Stílar fyrir myndirnar (settir inn einu sinni) ---------- */
  var CSS = [
    ".mynd{display:flex;justify-content:center;align-items:center;max-width:100%;overflow-x:auto}",
    ".mynd svg{display:block;max-width:100%;height:auto}",
    ".board{display:grid;grid-template-columns:auto 64px auto;grid-auto-rows:40px;justify-content:center;font-size:24px;font-weight:700;color:var(--ink);padding:10px 14px;background-color:#fff;background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:20px 20px;border-radius:10px;font-variant-numeric:tabular-nums}",
    ".board .n{display:flex;justify-content:space-between;align-items:center;gap:6px;padding:0 10px 0 2px;min-width:110px}",
    ".board .d{display:flex;align-items:center;padding-left:6px;white-space:nowrap}",
    ".board .r{display:flex;justify-content:space-between;align-items:center;gap:6px;border-left:3px solid var(--ink);padding:0 4px 0 10px;min-width:110px}",
    ".board .u{border-bottom:2.5px solid currentColor}",
    ".board .uu{border-bottom:6px double currentColor}",
    ".board .hl{color:var(--acc-dark)}",
    ".board .ans{color:var(--acc)}",
    ".board .afg{font-size:16px}",
    ".upps{border-collapse:collapse;font-size:26px;font-weight:700;font-variant-numeric:tabular-nums;margin:0 auto}",
    ".upps td{width:15px;height:34px;padding:0;text-align:center;vertical-align:bottom}",
    ".upps td.k{width:6px;padding:0}",
    ".upps td.ux{width:auto;text-align:left;padding-left:8px;white-space:nowrap}",
    ".upps tr.minni td{height:18px;font-size:15px;color:var(--acc-dark);vertical-align:bottom}",
    ".upps tr.lina td.c{border-top:2.5px solid var(--ink)}",
    ".upps .nytt{color:var(--acc-dark)}",
    ".jofnur{display:flex;flex-direction:column;gap:6px;align-items:flex-start;margin:0 auto;width:max-content;max-width:100%}",
    ".jofnur .j{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap}",
    ".jofnur .e{font-size:24px;font-weight:700;white-space:nowrap}",
    ".jofnur .e .t{color:var(--muted)}",
    ".jofnur mark{background:var(--acc-bg);color:var(--acc-dark);border-radius:6px;padding:0 4px}",
    ".jofnur .a{font-size:15px;color:var(--muted)}",
    ".mtafla{border-collapse:collapse;font-size:19px;margin:0 auto}",
    ".mtafla th{font-size:14px;color:var(--muted);text-align:left;padding:6px 12px;border-bottom:2px solid var(--line)}",
    ".mtafla td{white-space:nowrap;padding:6px 12px;border-bottom:1px solid var(--line);font-weight:700}",
    ".mtafla td.q{color:var(--acc)}",
    ".mtafla tr.hl td{background:var(--acc-bg);color:var(--acc-dark)}",
    ".saeti{border-collapse:collapse;margin:0 auto}",
    ".saeti td{font-size:34px;font-weight:700;text-align:center;min-width:44px;padding:0 4px;border-bottom:2px solid var(--line)}",
    ".saeti th{font-size:12px;font-weight:400;color:var(--muted);vertical-align:top;padding:4px 3px;line-height:1.2}",
    ".saeti .k{min-width:10px;padding:0}",
    ".saeti .on{color:var(--acc-dark);background:var(--acc-bg)}",
    ".frac{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;margin:0 2px;font-size:.85em}",
    ".frac span:first-child{border-bottom:2px solid currentColor;padding:0 3px 2px}",
    ".frac span:last-child{padding:2px 3px 0}"
  ].join("\n");
  if(typeof document !== "undefined" && !document.getElementById("myndir-css")){
    var st = document.createElement("style"); st.id = "myndir-css"; st.textContent = CSS; document.head.appendChild(st);
  }

  /* ---------- Hjálparföll ---------- */
  var NB = " ";
  function thus(s){
    return String(s).replace(/\d+(?:,\d+)?/g, function(m){
      var p = m.split(","); if(p[0].length >= 4) p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, NB);
      return p.join(",");
    });
  }
  function talaStr(v, dec){ var t = (dec ? v.toFixed(dec) : String(v)).replace(".", ","); if(dec) t = t.replace(/,?0+$/, ""); return thus(t); }
  function fmt(s){
    return String(s).replace(/(\d) (?=\d{3}(?!\d))/g, "$1" + NB).replace(/(\d°?) : (\d)/g, "$1" + NB + ":" + NB + "$2")
      .replace(/\{(\d+)\/(\d+)\}/g, "<span class=\"frac\"><span>$1</span><span>$2</span></span>");
  }
  function MYNDIR_FMT(t){ return String(t).replace(/(\d) (?=\d{3}(?!\d))/g, "$1" + NB); }
  var F = "font-family:Andika,sans-serif;";
  function txt(x, y, t, o){
    o = o || {};
    var halo = o.halo ? "paint-order:stroke;stroke:#fff;stroke-width:5px;stroke-linejoin:round;" : "";
    return "<text x=\"" + x.toFixed(1) + "\" y=\"" + y.toFixed(1) + "\" text-anchor=\"" + (o.a || "middle") + "\" dominant-baseline=\"middle\" style=\"" + F + halo + "font-size:" + (o.s || 16) + "px;font-weight:" + (o.w || 700) + ";fill:" + (o.c || "var(--ink)") + "\">" + t + "</text>";
  }
  function L(p, q, st){ return "<line x1=\"" + p[0].toFixed(1) + "\" y1=\"" + p[1].toFixed(1) + "\" x2=\"" + q[0].toFixed(1) + "\" y2=\"" + q[1].toFixed(1) + "\" style=\"" + (st || "stroke:var(--ink);stroke-width:2.5;stroke-linecap:round") + "\"/>"; }
  function P(c, r, d){ var t = d * Math.PI / 180; return [c[0] + r * Math.cos(t), c[1] - r * Math.sin(t)]; }
  function boga(c, r, a1, a2, st){
    var s = P(c, r, a1), e = P(c, r, a2), big = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return "<path d=\"M" + s[0].toFixed(1) + " " + s[1].toFixed(1) + " A" + r + " " + r + " 0 " + big + " 0 " + e[0].toFixed(1) + " " + e[1].toFixed(1) + "\" fill=\"none\" style=\"" + st + "\"/>";
  }
  function geiri(c, r, a1, a2, st){
    var s = P(c, r, a1), e = P(c, r, a2), big = (a2 - a1) > 180 ? 1 : 0;
    return "<path d=\"M" + c[0].toFixed(1) + " " + c[1].toFixed(1) + " L" + s[0].toFixed(1) + " " + s[1].toFixed(1) + " A" + r + " " + r + " 0 " + big + " 0 " + e[0].toFixed(1) + " " + e[1].toFixed(1) + " Z\" style=\"" + st + "\"/>";
  }
  function svg(w, h, lab, inner){ return "<svg viewBox=\"0 0 " + w + " " + h + "\" width=\"" + w + "\" role=\"img\" aria-label=\"" + lab + "\">" + inner + "</svg>"; }
  function poly(pts, st){ return "<polygon points=\"" + pts.map(function(p){ return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ") + "\" style=\"" + st + "\"/>"; }
  function dot(p, r, c){ return "<circle cx=\"" + p[0].toFixed(1) + "\" cy=\"" + p[1].toFixed(1) + "\" r=\"" + (r || 4) + "\" style=\"fill:" + (c || "var(--ink)") + "\"/>"; }
  function norm2(v){ var l = Math.sqrt(v[0]*v[0] + v[1]*v[1]); return [v[0]/l, v[1]/l]; }
  function mid(pts){ var c = [0, 0]; pts.forEach(function(p){ c[0] += p[0]/pts.length; c[1] += p[1]/pts.length; }); return c; }
  function utfra(v, m, d){ var u = norm2([v[0]-m[0], v[1]-m[1]]); return [v[0] + u[0]*d, v[1] + u[1]*d]; }
  var ACC = "stroke:var(--acc);stroke-width:3;stroke-linecap:round";
  var BOGI = "#7C8DB5";
  var FYLL = "fill:#EEF1F7;stroke:var(--ink);stroke-width:2.5;stroke-linejoin:round";
  var LITIR = ["#F6C3A3","#BFE3F5","#FCEFB4","#D7EFD9","#F3D9F0"];

  function rettHorn(v, a, b, sz){
    var ua = norm2([a[0]-v[0], a[1]-v[1]]), ub = norm2([b[0]-v[0], b[1]-v[1]]);
    var p1 = [v[0] + ua[0]*sz, v[1] + ua[1]*sz], p3 = [v[0] + ub[0]*sz, v[1] + ub[1]*sz], p2 = [p1[0] + ub[0]*sz, p1[1] + ub[1]*sz];
    return "<path d=\"M" + p1[0].toFixed(1) + " " + p1[1].toFixed(1) + " L" + p2[0].toFixed(1) + " " + p2[1].toFixed(1) + " L" + p3[0].toFixed(1) + " " + p3[1].toFixed(1) + "\" fill=\"none\" style=\"stroke:var(--ink);stroke-width:2\"/>";
  }
  function hornBogi(v, a, b, r, lit, fylla){
    var u1 = norm2([a[0]-v[0], a[1]-v[1]]), u2 = norm2([b[0]-v[0], b[1]-v[1]]);
    var p1 = [v[0] + u1[0]*r, v[1] + u1[1]*r], p2 = [v[0] + u2[0]*r, v[1] + u2[1]*r];
    var sweep = (u1[0]*u2[1] - u1[1]*u2[0]) > 0 ? 1 : 0;
    var d = "M" + p1[0].toFixed(1) + " " + p1[1].toFixed(1) + " A" + r + " " + r + " 0 0 " + sweep + " " + p2[0].toFixed(1) + " " + p2[1].toFixed(1);
    if(fylla) return "<path d=\"M" + v[0].toFixed(1) + " " + v[1].toFixed(1) + " L" + d.slice(1) + " Z\" style=\"fill:" + fylla + ";stroke:none\"/>";
    return "<path d=\"" + d + "\" fill=\"none\" style=\"stroke:" + (lit || BOGI) + ";stroke-width:2.2\"/>";
  }
  function hornStaerd(v, a, b){
    var u1 = norm2([a[0]-v[0], a[1]-v[1]]), u2 = norm2([b[0]-v[0], b[1]-v[1]]);
    return Math.acos(Math.max(-1, Math.min(1, u1[0]*u2[0] + u1[1]*u2[1])));
  }
  function strikMerki(p, q, teg, n){
    var dx = q[0] - p[0], dy = q[1] - p[1], len = Math.sqrt(dx*dx + dy*dy), u = [dx/len, dy/len], nn = [-u[1], u[0]];
    var m = [(p[0] + q[0])/2, (p[1] + q[1])/2], s = "";
    for(var k = 0; k < n; k++){
      var o = (k - (n - 1)/2) * 8, c = [m[0] + u[0]*o, m[1] + u[1]*o];
      if(teg === "samsida") s += "<path d=\"M" + (c[0] - u[0]*6 + nn[0]*6).toFixed(1) + " " + (c[1] - u[1]*6 + nn[1]*6).toFixed(1) + " L" + c[0].toFixed(1) + " " + c[1].toFixed(1) + " L" + (c[0] - u[0]*6 - nn[0]*6).toFixed(1) + " " + (c[1] - u[1]*6 - nn[1]*6).toFixed(1) + "\" fill=\"none\" style=\"stroke:var(--acc-dark);stroke-width:2.5\"/>";
      else s += L([c[0] + nn[0]*8, c[1] + nn[1]*8], [c[0] - nn[0]*8, c[1] - nn[1]*8], "stroke:var(--acc-dark);stroke-width:2.5");
    }
    return s;
  }

  /* ---------- Marghyrningur (skjáhnit) ---------- */
  function marghyrningur(pts, o){
    o = o || {};
    var n = pts.length, cen = mid(pts), s = "", merkt = o.merkt || "";
    s += poly(pts, o.fylla ? "fill:" + o.fylla + ";stroke:var(--ink);stroke-width:2.5;stroke-linejoin:round" : FYLL);
    (o.litHorn || []).forEach(function(lh){ s += hornBogi(pts[lh[0]], pts[(lh[0]+n-1)%n], pts[(lh[0]+1)%n], lh[2] || 26, null, lh[1]); });
    if(o.hornalina) s += L(pts[o.hornalina[0]], pts[o.hornalina[1]], "stroke:var(--acc);stroke-width:2.5;stroke-dasharray:8 5");
    (o.samsida || []).forEach(function(e){ s += strikMerki(pts[e[0]], pts[(e[0]+1)%n], "samsida", e[1]); });
    (o.jafnar || []).forEach(function(e){ s += strikMerki(pts[e[0]], pts[(e[0]+1)%n], "jafn", e[1] || 1); });
    (o.rett || []).forEach(function(i){ s += rettHorn(pts[i], pts[(i+1)%n], pts[(i+n-1)%n], o.rettSz || 15); });
    var hornL = o.horn || {};
    Object.keys(hornL).forEach(function(k){
      var i = Number(k), lab = hornL[k];
      if(!lab || (o.rett || []).indexOf(i) !== -1) return;
      var on = lab === "?" || merkt.indexOf("a" + i) !== -1;
      var a = pts[(i+n-1)%n], b = pts[(i+1)%n], th = hornStaerd(pts[i], a, b);
      s += hornBogi(pts[i], a, b, 20, on ? "var(--acc)" : BOGI);
      var u1 = norm2([a[0]-pts[i][0], a[1]-pts[i][1]]), u2 = norm2([b[0]-pts[i][0], b[1]-pts[i][1]]), bi = norm2([u1[0]+u2[0], u1[1]+u2[1]]);
      var d = Math.max(38, Math.min(66, 20 / Math.sin(th/2)));
      s += txt(pts[i][0] + bi[0]*d, pts[i][1] + bi[1]*d, lab, {s:15, c: on ? "var(--acc-dark)" : "var(--ink)"});
    });
    var hl = o.hlidar || {};
    Object.keys(hl).forEach(function(k){
      var i = Number(k), p = pts[i], q = pts[(i+1)%n], lab = hl[k];
      var m = [(p[0]+q[0])/2, (p[1]+q[1])/2], u = norm2([q[0]-p[0], q[1]-p[1]]), nn = [-u[1], u[0]];
      if((m[0]-cen[0])*nn[0] + (m[1]-cen[1])*nn[1] < 0) nn = [-nn[0], -nn[1]];
      var d = 13 + Math.abs(nn[0]) * String(lab).length * 4.2;
      var on = lab === "?" || merkt.indexOf("h" + i) !== -1;
      if(on) s += L(p, q, "stroke:var(--acc);stroke-width:4;stroke-linecap:round");
      s += txt(m[0] + nn[0]*d, m[1] + nn[1]*d, lab, {s:15, c: on ? "var(--acc-dark)" : "var(--ink)"});
    });
    (o.nofn || []).forEach(function(nm, i){ var p = utfra(pts[i], cen, 18); s += txt(p[0], p[1], nm, {s:16}); });
    if(o.titill) s += txt(cen[0], cen[1], o.titill, {s:20, c:"var(--acc-dark)"});
    return s;
  }
  /* Þríhyrningur út frá hornunum við grunnlínuna, fellt inn í kassa w × h */
  function thriPunktar(A, B, w, h, pad){
    var a = A * Math.PI/180, b = B * Math.PI/180, d = Math.sin(b) / Math.sin(a + b);
    var raw = [[0, 0], [1, 0], [d*Math.cos(a), d*Math.sin(a)]];
    var minx = Math.min(0, raw[2][0]), maxx = Math.max(1, raw[2][0]), maxy = raw[2][1];
    var sc = Math.min((w - 2*pad)/(maxx - minx), (h - 2*pad)/maxy);
    var ox = pad + ((w - 2*pad) - (maxx - minx)*sc)/2, oy = h - pad - ((h - 2*pad) - maxy*sc)/2;
    return raw.map(function(p){ return [ox + (p[0] - minx)*sc, oy - p[1]*sc]; });
  }

  /* ================= MYNDIR ================= */
  var M = {};

  /* Deiling með Stikuaðferð: sama uppsetning og í leiknum */
  M.deiling = function(m){
    var dec = (String(m.tala).split(",")[1] || "").length, sc = Math.pow(10, dec);
    var rem = Math.round(parseFloat(String(m.tala).replace(",", ".")) * sc);
    var n = m.skref.length, syn = (m.syna === undefined) ? n : m.syna, sum = 0;
    function f(v){ return talaStr(v / sc, dec); }
    function N(t, cls){ var neg = t && t.charAt(0) === "−"; return "<div class=\"n " + (cls || "") + "\"><span>" + (neg ? "−" : "") + "</span><span>" + (neg ? t.slice(2) : (t || "")) + "</span></div>"; }
    function D(t){ return "<div class=\"d\">" + (t || "") + "</div>"; }
    function R(sign, t, cls){ return "<div class=\"r " + (cls || "") + "\"><span>" + (sign || "") + "</span><span>" + (t || "") + "</span></div>"; }
    function hluti(i){ return i < syn ? R(n > 1 && i === n - 1 ? "+" : "", talaStr(m.skref[i], 2), "hl") : R(); }
    var h = "<div class=\"board\">" + N(thus(m.tala)) + D(":" + NB + m.deilir) + hluti(0);
    for(var i = 0; i < Math.min(syn, n); i++){
      var p = Math.round(m.deilir * m.skref[i] * sc);
      rem -= p; sum += m.skref[i];
      var last = (i === n - 1);
      h += N("− " + f(p), "u") + D() + (last ? R("=", talaStr(Math.round(sum * 100) / 100, 2), "uu ans") : R());
      var afg = last && rem > 0;
      h += N(f(rem), afg ? "hl" : "") + D(afg ? "<span class=\"hl afg\">afg.</span>" : "") + (last ? R() : hluti(i + 1));
    }
    return h + "</div>";
  };

  /* Uppsetning margföldunar: raðir hægrijafnaðar undir fyrri þættinum */
  M.uppsetning = function(m){
    var radir = [m.thattur].concat(m.linur || []).concat(m.svar ? [m.svar] : []);
    var W = Math.max.apply(null, radir.map(function(r){ return r.length; }));
    function rod(str, cls, x, nytt){
      var h = "<tr" + (cls ? " class=\"" + cls + "\"" : "") + ">";
      for(var c = 0; c < W; c++){
        var k = c - (W - str.length), ch = k >= 0 ? str.charAt(k) : "";
        h += "<td class=\"c" + (ch === "," ? " k" : "") + (nytt && ch ? " nytt" : "") + "\">" + ch + "</td>";
      }
      return h + "<td class=\"ux\">" + (x || "") + "</td></tr>";
    }
    var h = "<table class=\"upps\" aria-label=\"Uppsetning\">";
    (m.minni || []).forEach(function(mr){
      var str = ""; for(var c = 0; c < m.thattur.length; c++) str += " ";
      var arr = str.split("");
      Object.keys(mr).forEach(function(k){ arr[m.thattur.length - 1 - Number(k)] = mr[k]; });
      h += rod(arr.join("").replace(/ /g, " "), "minni");
    });
    h += rod(m.thattur, "", "· " + m.sinnum);
    (m.linur || []).forEach(function(l, i){ h += rod(l, "", "", m.nytt === i); });
    if(m.svar) h += rod(m.svar, "lina", "", m.nytt === "svar");
    return h.replace(/<td class="c"> <\/td>/g, "<td class=\"c\"></td>") + "</table>";
  };

  /* Tómt rúðunet (flatarmálslíkan) */
  M.rudunet = function(m){
    var cw = m.a.map(function(v, i){ return i === 0 ? 190 : 120; }), rh = m.b.map(function(v, i){ return i === 0 ? 92 : 64; });
    var x0 = 60, y0 = 16, s = "", W = x0 + cw.reduce(function(a, b){ return a + b; }, 0) + 16, H = y0 + rh.reduce(function(a, b){ return a + b; }, 0) + 40;
    var y = y0;
    m.b.forEach(function(bv, r){
      var x = x0;
      m.a.forEach(function(av, c){
        var on = m.merkt && m.merkt[0] === c && m.merkt[1] === r;
        s += "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + cw[c] + "\" height=\"" + rh[r] + "\" style=\"fill:" + (on ? "var(--acc-bg)" : LITIR[(r*2 + c) % 4]) + ";stroke:var(--ink);stroke-width:2\"/>";
        s += txt(x + cw[c]/2, y + rh[r]/2 - 11, talaStr(av, 2) + " · " + talaStr(bv, 2), {s:15, w:400});
        s += txt(x + cw[c]/2, y + rh[r]/2 + 12, talaStr(Math.round(av * bv * 100) / 100, 2), {s:18, c: on ? "var(--acc-dark)" : "var(--ink)"});
        if(r === m.b.length - 1) s += txt(x + cw[c]/2, y + rh[r] + 20, talaStr(av, 2), {s:17, c:"var(--muted)"});
        x += cw[c];
      });
      s += txt(x0 - 26, y + rh[r]/2, talaStr(bv, 2), {s:17, c:"var(--muted)"});
      y += rh[r];
    });
    return svg(W, H, "Rúðunet", s);
  };

  /* Hopp á talnalínu */
  M.hopp = function(m){
    var Lx = 24, Rx = 396, Y = 92, s = "", id = "hp" + Math.floor(Math.random()*1e6), bil = m.bil || 3;
    function x(v){ return Lx + v / m.max * (Rx - Lx); }
    s += "<defs><marker id=\"" + id + "\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M1 1L9 5L1 9z\" style=\"fill:var(--acc)\"/></marker></defs>";
    s += L([Lx - 8, Y], [Rx + 8, Y], "stroke:var(--ink);stroke-width:2");
    for(var v = 0; v <= m.max; v++){ var st = v % bil === 0; s += L([x(v), Y - (st ? 7 : 4)], [x(v), Y + (st ? 7 : 4)], "stroke:var(--ink);stroke-width:" + (st ? 2 : 1.2)); if(st) s += txt(x(v), Y + 24, v, {s:16, w:400, c:"var(--muted)"}); }
    for(var i = 0; i < m.fjoldi; i++){
      var a = x(i * m.skref), b = x((i + 1) * m.skref), mm = (a + b)/2;
      s += "<path d=\"M" + a.toFixed(1) + " " + (Y - 8) + " Q" + mm.toFixed(1) + " " + (Y - 58) + " " + (b - 2).toFixed(1) + " " + (Y - 9) + "\" fill=\"none\" style=\"stroke:var(--acc);stroke-width:2.5\" marker-end=\"url(#" + id + ")\"/>";
      if(i === 0) s += txt(mm, Y - 46, "+" + talaStr(m.skref, 2), {s:16, c:"var(--acc-dark)"});
    }
    var end = m.skref * m.fjoldi;
    s += dot([x(end), Y], 6, "var(--acc)") + txt(x(end), Y + 46, talaStr(end, 2), {s:20, c:"var(--acc-dark)"});
    return svg(420, 150, "Hopp á talnalínu", s);
  };

  /* Flatarmál: heil tafla skipt í 10 × 10 litla reiti */
  M.flatarmal = function(m){
    var x0 = 60, y0 = 14, S = 220, c = S/10, s = "";
    s += "<rect x=\"" + x0 + "\" y=\"" + y0 + "\" width=\"" + S + "\" height=\"" + S + "\" style=\"fill:#fff;stroke:var(--ink);stroke-width:2\"/>";
    s += "<rect x=\"" + x0 + "\" y=\"" + (y0 + S - m.b*c) + "\" width=\"" + (m.a*c) + "\" height=\"" + (m.b*c) + "\" style=\"fill:var(--acc-bg);stroke:var(--acc);stroke-width:2.5\"/>";
    for(var k = 1; k < 10; k++){ s += L([x0 + k*c, y0], [x0 + k*c, y0 + S], "stroke:#C9CEDA;stroke-width:1") + L([x0, y0 + k*c], [x0 + S, y0 + k*c], "stroke:#C9CEDA;stroke-width:1"); }
    s += txt(x0 + m.a*c/2, y0 + S + 18, "0," + m.a, {s:16, c:"var(--acc-dark)"}) + txt(x0 - 26, y0 + S - m.b*c/2, "0," + m.b, {s:16, c:"var(--acc-dark)"});
    s += txt(x0 + S/2, y0 + S + 40, "Heil tafla = 1. Hver lítill reitur er 0,01.", {s:14, w:400, c:"var(--muted)"});
    return svg(320, 290, "Flatarmál", s);
  };

  /* Jöfnur / skref; [texti] er merktur */
  M.jofnur = function(m){
    var h = "<div class=\"jofnur\">";
    m.linur.forEach(function(l, i){
      var e = fmt(l.s).replace(/\[/g, "<mark>").replace(/\]/g, "</mark>");
      var pre = i > 0 && m.orvar ? "<span class=\"t\">→ </span>" : (i > 0 && m.jafnt ? "<span class=\"t\">= </span>" : "");
      h += "<div class=\"j\"><span class=\"e\">" + pre + e + "</span>" + (l.a ? "<span class=\"a\">" + fmt(l.a) + "</span>" : "") + "</div>";
    });
    return h + "</div>";
  };

  /* Tafla */
  M.tafla = function(m){
    var h = "<table class=\"mtafla\"><tr>" + m.haus.map(function(x){ return "<th>" + fmt(x) + "</th>"; }).join("") + "</tr>";
    m.radir.forEach(function(r, i){
      h += "<tr" + (i === m.hl ? " class=\"hl\"" : "") + ">" + r.map(function(x){ return "<td" + (x === "?" ? " class=\"q\"" : "") + ">" + fmt(x) + "</td>"; }).join("") + "</tr>";
    });
    return h + "</table>";
  };

  /* Þríhyrningur út frá hornum */
  M.thri = function(m){
    var w = m.w || 360, h = m.h || 220, pts = thriPunktar(m.A, m.B, w, h, m.pad || 44), nofn = m.nofn || ["A","B","C"];
    var hornL = {}, merki = m.merki || {};
    nofn.forEach(function(nm, i){ if(merki[nm]) hornL[i] = merki[nm]; });
    var rett = m.rett ? [nofn.indexOf(m.rett)] : [];
    var merkt = (m.merkt || "").split("").map(function(c){ return "a" + nofn.indexOf(c); }).join(" ");
    return svg(w, h, "Þríhyrningur", marghyrningur(pts, {nofn:nofn, horn:hornL, rett:rett, jafnar:(m.jafnar || []).map(function(i){ return [i, 1]; }), merkt:merkt, litHorn:m.litHorn, fylla:m.fylla}));
  };

  /* Marghyrningur í skjáhnitum */
  M.form = function(m){ return svg(m.w, m.h, m.lab || "Form", marghyrningur(m.pts, m)); };

  /* Horn */
  M.horn = function(m){
    var V = [m.horn > 100 ? 120 : 40, 110], s = "", w = 240, h = 130;
    s += L(V, P(V, 150, 0)) + L(V, P(V, 120, m.horn));
    if(m.horn === 90) s += rettHorn(V, P(V, 10, 0), P(V, 10, 90), 16);
    else s += boga(V, 30, 0, m.horn, "stroke:var(--acc);stroke-width:2.5");
    if(m.merki){ var p = P(V, 54, m.horn/2); s += txt(p[0], p[1], m.merki, {s:15, c:"var(--acc-dark)"}); }
    return svg(w, h, "Horn", s + dot(V, 3.5));
  };

  /* Grannhorn */
  M.grannhorn = function(m){
    var V = [130, 110], s = "";
    s += L([14, V[1]], [246, V[1]]) + L(V, P(V, 100, m.t));
    s += boga(V, 28, 0, m.t, "stroke:var(--acc);stroke-width:2.5") + boga(V, 40, m.t, 180, "stroke:" + BOGI + ";stroke-width:2.5");
    var a = P(V, 64, m.t/2), b = P(V, 64, (m.t + 180)/2);
    s += txt(a[0], a[1], m.t + "°", {s:15, c:"var(--acc-dark)", halo:true}) + txt(b[0], b[1], (180 - m.t) + "°", {s:15, halo:true});
    return svg(260, 130, "Grannhorn", s + dot(V, 3.5));
  };

  /* Topphorn */
  M.topphorn = function(m){
    var C = [130, 90], s = "", t = m.t;
    s += L(P(C, 120, 0), P(C, 120, 180)) + L(P(C, 100, t), P(C, 100, t + 180));
    s += boga(C, 26, 0, t, "stroke:var(--acc);stroke-width:2.5") + boga(C, 26, 180, 180 + t, "stroke:var(--acc);stroke-width:2.5");
    s += boga(C, 34, t, 180, "stroke:" + BOGI + ";stroke-width:2.5") + boga(C, 34, 180 + t, 360, "stroke:" + BOGI + ";stroke-width:2.5");
    var lab = m.merki || ["a","b","c","d"], sv = [[0, t], [t, 180], [180, 180 + t], [180 + t, 360]];
    sv.forEach(function(v, i){ var p = P(C, 58, (v[0] + v[1])/2); s += txt(p[0], p[1], lab[i], {s:15, c: i % 2 ? "var(--ink)" : "var(--acc-dark)", halo:true}); });
    return svg(260, 180, "Topphorn", s);
  };

  /* Hornrétt og samsíða */
  M.hornrett = function(){
    var C = [130, 90], s = L([20, 90], [240, 90]) + L([130, 10], [130, 170]);
    return svg(260, 180, "Hornréttar línur", s + rettHorn(C, [160, 90], [130, 60], 16));
  };
  M.samsida = function(){
    var s = L([20, 60], [240, 40]) + L([20, 130], [240, 110]);
    s += strikMerki([20, 60], [240, 40], "samsida", 1) + strikMerki([20, 130], [240, 110], "samsida", 1);
    return svg(260, 170, "Samsíða línur", s);
  };

  /* Réttsælis og rangsælis */
  M.att = function(){
    var s = "", id = "at" + Math.floor(Math.random()*1e6);
    s += "<defs><marker id=\"" + id + "\" viewBox=\"0 0 10 10\" refX=\"7\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M1 1L9 5L1 9z\" style=\"fill:var(--acc)\"/></marker></defs>";
    [[70, "Réttsælis", 1], [200, "Rangsælis", 0]].forEach(function(a){
      var C = [a[0], 70], st = P(C, 42, 120), en = P(C, 42, a[2] ? 30 : 210);
      s += "<circle cx=\"" + C[0] + "\" cy=\"" + C[1] + "\" r=\"42\" style=\"fill:#fff;stroke:#C9CEDA;stroke-width:2\"/>";
      s += "<path d=\"M" + st[0].toFixed(1) + " " + st[1].toFixed(1) + " A42 42 0 0 " + a[2] + " " + en[0].toFixed(1) + " " + en[1].toFixed(1) + "\" fill=\"none\" style=\"stroke:var(--acc);stroke-width:3.5\" marker-end=\"url(#" + id + ")\"/>";
      s += txt(C[0], 140, a[1], {s:15});
    });
    return svg(270, 156, "Réttsælis og rangsælis", s);
  };

  /* Hringur og hlutar hans */
  M.hringur = function(m){
    var C = [130, 100], R = 76, s = "", k = m.merkt;
    s += "<circle cx=\"" + C[0] + "\" cy=\"" + C[1] + "\" r=\"" + R + "\" style=\"fill:#fff;stroke:" + (k === "ferill" ? "var(--acc)" : "var(--ink)") + ";stroke-width:" + (k === "ferill" ? 4 : 2.5) + "\"/>";
    if(k === "geiri") s += geiri(C, R, 20, 85, "fill:var(--acc-bg);stroke:var(--acc);stroke-width:3");
    if(k === "bogi") s += boga(C, R, 20, 85, "stroke:var(--acc);stroke-width:5;stroke-linecap:round");
    if(k === "thvermal") s += L(P(C, R, 180), P(C, R, 0), ACC) + txt(C[0], C[1] + 16, "þvermál", {s:14, c:"var(--acc-dark)"});
    if(k === "geisli"){ s += L(C, P(C, R, 50), ACC); var g = P(C, R/2, 50); s += txt(g[0] + 26, g[1] + 6, "geisli", {s:14, c:"var(--acc-dark)"}); }
    if(k === "midja") s += txt(C[0], C[1] + 18, "miðja", {s:14, c:"var(--acc-dark)"});
    s += dot(C, k === "midja" ? 6 : 4, k === "midja" ? "var(--acc)" : "var(--ink)");
    return svg(260, 200, "Hringur", s);
  };

  /* Geirar */
  M.geirar = function(m){
    var C = [100, 100], R = 80, s = "", n = m.n;
    for(var j = 0; j < n; j++) s += geiri(C, R, 90 - (j+1)*360/n, 90 - j*360/n, "fill:" + (j === 0 ? "var(--acc-bg)" : "#fff") + ";stroke:var(--ink);stroke-width:2");
    var g = P(C, R*0.6, 90 - 180/n); s += txt(g[0], g[1], m.gildi || "", {s:16, c:"var(--acc-dark)"});
    return svg(200, 200, "Hringur skiptur í geira", s);
  };

  /* Miðþverill */
  M.midthverill = function(){
    var A = [40, 110], B = [220, 110], s = L(A, B) + L([130, 20], [130, 190], "stroke:var(--acc);stroke-width:3");
    s += rettHorn([130, 110], B, [130, 20], 14) + strikMerki(A, [130, 110], "jafn", 1) + strikMerki([130, 110], B, "jafn", 1);
    s += dot(A) + dot(B) + txt(A[0] - 14, A[1], "A", {s:16}) + txt(B[0] + 14, B[1], "B", {s:16});
    return svg(260, 210, "Miðþverill", s);
  };

  /* Skífurit, súlurit og talnalína */
  M.skifurit = function(m){
    var C = [100, 100], R = 82, s = "", a = 90;
    m.hlutar.forEach(function(h, i){ s += geiri(C, R, a - h, a, "fill:" + LITIR[i % 5] + ";stroke:var(--ink);stroke-width:2"); a -= h; });
    return svg(200, 200, "Skífurit", s);
  };
  M.sulurit = function(m){
    var s = "", x0 = 40, y0 = 150, mx = m.max || 5, h = 130 / mx;
    for(var k = 0; k <= mx; k++){ s += L([x0, y0 - k*h], [230, y0 - k*h], "stroke:#E1E4EA;stroke-width:1"); s += txt(x0 - 12, y0 - k*h, k, {s:12, w:400, c:"var(--muted)"}); }
    m.gildi.forEach(function(v, i){ s += "<rect x=\"" + (x0 + 18 + i*48) + "\" y=\"" + (y0 - v*h) + "\" width=\"30\" height=\"" + (v*h) + "\" style=\"fill:" + LITIR[i % 5] + ";stroke:var(--ink);stroke-width:1.5\"/>"; });
    s += L([x0, y0], [230, y0], "stroke:var(--ink);stroke-width:2") + L([x0, y0], [x0, 14], "stroke:var(--ink);stroke-width:2");
    if(m.lina) s += L([x0, y0 - m.lina*h], [230, y0 - m.lina*h], "stroke:var(--acc);stroke-width:2.5;stroke-dasharray:7 5") + txt(232, y0 - m.lina*h - 12, String(m.lina).replace(".", ","), {a:"end", s:14, c:"var(--acc-dark)"});
    (m.nofn || []).forEach(function(nm, i){ s += txt(x0 + 33 + i*48, y0 + 14, nm, {s:12, w:400, c:"var(--muted)"}); });
    return svg(250, m.nofn ? 172 : 160, "Súlurit", s);
  };
  M.talnalina = function(m){
    var Lx = 24, Rx = (m.w || 320) - 24, Y = m.stokk ? 86 : 50, s = "", a = m.fra, b = m.til, bil = m.bil || 1, id = "tl" + Math.floor(Math.random()*1e6);
    function x(v){ return Lx + (v - a) / (b - a) * (Rx - Lx); }
    function lab(v){ return v < 0 ? "−" + thus(-v) : thus(v); }
    s += "<defs><marker id=\"" + id + "\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M1 1L9 5L1 9z\" style=\"fill:var(--acc)\"/></marker></defs>";
    s += L([Lx - 6, Y], [Rx + 6, Y], "stroke:var(--ink);stroke-width:2");
    for(var v = a; v <= b; v += bil){ s += L([x(v), Y - 6], [x(v), Y + 6], "stroke:var(--ink);stroke-width:1.5"); s += txt(x(v), Y + 22, lab(v), {s:13, w: v === 0 ? 700 : 400, c: v < 0 ? "var(--acc-dark)" : "var(--muted)"}); }
    (m.stokk || []).forEach(function(k){
      var p = x(k.fra), q = x(k.til), mm = (p + q)/2, hh = Math.min(60, Math.abs(q - p)/2 + 10);
      s += "<path d=\"M" + p.toFixed(1) + " " + (Y - 8) + " Q" + mm.toFixed(1) + " " + (Y - 8 - hh*1.4).toFixed(1) + " " + q.toFixed(1) + " " + (Y - 9) + "\" fill=\"none\" style=\"stroke:var(--acc);stroke-width:2.5\" marker-end=\"url(#" + id + ")\"/>";
      if(k.t) s += txt(mm, Y - 8 - hh*0.75 - 8, k.t, {s:15, c:"var(--acc-dark)", halo:true});
    });
    (m.merki || []).forEach(function(v){ s += dot([x(v), Y], 6, "var(--acc)"); });
    if(m.titill) s += txt((Lx + Rx)/2, Y + 50, MYNDIR_FMT(m.titill), {s:20});
    return svg(m.w || 320, Y + (m.titill ? 70 : 40), "Talnalína", s);
  };

  /* Sætisgildi: hver tölustafur með heiti sætisins */
  M.saeti = function(m){
    var heil = ["einingar","tugir","hundruð","þúsundir","tug-<br>þúsundir","hundruð<br>þúsunda","milljónir"], brot = ["tíundu<br>hlutar","hundraðs-<br>hlutar","þúsund-<br>ustu<br>hlutar"];
    var p = String(m.tala).split(","), h = "<table class=\"saeti\"><tr>", lab = "<tr>";
    var cells = [];
    p[0].split("").forEach(function(d, i){ cells.push({d:d, l:heil[p[0].length - 1 - i]}); });
    if(p[1]){ cells.push({d:",", l:"", k:true}); p[1].split("").forEach(function(d, i){ cells.push({d:d, l:brot[i]}); }); }
    cells.forEach(function(c, i){
      var on = (m.merkt || []).indexOf(i) !== -1;
      h += "<td class=\"" + (c.k ? "k" : "") + (on ? " on" : "") + "\">" + c.d + "</td>";
      lab += "<th class=\"" + (c.k ? "k" : "") + (on ? " on" : "") + "\">" + c.l + "</th>";
    });
    return h + "</tr>" + lab + "</tr></table>";
  };

  /* Plómur í poka */
  M.plomur = function(m){
    var s = "", n = m.gular + m.raudar, cols = Math.min(6, n), r = 15;
    for(var i = 0; i < n; i++){
      var cx = 30 + (i % cols) * 40, cy = 30 + Math.floor(i / cols) * 40, gul = i < m.gular;
      s += "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"" + r + "\" style=\"fill:" + (gul ? "#FACC15" : "#DC2626") + ";stroke:" + (gul && m.merkja ? "var(--ink)" : "rgba(0,0,0,.25)") + ";stroke-width:" + (gul && m.merkja ? 3 : 1.5) + "\"/>";
    }
    return svg(cols * 40 + 20, Math.ceil(n / cols) * 40 + 20, "Plómur", s);
  };

  /* Hornasumma: horn þríhyrnings lögð saman á beina línu */
  M.hornasumma = function(m){
    var s = "", pts = thriPunktar(m.A, m.B, 250, 210, 30), lit = ["#F6C3A3","#BFE3F5","#FCEFB4"], hornin = [m.A, m.B, 180 - m.A - m.B];
    for(var i = 0; i < 3; i++) s += hornBogi(pts[i], pts[(i+2)%3], pts[(i+1)%3], 28, null, lit[i]);
    s += poly(pts, "fill:none;stroke:var(--ink);stroke-width:2.5;stroke-linejoin:round");
    ["A","B","C"].forEach(function(nm, i){ var p = utfra(pts[i], mid(pts), 16); s += txt(p[0], p[1], nm, {s:15}); });
    var V = [430, 150], a = 0;
    s += L([290, V[1]], [570, V[1]]);
    [0, 2, 1].forEach(function(i){ s += geiri(V, 70, a, a + hornin[i], "fill:" + lit[i] + ";stroke:var(--ink);stroke-width:1.5"); var p = P(V, 46, a + hornin[i]/2); s += txt(p[0], p[1], (m.merki ? m.merki[i] : ["A","B","C"][i]), {s:15}); a += hornin[i]; });
    s += txt(V[0], V[1] + 22, "beint strik = 180°", {s:14, w:400, c:"var(--muted)"});
    s += txt(270, 100, "→", {s:28, c:"var(--acc)"});
    return svg(580, 200, "Hornasumma þríhyrnings", s);
  };

  /* Tvær einslaga myndir (rétthyrningar) */
  M.einslaga = function(m){
    var s = "", sc = m.sc || 10, gap = 80, x = 40, base = 34 + Math.max(m.a[1], m.b[1])*sc;
    [[1, m.a], [2, m.b]].forEach(function(g, i){
      var w = g[1][0]*sc, h = g[1][1]*sc;
      var pts = [[x, base], [x + w, base], [x + w, base - h], [x, base - h]];
      s += marghyrningur(pts, {titill:String(i + 1), hlidar:{0:g[1][2], 1:g[1][3]}, merkt:g[1][4] || "", fylla: i ? "#FFF4ED" : "#EEF1F7", nofn: i ? ["E","F","G","H"] : ["A","B","C","D"]});
      x += w + gap;
    });
    return svg(Math.round(x - gap + 90), Math.round(base + 40), "Einslaga myndir", s);
  };

  M.teikna = function(m){
    if(!m) return "";
    var list = Array.isArray(m) ? m : [m];
    return list.map(function(x){ return M[x.teg] ? "<div class=\"mynd\">" + M[x.teg](x) + "</div>" : ""; }).join("");
  };
  M.fmt = fmt; M.thus = thus;
  window.MYNDIR = M;
})();
