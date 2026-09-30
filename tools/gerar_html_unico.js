/**
 * Operacao Salvamento - Gerador oficial de HTML unico
 * Fase 3.3 - Base estavel
 * Objetivo: preservar a inicializacao original do jogo.
 * Simuladores permanecem fora desta etapa.
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

function lerArquivo(caminho) {
  return fs.readFileSync(caminho, 'utf8');
}

function mimeType(ext) {
  const tipos = {
    '.png':'image/png',
    '.jpg':'image/jpeg',
    '.jpeg':'image/jpeg',
    '.webp':'image/webp',
    '.gif':'image/gif',
    '.svg':'image/svg+xml',
    '.mp3':'audio/mpeg',
    '.wav':'audio/wav',
    '.ogg':'audio/ogg',
    '.mp4':'video/mp4',
    '.webm':'video/webm'
  };
  return tipos[ext.toLowerCase()] || 'application/octet-stream';
}

function converterAsset(caminhoRelativo) {
  const caminho = path.join(raiz, caminhoRelativo.replace(/^\.\//,''));
  if (!fs.existsSync(caminho)) return null;
  return `data:${mimeType(path.extname(caminho))};base64,${fs.readFileSync(caminho).toString('base64')}`;
}

function incorporarAssets(html) {
  return html.replace(/(["'(])((?:\.\/)?assets\/[^"')\s]+)/g, (m, inicio, arquivo) => {
    const base64 = converterAsset(arquivo);
    return base64 ? `${inicio}${base64}` : m;
  });
}

function incorporarCss(html) {
  const css = path.join(raiz, 'css', 'game.css');
  if (!fs.existsSync(css)) return html;
  return html.replace(/<link[^>]*href=["']\.\/css\/game\.css["'][^>]*>/i, `<style>\n${lerArquivo(css)}\n</style>`);
}

function gerarBuild() {
  let html = lerArquivo(path.join(raiz, 'index.html'));

  html = incorporarCss(html);
  html = incorporarAssets(html);

  const pasta = path.join(raiz, 'builds');
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

  fs.writeFileSync(
    path.join(pasta, 'Operacao_Salvamento_BUILD_FASE3_3.html'),
    html,
    'utf8'
  );

  console.log('Build criada com base estavel:', path.join(pasta, 'Operacao_Salvamento_BUILD_FASE3_3.html'));
}

gerarBuild();
