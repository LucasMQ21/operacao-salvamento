/**
 * Operação Salvamento - Injetor isolado de simuladores
 *
 * Este arquivo NÃO altera o gerador principal.
 * Ele recebe um HTML já funcional e adiciona os simuladores incorporados.
 */

const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');

function mime(ext){
  const m={'.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp3':'audio/mpeg','.wav':'audio/wav'};
  return m[ext.toLowerCase()] || 'application/octet-stream';
}

function dataUri(file){
  return `data:${mime(path.extname(file))};base64,${fs.readFileSync(file).toString('base64')}`;
}

function gerar(){
  const entrada=process.argv[2] || path.join(raiz,'builds','Operacao_Salvamento_BUILD_FASE2.html');
  const saida=process.argv[3] || path.join(raiz,'builds','Operacao_Salvamento_BUILD_FASE2_SIMULADORES.html');

  let html=fs.readFileSync(entrada,'utf8');
  const dir=path.join(raiz,'simulators');
  const sims={};

  if(fs.existsSync(dir)){
    fs.readdirSync(dir).filter(f=>f.endsWith('.html')).forEach(f=>{
      const conteudo=fs.readFileSync(path.join(dir,f),'utf8');
      sims[f]=`data:text/html;base64,${Buffer.from(conteudo).toString('base64')}`;
    });
  }

  const bloco=`<script>window.BUILD_SIMULATORS=${JSON.stringify(sims)};</script>`;
  html=html.replace('</body>',bloco+'</body>');
  fs.writeFileSync(saida,html,'utf8');
  console.log('Gerado:',saida);
}

gerar();
