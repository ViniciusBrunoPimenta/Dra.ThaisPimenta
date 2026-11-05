#!/usr/bin/env node
// Gera as paginas de tratamento, o 404, o sitemap e os blocos compartilhados da home.
//
//   node ferramentas/gerar-paginas.mjs
//
// Saidas:
//   <slug>/index.html             uma pagina por tratamento (URL /<slug>/)
//   404.html                      pagina de "nao encontrado" (a Netlify usa automaticamente)
//   sitemap.xml                   home + todas as paginas, com imagens
//   index.html                    so os trechos entre <!-- gerado:NOME:inicio --> e <!-- gerado:NOME:fim -->
//
// Sem dependencias: so Node 18+.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, AVALIACOES, AUTORA, TRATAMENTOS } from './conteudo.mjs';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOJE = new Date().toISOString().slice(0, 10);
const POR_SLUG = Object.fromEntries(TRATAMENTOS.map((t) => [t.slug, t]));

// ---------------------------------------------------------------- utilitarios

const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ENTIDADES = { '&mdash;': '—', '&ndash;': '–', '&ldquo;': '“', '&rdquo;': '”', '&amp;': '&', '&nbsp;': ' ' };
const textoPlano = (html) => html
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, (e) => ENTIDADES[e] ?? e)
    .replace(/\s+/g, ' ')
    .trim();

const jsonLd = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

const whatsapp = (texto) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
const textoWhats = (t) => t
    ? `Olá! Vim pelo site e gostaria de agendar uma avaliação de ${t.termo}.`
    : 'Olá! Vim pelo site e gostaria de agendar uma avaliação com a Dra. Thais.';

const linkPerfilGoogle = () => SITE.google.placeId
    ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(SITE.google.placeId)}`
    : SITE.google.buscaPerfil;
const linkAvaliarGoogle = () => SITE.google.placeId
    ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(SITE.google.placeId)}`
    : SITE.google.buscaPerfil;

const urlPagina = (t) => `${SITE.url}/${t.slug}/`;
const urlImagem = (arquivo) => `${SITE.url}/images/otimizadas/${arquivo}`;

function enderecoSchema() {
    const e = SITE.endereco;
    return { '@type': 'PostalAddress', streetAddress: e.rua, addressLocality: e.cidade, addressRegion: e.uf, postalCode: e.cep, addressCountry: 'BR' };
}

function clinicaResumo() {
    return {
        '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
        '@id': `${SITE.url}/#clinica`,
        name: SITE.nomeNegocio,
        url: `${SITE.url}/`,
        telephone: SITE.telefoneE164,
        image: `${SITE.url}/images/og-preview.jpg`,
        priceRange: '$$',
        address: enderecoSchema(),
    };
}

// ---------------------------------------------------------------- blocos de pagina

