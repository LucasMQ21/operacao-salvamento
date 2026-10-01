/**
 * Operação Salvamento — Quartel animado do menu principal (#tela-mapa)
 *
 * Toca o vídeo do quartel (helicóptero e luzes) em loop enquanto a tela do
 * menu está visível; pausa fora dela (missões, abas escondidas) para poupar
 * bateria e CPU. Se o sistema pedir "reduzir movimento", mantém só o quadro
 * estático (poster) — mesma regra do cenário vivo.
 */
(function () {
  'use strict';

  var tela = document.getElementById('tela-mapa');
  var video = document.querySelector('#tela-mapa .quartel-video');
  if (!tela || !video) return;

  video.muted = true;            // necessário para o navegador permitir tocar sozinho
  video.defaultMuted = true;
  video.loop = true;
  video.setAttribute('playsinline', '');

  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var deveTocar = false;

  function telaVisivel() {
    var cs = getComputedStyle(tela);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  }

  function tocar() {
    var p = video.play();
    if (p && p.catch) p.catch(function () { /* autoplay bloqueado: segue no poster; tenta de novo no 1º toque */ });
  }

  function sincronizar() {
    deveTocar = telaVisivel() && !document.hidden && !(mq && mq.matches);
    if (deveTocar) { if (video.paused) tocar(); }
    else if (!video.paused) video.pause();
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(sincronizar, { threshold: 0 }).observe(tela);
  } else {
    setInterval(sincronizar, 500);
  }
  document.addEventListener('visibilitychange', sincronizar);
  if (mq && mq.addEventListener) mq.addEventListener('change', sincronizar);

  // Alguns celulares (modo de economia) só liberam vídeo após um toque do usuário.
  function retomarNoToque() { if (deveTocar && video.paused) tocar(); }
  document.addEventListener('pointerdown', retomarNoToque, { passive: true });
  video.addEventListener('playing', function () { document.removeEventListener('pointerdown', retomarNoToque); });

  sincronizar();
})();
