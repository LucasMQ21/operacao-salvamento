/**
 * Operação Salvamento - Gerador HTML único (Fase 4)
 *
 * Correção: resolve assets relativos dentro dos simuladores antes do Base64.
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

function lerArquivo(arquivo) {
  return fs.readFileSync(arquivo, 'utf8');
}

function mimeType(ext) {
  const tipos = {
    '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp',
    '.gif':'image/gif','.svg':'image/svg+xml','.mp3':'audio/mpeg',
    '.wav':'audio/wav','.ogg':'audio/ogg','.mp4':'video/mp4','.webm':'video/webm'
  };
  return tipos[ext.toLowerCase()] || 'application/octet-stream';
}

function arquivoBase64(absoluto) {
  if (!fs.existsSync(absoluto)) return null;
  return `data:${mimeType(path.extname(absoluto))};base64,${fs.readFileSync(absoluto).toString('base64')}`;
}

function resolverAsset(caminho, origem) {
  if (/^(data:|https?:)/i.test(caminho)) return caminho;
  const limpo = caminho.replace(/^['"]|['"]$/g,'');
  const absoluto = path.resolve(path.dirname(origem), limpo);
  return arquivoBase64(absoluto) || caminho;
}

function incorporarAssetsInternos(html, arquivoOrigem) {
  return html.replace(/url\(([^)]+)\)/gi, (m, url) => {
    const original = url.trim().replace(/["']/g,'');
    return `url(${JSON.stringify(resolverAsset(original, arquivoOrigem))})`;
  }).replace(/(<img[^>]+src=["'])([^"']+)(["'])/gi, (m,a,url,b)=>{
    return a + resolverAsset(url, arquivoOrigem) + b;
  });
}

function incorporarSimuladores(html) {
  const dir = path.join(raiz,'simulators');
  if (!fs.existsSync(dir)) return html;

  const simuladores = {};
  for (const arquivo of fs.readdirSync(dir)) {
    if (!arquivo.endsWith('.html')) continue;
    let conteudo = lerArquivo(path.join(dir,arquivo));
    conteudo = incorporarAssetsInternos(conteudo, path.join(dir,arquivo));
    simuladores[arquivo] = `data:text/html;base64,${Buffer.from(conteudo,'utf8').toString('base64')}`;
  }

  const bloco = `<script>window.BUILD_SIMULATORS=${JSON.stringify(simuladores)};</script>`;
  return html.replace('</body>', bloco + '</body>');
}

function incorporarCss(html) {
  const css = path.join(raiz,'css','game.css');
  if (!fs.existsSync(css)) return html;
  return html.replace(/<link[^>]*href=["']\.\/css\/game\.css["'][^>]*>/i, `<style>${lerArquivo(css)}</style>`);
}

function incorporarScripts(html) {
  return html.replace(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi,(m,src)=>{
    const arquivo = path.join(raiz,src.replace(/^\.\//,''));
    return fs.existsSync(arquivo) ? `<script>${lerArquivo(arquivo)}</script>` : m;
  });
}

function gerarBuild(){
  let html = lerArquivo(path.join(raiz,'index.html'));
  html = incorporarCss(html);
  html = incorporarScripts(html);
  html = incorporarSimuladores(html);
  html = incorporarAssetsInternos(html, path.join(raiz,'index.html'));

  const pasta = path.join(raiz,'builds');
  if (!fs.existsSync(pasta)) fs.mkdirSync(pasta);

  const saida = path.join(pasta,'Operacao_Salvamento_BUILD_FASE4.html');
  fs.writeFileSync(saida,html,'utf8');
  console.log('Build criada:',saida);
}

gerarBuild();
