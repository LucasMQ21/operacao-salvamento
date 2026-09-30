/**
 * Operação Salvamento - Gerador oficial de HTML único (Fase 1)
 *
 * Objetivo:
 * Consolidar o index.html, CSS e JavaScript principal em uma única página HTML.
 *
 * Esta é a primeira versão do pipeline de build.
 * Próximas evoluções:
 * - incorporação automática de imagens;
 * - incorporação de áudios;
 * - processamento completo dos assets;
 * - geração automatizada de versões por fase.
 *
 * Uso:
 * node tools/gerar_html_unico.js
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

const arquivos = {
  html: path.join(raiz, 'index.html'),
  css: path.join(raiz, 'css', 'game.css'),
  js: path.join(raiz, 'js', 'app.js')
};

function lerArquivo(arquivo) {
  if (!fs.existsSync(arquivo)) {
    throw new Error(`Arquivo não encontrado: ${arquivo}`);
  }
  return fs.readFileSync(arquivo, 'utf8');
}

function gerarBuild() {
  let html = lerArquivo(arquivos.html);
  const css = lerArquivo(arquivos.css);
  const js = lerArquivo(arquivos.js);

  html = html.replace(
    /<link[^>]*href=["']\.\/css\/game\.css["'][^>]*>/i,
    `<style>\n${css}\n</style>`
  );

  html = html.replace(
    /<script[^>]*src=["']\.\/js\/app\.js["'][^>]*><\/script>/i,
    `<script>\n${js}\n</script>`
  );

  const pastaBuild = path.join(raiz, 'builds');
  if (!fs.existsSync(pastaBuild)) {
    fs.mkdirSync(pastaBuild);
  }

  const saida = path.join(
    pastaBuild,
    'Operacao_Salvamento_BUILD_TESTE.html'
  );

  fs.writeFileSync(saida, html, 'utf8');

  console.log('Build criada com sucesso:');
  console.log(saida);
}

gerarBuild();
