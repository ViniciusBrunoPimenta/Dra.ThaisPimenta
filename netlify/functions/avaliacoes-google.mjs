// Netlify Function: GET /api/avaliacoes-google
//
// Busca nota, total e ate 5 avaliacoes do perfil da clinica no Google
// (Places API "New") e devolve um JSON enxuto para o site. A chave fica so no
// servidor (variavel de ambiente), nunca no navegador.
//
// Variaveis de ambiente (Netlify > Site configuration > Environment variables):
//   GOOGLE_PLACES_API_KEY    chave do Google Cloud com a "Places API (New)" ativa
//   GOOGLE_PLACE_ID          Place ID do perfil "Dra Thais Pimenta Estetica Londrina"
//   AVALIACOES_NOTA_MINIMA   opcional, padrao 4 (avaliacoes abaixo disso nao aparecem)
//
// Sem as variaveis, responde 503 e o site continua mostrando as avaliacoes
// estaticas que ja estao no HTML.
//
// Nao ha cache de proposito: os termos da Google Maps Platform nao permitem
// armazenar o conteudo das avaliacoes. Para controlar custo e abuso, defina uma
// cota diaria da Places API no Google Cloud (ver README).

const CAMPOS = ['rating', 'userRatingCount', 'reviews', 'googleMapsUri', 'googleMapsLinks'].join(',');
const PLACE_ID_VALIDO = /^[A-Za-z0-9_-]{10,300}$/;
const TIMEOUT_MS = 6000;

function responder(status, corpo) {
    return new Response(JSON.stringify(corpo), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}

function urlHttps(valor) {
    if (typeof valor !== 'string') return '';
    try {
        const u = new URL(valor);
        return u.protocol === 'https:' ? u.toString() : '';
    } catch {
        return '';
    }
}

function texto(valor, limite) {
    if (typeof valor !== 'string') return '';
    const limpo = valor.replace(/\s+/g, ' ').trim();
    return limpo.length > limite ? limpo.slice(0, limite - 1).trimEnd() + '…' : limpo;
}

export function normalizar(lugar, notaMinima = 4) {
    const avaliacoes = (Array.isArray(lugar?.reviews) ? lugar.reviews : [])
        .map((r) => ({
            autor: texto(r?.authorAttribution?.displayName, 80) || 'Usuário do Google',
            foto: urlHttps(r?.authorAttribution?.photoUri),
            perfil: urlHttps(r?.authorAttribution?.uri),
            link: urlHttps(r?.googleMapsUri),
            nota: Number(r?.rating) || 0,
            texto: texto(r?.text?.text || r?.originalText?.text, 1200),
            quando: texto(r?.relativePublishTimeDescription, 40),
        }))
        .filter((r) => r.texto && r.nota >= notaMinima);

    const nota = Number(lugar?.rating);
    const total = Number(lugar?.userRatingCount);

    return {
        nota: Number.isFinite(nota) ? Math.round(nota * 10) / 10 : null,
        total: Number.isInteger(total) ? total : null,
        linkPerfil: urlHttps(lugar?.googleMapsLinks?.placeUri) || urlHttps(lugar?.googleMapsUri),
        linkAvaliacoes: urlHttps(lugar?.googleMapsLinks?.reviewsUri),
        linkAvaliar: urlHttps(lugar?.googleMapsLinks?.writeAReviewUri),
        avaliacoes,
    };
}

export default async function handler(req) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        return responder(405, { erro: 'metodo_nao_permitido' });
    }

    const chave = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    if (!chave || !placeId) {
        return responder(503, { erro: 'nao_configurado' });
    }
    if (!PLACE_ID_VALIDO.test(placeId)) {
        console.error('[avaliacoes-google] GOOGLE_PLACE_ID com formato invalido');
        return responder(500, { erro: 'configuracao_invalida' });
    }

    const notaMinima = Number(process.env.AVALIACOES_NOTA_MINIMA ?? 4);
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR&regionCode=BR`;

    try {
        const resposta = await fetch(url, {
            headers: { 'X-Goog-Api-Key': chave, 'X-Goog-FieldMask': CAMPOS },
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });

        if (!resposta.ok) {
            const detalhe = await resposta.text().catch(() => '');
            console.error(`[avaliacoes-google] Places API respondeu ${resposta.status}: ${detalhe.slice(0, 500)}`);
            return responder(502, { erro: 'google_indisponivel' });
        }

        const lugar = await resposta.json();
        return responder(200, normalizar(lugar, Number.isFinite(notaMinima) ? notaMinima : 4));
    } catch (erro) {
        console.error('[avaliacoes-google] falha ao consultar o Google:', erro?.name, erro?.message);
        return responder(502, { erro: 'google_indisponivel' });
    }
}

export const config = { path: '/api/avaliacoes-google' };
