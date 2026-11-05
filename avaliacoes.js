/*
 * Avaliacoes do Google
 *
 * O HTML ja traz avaliacoes reais copiadas do perfil (funciona sem nada configurado
 * e e indexado pelo Google). Quando a funcao /api/avaliacoes-google estiver
 * configurada na Netlify, este script troca pelo conteudo ao vivo: nota media,
 * total de avaliacoes e ate 5 comentarios com nome e foto do autor.
 * Qualquer falha (sem configuracao, cota estourada, offline) mantem o estatico.
 */
(function () {
    'use strict';

    var blocos = document.querySelectorAll('[data-avaliacoes]');
    if (!blocos.length || !window.fetch) return;

    var ENDPOINT = '/api/avaliacoes-google';
    var carregou = false;

    function el(tag, classe, texto) {
        var n = document.createElement(tag);
        if (classe) n.className = classe;
        if (texto) n.textContent = texto;
        return n;
    }

    function estrelas(nota) {
        var box = el('div', 'review-stars');
        var cheias = Math.round(nota);
        box.setAttribute('role', 'img');
        box.setAttribute('aria-label', 'Nota ' + nota + ' de 5');
        for (var i = 0; i < 5; i++) {
            var s = el('i', i < cheias ? 'fas fa-star' : 'far fa-star');
            s.setAttribute('aria-hidden', 'true');
            box.appendChild(s);
        }
        return box;
    }

    function cartao(a) {
        var fig = el('figure', 'review-card');
        fig.appendChild(estrelas(a.nota));

        var quote = el('blockquote', 'review-text');
        quote.appendChild(el('p', '', a.texto));
        fig.appendChild(quote);

        var cap = el('figcaption', 'review-author');
        var avatar = el('span', 'review-avatar');
        var inicial = (a.autor || '?').trim().charAt(0).toUpperCase();
        avatar.setAttribute('aria-hidden', 'true');
        if (a.foto) {
            var img = el('img');
            img.alt = '';
            img.loading = 'lazy';
            img.referrerPolicy = 'no-referrer';
            img.width = 40;
            img.height = 40;
            img.onerror = function () { avatar.textContent = inicial; };
            img.src = a.foto;
            avatar.appendChild(img);
        } else {
            avatar.textContent = inicial;
        }
        cap.appendChild(avatar);

        var info = el('span');
        var nome = el('strong');
        if (a.perfil) {
            var link = el('a', '', a.autor);
            link.href = a.perfil;
            link.target = '_blank';
            link.rel = 'noopener nofollow';
            nome.appendChild(link);
        } else {
            nome.textContent = a.autor;
        }
        info.appendChild(nome);
        info.appendChild(el('span', 'review-meta', (a.quando ? a.quando + ' · ' : '') + 'Google'));
        cap.appendChild(info);
        fig.appendChild(cap);
        return fig;
    }

    function formatarNota(n) {
        return n.toFixed(1).replace('.', ',');
    }

    function aplicar(bloco, d) {
        if (typeof d.nota === 'number' && d.nota > 0) {
            var nota = bloco.querySelector('[data-avaliacoes-nota]');
            if (nota) {
                nota.textContent = formatarNota(d.nota);
                nota.hidden = false;
            }
            var meta = bloco.querySelector('[data-avaliacoes-meta]');
            if (meta) {
                meta.textContent = '';
                meta.appendChild(estrelas(d.nota));
                if (typeof d.total === 'number' && d.total > 0) {
                    meta.appendChild(document.createTextNode(d.total + (d.total === 1 ? ' avaliação' : ' avaliações')));
                }
            }
        }

        var lista = bloco.querySelector('[data-avaliacoes-lista]');
        if (lista && d.avaliacoes.length) {
            var frag = document.createDocumentFragment();
            d.avaliacoes.forEach(function (a) { frag.appendChild(cartao(a)); });
            lista.textContent = '';
            lista.appendChild(frag);
        }

        var verTodas = d.linkAvaliacoes || d.linkPerfil;
        if (verTodas) {
            bloco.querySelectorAll('[data-link-google]').forEach(function (a) { a.href = verTodas; });
        }
        if (d.linkAvaliar) {
            bloco.querySelectorAll('[data-link-avaliar]').forEach(function (a) { a.href = d.linkAvaliar; });
        }
        bloco.classList.add('is-live');
    }

    function carregar() {
        if (carregou) return;
        carregou = true;
        fetch(ENDPOINT, { headers: { Accept: 'application/json' } })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (d) {
                if (!d || !Array.isArray(d.avaliacoes)) return;
                blocos.forEach(function (b) { aplicar(b, d); });
            })
            .catch(function () { /* mantem as avaliacoes estaticas */ });
    }

    // So consulta quando a secao esta perto de aparecer: economiza cota da API.
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entradas) {
            if (entradas.some(function (e) { return e.isIntersecting; })) {
                io.disconnect();
                carregar();
            }
        }, { rootMargin: '400px 0px' });
        blocos.forEach(function (b) { io.observe(b); });
    } else {
        carregar();
    }
})();
