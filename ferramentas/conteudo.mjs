// Conteudo do site usado pelo gerador (ferramentas/gerar-paginas.mjs).
// Para mudar texto de uma pagina de tratamento, edite aqui e rode:
//   node ferramentas/gerar-paginas.mjs

export const SITE = {
    url: 'https://drathaisapimenta.com.br',
    nome: 'Dra. Thais Alves Pimenta',
    nomeNegocio: 'Dra. Thais Alves Pimenta - Estética e Harmonização Facial',
    nomeGoogle: 'Dra Thais Pimenta Estética Londrina',
    telefoneExibicao: '(43) 9639-6726',
    telefoneE164: '+554396396726',
    whatsapp: '554396396726',
    email: 'thaisalvespimenta@outlook.com.br',
    endereco: {
        rua: 'R. Dr. Elias Cesar, 55 - Sl 803',
        ruaExibicao: 'R. Dr. Elias Cesar, 55 – Sala 803',
        bairro: 'Jardim Caiçaras',
        cidade: 'Londrina',
        uf: 'PR',
        cep: '86015-640',
    },
    mapsEndereco: 'https://www.google.com/maps/search/?api=1&query=R.+Dr.+Elias+Cesar%2C+55+-+Jardim+Cai%C3%A7aras%2C+Londrina+-+PR%2C+86015-640',
    horarios: ['Segunda a Sexta: 8h – 18h', 'Sábado: 8h – 12h'],
    horarioCurto: 'Seg–Sex: 8h–18h | Sáb: 8h–12h',
    instagram: 'https://www.instagram.com/thaispimenta.fisio/',
    facebook: 'https://www.facebook.com/profile.php?id=100007035408402',
    google: {
        // Preencha com o Place ID do perfil (https://developers.google.com/maps/documentation/places/web-service/place-id)
        // para o botao "Deixe sua avaliacao" abrir direto o formulario de avaliacao.
        placeId: '',
        buscaPerfil: 'https://www.google.com/maps/search/?api=1&query=Dra%20Thais%20Pimenta%20Est%C3%A9tica%20Londrina',
    },
};

// Avaliacoes copiadas do perfil no Google (texto sem edicao). Aparecem no HTML
// mesmo sem a integracao ao vivo; com ela ativa, o site troca pelas do Google.
export const AVALIACOES = [
    { texto: 'Trabalha com naturalidade, produtos de qualidades e a Dra... sem palavras!!!', nota: 5 },
    { texto: 'Uma clínica linda, acolhedora e conduzida por uma pessoa incrível.', nota: 5, inicial: 'M' },
    { texto: 'Ótima profissional, super recomendo , preços acessíveis.', nota: 5 },
];

export const AUTORA = {
    nome: 'Dra. Thais Alves Pimenta',
    cargo: 'Fisioterapeuta dermatofuncional',
    foto: 'dra-thais-pimenta-retrato.webp',
    bio: `<p>Fisioterapeuta dermatofuncional com mais de 10 anos de experiência em estética avançada e pós-graduada em perfiloplastia. Atende no Jardim Caiçaras, em Londrina, com uma regra simples: todo tratamento começa por uma avaliação honesta &mdash; inclusive para dizer quando um procedimento não é indicado.</p>
<p>O foco é a naturalidade: resultados que deixam você mais descansada e confiante, sem perder os traços que fazem de você quem você é.</p>`,
};

const CUIDADOS_TOXINA = `<ul>
<li>Não deitar nem abaixar a cabeça por cerca de 4 horas;</li>
<li>Não massagear nem pressionar a região tratada no dia;</li>
<li>Evitar exercícios intensos, sauna e calor excessivo nas primeiras 24 horas;</li>
<li>Evitar bebida alcoólica no dia da aplicação.</li>
</ul>
<p class="tp-nota">Orientações gerais. Na consulta você recebe as recomendações específicas para o seu caso.</p>`;

