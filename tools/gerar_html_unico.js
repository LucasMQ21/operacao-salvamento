#!/usr/bin/env node
/**
 * Operação Salvamento — Gerador de HTML único (Fase 3)
 *
 * Lê o projeto modular (index.html + css/ + js/ + simulators/ + assets/) e
 * produz UM arquivo .html autônomo, sem nenhuma dependência externa.
 *
 * O que ele faz:
 *  1. Simuladores: cada "./simulators/simulator-XX.html" citado no js/app.js
 *     é lido, recebe seus próprios assets embutidos (caminhos "../assets/...")
 *     e é convertido em data:text/html;base64 — formato que o app já sabe abrir
 *     (obterUrlExecutavelSimulador converte em Blob URL).
 *  2. CSS: <link rel="stylesheet"> vira <style>; url(../assets/...) é embutido.
 *  3. JS: <script src> vira <script> inline (sem type="module", como na referência),
 *     embutindo áudios/imagens citados em AUDIO_B64, PATENTE_IMGS, etc.
 *  4. index.html: <img>, <image href>, <source> etc. viram data URI.
 *
 * Uso (na raiz do repositório):
 *   node tools/gerar_html_unico.js
 *   node tools/gerar_html_unico.js --saida=builds/meu_arquivo.html
 *   node tools/gerar_html_unico.js --estrito     (falha se faltar algum asset)
 *   node tools/gerar_html_unico.js --modulo      (mantém type="module" no app.js)
 *   node tools/gerar_html_unico.js --sem-validacao
 *
 * Requer Node 18+. Sem dependências.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const opc = {
  estrito: args.includes('--estrito'),
  modulo: args.includes('--modulo'),
  semValidacao: args.includes('--sem-validacao'),
  saida: path.resolve(
    raiz,
    (args.find(a => a.startsWith('--saida=')) || '').slice(8) ||
      path.join('builds', 'Operacao_Salvamento_HTML_Completo.html')
  ),
};

const stats = {
  assets: new Map(),      // caminho absoluto -> bytes
  ausentes: new Set(),    // referências que não foram encontradas
  externos: new Set(),    // URLs http(s) que continuam externas
  simuladores: [],        // { nome, bytes }
  erros: [],              // problemas que invalidam a build
};

/* ------------------------------------------------------------------ utils */

const MIME = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.avif': 'image/avif',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.json': 'application/json',
};
const EXTENSOES = Object.keys(MIME).map(e => e.slice(1)).join('|');

function ler(arquivo) {
  if (!fs.existsSync(arquivo)) throw new Error(`Arquivo não encontrado: ${arquivo}`);
  return fs.readFileSync(arquivo, 'utf8');
}

const rel = abs => path.relative(raiz, abs).split(path.sep).join('/');
const mb = bytes => (bytes / 1048576).toFixed(2) + ' MB';
const ehLocal = ref => ref && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref);

