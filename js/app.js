/* =========================================================
   ARQUITETURA JAVASCRIPT CONSOLIDADA — ETAPA 4D
   Dados, estado, áudio, mapa, briefing, simuladores e eventos.
   Funções públicas usadas por atributos onclick foram preservadas.
   ========================================================= */
const SIM_URLS_POR_NIVEL = {"1":["./simulators/simulator-01.html",null,null,null,null,null,null,null,null,null,null,null,null,null],"2":["./simulators/simulator-02.html","./simulators/simulator-03.html","./simulators/simulator-04.html","./simulators/simulator-05.html","./simulators/simulator-06.html","./simulators/simulator-07.html",null,null,null,null,null,null,null,null]};
let SIM_URLS = SIM_URLS_POR_NIVEL[2];
const MISSOES_POR_NIVEL = {"1":[{"id":0,"nome":"Viatura da Oficina","titulo":"🚒 Missão 1: Libere a Viatura da Oficina","resolvida":false,"pronta":true,"nivel":"Ensino Fundamental","imagemMapa":"./assets/embedded/2579db1e64e8efaef02a.webp"},{"id":1,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":2,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":3,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":4,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":5,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":6,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":7,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":8,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":9,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":10,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":11,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":12,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null},{"id":13,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Fundamental","imagemMapa":null}],"2":[{"id":0,"nome":"Resgate Animal","titulo":"🐄 Missão 1: Resgate Animal","resolvida":false,"pronta":true,"nivel":"Ensino Médio","imagemMapa":"./assets/embedded/bad1b1a79a37c2227cd9.webp"},{"id":1,"nome":"Resgate na Água","titulo":"🌊 Missão 2: Resgate na Água","resolvida":false,"pronta":true,"nivel":"Ensino Médio","imagemMapa":"./assets/embedded/e6c58245349d3386bf84.webp"},{"id":2,"nome":"Galeria Subterrânea","titulo":"🕳️ Missão 3: Galeria Subterrânea","resolvida":false,"pronta":true,"nivel":"Ensino Médio","imagemMapa":"./assets/embedded/4c586e24afa67ddf3eb1.webp"},{"id":3,"nome":"Buscas na Mata","titulo":"🌲 Missão 4: Buscas na Mata","resolvida":false,"pronta":true,"nivel":"Ensino Médio","imagemMapa":"./assets/embedded/dc2c9085cec882ec5853.webp"},{"id":4,"nome":"Combate ao Incêndio","titulo":"🔥 Missão 5: Combate ao Incêndio","resolvida":false,"pronta":true,"nivel":"Ensino Médio","imagemMapa":"./assets/embedded/4345553e661a40603378.webp"},{"id":5,"nome":"Busca Aquática","titulo":"💧 Missão 6: Busca Aquática em Cachoeira","resolvida":false,"pronta":true,"nivel":"Ensino Médio","imagemMapa":"./assets/embedded/a9d07d0e506d1490275a.webp"},{"id":6,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":7,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":8,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":9,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":10,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":11,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":12,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null},{"id":13,"nome":"Em breve","titulo":"","resolvida":false,"pronta":false,"nivel":"Ensino Médio","imagemMapa":null}]};
const BRIEFINGS_POR_NIVEL = {"1":[{"titulo":"🚒 Missão 1: Libere a Viatura da Oficina","contexto":"Durante seu turno de serviço, você recebeu de seu comandante a missão de buscar uma viatura no pátio da oficina do Centro de Suprimentos e Manutenção. O tenente, chefe da Seção de Transportes, informou que o conserto já foi finalizado e que a viatura está pronta para retornar ao serviço. Ao chegar ao local, porém, você percebe que outras viaturas foram estacionadas ao redor dela, bloqueando o caminho até a saída. Como bombeiro motorista em diligência, caberá a você reorganizar o pátio e liberar a viatura que ficou pronta. O espaço disponível é reduzido e exige cuidado durante as manobras. Para evitar colisões e facilitar a movimentação em uma área apertada, o chefe da guarnição determinou que cada viatura seja movimentada apenas para frente ou para trás, de acordo com a posição em que se encontra.","objetivo":"Planejar uma sequência de deslocamentos, reorganizar as demais viaturas e conduzir a viatura 1 até a saída do pátio com segurança.","dados":["A viatura que deverá sair do pátio é a <strong>viatura 1</strong>.","O pátio está representado por uma malha de <strong>6 × 6 casas</strong>.","Cada viatura pode se mover somente no sentido em que está posicionada.","Viaturas horizontais movem para a esquerda ou para a direita; viaturas verticais movem para cima ou para baixo.","Nenhuma viatura pode atravessar outra nem ultrapassar os limites do pátio.","Cada casa da malha representa uma posição possível de estacionamento e manobra.","A missão será concluída quando a viatura 1 alcançar a saída."],"modelo":"Observe a posição ocupada por cada viatura na <strong>malha quadriculada</strong>. Antes de deslocar uma viatura, antecipe quais casas serão liberadas e quais continuarão bloqueadas.","tarefa":"Manobre as viaturas na ordem correta e abra um caminho até a saída, retirando a viatura 1 do pátio sem ultrapassar os limites da malha e sem encostar nas demais viaturas.","nota":"A situação foi simplificada para fins didáticos. Em uma manobra real, o motorista deve seguir as normas de segurança, utilizar auxílio de balizadores quando necessário e considerar as características do local e de cada viatura.","icone":"🚒","heroLabel":"Missão 1 · Ensino Fundamental","dicas":["A viatura 1 pode avançar uma casa antes de você reorganizar as demais.","Leve a viatura 5 para o alto do pátio; isso libera a faixa inferior.","Depois, mova a viatura 4 para a esquerda e a viatura 2 para baixo."],"debriefing":{"contextoOperacional":"A missão representou uma diligência de apoio logístico no Centro de Suprimentos e Manutenção. Para retirar uma viatura pronta, foi necessário observar o espaço disponível, antecipar consequências e organizar uma sequência de movimentos sem colisões.","reflexoes":["As atividades do bombeiro militar não se limitam ao atendimento de ocorrências: manutenção, logística e preparação de recursos também são essenciais para a prontidão operacional.","Planejar antes de agir reduz movimentos desnecessários e ajuda a evitar danos às viaturas e ao patrimônio público.","Um único deslocamento pode liberar ou bloquear novas possibilidades, por isso a ordem dos movimentos é importante."],"simplificacoes":["O pátio foi representado por uma malha regular de 6 × 6 casas.","As viaturas foram tratadas como figuras retangulares que ocupam casas inteiras da malha.","Cada viatura pôde se mover somente para frente ou para trás, sem realizar curvas.","Foram desconsiderados largura real, raio de giro, distância de segurança, presença de pessoas e condições do piso."],"matematica":["Localização em malha quadriculada","Orientação espacial e reconhecimento de direções","Organização de sequências","Antecipação de movimentos","Resolução de problemas por planejamento e tentativa"],"interdisciplinaridade":["Matemática e orientação espacial na organização do pátio.","Logística e manutenção na disponibilidade das viaturas.","Educação para o trânsito e segurança durante manobras.","Responsabilidade no cuidado com equipamentos e patrimônio público."],"limitesModelo":["O simulador não reproduz a dinâmica completa de uma manobra veicular real.","O modelo não considera esterçamento, ré com mudança de direção, pontos cegos, dimensões exatas nem comunicação entre motorista e balizador.","A solução do jogo não deve ser interpretada como procedimento técnico de condução ou organização de um pátio real."],"seguranca":["Manobras reais devem ser realizadas somente por condutores habilitados e autorizados.","Em espaços reduzidos, devem ser observados os procedimentos institucionais, a sinalização e o auxílio de balizadores quando aplicável.","Nunca permaneça em pontos cegos ou entre viaturas durante uma manobra."],"reflexaoFinal":"A malha quadriculada permite estudar o planejamento de movimentos de forma simples e visual. Na realidade, uma manobra segura depende de mais fatores, mas a capacidade de observar, antecipar e organizar uma sequência continua sendo fundamental."},"imagem":"./assets/embedded/b7f9f06cbf02361df6ab.webp"},null,null,null,null,null,null,null,null,null,null,null,null,null],"2":[{"titulo":"🐄 Missão 1: Resgate Animal na Cisterna","contexto":"Uma vaca caiu em uma cisterna e precisa ser içada com segurança. A equipe dispõe de dois sistemas de polias e deve escolher aquele que exige a menor força real de tração.","objetivo":"Comparar dois sistemas de polias, calcular a força real necessária e selecionar a configuração mais eficiente para o içamento.","dados":["Peso considerado do animal: P = 5.000 N.","Sistema A: vantagem mecânica VM = 3:1 e n = 2 polias.","Sistema B: vantagem mecânica VM = 5:1 e n = 4 polias.","Para esta simulação, considere acréscimo equivalente a 10% por polia."],"modelo":"Use <code>F<sub>R</sub> = (P ÷ VM) × (1 + 0,10 × n)</code> e compare os resultados dos dois sistemas.","tarefa":"Selecione o sistema que exige menor força e informe, em newtons, a força real de tração correspondente.","nota":"O acréscimo de 10% por polia é uma simplificação didática adotada exclusivamente no modelo desta missão.","icone":"🐄","heroLabel":"Missão 1","dicas":["Calcule primeiro a força ideal de cada sistema, dividindo o peso do animal pela vantagem mecânica correspondente.","Depois aplique, em cada sistema, o acréscimo de 10% por polia por meio do fator (1 + 0,10 × n).","Compare as duas forças reais obtidas. O sistema mais eficiente será aquele que exigir a menor força de tração."],"debriefing":{"contextoOperacional":"A equipe precisou comparar sistemas de polias para reduzir a força de tração aplicada no içamento de um animal em uma cisterna. O cálculo orientou uma escolha, mas uma operação real exigiria avaliação estrutural, plano de resgate, estabilização do cenário e controle contínuo da carga.","reflexoes":["A Matemática não executa o resgate, mas ajuda a comparar alternativas e justificar decisões técnicas.","Uma solução numericamente eficiente pode ser inadequada se as ancoragens, os equipamentos ou as condições do local não forem compatíveis."],"simplificacoes":["O peso do animal foi tratado como conhecido e constante.","As perdas foram representadas por um acréscimo fixo de 10% por polia.","Foram desprezados atrito variável, elasticidade da corda, oscilações da carga, geometria real do sistema e mudanças durante o içamento."],"matematica":["Razões e proporções","Vantagem mecânica","Porcentagem","Comparação de resultados","Unidades de força"],"interdisciplinaridade":["Matemática e Física na análise de forças.","Engenharia e salvamento terrestre na seleção de equipamentos, ancoragens e sistemas de vantagem mecânica.","Biologia e bem-estar animal no planejamento de uma retirada segura."],"limitesModelo":["A vantagem mecânica real depende do arranjo, do rendimento dos componentes e das condições de uso.","O modelo não dimensiona ancoragens nem substitui procedimentos técnicos de salvamento em altura ou espaço confinado."],"seguranca":["Não entre em cisternas, poços ou espaços confinados para tentar um resgate improvisado.","Isole o local, evite novas quedas e acione o Corpo de Bombeiros pelo telefone 193."],"reflexaoFinal":"Modelar é escolher quais aspectos da realidade serão destacados. Um bom resultado matemático precisa ser interpretado à luz das condições operacionais e dos limites do modelo."},"imagem":"./assets/embedded/aaac68aa00d0a5b7d217.webp"},{"titulo":"🌊 Missão 2: Resgate na Água","contexto":"Uma vítima é arrastada pela correnteza no centro de um rio. Da margem, o bombeiro lançará um saco de arremesso e deverá antecipar o deslocamento da vítima para que ambos se encontrem.","objetivo":"Articular movimento relativo, decomposição de velocidades e lançamento oblíquo para determinar os ângulos de lançamento.","dados":["Largura do rio: 20 m; a vítima está na linha central, a 10 m da margem.","Velocidade da correnteza: V<sub>rio</sub> = 3 m/s.","Velocidade transversal considerada para o saco: V<sub>saco</sub> = 5 m/s.","Velocidade inicial do lançamento oblíquo: v<sub>0</sub> = 25 m/s.","Aceleração da gravidade adotada: g = 10 m/s<sup>2</sup>.","A posição longitudinal da vítima será informada quando a animação for pausada."],"modelo":"Considere o tempo de travessia e a posição futura da vítima. Para o alcance do lançamento, pode-se usar <code>R = (v<sub>0</sub><sup>2</sup> · sen(2α)) ÷ g</code>, associado à distância até o ponto previsto de encontro.","tarefa":"Pause a ocorrência no momento escolhido, analise os dados e determine os ângulos θ e α que permitem que o saco encontre a vítima.","nota":"Os valores adotados compõem um modelo matemático simplificado para fins educacionais e não substituem protocolos operacionais reais.","icone":"🌊","heroLabel":"Missão 2","dicas":["Comece calculando o tempo necessário para o saco atravessar os 10 m que separam a margem da linha central do rio.","Use esse tempo para prever quanto a vítima será deslocada longitudinalmente pela correnteza até o encontro.","Com o ponto futuro da vítima definido, determine a direção horizontal θ e relacione a distância de lançamento à expressão do alcance para encontrar α."],"debriefing":{"contextoOperacional":"O lançamento do saco de resgate foi planejado para encontrar uma vítima que se deslocava com a correnteza. A missão evidenciou que o alvo não permanece na posição observada inicialmente: é necessário antecipar seu movimento.","reflexoes":["Em situações dinâmicas, decidir com base apenas na posição atual pode levar ao erro.","A previsão matemática depende da qualidade das medidas e da estabilidade das condições ambientais."],"simplificacoes":["As velocidades da vítima, da correnteza e do saco foram consideradas constantes.","O rio foi tratado como regular, sem variações de profundidade ou direção.","Foram desprezados turbulência, vento, resistência do ar, obstáculos, fadiga, flutuação e tempo de reação da equipe."],"matematica":["Movimento relativo","Decomposição de velocidades","Trigonometria","Lançamento oblíquo","Distância, tempo e previsão de posição"],"interdisciplinaridade":["Matemática e Física na previsão da trajetória.","Geografia e Ciências Ambientais na leitura da correnteza e do terreno.","Educação Física e salvamento aquático na técnica de lançamento e recuperação."],"limitesModelo":["Correntezas reais variam no espaço e no tempo, e a vítima pode mudar de orientação ou velocidade.","O resultado do jogo não define uma técnica operacional nem garante o alcance em uma situação real."],"seguranca":["Não entre em rios, enchentes ou correntezas para tentar um resgate sem treinamento e equipamentos adequados.","Mantenha-se em local seguro, forneça referências da posição da vítima e ligue 193."],"reflexaoFinal":"A interdisciplinaridade aparece quando conceitos de movimento, ambiente e tomada de decisão precisam ser articulados para compreender um único problema real."},"imagem":"./assets/embedded/e6d940d633b03cc2ad1d.webp"},{"titulo":"🕳️ Missão 3: Galeria Subterrânea","contexto":"Um cachorro está preso em uma rede subterrânea. Para inspecionar toda a galeria sem repetir trechos, a equipe deve planejar uma rota que percorra cada tubulação exatamente uma vez.","objetivo":"Reconhecer e construir um caminho euleriano em uma rede representada por um grafo.","dados":["A rede possui 7 poços de acesso, numerados de 1 a 7.","Existem 10 tubulações ligando os poços.","Cada tubulação deve ser percorrida exatamente uma vez.","A rota pode começar e terminar em poços diferentes."],"modelo":"Observe o grau de cada vértice. <code>Regra: um grafo conexo possui caminho euleriano aberto quando apresenta exatamente dois vértices de grau ímpar.</code>","tarefa":"Escolha o poço inicial e indique, passo a passo, uma rota que utilize todas as 10 tubulações sem repetir nenhuma delas.","nota":"Não é necessário encontrar a rota mais curta: o requisito é utilizar cada tubulação uma única vez.","icone":"🕳️","heroLabel":"Missão 3","dicas":["Conte quantas tubulações chegam a cada um dos sete poços. Esse número é o grau de cada vértice do grafo.","Identifique os vértices de grau ímpar. Em um caminho euleriano aberto, eles devem ser exatamente dois e funcionam como início e fim da rota.","Comece em um dos vértices ímpares e escolha, a cada passo, uma tubulação ainda não utilizada, evitando bloquear o acesso às tubulações restantes."],"debriefing":{"contextoOperacional":"A rede subterrânea foi representada como um grafo. O objetivo foi percorrer todas as tubulações uma única vez, evitando repetição de trechos e organizando uma rota de inspeção.","reflexoes":["Representações abstratas podem tornar visível a estrutura de um problema complexo.","Escolher uma rota não depende apenas de distância: conectividade e possibilidade de continuidade também importam."],"simplificacoes":["Cada poço foi representado por um vértice e cada tubulação por uma aresta.","A rede foi considerada conhecida, conexa e livre para deslocamento.","Foram desprezados comprimentos diferentes, inclinações, bloqueios, água, gases, visibilidade, tempo de acesso e risco de desabamento."],"matematica":["Teoria de grafos","Grau de vértices","Caminho euleriano","Raciocínio combinatório","Planejamento de rotas"],"interdisciplinaridade":["Matemática e Computação na análise de redes.","Engenharia e Saneamento na compreensão de galerias e tubulações.","Geografia e Cartografia na representação espacial."],"limitesModelo":["Uma rota matematicamente válida pode ser operacionalmente inviável devido a riscos ou restrições físicas.","A rede real precisaria ser avaliada quanto à atmosfera, estabilidade, acessos, comunicação e possibilidade de retirada."],"seguranca":["Galerias, bueiros e redes subterrâneas são espaços confinados e podem conter gases tóxicos ou deficiência de oxigênio.","Não entre. Isole a área e acione o Corpo de Bombeiros pelo 193."],"reflexaoFinal":"Um grafo não reproduz todos os detalhes do ambiente, mas permite estudar relações de conexão que seriam difíceis de perceber apenas pela descrição verbal."},"imagem":"./assets/embedded/f084c6087708006a2ce3.webp"},{"titulo":"🌲 Missão 4: Buscas na Mata","contexto":"Uma pessoa desapareceu em área de mata. A equipe parte do último ponto conhecido e executará um padrão quadrado crescente até alcançar a posição da vítima.","objetivo":"Relacionar sequência de comprimentos, coordenadas cartesianas, distância acumulada e tempo de deslocamento.","dados":["Origem da busca: (0, 0).","Posição da vítima: (230, 80).","Velocidade constante da equipe: 0,5 m/s.","Primeiro espaçamento: 10 m.","Os comprimentos dos segmentos seguem 10, 10, 20, 20, 30, 30, ..."],"modelo":"Identifique em qual segmento a posição (230, 80) será atingida. Depois calcule <code>tempo = distância acumulada ÷ velocidade</code>.","tarefa":"Informe em horas e minutos o tempo necessário para que a equipe alcance a vítima seguindo integralmente o protocolo quadrado crescente.","nota":"O simulador considera deslocamento contínuo e velocidade constante durante toda a busca.","icone":"🌲","heroLabel":"Missão 4","dicas":["Organize os deslocamentos por direção e comprimento: 10, 10, 20, 20, 30, 30, e assim sucessivamente.","Atualize as coordenadas ao final de cada segmento até localizar o segmento que contém o ponto (230, 80).","Some todos os segmentos completos anteriores e apenas a parte necessária do último segmento. Depois use tempo = distância ÷ 0,5."],"debriefing":{"contextoOperacional":"A busca foi modelada por um padrão quadrado crescente a partir do último ponto conhecido. O jogador precisou acompanhar coordenadas, comprimentos progressivos e distância acumulada até alcançar a vítima.","reflexoes":["Um padrão de busca organiza o esforço e reduz áreas não verificadas, mas sua eficácia depende da qualidade do ponto inicial e da execução no terreno.","Distância geométrica e distância realmente percorrida podem ser muito diferentes."],"simplificacoes":["O terreno foi tratado como plano, regular e sem obstáculos.","A equipe manteve velocidade constante e direção perfeita.","Foram desprezados relevo, vegetação, cursos d’água, visibilidade, clima, fadiga, erros de navegação e probabilidade de detecção."],"matematica":["Sequências e progressões","Plano cartesiano","Geometria analítica","Distância acumulada","Conversão entre distância, velocidade e tempo"],"interdisciplinaridade":["Matemática e Cartografia na leitura de coordenadas.","Geografia na análise do terreno.","Educação Física, orientação e técnicas de busca no planejamento do deslocamento."],"limitesModelo":["A vítima pode se deslocar, e o último ponto conhecido pode conter incerteza.","A escolha real do padrão depende do ambiente, dos recursos, do comportamento da pessoa perdida e do comando da operação."],"seguranca":["Não realize buscas isoladas em mata sem planejamento, comunicação e orientação adequada.","Ao comunicar um desaparecimento, informe o último local conhecido e acione o Corpo de Bombeiros pelo 193."],"reflexaoFinal":"Sequências e coordenadas ganham significado quando ajudam a descrever um procedimento espacial, mas o modelo precisa reconhecer a incerteza presente no ambiente real."},"imagem":"./assets/embedded/afaa79ea258bda8258e9.webp"},{"titulo":"🔥 Missão 5: Combate ao Incêndio","contexto":"Um galpão apresenta 400 m² de área em chamas. O combate reduz o incêndio, mas, durante os deslocamentos para reabastecimento, o fogo volta a se espalhar.","objetivo":"Modelar a evolução do incêndio por funções lineares por partes e calcular o consumo total de água até a extinção.","dados":["Área inicial do incêndio: 400 m<sup>2</sup>.","Durante o combate, a área diminui 11 m<sup>2</sup> por minuto.","Durante a ausência da equipe, a área aumenta 15 m<sup>2</sup> por minuto.","Vazão de combate: 250 L/min.","Cada carga completa permite 20 minutos de combate, totalizando 5.000 L.","Cada deslocamento para reabastecimento e retorno dura 5 minutos."],"modelo":"Atualize a área ao final de cada fase. No combate: <code>A(t) = A<sub>0</sub> − 11t</code>. Na ausência: <code>A(t) = A<sub>0</sub> + 15t</code>. O consumo é <code>V = 250t</code>.","tarefa":"Determine o volume total de água consumido até que a área em chamas chegue a zero.","nota":"Considere que a última carga pode ser utilizada apenas parcialmente e que não há consumo de água durante o reabastecimento.","icone":"🔥","heroLabel":"Missão 5","dicas":["Calcule a área restante depois dos primeiros 20 minutos de combate usando A = A₀ − 11 × 20.","Durante cada reabastecimento, some à área resultante o crescimento ocorrido em 5 minutos: 15 × 5. Repita esse ciclo enquanto for necessária uma carga completa.","Na última etapa, calcule apenas o tempo necessário para levar a área restante exatamente a zero. O consumo de água é 250 L por minuto apenas durante o combate."],"debriefing":{"contextoOperacional":"A evolução do incêndio foi representada por taxas lineares distintas durante o combate e durante o reabastecimento. O problema exigiu acompanhar a área em chamas e o consumo de água ao longo de fases sucessivas.","reflexoes":["Um incêndio é um fenômeno dinâmico; sua evolução resulta da interação entre combustível, oxigênio, calor, geometria e ações de combate.","Taxas ajudam a compreender tendências, mas não garantem previsões exatas."],"simplificacoes":["A redução e o crescimento da área foram tratados por taxas constantes.","A vazão, a duração do reabastecimento e a eficiência do combate foram consideradas fixas.","Foram desprezados carga de incêndio variável, tipos de materiais, ventilação, colapso estrutural, propagação tridimensional, vento, temperatura e perdas hidráulicas."],"matematica":["Funções lineares por partes","Taxas de variação","Razões e proporções","Sequências de fases","Inequações e unidades de área, tempo e volume"],"interdisciplinaridade":["Matemática na construção do modelo.","Física na análise de calor, vazão e transferência de energia.","Química na combustão e nos materiais.","Engenharia e segurança contra incêndio na avaliação da edificação."],"limitesModelo":["A velocidade de propagação depende dos materiais e de sua carga de incêndio, da ventilação e da geometria do ambiente.","O cálculo didático não determina estratégia, vazão operacional, segurança estrutural ou quantidade real de recursos."],"seguranca":["Em caso de incêndio, abandone o local com segurança, não retorne para buscar objetos e não tente combater chamas desenvolvidas.","Acione o Corpo de Bombeiros pelo 193 e informe endereço, riscos e presença de pessoas."],"reflexaoFinal":"A modelagem permite investigar relações entre tempo, área e recursos, mas decisões reais exigem informações que o modelo deliberadamente não incorporou."},"imagem":"./assets/embedded/9b56d9c7db1c014972a2.webp"},{"titulo":"💧 Missão 6: Busca Aquática em Cachoeira","contexto":"Uma dupla de mergulhadores precisa cobrir integralmente uma área retangular do poço, seguindo faixas paralelas em padrão de zigue-zague.","objetivo":"Relacionar área, largura de varredura, distância percorrida, velocidade e tempo mínimo de busca.","dados":["Área retangular: 80 m × 30 m.","Largura efetiva de cada faixa de varredura: 3 m.","Velocidade média adotada para a equipe: 10 m/min.","O modelo considera a cobertura equivalente área ÷ largura da faixa."],"modelo":"Calcule a distância principal de varredura por <code>d = área ÷ largura da faixa</code> e, em seguida, <code>t = d ÷ velocidade</code>.","tarefa":"Informe o tempo mínimo, em minutos, suficiente para completar toda a varredura.","nota":"Para manter o modelo didático do simulador, o tempo de reposicionamento entre faixas é desprezado.","icone":"💧","heroLabel":"Missão 6","dicas":["Calcule inicialmente a área total do retângulo: 80 × 30.","Divida essa área pela largura efetiva de cada faixa, 3 m, para obter a distância principal de varredura.","Divida a distância pela velocidade de 10 m/min. Neste modelo, não acrescente tempo de reposicionamento entre as faixas."],"debriefing":{"contextoOperacional":"A área de busca subaquática foi dividida em faixas paralelas. A missão relacionou área, largura de cobertura, distância total, velocidade e tempo mínimo de varredura.","reflexoes":["Cobrir sistematicamente uma área exige planejamento para evitar lacunas e repetições.","O tempo calculado representa uma referência ideal, não a duração garantida de uma operação."],"simplificacoes":["A área foi tratada como retangular, plana e totalmente acessível.","A largura de varredura e a velocidade foram consideradas constantes.","Foi desprezado o tempo de mudança entre faixas, além de correnteza, profundidade variável, baixa visibilidade, obstáculos, comunicação e fadiga."],"matematica":["Área de retângulos","Razões e proporções","Cobertura por faixas","Distância, velocidade e tempo","Estimativa operacional"],"interdisciplinaridade":["Matemática e Física no cálculo de cobertura e deslocamento.","Geografia e Ciências Ambientais na leitura do corpo d’água.","Mergulho, Medicina e salvamento aquático na gestão dos riscos humanos."],"limitesModelo":["A largura efetiva de busca depende da visibilidade, da técnica, dos equipamentos e das condições da água.","Operações subaquáticas exigem controle de profundidade, tempo de fundo, gases, comunicação, reserva e suporte de superfície."],"seguranca":["Não mergulhe ou entre em cachoeiras, poços e águas turvas para realizar buscas improvisadas.","Afaste-se de áreas de correnteza e acione o Corpo de Bombeiros pelo telefone 193."],"reflexaoFinal":"A estimativa matemática organiza recursos e expectativas, mas a segurança e a qualidade da varredura dependem de variáveis humanas e ambientais não representadas no cálculo."},"imagem":"./assets/embedded/33de4ba87aade36c4e54.webp"},null,null,null,null,null,null,null,null]};
const POSICOES_POR_NIVEL = {"1":[{"angulo":-90,"raio":250,"anel":"interno"},{"angulo":-64.28571428571428,"raio":390,"anel":"externo"},{"angulo":-38.57142857142857,"raio":250,"anel":"interno"},{"angulo":-12.857142857142854,"raio":390,"anel":"externo"},{"angulo":12.857142857142861,"raio":250,"anel":"interno"},{"angulo":38.57142857142858,"raio":390,"anel":"externo"},{"angulo":64.28571428571428,"raio":250,"anel":"interno"},{"angulo":90,"raio":390,"anel":"externo"},{"angulo":115.71428571428572,"raio":250,"anel":"interno"},{"angulo":141.42857142857144,"raio":390,"anel":"externo"},{"angulo":167.14285714285717,"raio":250,"anel":"interno"},{"angulo":192.8571428571429,"raio":390,"anel":"externo"},{"angulo":218.57142857142856,"raio":250,"anel":"interno"},{"angulo":244.28571428571428,"raio":390,"anel":"externo"}],"2":[{"angulo":-90,"raio":250,"anel":"interno"},{"angulo":-64.28571428571428,"raio":390,"anel":"externo"},{"angulo":-38.57142857142857,"raio":250,"anel":"interno"},{"angulo":-12.857142857142854,"raio":390,"anel":"externo"},{"angulo":12.857142857142861,"raio":250,"anel":"interno"},{"angulo":38.57142857142858,"raio":390,"anel":"externo"},{"angulo":64.28571428571428,"raio":250,"anel":"interno"},{"angulo":90,"raio":390,"anel":"externo"},{"angulo":115.71428571428572,"raio":250,"anel":"interno"},{"angulo":141.42857142857144,"raio":390,"anel":"externo"},{"angulo":167.14285714285717,"raio":250,"anel":"interno"},{"angulo":192.8571428571429,"raio":390,"anel":"externo"},{"angulo":218.57142857142856,"raio":250,"anel":"interno"},{"angulo":244.28571428571428,"raio":390,"anel":"externo"}]};
let MISSOES = MISSOES_POR_NIVEL[2];
let BRIEFINGS = BRIEFINGS_POR_NIVEL[2];
let POSICOES_OCORRENCIAS = POSICOES_POR_NIVEL[2];
let MISSOES_TOTAL = MISSOES.length;
let MISSOES_PRONTAS = MISSOES.filter(m=>m.pronta).length;
const AUDIO_B64 = {"menu":"./assets/audio/menu-18f7c758f7.mp3","promocao":"./assets/audio/promocao-afa04d99c4.mp3","musica_0":"./assets/audio/musica_0-21c4c559bb.mp3","musica_1":"./assets/audio/musica_1-ad1dfe6586.mp3","musica_2":"./assets/audio/musica_2-cdb963151b.mp3","musica_3":"./assets/audio/musica_3-8d54dae833.mp3","musica_4":"./assets/audio/musica_4-449b848576.mp3","musica_5":"./assets/audio/musica_5-f5fc8b46ec.mp3","chamada_0":"./assets/audio/chamada_0-889b974a0a.mp3","chamada_1":"./assets/audio/chamada_1-1299c56005.mp3","chamada_2":"./assets/audio/chamada_2-d2a2e66a16.mp3","chamada_3":"./assets/audio/chamada_3-f8d72fdc83.mp3","chamada_4":"./assets/audio/chamada_4-c6d59dd1b8.mp3","chamada_5":"./assets/audio/chamada_5-34ffef6bff.mp3"};
let nomeJogador="";
let nivelAtual=null;
let missaoAtual=null;
let animando=false;
let sireneAudioCtx=null;
const AUDIO_CONFIG=Object.freeze({
  dispatchFallbackMs:9000,
  volumes:Object.freeze({"menu":0.45,"promotion":0.55,"dispatchCall":0.85,"mission":0.45}),
  siren:Object.freeze({
    lowFrequencyHz:600,
    frequencyOffsetHz:5,
    durationSeconds:1,
    initialGain:0.1,
    finalGain:0.001,
    frequencyTimeline:Object.freeze([{"hz":900,"atSeconds":0.15},{"hz":600,"atSeconds":0.3},{"hz":900,"atSeconds":0.45},{"hz":600,"atSeconds":0.6},{"hz":900,"atSeconds":0.75},{"hz":600,"atSeconds":0.9}])
  })
});
let missionTimerRAF=null;
const PENALIDADE_SAIDA_MS=1200000;
const TEMPO_FADE_TELA_MS=500;
const TEMPO_TOAST_MS=2200;
const TEMPO_SIRENE_VISUAL_MS=1000;
const TEMPO_DESLOCAMENTO_VIATURA_MS=1700;
const TELAS_JOGO=["tela-inicial","tela-modo-individual","tela-modo-pelotao","tela-area-professor","tela-nivel","tela-mapa","tela-briefing","tela-missao"];
const TELAS_FLEX=new Set(["tela-inicial","tela-modo-individual","tela-modo-pelotao","tela-area-professor","tela-nivel","tela-briefing","tela-missao"]);
const IDS_PAINEL_MISSAO=Object.freeze({
  timer:["missionTimer","briefingMissionTimer"],
  tentativas:["missionAttempts","briefingMissionAttempts"],
  penalidades:["missionPenalties","briefingMissionPenalties"],
  status:["missionSolvedStatus","briefingMissionStatus"],
  etapa:["missionStage","briefingMissionStage"]
});
const ESTADO_INICIAL_MISSAO=Object.freeze({"started":false,"elapsedMs":0,"runningSince":null,"attempts":0,"penalties":0,"successDetected":false,"finalMs":0,"status":"Não iniciada","lastTab":"situacao","hintIndex":-1,"hintsUsed":0,"simulatorLoaded":false,"simulatorReportedAttempts":0,"report":null});
function criarEstadoInicialMissao(){return {...ESTADO_INICIAL_MISSAO};}
const ESTADOS_MISSOES_POR_NIVEL=Object.fromEntries(Object.entries(MISSOES_POR_NIVEL).map(([nivel,missoes])=>[nivel,missoes.map(criarEstadoInicialMissao)]));
let ESTADOS_MISSOES=ESTADOS_MISSOES_POR_NIVEL[2];
const NIVEIS_ATIVOS=[1,2];
const NIVEL_PADRAO=2;
const MISSOES_POR_NIVEL_TOTAL=14;
const MISSOES_TOTAL_JOGO=28;
const PATENTES=["Recruta","Soldado","Cabo","Terceiro-Sargento","Segundo-Sargento","Primeiro-Sargento","Subtenente","Aspirante","Segundo-Tenente","Primeiro-Tenente","Capitão","Major","Tenente-Coronel","Coronel"];
const PONTOS_PROMOCAO=15;
const CARREIRA_INICIAL=Object.freeze({rankIndex:0,careerPoints:0,totalCareerPoints:0});
const CARREIRAS_POR_NIVEL=Object.fromEntries(NIVEIS_ATIVOS.map(n=>[n,{...CARREIRA_INICIAL}]));
let patenteIndex=0;
let pontosCarreira=0;
let pontosCarreiraTotal=0;
const MAPA_SIZE=900, CENTRO=450;
/* =========================================================
   ÁUDIO E SIRENE — RUNTIME
   Centraliza trilha do menu, chamadas, trilhas das missões,
   som sintético da sirene e seu estado visual no cabeçalho.
   ========================================================= */