export const TRATAMENTOS = [
    {
        slug: 'botox-londrina',
        nome: 'Botox',
        termo: 'botox',
        servico: 'Botox (toxina botulínica)',
        categoria: 'Facial',
        title: 'Botox em Londrina com Naturalidade | Dra. Thais Pimenta',
        description: 'Botox em Londrina para rugas da testa, glabela e pés de galinha, com efeito natural. Mapa de aplicação individual com a Dra. Thais Pimenta. Agende.',
        h1: 'Botox em Londrina',
        lead: 'Toxina botulínica para suavizar as rugas de expressão da testa, da região entre as sobrancelhas e dos pés de galinha, com dose ajustada à força de cada músculo para o rosto continuar expressivo.',
        resumo: 'Rugas de expressão suavizadas sem travar o rosto.',
        imagem: { arquivo: 'botox-londrina.webp', w: 800, h: 800, alt: 'Antes e depois de botox na testa: linhas de expressão suavizadas em paciente da Dra. Thais Pimenta' },
        fatos: [
            ['Sessão', 'Cerca de 20 minutos'],
            ['Resultado', 'Do 3º ao 15º dia'],
            ['Duração', '4 a 6 meses, em média'],
            ['Rotina', 'Volta no mesmo dia'],
        ],
        secoes: [
            ['O que é o botox e como ele age', `<p>&ldquo;Botox&rdquo; é o nome popular da toxina botulínica, um ativo que relaxa temporariamente o músculo onde é aplicado. Como as rugas de expressão nascem da contração repetida &mdash; franzir a testa, apertar os olhos, levantar as sobrancelhas &mdash;, diminuir a força desse movimento suaviza as marcas e evita que elas se aprofundem.</p>
<p>O efeito é local e temporário: a toxina age apenas nos pontos aplicados e, com o tempo, o músculo recupera o movimento. Por isso o tratamento é feito em ciclos, com reaplicação quando o efeito começa a diminuir.</p>`],
            ['Para quem é indicado', `<ul>
<li>Linhas horizontais na testa, que aparecem ao levantar as sobrancelhas;</li>
<li>Rugas entre as sobrancelhas (glabela), que dão o ar de bravo ou cansado;</li>
<li>Pés de galinha no canto dos olhos ao sorrir;</li>
<li>Quem quer evitar que as linhas de expressão fiquem marcadas na pele em repouso;</li>
<li>Elevação sutil da cauda da sobrancelha, quando a anatomia permite.</li>
</ul>
<p>Rugas que já aparecem com o rosto parado podem precisar de outros recursos junto com a toxina, como bioestimuladores de colágeno ou preenchimento. Isso é avaliado na consulta &mdash; e pode fazer parte de um plano de <a href="../harmonizacao-facial-londrina/">harmonização facial</a>.</p>`],
            ['Como é a aplicação', `<p>A consulta começa pela análise da sua mímica: você faz algumas expressões e a Dra. Thais observa quais músculos trabalham mais e onde as linhas se formam. A partir disso é montado um mapa de aplicação com a quantidade de unidades em cada ponto. É esse ajuste fino que mantém a naturalidade.</p>
<p>A aplicação é feita com agulha bem fina, em poucos pontos, e dura cerca de 20 minutos. O desconforto é rápido, parecido com uma picada leve. Você sai da clínica e segue a rotina normalmente; as pequenas marcas de agulha somem em poucas horas.</p>`],
            ['Resultado e duração', `<p>O efeito começa a aparecer entre o terceiro e o quinto dia e se completa por volta de 15 dias. É nesse momento que é feita a revisão, quando necessária, para ajustar algum ponto.</p>
<p>A duração média é de quatro a seis meses. Metabolismo, atividade física intensa e a força da musculatura de cada pessoa influenciam esse tempo.</p>`],
            ['Cuidados depois da aplicação', CUIDADOS_TOXINA],
            ['Quem não deve fazer', `<p>A toxina botulínica não é indicada para gestantes e lactantes, pessoas com doenças neuromusculares (como miastenia gravis), alergia a algum componente da fórmula ou infecção ativa na área de aplicação. O uso de alguns medicamentos também é avaliado antes.</p>`],
        ],
        faq: [
            ['Botox deixa o rosto parado?', 'Não quando a dose é ajustada ao seu rosto. O objetivo é suavizar a contração, não paralisar: você continua sorrindo, levantando as sobrancelhas e se expressando. O aspecto congelado costuma vir de doses padronizadas, que não respeitam a força de cada músculo.'],
            ['A aplicação de botox dói?', 'O desconforto é pequeno e rápido. A agulha é bem fina e são poucos pontos; a maioria das pacientes compara a uma picada leve.'],
            ['Em quanto tempo vejo o resultado do botox?', 'Os primeiros sinais aparecem entre 3 e 5 dias, e o resultado completo em torno de 15 dias após a aplicação.'],
            ['Quanto tempo dura o botox?', 'Em média de 4 a 6 meses. O intervalo entre as aplicações é definido de acordo com a sua resposta ao tratamento.'],
            ['Com que idade posso começar?', 'Não existe uma idade certa. A indicação depende de quando as linhas de expressão começam a marcar a pele, o que em muitas pessoas acontece entre os 25 e os 30 anos. A avaliação mostra se já vale a pena.'],
            ['Quanto custa botox em Londrina?', 'O valor depende das áreas tratadas e da quantidade de unidades necessária para o seu caso, por isso é informado depois da avaliação. Chame no WhatsApp para agendar.'],
        ],
        relacionados: ['harmonizacao-facial-londrina', 'botox-sorriso-gengival-londrina', 'ultraformer-londrina'],
    },

    {
        slug: 'preenchimento-labial-londrina',
        nome: 'Preenchimento labial',
        termo: 'preenchimento labial',
        servico: 'Preenchimento labial com ácido hialurônico',
        categoria: 'Facial',
        title: 'Preenchimento Labial em Londrina | Dra. Thais Pimenta',
        description: 'Preenchimento labial em Londrina com ácido hialurônico: contorno, hidratação e volume na medida do seu rosto. Veja antes e depois e agende.',
        h1: 'Preenchimento labial em Londrina',
        lead: 'Ácido hialurônico para definir o contorno, hidratar e dar volume aos lábios na proporção do seu rosto: do resultado mais discreto ao mais marcado, sempre combinado antes da aplicação.',
        resumo: 'Contorno, hidratação e volume na medida do seu rosto.',
        imagem: { arquivo: 'preenchimento-labial-antes-depois-2.webp', w: 1000, h: 1262, alt: 'Antes e depois de preenchimento labial com ácido hialurônico feito pela Dra. Thais Pimenta em Londrina' },
        fatos: [
            ['Sessão', 'Cerca de 40 minutos'],
            ['Anestesia', 'Tópica (pomada)'],
            ['Resultado', 'Imediato; final em ~15 dias'],
            ['Duração', 'Cerca de 12 meses, em média'],
        ],
        secoes: [
            ['Como funciona o preenchimento labial', `<p>O preenchimento labial usa ácido hialurônico, uma substância que o próprio corpo produz e que atrai água para os tecidos. Aplicado em pontos estratégicos, ele devolve volume, define o contorno e melhora a hidratação dos lábios.</p>
<p>Por ser um produto absorvível, o resultado é temporário: o organismo reabsorve o ácido hialurônico aos poucos ao longo dos meses. E existe uma enzima, a hialuronidase, capaz de dissolvê-lo quando necessário &mdash; uma segurança a mais do procedimento.</p>`],
            ['O desenho vem antes do volume', `<p>Cada boca tem um formato, e o lábio bonito é o que conversa com o restante do rosto. Antes da aplicação, a Dra. Thais avalia a proporção entre lábio superior e inferior, a simetria, o contorno e o quanto de volume faz sentido para você. A partir daí vocês definem juntas o objetivo:</p>
<ul>
<li><strong>Hidratação e viço:</strong> melhora a textura e as linhas finas, quase sem mudar o tamanho;</li>
<li><strong>Contorno:</strong> define a borda do lábio e o arco do cupido;</li>
<li><strong>Volume:</strong> aumenta o lábio de forma gradual e proporcional;</li>
<li><strong>Correção de assimetrias:</strong> equilibra lados ou lábios de tamanhos muito diferentes.</li>
</ul>`],
            ['Como é o dia da aplicação', `<p>O procedimento é feito com anestésico tópico e leva cerca de 40 minutos, incluindo o preparo. O volume já aparece na saída da consulta.</p>
<p>Nos primeiros dias é esperado algum inchaço, maior nas primeiras 48 horas, e às vezes pequenos hematomas. Eles passam sozinhos. O resultado final se assenta em torno de 15 dias, quando o produto se integra ao tecido.</p>`],
            ['Cuidados depois do preenchimento', `<ul>
<li>Compressas frias nas primeiras horas ajudam a controlar o inchaço;</li>
<li>Evitar exercícios intensos, sauna e sol forte por 24 a 48 horas;</li>
<li>Não massagear os lábios, a não ser que isso seja orientado;</li>
<li>Evitar maquiagem nos lábios no dia da aplicação;</li>
<li>Quem tem histórico de herpes labial deve avisar na consulta, para receber a orientação adequada.</li>
</ul>
<p class="tp-nota">Orientações gerais. Na consulta você recebe as recomendações específicas para o seu caso.</p>`],
            ['Quem não deve fazer', `<p>O preenchimento não é feito em gestantes e lactantes, em quem tem infecção ou ferida ativa na boca (incluindo herpes em atividade), doença autoimune descompensada ou alergia aos componentes do produto. Tudo isso é conversado na avaliação.</p>
<p>Quer equilibrar os lábios com o nariz e o queixo? Veja como funciona a <a href="../perfiloplastia-londrina/">perfiloplastia</a>.</p>`],
        ],
        galeria: [
            { arquivo: 'preenchimento-labial-antes-depois-1.webp', w: 1000, h: 1000 },
            { arquivo: 'preenchimento-labial-antes-depois-3.webp', w: 1000, h: 1000 },
            { arquivo: 'preenchimento-labial-antes-depois-4.webp', w: 720, h: 1280 },
            { arquivo: 'preenchimento-labial-antes-depois-5.webp', w: 1000, h: 1000 },
            { arquivo: 'preenchimento-labial-antes-depois-6.webp', w: 1000, h: 1000 },
        ],
        faq: [
            ['O preenchimento labial fica artificial?', 'Não precisa ficar. O resultado artificial costuma vir de excesso de produto ou de um desenho que não respeita o formato da boca. Aqui o volume é planejado para o seu rosto e pode ser construído aos poucos.'],
            ['Dói fazer preenchimento labial?', 'É usado anestésico tópico antes da aplicação, e muitos produtos já têm anestésico na fórmula. A sensação mais comum é de pressão e um leve ardor em alguns pontos.'],
            ['Quanto tempo dura o preenchimento labial?', 'Em média cerca de 12 meses. O tempo varia conforme o produto usado, o metabolismo e hábitos como atividade física intensa.'],
            ['Quanto tempo o lábio fica inchado?', 'O inchaço é maior nas primeiras 48 horas e diminui bastante entre 3 e 5 dias. O resultado definitivo é avaliado em torno de 15 dias.'],
            ['Quanto custa preenchimento labial em Londrina?', 'Depende da quantidade de produto necessária para o resultado que você quer. O valor é passado na avaliação, que é gratuita.'],
        ],
        relacionados: ['harmonizacao-facial-londrina', 'perfiloplastia-londrina', 'botox-londrina'],
    },

    {
        slug: 'harmonizacao-facial-londrina',
        nome: 'Harmonização facial',
        termo: 'harmonização facial',
        servico: 'Harmonização facial',
        categoria: 'Facial',
        title: 'Harmonização Facial em Londrina | Dra. Thais Pimenta',
        description: 'Harmonização facial em Londrina com planejamento individual: toxina botulínica, ácido hialurônico e bioestimuladores em etapas, para um resultado natural.',
        h1: 'Harmonização facial em Londrina',
        lead: 'Um planejamento para equilibrar os traços do rosto, combinando procedimentos em etapas e na ordem certa. O objetivo é você parecer descansada e mais bonita &mdash; não diferente.',
        resumo: 'Planejamento facial em etapas para um resultado natural.',
        imagem: { arquivo: 'consultorio-londrina.webp', w: 669, h: 1148, alt: 'Dra. Thais Pimenta no consultório em Londrina com o planejamento facial de uma paciente' },
        fatos: [
            ['1ª consulta', 'Estudo completo do rosto'],
            ['Combina', 'Toxina, ácido hialurônico e bioestimulador'],
            ['Plano', 'Em etapas, no seu ritmo'],
            ['Cirurgia', 'Não é cirúrgico'],
        ],
        secoes: [
            ['O que é harmonização facial', `<p>Harmonização facial é o nome dado a um conjunto de procedimentos minimamente invasivos que equilibram as proporções do rosto. Não é um procedimento único, e sim um plano: cada pessoa recebe uma combinação diferente, de acordo com a anatomia e com o que realmente a incomoda.</p>
<p>O objetivo não é mudar quem você é. Uma harmonização bem feita é aquela em que as pessoas notam que você está mais bonita e descansada, mas não conseguem apontar o que foi feito.</p>`],
            ['O que pode entrar no seu plano', `<ul>
<li><strong><a href="../botox-londrina/">Toxina botulínica</a></strong> para suavizar rugas de expressão e equilibrar a força dos músculos;</li>
<li><strong>Ácido hialurônico</strong> para repor volume e dar sustentação a regiões que perderam estrutura, além do <a href="../preenchimento-labial-londrina/">preenchimento labial</a>;</li>
<li><strong>Bioestimuladores de colágeno</strong> para melhorar a firmeza e a qualidade da pele ao longo dos meses;</li>
<li><strong>Tecnologias para flacidez</strong>, como o <a href="../ultraformer-londrina/">Ultraformer</a>, que trata o contorno sem agulhas;</li>
<li><strong><a href="../perfiloplastia-londrina/">Perfiloplastia</a></strong>, quando o foco é o equilíbrio do perfil: nariz, queixo e mandíbula.</li>
</ul>`],
            ['Como é feito o planejamento', `<p>A primeira consulta é dedicada ao estudo do seu rosto. São avaliadas as proporções entre os terços da face, os ângulos de frente e de perfil, a qualidade da pele e a sua mímica. Tão importante quanto isso é ouvir o que incomoda você: o olhar cansado, um queixo que projeta pouco, a perda de contorno da mandíbula, a papada.</p>
<p>Com isso, a Dra. Thais monta um plano com as etapas, a ordem dos procedimentos e o intervalo entre eles. Fazer tudo de uma vez raramente é o melhor caminho: respeitar o tempo de resposta de cada estrutura é justamente o que preserva a naturalidade. A consulta também serve para dizer quando um procedimento não é indicado para o seu caso.</p>`],
            ['Resultados e manutenção', `<p>Alguns resultados são imediatos, como o do ácido hialurônico; outros aparecem aos poucos, como o efeito da toxina (em até 15 dias) e o dos bioestimuladores (ao longo de alguns meses). Por isso o plano é acompanhado com fotos e consultas de retorno.</p>
<p>Como os produtos são absorvíveis, a harmonização pede manutenção. A frequência depende dos procedimentos escolhidos e é definida junto com você.</p>`],
            ['Para quem é indicada', `<ul>
<li>Quem sente o rosto cansado ou &ldquo;caído&rdquo;, mesmo descansada;</li>
<li>Quem percebe perda de contorno no maxilar e no queixo;</li>
<li>Quem quer corrigir assimetrias ou desproporções sem cirurgia;</li>
<li>Quem prefere ganhos graduais, com resultado discreto e acompanhado.</li>
</ul>`],
        ],
        galeria: [
            { arquivo: 'harmonizacao-facial-antes-depois-2.webp', w: 1000, h: 1250 },
            { arquivo: 'harmonizacao-facial-antes-depois-1.webp', w: 1000, h: 1000 },
        ],
        faq: [
            ['Harmonização facial deixa o rosto artificial?', 'O rosto artificial é consequência de excesso de produto ou de protocolos iguais para todo mundo. Com planejamento individual, doses adequadas e etapas, o resultado é natural.'],
            ['Quanto tempo dura a harmonização facial?', 'Depende dos procedimentos: a toxina botulínica dura em média de 4 a 6 meses; o ácido hialurônico costuma durar de 12 a 18 meses, conforme a região e o produto; os bioestimuladores mantêm o efeito por mais tempo. O plano de manutenção é feito para você.'],
            ['Harmonização facial dói?', 'São usados anestésicos tópicos e, em muitos produtos, há anestésico na própria fórmula. O desconforto é bem tolerado e varia de acordo com a região tratada.'],
            ['Preciso fazer tudo de uma vez?', 'Não, e normalmente não é o ideal. O plano é dividido em etapas, o que permite avaliar a resposta do rosto a cada fase e distribuir o investimento.'],
            ['Quanto custa harmonização facial em Londrina?', 'Como cada plano é diferente, o valor é definido após a avaliação, que é gratuita. Você sai da consulta sabendo as etapas e o investimento de cada uma.'],
        ],
        relacionados: ['perfiloplastia-londrina', 'preenchimento-labial-londrina', 'botox-londrina'],
    },

    {
        slug: 'perfiloplastia-londrina',
        nome: 'Perfiloplastia',
        termo: 'perfiloplastia',
        servico: 'Perfiloplastia (harmonização do perfil)',
        categoria: 'Facial',
        title: 'Perfiloplastia em Londrina | Dra. Thais Pimenta',
        description: 'Perfiloplastia em Londrina: equilíbrio entre nariz, lábios, queixo e mandíbula com ácido hialurônico, sem cirurgia. Com especialista pós-graduada na técnica.',
        h1: 'Perfiloplastia em Londrina',
        lead: 'Pequenos ajustes, mais equilíbrio ao perfil. A perfiloplastia harmoniza nariz, lábios, queixo e mandíbula com ácido hialurônico, sem cirurgia e sem afastamento da rotina.',
        resumo: 'Equilíbrio entre nariz, lábios, queixo e mandíbula.',
        imagem: { arquivo: 'dra-thais-pimenta-produto.webp', w: 900, h: 1198, alt: 'Dra. Thais Pimenta, pós-graduada em perfiloplastia, na clínica em Londrina' },
        fatos: [
            ['Técnica', 'Ácido hialurônico'],
            ['Cirurgia', 'Não é cirúrgica'],
            ['Resultado', 'Imediato; final em ~15 dias'],
            ['Duração', '12 a 18 meses, em média'],
        ],
        secoes: [
            ['O que é perfiloplastia', `<p>Perfiloplastia é a harmonização do rosto visto de lado. Em vez de olhar uma região isolada, ela analisa como nariz, lábios, queixo e mandíbula se relacionam no perfil &mdash; porque, muitas vezes, o que incomoda no nariz é na verdade um queixo que projeta pouco.</p>
<p>Com aplicações de ácido hialurônico em pontos planejados, é possível suavizar desníveis, projetar estruturas e criar linhas mais equilibradas, com resultado imediato e sem cortes.</p>`],
            ['O que pode ser trabalhado', `<ul>
<li><strong>Nariz (rinomodelação):</strong> suavizar a giba (o &ldquo;calombo&rdquo;), elevar a ponta e alinhar o dorso;</li>
<li><strong>Queixo (mento):</strong> dar projeção para equilibrar nariz e lábios;</li>
<li><strong>Mandíbula:</strong> definir o contorno e marcar o ângulo;</li>
<li><strong>Lábios:</strong> ajustar projeção e contorno quando fazem parte do desequilíbrio.</li>
</ul>
<p>Nem todo plano usa todas as regiões; às vezes um único ponto bem escolhido muda o perfil inteiro. E vale saber: a rinomodelação não diminui o nariz. Ela disfarça irregularidades acrescentando volume em pontos estratégicos. Narizes muito grandes ou problemas respiratórios continuam sendo indicação cirúrgica.</p>`],
            ['Como é feito', `<p>Tudo começa com fotos e análise do perfil, para entender as proporções e mostrar a você o que pode ser feito. A aplicação é realizada com anestésico tópico, em sessão que costuma durar de 40 minutos a 1 hora, conforme as regiões tratadas.</p>
<p>O resultado aparece na hora. Inchaço leve e sensibilidade nos primeiros dias são normais, e o resultado final é avaliado em torno de 15 dias.</p>`],
            ['Por que fazer com quem é especialista', `<p>O perfil reúne áreas delicadas, especialmente o nariz, onde o conhecimento de anatomia faz diferença em segurança e em resultado. A Dra. Thais é pós-graduada em perfiloplastia e faz o planejamento de cada caso antes de qualquer aplicação &mdash; incluindo dizer quando o melhor caminho não é o preenchimento.</p>
<p>A perfiloplastia também pode fazer parte de um plano mais amplo de <a href="../harmonizacao-facial-londrina/">harmonização facial</a>.</p>`],
            ['Cuidados depois', `<ul>
<li>Quando o nariz é tratado, evitar óculos apoiados sobre ele nos primeiros dias, conforme orientação;</li>
<li>Evitar exercícios intensos, sauna e calor por 24 a 48 horas;</li>
<li>Não pressionar nem massagear as áreas tratadas;</li>
<li>Dormir de barriga para cima nas primeiras noites, se possível.</li>
</ul>
<p class="tp-nota">Orientações gerais. Na consulta você recebe as recomendações específicas para o seu caso.</p>`],
        ],
        faq: [
            ['Perfiloplastia é a mesma coisa que harmonização facial?', 'A perfiloplastia é uma parte da harmonização, com foco no perfil: nariz, lábios, queixo e mandíbula. A harmonização facial pode incluir outras regiões e outros recursos, como toxina botulínica e bioestimuladores.'],
            ['A rinomodelação diminui o nariz?', 'Não. Ela acrescenta volume em pontos estratégicos para disfarçar a giba, elevar a ponta e alinhar o dorso. O nariz fica mais harmônico, mas não menor.'],
            ['Quanto tempo dura a perfiloplastia?', 'Em média de 12 a 18 meses, variando conforme a região tratada, o produto e o metabolismo de cada pessoa.'],
            ['Tem tempo de recuperação?', 'Você volta à rotina no mesmo dia. Pode haver inchaço leve e sensibilidade por alguns dias.'],
            ['Quanto custa perfiloplastia em Londrina?', 'O valor depende das regiões tratadas e da quantidade de produto, e é passado depois da avaliação do seu perfil.'],
        ],
        relacionados: ['harmonizacao-facial-londrina', 'preenchimento-labial-londrina', 'botox-londrina'],
    },

    {
        slug: 'botox-sorriso-gengival-londrina',
        nome: 'Sorriso gengival',
        termo: 'botox para sorriso gengival',
        servico: 'Botox para sorriso gengival',
        categoria: 'Facial',
        title: 'Botox para Sorriso Gengival em Londrina | Dra. Thais Pimenta',
        description: 'Botox para sorriso gengival em Londrina: menos gengiva aparente ao sorrir, sem cirurgia, com doses pequenas e efeito natural. Agende sua avaliação.',
        h1: 'Botox para sorriso gengival em Londrina',
        lead: 'Quando o lábio sobe demais e mostra muita gengiva ao sorrir, doses pequenas de toxina botulínica equilibram o movimento, sem cirurgia e mantendo o sorriso natural.',
        resumo: 'Menos gengiva aparente ao sorrir, sem cirurgia.',
        imagem: { arquivo: 'botox-sorriso-gengival-londrina.webp', w: 800, h: 800, alt: 'Antes e depois de botox para sorriso gengival: menos gengiva aparente ao sorrir' },
        fatos: [
            ['Sessão', 'Rápida, poucos pontos'],
            ['Resultado', 'Em poucos dias'],
            ['Duração', '3 a 4 meses, em média'],
            ['Rotina', 'Volta no mesmo dia'],
        ],
        secoes: [
            ['O que é sorriso gengival', `<p>Fala-se em sorriso gengival quando uma faixa grande de gengiva aparece ao sorrir. Não é um problema de saúde, mas incomoda muita gente nas fotos e faz algumas pessoas sorrirem &ldquo;contidas&rdquo;.</p>
<p>Uma das causas mais comuns é a força dos músculos que elevam o lábio superior. Quando esse é o caso, a toxina botulínica é uma solução simples e eficaz.</p>`],
            ['Como o botox ajuda', `<p>Com doses pequenas e pontos precisos nos músculos elevadores do lábio, o movimento é reduzido apenas o suficiente para o lábio cobrir melhor a gengiva. O sorriso continua espontâneo &mdash; só fica mais equilibrado.</p>
<p>É um dos procedimentos com maior impacto e menor intervenção: poucos pontos, aplicação rápida e nenhuma necessidade de afastamento.</p>`],
            ['Quando o botox não é a solução', `<p>O sorriso gengival também pode ter origem nos dentes (dentes curtos ou gengiva cobrindo parte do dente) ou nos ossos da face. Nesses casos o tratamento é odontológico ou cirúrgico, e a toxina pode, no máximo, complementar. A avaliação identifica a causa antes de qualquer aplicação e, se for o caso, você é orientada a procurar o profissional certo.</p>`],
            ['Resultado e duração', `<p>O efeito começa a aparecer em poucos dias e se completa em cerca de duas semanas. A duração média é de três a quatro meses nas primeiras aplicações, um pouco menor que a do <a href="../botox-londrina/">botox na testa</a>, porque a região da boca é muito movimentada.</p>`],
            ['Cuidados depois da aplicação', CUIDADOS_TOXINA],
        ],
        faq: [
            ['O sorriso fica artificial depois do botox?', 'Não quando a dose é correta. A ideia é reduzir só o excesso de elevação do lábio; o sorriso continua natural.'],
            ['Quanto tempo dura o botox no sorriso gengival?', 'Em média de 3 a 4 meses. O intervalo das manutenções é definido conforme a sua resposta.'],
            ['Dói?', 'São poucos pontos com agulha bem fina. O desconforto é pequeno e rápido.'],
            ['Botox resolve qualquer sorriso gengival?', 'Não. Ele funciona quando a causa é muscular. Se a origem for nos dentes ou nos ossos, a indicação é outra, e isso é identificado na avaliação.'],
        ],
        relacionados: ['botox-londrina', 'preenchimento-labial-londrina', 'harmonizacao-facial-londrina'],
    },

    {
        slug: 'criolipolise-londrina',
        nome: 'Criolipólise',
        termo: 'criolipólise',
        servico: 'Criolipólise',
        categoria: 'Corporal',
        title: 'Criolipólise em Londrina | Dra. Thais Pimenta',
        description: 'Criolipólise em Londrina para gordura localizada no abdômen, flancos, costas e culote, sem cirurgia. Avaliação para definir áreas, placas e sessões.',
        h1: 'Criolipólise em Londrina',
        lead: 'Congelamento controlado das células de gordura para reduzir aquela gordura localizada que não sai com dieta e exercício. Sem cortes, sem anestesia e sem afastamento.',
        resumo: 'Redução de gordura localizada sem cirurgia.',
        imagem: { arquivo: 'criolipolise-londrina.webp', w: 800, h: 1001, alt: 'Antes e depois de criolipólise no abdômen e flancos em paciente da Dra. Thais Pimenta' },
        fatos: [
            ['Sessão', 'Cerca de 60 min por área'],
            ['Primeiros sinais', 'A partir de 30 dias'],
            ['Resultado final', 'Por volta de 90 dias'],
            ['Rotina', 'Volta no mesmo dia'],
        ],
        secoes: [
            ['Como a criolipólise funciona', `<p>As células de gordura são mais sensíveis ao frio do que a pele e os outros tecidos. A criolipólise aproveita essa diferença: um aplicador resfria a região de forma controlada, e as células de gordura atingidas entram em um processo natural de eliminação.</p>
<p>Nas semanas seguintes, o próprio organismo remove essas células aos poucos. Por isso o resultado não é imediato: ele vai aparecendo ao longo de dois a três meses.</p>`],
            ['Para quem é indicada', `<ul>
<li>Gordura localizada no abdômen, flancos (os &ldquo;pneuzinhos&rdquo;), costas, culote, interno de coxa e braços;</li>
<li>Pessoas com peso estável, que já se exercitam e se alimentam bem, mas mantêm aquela gordura resistente;</li>
<li>Quem quer reduzir medidas sem cirurgia e sem parar a rotina.</li>
</ul>
<p>A criolipólise <strong>não é tratamento para emagrecer</strong>: ela trata acúmulos localizados. Flacidez de pele pede outros recursos, como o <a href="../ultraformer-londrina/">Ultraformer</a>.</p>`],
            ['Como é a sessão', `<p>Na avaliação são definidas as áreas, o tamanho das placas e quantas aplicações a sua região precisa. No dia, a pele é protegida com uma manta específica e o aplicador é posicionado. Nos primeiros minutos há sensação de frio intenso e de sucção, que logo passa conforme a área adormece.</p>
<p>Cada aplicação dura cerca de 60 minutos. Dá para ler, usar o celular ou descansar durante a sessão. Ao final, a região é massageada e você volta às atividades normalmente.</p>`],
            ['O que esperar depois', `<ul>
<li>Vermelhidão, inchaço e sensibilidade na área são comuns nos primeiros dias;</li>
<li>Dormência ou formigamento podem durar algumas semanas e desaparecem sozinhos;</li>
<li>Manter hidratação, alimentação equilibrada e atividade física ajuda o resultado;</li>
<li>Uma nova sessão na mesma área, quando indicada, é feita depois de 60 a 90 dias.</li>
</ul>`],
            ['Quem não deve fazer', `<p>A criolipólise é contraindicada para gestantes, pessoas com doenças relacionadas ao frio (como crioglobulinemia, urticária ao frio e hemoglobinúria paroxística ao frio), hérnia na região a ser tratada, feridas ou alteração de sensibilidade na pele da área.</p>`],
        ],
        faq: [
            ['Criolipólise dói?', 'No início há sensação de frio intenso e de sucção, que passa em poucos minutos quando a região adormece. Depois, a sessão costuma ser tranquila.'],
            ['Quantas sessões de criolipólise são necessárias?', 'Depende da quantidade de gordura e do tamanho da área. Muitas pacientes têm bom resultado com uma aplicação por região; outras precisam de duas. A avaliação define o seu plano antes de começar.'],
            ['Em quanto tempo vejo o resultado?', 'As primeiras mudanças aparecem a partir de 30 dias, e o resultado final por volta de 90 dias após a sessão.'],
            ['A gordura volta depois da criolipólise?', 'As células eliminadas não voltam. Mas as que permanecem podem aumentar de tamanho se houver ganho de peso, por isso manter hábitos saudáveis faz parte do resultado.'],
            ['Quanto custa criolipólise em Londrina?', 'O valor depende das áreas e da quantidade de aplicações, e é informado após a avaliação.'],
        ],
        relacionados: ['lipo-enzimatica-londrina', 'ultraformer-londrina', 'depilacao-led-londrina'],
    },

    {
        slug: 'lipo-enzimatica-londrina',
        nome: 'Lipo enzimática',
        termo: 'lipo enzimática',
        servico: 'Lipo enzimática',
        categoria: 'Corporal',
        title: 'Lipo Enzimática em Londrina | Dra. Thais Pimenta',
        description: 'Lipo enzimática em Londrina: aplicação de ativos na gordura localizada do abdômen, flancos e braços, em sessões e sem cirurgia. Agende sua avaliação.',
        h1: 'Lipo enzimática em Londrina',
        lead: 'Aplicação de ativos diretamente na camada de gordura para ajudar a reduzir medidas em áreas específicas, em sessões rápidas e sem cirurgia.',
        resumo: 'Ativos aplicados na gordura localizada, em sessões.',
        imagem: { arquivo: 'lipo-enzimatica-londrina.webp', w: 800, h: 1001, alt: 'Antes e depois de lipo enzimática no abdômen em paciente da Dra. Thais Pimenta' },
        fatos: [
            ['Aplicação', 'Injetável, agulhas finas'],
            ['Protocolo', 'Sessões espaçadas'],
            ['Áreas', 'Abdômen, flancos, culote, braços'],
            ['Rotina', 'Volta no mesmo dia'],
        ],
        secoes: [
            ['O que é a lipo enzimática', `<p>Apesar do nome, a lipo enzimática não é uma lipoaspiração. É um tratamento injetável em que ativos são aplicados na camada de gordura para estimular a quebra das células adiposas e melhorar o aspecto da região. A gordura liberada é metabolizada pelo próprio organismo.</p>
<p>O tratamento é feito em sessões, com a combinação de ativos escolhida conforme a área e o objetivo de cada paciente.</p>`],
            ['Para quem é indicada', `<ul>
<li>Gordura localizada em áreas específicas, como abdômen, flancos, culote e braços;</li>
<li>Quem está com o peso próximo do ideal e quer refinar o contorno;</li>
<li>Quem busca um complemento à rotina de alimentação e exercícios.</li>
</ul>
<p>Assim como a <a href="../criolipolise-londrina/">criolipólise</a>, ela não é tratamento para emagrecimento. Na avaliação é definido qual das duas, ou a combinação, faz mais sentido para o seu caso.</p>`],
            ['Como é o tratamento', `<p>Antes da primeira sessão são avaliados o histórico de saúde, os medicamentos em uso e o objetivo real. A aplicação é feita com agulhas finas, em vários pontos da área, e leva poucos minutos por região.</p>
<p>O número de sessões e o intervalo entre elas variam de acordo com a resposta de cada pessoa. Orientações de rotina e outros recursos corporais costumam ser associados para potencializar o resultado.</p>`],
            ['Depois da aplicação', `<ul>
<li>A área pode ficar sensível, avermelhada ou levemente inchada por alguns dias;</li>
<li>Pequenos hematomas podem aparecer e somem sozinhos;</li>
<li>Beber bastante água e manter atividade física ajudam o organismo a eliminar a gordura;</li>
<li>Evitar bebida alcoólica nos dias próximos à aplicação.</li>
</ul>`],
            ['Quem não deve fazer', `<p>Não é indicada para gestantes e lactantes, pessoas com alergia a algum componente, doenças hepáticas ou renais, distúrbios de coagulação ou infecção na área. Diabetes e outras condições crônicas são avaliadas caso a caso.</p>`],
        ],
        faq: [
            ['Lipo enzimática dói?', 'A aplicação é feita com agulhas finas e o desconforto é tolerável. Depois, a região pode ficar sensível por alguns dias.'],
            ['Quantas sessões de lipo enzimática são necessárias?', 'Varia conforme a área e a quantidade de gordura. O protocolo é montado na avaliação, e a resposta é acompanhada a cada sessão.'],
            ['Lipo enzimática ou criolipólise: qual é melhor?', 'Depende da área, da quantidade de gordura e da sua rotina. A criolipólise trata áreas maiores em uma sessão mais longa; a lipo enzimática permite tratar regiões menores e ajustar o protocolo a cada sessão. Na avaliação você recebe a indicação para o seu caso.'],
            ['Preciso de repouso depois?', 'Não. Você volta às atividades no mesmo dia.'],
        ],
        relacionados: ['criolipolise-londrina', 'ultraformer-londrina', 'depilacao-led-londrina'],
    },

    {
        slug: 'ultraformer-londrina',
        nome: 'Ultraformer',
        termo: 'Ultraformer',
        servico: 'Ultraformer (ultrassom microfocado)',
        categoria: 'Facial e corporal',
        title: 'Ultraformer em Londrina | Lifting sem Cirurgia | Dra. Thais',
        description: 'Ultraformer em Londrina: ultrassom microfocado para flacidez do rosto, papada e corpo. Estimula colágeno e melhora a sustentação sem cortes.',
        h1: 'Ultraformer em Londrina',
        lead: 'Ultrassom microfocado que atinge as camadas profundas da pele para estimular colágeno e firmar o contorno do rosto e do corpo, o chamado lifting sem cirurgia.',
        resumo: 'Flacidez do rosto e do corpo, sem cortes.',
        imagem: { arquivo: 'ultraformer-londrina.webp', w: 800, h: 1422, alt: 'Antes e depois de Ultraformer no rosto: contorno mais firme em paciente da Dra. Thais Pimenta' },
        fatos: [
            ['Sessão', '30 a 60 minutos'],
            ['Resultado', 'Progressivo, 60 a 90 dias'],
            ['Áreas', 'Rosto, papada, pescoço e corpo'],
            ['Rotina', 'Volta no mesmo dia'],
        ],
        secoes: [
            ['Como o Ultraformer funciona', `<p>O Ultraformer usa ultrassom microfocado para gerar pontos de calor em profundidades precisas da pele, incluindo a camada muscular superficial (SMAS), a mesma tratada no lifting cirúrgico. Esse estímulo provoca uma retração imediata dos tecidos e ativa a produção de colágeno novo nos meses seguintes.</p>
<p>O resultado é uma pele mais firme e um contorno mais definido, sem cortes, sem agulhas e sem tempo de recuperação.</p>`],
            ['Para quem é indicado', `<ul>
<li>Flacidez inicial a moderada no rosto: contorno da mandíbula, bigode chinês, sobrancelha caída;</li>
<li>Papada e flacidez no pescoço;</li>
<li>Flacidez corporal em braços, abdômen, interno de coxa e acima dos joelhos;</li>
<li>Quem quer prevenir a perda de firmeza e manter a qualidade da pele.</li>
</ul>
<p>Flacidez muito acentuada pode precisar de combinação com outros tratamentos, ou de avaliação cirúrgica. Isso é conversado com sinceridade na consulta.</p>`],
            ['Como é a sessão', `<p>Depois da limpeza da pele, o aparelho é aplicado em linhas sobre a área tratada. Durante os disparos há sensação de calor e pontadas, mais intensas em regiões próximas ao osso; a intensidade é ajustada para manter o conforto.</p>
<p>A sessão dura de 30 minutos a 1 hora, conforme as áreas. Você sai com a pele levemente avermelhada, o que passa em poucas horas, e pode voltar à rotina e até se maquiar no mesmo dia.</p>`],
            ['Resultado e manutenção', `<p>Parte da firmeza aparece logo após a sessão, mas o resultado principal vem aos poucos, conforme o colágeno novo se forma, entre 60 e 90 dias. Para manter, costuma-se repetir o tratamento a cada 6 a 12 meses, conforme a resposta da pele.</p>
<p>O Ultraformer combina bem com a <a href="../harmonizacao-facial-londrina/">harmonização facial</a>: enquanto ele trata a sustentação, os injetáveis cuidam de volume e rugas.</p>`],
            ['Cuidados e contraindicações', `<p>Depois da sessão, use protetor solar e mantenha a pele hidratada. O Ultraformer não é indicado para gestantes, pessoas com implantes metálicos ou eletrônicos na área tratada (como marca-passo), feridas, infecções ou doenças de pele ativas na região.</p>`],
        ],
        faq: [
            ['Ultraformer dói?', 'Há sensação de calor e pontadas durante os disparos, mais intensa perto dos ossos. A potência é ajustada para a sessão ficar tolerável.'],
            ['Quando aparece o resultado do Ultraformer?', 'Há um efeito de firmeza logo após a sessão, mas o resultado principal se forma entre 60 e 90 dias, com a produção de colágeno novo.'],
            ['Quantas sessões de Ultraformer preciso fazer?', 'Muitas vezes uma sessão já traz bom resultado. A manutenção costuma ser feita a cada 6 a 12 meses, conforme a sua pele.'],
            ['Ultraformer substitui o lifting cirúrgico?', 'Não em casos de flacidez acentuada. Ele é indicado para flacidez inicial a moderada e para prevenção. A avaliação mostra se o seu caso se beneficia do tratamento.'],
            ['Quanto custa Ultraformer em Londrina?', 'O valor varia de acordo com as áreas tratadas e é informado após a avaliação.'],
        ],
        relacionados: ['harmonizacao-facial-londrina', 'botox-londrina', 'criolipolise-londrina'],
    },

    {
        slug: 'terapia-capilar-londrina',
        nome: 'Terapia capilar',
        termo: 'terapia capilar',
        servico: 'Terapia capilar',
        categoria: 'Capilar',
        title: 'Terapia Capilar em Londrina | Queda de Cabelo | Dra. Thais',
        description: 'Terapia capilar em Londrina para queda, afinamento dos fios, oleosidade e caspa. Avaliação do couro cabeludo e protocolo para homens e mulheres.',
        h1: 'Terapia capilar em Londrina',
        lead: 'Tratamento do couro cabeludo para queda, afinamento dos fios, oleosidade e descamação, com protocolo montado a partir da avaliação, para homens e mulheres.',
        resumo: 'Couro cabeludo saudável e fios mais fortes.',
        imagem: { arquivo: 'terapia-capilar-londrina.webp', w: 800, h: 800, alt: 'Antes e depois de terapia capilar: mais densidade no topo da cabeça em paciente da Dra. Thais Pimenta' },
        fatos: [
            ['Avaliação', 'Couro cabeludo e fios'],
            ['Protocolo', 'Sessões periódicas'],
            ['Para', 'Homens e mulheres'],
            ['Em casa', 'Orientação de cuidados'],
        ],
        secoes: [
            ['O que é terapia capilar', `<p>A terapia capilar cuida do couro cabeludo, e não só do fio. É ali que o cabelo nasce: quando a pele da cabeça está inflamada, oleosa demais ou com a circulação comprometida, os fios crescem mais finos e fracos, e caem com mais facilidade.</p>
<p>O tratamento combina limpeza profunda, ativos específicos e técnicas que estimulam a circulação local, sempre com um protocolo pensado para a causa do problema.</p>`],
            ['Quando procurar', `<ul>
<li>Queda de cabelo acima do normal, inclusive depois de estresse, dietas ou pós-parto;</li>
<li>Fios cada vez mais finos ou falhas aparecendo;</li>
<li>Oleosidade excessiva, caspa ou descamação;</li>
<li>Coceira ou sensibilidade no couro cabeludo;</li>
<li>Manutenção da saúde capilar depois de químicas e procedimentos.</li>
</ul>`],
            ['Como funciona o tratamento', `<p>A primeira consulta é uma avaliação do couro cabeludo e dos fios, além de uma conversa sobre rotina, alimentação, uso de medicamentos e histórico familiar. Isso ajuda a entender o que está por trás da queda ou do afinamento.</p>
<p>Com esse diagnóstico, é montado um protocolo de sessões na clínica e uma orientação de cuidados em casa. A terapia capilar é um tratamento de constância: os resultados aparecem com a sequência das sessões, não em uma visita só.</p>`],
            ['Quando é preciso ir ao médico', `<p>Algumas quedas têm causas que precisam de investigação médica, como alterações hormonais, de tireoide ou deficiência de ferro. Queda súbita e intensa, falhas redondas bem delimitadas ou áreas com vermelhidão e cicatriz devem ser avaliadas por um dermatologista. Quando a avaliação identifica esses sinais, você é orientada a procurar o médico, e a terapia capilar pode seguir como complemento.</p>`],
        ],
        faq: [
            ['Terapia capilar funciona para queda de cabelo?', 'Funciona quando a queda está ligada às condições do couro cabeludo, como oleosidade, inflamação e circulação. Quando há causa hormonal ou outra condição médica, a terapia entra como complemento ao tratamento médico.'],
            ['Quantas sessões são necessárias?', 'Depende do quadro. O protocolo é definido na avaliação, e a evolução é acompanhada ao longo das sessões.'],
            ['Homens podem fazer terapia capilar?', 'Sim. O tratamento atende homens e mulheres, tanto em quadros de queda quanto na manutenção da saúde do couro cabeludo.'],
            ['Em quanto tempo vejo resultado?', 'O ciclo do cabelo é lento, então as mudanças costumam ser percebidas ao longo de algumas semanas a poucos meses, com a sequência das sessões e os cuidados em casa.'],
        ],
        relacionados: ['botox-londrina', 'harmonizacao-facial-londrina', 'depilacao-led-londrina'],
    },

    {
        slug: 'depilacao-led-londrina',
        nome: 'Depilação a LED',
        termo: 'depilação a LED',
        servico: 'Depilação a LED',
        categoria: 'Corporal',
        title: 'Depilação a LED em Londrina | Dra. Thais Pimenta',
        description: 'Depilação a LED em Londrina: redução progressiva dos pelos com conforto, sem cortes, irritação ou pelos encravados. Avaliação com estimativa de sessões.',
        h1: 'Depilação a LED em Londrina',
        lead: 'Tecnologia que atua no folículo para reduzir a quantidade e a espessura dos pelos a cada sessão, com desconforto baixo e sem os pelos encravados da lâmina e da cera.',
        resumo: 'Redução progressiva dos pelos, com conforto.',
        imagem: { arquivo: 'depilacao-led-londrina.webp', w: 1024, h: 1536, alt: 'Dra. Thais Pimenta com o aparelho de depilação a LED na clínica em Londrina' },
        fatos: [
            ['Sessão', 'Rápida, conforme a área'],
            ['Sensação', 'Calor tolerável'],
            ['Resultado', 'Menos pelos a cada sessão'],
            ['Rotina', 'Volta no mesmo dia'],
        ],
        secoes: [
            ['Como funciona a depilação a LED', `<p>A depilação a LED usa luz para aquecer o folículo, a estrutura que produz o pelo. Com sessões repetidas, o folículo perde a capacidade de produzir fios, e os pelos que voltam a crescer ficam cada vez mais finos e espaçados.</p>
<p>Diferente da lâmina e da cera, que só removem o pelo, a depilação a LED trata a raiz. Por isso o resultado é progressivo e duradouro, e acaba com cortes, irritação e pelos encravados.</p>`],
            ['Por que o tratamento é feito em sessões', `<p>Os pelos crescem em ciclos, e a luz só age nos que estão na fase de crescimento no dia da sessão. Por isso são necessárias várias aplicações, com intervalo definido para alcançar os fios conforme eles entram nessa fase.</p>
<p>O número de sessões varia conforme a área, a espessura do pelo e o ciclo de cada região: axilas e virilha respondem em ritmo diferente das pernas. Na avaliação você recebe uma estimativa realista para o seu caso antes de começar, sem pacote fechado no escuro.</p>`],
            ['Áreas mais procuradas', `<ul>
<li>Axilas;</li>
<li>Virilha;</li>
<li>Pernas inteiras ou meia perna;</li>
<li>Buço e rosto;</li>
<li>Braços e abdômen.</li>
</ul>`],
            ['Como se preparar e cuidados', `<ul>
<li>Raspar a área com lâmina um dia antes da sessão;</li>
<li>Não usar cera, pinça ou depilador entre as sessões: eles arrancam a raiz que o tratamento precisa atingir;</li>
<li>Evitar sol e bronzeamento na área antes e depois das sessões;</li>
<li>Usar protetor solar nas áreas expostas;</li>
<li>Avisar sobre uso de medicamentos ou cremes que deixam a pele sensível ao sol.</li>
</ul>`],
            ['Quem não deve fazer', `<p>Durante a gestação a depilação a LED não é recomendada. Pele bronzeada recentemente, feridas, infecções ou lesões na área e uso de medicamentos fotossensibilizantes também pedem adiar o tratamento. Pelos muito claros, brancos ou ruivos respondem pouco à luz, e isso é avaliado antes de começar.</p>`],
        ],
        faq: [
            ['Depilação a LED dói?', 'O desconforto é baixo: a maioria das pacientes descreve como um calor tolerável. Áreas mais sensíveis, como virilha e buço, podem incomodar um pouco mais.'],
            ['Quantas sessões de depilação a LED são necessárias?', 'Varia conforme a área, a espessura dos pelos e o ciclo de crescimento de cada região. Na avaliação você recebe uma estimativa para o seu caso.'],
            ['Funciona em todos os tipos de pele?', 'A tecnologia atende diferentes tons de pele, com os parâmetros ajustados para cada uma. Pelos muito claros, brancos ou ruivos respondem menos, e isso é avaliado antes.'],
            ['Posso depilar com cera entre as sessões?', 'Não. Cera, pinça e depilador arrancam a raiz que o tratamento precisa atingir. Entre as sessões, use apenas lâmina.'],
        ],
        relacionados: ['criolipolise-londrina', 'lipo-enzimatica-londrina', 'terapia-capilar-londrina'],
    },
];
