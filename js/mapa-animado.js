/**
 * Operação Salvamento — Destaque dos caminhos do menu principal (#tela-mapa)
 *
 * Ao passar o mouse (ou tocar) em um ícone de ocorrência, o caminho tracejado
 * quartel→ocorrência daquele ícone ganha brilho; ao selecionar a missão (a
 * viatura sai), o caminho brilha ainda mais e os demais recuam. O movimento do
 * tracejado em si é feito só por CSS (css/game.css, seção "Mapa animado").
 *
 * O app.js chama window.__mapaAnimado.selecionar(id) ao iniciar a seleção e
 * limparSelecao() ao cancelar/voltar ao mapa.
 */
(function () {
  'use strict';

  var tela = document.getElementById('tela-mapa');
  var ruas = document.getElementById('ruas-svg');
  if (!tela || !ruas) return;

  var destaqueId = null, selecaoId = null;

  function linhasDe(id) {
    return tela.querySelectorAll('.ruas-svg [data-missao="' + id + '"]');
  }
  function aplicar(classe, id, ligado) {
    if (id === null || id === undefined) return;
    var ls = linhasDe(id);
    for (var i = 0; i < ls.length; i++) ls[i].classList[ligado ? 'add' : 'remove'](classe);
  }
  function marcarSvgs(ligado) {
    var svgs = tela.querySelectorAll('.ruas-svg');
    for (var i = 0; i < svgs.length; i++) svgs[i].classList[ligado ? 'add' : 'remove']('tem-selecao');
  }

  function definirDestaque(id) {
    if (id === destaqueId) return;
    aplicar('destaque', destaqueId, false);
    destaqueId = id;
    aplicar('destaque', destaqueId, true);
  }
  function selecionar(id) {
    limparSelecao();
    selecaoId = id;
    aplicar('selecionada', id, true);
    marcarSvgs(true);
  }
  function limparSelecao() {
    if (selecaoId === null) return;
    aplicar('selecionada', selecaoId, false);
    selecaoId = null;
    marcarSvgs(false);
  }

  function ocorrenciaDe(alvo) {
    return alvo && alvo.closest ? alvo.closest('.ocorrencia') : null;
  }
  tela.addEventListener('pointerover', function (e) {
    var oc = ocorrenciaDe(e.target);
    if (!oc || oc.classList.contains('pendente')) return;   // "Em breve": sem destaque
    definirDestaque(oc.dataset.missao);
  });
  tela.addEventListener('pointerout', function (e) {
    var oc = ocorrenciaDe(e.target);
    if (!oc) return;
    if (e.relatedTarget && oc.contains(e.relatedTarget)) return;
    definirDestaque(null);
  });

  // Se o mapa for redesenhado (ex.: missão concluída vira verde), reaplica o estado.
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () {
      aplicar('destaque', destaqueId, true);
      if (selecaoId !== null) { aplicar('selecionada', selecaoId, true); marcarSvgs(true); }
    });
    mo.observe(ruas, { childList: true });
    var fluxo = document.getElementById('ruas-fluxo-svg');
    if (fluxo) mo.observe(fluxo, { childList: true });
  }

  // Saiu da tela do menu: apaga qualquer destaque pendurado.
  function aoMudarVisibilidade() {
    var cs = getComputedStyle(tela);
    if (cs.display === 'none' || cs.visibility === 'hidden') { definirDestaque(null); limparSelecao(); }
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(aoMudarVisibilidade, { threshold: 0 }).observe(tela);

  window.__mapaAnimado = { selecionar: selecionar, limparSelecao: limparSelecao };
})();
