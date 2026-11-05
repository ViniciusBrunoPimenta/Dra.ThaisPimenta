// Script compartilhado pela home e pelas paginas de tratamento.
// Cada bloco checa se os elementos existem, porque nem toda pagina tem tudo.
document.addEventListener('DOMContentLoaded', function () {
    // Abertura: so na primeira visita da sessao (ver script inline no <head>)
    const introOverlay = document.querySelector('.intro-overlay');
    if (introOverlay) {
        try { sessionStorage.setItem('intro-vista', '1'); } catch (e) { /* modo privado */ }
        setTimeout(() => { introOverlay.style.display = 'none'; }, 1900);
    }

    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    function abrirMenu() {
        if (!navMenu) return;
        navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function fecharMenu() {
        if (!navMenu) return;
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', abrirMenu);
    if (closeMenu) closeMenu.addEventListener('click', fecharMenu);
    if (navOverlay) navOverlay.addEventListener('click', fecharMenu);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });

    // Links do menu: fecham o menu; a rolagem suave e o desconto do header fixo
    // ficam com o CSS (scroll-behavior: smooth + scroll-margin-top nas secoes).
    document.querySelectorAll('.nav-menu a').forEach((link) => {
        link.addEventListener('click', fecharMenu);
    });

    // Slider de Servicos
    const track = document.querySelector('.services-track');
    const slides = document.querySelectorAll('.service-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');

    if (track && slides.length) {
        const GAP = 20;
        let currentIndex = 0;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        function updateSlider() {
            const slideWidth = slides[0].offsetWidth;
            track.style.transform = `translateX(-${currentIndex * (slideWidth + GAP)}px)`;
            indicators.forEach((indicator, index) => {
                const ativo = index === currentIndex;
                indicator.classList.toggle('active', ativo);
                indicator.setAttribute('aria-current', ativo ? 'true' : 'false');
            });
            slides.forEach((slide, index) => slide.classList.toggle('active', index === currentIndex));
            if (prevButton) prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            if (nextButton) nextButton.style.opacity = currentIndex === slides.length - 1 ? '0.5' : '1';
        }

        updateSlider();

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentX = startX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            const slideWidth = slides[0].offsetWidth;
            track.style.transform = `translateX(calc(-${currentIndex * (slideWidth + GAP)}px - ${diff}px))`;
        }, { passive: true });

        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < slides.length - 1) currentIndex++;
                else if (diff < 0 && currentIndex > 0) currentIndex--;
            }
            isDragging = false;
            updateSlider();
        }, { passive: true });

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) { currentIndex--; updateSlider(); }
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) { currentIndex++; updateSlider(); }
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => { currentIndex = index; updateSlider(); });
        });

        window.addEventListener('resize', updateSlider);
    }

    // Voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        const atualizarBotao = () => backToTop.classList.toggle('show', window.scrollY > 300);
        window.addEventListener('scroll', atualizarBotao, { passive: true });
        atualizarBotao();
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Slider de galeria reutilizavel (antes e depois)
    function initGallerySlider(slideSel, dotSel, gallerySel) {
        const gSlides = document.querySelectorAll(slideSel);
        const dots = document.querySelectorAll(dotSel);
        const gallery = document.querySelector(gallerySel);
        if (!gSlides.length) return;

        let idx = 0;
        let timer = null;

        function show(i) {
            gSlides.forEach((s, j) => s.classList.toggle('active', j === i));
            dots.forEach((d, j) => {
                d.classList.toggle('active', j === i);
                d.setAttribute('aria-current', j === i ? 'true' : 'false');
            });
            idx = i;
        }

        function next() { show((idx + 1) % gSlides.length); }
        function reiniciar() { clearInterval(timer); timer = setInterval(next, 4000); }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { show(i); reiniciar(); });
        });

        if (gallery) {
            let gStartX = 0;
            gallery.addEventListener('touchstart', (e) => { gStartX = e.touches[0].clientX; }, { passive: true });
            gallery.addEventListener('touchend', (e) => {
                const diff = gStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    show(diff > 0 ? (idx + 1) % gSlides.length : (idx - 1 + gSlides.length) % gSlides.length);
                    reiniciar();
                }
            }, { passive: true });
        }

        reiniciar();
    }

    initGallerySlider('.labial-slide', '.labial-dot', '.labial-gallery');
    initGallerySlider('.harmonizacao-slide', '.harmonizacao-dot', '.harmonizacao-gallery');
});