function head({ title, description, canonical, base, schema }) {
    return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Pagina gerada por ferramentas/gerar-paginas.mjs. Edite ferramentas/conteudo.mjs e gere de novo. -->

    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="${canonical ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">
    ${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
    <meta name="geo.region" content="BR-PR">
    <meta name="geo.placename" content="Londrina">
    <meta name="theme-color" content="#D2B48C">

    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:type" content="website">
    ${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
    <meta property="og:image" content="${SITE.url}/images/og-preview.jpg">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="${esc(SITE.nome)}">
    <meta property="og:locale" content="pt_BR">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${SITE.url}/images/og-preview.jpg">

    <link rel="icon" type="image/png" href="${base}images/logoinicio.png">
    <link rel="apple-touch-icon" href="${base}images/logoinicio.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${base}mobile-style.css">
${schema ? '\n    ' + schema.replace(/\n/g, '\n    ') + '\n' : ''}</head>`;
}

// ancorasLocais: a pagina tem as secoes #avaliacoes e #contato (paginas de tratamento);
// senao, os links apontam para as secoes da home.
function nav(base, ancorasLocais = true) {
    const avaliacoes = ancorasLocais ? '#avaliacoes' : `${base}#avaliacoes`;
    const contato = ancorasLocais ? '#contato' : `${base}#contato-section`;
    return `
    <nav class="mobile-nav" aria-label="Menu principal">
        <div class="nav-header">
            <a href="${base}" aria-label="Página inicial">
                <img src="${base}images/logoinicio.png" alt="Dra. Thais Pimenta Estética" class="mobile-logo" width="154" height="53">
            </a>
            <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-principal">
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
        </div>
        <div class="nav-overlay"></div>
        <div class="nav-menu" id="menu-principal">
            <button class="close-menu" aria-label="Fechar menu">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
            <a href="${base}">Início</a>
            <a href="${base}#sobre-section">Sobre</a>
            <a href="${base}#tratamentos-section">Tratamentos</a>
            <a href="${avaliacoes}">Avaliações</a>
            <a href="${contato}">Contato</a>
        </div>
    </nav>`;
}

export function rodapeTratamentos(base) {
    const links = TRATAMENTOS.map((t) => `                <a href="${base}${t.slug}/">${esc(t.nome)}</a>`).join('\n');
    return `
            <div class="footer-links">
                <h4>Tratamentos</h4>
${links}
            </div>
`;
}

function rodape(base) {
    return `
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-brand">
                <img src="${base}images/logoinicio.png" alt="Logo Dra. Thais Pimenta" class="footer-logo" width="154" height="53" loading="lazy">
                <p>Estética &amp; Bem-estar com cuidado humanizado.</p>
                <div class="footer-social">
                    <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
                    <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
                    <a href="${whatsapp(textoWhats())}" aria-label="WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
                </div>
            </div>

            <div class="footer-links">
                <h4>Navegação</h4>
                <a href="${base}">Início</a>
                <a href="${base}#sobre-section">Sobre a Dra.</a>
                <a href="${base}#tratamentos-section">Tratamentos</a>
                <a href="${base}#avaliacoes">Avaliações</a>
                <a href="${base}#contato-section">Contato</a>
            </div>
${rodapeTratamentos(base)}
            <div class="footer-contact">
                <h4>Contato</h4>
                <p><i class="fab fa-whatsapp" aria-hidden="true"></i> ${SITE.telefoneExibicao}</p>
                <p><i class="fas fa-envelope" aria-hidden="true"></i> ${SITE.email}</p>
                <p><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${SITE.endereco.ruaExibicao} – ${SITE.endereco.bairro}, ${SITE.endereco.cidade}/${SITE.endereco.uf}</p>
                <p><i class="fas fa-clock" aria-hidden="true"></i> ${SITE.horarioCurto}</p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${esc(SITE.nome)}. Todos os direitos reservados.</p>
            <p class="footer-lgpd">Seus dados são protegidos conforme a <strong>LGPD</strong> – Lei nº 13.709/2018.</p>
        </div>
    </footer>`;
}

function flutuantes(t) {
    return `
    <a class="whatsapp-float" href="${whatsapp(textoWhats(t))}" aria-label="Agendar pelo WhatsApp">
        <i class="fab fa-whatsapp" aria-hidden="true"></i><span>Agendar pelo WhatsApp</span>
    </a>
    <button class="back-to-top" aria-label="Voltar ao topo">
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
    </button>`;
}

export function blocoAvaliacoes({ id = 'avaliacoes', titulo = 'O que dizem nossas pacientes' } = {}) {
    const estrelas = (n) => '<i class="fas fa-star" aria-hidden="true"></i>'.repeat(n);
    const cartoes = AVALIACOES.map((a) => `
            <figure class="review-card">
                <div class="review-stars" role="img" aria-label="Nota ${a.nota} de 5">${estrelas(a.nota)}</div>
                <blockquote class="review-text"><p>${esc(a.texto)}</p></blockquote>
                <figcaption class="review-author">
                    <span class="review-avatar" aria-hidden="true">${a.inicial ? esc(a.inicial) : '<i class="fab fa-google"></i>'}</span>
                    <span><strong>${esc(a.autor || 'Paciente da clínica')}</strong><span class="review-meta">Avaliação no Google</span></span>
                </figcaption>
            </figure>`).join('');

    return `
    <section class="reviews-section" id="${id}" data-avaliacoes aria-labelledby="${id}-titulo">
        <div class="reviews-inner">
            <div class="reviews-head">
                <div>
                    <span class="reviews-eyebrow">Quem já é paciente</span>
                    <h2 id="${id}-titulo">${esc(titulo)}</h2>
                </div>
                <div class="reviews-summary">
                    <span class="reviews-g" aria-hidden="true"><i class="fab fa-google"></i></span>
                    <span class="reviews-score" data-avaliacoes-nota hidden></span>
                    <div>
                        <strong>Avaliações no Google</strong>
                        <span class="reviews-summary-meta" data-avaliacoes-meta>Comentários reais de pacientes</span>
                    </div>
                </div>
            </div>

            <div class="reviews-grid" data-avaliacoes-lista>${cartoes}
            </div>

            <div class="reviews-actions">
                <a class="btn-outline" href="${linkPerfilGoogle()}" target="_blank" rel="noopener" data-link-google>
                    <i class="fab fa-google" aria-hidden="true"></i> Ver todas as avaliações
                </a>
                <a class="link-secundario" href="${linkAvaliarGoogle()}" target="_blank" rel="noopener" data-link-avaliar>Já é paciente? Deixe sua avaliação</a>
            </div>
            <p class="reviews-fonte">Fonte: Google Maps, perfil &ldquo;${esc(SITE.nomeGoogle)}&rdquo;.</p>
        </div>
    </section>`;
}

// ---------------------------------------------------------------- pagina de tratamento

function schemaTratamento(t) {
    const url = urlPagina(t);
    const img = urlImagem(t.imagem.arquivo);
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${url}#pagina`,
                url,
                name: t.title,
                description: t.description,
                inLanguage: 'pt-BR',
                isPartOf: { '@id': `${SITE.url}/#site` },
                about: { '@id': `${url}#servico` },
                breadcrumb: { '@id': `${url}#breadcrumb` },
                primaryImageOfPage: { '@type': 'ImageObject', url: img },
                dateModified: HOJE,
            },
            {
                '@type': 'Service',
                '@id': `${url}#servico`,
                name: t.servico,
                serviceType: t.nome,
                description: textoPlano(t.lead),
                url,
                image: img,
                areaServed: { '@type': 'City', name: 'Londrina' },
                provider: clinicaResumo(),
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE.url}/` },
                    { '@type': 'ListItem', position: 2, name: t.h1, item: url },
                ],
            },
            {
                '@type': 'FAQPage',
                '@id': `${url}#faq`,
                mainEntity: t.faq.map(([pergunta, resposta]) => ({
                    '@type': 'Question',
                    name: pergunta,
                    acceptedAnswer: { '@type': 'Answer', text: resposta },
                })),
            },
        ],
    };
}

