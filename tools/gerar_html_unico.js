/**
 * Operacao Salvamento - Gerador oficial de HTML unico (Fase 3)
 *
 * Evolucao:
 * - incorpora CSS;
 * - incorpora scripts;
 * - incorpora assets;
 * - incorpora simuladores HTML independentes.
 *
 * Uso:
 * node tools/gerar_html_unico.js
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

function lerArquivo(p) {
  if (!fs.existsSync(p)) throw new Error(`Arquivo nao encontrado: ${p}`);
  return fs.readFileSync(p, 'utf8');
}

function mimeType(ext) {
  const tipos = {
    '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
    '.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml',
    '.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg',
    '.mp4':'video/mp4','.webm':'video/webm'
  };
  return tipos[ext.toLowerCase()] || 'application/octet-stream';
}

function arquivoBase64(relativo) {
  const absoluto = path.join(raiz, relativo.replace(/^\.\//,''));
  if (!fs.existsSync(absoluto)) return null;
  const dados = fs.readFileSync(absoluto).toString('base64');
  return `data:${mimeType(path.extname(absoluto))};base64,${dados}`;
}

function incorporarAssets(html) {
  return html.replace(/(["'(])((?:\.\/)?assets\/[^"')\s]+)/g,(m,i,a)=>{
    const b = arquivoBase64(a);
    return b ? `${i}${b}` : m;
  });
}

function incorporarCss(html) {
  const css = lerArquivo(path.join(raiz,'css','game.css'));
  return html.replace(/<link[^>]*href=["']\.\/css\/game\.css["'][^>]*>/i, `<style>\n${css}\n</style>`);
}

function incorporarScripts(html) {
  return html.replace(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi,(m,src)=>{
    const arquivo = path.join(raiz,src.replace(/^\.\//,''));
    if (!fs.existsSync(arquivo)) return m;
    return `<script>\n${fs.readFileSync(arquivo,'utf8')}\n</script>`;
  });
}

function incorporarSimuladores(html) {
  const pasta = path.join(raiz,'simulators');
  if (!fs.existsSync(pasta)) return html;

  const simuladores = {};

  fs.readdirSync(pasta)
    .filter(nome => nome.endsWith('.html'))
    .forEach(nome => {
      simuladores[nome] = fs.readFileSync(path.join(pasta,nome),'utf8');
    });

  const bloco = `<script id="simuladores-incorporados">\nwindow.simuladoresIncorporados = ${JSON.stringify(simuladores)};\n</script>`;

  return html.replace('</body>', `${bloco}\n</body>`);
}

function gerarBuild() {
  let html = lerArquivo(path.join(raiz,'index.html'));

  html = incorporarCss(html);
  html = incorporarScripts(html);
  html = incorporarAssets(html);
  html = incorporarSimuladores(html);

  const pasta = path.join(raiz,'builds');
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

  const saida = path.join(pasta,'Operacao_Salvamento_BUILD_FASE3.html');
  fs.writeFileSync(saida,html,'utf8');

  console.log('Build criada com sucesso:');
  console.log(saida);
}

gerarBuild();
