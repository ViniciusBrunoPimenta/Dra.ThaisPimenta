# Dra. Thais Pimenta – site

Site estático (HTML/CSS/JS) publicado na Netlify em https://drathaisapimenta.com.br.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | Página inicial |
| `<tratamento>-londrina/index.html` | Uma página por tratamento (gerada) |
| `404.html` | Página de "não encontrado" (gerada; a Netlify usa sozinha) |
| `sitemap.xml` | Mapa do site para o Google (gerado) |
| `mobile-style.css` | Estilos de todo o site |
| `main.js` | Menu, sliders, voltar ao topo (todas as páginas) |
| `script.js` | Contador da oferta (home) |
| `avaliacoes.js` | Avaliações do Google ao vivo (opcional, ver abaixo) |
| `netlify/functions/avaliacoes-google.mjs` | Função que busca as avaliações no Google |
| `ferramentas/conteudo.mjs` | **Texto das páginas de tratamento, avaliações e dados da clínica** |
| `ferramentas/gerar-paginas.mjs` | Gerador das páginas, do 404 e do sitemap |
| `images/otimizadas/` | Fotos em WebP usadas pelo site (os originais continuam em `images/` e `Serviços/`) |

## Editar uma página de tratamento, adicionar um tratamento ou trocar avaliações

1. Edite `ferramentas/conteudo.mjs` (cada tratamento é um bloco com título, texto, perguntas frequentes etc.).
2. Rode na pasta do projeto:

   ```
   node ferramentas/gerar-paginas.mjs
   ```

3. Faça commit de tudo que mudou e envie para o GitHub; a Netlify publica sozinha.

Não edite à mão os HTML das pastas `*-londrina/`, o `404.html` ou o `sitemap.xml`: eles são sobrescritos pelo gerador.
Na `index.html`, só os trechos entre `<!-- gerado:...:inicio -->` e `<!-- gerado:...:fim -->` são do gerador; o resto pode ser editado normalmente.

Depois de publicar páginas novas, envie o sitemap no Google Search Console (`https://drathaisapimenta.com.br/sitemap.xml`).

## Oferta com contador

Na `index.html`, seção `countdown-section`: preencha `data-oferta-fim="2026-12-20T23:59:59"` e ajuste o texto.
Sem data, ou com a data vencida, a seção fica escondida automaticamente.

## Avaliações do Google ao vivo (opcional)

Sem configuração nenhuma, o site mostra as avaliações copiadas em `ferramentas/conteudo.mjs`.
Para mostrar nota, total e as avaliações mais recentes direto do Google:

1. **Google Cloud**: crie um projeto, ative a **Places API (New)** e crie uma chave de API.
   Restrinja a chave à "Places API (New)". É preciso ter uma conta de faturamento ativa (há cota gratuita mensal).
2. **Place ID**: encontre o ID do perfil "Dra Thais Pimenta Estética Londrina" em
   https://developers.google.com/maps/documentation/places/web-service/place-id
3. **Limite de custo (importante)**: em *APIs e serviços → Places API (New) → Cotas*, defina um limite diário de
   requisições (ex.: 30 por dia). Se passar do limite, o site volta sozinho para as avaliações estáticas.
4. **Netlify** → *Site configuration → Environment variables*:
   - `GOOGLE_PLACES_API_KEY` = a chave
   - `GOOGLE_PLACE_ID` = o Place ID
   - `AVALIACOES_NOTA_MINIMA` = opcional, padrão `4`
5. Faça um novo deploy. Teste em `https://drathaisapimenta.com.br/api/avaliacoes-google`.

Coloque o mesmo Place ID em `SITE.google.placeId` (`ferramentas/conteudo.mjs`) e rode o gerador para o botão
"Deixe sua avaliação" abrir direto o formulário do Google.

A função não guarda as avaliações em cache de propósito (os termos do Google Maps não permitem); o controle de custo é a cota diária do passo 3.