function paginaTratamento(t) {
    const base = '../';
    const img = (arquivo) => `${base}images/otimizadas/${arquivo}`;
    const wa = whatsapp(textoWhats(t));

    const fatos = t.fatos.map(([rotulo, valor]) => `
                <div class="tp-fact"><dt>${esc(rotulo)}</dt><dd>${esc(valor)}</dd></div>`).join('');

    const secoes = t.secoes.map(([titulo, html]) => `
                <h2>${esc(titulo)}</h2>
                ${html.replace(/\n/g, '\n                ')}`).join('\n');

    const galeria = t.galeria?.length ? `
    <section class="tp-galeria" aria-labelledby="galeria-titulo">
        <h2 id="galeria-titulo">Antes e depois</h2>
        <div class="tp-galeria-grid">${t.galeria.map((g, i) => `
            <figure><img src="${img(g.arquivo)}" alt="Antes e depois de ${esc(t.termo)} em paciente da Dra. Thais Pimenta (caso ${i + 1})" width="${g.w}" height="${g.h}" loading="lazy" decoding="async"></figure>`).join('')}
        </div>
        <p class="tp-galeria-aviso">Fotos de pacientes da clínica. Resultados variam de pessoa para pessoa.</p>
    </section>` : '';

    const faq = t.faq.map(([pergunta, resposta]) => `
            <details class="faq-item">
                <summary>${esc(pergunta)}</summary>
                <div class="faq-resposta"><p>${esc(resposta)}</p></div>
            </details>`).join('');

    const relacionados = t.relacionados.map((slug) => POR_SLUG[slug]).filter(Boolean).map((r) => `
                <a class="tp-rel-card" href="${base}${r.slug}/">
                    <img src="${img(r.imagem.arquivo)}" alt="" width="${r.imagem.w}" height="${r.imagem.h}" loading="lazy" decoding="async">
                    <div><strong>${esc(r.nome)}</strong><span>${esc(r.resumo)}</span></div>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </a>`).join('');

    return `${head({
        title: t.title,
        description: t.description,
        canonical: urlPagina(t),
        base,
        schema: jsonLd(schemaTratamento(t)),
    })}
<body>
${nav(base)}

    <main class="tp-main" id="conteudo">
    <section class="tp-hero">
        <div class="tp-hero-inner">
            <div class="tp-hero-texto">
                <nav class="breadcrumb" aria-label="Você está em">
                    <ol>
                        <li><a href="${base}">Início</a></li>
                        <li><a href="${base}#tratamentos-section">Tratamentos</a></li>
                        <li aria-current="page">${esc(t.nome)}</li>
                    </ol>
                </nav>
                <span class="tp-kicker">${esc(t.categoria)} · Londrina</span>
                <h1>${esc(t.h1)}</h1>
                <p class="tp-lead">${t.lead}</p>
                <div class="tp-hero-actions">
                    <a class="cta-button" href="${wa}">
                        <i class="fab fa-whatsapp" aria-hidden="true"></i> Agendar avaliação
                    </a>
                    <a class="link-secundario" href="#duvidas">Dúvidas frequentes</a>
                </div>
                <ul class="tp-trust">
                    <li><i class="fab fa-google" aria-hidden="true"></i><a href="#avaliacoes" class="link-discreto">Avaliações reais no Google</a></li>
                    <li><i class="fas fa-user-md" aria-hidden="true"></i>${esc(AUTORA.cargo)}</li>
                    <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i>${esc(SITE.endereco.bairro)}, Londrina</li>
                </ul>
            </div>
            <div class="tp-hero-media">
                <img src="${img(t.imagem.arquivo)}" alt="${esc(t.imagem.alt)}" width="${t.imagem.w}" height="${t.imagem.h}" fetchpriority="high" decoding="async">
            </div>
        </div>
    </section>

    <section class="tp-facts" aria-label="Resumo do tratamento">
        <dl>${fatos}
        </dl>
    </section>

    <div class="tp-conteudo">
        <article class="tp-artigo">${secoes}
        </article>

        <aside class="tp-aside" aria-label="Agendamento">
            <div class="tp-card-cta">
                <p class="tp-card-titulo">Agende sua avaliação</p>
                <p>Fale com a clínica pelo WhatsApp e marque um horário. Na avaliação você entende o tratamento indicado, o número de sessões e o investimento.</p>
                <a class="contact-whatsapp-btn" href="${wa}">
                    <i class="fab fa-whatsapp" aria-hidden="true"></i> Agendar pelo WhatsApp
                </a>
                <ul>
                    <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i><a href="${SITE.mapsEndereco}" target="_blank" rel="noopener">${esc(SITE.endereco.ruaExibicao)} – ${esc(SITE.endereco.bairro)}, Londrina/PR</a></li>
                    <li><i class="fas fa-clock" aria-hidden="true"></i><span>${SITE.horarios.map(esc).join('<br>')}</span></li>
                    <li><i class="fas fa-phone" aria-hidden="true"></i><a href="tel:${SITE.telefoneE164}">${SITE.telefoneExibicao}</a></li>
                </ul>
            </div>
        </aside>
    </div>
${galeria}

    <section class="tp-autor" aria-labelledby="autor-titulo">
        <div class="tp-autor-inner">
            <img src="${img(AUTORA.foto)}" alt="${esc(AUTORA.nome)}" width="640" height="640" loading="lazy" decoding="async">
            <div>
                <span class="tp-kicker">Quem realiza</span>
                <h2 id="autor-titulo">${esc(AUTORA.nome)}</h2>
                ${AUTORA.bio.replace(/\n/g, '\n                ')}
                <a class="saiba-mais" href="${base}#sobre-section"><span>Conheça a especialista</span> <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </div>
        </div>
    </section>
${blocoAvaliacoes()}

    <section class="tp-faq" id="duvidas" aria-labelledby="faq-titulo">
        <h2 id="faq-titulo">Dúvidas frequentes sobre ${esc(t.termo)}</h2>${faq}
    </section>

    <section class="tp-relacionados" aria-labelledby="rel-titulo">
        <div class="tp-relacionados-inner">
            <h2 id="rel-titulo">Tratamentos que combinam</h2>
            <div class="tp-rel-grid">${relacionados}
            </div>
        </div>
    </section>

    <section class="tp-cta-final" id="contato" aria-labelledby="cta-titulo">
        <h2 id="cta-titulo">Agende sua avaliação de ${esc(t.termo)} em Londrina</h2>
        <p>Atendimento no ${esc(SITE.endereco.bairro)}, com horário marcado. Mande uma mensagem e tire suas dúvidas antes de agendar.</p>
        <a class="contact-whatsapp-btn" href="${wa}">
            <i class="fab fa-whatsapp" aria-hidden="true"></i> Agendar pelo WhatsApp
        </a>
    </section>
    </main>
${rodape(base)}
${flutuantes(t)}

    <script src="${base}main.js" defer></script>
    <script src="${base}avaliacoes.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- 404

function pagina404() {
    const base = '/'; // a Netlify serve o 404 em qualquer URL, entao os caminhos precisam ser absolutos
    const links = TRATAMENTOS.map((t) => `<li><a href="/${t.slug}/">${esc(t.nome)}</a></li>`).join('\n                ');
    return `${head({
        title: 'Página não encontrada | Dra. Thais Pimenta',
        description: 'A página que você procurou não existe mais. Veja os tratamentos da clínica da Dra. Thais Pimenta em Londrina ou fale pelo WhatsApp.',
        canonical: '',
        base,
    })}
<body>
${nav(base, false)}

    <main class="tp-main">
        <section class="tp-404">
            <div>
                <span class="tp-kicker">Erro 404</span>
                <h1>Esta página não existe mais</h1>
                <p>O endereço pode ter mudado. Escolha um tratamento abaixo ou fale direto com a clínica.</p>
                <a class="cta-button" href="${whatsapp(textoWhats())}"><i class="fab fa-whatsapp" aria-hidden="true"></i> Falar no WhatsApp</a>
                <ul class="tp-404-links">
                <li><a href="/">Página inicial</a></li>
                ${links}
                </ul>
            </div>
        </section>
    </main>
${rodape(base)}
${flutuantes()}

    <script src="/main.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------- home: JSON-LD

function schemaHome() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
                '@id': `${SITE.url}/#clinica`,
                name: SITE.nomeNegocio,
                alternateName: SITE.nomeGoogle,
                description: 'Clínica de estética avançada em Londrina/PR especializada em harmonização facial, botox, preenchimento labial, perfiloplastia e tratamentos corporais.',
                url: `${SITE.url}/`,
                image: [
                    `${SITE.url}/images/og-preview.jpg`,
                    urlImagem('dra-thais-pimenta.webp'),
                    urlImagem('consultorio-londrina.webp'),
                ],
                logo: `${SITE.url}/images/logoinicio.png`,
                telephone: SITE.telefoneE164,
                email: SITE.email,
                priceRange: '$$',
                currenciesAccepted: 'BRL',
                medicalSpecialty: 'Physiotherapy',
                address: enderecoSchema(),
                areaServed: { '@type': 'City', name: 'Londrina' },
                openingHoursSpecification: [
                    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
                    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '12:00' },
                ],
                sameAs: [SITE.instagram, SITE.facebook],
                founder: { '@id': `${SITE.url}/#dra-thais` },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Tratamentos',
                    itemListElement: TRATAMENTOS.map((t) => ({
                        '@type': 'Offer',
                        itemOffered: { '@type': 'Service', name: t.servico, url: urlPagina(t) },
                    })),
                },
            },
            {
                '@type': 'Person',
                '@id': `${SITE.url}/#dra-thais`,
                name: 'Thais Alves Pimenta',
                honorificPrefix: 'Dra.',
                jobTitle: AUTORA.cargo,
                image: urlImagem(AUTORA.foto),
                worksFor: { '@id': `${SITE.url}/#clinica` },
                sameAs: [SITE.instagram],
                knowsAbout: TRATAMENTOS.map((t) => t.nome),
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE.url}/#site`,
                url: `${SITE.url}/`,
                name: SITE.nomeGoogle,
                inLanguage: 'pt-BR',
                publisher: { '@id': `${SITE.url}/#clinica` },
            },
        ],
    };
}

