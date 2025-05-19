// Contador Regressivo
function startCountdown() {
    function getEndTime() {
        const now = new Date();
        const endTime = new Date(now);
        endTime.setHours(23, 59, 59, 999); // Define para 23:59:59.999 do dia atual
        return endTime.getTime();
    }

    function updateCountdown() {
        // Pega o tempo atual
        const now = new Date().getTime();
        const endTime = getEndTime();
        
        // Calcula a diferença
        const distance = endTime - now;

        // Calcula horas, minutos e segundos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualiza os elementos HTML
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (hoursElement && minutesElement && secondsElement) {
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }

    // Atualiza imediatamente
    updateCountdown();
    
    // Atualiza a cada segundo
    return setInterval(updateCountdown, 1000);
}

// Inicia o contador quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando contador...');
    startCountdown();
}); 