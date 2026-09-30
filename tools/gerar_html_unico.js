/**
 * Operacao Salvamento - Gerador oficial de HTML unico (Fase 3.1)
 *
 * Correção:
 * - simuladores não são mais inseridos como HTML executável dentro do app;
 * - são armazenados isoladamente como dados JSON escapados;
 * - evita quebra da inicialização do jogo principal.
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

function lerArquivo(p) {
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
  return `data:${mimeType(path.extname(absoluto))};base64,${fs.readFileSync(absoluto).toString('base64')}`;
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
    return `<script>\n${lerArquivo(arquivo)}\n</script>`;
  });
}

function coletarSimuladores() {
  const pasta = path.join(raiz,'simulators');
  if (!fs.existsSync(pasta)) return {};

  const dados = {};
  fs.readdirSync(pasta)
    .filter(nome => nome.endsWith('.html'))
    .forEach(nome => {
      dados[nome] = Buffer.from(lerArquivo(path.join(pasta,nome))).toString('base64');
    });
  return dados;
}

function incorporarSimuladoresIsolados(html) {
  const simuladores = JSON.stringify(coletarSimuladores());
  const bloco = `<script id="simuladores-build-data">\nwindow.simuladoresIncorporadosBase64 = ${simuladores};\n</script>`;
  return html.replace('</body>', `${bloco}\n</body>`);
}

function gerarBuild() {
  let html = lerArquivo(path.join(raiz,'index.html'));
  html = incorporarCss(html);
  html = incorporarScripts(html);
  html = incorporarAssets(html);
  html = incorporarSimuladoresIsolados(html);

  const pasta = path.join(raiz,'builds');
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

  const saida = path.join(pasta,'Operacao_Salvamento_BUILD_FASE3_1.html');
  fs.writeFileSync(saida,html,'utf8');

  console.log('Build criada:');
  console.log(saida);
}

gerarBuild();
