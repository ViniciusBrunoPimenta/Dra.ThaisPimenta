// Contador Regressivo — encerra em 30/06/2026 às 23:59:59
function startCountdown() {
    const endDate = new Date('2026-06-30T23:59:59');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        const daysEl    = document.getElementById('days');
        const hoursEl   = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (distance <= 0) {
            daysEl.textContent    = '00';
            hoursEl.textContent   = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent    = days.toString().padStart(2, '0');
        hoursEl.textContent   = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    return setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    startCountdown();
});
