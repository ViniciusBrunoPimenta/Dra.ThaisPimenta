// Oferta com contador regressivo.
//
// A data de termino fica no proprio HTML, no atributo data-oferta-fim da secao
// .countdown-section (ex.: data-oferta-fim="2026-12-20T23:59:59").
// Sem data, ou com a data ja vencida, a secao continua escondida: nada de
// contador zerado "00:00:00:00" para a visitante.
function iniciarOferta() {
    const secao = document.querySelector('.countdown-section[data-oferta-fim]');
    if (!secao) return;

    const fim = new Date(secao.getAttribute('data-oferta-fim'));
    if (isNaN(fim.getTime())) return;

    const campos = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
    };
    if (Object.values(campos).some((c) => !c)) return;

    const dois = (n) => String(n).padStart(2, '0');
    let timer = null;

    function atualizar() {
        const restante = fim.getTime() - Date.now();
        if (restante <= 0) {
            secao.hidden = true;
            clearInterval(timer);
            return false;
        }
        campos.days.textContent = dois(Math.floor(restante / 86400000));
        campos.hours.textContent = dois(Math.floor((restante % 86400000) / 3600000));
        campos.minutes.textContent = dois(Math.floor((restante % 3600000) / 60000));
        campos.seconds.textContent = dois(Math.floor((restante % 60000) / 1000));
        return true;
    }

    if (atualizar()) {
        secao.hidden = false;
        timer = setInterval(atualizar, 1000);
    }
}

document.addEventListener('DOMContentLoaded', iniciarOferta);
