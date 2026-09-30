/**
 * Operação Salvamento - Gerador oficial de HTML único (Fase 2)
 *
 * Evolução da Fase 1:
 * - incorpora todos os scripts JavaScript encontrados no HTML;
 * - incorpora CSS principal;
 * - converte assets locais de imagens, áudio e vídeo para base64 quando referenciados;
 * - mantém estrutura para evolução futura do pipeline.
 *
 * Uso:
 * node tools/gerar_html_unico.js
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

function lerArquivo(arquivo) {
  if (!fs.existsSync(arquivo)) {
    throw new Error(`Arquivo não encontrado: ${arquivo}`);
  }
  return fs.readFileSync(arquivo, 'utf8');
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function mimeType(ext) {
  const tipos = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
  };
  return tipos[ext.toLowerCase()] || 'application/octet-stream';
}

function arquivoParaBase64(caminho) {
  const absoluto = path.join(raiz, caminho.replace(/^\.\//, ''));

  if (!fs.existsSync(absoluto)) {
    return null;
  }

  const ext = path.extname(absoluto);
  const mime = mimeType(ext);
  const dados = fs.readFileSync(absoluto).toString('base64');

  return `data:${mime};base64,${dados}`;
}

function incorporarAssets(html) {
  return html.replace(/(["'(])((?:\.\/)?assets\/[^"')\s]+)/g, (match, inicio, arquivo) => {
    const convertido = arquivoParaBase64(arquivo);
    return convertido ? `${inicio}${convertido}` : match;
  });
}

function incorporarCss(html) {
  const cssPath = path.join(raiz, 'css', 'game.css');
  const css = lerArquivo(cssPath);

  return html.replace(
    /<link[^>]*href=["']\.\/css\/game\.css["'][^>]*>/i,
    `<style>\n${css}\n</style>`
  );
}

function incorporarScripts(html) {
  return html.replace(
    /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi,
    (match, src) => {
      const arquivo = path.join(raiz, src.replace(/^\.\//, ''));
      if (!fs.existsSync(arquivo)) return match;
      return `<script>\n${fs.readFileSync(arquivo, 'utf8')}\n</script>`;
    }
  );
}

function gerarBuild() {
  let html = lerArquivo(path.join(raiz, 'index.html'));

  html = incorporarCss(html);
  html = incorporarScripts(html);
  html = incorporarAssets(html);

  const pastaBuild = path.join(raiz, 'builds');

  if (!fs.existsSync(pastaBuild)) {
    fs.mkdirSync(pastaBuild);
  }

  const saida = path.join(
    pastaBuild,
    'Operacao_Salvamento_BUILD_FASE2.html'
  );

  fs.writeFileSync(saida, html, 'utf8');

  console.log('Build criada com sucesso:');
  console.log(saida);
}

gerarBuild();