function audioSrc(chave){const dados=AUDIO_B64[chave];return dados||'';}

function chaveAudioMissao(tipo,id){
  const porNivel=`${tipo}_${nivelAtual}_${id}`;
  return AUDIO_B64[porNivel]?porNivel:`${tipo}_${id}`;
}

const audioMenu = new Audio(audioSrc('menu'));
audioMenu.loop = true;
audioMenu.volume = AUDIO_CONFIG.volumes.menu;

const audioPromocao = new Audio(audioSrc('promocao'));
audioPromocao.loop = true;
audioPromocao.volume = AUDIO_CONFIG.volumes.promotion;

let audioMissaoAtual = null;
let audioChamadaAtual = null;
const CACHE_AUDIO_MISSAO=new Map();

function pararAudioObj(audio) {
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch (erro) {
    // A interrupção de áudio é auxiliar e não deve bloquear o jogo.
  }
}

function tocarMenuMusica() {
  audioMenu.currentTime = 0;
  audioMenu.play().catch(() => {});
}

function pararMenuMusica() {
  pararAudioObj(audioMenu);
}

function tocarChamada(id, callback) {
  pararAudioObj(audioChamadaAtual);
  audioChamadaAtual = new Audio(audioSrc(chaveAudioMissao('chamada',id)));
  audioChamadaAtual.volume = AUDIO_CONFIG.volumes.dispatchCall;

  let callbackExecutado = false;
  const prosseguir = () => {
    if (callbackExecutado) return;
    callbackExecutado = true;
    callback();
  };

  audioChamadaAtual.addEventListener('ended', prosseguir, { once: true });
  audioChamadaAtual.addEventListener('error', prosseguir, { once: true });
  audioChamadaAtual.play().catch(prosseguir);
  setTimeout(prosseguir, AUDIO_CONFIG.dispatchFallbackMs);
}

function precarregarAudioMissao(id) {
  const chave=chaveAudioMissao('musica',id);
  const src=audioSrc(chave);
  if(!src)return null;
  if(CACHE_AUDIO_MISSAO.has(chave))return CACHE_AUDIO_MISSAO.get(chave);
  const audio=new Audio();
  audio.preload='auto';
  audio.src=src;
  audio.loop=true;
  audio.volume=AUDIO_CONFIG.volumes.mission;
  try{audio.load();}catch(_erro){}
  CACHE_AUDIO_MISSAO.set(chave,audio);
  return audio;
}

function tocarMusicaMissao(id) {
  pararAudioObj(audioMissaoAtual);
  const chave=chaveAudioMissao('musica',id);
  audioMissaoAtual = CACHE_AUDIO_MISSAO.get(chave) || precarregarAudioMissao(id) || new Audio(audioSrc(chave));
  audioMissaoAtual.currentTime=0;
  audioMissaoAtual.loop = true;
  audioMissaoAtual.volume = AUDIO_CONFIG.volumes.mission;
  audioMissaoAtual.play().catch(() => {});
}

function pararMusicaMissao() {
  pararAudioObj(audioMissaoAtual);
  audioMissaoAtual = null;
}

function tocarSirene() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!sireneAudioCtx) sireneAudioCtx = new AudioContextClass();

    const contexto = sireneAudioCtx;
    const osciladorPrincipal = contexto.createOscillator();
    const osciladorSecundario = contexto.createOscillator();
    const ganho = contexto.createGain();
    const inicio = contexto.currentTime;

    ganho.connect(contexto.destination);
    osciladorPrincipal.connect(ganho);
    osciladorSecundario.connect(ganho);
    osciladorPrincipal.type = 'square';
    osciladorSecundario.type = 'sawtooth';

    [osciladorPrincipal, osciladorSecundario].forEach((oscilador, indice) => {
      const ajuste = indice * AUDIO_CONFIG.siren.frequencyOffsetHz;
      oscilador.frequency.setValueAtTime(AUDIO_CONFIG.siren.lowFrequencyHz + ajuste, inicio);
      AUDIO_CONFIG.siren.frequencyTimeline.forEach(ponto => {
        oscilador.frequency.linearRampToValueAtTime(ponto.hz + ajuste, inicio + ponto.atSeconds);
      });
      oscilador.start(inicio);
      oscilador.stop(inicio + AUDIO_CONFIG.siren.durationSeconds);
    });

    ganho.gain.setValueAtTime(AUDIO_CONFIG.siren.initialGain, inicio);
    ganho.gain.exponentialRampToValueAtTime(
      AUDIO_CONFIG.siren.finalGain,
      inicio + AUDIO_CONFIG.siren.durationSeconds
    );
  } catch (erro) {
    // Falhas do Web Audio não impedem o fluxo visual da ocorrência.
  }
}

function ligarSireneVisual() {
  const luz = document.getElementById('sireneLuz');
  const raio = document.getElementById('sireneRaio');
  const envoltorio = document.querySelector('.header-sirene-wrap');

  if (luz) luz.classList.add('sirene-ligada');
  if (raio) raio.style.display = 'block';
  if (envoltorio) envoltorio.classList.add('sirene-ativa');
}

function desligarSireneVisual() {
  const luz = document.getElementById('sireneLuz');
  const raio = document.getElementById('sireneRaio');
  const envoltorio = document.querySelector('.header-sirene-wrap');

  if (luz) luz.classList.remove('sirene-ligada');
  if (raio) raio.style.display = 'none';
  if (envoltorio) envoltorio.classList.remove('sirene-ativa');
}

/* =========================================================
   MÓDULO DE EXECUÇÃO — ESTADO DAS MISSÕES
   Incorporado ao HTML final pelo build. Mantém uma única fonte para
   cronômetro, tentativas, penalidades e comunicação dos simuladores.
   ========================================================= */

function obterEstadoMissao(id=missaoAtual){
  return Number.isInteger(id) && ESTADOS_MISSOES[id] ? ESTADOS_MISSOES[id] : null;
}

function tempoAtualMissao(id=missaoAtual){
  const e=obterEstadoMissao(id); if(!e)return 0;
  return e.elapsedMs+(e.runningSince!==null?Date.now()-e.runningSince:0);
}

function statusPadraoMissao(id,etapa){
  const e=obterEstadoMissao(id);
  if(!e)return '';
  if(MISSOES[id].resolvida)return 'Concluída';
  if(e.successDetected)return 'Solução validada';
  return etapa==='Simulador'?'Em andamento':'Lendo o enunciado';
}

function definirTexto(ids,valor){
  ids.forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=String(valor);});
}

function resetarEstadoMissao(estado){
  Object.assign(estado,{
    started:false,elapsedMs:0,runningSince:null,attempts:0,penalties:0,
    successDetected:false,finalMs:0,status:'Não iniciada',lastTab:'situacao',
    hintIndex:-1,hintsUsed:0,simulatorLoaded:false,simulatorReportedAttempts:0,report:null
  });
}

function atualizarPainelMissao(etapa=null,status=null,id=missaoAtual){
  const e=obterEstadoMissao(id); if(!e)return;
  if(status)e.status=status;
  const tempo=e.successDetected||MISSOES[id].resolvida?(e.finalMs||e.elapsedMs):tempoAtualMissao(id);
  definirTexto(IDS_PAINEL_MISSAO.timer,formatTime(tempo));
  definirTexto(IDS_PAINEL_MISSAO.tentativas,e.attempts);
  definirTexto(IDS_PAINEL_MISSAO.penalidades,e.penalties);
  definirTexto(IDS_PAINEL_MISSAO.status,e.status||statusPadraoMissao(id,etapa));
  if(etapa){
    definirTexto(IDS_PAINEL_MISSAO.etapa,etapa);
  }
  const title=document.getElementById('missionTitle'); if(title)title.textContent=MISSOES[id].titulo;
  const concluir=document.getElementById('btnConcluir');
  if(concluir){
    const conclusaoNoRelatorio=id>=0&&id<6;
    concluir.style.display=conclusaoNoRelatorio?'none':'';
    concluir.disabled=conclusaoNoRelatorio||!(e.successDetected||MISSOES[id].resolvida);
    concluir.textContent=MISSOES[id].resolvida?'✓ Missão concluída':(e.successDetected?'✓ Concluir missão':'✓ Concluir');
  }
  const reiniciar=document.getElementById('btnReiniciarSimulador');
  if(reiniciar)reiniciar.disabled=!!(e.successDetected||MISSOES[id].resolvida);
}

function iniciarTimerMissao(id=missaoAtual){
  const e=obterEstadoMissao(id); if(!e||MISSOES[id].resolvida||e.successDetected)return;
  if(!e.started){e.started=true;e.elapsedMs=0;e.attempts=0;e.penalties=0;}
  if(e.runningSince===null)e.runningSince=Date.now();
  pararTimerMissao();
  const tick=()=>{
    if(missaoAtual!==null)atualizarPainelMissao(null,null,missaoAtual);
    missionTimerRAF=requestAnimationFrame(tick);
  };
  tick();
}

function pausarTimerMissao(id=missaoAtual){
  const e=obterEstadoMissao(id); if(!e)return;
  if(e.runningSince!==null){e.elapsedMs+=Date.now()-e.runningSince;e.runningSince=null;}
  pararTimerMissao();
}

function pararTimerMissao(){
  if(missionTimerRAF)cancelAnimationFrame(missionTimerRAF);
  missionTimerRAF=null;
}


function sincronizarEstadoComSimulador(frame,id,e){
  if(!frame||!frame.contentWindow||!e)return;
  const elapsed=e.successDetected||MISSOES[id].resolvida?(e.finalMs||e.elapsedMs):tempoAtualMissao(id);
  try{
    frame.contentWindow.postMessage({
      type:'mission-state-sync',
      missionId:id,
      elapsedMs:elapsed,
      attempts:e.attempts,
      penalties:e.penalties,
      success:!!e.successDetected,
      resolved:!!MISSOES[id].resolvida
    },'*');
  }catch(_){ }
}

window.addEventListener('message',(ev)=>{
  const frame=Array.from(document.querySelectorAll('.mission-frame')).find(f=>f.contentWindow===ev.source);
  if(!frame)return;
  const id=Number(frame.dataset.missionId),level=Number(frame.dataset.level),data=ev.data||{};
  if(level!==nivelAtual)return;
  const e=obterEstadoMissao(id);
  if(!e||Number(data.missionId)!==id)return;
  const mensagemEstado=data.type==='mission-status';
  const pedidoConclusao=data.type==='mission-complete-request';
  if(!mensagemEstado&&!pedidoConclusao)return;
  if(Number.isFinite(data.attempts)){
    const informado=Math.max(0,Math.floor(data.attempts));
    if(informado>=e.simulatorReportedAttempts){
      e.attempts+=informado-e.simulatorReportedAttempts;
      e.simulatorReportedAttempts=informado;
    }else{
      e.simulatorReportedAttempts=informado;
    }
    if(id===missaoAtual)atualizarPainelMissao('Simulador',e.successDetected?'Solução validada':'Tentativa registrada',id);
  }
  if(data.success&&!MISSOES[id].resolvida&&!e.successDetected){
    pausarTimerMissao(id);pararMusicaMissao();e.successDetected=true;e.finalMs=e.elapsedMs;e.status='Solução validada — conclua a missão';
    if(id===missaoAtual){atualizarPainelMissao('Simulador',e.status,id);setTimeout(()=>abrirRelatorioReflexoes(id,false),160);}
  }
  if(pedidoConclusao&&id>=0&&id<6&&e.successDetected&&!MISSOES[id].resolvida){
    resolverMissao(id);
  }
  sincronizarEstadoComSimulador(frame,id,e);
});

/* =========================================================
   PERSISTÊNCIA LOCAL E PORTABILIDADE — FASE 28D
   Progresso separado pelos dois níveis atuais, com migração transitória
   dos formatos legados usados antes da reestruturação 2 × 14.
   ========================================================= */
const PROGRESS_STORAGE_KEY='operacao-salvamento:progresso:v1';
const PROGRESS_SCHEMA_VERSION=5;
const PROGRESS_STRUCTURE_VERSION=2;
const PROGRESS_EXPORT_FORMAT='operacao-salvamento-progress';
const PROGRESS_EXPORT_VERSION=3;
const PROGRESS_EXPORT_VERSIONS_ACCEPTED=new Set([1,2,3]);
let ultimoSalvamentoLocal=null;
let restauracaoLocalEmAndamento=false;

/* FASE 27 — seletor de arquivos robusto.
   O listener é garantido no próprio gesto do usuário, antes de abrir o
   seletor nativo. Isso evita depender exclusivamente do DOMContentLoaded.
   showPicker() é usado quando disponível, com fallback para click(). */
function garantirImportadorArquivo(input,handler,chave){
  if(!input||typeof handler!=='function')return false;
  const id=String(chave||handler.name||'arquivo');
  if(input.dataset.importadorArquivo!==id){
    input.addEventListener('change',handler);
    input.dataset.importadorArquivo=id;
  }
  return true;
}
function abrirSeletorArquivoSeguro(input,handler,chave){
  if(!garantirImportadorArquivo(input,handler,chave))return false;
  input.value='';
  if(typeof input.showPicker==='function'){
    try{input.showPicker();return true;}catch(erro){console.debug('showPicker indisponível; usando click().',erro);}
  }
  input.click();
  return true;
}

function clonarDadoPersistente(valor){return valor==null?null:JSON.parse(JSON.stringify(valor));}

function estadoMissaoParaPersistencia(estado,missao){
  const concluida=!!missao.resolvida;
  return {started:!!estado.started,elapsedMs:Math.max(0,Math.floor(estado.elapsedMs||0)),attempts:Math.max(0,Math.floor(estado.attempts||0)),penalties:Math.max(0,Math.floor(estado.penalties||0)),successDetected:concluida?true:!!estado.successDetected,finalMs:Math.max(0,Math.floor(estado.finalMs||0)),status:concluida?'Concluída':String(estado.status||'Não iniciada'),lastTab:String(estado.lastTab||'situacao'),hintIndex:Number.isInteger(estado.hintIndex)?estado.hintIndex:-1,hintsUsed:Math.max(0,Math.floor(estado.hintsUsed||0)),simulatorReportedAttempts:Math.max(0,Math.floor(estado.simulatorReportedAttempts||0)),report:estado.report?clonarDadoPersistente(estado.report):null};
}

function serializarNivel(nivel){
  const missoes=MISSOES_POR_NIVEL[nivel],estados=ESTADOS_MISSOES_POR_NIVEL[nivel];
  return missoes.map((missao,id)=>({id,resolved:!!missao.resolvida,state:estadoMissaoParaPersistencia(estados[id],missao)}));
}

function estruturaAtualProgresso(){return {version:PROGRESS_STRUCTURE_VERSION,levelIds:[...NIVEIS_ATIVOS],missionsPerLevel:MISSOES_POR_NIVEL_TOTAL,totalMissions:MISSOES_TOTAL_JOGO};}
function carreiraParaPersistencia(carreira){
  return {rankIndex:Math.max(0,Math.min(PATENTES.length-1,Math.floor(carreira?.rankIndex||0))),careerPoints:Math.max(0,Math.floor(carreira?.careerPoints||0)),totalCareerPoints:Math.max(0,Math.floor(carreira?.totalCareerPoints||0))};
}
function carreirasParaPersistencia(){salvarCarreiraNivelAtivo();return Object.fromEntries(NIVEIS_ATIVOS.map(nivel=>[nivel,carreiraParaPersistencia(CARREIRAS_POR_NIVEL[nivel])]));}
function criarSnapshotProgressoLocal(motivo='mapa'){
  const levels=Object.fromEntries(NIVEIS_ATIVOS.map(nivel=>[nivel,{missions:serializarNivel(nivel)}]));
  return {schemaVersion:PROGRESS_SCHEMA_VERSION,gameVersion:'2.5.0',structure:estruturaAtualProgresso(),savedAt:new Date().toISOString(),reason:String(motivo||'mapa'),safeScreen:'mapa',player:{name:String(nomeJogador||''),mode:sessaoPelotaoAtiva?'platoon':'individual',platoon:sessaoPelotaoAtiva?clonarDadoPersistente(sessaoPelotaoAtiva):null},progression:{currentLevel:nivelAtual,careers:carreirasParaPersistencia()},levels};
}

function progressoLocalPodeSerSalvo(){return !!String(nomeJogador||'').trim()&&nivelAtual!==null;}
function salvarProgressoLocal(motivo='mapa'){if(restauracaoLocalEmAndamento||!progressoLocalPodeSerSalvo())return false;try{const snapshot=criarSnapshotProgressoLocal(motivo);localStorage.setItem(chaveProgressoAtual(),JSON.stringify(snapshot));ultimoSalvamentoLocal=snapshot.savedAt;return true;}catch(erro){console.warn('Não foi possível salvar o progresso local.',erro);return false;}}

function validarListaMissoesPersistida(lista){return Array.isArray(lista)&&lista.length===MISSOES_POR_NIVEL_TOTAL&&lista.every((item,id)=>item&&Number(item.id)===id&&typeof item.resolved==='boolean'&&item.state&&typeof item.state==='object');}
function listaVaziaNivel(nivel){return MISSOES_POR_NIVEL[nivel].map((_,id)=>({id,resolved:false,state:estadoMissaoParaPersistencia(criarEstadoInicialMissao(),{resolvida:false})}));}
function ajustarListaLegada(lista,nivel){
  const destino=listaVaziaNivel(nivel);if(!Array.isArray(lista))return destino;
  lista.slice(0,MISSOES_POR_NIVEL_TOTAL).forEach((item,id)=>{if(item&&Number(item.id)===id&&typeof item.resolved==='boolean'&&item.state&&typeof item.state==='object')destino[id]=clonarDadoPersistente(item);});
  return destino;
}
function migrarProgressoLegado(dados){
  const versao=Number(dados?.schemaVersion);if(![1,2,3,4].includes(versao))return null;
  let fundamental,medio,currentLevel=NIVEL_PADRAO;
  if(versao===1){
    fundamental=listaVaziaNivel(1);medio=ajustarListaLegada(dados.missions,2);currentLevel=2;
  }else if(versao===2){
    fundamental=ajustarListaLegada(dados.levels?.[1]?.missions||dados.levels?.['1']?.missions,1);
    medio=ajustarListaLegada(dados.levels?.[3]?.missions||dados.levels?.['3']?.missions,2);
    const legado=Number(dados.progression?.currentLevel);currentLevel=legado===3?2:1;
  }else{
    fundamental=ajustarListaLegada(dados.levels?.[1]?.missions||dados.levels?.['1']?.missions,1);
    medio=ajustarListaLegada(dados.levels?.[2]?.missions||dados.levels?.['2']?.missions,2);
    currentLevel=[1,2].includes(Number(dados.progression?.currentLevel))?Number(dados.progression.currentLevel):NIVEL_PADRAO;
  }
  const careers={1:{rankIndex:0,careerPoints:0,totalCareerPoints:0},2:{rankIndex:0,careerPoints:0,totalCareerPoints:0}};
  if(versao===4){
    // A Fase 28C possuía uma única carreira global. Na migração, ela é associada
    // somente ao nível que estava ativo no salvamento; a outra carreira começa zerada.
    const rankIndex=Math.max(0,Math.min(PATENTES.length-1,Math.floor(dados.progression?.rankIndex||0)));
    const careerPoints=Math.max(0,Math.floor(dados.progression?.careerPoints||0));
    careers[currentLevel]={rankIndex,careerPoints,totalCareerPoints:rankIndex*PONTOS_PROMOCAO+careerPoints};
  }else if(dados.progression){
    const rankIndex=Math.max(0,Math.min(PATENTES.length-1,Math.floor(dados.progression.rankIndex||0)));
    const careerPoints=Math.max(0,Math.floor(dados.progression.careerPoints||0));
    careers[currentLevel]={rankIndex,careerPoints,totalCareerPoints:rankIndex*PONTOS_PROMOCAO+careerPoints};
  }
  return {...dados,schemaVersion:PROGRESS_SCHEMA_VERSION,gameVersion:'2.5.0',structure:estruturaAtualProgresso(),progression:{currentLevel,careers},levels:{1:{missions:fundamental},2:{missions:medio}}};
}
function normalizarProgressoLocal(dados){
  if(!dados)return dados;
  const versao=Number(dados.schemaVersion);
  if(versao<PROGRESS_SCHEMA_VERSION)return migrarProgressoLegado(dados);
  return dados;
}
function validarEstruturaProgressoLocal(entrada){
  const dados=normalizarProgressoLocal(entrada);
  if(!dados||dados.schemaVersion!==PROGRESS_SCHEMA_VERSION||dados.safeScreen!=='mapa'||!dados.player||typeof dados.player.name!=='string'||!dados.player.name.trim()||!dados.progression)return false;
  const currentLevel=Number(dados.progression.currentLevel);if(!NIVEIS_ATIVOS.includes(currentLevel))return false;
  const careers=dados.progression.careers;if(!careers||typeof careers!=='object')return false;
  if(!NIVEIS_ATIVOS.every(n=>{const c=careers[n]||careers[String(n)];return c&&Number.isFinite(Number(c.rankIndex))&&Number.isFinite(Number(c.careerPoints))&&Number.isFinite(Number(c.totalCareerPoints));}))return false;
  const estrutura=dados.structure||{};
  if(Number(estrutura.version)!==PROGRESS_STRUCTURE_VERSION||Number(estrutura.missionsPerLevel)!==MISSOES_POR_NIVEL_TOTAL||Number(estrutura.totalMissions)!==MISSOES_TOTAL_JOGO)return false;
  const ids=Array.isArray(estrutura.levelIds)?estrutura.levelIds.map(Number):[];
  if(ids.length!==NIVEIS_ATIVOS.length||NIVEIS_ATIVOS.some(n=>!ids.includes(n)))return false;
  return NIVEIS_ATIVOS.every(n=>validarListaMissoesPersistida(dados.levels?.[n]?.missions||dados.levels?.[String(n)]?.missions));
}
function lerProgressoLocal(){try{const bruto=localStorage.getItem(chaveProgressoAtual());if(!bruto)return null;const dados=normalizarProgressoLocal(JSON.parse(bruto));return validarEstruturaProgressoLocal(dados)?dados:null;}catch(erro){console.warn('O progresso local salvo está inválido.',erro);return null;}}