// ---------------------------------------------------------------- sitemap

function sitemap() {
    const imagem = (loc, titulo) => `
    <image:image>
      <image:loc>${esc(loc)}</image:loc>
      <image:title>${esc(titulo)}</image:title>
    </image:image>`;

    const home = `
  <url>
    <loc>${SITE.url}/</loc>
    <lastmod>${HOJE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>${imagem(`${SITE.url}/images/og-preview.jpg`, 'Botox, preenchimento e harmonização facial em Londrina - Dra. Thais Pimenta')}${imagem(urlImagem('dra-thais-pimenta.webp'), 'Dra. Thais Alves Pimenta, fisioterapeuta dermatofuncional em Londrina')}
  </url>`;

    const paginas = TRATAMENTOS.map((t) => `
  <url>
    <loc>${urlPagina(t)}</loc>
    <lastmod>${HOJE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${imagem(urlImagem(t.imagem.arquivo), t.imagem.alt)}${(t.galeria || []).map((g, i) => imagem(urlImagem(g.arquivo), `Antes e depois de ${t.termo} em Londrina (caso ${i + 1})`)).join('')}
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${home}${paginas}
</urlset>
`;
}

// ---------------------------------------------------------------- home: marcadores

function substituirMarcador(html, nome, conteudo) {
    const ini = `<!-- gerado:${nome}:inicio -->`;
    const fim = `<!-- gerado:${nome}:fim -->`;
    const a = html.indexOf(ini);
    const b = html.indexOf(fim);
    if (a === -1 || b === -1 || b < a) {
        throw new Error(`index.html: marcadores "${ini}" / "${fim}" nao encontrados`);
    }
    return html.slice(0, a + ini.length) + conteudo + '\n    ' + html.slice(b);
}

// ---------------------------------------------------------------- execucao

async function escrever(relativo, conteudo) {
    const destino = path.join(RAIZ, relativo);
    await mkdir(path.dirname(destino), { recursive: true });
    await writeFile(destino, conteudo, 'utf8');
    console.log('  escrito', relativo);
}

async function main() {
    const slugs = new Set();
    for (const t of TRATAMENTOS) {
        if (slugs.has(t.slug)) throw new Error(`slug repetido: ${t.slug}`);
        slugs.add(t.slug);
        for (const r of t.relacionados) {
            if (!POR_SLUG[r]) throw new Error(`${t.slug}: relacionado inexistente "${r}"`);
        }
        await escrever(path.join(t.slug, 'index.html'), paginaTratamento(t));
    }

    await escrever('404.html', pagina404());
    await escrever('sitemap.xml', sitemap());

    const arqHome = path.join(RAIZ, 'index.html');
    let home = await readFile(arqHome, 'utf8');
    home = substituirMarcador(home, 'jsonld', '\n    ' + jsonLd(schemaHome()).replace(/\n/g, '\n    '));
    home = substituirMarcador(home, 'avaliacoes', blocoAvaliacoes());
    home = substituirMarcador(home, 'rodape-tratamentos', rodapeTratamentos('').replace(/\n$/, ''));
    await writeFile(arqHome, home, 'utf8');
    console.log('  atualizado index.html (jsonld, avaliacoes, rodape-tratamentos)');

    console.log(`\n${TRATAMENTOS.length} paginas de tratamento + 404 + sitemap gerados em ${HOJE}.`);
}

main().catch((e) => {
    console.error('Falha ao gerar:', e.message);
    process.exit(1);
});