/** Procura o arquivo relativo à pasta do documento; se falhar, tenta a raiz. */
function resolverCaminho(ref, baseDir) {
  let limpo = ref.split(/[?#]/)[0];
  try { limpo = decodeURIComponent(limpo); } catch (_) { /* mantém */ }
  const candidatos = [
    path.resolve(baseDir, limpo),
    path.resolve(raiz, limpo.replace(/^(?:\.{1,2}\/)+/, '')),
  ];
  return candidatos.find(c => fs.existsSync(c) && fs.statSync(c).isFile()) || null;
}

const cacheUri = new Map();
function arquivoParaDataUri(abs) {
  if (cacheUri.has(abs)) return cacheUri.get(abs);
  const buf = fs.readFileSync(abs);
  const mime = MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream';
  const uri = `data:${mime};base64,${buf.toString('base64')}`;
  cacheUri.set(abs, uri);
  stats.assets.set(abs, buf.length);
  return uri;
}

/* ------------------------------------------------------------ assets/mídia */

// Casa "assets/x.png", "./assets/x.png", "../assets/x.png" e "../../assets/x.png".
// A lookbehind impede casar no meio de outro caminho (ex.: "meu-assets/").
const RE_ASSET = new RegExp(
  String.raw`(?<![A-Za-z0-9_\-./])((?:\.{1,2}/)*assets/[A-Za-z0-9_\-./%]+?\.(?:${EXTENSOES}))(?![A-Za-z0-9_\-])`,
  'gi'
);

/**
 * Troca referências a assets por data URI.
 * baseDir = pasta do documento que será aberto pelo navegador
 *   (css -> pasta do css; simulador -> pasta do simulador; js/index -> raiz).
 */
function incorporarAssets(texto, baseDir, origem) {
  return texto.replace(RE_ASSET, (match, ref) => {
    const abs = resolverCaminho(ref, baseDir);
    if (!abs) {
      stats.ausentes.add(`${ref}   (citado em ${origem})`);
      return match;
    }
    return arquivoParaDataUri(abs);
  });
}

/* ------------------------------------------------------- recursos do HTML */

function escaparScript(codigo) {
  // Evita que "</script>" ou "<!--" dentro de strings JS encerrem/alterem a tag.
  return codigo
    .replace(/<\/(script)/gi, (_, t) => `<\\/${t}`)
    .replace(/<!--/g, () => '<\\!--');
}

function validarScript(codigo, nome, ehModulo) {
  if (opc.semValidacao) return;
  if (/^\s*(?:import|export)\s/m.test(codigo)) return; // módulo real: não dá p/ checar aqui
  try {
    // Embrulhar em async permite "await" no topo, como num módulo.
    new vm.Script(`(async()=>{${codigo}\n})`, { filename: nome });
  } catch (e) {
    stats.erros.push(`Erro de sintaxe em ${nome}: ${e.message}`);
  }
}

function atributo(tag, nome) {
  const m = tag.match(new RegExp(`\\b${nome}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[1] ?? m[2] ?? m[3]) : null;
}

/**
 * Embute <link rel=stylesheet> e <script src> locais de um documento HTML.
 * baseDir = pasta onde o documento "mora".
 */
function incorporarRecursos(html, baseDir, nomeDoc, { simuladores }) {
  // ---- CSS
  html = html.replace(/<link\b[^>]*>/gi, tag => {
    if (!/\brel\s*=\s*["']?stylesheet/i.test(tag)) return tag;
    const href = atributo(tag, 'href');
    if (!ehLocal(href)) {
      if (href) stats.externos.add(`${href}   (citado em ${nomeDoc})`);
      return tag;
    }
    const abs = resolverCaminho(href, baseDir);
    if (!abs) { stats.ausentes.add(`${href}   (citado em ${nomeDoc})`); return tag; }
    const css = incorporarAssets(ler(abs), path.dirname(abs), rel(abs));
    return `<style>\n${css}\n</style>`;
  });

  // ---- JS
  html = html.replace(/<script\b([^>]*)>\s*<\/script>/gi, (tag, attrs) => {
    const src = atributo(tag, 'src');
    if (src === null) return tag;
    if (!ehLocal(src)) { stats.externos.add(`${src}   (citado em ${nomeDoc})`); return tag; }
    const abs = resolverCaminho(src, baseDir);
    if (!abs) { stats.ausentes.add(`${src}   (citado em ${nomeDoc})`); return tag; }

    let codigo = ler(abs);
    if (simuladores) codigo = incorporarSimuladores(codigo);
    codigo = incorporarAssets(codigo, baseDir, rel(abs));

    const ehModulo = /\btype\s*=\s*["']?module/i.test(attrs);
    validarScript(codigo, rel(abs), ehModulo);

    // Mantém os atributos, menos os que só fazem sentido com src externo.
    let restantes = attrs
      .replace(/\bsrc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i, '')
      .replace(/\b(?:defer|async|crossorigin|integrity)\b(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi, '');
    // Padrão = <script> comum, igual ao HTML único de referência (que funciona).
    if (!opc.modulo) restantes = restantes.replace(/\btype\s*=\s*(?:"module"|'module'|module)/i, '');
    restantes = restantes.replace(/\s+/g, ' ').trimEnd();

    return `<script${restantes}>\n${escaparScript(codigo)}\n</script>`;
  });

  return html;
}

/* ------------------------------------------------------------ simuladores */

const cacheSim = new Map();
const RE_SIMULADOR = /(?<![A-Za-z0-9_\-./])(?:\.{1,2}\/)*simulators\/([A-Za-z0-9_\-.]+\.html)/g;

function prepararSimulador(abs) {
  if (cacheSim.has(abs)) return cacheSim.get(abs);
  const nome = rel(abs);
  let html = ler(abs);
  const dir = path.dirname(abs);

  html = incorporarAssets(html, dir, nome);
  html = incorporarRecursos(html, dir, nome, { simuladores: false });

  // Valida os <script> inline do simulador antes de codificá-lo.
  html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, corpo) => {
    if (!/\bsrc\s*=/i.test(attrs) && corpo.trim() &&
        !/\btype\s*=\s*["']?(?!module|text\/javascript|application\/javascript)/i.test(attrs)) {
      validarScript(corpo, nome, false);
    }
    return _;
  });

  const uri = 'data:text/html;base64,' + Buffer.from(html, 'utf8').toString('base64');
  stats.simuladores.push({ nome, bytes: Buffer.byteLength(html, 'utf8') });
  cacheSim.set(abs, uri);
  return uri;
}

function incorporarSimuladores(codigo) {
  return codigo.replace(RE_SIMULADOR, (match, arquivo) => {
    const abs = path.join(raiz, 'simulators', arquivo);
    if (!fs.existsSync(abs)) {
      stats.ausentes.add(`simulators/${arquivo}   (citado no js)`);
      return match;
    }
    return prepararSimulador(abs);
  });
}

/* ------------------------------------------------------------- verificação */

function verificarSaida(html) {
  const problemas = [];
  const pad = (re, msg) => {
    const achados = new Set();
    for (const m of html.matchAll(re)) { achados.add(m[0].slice(0, 120)); if (achados.size >= 5) break; }
    if (achados.size) problemas.push(`${msg}: ${[...achados].join(' | ')}`);
  };
  // Referências locais que sobraram (as aspas/parênteses evitam falso positivo dentro do base64).
  pad(new RegExp(String.raw`["'(=]\s*(?:\.{1,2}/)*(?:assets|simulators)/[\w\-./%]+\.(?:${EXTENSOES}|html)`, 'gi'),
      'Referência local que não foi embutida');
  pad(/<script\b[^>]*\bsrc\s*=\s*["'](?!https?:|data:)[^"']+/gi, '<script src> local restante');
  pad(/<link\b[^>]*rel\s*=\s*["']?stylesheet[^>]*href\s*=\s*["'](?!https?:|data:)[^"']+/gi, '<link stylesheet> local restante');
  return problemas;
}

/* ------------------------------------------------------------------- build */

function gerarBuild() {
  const t0 = Date.now();
  console.log('Operação Salvamento — gerando HTML único...\n');

  let html = ler(path.join(raiz, 'index.html'));
  html = incorporarAssets(html, raiz, 'index.html');                 // <img>, <image>, <source>...
  html = incorporarRecursos(html, raiz, 'index.html', { simuladores: true }); // css + js (+ simuladores)

  const problemas = opc.semValidacao ? [] : verificarSaida(html);

  fs.mkdirSync(path.dirname(opc.saida), { recursive: true });
  fs.writeFileSync(opc.saida, html, 'utf8');

  // ---- relatório
  const totalAssets = [...stats.assets.values()].reduce((a, b) => a + b, 0);
  console.log(`Simuladores embutidos: ${stats.simuladores.length}`);
  stats.simuladores
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .forEach(s => console.log(`  - ${s.nome.padEnd(32)} ${mb(s.bytes)}`));
  console.log(`Assets embutidos: ${stats.assets.size} arquivos (${mb(totalAssets)} originais)`);

  if (stats.externos.size) {
    console.log(`\nAVISO — ${stats.externos.size} dependência(s) externa(s) mantida(s) (não funcionam offline):`);
    stats.externos.forEach(e => console.log('  - ' + e));
  }
  if (stats.ausentes.size) {
    console.log(`\nAVISO — ${stats.ausentes.size} referência(s) NÃO encontrada(s):`);
    stats.ausentes.forEach(e => console.log('  - ' + e));
  }
  problemas.forEach(p => stats.erros.push(p));
  if (stats.erros.length) {
    console.log('\nERROS:');
    stats.erros.forEach(e => console.log('  ✗ ' + e));
  }

  console.log(`\nArquivo: ${opc.saida}`);
  console.log(`Tamanho: ${mb(fs.statSync(opc.saida).size)}  |  ${((Date.now() - t0) / 1000).toFixed(1)} s`);

  const falhou = stats.erros.length > 0 || (opc.estrito && stats.ausentes.size > 0);
  if (falhou) { console.error('\nBuild concluída COM PROBLEMAS.'); process.exit(1); }
  console.log('\nBuild concluída com sucesso.');
}

try { gerarBuild(); }
catch (e) { console.error('Falha na build: ' + e.message); process.exit(1); }