function aplicarEstadoMissaoPersistido(destino,origem,resolvida){resetarEstadoMissao(destino);if(!origem)return;destino.started=!!origem.started;destino.elapsedMs=Math.max(0,Math.floor(origem.elapsedMs||0));destino.runningSince=null;destino.attempts=Math.max(0,Math.floor(origem.attempts||0));destino.penalties=Math.max(0,Math.floor(origem.penalties||0));destino.successDetected=resolvida?true:!!origem.successDetected;destino.finalMs=Math.max(0,Math.floor(origem.finalMs||0));destino.status=resolvida?'Concluída':String(origem.status||'Não iniciada');destino.lastTab=['situacao','dados','objetivo','referencia'].includes(origem.lastTab)?origem.lastTab:'situacao';destino.hintIndex=Number.isInteger(origem.hintIndex)?origem.hintIndex:-1;destino.hintsUsed=Math.max(0,Math.floor(origem.hintsUsed??(destino.hintIndex+1)));destino.simulatorLoaded=false;destino.simulatorReportedAttempts=Math.max(0,Math.floor(origem.simulatorReportedAttempts||0));destino.report=origem.report?Object.freeze(clonarDadoPersistente(origem.report)):null;}

function restaurarNivelPersistido(nivel,lista){
  const missoes=MISSOES_POR_NIVEL[nivel],estados=ESTADOS_MISSOES_POR_NIVEL[nivel];
  missoes.forEach((missao,id)=>{const salvo=lista.find(item=>Number(item.id)===id);missao.resolvida=!!salvo?.resolved;aplicarEstadoMissaoPersistido(estados[id],salvo?.state,missao.resolvida);});
}
function restaurarProgressoLocal(entrada=lerProgressoLocal()){
  const dados=normalizarProgressoLocal(entrada);if(!validarEstruturaProgressoLocal(dados))return false;restauracaoLocalEmAndamento=true;
  try{pararTimerMissao();nomeJogador=dados.player.name.trim();missaoAtual=null;animando=false;nivelAtual=null;NIVEIS_ATIVOS.forEach(n=>{const c=dados.progression?.careers?.[n]||dados.progression?.careers?.[String(n)]||CARREIRA_INICIAL;CARREIRAS_POR_NIVEL[n]=carreiraParaPersistencia(c);restaurarNivelPersistido(n,dados.levels[n].missions);});ativarNivel(Number(dados.progression?.currentLevel)||NIVEL_PADRAO);const nomeDisplay=document.getElementById('nome-display');if(nomeDisplay)nomeDisplay.textContent=nomeJogador;const nomeInput=document.getElementById('nome-guerra');if(nomeInput)nomeInput.value=nomeJogador;atualizarPatenteDisplay();atualizarContador();esconderTodas();const mapa=document.getElementById('tela-mapa');if(mapa)mapa.style.display='block';if(typeof agendarPrecarregamentoInsigniasCarreira==='function')agendarPrecarregamentoInsigniasCarreira();ultimoSalvamentoLocal=dados.savedAt||null;tocarMenuMusica();return true;}finally{restauracaoLocalEmAndamento=false;}
}
function formatarDataSalvamentoLocal(valor){if(!valor)return 'data não informada';try{return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(valor));}catch{return String(valor);}}
function oferecerRetomadaProgressoLocal(){const dados=lerProgressoLocal();if(!dados)return;const nivel=Number(dados.progression?.currentLevel)||NIVEL_PADRAO,lista=dados.levels?.[nivel]?.missions||dados.levels?.[String(nivel)]?.missions||[],concluidas=lista.filter(item=>item.resolved).length,rotulo=nivel===1?'Ensino Fundamental':'Ensino Médio';abrirModalInterface({titulo:'Continuar operação salva?',subtitulo:'Progresso encontrado neste dispositivo',icone:'💾',tipo:'success',mensagem:`Foi encontrado um progresso seguro no mapa.<br><br><strong>Nome de guerra:</strong> ${dados.player.name}<br><strong>Nível:</strong> ${rotulo}<br><strong>Missões concluídas:</strong> ${concluidas}/${MISSOES_POR_NIVEL_TOTAL}<br><strong>Último salvamento:</strong> ${formatarDataSalvamentoLocal(dados.savedAt)}.<br><br>Uma missão interrompida deverá ser iniciada novamente.`,textoConfirmar:'Continuar do mapa',textoCancelar:'Agora não',aoConfirmar:()=>restaurarProgressoLocal(dados)});}
function existeMissaoAtivaNaoConcluida(){if(missaoAtual===null||!MISSOES[missaoAtual]||MISSOES[missaoAtual].resolvida)return false;const e=obterEstadoMissao(missaoAtual);return !!(e&&!e.successDetected);}
function escaparHTMLPersistencia(valor){return String(valor??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function normalizarNomeArquivoProgresso(nome){const base=String(nome||'operacao').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48);return base||'operacao';}
function bytesParaHex(buffer){return Array.from(new Uint8Array(buffer)).map(b=>b.toString(16).padStart(2,'0')).join('');}
function checksumFallback(texto){let hash=2166136261;for(let i=0;i<texto.length;i++){hash^=texto.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(16).padStart(8,'0');}
async function calcularIntegridadeProgresso(texto){
  if(globalThis.crypto?.subtle&&globalThis.TextEncoder){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(texto));return {algorithm:'SHA-256',value:bytesParaHex(digest)};}
  return {algorithm:'FNV-1A-32',value:checksumFallback(texto)};
}
async function verificarIntegridadeProgresso(texto,integrity){
  if(!integrity||typeof integrity.value!=='string')return false;
  if(integrity.algorithm==='SHA-256'&&globalThis.crypto?.subtle&&globalThis.TextEncoder)return (await calcularIntegridadeProgresso(texto)).value===integrity.value;
  if(integrity.algorithm==='FNV-1A-32')return checksumFallback(texto)===integrity.value;
  return false;
}
function baixarArquivoProgresso(conteudo,nome){
  const blob=new Blob([conteudo],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');
  link.href=url;link.download=nome;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function resumoProgressoIndividual(dados){
  const nivel=Number(dados.progression?.currentLevel)||NIVEL_PADRAO,lista=dados.levels?.[nivel]?.missions||dados.levels?.[String(nivel)]?.missions||[],concluidas=lista.filter(item=>item?.resolved).length,carreira=dados.progression?.careers?.[nivel]||dados.progression?.careers?.[String(nivel)]||{};
  return {nome:dados.player.name,concluidas,totalMissoes:MISSOES_POR_NIVEL_TOTAL,pontos:Math.max(0,Math.floor(carreira.careerPoints||0)),pontosTotais:Math.max(0,Math.floor(carreira.totalCareerPoints||0)),patenteIndex:Math.max(0,Math.floor(carreira.rankIndex||0)),nivel,savedAt:dados.savedAt||null};
}
function textoResumoProgressoIndividual(resumo){const rotulo=resumo.nivel===1?'Ensino Fundamental':'Ensino Médio';return `<strong>Nome de guerra:</strong> ${escaparHTMLPersistencia(resumo.nome)}<br><strong>Nível atual:</strong> ${rotulo}<br><strong>Patente:</strong> ${escaparHTMLPersistencia(PATENTES[resumo.patenteIndex]||PATENTES[0])}<br><strong>Missões concluídas:</strong> ${resumo.concluidas}/${resumo.totalMissoes}<br><strong>Promoção:</strong> ${resumo.pontos}/${PONTOS_PROMOCAO}<br><strong>Pontos acumulados no nível:</strong> ${resumo.pontosTotais}<br><strong>Último salvamento:</strong> ${formatarDataSalvamentoLocal(resumo.savedAt)}`;}

async function exportarProgressoIndividual(){
  const progresso=lerProgressoLocal();
  if(!progresso){abrirModalInterface({titulo:'Nenhum progresso para exportar',subtitulo:'Cópia de segurança',icone:'📦',somenteAviso:true,mensagem:'Inicie uma operação e retorne ao mapa para criar um salvamento seguro.',textoConfirmar:'Entendi'});return false;}
  try{
    const payload=clonarDadoPersistente(progresso);const payloadText=JSON.stringify(payload);const integrity=await calcularIntegridadeProgresso(payloadText);
    const envelope={format:PROGRESS_EXPORT_FORMAT,formatVersion:PROGRESS_EXPORT_VERSION,exportedAt:new Date().toISOString(),payload,integrity};
    const nome=`${normalizarNomeArquivoProgresso(payload.player.name)}-${new Date().toISOString().slice(0,10)}.operacao-salvamento`;
    baixarArquivoProgresso(JSON.stringify(envelope,null,2),nome);
    abrirModalInterface({titulo:'Progresso exportado',subtitulo:'Cópia de segurança criada',icone:'✅',tipo:'success',somenteAviso:true,mensagem:`O arquivo <strong>${escaparHTMLPersistencia(nome)}</strong> foi gerado.<br><br>Guarde-o para continuar em outro navegador ou dispositivo.`,textoConfirmar:'Concluir'});return true;
  }catch(erro){console.error(erro);abrirModalInterface({titulo:'Não foi possível exportar',subtitulo:'Erro ao gerar o arquivo',icone:'⚠️',tipo:'danger',somenteAviso:true,mensagem:'Tente novamente. O progresso salvo no navegador não foi alterado.',textoConfirmar:'Fechar'});return false;}
}

function selecionarArquivoProgressoIndividual(){return abrirSeletorArquivoSeguro(document.getElementById('input-importar-progresso'),processarArquivoProgressoIndividual,'progresso-individual');}

async function lerArquivoProgressoIndividual(arquivo){
  if(!arquivo)throw new Error('Arquivo não informado.');
  if(arquivo.size>5*1024*1024)throw new Error('Arquivo acima do limite permitido.');
  const texto=await arquivo.text();let envelope;
  try{envelope=JSON.parse(texto);}catch{throw new Error('O arquivo não contém JSON válido.');}
  if(envelope?.format!==PROGRESS_EXPORT_FORMAT||!PROGRESS_EXPORT_VERSIONS_ACCEPTED.has(Number(envelope?.formatVersion)))throw new Error('Formato de progresso incompatível.');
  if(!validarEstruturaProgressoLocal(envelope.payload))throw new Error('Estrutura de progresso inválida ou incompatível.');
  const payloadText=JSON.stringify(envelope.payload);
  if(!(await verificarIntegridadeProgresso(payloadText,envelope.integrity)))throw new Error('A integridade do arquivo não pôde ser confirmada.');
  return clonarDadoPersistente(normalizarProgressoLocal(envelope.payload));
}

function concluirImportacaoProgressoIndividual(dados){
  try{
    localStorage.setItem(chaveProgressoAtual(),JSON.stringify(dados));
    if(!restaurarProgressoLocal(dados))throw new Error('Falha ao restaurar o progresso.');
    salvarProgressoLocal('importacao-progresso');
    abrirModalInterface({titulo:'Progresso importado',subtitulo:'Operação restaurada no mapa',icone:'✅',tipo:'success',somenteAviso:true,mensagem:'A cópia importada foi validada, armazenada neste navegador e aberta em um estado seguro.',textoConfirmar:'Continuar'});return true;
  }catch(erro){console.error(erro);abrirModalInterface({titulo:'Falha na importação',subtitulo:'O progresso atual foi preservado',icone:'⚠️',tipo:'danger',somenteAviso:true,mensagem:'Não foi possível aplicar o arquivo selecionado.',textoConfirmar:'Fechar'});return false;}
}

async function processarArquivoProgressoIndividual(evento){
  const arquivo=evento?.target?.files?.[0];if(!arquivo)return;
  try{
    const importado=await lerArquivoProgressoIndividual(arquivo);const atual=lerProgressoLocal();const resumoImportado=resumoProgressoIndividual(importado);
    if(!atual){abrirModalInterface({titulo:'Importar progresso?',subtitulo:'Cópia válida encontrada',icone:'📥',tipo:'success',mensagem:`${textoResumoProgressoIndividual(resumoImportado)}<br><br>Ao confirmar, esta operação será armazenada neste navegador e aberta no mapa.`,textoConfirmar:'Importar e continuar',aoConfirmar:()=>concluirImportacaoProgressoIndividual(importado)});return;}
    const resumoAtual=resumoProgressoIndividual(atual);const vantagem=(resumoImportado.concluidas-resumoAtual.concluidas)||Math.sign(resumoImportado.pontosTotais-resumoAtual.pontosTotais);
    const aviso=vantagem<0?'<br><br><strong>Atenção:</strong> o arquivo importado parece ter menos progresso que o salvamento atual.':'<br><br>Escolha qual progresso deve permanecer neste navegador.';
    abrirModalInterface({titulo:'Comparar progressos',subtitulo:'O salvamento atual será substituído somente após confirmação',icone:'🔄',mensagem:`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;text-align:left"><div style="padding:12px;border:1px solid rgba(255,255,255,.15);border-radius:10px"><strong>Progresso atual</strong><br>${textoResumoProgressoIndividual(resumoAtual)}</div><div style="padding:12px;border:1px solid rgba(255,255,255,.15);border-radius:10px"><strong>Arquivo importado</strong><br>${textoResumoProgressoIndividual(resumoImportado)}</div></div>${aviso}`,textoConfirmar:'Usar o importado',textoCancelar:'Manter o atual',aoConfirmar:()=>concluirImportacaoProgressoIndividual(importado)});
  }catch(erro){console.warn(erro);abrirModalInterface({titulo:'Arquivo não importado',subtitulo:'Validação do progresso',icone:'⚠️',tipo:'danger',somenteAviso:true,mensagem:`${escaparHTMLPersistencia(erro.message||'O arquivo selecionado é inválido ou incompatível.')}<br><br>O progresso existente neste navegador não foi alterado.`,textoConfirmar:'Fechar'});}
  finally{if(evento?.target)evento.target.value='';}
}

function registrarEventosPortabilidadeProgresso(){garantirImportadorArquivo(document.getElementById('input-importar-progresso'),processarArquivoProgressoIndividual,'progresso-individual');}


/* =========================================================
   MÓDULO DE EXECUÇÃO — PROGRESSO E PONTUAÇÃO
   Incorporado ao HTML final pelo build. Centraliza regras de pontos,
   conclusão de missão, contador e formatação de tempo.
   ========================================================= */

function pontosPorErros(erros){ const e=Math.max(0,Math.floor(erros||0)); if(e===0)return 10; if(e===1)return 8; if(e===2)return 6; if(e===3)return 4; if(e===4)return 2; return 1; }

function pontosPorTempo(ms){ const min=ms/60000; if(min<=5)return 5; if(min<=10)return 4; if(min<=15)return 3; if(min<=20)return 2; return 1; }

function resolverMissao(id,auto=false){
  if(id===null||id===undefined)return;const e=obterEstadoMissao(id);
  if(!auto&&!e.successDetected)return;
  if(MISSOES[id].resolvida){irParaMapaSemPenalidade();return;}
  pausarTimerMissao(id);
  e.finalMs=e.finalMs||e.elapsedMs;
  const erros=Math.max(0,Math.floor(e.attempts||0));
  const dicasUsadas=Math.max(0,Math.floor(e.hintsUsed||0));
  const pTent=pontosPorErros(erros),pTempo=pontosPorTempo(e.finalMs),descontoDicas=dicasUsadas;
  const pontosBase=pTent+pTempo,pontosGanhos=Math.max(0,pontosBase-descontoDicas);
  e.report=Object.freeze({tempo:e.finalMs,erros,penalidades:e.penalties||0,dicasUsadas,pontosErros:pTent,pontosTempo:pTempo,descontoDicas,pontosBase,total:pontosGanhos});e.status='Concluída';MISSOES[id].resolvida=true;
  const el=document.getElementById(`ocorrencia-${id}`);if(el)el.classList.add('completa');desenharRuas();atualizarPainelMissao('Simulador','Concluída',id);atualizarContador();
  pontosCarreira+=pontosGanhos;pontosCarreiraTotal+=pontosGanhos;let promovidoPara=null;
  while(pontosCarreira>=PONTOS_PROMOCAO&&patenteIndex<PATENTES.length-1){pontosCarreira-=PONTOS_PROMOCAO;patenteIndex++;promovidoPara=patenteIndex;}
  salvarCarreiraNivelAtivo();
  atualizarPatenteDisplay();const total=MISSOES.filter(m=>m.resolvida).length;
  const detalheDicas=dicasUsadas?`; dicas: -${descontoDicas} pt${descontoDicas===1?'':'s'}`:'';
  const baseMsg=total===MISSOES_TOTAL?`🎉 Parabéns, ${nomeJogador}! Você completou todas as missões do nível.`:`✅ Missão concluída! +${pontosGanhos} pontos (erros: ${erros} — ${pTent} pts; tempo: ${pTempo} pts${detalheDicas}). Faltam ${MISSOES_TOTAL-total} missões no nível.`;
  irParaMapaSemPenalidade('missao-concluida-relatorio-finalizado');setTimeout(()=>mostrarToast('toast-mapa',baseMsg),300);if(promovidoPara!==null)setTimeout(()=>mostrarPromocao(promovidoPara),1800);
}

function atualizarContador(){ const el=document.getElementById('contador-missoes'); if(el) el.textContent=`${MISSOES.filter(m=>m.resolvida).length}/${MISSOES_TOTAL}`; }

function formatTime(ms){ const seguro=Math.max(0,Math.floor(ms||0)); const h=Math.floor(seguro/3600000), m=Math.floor((seguro%3600000)/60000), s=Math.floor((seguro%60000)/1000); return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }


/* =========================================================
   RELATÓRIO DA MISSÃO E REFLEXÕES
   Painel centralizado de desempenho, debriefing e consulta posterior.
   ========================================================= */
let relatorioMissaoAbertoId=null;
let relatorioMissaoModoConsulta=false;
let relatorioAbaAtual='resultado';

function dadosPontuacaoMissao(id){
  const e=obterEstadoMissao(id); if(!e)return null;
  const erros=Math.max(0,Math.floor(e.attempts||0));
  const tempo=e.finalMs||e.elapsedMs||tempoAtualMissao(id);
  const pontosErros=pontosPorErros(erros),pontosTempo=pontosPorTempo(tempo),dicasUsadas=Math.max(0,Math.floor(e.hintsUsed||0)),descontoDicas=dicasUsadas;
  return {tempo,erros,penalidades:e.penalties||0,dicasUsadas,pontosErros,pontosTempo,descontoDicas,pontosBase:pontosErros+pontosTempo,total:Math.max(0,pontosErros+pontosTempo-descontoDicas)};
}
function listaRelatorio(id,itens){
  const el=document.getElementById(id);if(!el)return;el.innerHTML='';
  (Array.isArray(itens)?itens:[]).forEach(item=>{const li=document.createElement('li');li.textContent=item;el.appendChild(li);});
}
function preencherRelatorioReflexoes(id){
  const e=obterEstadoMissao(id),b=BRIEFINGS[id]||{},d=b.debriefing||{},salvo=e&&e.report;
  const desempenho=salvo||dadosPontuacaoMissao(id); if(!desempenho)return false;
  const titulo=document.getElementById('reportMissionTitle');if(titulo)titulo.textContent=MISSOES[id].titulo;
  definirTexto(['reportMissionTime'],formatTime(desempenho.tempo));
  definirTexto(['reportMissionAttempts'],desempenho.erros);
  definirTexto(['reportMissionPenalties'],desempenho.penalidades);
  definirTexto(['reportMissionAttemptPoints'],desempenho.pontosErros);
  definirTexto(['reportMissionTimePoints'],desempenho.pontosTempo);
  definirTexto(['reportMissionHintsUsed'],Math.max(0,Math.floor(desempenho.dicasUsadas||0)));
  definirTexto(['reportMissionHintDiscount'],`-${Math.max(0,Math.floor(desempenho.descontoDicas||0))}`);
  definirTexto(['reportMissionTotalPoints'],desempenho.total);
  const contexto=document.getElementById('reportOperationalContext');if(contexto)contexto.textContent=d.contextoOperacional||'Reflexão não cadastrada para esta missão.';
  const limites=document.getElementById('reportModelLimitsIntro');if(limites)limites.textContent=d.reflexaoFinal||'';
  listaRelatorio('reportReflections',d.reflexoes);
  listaRelatorio('reportSimplifications',d.simplificacoes);
  listaRelatorio('reportMathematics',d.matematica);
  listaRelatorio('reportInterdisciplinarity',d.interdisciplinaridade);
  listaRelatorio('reportModelLimits',d.limitesModelo);
  listaRelatorio('reportSafety',d.seguranca);
  return true;
}
function abrirAbaRelatorio(aba){
  const validas=['resultado','reflexoes','conteudos','limites','seguranca'];if(!validas.includes(aba))aba='resultado';
  relatorioAbaAtual=aba;
  document.querySelectorAll('.mission-report-tab').forEach(btn=>{const ativo=btn.dataset.reportTab===aba;btn.classList.toggle('ativo',ativo);btn.setAttribute('aria-selected',ativo?'true':'false');});
  document.querySelectorAll('.mission-report-panel').forEach(panel=>{const ativo=panel.dataset.reportPanel===aba;panel.hidden=!ativo;panel.classList.toggle('ativo',ativo);});
  const body=document.querySelector('.mission-report-body');if(body)body.scrollTop=0;
}
function abrirRelatorioReflexoes(id,modoConsulta=false){
  const e=obterEstadoMissao(id);if(!e)return;
  if(modoConsulta&&!MISSOES[id].resolvida)return;
  if(!modoConsulta&&!e.successDetected)return;
  relatorioMissaoAbertoId=id;relatorioMissaoModoConsulta=!!modoConsulta;missaoAtual=id;
  if(!preencherRelatorioReflexoes(id))return;
  const modal=document.getElementById('mission-report-overlay'),btn=document.getElementById('missionReportAction');
  if(!modal||!btn)return;
  btn.disabled=false;btn.textContent=modoConsulta?'← Voltar ao mapa':'✓ Concluir missão';
  const selo=document.getElementById('reportModeBadge');if(selo)selo.textContent=modoConsulta?'Consulta de missão concluída':'Missão concluída — revise os resultados';
  abrirAbaRelatorio('resultado');modal.classList.add('mostrar');document.body.classList.add('report-open');
}
function fecharRelatorioReflexoes(){
  const modal=document.getElementById('mission-report-overlay');if(modal)modal.classList.remove('mostrar');
  document.body.classList.remove('report-open');relatorioMissaoAbertoId=null;relatorioMissaoModoConsulta=false;
}
function acionarBotaoRelatorio(){
  const id=relatorioMissaoAbertoId;if(id===null)return;
  if(relatorioMissaoModoConsulta){fecharRelatorioReflexoes();irParaMapaSemPenalidade('consulta-relatorio-finalizada');return;}
  const btn=document.getElementById('missionReportAction');if(btn){btn.disabled=true;btn.textContent='Concluindo...';}
  fecharRelatorioReflexoes();resolverMissao(id);
}

const PATENTE_IMGS = {"1":"./assets/embedded/802e4bf957152df4c1c3.webp","2":"./assets/embedded/2958c1528a341184ab2d.webp","3":"./assets/embedded/98372c121463f498cabf.webp","4":"./assets/embedded/676f3d09119825b3b9db.webp","5":"./assets/embedded/296aab74a497ac4280ff.webp","6":"./assets/embedded/0730a0e6f047009bc077.webp","7":"./assets/embedded/afb2d2e7e67c50b5a7df.webp","8":"./assets/embedded/02ec900608f2fd1393c7.webp","9":"./assets/embedded/bc8f89fe4114e55aa2b8.webp","10":"./assets/embedded/2052752740aad044522f.webp","11":"./assets/embedded/ebe904c8d1075864b368.webp","12":"./assets/embedded/c4963ea62a87d061efdb.webp","13":"./assets/embedded/bc64d903cf8ca136a4e1.webp"};
Object.assign(AUDIO_B64, {"chamada_1_0":"./assets/audio/chamada_1_0-eb7693ba4a.mp3","musica_1_0":"./assets/audio/musica_1_0-e38971e266.mp3"});
function insigniaSVG(idx){
  if(idx<=0){ return '<span class="insig-vazia">—</span>'; }
  const src = PATENTE_IMGS[idx];
  if(!src){ return '<span class="insig-vazia">—</span>'; }
  return `<img src="${src}" alt="divisa" style="width:100%;height:auto;display:block;">`;
}
function carreiraDoNivel(nivel=nivelAtual){return CARREIRAS_POR_NIVEL[Number(nivel)]||null;}
function salvarCarreiraNivelAtivo(){const c=carreiraDoNivel();if(!c)return false;c.rankIndex=Math.max(0,Math.min(PATENTES.length-1,Math.floor(patenteIndex||0)));c.careerPoints=Math.max(0,Math.floor(pontosCarreira||0));c.totalCareerPoints=Math.max(0,Math.floor(pontosCarreiraTotal||0));return true;}
function carregarCarreiraNivel(nivel){const c=carreiraDoNivel(nivel)||CARREIRA_INICIAL;patenteIndex=Math.max(0,Math.min(PATENTES.length-1,Math.floor(c.rankIndex||0)));pontosCarreira=Math.max(0,Math.floor(c.careerPoints||0));pontosCarreiraTotal=Math.max(0,Math.floor(c.totalCareerPoints||0));return c;}
function resetarCarreirasPorNivel(){NIVEIS_ATIVOS.forEach(n=>{CARREIRAS_POR_NIVEL[n]={...CARREIRA_INICIAL};});patenteIndex=0;pontosCarreira=0;pontosCarreiraTotal=0;}
function atualizarPatenteDisplay(){ document.getElementById('patente-display').textContent=PATENTES[patenteIndex]; const badge=document.getElementById('pontos-carreira-badge'); if(badge)badge.textContent=`${pontosCarreira}/${PONTOS_PROMOCAO}`; const total=document.getElementById('pontos-total-display'); if(total)total.textContent=pontosCarreira; const fill=document.getElementById('promotion-track-fill'); if(fill)fill.style.width=Math.min(100,(pontosCarreira/PONTOS_PROMOCAO)*100)+'%'; const mini=document.getElementById('patente-badge-mini'); if(mini)mini.innerHTML=insigniaSVG(patenteIndex); }
function abrirCarreira(){ if(typeof priorizarPrecarregamentoInsigniasCarreira==='function')priorizarPrecarregamentoInsigniasCarreira(); renderCarreiraLista(); document.getElementById('modal-carreira').classList.add('mostrar'); }
function fecharCarreira(){ document.getElementById('modal-carreira').classList.remove('mostrar'); }
function renderCarreiraLista(){ const lista=document.getElementById('carreira-lista'); lista.innerHTML=''; PATENTES.forEach((nome,idx)=>{ const div=document.createElement('div'); let cls='carreira-item'; if(idx===patenteIndex)cls+=' atual'; else if(idx<patenteIndex)cls+=' conquistada'; div.className=cls; const conquistado = idx<patenteIndex; const atual = idx===patenteIndex; div.innerHTML = `<div class="carreira-insignia">${insigniaSVG(idx)}</div><div class="carreira-nome">${nome}${atual?' (atual)':''}</div>${conquistado?'<div class="carreira-check">✓</div>':''}`; lista.appendChild(div); }); document.getElementById('carreira-progresso-fill').style.width = Math.min(100,(pontosCarreira/PONTOS_PROMOCAO)*100)+'%'; }
function mostrarPromocao(novoIdx){ pararMenuMusica(); audioPromocao.currentTime=0; audioPromocao.play().catch(()=>{}); document.getElementById('promocao-insignia').innerHTML = insigniaSVG(novoIdx); document.getElementById('promocao-texto').textContent = `Parabéns, o senhor foi promovido à patente de ${PATENTES[novoIdx]}. Vamos prosseguir nas missões, senhor(a) ${PATENTES[novoIdx]} ${nomeJogador}.`; document.getElementById('overlay-promocao').classList.add('mostrar'); }
function fecharPromocao(){ document.getElementById('overlay-promocao').classList.remove('mostrar'); pararAudioObj(audioPromocao); tocarMenuMusica(); }

/* POSICIONAMENTO DECLARATIVO DAS OCORRÊNCIAS — FASE 28D
   As 14 posições de cada nível são geradas pelo catálogo em geometria 7 + 7.
   O runtime do mapa resolve também a posição responsiva dos rótulos. */


/* =========================================================
   MAPA DE OCORRÊNCIAS E DESLOCAMENTO DA VIATURA — FASE 28C
   Fonte única para coordenadas, linhas, ícones, seleção de missão,
   animação de despacho e posicionamento responsivo dos rótulos.
   ========================================================= */

const VISUAIS_BASE_OCORRENCIAS = new Map();
let frameResolucaoRotulosMapa=null;

function registrarVisualBaseOcorrencia(elemento){
  if(!elemento||VISUAIS_BASE_OCORRENCIAS.has(elemento.id))return;
  VISUAIS_BASE_OCORRENCIAS.set(elemento.id,{
    className:elemento.className,
    innerHTML:elemento.innerHTML,
    title:elemento.getAttribute('title')||''
  });
}

function renderizarVisualOcorrencia(elemento,missao){
  registrarVisualBaseOcorrencia(elemento);
  const base=VISUAIS_BASE_OCORRENCIAS.get(elemento.id);
  if(!missao.pronta){
    elemento.className='ocorrencia pendente';
    elemento.innerHTML='<div class="oc-pendente-inner"><span class="oc-plus">+</span></div>';
    elemento.setAttribute('title','Em breve');
    return;
  }
  elemento.className=base.className;
  elemento.innerHTML=missao.imagemMapa
    ? `<img class="ocorrencia-img" src="${missao.imagemMapa}" alt="">`
    : base.innerHTML;
  elemento.setAttribute('title',missao.nome||base.title);
  elemento.classList.toggle('completa',!!missao.resolvida);
}

function obterPosicaoOcorrencia(index){
  const posicao=POSICOES_OCORRENCIAS[index];
  if(!posicao){
    console.warn(`Posição não configurada para a ocorrência ${index}.`);
    return null;
  }
  return posicao;
}

function coordenadasMapaDaOcorrencia(index){
  const posicao=obterPosicaoOcorrencia(index);
  if(!posicao)return null;
  const anguloRad=posicao.angulo*Math.PI/180;
  return {
    ...posicao,
    anguloRad,
    xSvg:CENTRO+posicao.raio*Math.cos(anguloRad),
    ySvg:CENTRO+posicao.raio*Math.sin(anguloRad),
    xPercentual:50+(posicao.raio/(MAPA_SIZE/2))*50*Math.cos(anguloRad),
    yPercentual:50+(posicao.raio/(MAPA_SIZE/2))*50*Math.sin(anguloRad)
  };
}

function obterPosicaoRotulo(coordenadas){
  const c=Math.cos(coordenadas.anguloRad);
  const s=Math.sin(coordenadas.anguloRad);
  // Primeira escolha mantém o texto voltado para a área útil do mapa.
  if(s<=-0.55)return 'south';
  if(s>=0.55)return 'north';
  if(c>=0)return 'west';
  return 'east';
}

function direcoesCandidatasRotulo(coordenadas){
  const preferida=obterPosicaoRotulo(coordenadas);
  const porPreferencia={
    south:['south','south-west','south-east','west','east','north-west','north-east','north'],
    north:['north','north-west','north-east','west','east','south-west','south-east','south'],
    west:['west','north-west','south-west','north','south','north-east','south-east','east'],
    east:['east','north-east','south-east','north','south','north-west','south-west','west']
  };
  let candidatos=[...(porPreferencia[preferida]||[preferida,'south','north','west','east'])];
  // No anel interno, as diagonais recebem prioridade maior: elas ocupam os
  // vazios angulares entre os nós dos dois anéis e reduzem colisões de texto.
  if(coordenadas.anel==='interno'){
    const c=Math.cos(coordenadas.anguloRad),s=Math.sin(coordenadas.anguloRad);
    const diagonal=s<0?(c>=0?'south-west':'south-east'):(c>=0?'north-west':'north-east');
    candidatos=[preferida,diagonal,...candidatos];
  }
  return [...new Set(candidatos)];
}

function areaIntersecaoRotulos(a,b,padding=0){
  const left=Math.max(a.left-padding,b.left-padding);
  const right=Math.min(a.right+padding,b.right+padding);
  const top=Math.max(a.top-padding,b.top-padding);
  const bottom=Math.min(a.bottom+padding,b.bottom+padding);
  return Math.max(0,right-left)*Math.max(0,bottom-top);
}

function areaForaDoRetangulo(rect,limite,padding=0){
  const area=Math.max(0,rect.width)*Math.max(0,rect.height);
  const left=Math.max(rect.left,limite.left+padding);
  const right=Math.min(rect.right,limite.right-padding);
  const top=Math.max(rect.top,limite.top+padding);
  const bottom=Math.min(rect.bottom,limite.bottom-padding);
  const dentro=Math.max(0,right-left)*Math.max(0,bottom-top);
  return Math.max(0,area-dentro);
}

function medirRotuloNaDirecao(elemento,rotulo,direcao){
  elemento.dataset.labelPos=direcao;
  rotulo.style.removeProperty('--label-shift-x');
  rotulo.style.removeProperty('--label-shift-y');
  return rotulo.getBoundingClientRect();
}

function resolverRotulosMapa(){
  frameResolucaoRotulosMapa=null;
  const container=document.getElementById('mapa-container');
  if(!container||!container.offsetParent)return;
  const limiteMapa=container.getBoundingClientRect();
  if(limiteMapa.width<1||limiteMapa.height<1)return;
  const limiteViewport={left:0,top:0,right:window.innerWidth,bottom:window.innerHeight};
  const quartel=document.querySelector('#tela-mapa .quartel');
  const rectQuartel=quartel?.getBoundingClientRect()||null;
  const ocorrencias=[...document.querySelectorAll('#tela-mapa .ocorrencia')];
  const rectsIcones=ocorrencias.map(el=>({el,rect:el.getBoundingClientRect()}));
  const itens=MISSOES.map((missao,index)=>{
    const elemento=document.getElementById(`ocorrencia-${index}`);
    const rotulo=elemento?.querySelector('.ocorrencia-label');
    const coordenadas=coordenadasMapaDaOcorrencia(index);
    if(!elemento||!rotulo||!coordenadas)return null;
    rotulo.style.removeProperty('--label-shift-x');
    rotulo.style.removeProperty('--label-shift-y');
    return {missao,index,elemento,rotulo,coordenadas};
  }).filter(Boolean);

  // Missões prontas e nomes maiores recebem prioridade; placeholders se
  // acomodam em torno delas. Isso evita que “Em breve” desloque rótulos úteis.
  itens.sort((a,b)=>Number(b.missao.pronta)-Number(a.missao.pronta)||String(b.missao.nome).length-String(a.missao.nome).length||a.index-b.index);
  const colocados=[];
  for(const item of itens){
    const candidatos=direcoesCandidatasRotulo(item.coordenadas);
    let melhor=null;
    candidatos.forEach((direcao,ordem)=>{
      const rect=medirRotuloNaDirecao(item.elemento,item.rotulo,direcao);
      let score=ordem*18;
      score+=areaForaDoRetangulo(rect,limiteMapa,4)*80;
      score+=areaForaDoRetangulo(rect,limiteViewport,2)*100;
      if(rectQuartel)score+=areaIntersecaoRotulos(rect,rectQuartel,4)*65;
      for(const outro of rectsIcones){
        if(outro.el===item.elemento)continue;
        score+=areaIntersecaoRotulos(rect,outro.rect,4)*55;
      }
      for(const outro of colocados)score+=areaIntersecaoRotulos(rect,outro.rect,5)*120;
      if(!melhor||score<melhor.score)melhor={direcao,score,rect};
    });
    item.elemento.dataset.labelPos=melhor?.direcao||obterPosicaoRotulo(item.coordenadas);
    const rectFinal=item.rotulo.getBoundingClientRect();
    colocados.push({...item,rect:rectFinal});
  }

  // Segunda passagem: pequenos deslocamentos tangenciais resolvem colisões
  // residuais sem afastar o texto de sua ocorrência.
  const maxShift=window.innerWidth<=560?24:window.innerWidth<=900?34:48;
  for(let ciclo=0;ciclo<8;ciclo++){
    let mudou=false;
    for(let i=0;i<colocados.length;i++){
      for(let j=i+1;j<colocados.length;j++){
        const a=colocados[i],b=colocados[j];
        const ra=a.rotulo.getBoundingClientRect(),rb=b.rotulo.getBoundingClientRect();
        if(areaIntersecaoRotulos(ra,rb,4)<=0)continue;
        const mover=!b.missao.pronta||a.missao.pronta?b:a;
        const rectMover=mover.rotulo.getBoundingClientRect();
        const outro=mover===a?rb:ra;
        const dx=(rectMover.left+rectMover.width/2)-(outro.left+outro.width/2);
        const dy=(rectMover.top+rectMover.height/2)-(outro.top+outro.height/2);
        const dir=mover.elemento.dataset.labelPos||'';
        const horizontal=dir==='north'||dir==='south'||dir.includes('north-')||dir.includes('south-');
        const atualX=Number.parseFloat(mover.rotulo.style.getPropertyValue('--label-shift-x'))||0;
        const atualY=Number.parseFloat(mover.rotulo.style.getPropertyValue('--label-shift-y'))||0;
        if(horizontal){
          const passo=(dx>=0?1:-1)*6;
          mover.rotulo.style.setProperty('--label-shift-x',`${Math.max(-maxShift,Math.min(maxShift,atualX+passo))}px`);
        }else{
          const passo=(dy>=0?1:-1)*6;
          mover.rotulo.style.setProperty('--label-shift-y',`${Math.max(-maxShift,Math.min(maxShift,atualY+passo))}px`);
        }
        mudou=true;
      }
    }
    if(!mudou)break;
  }
}

function agendarResolucaoRotulosMapa(){
  if(frameResolucaoRotulosMapa)cancelAnimationFrame(frameResolucaoRotulosMapa);
  frameResolucaoRotulosMapa=requestAnimationFrame(()=>requestAnimationFrame(resolverRotulosMapa));
}

function desenharRuas(){
  const svg=document.getElementById('ruas-svg');
  if(!svg)return;
  svg.innerHTML='';
  MISSOES.forEach((missao,index)=>{
    const coordenadas=coordenadasMapaDaOcorrencia(index);
    if(!coordenadas)return;
    const estado=!missao.pronta?'pendente':(missao.resolvida?'concluida':'disponivel');
    ['rua-borda','rua','rua-faixa'].forEach(classe=>{
      const linha=document.createElementNS('http://www.w3.org/2000/svg','line');
      linha.setAttribute('x1',CENTRO);
      linha.setAttribute('y1',CENTRO);
      linha.setAttribute('x2',coordenadas.xSvg);
      linha.setAttribute('y2',coordenadas.ySvg);
      linha.setAttribute('class',`${classe} ${estado}`);
      svg.appendChild(linha);
    });
  });
}

function posicionarOcorrencias(){
  MISSOES.forEach((missao,index)=>{
    const elemento=document.getElementById(`ocorrencia-${index}`);
    if(!elemento)return;
    const coordenadas=coordenadasMapaDaOcorrencia(index);
    if(!coordenadas)return;
    elemento.style.left=`${coordenadas.xPercentual}%`;
    elemento.style.top=`${coordenadas.yPercentual}%`;
    elemento.dataset.anel=coordenadas.anel;
    elemento.dataset.labelPos=obterPosicaoRotulo(coordenadas);
    renderizarVisualOcorrencia(elemento,missao);
    let rotulo=elemento.querySelector('.ocorrencia-label');
    if(!rotulo){rotulo=document.createElement('div');rotulo.className='ocorrencia-label';elemento.appendChild(rotulo);}
    rotulo.textContent=missao.nome;
    rotulo.style.removeProperty('--label-shift-x');
    rotulo.style.removeProperty('--label-shift-y');
    elemento.classList.toggle('completa',!!missao.resolvida);
  });
  agendarResolucaoRotulosMapa();
}

function registrarEventosMapa(){
  desenharRuas();
  posicionarOcorrencias();
  window.addEventListener('resize',()=>{
    desenharRuas();
    posicionarOcorrencias();
  });
  if(document.fonts?.ready)document.fonts.ready.then(agendarResolucaoRotulosMapa).catch(()=>{});
}

function selecionarMissao(id){
  if(animando)return;
  if(!missaoLiberadaNoPelotao(id)){mostrarToast('toast-mapa','🔒 Missão não liberada nesta atividade.');return;}
  if(!MISSOES[id].pronta){
    mostrarToast('toast-mapa','🚧 Missão em construção — em breve!');
    return;
  }
  if(MISSOES[id].resolvida){
    abrirRelatorioReflexoes(id,true);
    return;
  }
  iniciarSelecaoMissao(id);
}

function iniciarSelecaoMissao(id){
  if(animando)return;
  animando=true;
  missaoAtual=id;
  document.querySelectorAll('.ocorrencia').forEach(ocorrencia=>{
    if(Number.parseInt(ocorrencia.dataset.missao,10)!==id){
      ocorrencia.style.pointerEvents='none';
      ocorrencia.style.opacity='.5';
    }
  });
  pararMenuMusica();
  tocarChamada(id,()=>{
    tocarSirene();
    ligarSireneVisual();
    setTimeout(()=>{
      desligarSireneVisual();
      moverCaminhaoPara(id);
    },TEMPO_SIRENE_VISUAL_MS);
  });
}

function moverCaminhaoPara(id){
  const caminhao=document.getElementById('caminhao');
  const ocorrencia=document.getElementById(`ocorrencia-${id}`);
  const container=document.getElementById('mapa-container');
  if(!caminhao||!ocorrencia||!container){
    animando=false;
    abrirBriefing(id);
    return;
  }
  const areaMapa=container.getBoundingClientRect();
  const areaOcorrencia=ocorrencia.getBoundingClientRect();
  const inicioX=areaMapa.width/2;
  const inicioY=areaMapa.height/2;
  const destinoX=areaOcorrencia.left-areaMapa.left+areaOcorrencia.width/2;
  const destinoY=areaOcorrencia.top-areaMapa.top+areaOcorrencia.height/2;
  const angulo=Math.atan2(destinoY-inicioY,destinoX-inicioX)*180/Math.PI;
  caminhao.style.transition='none';
  caminhao.style.left=`${inicioX}px`;
  caminhao.style.top=`${inicioY}px`;
  caminhao.style.transform=`translate(-50%,-50%) rotate(${angulo}deg)`;
  caminhao.classList.add('visivel');
  void caminhao.offsetWidth;
  caminhao.style.transition='left 1.6s cubic-bezier(.25,.46,.45,.94), top 1.6s cubic-bezier(.25,.46,.45,.94)';
  caminhao.style.left=`${destinoX}px`;
  caminhao.style.top=`${destinoY}px`;
  setTimeout(()=>{
    caminhao.classList.remove('visivel');
    animando=false;
    abrirBriefing(id);
  },TEMPO_DESLOCAMENTO_VIATURA_MS);
}



/* =========================================================
   NAVEGAÇÃO E INTERFACE GERAL — FASE 14.1
   Portal de acesso, modo individual, estrutura do modo pelotão,
   seleção de nível, saída e toasts.
   ========================================================= */

/* FASE 31 — correção do carregamento da carreira.
   As 13 insígnias foram reduzidas para WebP transparente em resolução adequada
   à interface. Como o conjunto agora é pequeno, o download e a decodificação
   começam imediatamente, sem requestIdleCallback nem prioridade baixa. */
const CACHE_PRELOAD_INSIGNIAS=new Map();
let PRELOAD_INSIGNIAS_AGENDADO=false;

function precarregarImagemDecodificada(src,prioridade='high'){
  if(!src)return Promise.resolve(false);
  if(CACHE_PRELOAD_INSIGNIAS.has(src))return CACHE_PRELOAD_INSIGNIAS.get(src);
  const promessa=new Promise(resolve=>{
    const img=new Image();
    try{img.decoding='async';img.fetchPriority=prioridade;}catch(_erro){}
    let finalizado=false;
    const finalizar=async ok=>{
      if(finalizado)return;
      finalizado=true;
      if(ok&&typeof img.decode==='function'){try{await img.decode();}catch(_erro){}}
      resolve(ok);
    };
    img.addEventListener('load',()=>finalizar(true),{once:true});
    img.addEventListener('error',()=>finalizar(false),{once:true});
    img.src=src;
    if(img.complete&&img.naturalWidth>0)finalizar(true);
  });
  CACHE_PRELOAD_INSIGNIAS.set(src,promessa);
  return promessa;
}

function precarregarInsigniasCarreira(prioridade='high'){
  const fontes=Object.values(typeof PATENTE_IMGS==='object'&&PATENTE_IMGS?PATENTE_IMGS:{}).filter(Boolean);
  return Promise.allSettled(fontes.map(src=>precarregarImagemDecodificada(src,prioridade)));
}

function agendarPrecarregamentoInsigniasCarreira(){
  if(PRELOAD_INSIGNIAS_AGENDADO)return;
  PRELOAD_INSIGNIAS_AGENDADO=true;
  return precarregarInsigniasCarreira('high').catch(()=>{});
}

function priorizarPrecarregamentoInsigniasCarreira(){
  PRELOAD_INSIGNIAS_AGENDADO=true;
  return precarregarInsigniasCarreira('high');
}
function mostrarTelaAcesso(id){
  esconderTodas();
  const tela=document.getElementById(id);
  if(!tela)return;
  tela.style.display=TELAS_FLEX.has(id)?'flex':'block';
  tela.classList.add('fade-in');setTimeout(()=>tela.classList.remove('fade-in'),TEMPO_FADE_TELA_MS);
}

function atualizarPainelModoIndividual(){
  const dados=lerProgressoLocal();
  const card=document.getElementById('individual-saved-card');
  if(!card)return;
  card.hidden=!dados;
  if(!dados)return;
  const resumo=resumoProgressoIndividual(dados);
  const nome=document.getElementById('individual-saved-name');
  const texto=document.getElementById('individual-saved-summary');
  if(nome)nome.textContent=resumo.nome;
  if(texto)texto.textContent=`${resumo.concluidas}/${resumo.totalMissoes} missões concluídas · ${PATENTES[resumo.patenteIndex]} · promoção ${resumo.pontos}/${PONTOS_PROMOCAO} · salvo em ${formatarDataSalvamentoLocal(resumo.savedAt)}`;
}

function abrirModoIndividual(){
  sessaoPelotaoAtiva=null;if(typeof atualizarAcoesResultadoPelotao==='function')atualizarAcoesResultadoPelotao();
  atualizarPainelModoIndividual();
  mostrarTelaAcesso('tela-modo-individual');
  setTimeout(()=>document.getElementById('nome-guerra')?.focus(),80);
}
function abrirModoPelotao(){mostrarTelaAcesso('tela-modo-pelotao');renderizarPerfisPelotaoConhecidos();}
function abrirAreaProfessor(){
  const home=document.getElementById('teacher-home');
  const wizard=document.getElementById('platoon-wizard');
  const manager=document.getElementById('platoon-results-manager');
  if(wizard)wizard.hidden=true;
  if(manager)manager.hidden=true;
  if(home)home.hidden=false;
  mostrarTelaAcesso('tela-area-professor');
}
function voltarAoPortalInicial(){mostrarTelaAcesso('tela-inicial');}
function continuarOperacaoSalvaIndividual(){
  const dados=lerProgressoLocal();
  if(!dados){atualizarPainelModoIndividual();abrirModalInterface({titulo:'Progresso não encontrado',subtitulo:'Modo individual',icone:'⚠️',somenteAviso:true,mensagem:'Não há uma operação válida salva neste navegador.',textoConfirmar:'Fechar'});return false;}
  return restaurarProgressoLocal(dados);
}

function prepararEstadoNovaOperacaoIndividual(){
  pararTimerMissao();pararMenuMusica();pararMusicaMissao();pararAudioObj(audioChamadaAtual);pararAudioObj(audioPromocao);
  nivelAtual=null;missaoAtual=null;animando=false;resetarCarreirasPorNivel();
  Object.entries(MISSOES_POR_NIVEL).forEach(([nivel,missoes])=>missoes.forEach((missao,id)=>{missao.resolvida=false;resetarEstadoMissao(ESTADOS_MISSOES_POR_NIVEL[nivel][id]);}));
  ativarNivel(NIVEL_PADRAO);
  document.querySelectorAll('.ocorrencia').forEach(el=>el.classList.remove('completa'));
  const frames=document.getElementById('missionFrameContainer');if(frames)frames.innerHTML='';
  atualizarPatenteDisplay();atualizarContador();
}
function confirmarInicioNovaOperacao(nome){
  prepararEstadoNovaOperacaoIndividual();nomeJogador=nome;
  const nomeDisplay=document.getElementById('nome-display');if(nomeDisplay)nomeDisplay.textContent=nomeJogador;
  atualizarPatenteDisplay();trocarTela('tela-modo-individual','tela-nivel');
}
function entrarNoJogo(force=false){
  const input=document.getElementById('nome-guerra');const nome=input?.value.trim()||'';
  if(!nome){if(input){input.style.borderColor='#ff4444';input.placeholder='Digite seu nome!';setTimeout(()=>{input.style.borderColor='';input.placeholder='Ex.: Falcão 07';},1500);}return;}
  const salvo=lerProgressoLocal();
  if(!force&&salvo){
    abrirModalInterface({titulo:'Iniciar uma nova operação?',subtitulo:'Existe um progresso salvo neste dispositivo',icone:'🎮',mensagem:`A operação de <strong>${escaparHTMLPersistencia(salvo.player.name)}</strong> continuará disponível até o novo percurso chegar ao mapa e criar um salvamento.<br><br>Para preservar a operação atual antes de começar outra, use <strong>Exportar progresso</strong>.`,textoConfirmar:'Iniciar nova operação',textoCancelar:'Cancelar',aoConfirmar:()=>confirmarInicioNovaOperacao(nome)});return;
  }
  confirmarInicioNovaOperacao(nome);
}

function voltarTelaInicial(force=false){
  if(!force){abrirModalInterface({titulo:'Encerrar a sessão?',subtitulo:'Retornar à central de acesso',icone:'🚪',mensagem:'O progresso será salvo no último estado seguro e poderá ser retomado posteriormente no modo individual.<br><br>Uma missão ainda em andamento não será salva e precisará ser iniciada novamente.',textoConfirmar:'Salvar e sair',aoConfirmar:()=>voltarTelaInicial(true)});return;}
  if(missaoAtual!==null){const e=obterEstadoMissao();if(e&&e.runningSince!==null)pausarTimerMissao(missaoAtual);}
  pararMenuMusica();pararMusicaMissao();pararAudioObj(audioChamadaAtual);pararAudioObj(audioPromocao);missaoAtual=null;animando=false;
  salvarProgressoLocal('retorno-tela-inicial');const frames=document.getElementById('missionFrameContainer');if(frames)frames.innerHTML='';
  mostrarTelaAcesso('tela-inicial');const input=document.getElementById('nome-guerra');if(input)input.value=nomeJogador||'';atualizarPainelModoIndividual();
}

function esconderTodas(){ TELAS_JOGO.forEach(id=>{ const tela=document.getElementById(id);if(tela)tela.style.display='none'; }); }

function trocarTela(esconderId,mostrarId){ const esconder=document.getElementById(esconderId);if(esconder)esconder.style.display='none'; const mostrar=document.getElementById(mostrarId);if(!mostrar)return; mostrar.style.display=TELAS_FLEX.has(mostrarId)?'flex':'block'; mostrar.classList.add('fade-in'); setTimeout(()=>mostrar.classList.remove('fade-in'),TEMPO_FADE_TELA_MS); }

function ativarNivel(n){
  const nivel=Number(n);
  if(!MISSOES_POR_NIVEL[nivel])return false;
  if(nivelAtual!==null&&Number(nivelAtual)!==nivel)salvarCarreiraNivelAtivo();
  nivelAtual=nivel;
  carregarCarreiraNivel(nivel);
  MISSOES=MISSOES_POR_NIVEL[nivel];
  BRIEFINGS=BRIEFINGS_POR_NIVEL[nivel];
  POSICOES_OCORRENCIAS=POSICOES_POR_NIVEL[nivel];
  ESTADOS_MISSOES=ESTADOS_MISSOES_POR_NIVEL[nivel];
  SIM_URLS=SIM_URLS_POR_NIVEL[nivel];
  MISSOES_TOTAL=MISSOES.length;
  MISSOES_PRONTAS=MISSOES.filter(m=>m.pronta).length;
  missaoAtual=null;
  const frames=document.getElementById('missionFrameContainer');if(frames)frames.innerHTML='';
  desenharRuas();posicionarOcorrencias();atualizarContador();atualizarPatenteDisplay();
  document.querySelectorAll('.ocorrencia').forEach((el,id)=>el.classList.toggle('completa',!!MISSOES[id]?.resolvida));
  if(sessaoPelotaoAtiva)aplicarRestricoesMissoesPelotao();
  return true;
}

function selecionarNivel(n){
  if(!ativarNivel(n))return;
  trocarTela('tela-nivel','tela-mapa');
  agendarPrecarregamentoInsigniasCarreira();
  tocarMenuMusica();
  salvarProgressoLocal('mudanca-de-nivel');
}

function voltarDeNivel(){ trocarTela('tela-nivel','tela-modo-individual');atualizarPainelModoIndividual(); }

function mostrarToast(elId,msg){ const t=document.getElementById(elId); t.textContent=msg; t.classList.add('mostrar'); clearTimeout(t._toastTimeout); t._toastTimeout=setTimeout(()=>t.classList.remove('mostrar'),TEMPO_TOAST_MS); }


/* =========================================================
   APOIO PEDAGÓGICO SOB DEMANDA — FASE 28A
   Catálogo pedagógico separado por Ensino Fundamental e Ensino Médio.
   ========================================================= */
const PEDAGOGICAL_MISSIONS_POR_NIVEL=Object.freeze({
  fundamental:Object.freeze({
    1:Object.freeze({name:'Viatura da Oficina',content:'Malha quadriculada, orientação espacial, sequências e planejamento de movimentos',knowledge:'Localização em malha, direções, antecipação de movimentos e resolução de problemas',objective:'Planejar uma sequência de deslocamentos para reorganizar as viaturas e liberar a viatura 1.',duration:'15–25 min',complexity:'Introdutória',interdisciplinary:'Matemática, logística e educação para o trânsito',use:'Desenvolvimento de orientação espacial, planejamento e raciocínio lógico em situação concreta.'})
  }),
  'ensino-medio':Object.freeze({
    1:Object.freeze({name:'Resgate Animal',content:'Polias, vantagem mecânica, força e comparação de sistemas',knowledge:'Operações, razão, interpretação de grandezas e unidades',objective:'Comparar sistemas de polias, calcular a força necessária e selecionar a configuração mais eficiente.',duration:'15–25 min',complexity:'Intermediária',interdisciplinary:'Matemática e Física',use:'Revisão de proporcionalidade, máquinas simples e tomada de decisão com base em cálculos.'}),
    2:Object.freeze({name:'Resgate na Água',content:'Trigonometria, movimento relativo e decomposição de velocidades',knowledge:'Razões trigonométricas, vetores e interpretação geométrica',objective:'Determinar ângulos de lançamento articulando movimento relativo e decomposição de velocidades.',duration:'20–30 min',complexity:'Avançada',interdisciplinary:'Matemática e Física',use:'Aplicação de trigonometria em um problema dinâmico e contextualizado.'}),
    3:Object.freeze({name:'Galeria Subterrânea',content:'Grafos e caminho euleriano',knowledge:'Organização de redes, contagem de graus e raciocínio lógico',objective:'Reconhecer e construir um caminho euleriano em uma rede representada por um grafo.',duration:'15–25 min',complexity:'Intermediária',interdisciplinary:'Matemática, lógica e planejamento operacional',use:'Introdução ou revisão de grafos, percursos e otimização de rotas.'}),
    4:Object.freeze({name:'Buscas na Mata',content:'Sequências, coordenadas cartesianas, distância e tempo',knowledge:'Plano cartesiano, distância, regularidades e conversão de unidades',objective:'Relacionar sequência de comprimentos, coordenadas, distância acumulada e tempo de deslocamento.',duration:'20–30 min',complexity:'Intermediária',interdisciplinary:'Matemática, Geografia e orientação espacial',use:'Revisão integrada de sequências e geometria analítica em situação de busca.'}),
    5:Object.freeze({name:'Combate ao Incêndio',content:'Funções lineares por partes e consumo acumulado',knowledge:'Função afim, leitura de gráficos, taxas e áreas sob modelos discretizados',objective:'Modelar a evolução do incêndio por funções lineares por partes e calcular o consumo total de água.',duration:'25–35 min',complexity:'Avançada',interdisciplinary:'Matemática, Física e gestão de recursos',use:'Aplicação de funções, taxas de variação e interpretação de modelos.'}),
    6:Object.freeze({name:'Busca Aquática',content:'Área, largura de varredura, distância, velocidade e tempo',knowledge:'Áreas, proporcionalidade, velocidade média e conversão de unidades',objective:'Relacionar área, largura de varredura, distância percorrida, velocidade e tempo mínimo de busca.',duration:'15–25 min',complexity:'Intermediária',interdisciplinary:'Matemática, Física e planejamento de busca',use:'Revisão de grandezas e medidas com foco em planejamento eficiente.'})
  })
});
/* Alias preservado para integrações/validadores legados. */
const PEDAGOGICAL_MISSIONS=PEDAGOGICAL_MISSIONS_POR_NIVEL['ensino-medio'];
const PEDAGOGICAL_GUIDE_SECTIONS=Object.freeze({
  'visao-geral':`<h3>Finalidade do produto</h3><p>O jogo foi concebido como recurso didático gamificado para revisar, integrar e aplicar conhecimentos matemáticos em situações contextualizadas nas atividades do Corpo de Bombeiros.</p><p>A estrutura passa a ser organizada em duas etapas de conhecimentos — <strong>Ensino Fundamental</strong> e <strong>Ensino Médio</strong>. Em cada etapa, as missões serão distribuídas em progressão de complexidade, mobilizando também conhecimentos construídos anteriormente.</p><div class="pedagogy-callout"><strong>Uso recomendado</strong><span>O percurso completo pode ser usado como atividade integradora de revisão; missões isoladas podem apoiar objetivos específicos do professor.</span></div>`,
  'aplicacao':`<h3>Formas de aplicação</h3><h4>Percurso completo</h4><p>Reúne as missões disponíveis como revisão geral e articulada da etapa selecionada. É especialmente adequado para encerramento de etapa, revisão, recuperação ou trabalho interdisciplinar.</p><h4>Missões específicas</h4><p>Permite selecionar somente as ocorrências compatíveis com os conteúdos, habilidades e tempo disponíveis. Cada missão apresenta objetivo, conhecimentos mobilizados, duração estimada e sugestão de uso.</p><h4>Mediação docente</h4><p>Antes da atividade, contextualize o objetivo; durante o jogo, observe estratégias e dificuldades; depois, utilize os relatórios e reflexões para discutir procedimentos, resultados e limites dos modelos.</p>`,
  'avaliacao':`<h3>Acompanhamento pedagógico</h3><p>Tempo, tentativas, dicas, penalidades e pontuação descrevem o percurso no jogo, mas não devem ser interpretados isoladamente como nota ou domínio do conteúdo.</p><ul><li>Analise os resultados em conjunto com os relatórios e as reflexões das missões.</li><li>Use os indicadores para levantar hipóteses e planejar intervenções, não para produzir diagnósticos automáticos.</li><li>Considere conclusão, estratégias, argumentação, revisão de erros e participação nas discussões.</li></ul><div class="pedagogy-callout"><strong>Avaliação formativa</strong><span>O painel apoia a observação e a mediação do professor; não substitui outras evidências de aprendizagem.</span></div>`,
  'privacidade':`<h3>Funcionamento local</h3><p>O modo pelotão utiliza pseudônimos e arquivos locais, sem servidor, banco de dados online ou serviço pago de backend.</p><ul><li>Não informe nomes reais, escola, turma ou e-mails no jogo.</li><li>O professor mantém externamente a correspondência entre estudante e nome de guerra.</li><li>O arquivo administrativo deve permanecer com o professor.</li><li>Os estudantes recebem o arquivo coletivo e somente sua própria credencial.</li><li>Os resultados são exportados pelos estudantes e importados localmente pelo professor.</li></ul><p>Essa arquitetura favorece portabilidade, autonomia, longevidade e redução do tratamento de dados pessoais.</p>`
});
function chaveNivelPedagogicoSelecionado(){
  const valor=document.querySelector('input[name="platoon-level"]:checked')?.value||'';
  if(valor==='fundamental'||valor==='fundamental-1'||valor==='fundamental-2')return'fundamental';
  if(valor==='ensino-medio')return'ensino-medio';
  return'';
}
function missoesPedagogicasDoNivel(level){
  const chave=(level==='fundamental'||level==='fundamental-1'||level==='fundamental-2')?'fundamental':level==='ensino-medio'?'ensino-medio':'';
  return PEDAGOGICAL_MISSIONS_POR_NIVEL[chave]||Object.freeze({});
}
function renderizarCartoesMissoesPedagogicas(){
  const grid=document.getElementById('mission-pedagogy-grid');if(!grid)return;
  const chave=chaveNivelPedagogicoSelecionado();
  if(!chave){grid.innerHTML='<p class="results-empty">Selecione primeiro a etapa de conhecimentos matemáticos.</p>';return;}
  const missoes=PEDAGOGICAL_MISSIONS_POR_NIVEL[chave];
  const selecionadas=new Set([...document.querySelectorAll('#platoon-mission-selection input:checked')].map(i=>Number(i.value)));
  grid.innerHTML=Object.entries(missoes).map(([id,m])=>`<article class="pedagogy-mission-card"><label><input type="checkbox" value="${id}" ${selecionadas.has(Number(id))?'checked':''} onchange="salvarRascunhoPelotao()"><span><strong>Missão ${id} — ${escaparHTMLPersistencia(m.name)}</strong><small>${escaparHTMLPersistencia(m.content)}</small></span></label><button type="button" class="pedagogy-detail-toggle" aria-expanded="false" onclick="alternarDetalhePedagogicoMissao(${id},this)">Ver detalhes pedagógicos</button><div id="pedagogy-mission-detail-${id}" class="pedagogy-mission-detail" hidden><dl><div><dt>Objetivo</dt><dd>${escaparHTMLPersistencia(m.objective)}</dd></div><div><dt>Conhecimentos mobilizados</dt><dd>${escaparHTMLPersistencia(m.knowledge)}</dd></div><div><dt>Duração estimada</dt><dd>${m.duration}</dd></div><div><dt>Complexidade</dt><dd>${m.complexity}</dd></div><div><dt>Interdisciplinaridade</dt><dd>${m.interdisciplinary}</dd></div><div><dt>Uso sugerido</dt><dd>${escaparHTMLPersistencia(m.use)}</dd></div></dl></div></article>`).join('');
}
function alternarDetalhePedagogicoMissao(id,botao){
  document.querySelectorAll('.pedagogy-mission-detail').forEach(el=>{if(el.id!==`pedagogy-mission-detail-${id}`)el.hidden=true;});
  document.querySelectorAll('.pedagogy-detail-toggle').forEach(el=>{if(el!==botao){el.setAttribute('aria-expanded','false');el.textContent='Ver detalhes pedagógicos';}});
  const box=document.getElementById(`pedagogy-mission-detail-${id}`);if(!box)return;box.hidden=!box.hidden;botao.setAttribute('aria-expanded',String(!box.hidden));botao.textContent=box.hidden?'Ver detalhes pedagógicos':'Fechar detalhes';
}
function abrirAjudaFormaAplicacao(tipo){
  abrirOrientacoesPedagogicas('aplicacao');
  const content=document.getElementById('pedagogical-guide-content');if(content){const extra=tipo==='completo'?'<div class="pedagogy-callout"><strong>Percurso completo</strong><span>Utilize quando desejar uma revisão integradora dos conhecimentos acumulados na etapa.</span></div>':'<div class="pedagogy-callout"><strong>Missões específicas</strong><span>Utilize quando o objetivo estiver associado a determinados conteúdos, habilidades ou tempo de aula.</span></div>';content.insertAdjacentHTML('afterbegin',extra);}
}
function abrirOrientacoesPedagogicas(aba='visao-geral'){
  const overlay=document.getElementById('pedagogical-guide-overlay');if(!overlay)return;overlay.hidden=false;document.body.classList.add('pedagogical-modal-open');abrirAbaOrientacaoPedagogica(aba);
}
function fecharOrientacoesPedagogicas(event){if(event&&event.target!==event.currentTarget)return;const overlay=document.getElementById('pedagogical-guide-overlay');if(overlay)overlay.hidden=true;document.body.classList.remove('pedagogical-modal-open');}
function abrirAbaOrientacaoPedagogica(aba){
  const key=PEDAGOGICAL_GUIDE_SECTIONS[aba]?aba:'visao-geral';document.querySelectorAll('[data-pedagogy-tab]').forEach(b=>b.classList.toggle('active',b.dataset.pedagogyTab===key));const content=document.getElementById('pedagogical-guide-content');if(content)content.innerHTML=PEDAGOGICAL_GUIDE_SECTIONS[key];
}
function imprimirOrientacoesPedagogicas(){const anterior=document.body.classList.contains('print-pedagogical-guide');document.body.classList.add('print-pedagogical-guide');window.print();if(!anterior)setTimeout(()=>document.body.classList.remove('print-pedagogical-guide'),300);}
function secoesMissoesGuiaPedagogico(){return Object.entries(PEDAGOGICAL_MISSIONS_POR_NIVEL).map(([nivel,missoes])=>{const titulo=nivel==='fundamental'?'Ensino Fundamental':'Ensino Médio';return `<h2 style="color:#d96800">${titulo}</h2>${Object.entries(missoes).map(([id,m])=>`<section style="border:1px solid #ccd5df;border-radius:12px;padding:16px;margin:14px 0"><h3>Missão ${id} — ${m.name}</h3><dl><dt style="font-weight:bold">Conteúdo</dt><dd style="margin:0 0 8px">${m.content}</dd><dt style="font-weight:bold">Objetivo</dt><dd style="margin:0 0 8px">${m.objective}</dd><dt style="font-weight:bold">Conhecimentos mobilizados</dt><dd style="margin:0 0 8px">${m.knowledge}</dd><dt style="font-weight:bold">Duração</dt><dd style="margin:0 0 8px">${m.duration}</dd><dt style="font-weight:bold">Complexidade</dt><dd style="margin:0 0 8px">${m.complexity}</dd><dt style="font-weight:bold">Interdisciplinaridade</dt><dd style="margin:0 0 8px">${m.interdisciplinary}</dd><dt style="font-weight:bold">Uso sugerido</dt><dd style="margin:0 0 8px">${m.use}</dd></dl></section>`).join('')}`;}).join('');}
function guiaPedagogicoHTML(){return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Guia Pedagógico — Operação Salvamento</title></head><body style="font-family:Arial,sans-serif;max-width:900px;margin:40px auto;padding:0 24px;line-height:1.6;color:#142033"><h1 style="color:#d96800">Guia Pedagógico — Operação Salvamento</h1>${Object.values(PEDAGOGICAL_GUIDE_SECTIONS).join('')}<h2 style="color:#d96800">Missões disponíveis</h2>${secoesMissoesGuiaPedagogico()}</body></html>`;}
function baixarGuiaPedagogicoPelotao(){const p=obterPacotePelotao();const nome=slugPelotao(p?.admin?.platoonName||'operacao-salvamento');baixarArquivoPelotao(`${nome}-guia-pedagogico.html`,guiaPedagogicoHTML(),'text/html');}



/* =========================================================
   MODAIS DE INTERFACE
   Componente reutilizável para confirmações e avisos.
   ========================================================= */
let acaoConfirmacaoInterface=null;
let focoAnteriorModalInterface=null;

function abrirModalInterface(opcoes={}){
  const modal=document.getElementById('modal-interface');
  const titulo=document.getElementById('interfaceModalTitle');
  const subtitulo=document.getElementById('interfaceModalSubtitle');
  const mensagem=document.getElementById('interfaceModalMessage');
  const icone=document.getElementById('interfaceModalIcon');
  const btnCancelar=document.getElementById('interfaceModalCancel');
  const btnConfirmar=document.getElementById('interfaceModalConfirm');
  if(!modal)return;
  focoAnteriorModalInterface=document.activeElement;
  acaoConfirmacaoInterface=typeof opcoes.aoConfirmar==='function'?opcoes.aoConfirmar:null;
  titulo.textContent=opcoes.titulo||'Confirmação';
  subtitulo.textContent=opcoes.subtitulo||'Central de Operações';
  mensagem.innerHTML=opcoes.mensagem||'';
  icone.textContent=opcoes.icone||'⚠️';
  btnConfirmar.textContent=opcoes.textoConfirmar||'Confirmar';
  btnCancelar.textContent=opcoes.textoCancelar||'Cancelar';
  const somenteAviso=opcoes.somenteAviso===true;
  btnCancelar.style.display=somenteAviso?'none':'';
  btnConfirmar.className='interface-modal-confirm'+(opcoes.tipo==='danger'?' danger':opcoes.tipo==='success'?' success':'');
  modal.className='interface-modal mostrar'+(opcoes.tipo?' '+opcoes.tipo:'');
  setTimeout(()=>btnConfirmar.focus(),30);
}

function fecharModalInterface(){
  const modal=document.getElementById('modal-interface');
  if(!modal)return;
  modal.className='interface-modal';
  acaoConfirmacaoInterface=null;
  if(focoAnteriorModalInterface&&typeof focoAnteriorModalInterface.focus==='function')focoAnteriorModalInterface.focus();
  focoAnteriorModalInterface=null;
}

function confirmarModalInterface(){
  const acao=acaoConfirmacaoInterface;
  fecharModalInterface();
  if(acao)setTimeout(()=>acao(),0);
}

function registrarEventosModalInterface(){
  const cancelar=document.getElementById('interfaceModalCancel');
  const confirmar=document.getElementById('interfaceModalConfirm');
  const modal=document.getElementById('modal-interface');
  if(cancelar)cancelar.addEventListener('click',fecharModalInterface);
  if(confirmar)confirmar.addEventListener('click',confirmarModalInterface);
  if(modal)modal.addEventListener('click',ev=>{if(ev.target===ev.currentTarget)fecharModalInterface();});
}


/* =========================================================
   ASSISTENTE DE CRIAÇÃO DE PELOTÃO — FASE 28C
   Configuração local, credenciais e arquivos da atividade.
   ========================================================= */
const PLATOON_DRAFT_KEY='operacao-salvamento:platoon-draft:v2';
const PLATOON_DRAFT_LEGACY_KEY='operacao-salvamento:platoon-draft:v1';
const PLATOON_PACKAGE_KEY='operacao-salvamento:platoon-package:v2';
const PLATOON_FILE_SCHEMA_VERSION=2;
const PLATOON_STRUCTURE_VERSION=2;
let etapaAssistentePelotao=1;
let pacotePelotaoGerado=null;
const NOMES_GUERRA_BASE=['Falcão','Lince','Cometa','Águia','Trovão','Sentinela','Raposa','Condor','Jaguar','Centelha','Escudo','Horizonte','Vanguarda','Pioneiro','Guardião','Brasa','Fênix','Estrela','Raio','Montanha'];
const ALFABETO_SENHA='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';


function voltarAreaProfessorContextual(){
  const wizard=document.getElementById('platoon-wizard');
  if(wizard && !wizard.hidden){cancelarCriacaoPelotao();return;}
  const manager=document.getElementById('platoon-results-manager');
  if(manager && !manager.hidden){fecharGestaoResultadosPelotao();return;}
  voltarAoPortalInicial();
}

function iniciarCriacaoPelotao(){
  document.getElementById('teacher-home')?.setAttribute('hidden','');
  document.getElementById('teacher-pedagogical-link')?.setAttribute('hidden','');
  const wizard=document.getElementById('platoon-wizard');if(wizard)wizard.hidden=false;
  document.getElementById('platoon-package-result')?.setAttribute('hidden','');
  carregarRascunhoPelotao();mostrarEtapaPelotao(1);
}
function cancelarCriacaoPelotao(){
  const wizard=document.getElementById('platoon-wizard');if(wizard)wizard.hidden=true;
  document.getElementById('teacher-home')?.removeAttribute('hidden');
  document.getElementById('teacher-pedagogical-link')?.removeAttribute('hidden');
}
function mostrarEtapaPelotao(numero){
  etapaAssistentePelotao=Math.max(1,Math.min(4,numero));
  document.querySelectorAll('[data-wizard-step]').forEach(el=>el.hidden=Number(el.dataset.wizardStep)!==etapaAssistentePelotao);
  const label=document.getElementById('wizard-step-label');if(label)label.textContent=`Etapa ${etapaAssistentePelotao} de 4`;
  const fill=document.getElementById('wizard-progress-fill');if(fill)fill.style.width=`${etapaAssistentePelotao*25}%`;
  const prev=document.getElementById('wizard-prev');if(prev)prev.hidden=etapaAssistentePelotao===1;
  const next=document.getElementById('wizard-next');if(next)next.hidden=etapaAssistentePelotao===4;
  const finish=document.getElementById('wizard-finish');if(finish)finish.hidden=etapaAssistentePelotao!==4;
  esconderErroPelotao();if(etapaAssistentePelotao===4)renderizarRevisaoPelotao();
}
function obterNomesGuerraPelotao(){return (document.getElementById('platoon-members')?.value||'').split(/\r?\n/).map(v=>v.trim()).filter(Boolean);}
function nomesDuplicadosPelotao(nomes){const vistos=new Set(),duplicados=new Set();nomes.forEach(n=>{const k=n.toLocaleLowerCase('pt-BR');if(vistos.has(k))duplicados.add(n);vistos.add(k);});return [...duplicados];}
function atualizarResumoNomesPelotao(){
  const nomes=obterNomesGuerraPelotao(),dup=nomesDuplicadosPelotao(nomes),el=document.getElementById('platoon-members-summary');if(!el)return;
  el.classList.toggle('invalid',dup.length>0);el.textContent=!nomes.length?'Nenhum componente informado.':dup.length?`${nomes.length} nomes informados. Duplicados: ${dup.join(', ')}.`:`${nomes.length} componentes válidos.`;
}
function gerarNomesGuerraPelotao(quantidade=10){
  const usados=new Set(obterNomesGuerraPelotao().map(n=>n.toLowerCase())),gerados=[];
  for(let i=0;gerados.length<quantidade&&i<200;i++){const base=NOMES_GUERRA_BASE[i%NOMES_GUERRA_BASE.length],numero=String(((i*7+3)%97)+1).padStart(2,'0'),nome=`${base} ${numero}`;if(!usados.has(nome.toLowerCase())){usados.add(nome.toLowerCase());gerados.push(nome);}}
  const area=document.getElementById('platoon-members');if(area){const atuais=obterNomesGuerraPelotao();area.value=[...atuais,...gerados].join('\n');}
  atualizarResumoNomesPelotao();salvarRascunhoPelotao();
}
function limparNomesGuerraPelotao(){const area=document.getElementById('platoon-members');if(area)area.value='';atualizarResumoNomesPelotao();salvarRascunhoPelotao();}
function alternarSelecaoMissoesPelotao(){const tipo=document.querySelector('input[name="platoon-route"]:checked')?.value;const box=document.getElementById('platoon-mission-selection');if(box)box.hidden=tipo!=='especificas';if(tipo==='especificas')renderizarCartoesMissoesPedagogicas();}
function alterarNivelPelotao(){const grid=document.getElementById('mission-pedagogy-grid');if(grid)grid.innerHTML='';renderizarCartoesMissoesPedagogicas();salvarRascunhoPelotao();}
function idNivelPelotao(level){return level==='fundamental'?1:level==='ensino-medio'?2:null;}
function estruturaPelotaoAtual(level){return {version:PLATOON_STRUCTURE_VERSION,levelId:idNivelPelotao(level),levels:2,missionsPerLevel:MISSOES_POR_NIVEL_TOTAL,totalMissions:MISSOES_TOTAL_JOGO};}
function coletarRascunhoPelotao(){
  const level=document.querySelector('input[name="platoon-level"]:checked')?.value||'';
  return {schemaVersion:PLATOON_FILE_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,platoonName:document.getElementById('platoon-name')?.value.trim()||'',activityTitle:document.getElementById('platoon-activity-title')?.value.trim()||'',level,levelId:idNivelPelotao(level),members:obterNomesGuerraPelotao(),route:document.querySelector('input[name="platoon-route"]:checked')?.value||'completo',missions:[...document.querySelectorAll('#platoon-mission-selection input:checked')].map(i=>Number(i.value)),updatedAt:new Date().toISOString()};
}
function salvarRascunhoPelotao(){try{localStorage.setItem(PLATOON_DRAFT_KEY,JSON.stringify(coletarRascunhoPelotao()));}catch(e){console.warn('Não foi possível salvar o rascunho do pelotão.',e);}}
function carregarRascunhoPelotao(){
  let d=null;try{d=JSON.parse(localStorage.getItem(PLATOON_DRAFT_KEY)||localStorage.getItem(PLATOON_DRAFT_LEGACY_KEY)||'null');}catch{}if(!d)return;
  const nome=document.getElementById('platoon-name'),titulo=document.getElementById('platoon-activity-title'),membros=document.getElementById('platoon-members');if(nome)nome.value=d.platoonName||'';if(titulo)titulo.value=d.activityTitle||'';if(membros)membros.value=Array.isArray(d.members)?d.members.join('\n'):'';
  const nivelSalvo=(d.level==='fundamental-1'||d.level==='fundamental-2')?'fundamental':d.level;const nivel=document.querySelector(`input[name="platoon-level"][value="${nivelSalvo}"]`);if(nivel)nivel.checked=true;const rota=document.querySelector(`input[name="platoon-route"][value="${d.route}"]`);if(rota)rota.checked=true;
  alternarSelecaoMissoesPelotao();document.querySelectorAll('#platoon-mission-selection input').forEach(i=>i.checked=(d.missions||[]).includes(Number(i.value)));atualizarResumoNomesPelotao();
  if(Number(d.schemaVersion)!==PLATOON_FILE_SCHEMA_VERSION)salvarRascunhoPelotao();
}
function mostrarErroPelotao(msg){const el=document.getElementById('wizard-error');if(el){el.textContent=msg;el.hidden=false;}}
function esconderErroPelotao(){const el=document.getElementById('wizard-error');if(el)el.hidden=true;}
function validarEtapaPelotao(etapa){
  const d=coletarRascunhoPelotao();if(etapa===1){if(d.platoonName.length<3)return'O nome fictício do pelotão deve ter pelo menos 3 caracteres.';if(d.activityTitle.length<3)return'Informe um título para a atividade.';if(!d.level)return'Selecione a etapa de conhecimentos matemáticos.';}
  if(etapa===2){if(!d.members.length)return'Informe ou gere ao menos um nome de guerra.';const dup=nomesDuplicadosPelotao(d.members);if(dup.length)return'Remova os nomes de guerra duplicados antes de continuar.';if(d.members.length>60)return'O primeiro modelo admite até 60 componentes por pelotão.';}
  if(etapa===3&&d.route==='especificas'&&!d.missions.length)return'Selecione ao menos uma missão específica.';return'';
}
function proximaEtapaPelotao(){const erro=validarEtapaPelotao(etapaAssistentePelotao);if(erro){mostrarErroPelotao(erro);return;}salvarRascunhoPelotao();mostrarEtapaPelotao(etapaAssistentePelotao+1);}
function etapaAnteriorPelotao(){salvarRascunhoPelotao();mostrarEtapaPelotao(etapaAssistentePelotao-1);}
function rotuloNivelPelotao(v){return{'fundamental':'Ensino Fundamental','fundamental-1':'Ensino Fundamental','fundamental-2':'Ensino Fundamental','ensino-medio':'Ensino Médio'}[v]||'Não definida';}
function renderizarRevisaoPelotao(){const d=coletarRascunhoPelotao(),el=document.getElementById('platoon-review');if(!el)return;const percurso=d.route==='completo'?'Percurso completo de revisão':`Missões específicas: ${d.missions.join(', ')}`;el.innerHTML=`<dl><div><dt>Pelotão</dt><dd>${escaparHTMLPersistencia(d.platoonName)}</dd></div><div><dt>Atividade</dt><dd>${escaparHTMLPersistencia(d.activityTitle)}</dd></div><div><dt>Etapa</dt><dd>${rotuloNivelPelotao(d.level)}</dd></div><div><dt>Componentes</dt><dd>${d.members.length} nomes de guerra</dd></div><div><dt>Aplicação</dt><dd>${percurso}</dd></div></dl>`;}

function slugPelotao(texto){return String(texto||'pelotao').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,42)||'pelotao';}
function idAleatorio(tamanho=12){const bytes=new Uint32Array(tamanho);if(globalThis.crypto?.getRandomValues)crypto.getRandomValues(bytes);else for(let i=0;i<tamanho;i++)bytes[i]=Math.floor(Math.random()*0xffffffff);return [...bytes].map(n=>ALFABETO_SENHA[n%ALFABETO_SENHA.length]).join('');}
function senhaAleatoria(){return idAleatorio(6);}
function hashCredencial(texto){let h=2166136261;for(let i=0;i<texto.length;i++){h^=texto.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16).padStart(8,'0');}
function baixarArquivoPelotao(nome,conteudo,tipo='application/json'){const blob=new Blob([conteudo],{type:`${tipo};charset=utf-8`}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=nome;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function gerarCredenciaisPelotao(d){const prefixo=slugPelotao(d.platoonName).split('-').map(p=>p[0]).join('').slice(0,3).toUpperCase().padEnd(2,'P');return d.members.map((warName,index)=>{const user=`${prefixo}-${String(index+1).padStart(3,'0')}`,password=senhaAleatoria(),salt=idAleatorio(8);return{warName,user,password,salt,passwordHash:hashCredencial(`${salt}:${password}`)};});}
function textoInstrucoesPelotao(d){return `OPERAÇÃO SALVAMENTO — INSTRUÇÕES DA ATIVIDADE\n\nPelotão: ${d.platoonName}\nAtividade: ${d.activityTitle}\nEtapa: ${rotuloNivelPelotao(d.level)}\n\nPROFESSOR\n1. Guarde o arquivo administrativo em local seguro.\n2. Distribua aos estudantes o arquivo coletivo da atividade.\n3. Entregue a cada estudante somente sua própria credencial.\n4. A correspondência entre nomes reais e nomes de guerra deve permanecer fora do jogo.\n\nESTUDANTE\n1. Abra o jogo e escolha “Participar de um pelotão”.\n2. Importe o arquivo coletivo.\n3. Informe o usuário e a senha recebidos.\n4. O progresso será armazenado localmente no navegador.\n\nObservação: esta autenticação é local e serve para organizar a atividade pedagógica; não deve ser usada para dados sensíveis ou avaliação sigilosa.`;}
function construirPacotePelotao(){
  const d=coletarRascunhoPelotao(),erro=[1,2,3].map(validarEtapaPelotao).find(Boolean);if(erro){mostrarErroPelotao(erro);return null;}
  const missoesDisponiveis=Object.keys(missoesPedagogicasDoNivel(d.level)).map(Number);const platoonId=`PLT-${Date.now().toString(36).toUpperCase()}-${idAleatorio(5)}`,createdAt=new Date().toISOString(),credentials=gerarCredenciaisPelotao(d),missions=d.route==='completo'?missoesDisponiveis:d.missions.filter(id=>missoesDisponiveis.includes(Number(id)));
  const structure=estruturaPelotaoAtual(d.level);
  const collective={fileType:'operacao-salvamento-platoon-access',schemaVersion:PLATOON_FILE_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,platoonId,platoonName:d.platoonName,activityTitle:d.activityTitle,level:d.level,levelId:structure.levelId,route:d.route,missions,createdAt,accounts:credentials.map(c=>({warName:c.warName,user:c.user,salt:c.salt,passwordHash:c.passwordHash}))};
  const admin={fileType:'operacao-salvamento-platoon-admin',schemaVersion:PLATOON_FILE_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,platoonId,platoonName:d.platoonName,activityTitle:d.activityTitle,level:d.level,levelId:structure.levelId,route:d.route,missions,createdAt,credentials:credentials.map(c=>({warName:c.warName,user:c.user,password:c.password})),results:[]};
  const instructions=textoInstrucoesPelotao(d),pedagogicalGuide=guiaPedagogicoHTML();
  return{fileType:'operacao-salvamento-platoon-package',schemaVersion:PLATOON_FILE_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,createdAt,platoonId,collective,admin,credentials:admin.credentials,instructions,pedagogicalGuide};
}
function concluirRascunhoPelotao(){
  salvarRascunhoPelotao();pacotePelotaoGerado=construirPacotePelotao();if(!pacotePelotaoGerado)return;
  try{localStorage.setItem(PLATOON_PACKAGE_KEY,JSON.stringify(pacotePelotaoGerado));}catch(e){console.warn('Não foi possível guardar o pacote localmente.',e);}
  renderizarPacotePelotao();
}
function renderizarPacotePelotao(){
  const p=pacotePelotaoGerado,box=document.getElementById('platoon-package-result');if(!p||!box)return;
  box.hidden=false;document.querySelectorAll('[data-wizard-step]').forEach(el=>el.hidden=true);document.getElementById('wizard-prev').hidden=true;document.getElementById('wizard-next').hidden=true;document.getElementById('wizard-finish').hidden=true;document.getElementById('wizard-step-label').textContent='Pacote gerado';document.getElementById('wizard-progress-fill').style.width='100%';
  const tbody=document.getElementById('platoon-credentials-body');tbody.innerHTML=p.credentials.map(c=>`<tr><td>${escaparHTMLPersistencia(c.warName)}</td><td><code>${escaparHTMLPersistencia(c.user)}</code></td><td><code>${escaparHTMLPersistencia(c.password)}</code></td></tr>`).join('');
  document.getElementById('platoon-package-summary').textContent=`${p.credentials.length} credenciais geradas para ${p.collective.platoonName}.`;
}
function obterPacotePelotao(){if(pacotePelotaoGerado)return pacotePelotaoGerado;try{return JSON.parse(localStorage.getItem(PLATOON_PACKAGE_KEY)||'null');}catch{return null;}}
function baixarArquivoColetivoPelotao(){const p=obterPacotePelotao();if(!p)return;baixarArquivoPelotao(`${slugPelotao(p.collective.platoonName)}.os-pelotao`,JSON.stringify(p.collective,null,2));}
function baixarArquivoAdministrativoPelotao(){const p=obterPacotePelotao();if(!p)return;baixarArquivoPelotao(`${slugPelotao(p.admin.platoonName)}.os-gestao`,JSON.stringify(p.admin,null,2));}
function baixarCredenciaisPelotao(){const p=obterPacotePelotao();if(!p)return;const linhas=['Nome de guerra;Usuário;Senha',...p.credentials.map(c=>[c.warName,c.user,c.password].map(v=>`"${String(v).replaceAll('"','""')}"`).join(';'))];baixarArquivoPelotao(`${slugPelotao(p.admin.platoonName)}-credenciais.csv`,linhas.join('\r\n'),'text/csv');}
function baixarInstrucoesPelotao(){const p=obterPacotePelotao();if(!p)return;baixarArquivoPelotao(`${slugPelotao(p.admin.platoonName)}-instrucoes.txt`,p.instructions,'text/plain');}
function baixarPacoteCompletoPelotao(){const p=obterPacotePelotao();if(!p)return;baixarArquivoPelotao(`${slugPelotao(p.admin.platoonName)}.os-pacote`,JSON.stringify(p,null,2));}
function voltarEdicaoPelotao(){document.getElementById('platoon-package-result')?.setAttribute('hidden','');mostrarEtapaPelotao(4);}
function criarOutroPelotao(){try{localStorage.removeItem(PLATOON_DRAFT_KEY);localStorage.removeItem(PLATOON_DRAFT_LEGACY_KEY);localStorage.removeItem(PLATOON_PACKAGE_KEY);}catch{}pacotePelotaoGerado=null;['platoon-name','platoon-activity-title','platoon-members'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});document.querySelectorAll('input[name="platoon-level"]').forEach(i=>i.checked=false);document.querySelector('input[name="platoon-route"][value="completo"]').checked=true;renderizarCartoesMissoesPedagogicas();document.querySelectorAll('#platoon-mission-selection input').forEach(i=>i.checked=false);document.getElementById('platoon-package-result')?.setAttribute('hidden','');alternarSelecaoMissoesPelotao();atualizarResumoNomesPelotao();mostrarEtapaPelotao(1);}


/* =========================================================
   ACESSO LOCAL AO PELOTÃO — FASE 28C
   Importação do arquivo coletivo, autenticação local e perfis
   separados por pelotão/usuário no mesmo dispositivo.
   A versão 2 explicita a estrutura 2 níveis × 14 missões.
   ========================================================= */
const PLATOON_ACCESS_FILE_TYPE='operacao-salvamento-platoon-access';
const PLATOON_ACCESS_SCHEMA_VERSION=2;
const PLATOON_ACCESS_SCHEMA_VERSIONS_ACCEPTED=new Set([1,2]);
const PLATOON_SESSION_KEY='operacao-salvamento:pelotao:sessao:v2';
const PLATOON_PROFILE_INDEX_KEY='operacao-salvamento:pelotao:perfis:v1';
let arquivoColetivoPelotaoAtivo=null;
let sessaoPelotaoAtiva=null;

function chaveProgressoAtual(){
  if(sessaoPelotaoAtiva?.platoonId&&sessaoPelotaoAtiva?.user)return `${PROGRESS_STORAGE_KEY}:pelotao:${sessaoPelotaoAtiva.platoonId}:${sessaoPelotaoAtiva.user}`;
  return PROGRESS_STORAGE_KEY;
}
function nivelNumericoPelotao(level){
  if(Number(level)===1||level==='fundamental'||level==='fundamental-1')return 1;
  if(Number(level)===2||level==='ensino-medio')return 2;
  return NIVEL_PADRAO;
}
function normalizarNivelArquivoPelotao(level){
  if(level==='fundamental'||level==='fundamental-1'||Number(level)===1)return'fundamental';
  if(level==='ensino-medio'||Number(level)===2||Number(level)===3)return'ensino-medio';
  if(level==='fundamental-2')throw new Error('Este arquivo pertence à antiga estrutura de três níveis. Gere um novo arquivo de pelotão na versão atual.');
  throw new Error('A etapa de conhecimentos matemáticos do arquivo não é reconhecida.');
}
function normalizarMissoesArquivoPelotao(missoes){
  if(!Array.isArray(missoes))throw new Error('A lista de missões do arquivo é inválida.');
  const lista=[...new Set(missoes.map(Number))].filter(Number.isInteger).sort((a,b)=>a-b);
  if(!lista.length||lista.some(id=>id<1||id>MISSOES_POR_NIVEL_TOTAL))throw new Error(`As missões devem estar entre 1 e ${MISSOES_POR_NIVEL_TOTAL}.`);
  return lista;
}
function validarEstruturaArquivoPelotao(d,level){
  if(Number(d.schemaVersion)<2)return true;
  const estrutura=d.structure||{};
  const levelId=nivelNumericoPelotao(level);
  return Number(d.structureVersion||estrutura.version)===PLATOON_STRUCTURE_VERSION&&Number(estrutura.missionsPerLevel)===MISSOES_POR_NIVEL_TOTAL&&Number(estrutura.totalMissions)===MISSOES_TOTAL_JOGO&&Number(d.levelId||estrutura.levelId)===levelId;
}
function normalizarArquivoColetivoPelotao(d){
  if(!d||d.fileType!==PLATOON_ACCESS_FILE_TYPE||!PLATOON_ACCESS_SCHEMA_VERSIONS_ACCEPTED.has(Number(d.schemaVersion)))throw new Error('Arquivo coletivo inválido ou incompatível.');
  if(typeof d.platoonId!=='string'||!d.platoonId||typeof d.platoonName!=='string'||!d.platoonName.trim())throw new Error('Identificação do pelotão ausente.');
  if(!Array.isArray(d.accounts)||!d.accounts.length||d.accounts.some(a=>!a||typeof a.user!=='string'||typeof a.warName!=='string'||typeof a.salt!=='string'||typeof a.passwordHash!=='string'))throw new Error('Credenciais do arquivo coletivo inválidas.');
  const level=normalizarNivelArquivoPelotao(d.level??d.levelId),missions=normalizarMissoesArquivoPelotao(d.missions);
  if(!validarEstruturaArquivoPelotao(d,level))throw new Error('O arquivo usa uma estrutura de jogo diferente de 2 níveis × 14 missões.');
  const structure=estruturaPelotaoAtual(level);
  return {...d,schemaVersion:PLATOON_ACCESS_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,level,levelId:structure.levelId,missions};
}
function validarArquivoColetivoPelotao(d){try{return !!normalizarArquivoColetivoPelotao(d);}catch{return false;}}
function selecionarArquivoColetivoPelotao(){return abrirSeletorArquivoSeguro(document.getElementById('input-arquivo-coletivo-pelotao'),processarArquivoColetivoPelotao,'arquivo-coletivo-pelotao');}
function trocarArquivoColetivoPelotao(){redefinirVisibilidadeSenhaPelotao();arquivoColetivoPelotaoAtivo=null;document.getElementById('platoon-access-login')?.setAttribute('hidden','');document.getElementById('platoon-access-import')?.removeAttribute('hidden');const err=document.getElementById('platoon-login-error');if(err)err.hidden=true;}
async function processarArquivoColetivoPelotao(evento){
  const arquivo=evento?.target?.files?.[0];if(!arquivo)return;
  try{
    if(arquivo.size>2*1024*1024)throw new Error('O arquivo excede o limite permitido.');
    const dados=normalizarArquivoColetivoPelotao(JSON.parse(await arquivo.text()));
    arquivoColetivoPelotaoAtivo=dados;
    document.getElementById('platoon-access-import')?.setAttribute('hidden','');document.getElementById('platoon-access-login')?.removeAttribute('hidden');
    document.getElementById('platoon-loaded-name').textContent=dados.platoonName;
    document.getElementById('platoon-loaded-summary').textContent=`${dados.activityTitle} · ${rotuloNivelPelotao(dados.level)} · ${dados.missions.length} missão(ões) liberada(s)`;
    const user=document.getElementById('platoon-login-user'),pass=document.getElementById('platoon-login-password');redefinirVisibilidadeSenhaPelotao();if(user)user.value='';if(pass)pass.value='';setTimeout(()=>user?.focus(),50);
    renderizarPerfisPelotaoConhecidos();
  }catch(e){abrirModalInterface({titulo:'Arquivo não reconhecido',subtitulo:'Modo pelotão',icone:'⚠️',tipo:'danger',somenteAviso:true,mensagem:escaparHTMLPersistencia(e.message||'Não foi possível abrir o arquivo.'),textoConfirmar:'Fechar'});}
  finally{if(evento?.target)evento.target.value='';}
}
function verificarSenhaPelotao(conta,senha){return hashCredencial(`${conta.salt}:${senha}`)===conta.passwordHash;}
function indicePerfisPelotao(){try{const d=JSON.parse(localStorage.getItem(PLATOON_PROFILE_INDEX_KEY)||'[]');return Array.isArray(d)?d:[];}catch{return[];}}
function registrarPerfilPelotao(sessao){const lista=indicePerfisPelotao().filter(p=>!(p.platoonId===sessao.platoonId&&p.user===sessao.user));lista.unshift({platoonId:sessao.platoonId,platoonName:sessao.platoonName,user:sessao.user,warName:sessao.warName,level:sessao.level,levelId:sessao.levelId,lastAccess:new Date().toISOString()});try{localStorage.setItem(PLATOON_PROFILE_INDEX_KEY,JSON.stringify(lista.slice(0,20)));}catch{}}
function renderizarPerfisPelotaoConhecidos(){const box=document.getElementById('platoon-known-profiles'),list=document.getElementById('platoon-known-profiles-list');if(!box||!list)return;const perfis=indicePerfisPelotao().filter(p=>!arquivoColetivoPelotaoAtivo||p.platoonId===arquivoColetivoPelotaoAtivo.platoonId);box.hidden=!perfis.length;list.innerHTML=perfis.map(p=>`<button type="button" onclick="preencherUsuarioPelotao('${escaparHTMLPersistencia(p.user)}')"><strong>${escaparHTMLPersistencia(p.warName)}</strong><small>${escaparHTMLPersistencia(p.platoonName)} · ${escaparHTMLPersistencia(p.user)}</small></button>`).join('');}
function preencherUsuarioPelotao(user){const el=document.getElementById('platoon-login-user');if(el){el.value=user;el.focus();}document.getElementById('platoon-login-password')?.focus();}
function alternarVisibilidadeSenhaPelotao(){
  const campo=document.getElementById('platoon-login-password'),botao=document.getElementById('platoon-password-toggle');if(!campo||!botao)return;
  const mostrar=campo.type==='password';campo.type=mostrar?'text':'password';botao.textContent=mostrar?'🙈':'👁️';botao.setAttribute('aria-label',mostrar?'Ocultar senha':'Mostrar senha');botao.setAttribute('title',mostrar?'Ocultar senha':'Mostrar senha');botao.setAttribute('aria-pressed',String(mostrar));campo.focus();
}
function redefinirVisibilidadeSenhaPelotao(){const campo=document.getElementById('platoon-login-password'),botao=document.getElementById('platoon-password-toggle');if(campo)campo.type='password';if(botao){botao.textContent='👁️';botao.setAttribute('aria-label','Mostrar senha');botao.setAttribute('title','Mostrar senha');botao.setAttribute('aria-pressed','false');}}
function prepararNovoPerfilPelotao(sessao){
  prepararEstadoNovaOperacaoIndividual();sessaoPelotaoAtiva=sessao;nomeJogador=sessao.warName;ativarNivel(nivelNumericoPelotao(sessao.levelId||sessao.level));
  const nomeDisplay=document.getElementById('nome-display');if(nomeDisplay)nomeDisplay.textContent=nomeJogador;
  aplicarRestricoesMissoesPelotao();atualizarPatenteDisplay();desenharRuas();posicionarOcorrencias();esconderTodas();const mapa=document.getElementById('tela-mapa');if(mapa)mapa.style.display='block';if(typeof agendarPrecarregamentoInsigniasCarreira==='function')agendarPrecarregamentoInsigniasCarreira();tocarMenuMusica();salvarProgressoLocal('entrada-perfil-pelotao');atualizarAcoesResultadoPelotao();
}
function entrarEmServicoPelotao(){
  const err=document.getElementById('platoon-login-error');if(err)err.hidden=true;
  if(!arquivoColetivoPelotaoAtivo){trocarArquivoColetivoPelotao();return;}
  const user=document.getElementById('platoon-login-user')?.value.trim()||'',senha=document.getElementById('platoon-login-password')?.value||'';
  const conta=arquivoColetivoPelotaoAtivo.accounts.find(a=>String(a.user).toLowerCase()===user.toLowerCase());
  if(!conta||!verificarSenhaPelotao(conta,senha)){if(err){err.textContent='Usuário ou senha inválidos.';err.hidden=false;}return;}
  const sessao={mode:'platoon',structureVersion:PLATOON_STRUCTURE_VERSION,platoonId:arquivoColetivoPelotaoAtivo.platoonId,platoonName:arquivoColetivoPelotaoAtivo.platoonName,activityTitle:arquivoColetivoPelotaoAtivo.activityTitle,level:arquivoColetivoPelotaoAtivo.level,levelId:arquivoColetivoPelotaoAtivo.levelId,missions:arquivoColetivoPelotaoAtivo.missions.map(Number),user:conta.user,warName:conta.warName};
  sessaoPelotaoAtiva=sessao;registrarPerfilPelotao(sessao);try{localStorage.setItem(PLATOON_SESSION_KEY,JSON.stringify(sessao));}catch{}
  const salvo=lerProgressoLocal();if(salvo){restaurarProgressoLocal(salvo);aplicarRestricoesMissoesPelotao();atualizarAcoesResultadoPelotao();}else prepararNovoPerfilPelotao(sessao);
}
function aplicarRestricoesMissoesPelotao(){
  if(!sessaoPelotaoAtiva)return;
  const permitidas=new Set(sessaoPelotaoAtiva.missions.map(n=>n-1));
  document.querySelectorAll('.ocorrencia').forEach(el=>{const id=Number(el.dataset.missao);const liberada=permitidas.has(id);el.classList.toggle('bloqueada-pelotao',!liberada);el.setAttribute('aria-disabled',String(!liberada));});
}
function missaoLiberadaNoPelotao(id){return !sessaoPelotaoAtiva||sessaoPelotaoAtiva.missions.includes(Number(id)+1);}
function registrarEventosAcessoPelotao(){garantirImportadorArquivo(document.getElementById('input-arquivo-coletivo-pelotao'),processarArquivoColetivoPelotao,'arquivo-coletivo-pelotao');renderizarPerfisPelotaoConhecidos();}


/* =========================================================
   ENTREGA E CONSOLIDAÇÃO DE RESULTADOS — FASE 28D
   Exportação do resultado pelo estudante e importação em lote
   pelo professor, sem servidor ou banco de dados online.
   ========================================================= */
const PLATOON_RESULT_FILE_TYPE='operacao-salvamento-platoon-result';
const PLATOON_RESULT_SCHEMA_VERSION=3;
const PLATOON_RESULT_SCHEMA_VERSIONS_ACCEPTED=new Set([1,2,3]);
const PLATOON_ADMIN_FILE_TYPE='operacao-salvamento-platoon-admin';
const PLATOON_ADMIN_SCHEMA_VERSION=2;
const PLATOON_ADMIN_SCHEMA_VERSIONS_ACCEPTED=new Set([1,2]);
let gestaoPelotaoAtiva=null;
let resultadosPelotaoAtivos=[];
let componenteDetalhadoPelotao=null;

function normalizarPayloadResultadoPelotao(payload,levelFallback=null){
  if(!payload||typeof payload!=='object')throw new Error('Resultado sem dados válidos.');
  const level=normalizarNivelArquivoPelotao(payload.level??payload.levelId??levelFallback);
  const allowedMissions=normalizarMissoesArquivoPelotao(payload.allowedMissions||payload.missions?.map(m=>m?.id)||[]);
  const missions=Array.isArray(payload.missions)?payload.missions.filter(m=>m&&allowedMissions.includes(Number(m.id))).map(m=>({...m,id:Number(m.id)})):[];
  const structure=estruturaPelotaoAtual(level),rankIndex=Math.max(0,Math.floor(Number(payload.rankIndex)||0)),careerPoints=Math.max(0,Math.floor(Number(payload.careerPoints)||0)),totalCareerPoints=Math.max(0,Math.floor(Number(payload.totalCareerPoints??(rankIndex*PONTOS_PROMOCAO+careerPoints))||0));
  return {...payload,structureVersion:PLATOON_STRUCTURE_VERSION,structure,level,levelId:structure.levelId,allowedMissions,totalMissions:allowedMissions.length,completedMissions:Math.min(allowedMissions.length,Math.max(0,Number(payload.completedMissions)||0)),rankIndex,careerPoints,totalCareerPoints,missions};
}
function normalizarGestaoPelotao(d){
  if(!d||d.fileType!==PLATOON_ADMIN_FILE_TYPE||!PLATOON_ADMIN_SCHEMA_VERSIONS_ACCEPTED.has(Number(d.schemaVersion)))throw new Error('Arquivo administrativo inválido ou incompatível.');
  if(typeof d.platoonId!=='string'||!d.platoonId||typeof d.platoonName!=='string'||!d.platoonName.trim())throw new Error('Identificação do pelotão ausente.');
  if(!Array.isArray(d.credentials)||d.credentials.some(c=>!c||typeof c.user!=='string'||typeof c.warName!=='string'))throw new Error('Credenciais administrativas inválidas.');
  const level=normalizarNivelArquivoPelotao(d.level??d.levelId),missions=normalizarMissoesArquivoPelotao(d.missions);
  if(Number(d.schemaVersion)>=2&&!validarEstruturaArquivoPelotao(d,level))throw new Error('O arquivo usa uma estrutura de jogo diferente de 2 níveis × 14 missões.');
  const structure=estruturaPelotaoAtual(level);
  const results=Array.isArray(d.results)?d.results.map(r=>normalizarPayloadResultadoPelotao(r,level)).filter(r=>r.platoonId===d.platoonId):[];
  return {...d,schemaVersion:PLATOON_ADMIN_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,level,levelId:structure.levelId,missions,results};
}
function validarGestaoPelotao(d){try{return !!normalizarGestaoPelotao(d);}catch{return false;}}

function posicionarAcoesResultadoPelotao(){
  const barra=document.getElementById('pelotao-map-actions');
  const cabecalho=document.querySelector('#tela-mapa .top-bar');
  if(!barra||!cabecalho||barra.hidden)return;
  const mapa=document.getElementById('tela-mapa');
  const mapaRect=mapa?.getBoundingClientRect()||{top:0};
  const cabecalhoRect=cabecalho.getBoundingClientRect();
  const topo=Math.max(0,cabecalhoRect.bottom-mapaRect.top+10);
  barra.style.setProperty('--pelotao-actions-top',`${Math.round(topo)}px`);
}
function atualizarAcoesResultadoPelotao(){
  const barra=document.getElementById('pelotao-map-actions');
  const btn=document.getElementById('btn-entregar-resultado-pelotao');
  const mostrar=!!sessaoPelotaoAtiva;
  if(barra){barra.hidden=!mostrar;if(mostrar)requestAnimationFrame(posicionarAcoesResultadoPelotao);}
  if(btn)btn.disabled=!mostrar;
}
function missoesProgressoPelotao(progresso){const nivel=nivelNumericoPelotao(sessaoPelotaoAtiva?.level);return progresso?.levels?.[nivel]?.missions||progresso?.levels?.[String(nivel)]?.missions||[];}
function statusResultadoPelotao(progresso){
  const permitidas=new Set((sessaoPelotaoAtiva?.missions||[]).map(Number));
  const concluidas=missoesProgressoPelotao(progresso).filter(m=>permitidas.has(Number(m.id)+1)&&m.resolved).length;
  return {concluidas,total:permitidas.size,final:permitidas.size>0&&concluidas===permitidas.size};
}
function resumoMissaoResultado(item){
  const s=item?.state||{};
  return {id:Number(item.id)+1,resolved:!!item.resolved,started:!!s.started,timeMs:Math.max(0,Math.floor(s.finalMs||s.elapsedMs||0)),attempts:Math.max(0,Math.floor(s.attempts||0)),penalties:Math.max(0,Math.floor(s.penalties||0)),hintsUsed:Math.max(0,Math.floor(s.hintsUsed??((Number.isInteger(s.hintIndex)?s.hintIndex:-1)+1))),report:s.report?clonarDadoPersistente(s.report):null};
}
async function exportarResultadoPelotao(){
  if(!sessaoPelotaoAtiva){abrirModalInterface({titulo:'Resultado indisponível',subtitulo:'Modo pelotão',icone:'⚠️',somenteAviso:true,mensagem:'Entre em um perfil de pelotão antes de gerar a entrega.',textoConfirmar:'Fechar'});return false;}
  salvarProgressoLocal('exportacao-resultado-pelotao');
  const progresso=lerProgressoLocal();if(!progresso)return false;
  try{
    const status=statusResultadoPelotao(progresso),missoesNivel=missoesProgressoPelotao(progresso),structure=estruturaPelotaoAtual(sessaoPelotaoAtiva.level),carreiraNivel=progresso.progression?.careers?.[structure.levelId]||progresso.progression?.careers?.[String(structure.levelId)]||{};
    const payload={structureVersion:PLATOON_STRUCTURE_VERSION,structure,platoonId:sessaoPelotaoAtiva.platoonId,platoonName:sessaoPelotaoAtiva.platoonName,activityTitle:sessaoPelotaoAtiva.activityTitle,level:sessaoPelotaoAtiva.level,levelId:structure.levelId,user:sessaoPelotaoAtiva.user,warName:sessaoPelotaoAtiva.warName,allowedMissions:sessaoPelotaoAtiva.missions.map(Number),submissionType:status.final?'final':'partial',completedMissions:status.concluidas,totalMissions:status.total,careerPoints:Math.max(0,Math.floor(carreiraNivel.careerPoints||0)),totalCareerPoints:Math.max(0,Math.floor(carreiraNivel.totalCareerPoints||0)),rankIndex:Math.max(0,Math.floor(carreiraNivel.rankIndex||0)),savedAt:progresso.savedAt,missions:missoesNivel.filter(m=>sessaoPelotaoAtiva.missions.includes(Number(m.id)+1)).map(resumoMissaoResultado)};
    const exportedAt=new Date().toISOString(),text=JSON.stringify(payload),integrity=await calcularIntegridadeProgresso(text),envelope={fileType:PLATOON_RESULT_FILE_TYPE,schemaVersion:PLATOON_RESULT_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,exportedAt,payload,integrity};
    const nome=`${normalizarNomeArquivoProgresso(sessaoPelotaoAtiva.platoonName)}_${normalizarNomeArquivoProgresso(sessaoPelotaoAtiva.user)}_${normalizarNomeArquivoProgresso(sessaoPelotaoAtiva.warName)}_resultado.os-resultado`;
    baixarArquivoProgresso(JSON.stringify(envelope,null,2),nome);
    abrirModalInterface({titulo:'Resultado pronto para entrega',subtitulo:status.final?'Percurso concluído':'Entrega parcial',icone:'📤',tipo:'success',somenteAviso:true,mensagem:`O arquivo <strong>${escaparHTMLPersistencia(nome)}</strong> foi gerado.<br><br>Encaminhe-o ao professor. Ele contém somente o perfil fictício e os dados da atividade.`,textoConfirmar:'Concluir'});return true;
  }catch(e){console.error(e);abrirModalInterface({titulo:'Não foi possível gerar o resultado',subtitulo:'Modo pelotão',icone:'⚠️',tipo:'danger',somenteAviso:true,mensagem:'O progresso local foi preservado. Tente novamente.',textoConfirmar:'Fechar'});return false;}
}
function selecionarArquivoGestaoPelotao(){return abrirSeletorArquivoSeguro(document.getElementById('input-arquivo-gestao-pelotao'),processarArquivoGestaoPelotao,'arquivo-gestao-pelotao');}
async function processarArquivoGestaoPelotao(evento){
  const arq=evento?.target?.files?.[0];if(!arq)return;
  try{if(arq.size>5*1024*1024)throw new Error('Arquivo acima do limite permitido.');const d=normalizarGestaoPelotao(JSON.parse(await arq.text()));gestaoPelotaoAtiva=d;resultadosPelotaoAtivos=Array.isArray(d.results)?d.results:[];renderizarGestaoResultadosPelotao();document.getElementById('teacher-home')?.setAttribute('hidden','');document.getElementById('teacher-pedagogical-link')?.setAttribute('hidden','');document.getElementById('platoon-results-manager')?.removeAttribute('hidden');}
  catch(e){abrirModalInterface({titulo:'Arquivo não reconhecido',subtitulo:'Área do professor',icone:'⚠️',tipo:'danger',somenteAviso:true,mensagem:escaparHTMLPersistencia(e.message||'Não foi possível abrir o arquivo.'),textoConfirmar:'Fechar'});}finally{if(evento?.target)evento.target.value='';}
}
function selecionarResultadosPelotao(){return abrirSeletorArquivoSeguro(document.getElementById('input-resultados-pelotao'),processarResultadosPelotao,'resultados-pelotao');}
async function lerResultadoPelotao(arquivo){
  if(arquivo.size>5*1024*1024)throw new Error(`${arquivo.name}: arquivo acima do limite.`);let e;try{e=JSON.parse(await arquivo.text());}catch{throw new Error(`${arquivo.name}: JSON inválido.`);}
  if(e?.fileType!==PLATOON_RESULT_FILE_TYPE||!PLATOON_RESULT_SCHEMA_VERSIONS_ACCEPTED.has(Number(e?.schemaVersion))||!e.payload)throw new Error(`${arquivo.name}: formato incompatível.`);
  if(!(await verificarIntegridadeProgresso(JSON.stringify(e.payload),e.integrity)))throw new Error(`${arquivo.name}: integridade não confirmada.`);
  const payload=normalizarPayloadResultadoPelotao(e.payload,gestaoPelotaoAtiva?.level);
  if(!gestaoPelotaoAtiva||payload.platoonId!==gestaoPelotaoAtiva.platoonId)throw new Error(`${arquivo.name}: pertence a outro pelotão.`);
  if(payload.levelId!==gestaoPelotaoAtiva.levelId)throw new Error(`${arquivo.name}: pertence a outra etapa de conhecimentos.`);
  const permitidas=new Set((gestaoPelotaoAtiva.missions||[]).map(Number));if(payload.allowedMissions.some(id=>!permitidas.has(id)))throw new Error(`${arquivo.name}: contém missão não liberada neste pelotão.`);
  const cred=gestaoPelotaoAtiva.credentials.find(c=>String(c.user).toLowerCase()===String(payload.user).toLowerCase());if(!cred)throw new Error(`${arquivo.name}: usuário não pertence ao pelotão.`);
  return {...payload,exportedAt:e.exportedAt};
}
function resultadoMaisRecente(a,b){return new Date(b.exportedAt||0)-new Date(a.exportedAt||0);}
function mesclarResultadoPelotao(novo){
  const idx=resultadosPelotaoAtivos.findIndex(r=>String(r.user).toLowerCase()===String(novo.user).toLowerCase());
  if(idx<0){resultadosPelotaoAtivos.push(novo);return'importado';}
  const atual=resultadosPelotaoAtivos[idx],maisNovo=new Date(novo.exportedAt||0)>=new Date(atual.exportedAt||0);if(maisNovo){resultadosPelotaoAtivos[idx]=novo;return'atualizado';}return'ignorado';
}
async function processarResultadosPelotao(evento){
  const arquivos=[...(evento?.target?.files||[])];if(!arquivos.length)return;let importados=0,atualizados=0,ignorados=0;const erros=[];
  for(const arquivo of arquivos){try{const r=await lerResultadoPelotao(arquivo),acao=mesclarResultadoPelotao(r);if(acao==='importado')importados++;else if(acao==='atualizado')atualizados++;else ignorados++;}catch(e){erros.push(e.message);}}
  resultadosPelotaoAtivos.sort(resultadoMaisRecente);renderizarGestaoResultadosPelotao();
  abrirModalInterface({titulo:'Importação concluída',subtitulo:'Resultados do pelotão',icone:'📥',tipo:erros.length?'':'success',somenteAviso:true,mensagem:`<strong>${importados}</strong> novo(s), <strong>${atualizados}</strong> atualizado(s) e <strong>${ignorados}</strong> arquivo(s) antigo(s) ignorado(s).${erros.length?`<br><br><strong>${erros.length} arquivo(s) rejeitado(s):</strong><br>${erros.slice(0,6).map(escaparHTMLPersistencia).join('<br>')}`:''}`,textoConfirmar:'Fechar'});
  if(evento?.target)evento.target.value='';
}
function numeroSeguroResultado(valor){const n=Number(valor);return Number.isFinite(n)?n:0;}
function somarMissoesResultado(resultado,campo){return (resultado?.missions||[]).reduce((s,m)=>s+numeroSeguroResultado(m?.[campo]),0);}
function tempoTotalResultado(resultado){return somarMissoesResultado(resultado,'timeMs');}
function errosTotalResultado(resultado){return somarMissoesResultado(resultado,'attempts');}
function dicasTotalResultado(resultado){return somarMissoesResultado(resultado,'hintsUsed');}
function formatarDuracaoResultado(ms){ms=Math.max(0,Math.floor(numeroSeguroResultado(ms)));const min=Math.floor(ms/60000),seg=Math.floor((ms%60000)/1000);if(min>=60){const h=Math.floor(min/60),m=min%60;return `${h}h ${String(m).padStart(2,'0')}min`;}return `${min}min ${String(seg).padStart(2,'0')}s`;}
function resultadoPorUsuarioPelotao(user){return resultadosPelotaoAtivos.find(x=>String(x.user).toLowerCase()===String(user).toLowerCase())||null;}
function nomeMissaoResultado(id){const level=gestaoPelotaoAtiva?.level||sessaoPelotaoAtiva?.level;const nivel=nivelNumericoPelotao(level);const item=(typeof MISSOES_POR_NIVEL!=='undefined'?MISSOES_POR_NIVEL[nivel]||[]:[]).find(m=>Number(m.id)+1===Number(id));return item?.nome||`Missão ${id}`;}
function mediaResultado(valores){const nums=valores.map(numeroSeguroResultado).filter(v=>Number.isFinite(v));return nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:0;}
function escaparCSVResultado(valor){const s=String(valor??'');return /[;"\n\r]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
function resumoDashboardPelotao(){
  const total=gestaoPelotaoAtiva?.credentials?.length||0,recebidos=resultadosPelotaoAtivos.length;
  const finais=resultadosPelotaoAtivos.filter(r=>r.submissionType==='final').length,parciais=recebidos-finais;
  const progresso=total?resultadosPelotaoAtivos.reduce((s,r)=>s+(numeroSeguroResultado(r.completedMissions)/Math.max(1,numeroSeguroResultado(r.totalMissions))),0)/total*100:0;
  return{total,recebidos,finais,parciais,semEntrega:Math.max(0,total-recebidos),progresso,mediaPontos:recebidos?mediaResultado(resultadosPelotaoAtivos.map(r=>r.totalCareerPoints??r.careerPoints)):0,mediaTempo:recebidos?mediaResultado(resultadosPelotaoAtivos.map(tempoTotalResultado)):0,mediaErros:recebidos?mediaResultado(resultadosPelotaoAtivos.map(errosTotalResultado)):0,mediaDicas:recebidos?mediaResultado(resultadosPelotaoAtivos.map(dicasTotalResultado)):0};
}
function renderizarCardsDashboardPelotao(){
  const el=document.getElementById('results-dashboard-cards');if(!el)return;const d=resumoDashboardPelotao();
  const cards=[['👥','Componentes',d.total],['📥','Entregas',`${d.recebidos}/${d.total}`],['✅','Percursos finais',d.finais],['📊','Progresso médio',`${Math.round(d.progresso)}%`],['⭐','Pontos médios',d.mediaPontos.toFixed(1)],['⏱️','Tempo médio',formatarDuracaoResultado(d.mediaTempo)],['🔁','Tentativas médias',d.mediaErros.toFixed(1)],['💡','Dicas médias',d.mediaDicas.toFixed(1)]];
  el.innerHTML=cards.map(([icone,rotulo,valor])=>`<article class="results-stat-card"><span>${icone}</span><div><strong>${escaparHTMLPersistencia(String(valor))}</strong><small>${rotulo}</small></div></article>`).join('');
}
function renderizarMissoesDashboardPelotao(){
  const el=document.getElementById('results-mission-cards');if(!el||!gestaoPelotaoAtiva)return;const permitidas=(gestaoPelotaoAtiva.missions||[]).map(Number);
  el.innerHTML=permitidas.map(id=>{const itens=resultadosPelotaoAtivos.map(r=>({r,m:(r.missions||[]).find(m=>Number(m.id)===id)})).filter(x=>x.m);const iniciadas=itens.filter(x=>x.m.started||x.m.resolved).length,concluidas=itens.filter(x=>x.m.resolved).length,tempos=itens.filter(x=>x.m.resolved).map(x=>x.m.timeMs),tentativas=itens.map(x=>x.m.attempts),dicas=itens.map(x=>x.m.hintsUsed),base=Math.max(1,resultadosPelotaoAtivos.length),taxa=Math.round(concluidas/base*100);return `<article class="results-mission-card"><header><span>Missão ${id}</span><strong>${escaparHTMLPersistencia(nomeMissaoResultado(id))}</strong></header><div class="results-mission-progress"><span style="width:${Math.min(100,taxa)}%"></span></div><dl><div><dt>Concluíram</dt><dd>${concluidas}/${resultadosPelotaoAtivos.length}</dd></div><div><dt>Taxa</dt><dd>${taxa}%</dd></div><div><dt>Tempo médio</dt><dd>${tempos.length?formatarDuracaoResultado(mediaResultado(tempos)):'—'}</dd></div><div><dt>Tentativas</dt><dd>${iniciadas?mediaResultado(tentativas).toFixed(1):'—'}</dd></div><div><dt>Dicas</dt><dd>${iniciadas?mediaResultado(dicas).toFixed(1):'—'}</dd></div></dl></article>`;}).join('')||'<p class="results-empty">Nenhuma missão configurada.</p>';
}
function renderizarPendenciasDashboardPelotao(){
  const el=document.getElementById('results-pending-list');if(!el||!gestaoPelotaoAtiva)return;const itens=gestaoPelotaoAtiva.credentials.map(c=>({c,r:resultadoPorUsuarioPelotao(c.user)})).filter(x=>!x.r||x.r.submissionType!=='final');
  el.innerHTML=itens.length?itens.map(({c,r})=>`<div class="results-pending-item"><div><strong>${escaparHTMLPersistencia(c.warName)}</strong><code>${escaparHTMLPersistencia(c.user)}</code></div><span class="${r?'partial':'missing'}">${r?`Parcial · ${r.completedMissions}/${r.totalMissions}`:'Não entregou'}</span></div>`).join(''):'<div class="results-all-complete">✅ Todos os componentes entregaram o percurso final.</div>';
}
function renderizarGestaoResultadosPelotao(){
  if(!gestaoPelotaoAtiva)return;const titulo=document.getElementById('results-manager-title'),resumo=document.getElementById('results-manager-summary'),body=document.getElementById('results-manager-body'),filtro=document.getElementById('results-status-filter')?.value||'todos';
  if(titulo)titulo.textContent=gestaoPelotaoAtiva.platoonName;if(resumo)resumo.textContent=`${gestaoPelotaoAtiva.activityTitle} · ${rotuloNivelPelotao(gestaoPelotaoAtiva.level)} · ${resultadosPelotaoAtivos.length}/${gestaoPelotaoAtiva.credentials.length} entrega(s) recebida(s)`;
  const linhas=gestaoPelotaoAtiva.credentials.map(c=>({c,r:resultadoPorUsuarioPelotao(c.user)})).filter(({r})=>filtro==='todos'||(filtro==='final'&&r?.submissionType==='final')||(filtro==='parcial'&&r&&r.submissionType!=='final')||(filtro==='nao-entregue'&&!r));
  if(body)body.innerHTML=linhas.map(({c,r})=>`<tr><td>${escaparHTMLPersistencia(c.warName)}</td><td><code>${escaparHTMLPersistencia(c.user)}</code></td><td>${r?`${r.completedMissions}/${r.totalMissions}`:'—'}</td><td>${r?numeroSeguroResultado(r.totalCareerPoints??r.careerPoints):'—'}</td><td>${r?formatarDuracaoResultado(tempoTotalResultado(r)):'—'}</td><td>${r?errosTotalResultado(r):'—'}</td><td>${r?dicasTotalResultado(r):'—'}</td><td><span class="results-status ${r?(r.submissionType==='final'?'final':'partial'):'missing'}">${r?(r.submissionType==='final'?'Final':'Parcial'):'Não entregue'}</span></td><td>${r?formatarDataSalvamentoLocal(r.exportedAt):'—'}</td><td><button class="results-detail-btn" type="button" data-user="${escaparHTMLPersistencia(String(c.user))}" onclick="abrirDetalhesComponentePelotao(this.dataset.user)">Ver detalhes</button></td></tr>`).join('')||'<tr><td colspan="10" class="results-empty-cell">Nenhum componente corresponde ao filtro.</td></tr>';
  renderizarCardsDashboardPelotao();renderizarMissoesDashboardPelotao();renderizarPendenciasDashboardPelotao();
}
function rotuloSituacaoMissaoDetalhe(m){if(!m)return'Não iniciada';if(m.resolved)return'Concluída';if(m.started||numeroSeguroResultado(m.timeMs)>0||numeroSeguroResultado(m.attempts)>0)return'Em andamento';return'Não iniciada';}
function classeSituacaoMissaoDetalhe(m){return !m?'missing':m.resolved?'final':(m.started||numeroSeguroResultado(m.timeMs)>0||numeroSeguroResultado(m.attempts)>0)?'partial':'missing';}
function patenteResultadoDetalhe(r){const i=Math.max(0,Math.floor(numeroSeguroResultado(r?.rankIndex)));return typeof PATENTES!=='undefined'&&PATENTES[i]?PATENTES[i]:`Nível ${i+1}`;}
function criarCartaoComparacaoDetalhe(rotulo,valor,media,formatador=v=>String(v)){const delta=valor-media;let leitura='Próximo da média';if(Math.abs(delta)>Math.max(1,Math.abs(media)*.15))leitura=delta>0?'Acima da média':'Abaixo da média';return `<article><span>${rotulo}</span><strong>${escaparHTMLPersistencia(formatador(valor))}</strong><small>Média: ${escaparHTMLPersistencia(formatador(media))}</small><em>${leitura}</em></article>`;}
function listaRelatorioDetalhe(valor){if(Array.isArray(valor))return valor.map(v=>`<li>${escaparHTMLPersistencia(typeof v==='string'?v:JSON.stringify(v))}</li>`).join('');if(valor&&typeof valor==='object')return Object.entries(valor).map(([k,v])=>`<li><strong>${escaparHTMLPersistencia(k)}:</strong> ${escaparHTMLPersistencia(Array.isArray(v)?v.join(' · '):typeof v==='object'?JSON.stringify(v):String(v))}</li>`).join('');return valor!=null?`<li>${escaparHTMLPersistencia(String(valor))}</li>`:'';}
function abrirRelatorioMissaoComponentePelotao(user,id){const r=resultadoPorUsuarioPelotao(user),m=(r?.missions||[]).find(x=>Number(x.id)===Number(id)),sec=document.getElementById('student-detail-report-section'),box=document.getElementById('student-detail-report'),titulo=document.getElementById('student-detail-report-title');if(!sec||!box||!titulo)return;if(!m?.report){sec.hidden=false;titulo.textContent=`Missão ${id} — sem relatório`;box.innerHTML='<p class="results-empty">O arquivo entregue não contém relatório final para esta missão.</p>';return;}titulo.textContent=`Missão ${id} — ${nomeMissaoResultado(id)}`;const rep=m.report,ordem=[['operationalContext','Contexto operacional'],['reflections','Reflexões'],['mathematics','Matemática mobilizada'],['interdisciplinarity','Interdisciplinaridade'],['simplifications','Simplificações'],['modelLimits','Limites do modelo'],['safety','Segurança']];let html='';for(const [chave,rotulo] of ordem){if(rep[chave]!=null)html+=`<article><h5>${rotulo}</h5><ul>${listaRelatorioDetalhe(rep[chave])}</ul></article>`;}if(!html)html=`<article><h5>Dados registrados</h5><ul>${listaRelatorioDetalhe(rep)}</ul></article>`;box.innerHTML=html;sec.hidden=false;sec.scrollIntoView({behavior:'smooth',block:'start'});}
function abrirDetalhesComponentePelotao(user){if(!gestaoPelotaoAtiva)return;const cred=gestaoPelotaoAtiva.credentials.find(c=>String(c.user).toLowerCase()===String(user).toLowerCase());if(!cred)return;const r=resultadoPorUsuarioPelotao(cred.user),painel=document.getElementById('student-result-detail');componenteDetalhadoPelotao={cred,r};document.getElementById('student-detail-title').textContent=cred.warName;document.getElementById('student-detail-subtitle').textContent=`${cred.user} · ${gestaoPelotaoAtiva.platoonName} · ${rotuloNivelPelotao(gestaoPelotaoAtiva.level)}`;const total=(gestaoPelotaoAtiva.missions||[]).length,concluidas=r?numeroSeguroResultado(r.completedMissions):0,progresso=total?Math.round(concluidas/total*100):0,situacao=!r?'Não entregou':r.submissionType==='final'?'Percurso final':'Entrega parcial';document.getElementById('student-detail-overview').innerHTML=[['Situação',situacao],['Progresso',`${concluidas}/${total} (${progresso}%)`],['Pontos acumulados',r?numeroSeguroResultado(r.totalCareerPoints??r.careerPoints):'—'],['Promoção',r?`${numeroSeguroResultado(r.careerPoints)}/${typeof PONTOS_PROMOCAO!=='undefined'?PONTOS_PROMOCAO:15}`:'—'],['Patente',r?patenteResultadoDetalhe(r):'—'],['Tempo total',r?formatarDuracaoResultado(tempoTotalResultado(r)):'—'],['Tentativas',r?errosTotalResultado(r):'—'],['Dicas',r?dicasTotalResultado(r):'—'],['Última entrega',r?formatarDataSalvamentoLocal(r.exportedAt):'—']].map(([k,v])=>`<article><span>${k}</span><strong>${escaparHTMLPersistencia(String(v))}</strong></article>`).join('');const mediaTempo=mediaResultado(resultadosPelotaoAtivos.map(tempoTotalResultado)),mediaTent=mediaResultado(resultadosPelotaoAtivos.map(errosTotalResultado)),mediaDicas=mediaResultado(resultadosPelotaoAtivos.map(dicasTotalResultado)),mediaPontos=mediaResultado(resultadosPelotaoAtivos.map(x=>x.totalCareerPoints??x.careerPoints)),mediaProg=mediaResultado(resultadosPelotaoAtivos.map(x=>numeroSeguroResultado(x.completedMissions)/Math.max(1,numeroSeguroResultado(x.totalMissions))*100));document.getElementById('student-detail-comparison').innerHTML=r?[criarCartaoComparacaoDetalhe('Progresso',progresso,mediaProg,v=>`${Math.round(v)}%`),criarCartaoComparacaoDetalhe('Pontos acumulados',numeroSeguroResultado(r.totalCareerPoints??r.careerPoints),mediaPontos,v=>Number(v).toFixed(1)),criarCartaoComparacaoDetalhe('Tempo',tempoTotalResultado(r),mediaTempo,formatarDuracaoResultado),criarCartaoComparacaoDetalhe('Tentativas',errosTotalResultado(r),mediaTent,v=>Number(v).toFixed(1)),criarCartaoComparacaoDetalhe('Dicas',dicasTotalResultado(r),mediaDicas,v=>Number(v).toFixed(1))].join(''):'<p class="results-empty">Nenhuma entrega foi importada para este componente.</p>';const missoes=(gestaoPelotaoAtiva.missions||[]).map(Number);document.getElementById('student-detail-missions').innerHTML=missoes.map(id=>{const m=(r?.missions||[]).find(x=>Number(x.id)===id);return `<tr><td><strong>Missão ${id}</strong><small>${escaparHTMLPersistencia(nomeMissaoResultado(id))}</small></td><td><span class="results-status ${classeSituacaoMissaoDetalhe(m)}">${rotuloSituacaoMissaoDetalhe(m)}</span></td><td>${m?formatarDuracaoResultado(m.timeMs):'—'}</td><td>${m?numeroSeguroResultado(m.attempts):'—'}</td><td>${m?numeroSeguroResultado(m.hintsUsed):'—'}</td><td>${m?numeroSeguroResultado(m.penalties):'—'}</td><td>${m?.report?`<button class="results-detail-btn compact" type="button" data-user="${escaparHTMLPersistencia(String(cred.user))}" onclick="abrirRelatorioMissaoComponentePelotao(this.dataset.user,${id})">Abrir</button>`:'—'}</td></tr>`;}).join('');const alertas=[];if(!r)alertas.push(['missing','Nenhuma entrega importada para este componente.']);else{if(r.submissionType!=='final')alertas.push(['partial','Percurso ainda não concluído.']);if(errosTotalResultado(r)>mediaTent*1.5&&errosTotalResultado(r)>=3)alertas.push(['attention','Número de tentativas acima da média do pelotão.']);if(dicasTotalResultado(r)>mediaDicas*1.5&&dicasTotalResultado(r)>=2)alertas.push(['attention','Uso de dicas acima da média do pelotão.']);if(tempoTotalResultado(r)>mediaTempo*1.5&&mediaTempo>0)alertas.push(['attention','Tempo total acima da média do pelotão.']);for(const id of missoes){const m=(r.missions||[]).find(x=>Number(x.id)===id);if(m&&(m.started||m.timeMs>0)&&!m.resolved)alertas.push(['partial',`Missão ${id} iniciada e ainda não concluída.`]);}if(!alertas.length)alertas.push(['ok','Nenhum indicador de atenção foi identificado pelos critérios automáticos.']);}document.getElementById('student-detail-alerts').innerHTML=alertas.map(([classe,texto])=>`<div class="student-detail-alert ${classe}">${escaparHTMLPersistencia(texto)}</div>`).join('');document.getElementById('student-detail-report-section').hidden=true;document.getElementById('student-detail-report').innerHTML='';painel.hidden=false;painel.scrollIntoView({behavior:'smooth',block:'start'});}
function fecharDetalhesComponentePelotao(){document.getElementById('student-result-detail')?.setAttribute('hidden','');componenteDetalhadoPelotao=null;}
function imprimirRelatorioIndividualPelotao(){if(!componenteDetalhadoPelotao)return;document.body.classList.add('printing-student-report');window.print();setTimeout(()=>document.body.classList.remove('printing-student-report'),500);}

function exportarRelatorioPelotaoCSV(){
  if(!gestaoPelotaoAtiva)return;const cab=['Nome de guerra','Usuário','Missões concluídas','Missões liberadas','Situação','Pontos acumulados','Tempo total (ms)','Tempo formatado','Tentativas','Dicas','Última atualização'];const linhas=gestaoPelotaoAtiva.credentials.map(c=>{const r=resultadoPorUsuarioPelotao(c.user);return[c.warName,c.user,r?.completedMissions??0,r?.totalMissions??(gestaoPelotaoAtiva.missions||[]).length,r?(r.submissionType==='final'?'Final':'Parcial'):'Não entregue',r?.totalCareerPoints??r?.careerPoints??0,r?tempoTotalResultado(r):0,r?formatarDuracaoResultado(tempoTotalResultado(r)):'',r?errosTotalResultado(r):0,r?dicasTotalResultado(r):0,r?.exportedAt||''];});
  const csv='\uFEFF'+[cab,...linhas].map(l=>l.map(escaparCSVResultado).join(';')).join('\r\n');baixarArquivoPelotao(`${slugPelotao(gestaoPelotaoAtiva.platoonName)}-relatorio.csv`,csv,'text/csv');
}
function imprimirRelatorioPelotao(){if(!gestaoPelotaoAtiva)return;document.body.classList.add('printing-platoon-report');window.print();setTimeout(()=>document.body.classList.remove('printing-platoon-report'),500);}
function baixarGestaoPelotaoAtualizada(){
  if(!gestaoPelotaoAtiva)return;const structure=estruturaPelotaoAtual(gestaoPelotaoAtiva.level),atualizado={...gestaoPelotaoAtiva,schemaVersion:PLATOON_ADMIN_SCHEMA_VERSION,structureVersion:PLATOON_STRUCTURE_VERSION,gameVersion:'2.5.0',structure,levelId:structure.levelId,results:clonarDadoPersistente(resultadosPelotaoAtivos),updatedAt:new Date().toISOString()};gestaoPelotaoAtiva=atualizado;baixarArquivoPelotao(`${slugPelotao(atualizado.platoonName)}-atualizado.os-gestao`,JSON.stringify(atualizado,null,2));
}
function fecharGestaoResultadosPelotao(){fecharDetalhesComponentePelotao();document.getElementById('platoon-results-manager')?.setAttribute('hidden','');document.getElementById('teacher-home')?.removeAttribute('hidden');document.getElementById('teacher-pedagogical-link')?.removeAttribute('hidden');gestaoPelotaoAtiva=null;resultadosPelotaoAtivos=[];}

function registrarEventosResultadosPelotao(){
  garantirImportadorArquivo(document.getElementById('input-arquivo-gestao-pelotao'),processarArquivoGestaoPelotao,'arquivo-gestao-pelotao');
  garantirImportadorArquivo(document.getElementById('input-resultados-pelotao'),processarResultadosPelotao,'resultados-pelotao');
}

window.addEventListener('resize',()=>{if(sessaoPelotaoAtiva)posicionarAcoesResultadoPelotao();});






/* =========================================================
   FLUXO DE BRIEFING E MISSÃO
   Abas, dicas, simuladores, reinício e retorno ao mapa.
   Este arquivo é inserido no HTML único durante o build.
   ========================================================= */

let briefingAbaAtual='situacao';
let briefingDicaIndice=-1;
const URLS_BLOB_SIMULADORES=new Map();

function obterUrlExecutavelSimulador(id){
  const origem=SIM_URLS[id];
  if(!origem||!origem.startsWith('data:text/html'))return origem;
  const chave=`${nivelAtual}:${id}`;
  if(URLS_BLOB_SIMULADORES.has(chave))return URLS_BLOB_SIMULADORES.get(chave);
  try{
    const base64=origem.slice(origem.indexOf(',')+1);
    const binario=atob(base64);
    const bytes=new Uint8Array(binario.length);
    for(let i=0;i<binario.length;i++)bytes[i]=binario.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:'text/html;charset=utf-8'}));
    URLS_BLOB_SIMULADORES.set(chave,url);
    return url;
  }catch(erro){
    console.warn('Não foi possível preparar o simulador como Blob URL.',erro);
    return origem;
  }
}



function abrirAbaBriefing(aba){
  const abas=['situacao','dados','objetivo','referencia'];
  if(!abas.includes(aba))aba='situacao';
  briefingAbaAtual=aba;
  const e=obterEstadoMissao(); if(e)e.lastTab=aba;
  const mapa={situacao:['tabSituacao','panelSituacao'],dados:['tabDados','panelDados'],objetivo:['tabObjetivo','panelObjetivo'],referencia:['tabReferencia','panelReferencia']};
  Object.entries(mapa).forEach(([chave,[tabId,panelId]])=>{
    const ativo=chave===aba,tab=document.getElementById(tabId),panel=document.getElementById(panelId);
    if(tab){tab.classList.toggle('ativo',ativo);tab.setAttribute('aria-selected',ativo?'true':'false');}
    if(panel){panel.hidden=!ativo;panel.classList.toggle('ativo',ativo);}
  });
  if(e&&!e.successDetected&&!MISSOES[missaoAtual].resolvida){
    const statuses={situacao:'Lendo o enunciado',dados:'Consultando dados',objetivo:'Analisando o objetivo',referencia:'Consultando referência'};
    atualizarPainelMissao('Enunciado e dados',statuses[aba]);
  }
}
function renderizarDicaBriefing(){
  const e=obterEstadoMissao();
  const b=BRIEFINGS[missaoAtual];
  const dicas=(b&&Array.isArray(b.dicas))?b.dicas:[];
  briefingDicaIndice=e?e.hintIndex:-1;
  const box=document.getElementById('briefingHintBox'),btn=document.getElementById('btnDica'),contador=document.getElementById('briefingHintCounter'),texto=document.getElementById('briefingHintText');
  if(!box||!btn||!contador||!texto)return;
  if(briefingDicaIndice<0||!dicas.length){box.hidden=true;btn.textContent='💡 Preciso de uma dica';contador.textContent='';texto.textContent='';return;}
  box.hidden=false;contador.textContent=`Dica ${briefingDicaIndice+1} de ${dicas.length}`;texto.textContent=dicas[briefingDicaIndice];
  btn.textContent=briefingDicaIndice<dicas.length-1?'Próxima dica →':'Recomeçar dicas ↻';
}
function mostrarProximaDica(){
  const b=BRIEFINGS[missaoAtual],e=obterEstadoMissao();
  const dicas=(b&&Array.isArray(b.dicas))?b.dicas:[];if(!dicas.length||!e)return;
  const proximo=(e.hintIndex+1)>=dicas.length?0:e.hintIndex+1;
  e.hintIndex=proximo;
  // Fase 28D: cada dica é penalizada uma única vez, quando revelada pela primeira vez.
  // Como as dicas são apresentadas em ordem, o maior índice já alcançado equivale
  // ao número de dicas distintas efetivamente utilizadas. Rever uma dica não desconta novamente.
  e.hintsUsed=Math.max(Math.max(0,Math.floor(e.hintsUsed||0)),Math.min(dicas.length,proximo+1));
  renderizarDicaBriefing();
}
function preencherBriefing(id){
  const b=BRIEFINGS[id]; if(!b)return false;
  document.getElementById('briefingTitle').textContent=b.titulo;
  const heroImg=document.getElementById('briefingHeroImg'),hero=document.getElementById('briefingHero');
  if(b.imagem){heroImg.src=b.imagem;hero.style.display='';}else{hero.style.display='none';}
  document.getElementById('briefingHeroIcon').textContent=b.icone||'🚒';
  document.getElementById('briefingHeroLabel').textContent=b.heroLabel||'';
  document.getElementById('briefingContext').textContent=b.contexto;
  document.getElementById('briefingObjective').textContent=b.objetivo;
  const lista=document.getElementById('briefingData');lista.innerHTML='';
  b.dados.forEach(item=>{const li=document.createElement('li');li.innerHTML=item;lista.appendChild(li);});
  document.getElementById('briefingModel').innerHTML=b.modelo;
  document.getElementById('briefingTask').textContent=b.tarefa;
  const nota=document.getElementById('briefingNote');nota.textContent=b.nota||'';nota.style.display=b.nota?'':'none';
  return true;
}
function abrirBriefing(id){
  if(MISSOES[id]&&MISSOES[id].resolvida){abrirRelatorioReflexoes(id,true);return;}
  missaoAtual=id;
  const e=obterEstadoMissao(id),eraIniciada=e.started;
  if(!preencherBriefing(id)){abrirMissao(id);return;}
  if(!e.started&&!MISSOES[id].resolvida){e.started=true;e.status='Lendo o enunciado';}
  const aba=e.lastTab||'situacao';
  abrirAbaBriefing(aba);
  renderizarDicaBriefing();
  trocarTela('tela-mapa','tela-briefing');
  pararMusicaMissao();
  if(!MISSOES[id].resolvida&&!e.successDetected){
    iniciarTimerMissao(id);
    atualizarPainelMissao('Enunciado e dados',eraIniciada?'Consultando dados':'Lendo o enunciado',id);
  }else{
    atualizarPainelMissao('Enunciado e dados',MISSOES[id].resolvida?'Concluída':'Solução validada',id);
  }
  const content=document.querySelector('.briefing-content-tabs');if(content)content.scrollTop=0;
  // Carrega apenas o simulador da missão selecionada enquanto o jogador lê o briefing.
  // Isso evita que o iframe pesado seja inicializado somente após o clique em “Avançar”.
  setTimeout(()=>precarregarSimulador(id),80);
}
function iniciarMissaoDoBriefing(){if(missaoAtual===null)return;abrirMissao(missaoAtual);}
function mostrarCarregamentoSimulador(visivel){
  const loading=document.getElementById('missionFrameLoading');
  if(!loading)return;
  loading.hidden=!visivel;
  loading.classList.toggle('ativo',!!visivel);
}
function obterOuCriarFrame(id){
  const container=document.getElementById('missionFrameContainer');
  let frame=document.getElementById(`missionFrame-${nivelAtual}-${id}`);
  const e=obterEstadoMissao(id);
  if(!frame){
    if(!SIM_URLS[id])throw new Error(`Simulador indisponível para o nível ${nivelAtual}, missão ${id+1}.`);
    frame=document.createElement('iframe');
    frame.id=`missionFrame-${nivelAtual}-${id}`;
    frame.className='mission-frame';
    frame.title=`Simulador — ${MISSOES[id].titulo}`;
    frame.dataset.missionId=String(id);
    frame.dataset.level=String(nivelAtual);
    frame.setAttribute('loading','eager');
    e.simulatorReportedAttempts=0;
    e.simulatorLoaded=false;
    frame.addEventListener('load',()=>{
      if(frame.src==='about:blank')return;
      e.simulatorLoaded=true;
      frame.dataset.loaded='true';
      if(frame.classList.contains('ativo'))mostrarCarregamentoSimulador(false);
    });
    container.appendChild(frame);
    frame.src=obterUrlExecutavelSimulador(id);
  }
  return frame;
}
function precarregarSimulador(id){
  if(id===null||id===undefined||!SIM_URLS[id])return;
  // Fase 30: enquanto o briefing está sendo lido, prepara em paralelo
  // o HTML/iframe do simulador, seus assets internos e a trilha da missão.
  try{if(typeof precarregarAudioMissao==='function')precarregarAudioMissao(id);}catch(erro){console.warn('Não foi possível pré-carregar o áudio da missão:',erro);}
  try{obterOuCriarFrame(id);}catch(erro){console.warn('Não foi possível pré-carregar o simulador:',erro);}
}
function mostrarFrameMissao(id){
  document.querySelectorAll('.mission-frame').forEach(f=>f.classList.remove('ativo'));
  const frame=obterOuCriarFrame(id);
  frame.classList.add('ativo');
  const e=obterEstadoMissao(id);
  mostrarCarregamentoSimulador(!e?.simulatorLoaded);
  return frame;
}
function abrirMissao(id){
  if(MISSOES[id]&&MISSOES[id].resolvida){abrirRelatorioReflexoes(id,true);return;}
  missaoAtual=id;const e=obterEstadoMissao(id);
  if(!e.started&&!MISSOES[id].resolvida){e.started=true;e.status='Em andamento';iniciarTimerMissao(id);}
  mostrarFrameMissao(id);
  atualizarPainelMissao('Simulador',MISSOES[id].resolvida?'Concluída':(e.successDetected?'Solução validada':'Em andamento'),id);
  trocarTela('tela-briefing','tela-missao');
  if(!MISSOES[id].resolvida&&!e.successDetected)tocarMusicaMissao(id);
}
function voltarAoBriefing(){
  if(missaoAtual===null)return;
  const id=missaoAtual,e=obterEstadoMissao(id);
  pararMusicaMissao();
  preencherBriefing(id);abrirAbaBriefing(e.lastTab||'situacao');renderizarDicaBriefing();
  trocarTela('tela-missao','tela-briefing');
  atualizarPainelMissao('Enunciado e dados',MISSOES[id].resolvida?'Concluída':(e.successDetected?'Solução validada':'Consultando dados'),id);
}
function reiniciarSimulador(){
  if(missaoAtual===null)return;
  const id=missaoAtual,e=obterEstadoMissao(id);
  if(e.successDetected||MISSOES[id].resolvida){
    abrirModalInterface({titulo:'Reinício indisponível',subtitulo:MISSOES[id].nome,icone:'🔒',tipo:'info',somenteAviso:true,mensagem:'A solução desta missão já foi validada. O simulador não pode mais ser reiniciado nesta execução.',textoConfirmar:'Entendi'});
    return;
  }
  abrirModalInterface({
    titulo:'Reiniciar o simulador?',
    subtitulo:MISSOES[id].nome,
    icone:'↻',
    mensagem:'Os campos, posições e escolhas do simulador serão limpos. <strong>O tempo, as tentativas e as penalidades serão mantidos.</strong>',
    textoConfirmar:'Reiniciar simulador',
    aoConfirmar:()=>executarReinicioSimulador(id)
  });
}
function executarReinicioSimulador(id){
  if(missaoAtual!==id)return;
  const e=obterEstadoMissao(id); if(!e||e.successDetected||MISSOES[id].resolvida)return;
  const frame=obterOuCriarFrame(id); e.simulatorReportedAttempts=0;e.simulatorLoaded=false;frame.dataset.loaded='false';mostrarCarregamentoSimulador(true);
  frame.src='about:blank'; setTimeout(()=>{frame.src=obterUrlExecutavelSimulador(id);},50);
  e.status='Simulador reiniciado'; atualizarPainelMissao('Simulador','Simulador reiniciado',id);
}
function registrarAvisoSaidaMissao(){
  if(registrarAvisoSaidaMissao.registrado)return;
  registrarAvisoSaidaMissao.registrado=true;
  window.addEventListener('beforeunload',evento=>{
    if(!existeMissaoAtivaNaoConcluida())return;
    evento.preventDefault();
    evento.returnValue='';
  });
}

function solicitarVoltaAoMapa(){
  if(missaoAtual===null)return;
  const id=missaoAtual,e=obterEstadoMissao(id);
  if(MISSOES[id].resolvida){irParaMapaSemPenalidade();return;}
  const atual=tempoAtualMissao(id);
  document.getElementById('missionExitCurrentTime').textContent=formatTime(atual);
  document.getElementById('missionExitPenalizedTime').textContent=formatTime(atual+PENALIDADE_SAIDA_MS);
  document.getElementById('modal-saida-missao').classList.add('mostrar');
}
function fecharModalSaidaMissao(){document.getElementById('modal-saida-missao').classList.remove('mostrar');}
function confirmarVoltaAoMapaComPenalidade(){
  if(missaoAtual===null){fecharModalSaidaMissao();return;}
  const id=missaoAtual,e=obterEstadoMissao(id);
  pausarTimerMissao(id);e.elapsedMs+=PENALIDADE_SAIDA_MS;e.penalties+=1;e.status='Pausada no mapa';
  fecharModalSaidaMissao();irParaMapaSemPenalidade('retorno-com-penalidade');
  setTimeout(()=>mostrarToast('toast-mapa',`⚠ Penalidade aplicada: +20 minutos na ${e.penalties}ª saída desta missão.`),250);
}
function irParaMapaSemPenalidade(motivoSalvamento='retorno-ao-mapa'){
  if(missaoAtual!==null){const e=obterEstadoMissao();if(e&&e.runningSince!==null)pausarTimerMissao(missaoAtual);}
  pararMusicaMissao();tocarMenuMusica();esconderTodas();
  const mapa=document.getElementById('tela-mapa');mapa.style.display='block';mapa.classList.add('fade-in');setTimeout(()=>mapa.classList.remove('fade-in'),TEMPO_FADE_TELA_MS);
  document.querySelectorAll('.ocorrencia').forEach(o=>{o.style.pointerEvents='';o.style.opacity='';});
  missaoAtual=null;
  salvarProgressoLocal(motivoSalvamento);
}





document.addEventListener('DOMContentLoaded',()=>{
  // Fase 31: inicia imediatamente o pequeno pacote otimizado de insígnias.
  if(typeof agendarPrecarregamentoInsigniasCarreira==='function')agendarPrecarregamentoInsigniasCarreira();
  registrarEventosMapa();
  atualizarContador();
  registrarAvisoSaidaMissao();
  registrarEventosPortabilidadeProgresso();
registrarEventosAcessoPelotao();
  registrarEventosResultadosPelotao();
  atualizarPainelModoIndividual();
  const nomeInput=document.getElementById('nome-guerra');
  if(nomeInput)nomeInput.addEventListener('keypress',evento=>{ if(evento.key==='Enter') entrarNoJogo(); });
});

registrarEventosModalInterface();
window.addEventListener('keydown',ev=>{
  if(ev.key==='Escape'){ fecharModalInterface(); fecharModalSaidaMissao(); }
  const modal=document.getElementById('modal-interface');
  if(ev.key==='Enter'&&modal&&modal.classList.contains('mostrar')) confirmarModalInterface();
});


/* API pública necessária aos atributos HTML e integrações legadas. */
if (typeof abrirAbaBriefing === 'function') globalThis.abrirAbaBriefing = abrirAbaBriefing;
if (typeof abrirAbaOrientacaoPedagogica === 'function') globalThis.abrirAbaOrientacaoPedagogica = abrirAbaOrientacaoPedagogica;
if (typeof abrirAbaRelatorio === 'function') globalThis.abrirAbaRelatorio = abrirAbaRelatorio;
if (typeof abrirAjudaFormaAplicacao === 'function') globalThis.abrirAjudaFormaAplicacao = abrirAjudaFormaAplicacao;
if (typeof abrirAreaProfessor === 'function') globalThis.abrirAreaProfessor = abrirAreaProfessor;
if (typeof abrirCarreira === 'function') globalThis.abrirCarreira = abrirCarreira;
if (typeof abrirDetalhesComponentePelotao === 'function') globalThis.abrirDetalhesComponentePelotao = abrirDetalhesComponentePelotao;
if (typeof abrirModoIndividual === 'function') globalThis.abrirModoIndividual = abrirModoIndividual;
if (typeof abrirModoPelotao === 'function') globalThis.abrirModoPelotao = abrirModoPelotao;
if (typeof abrirOrientacoesPedagogicas === 'function') globalThis.abrirOrientacoesPedagogicas = abrirOrientacoesPedagogicas;
if (typeof abrirRelatorioMissaoComponentePelotao === 'function') globalThis.abrirRelatorioMissaoComponentePelotao = abrirRelatorioMissaoComponentePelotao;
if (typeof acionarBotaoRelatorio === 'function') globalThis.acionarBotaoRelatorio = acionarBotaoRelatorio;
if (typeof alterarNivelPelotao === 'function') globalThis.alterarNivelPelotao = alterarNivelPelotao;
if (typeof alternarDetalhePedagogicoMissao === 'function') globalThis.alternarDetalhePedagogicoMissao = alternarDetalhePedagogicoMissao;
if (typeof alternarSelecaoMissoesPelotao === 'function') globalThis.alternarSelecaoMissoesPelotao = alternarSelecaoMissoesPelotao;
if (typeof alternarVisibilidadeSenhaPelotao === 'function') globalThis.alternarVisibilidadeSenhaPelotao = alternarVisibilidadeSenhaPelotao;
if (typeof atualizarResumoNomesPelotao === 'function') globalThis.atualizarResumoNomesPelotao = atualizarResumoNomesPelotao;
if (typeof baixarArquivoAdministrativoPelotao === 'function') globalThis.baixarArquivoAdministrativoPelotao = baixarArquivoAdministrativoPelotao;
if (typeof baixarArquivoColetivoPelotao === 'function') globalThis.baixarArquivoColetivoPelotao = baixarArquivoColetivoPelotao;
if (typeof baixarCredenciaisPelotao === 'function') globalThis.baixarCredenciaisPelotao = baixarCredenciaisPelotao;
if (typeof baixarGestaoPelotaoAtualizada === 'function') globalThis.baixarGestaoPelotaoAtualizada = baixarGestaoPelotaoAtualizada;
if (typeof baixarGuiaPedagogicoPelotao === 'function') globalThis.baixarGuiaPedagogicoPelotao = baixarGuiaPedagogicoPelotao;
if (typeof baixarInstrucoesPelotao === 'function') globalThis.baixarInstrucoesPelotao = baixarInstrucoesPelotao;
if (typeof baixarPacoteCompletoPelotao === 'function') globalThis.baixarPacoteCompletoPelotao = baixarPacoteCompletoPelotao;
if (typeof cancelarCriacaoPelotao === 'function') globalThis.cancelarCriacaoPelotao = cancelarCriacaoPelotao;
if (typeof concluirRascunhoPelotao === 'function') globalThis.concluirRascunhoPelotao = concluirRascunhoPelotao;
if (typeof confirmarVoltaAoMapaComPenalidade === 'function') globalThis.confirmarVoltaAoMapaComPenalidade = confirmarVoltaAoMapaComPenalidade;
if (typeof continuarOperacaoSalvaIndividual === 'function') globalThis.continuarOperacaoSalvaIndividual = continuarOperacaoSalvaIndividual;
if (typeof criarOutroPelotao === 'function') globalThis.criarOutroPelotao = criarOutroPelotao;
if (typeof entrarEmServicoPelotao === 'function') globalThis.entrarEmServicoPelotao = entrarEmServicoPelotao;
if (typeof entrarNoJogo === 'function') globalThis.entrarNoJogo = entrarNoJogo;
if (typeof etapaAnteriorPelotao === 'function') globalThis.etapaAnteriorPelotao = etapaAnteriorPelotao;
if (typeof exportarProgressoIndividual === 'function') globalThis.exportarProgressoIndividual = exportarProgressoIndividual;
if (typeof exportarRelatorioPelotaoCSV === 'function') globalThis.exportarRelatorioPelotaoCSV = exportarRelatorioPelotaoCSV;
if (typeof exportarResultadoPelotao === 'function') globalThis.exportarResultadoPelotao = exportarResultadoPelotao;
if (typeof fecharCarreira === 'function') globalThis.fecharCarreira = fecharCarreira;
if (typeof fecharDetalhesComponentePelotao === 'function') globalThis.fecharDetalhesComponentePelotao = fecharDetalhesComponentePelotao;
if (typeof fecharGestaoResultadosPelotao === 'function') globalThis.fecharGestaoResultadosPelotao = fecharGestaoResultadosPelotao;
if (typeof fecharModalSaidaMissao === 'function') globalThis.fecharModalSaidaMissao = fecharModalSaidaMissao;
if (typeof fecharOrientacoesPedagogicas === 'function') globalThis.fecharOrientacoesPedagogicas = fecharOrientacoesPedagogicas;
if (typeof fecharPromocao === 'function') globalThis.fecharPromocao = fecharPromocao;
if (typeof gerarNomesGuerraPelotao === 'function') globalThis.gerarNomesGuerraPelotao = gerarNomesGuerraPelotao;
if (typeof imprimirOrientacoesPedagogicas === 'function') globalThis.imprimirOrientacoesPedagogicas = imprimirOrientacoesPedagogicas;
if (typeof imprimirRelatorioIndividualPelotao === 'function') globalThis.imprimirRelatorioIndividualPelotao = imprimirRelatorioIndividualPelotao;
if (typeof imprimirRelatorioPelotao === 'function') globalThis.imprimirRelatorioPelotao = imprimirRelatorioPelotao;
if (typeof iniciarCriacaoPelotao === 'function') globalThis.iniciarCriacaoPelotao = iniciarCriacaoPelotao;
if (typeof iniciarMissaoDoBriefing === 'function') globalThis.iniciarMissaoDoBriefing = iniciarMissaoDoBriefing;
if (typeof limparNomesGuerraPelotao === 'function') globalThis.limparNomesGuerraPelotao = limparNomesGuerraPelotao;
if (typeof mostrarProximaDica === 'function') globalThis.mostrarProximaDica = mostrarProximaDica;
if (typeof preencherUsuarioPelotao === 'function') globalThis.preencherUsuarioPelotao = preencherUsuarioPelotao;
if (typeof proximaEtapaPelotao === 'function') globalThis.proximaEtapaPelotao = proximaEtapaPelotao;
if (typeof reiniciarSimulador === 'function') globalThis.reiniciarSimulador = reiniciarSimulador;
if (typeof renderizarGestaoResultadosPelotao === 'function') globalThis.renderizarGestaoResultadosPelotao = renderizarGestaoResultadosPelotao;
if (typeof resolverMissao === 'function') globalThis.resolverMissao = resolverMissao;
if (typeof salvarRascunhoPelotao === 'function') globalThis.salvarRascunhoPelotao = salvarRascunhoPelotao;
if (typeof selecionarArquivoColetivoPelotao === 'function') globalThis.selecionarArquivoColetivoPelotao = selecionarArquivoColetivoPelotao;
if (typeof selecionarArquivoGestaoPelotao === 'function') globalThis.selecionarArquivoGestaoPelotao = selecionarArquivoGestaoPelotao;
if (typeof selecionarArquivoProgressoIndividual === 'function') globalThis.selecionarArquivoProgressoIndividual = selecionarArquivoProgressoIndividual;
if (typeof selecionarMissao === 'function') globalThis.selecionarMissao = selecionarMissao;
if (typeof selecionarNivel === 'function') globalThis.selecionarNivel = selecionarNivel;
if (typeof selecionarResultadosPelotao === 'function') globalThis.selecionarResultadosPelotao = selecionarResultadosPelotao;
if (typeof solicitarVoltaAoMapa === 'function') globalThis.solicitarVoltaAoMapa = solicitarVoltaAoMapa;
if (typeof trocarArquivoColetivoPelotao === 'function') globalThis.trocarArquivoColetivoPelotao = trocarArquivoColetivoPelotao;
if (typeof voltarAoBriefing === 'function') globalThis.voltarAoBriefing = voltarAoBriefing;
if (typeof voltarAoPortalInicial === 'function') globalThis.voltarAoPortalInicial = voltarAoPortalInicial;
if (typeof voltarAreaProfessorContextual === 'function') globalThis.voltarAreaProfessorContextual = voltarAreaProfessorContextual;
if (typeof voltarDeNivel === 'function') globalThis.voltarDeNivel = voltarDeNivel;
if (typeof voltarEdicaoPelotao === 'function') globalThis.voltarEdicaoPelotao = voltarEdicaoPelotao;
if (typeof voltarTelaInicial === 'function') globalThis.voltarTelaInicial = voltarTelaInicial;
