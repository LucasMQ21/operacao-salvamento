/**
 * Operação Salvamento — Cenário vivo do menu principal (#tela-mapa)
 *
 * Camada <canvas> transparente sobre a imagem de fundo do menu, com efeitos
 * ambientais em loop: luzes do caminhão, lanterna na mata, luzes do túnel,
 * monitores da central, reflexos no mar e fumaça à deriva.
 *
 * - A imagem de fundo é desenhada pelo CSS (cover + center). Este script só
 *   desenha os efeitos por cima, usando a MESMA regra de "cover", então os
 *   efeitos ficam alinhados em qualquer tamanho de tela.
 * - Só anima enquanto #tela-mapa está visível; fora dela o loop para.
 * - Não interfere nos cliques (pointer-events: none) e fica atrás do HUD
 *   e do mapa de ocorrências.
 *
 * Os números dos efeitos vêm do arquivo de teste "cenario_vivo", escritos no
 * sistema de coordenadas do print (1887x922). REF converte esse sistema para a
 * imagem original do fundo (1672x941).
 */
(function () {
  'use strict';

  var TELA_ID = 'tela-mapa';
  var CANVAS_ID = 'cenario-vivo';
  var FUMACA_SRC = './assets/embedded/cenario_vivo_fumaca.webp';

  // Imagem de fundo do menu (assets/embedded/ff68c9a1c34820867485.webp).
  var IMG_W = 1672, IMG_H = 941;
  // Print do teste -> imagem original:  X_img = (x_print + OX) / ESC
  var REF = { ESC: 1.148, OX: 27, OY: 81 };

  var INTENSIDADE = 1.25;      // valor padrão do teste (slider em 125)
  var QUADROS_POR_SEG = 30;
  var LARGURA_MAX = 1280;      // resolução interna máxima do canvas (leve e suave)

  var tela = document.getElementById(TELA_ID);
  var canvas = document.getElementById(CANVAS_ID);
  if (!tela || !canvas || !canvas.getContext) return;

  // Acessibilidade: quem pediu menos movimento no sistema não recebe a animação.
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mq && mq.matches) return;

  var ctx = canvas.getContext('2d');
  var fumaca = new Image();
  fumaca.decoding = 'async';
  fumaca.src = FUMACA_SRC;

  var t = 0, ultimo = 0, ultimoQuadro = 0, rafId = 0;
  var cw = 0, ch = 0;

  /* ------------------------------------------------------------ geometria */

  function ajustarTamanho() {
    var vw = tela.clientWidth || window.innerWidth;
    var vh = tela.clientHeight || window.innerHeight;
    if (!vw || !vh) return false;
    var q = Math.min(1, LARGURA_MAX / vw);
    var w = Math.max(2, Math.round(vw * q));
    var h = Math.max(2, Math.round(vh * q));
    if (w !== cw || h !== ch) { cw = canvas.width = w; ch = canvas.height = h; }
    return true;
  }

  // Transformação: coordenadas do print -> pixels do canvas (cover + center).
  function aplicarTransformacao() {
    var s = Math.max(cw / IMG_W, ch / IMG_H);
    var tx = (cw - IMG_W * s) / 2;
    var ty = (ch - IMG_H * s) / 2;
    var k = s / REF.ESC;
    ctx.setTransform(k, 0, 0, k, tx + s * REF.OX / REF.ESC, ty + s * REF.OY / REF.ESC);
  }

  /* ---------------------------------------------------------- primitivas */

  function brilho(x, y, rx, ry, cor, alfa) {
    ctx.save(); ctx.translate(x, y); ctx.scale(rx, ry);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, 'rgba(' + cor + ',' + (alfa * INTENSIDADE) + ')');
    g.addColorStop(0.21, 'rgba(' + cor + ',' + (alfa * 0.42 * INTENSIDADE) + ')');
    g.addColorStop(1, 'rgba(' + cor + ',0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function brilhoRecortado(x, y, rx, ry, cor, alfa, x0, y0, x1, y1) {
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip();
    brilho(x, y, rx, ry, cor, alfa);
    ctx.restore();
  }

  function feixe(ox, oy, tx, ty, larg, cor, alfa, clip) {
    ctx.save(); ctx.beginPath(); ctx.rect(clip[0], clip[1], clip[2], clip[3]); ctx.clip();
    var dx = tx - ox, dy = ty - oy, len = Math.hypot(dx, dy);
    var px = -dy / len * larg, py = dx / len * larg;
    var g = ctx.createLinearGradient(ox, oy, tx, ty);
    g.addColorStop(0, 'rgba(' + cor + ',' + (alfa * INTENSIDADE) + ')');
    g.addColorStop(0.5, 'rgba(' + cor + ',' + (alfa * 0.38 * INTENSIDADE) + ')');
    g.addColorStop(1, 'rgba(' + cor + ',0)');
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(ox, oy); ctx.lineTo(tx + px, ty + py); ctx.lineTo(tx - px, ty - py);
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  function pulso(v, c, w) { return Math.max(0, 1 - Math.abs(v - c) / w); }

  /* ------------------------------------------------------------- efeitos */

  // Reflexos largos e suaves deslizando sobre o mar (canto superior direito).
  // O teste usava ctx.filter='blur' (não funciona no Safari e pesa); aqui o
  // desfoque é simulado empilhando traços largos e de baixa opacidade.
  function mar(time) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(1450, 128); ctx.lineTo(1584, 154); ctx.lineTo(1700, 169); ctx.lineTo(1790, 132);
    ctx.lineTo(1887, 130); ctx.lineTo(1887, 237); ctx.lineTo(1765, 201); ctx.lineTo(1630, 190);
    ctx.lineTo(1480, 210); ctx.closePath(); ctx.clip();
    ctx.lineCap = 'round';
    for (var k = 0; k < 7; k++) {
      var y = 158 + k * 11 + Math.sin(time * 0.8 + k) * 4;
      var u = ((time * 15 + k * 93) % 390) / 390;          // 0..1 e recomeça
      var x = 1450 + u * 390;
      var env = Math.sin(Math.PI * u) * 1.3;               // entra e sai suave: sem "salto" no loop
      var base = Math.max(0, (0.13 + 0.055 * Math.sin(time * 1.3 + k)) * INTENSIDADE * env);
      var camadas = [[9, 0.28], [6, 0.40], [3.6 + (k % 2), 0.55]];
      for (var c = 0; c < camadas.length; c++) {
        ctx.beginPath();
        ctx.moveTo(x - 100, y);
        ctx.bezierCurveTo(x - 20, y - 7, x + 52, y + 5, x + 150, y - 1);
        ctx.strokeStyle = 'rgba(177,218,230,' + (base * camadas[c][1]) + ')';
        ctx.lineWidth = camadas[c][0];
        ctx.stroke();
      }
    }
    ctx.restore();

    var manchas = [[1525, 170, 100, 12, 0], [1670, 183, 92, 10, 1.8], [1810, 171, 90, 10, 3.4]];
    for (var i = 0; i < manchas.length; i++) {
      var m = manchas[i];
      brilhoRecortado(m[0] + Math.sin(time * 0.8 + m[4]) * 15, m[1], m[2], m[3], '143,205,222',
        0.17 + 0.10 * Math.sin(time * 1.1 + m[4]), 1430, 125, 1887, 240);
    }
  }

  // Véus de fumaça atravessando a cena. Período fechado: cada véu entra
  // transparente, cruza e sai transparente, então o loop nunca "pula".
  var FUMACA_N = 4, FUMACA_ESP = 730, FUMACA_LARG = 1030, FUMACA_ALT = 350;
  var FUMACA_CURSO = FUMACA_N * FUMACA_ESP;                // 2920
  function fumacaAlfa(u) {                                 // u = 0..1 ao longo do percurso
    var borda = 0.16;
    if (u < borda) return u / borda;
    if (u > 1 - borda) return (1 - u) / borda;
    return 1;
  }
  function fumacaDeriva(time) {
    if (!fumaca.complete || !fumaca.naturalWidth) return;
    ctx.save();
    for (var i = 0; i < FUMACA_N; i++) {
      var d = (time * 19 + i * FUMACA_ESP) % FUMACA_CURSO;
      var x = -FUMACA_LARG + d;
      var suave = fumacaAlfa(d / FUMACA_CURSO);
      ctx.globalAlpha = Math.max(0, (0.125 + 0.018 * Math.sin(time * 0.41 + i)) * INTENSIDADE * suave);
      ctx.drawImage(fumaca, x, 185 + Math.sin(time * 0.36 + i) * 22, FUMACA_LARG, FUMACA_ALT);
    }
    ctx.restore();
  }

  function quadro(time) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    aplicarTransformacao();

    mar(time);
    fumacaDeriva(time);

    // Luzes do caminhão: duplo clarão coordenado a cada ~6,8 s.
    var cicloCaminhao = (time + 1.2) % 6.8;
    var clarao = Math.max(pulso(cicloCaminhao, 0.16, 0.13), pulso(cicloCaminhao, 0.47, 0.13));
    var luzes = [[180, 620], [274, 617], [355, 630]];
    for (var i = 0; i < luzes.length; i++) {
      var lx = luzes[i][0], ly = luzes[i][1];
      brilhoRecortado(lx, ly, 40, 29, '255,31,18', 0.08 + 0.86 * clarao, 0, 575, 510, 820);
      brilhoRecortado(lx, ly, 15, 12, '255,105,62', 0.12 + 0.80 * clarao, 0, 575, 510, 820);
    }
    brilhoRecortado(274, 841, 200, 51, '207,24,18', 0.02 + 0.18 * clarao, 0, 755, 540, 922);

    // Lanterna do bombeiro na mata: acende e apaga suavemente (ciclo de 12,4 s).
    var cicloMata = (time + 4.1) % 12.4;
    var envMata = Math.max(0, Math.min(1, (cicloMata - 1.0) / 0.7, (4.4 - cicloMata) / 0.9));
    var mata = 0.19 + 0.37 * envMata;
    var balanco = Math.sin(time * 0.48) * 9;
    feixe(1727, 409, 1790 + balanco, 488, 33, '216,240,232', mata, [1480, 235, 407, 330]);
    brilhoRecortado(1727, 409, 21, 17, '246,255,242', 0.15 + 0.47 * envMata, 1500, 250, 1887, 565);
    brilhoRecortado(1785 + balanco, 475, 52, 47, '197,230,217', 0.06 + 0.18 * envMata, 1500, 250, 1887, 565);

    // Três luzes do túnel; uma pisca por vez (ciclo de 18 s).
    var cicloTunel = (time + 2.6) % 18;
    var tunel = [[1692, 722, 1.5, '231,240,239'], [1771, 713, 7.5, '255,203,137'], [1860, 703, 13.5, '255,177,106']];
    for (var j = 0; j < tunel.length; j++) {
      var p = tunel[j], px = p[0], py = p[1], cor = p[3];
      var ev = Math.max(pulso(cicloTunel, p[2], 0.55), 0.7 * pulso(cicloTunel, p[2] + 0.83, 0.18));
      brilhoRecortado(px, py, 40, 38, cor, 0.035 + 0.67 * ev, 1510, 565, 1887, 922);
      brilhoRecortado(px, py, 14, 14, cor, 0.04 + 0.78 * ev, 1510, 565, 1887, 922);
      if (px !== 1692) brilhoRecortado(px - 12, py + 72, 44, 17, cor, 0.02 + 0.13 * ev, 1510, 690, 1887, 922);
    }

    // Varredura lenta nos monitores da central.
    var mon = 0.115 + 0.07 * Math.sin(time * 0.44) + 0.03 * Math.sin(time * 0.87);
    brilhoRecortado(118, 168, 96, 48, '54,156,203', mon, 0, 88, 490, 270);
    brilhoRecortado(323, 181, 89, 47, '58,154,205', mon * 0.9, 0, 88, 490, 270);
    brilhoRecortado(246, 92, 95, 30, '45,103,154', mon * 0.7, 0, 75, 490, 260);
  }

  /* ---------------------------------------------------------------- loop */

  function animar(agora) {
    rafId = requestAnimationFrame(animar);
    if (!ultimo) ultimo = agora;
    var dt = Math.min(0.06, (agora - ultimo) / 1000);
    ultimo = agora;
    t += dt;
    if (agora - ultimoQuadro >= 1000 / QUADROS_POR_SEG - 2) {
      ultimoQuadro = agora;
      quadro(t);
    }
  }

  function iniciar() {
    if (rafId || document.hidden) return;
    if (!ajustarTamanho()) return;
    ultimo = 0;
    rafId = requestAnimationFrame(animar);
  }

  function parar() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    if (cw) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cw, ch); }
  }

  function telaVisivel() { return tela.offsetParent !== null || getComputedStyle(tela).display !== 'none'; }

  function sincronizar() { if (telaVisivel() && !document.hidden) iniciar(); else parar(); }

  // IntersectionObserver dispara quando a tela ganha/perde display:none.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(sincronizar, { threshold: 0 }).observe(tela);
  } else {
    setInterval(sincronizar, 500);
  }
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { if (rafId) ajustarTamanho(); }).observe(tela);
  } else {
    window.addEventListener('resize', function () { if (rafId) ajustarTamanho(); });
  }
  document.addEventListener('visibilitychange', sincronizar);
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function (e) { if (e.matches) parar(); else sincronizar(); });
  }
  sincronizar();

  // Gancho opcional para testes: window.__cenarioVivo.quadro(segundos)
  window.__cenarioVivo = { quadro: function (s) { ajustarTamanho(); quadro(s); } };
})();
