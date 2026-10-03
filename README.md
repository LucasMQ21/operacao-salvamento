# operacao-salvamento
Operação Salvamento é um jogo educacional inspirado em operações reais do Corpo de Bombeiros. O jogador se torna um bombeiro e enfrenta missões de resgate, incêndio, salvamento e busca, resolvendo desafios matemáticos aplicados a situações operacionais. Onde cada operação pode salvar vidas.



Versão de referência: fase 46 — missão 14, Prevenção em eventos (última do Ensino Médio), integrada sobre a fase 45.

## Gerar o HTML único
Na raiz do projeto: `node tools/gerar_html_unico.js` (saída em `builds/`). Veja `tools/gerar_html_unico.js`.

## Cenário vivo do menu principal
Efeitos animados sobre o fundo do menu (`js/cenario-vivo.js` + `assets/embedded/cenario_vivo_fumaca.webp`). Só rodam enquanto a tela do menu está aberta.

## Quartel animado do menu principal
O quartel central é um vídeo (`assets/embedded/quartel_animado.mp4`) sem fundo branco: o contorno branco já vem desenhado no vídeo e a máscara `quartel_mascara.webp` (aplicada no CSS) recorta o que está fora dele. `quartel_poster.webp` é o quadro estático usado antes de tocar e quando o sistema pede "reduzir movimento". O controle de play/pause está em `js/quartel-video.js`.

## Mapa animado do menu principal
- **Emblema do cabeçalho:** usa a mesma animação (anel externo e interno girando) dos emblemas da capa e do login, em `iniciarAnimacaoEmblemaLogin` (`js/app.js`). Tamanho inalterado.
- **Caminhos quartel → ocorrência:** o tracejado se move do quartel até o ícone (CSS, seção "Mapa animado" em `css/game.css`); as faixas tracejadas ficam numa camada SVG própria (`#ruas-fluxo-svg`) para o movimento não redesenhar as demais linhas. Verde (concluída) move mais devagar; "Em breve" fica parado.
- **Hover/seleção:** `js/mapa-animado.js` acende o caminho do ícone sob o cursor e, ao selecionar a missão, destaca ainda mais e esmaece os demais.
- Respeita "reduzir movimento" do sistema.
