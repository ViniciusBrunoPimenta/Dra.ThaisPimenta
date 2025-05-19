document.addEventListener('DOMContentLoaded', function() {
    // Intro Animation
    const introOverlay = document.querySelector('.intro-overlay');
    
    // Remove intro after animation completes
    setTimeout(() => {
        introOverlay.style.display = 'none';
    }, 3500);

    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const menuLinks = document.querySelectorAll('.nav-menu a');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeMenuHandler() {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeMenu.addEventListener('click', closeMenuHandler);
    navOverlay.addEventListener('click', closeMenuHandler);

    // Smooth Scroll para links do menu
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Fecha o menu após clicar
            closeMenuHandler();

            // Scroll suave para a seção
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = 70; // Altura do header fixo
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Slider de Serviços
    const track = document.querySelector('.services-track');
    const slides = document.querySelectorAll('.service-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Função para atualizar o slider
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        const gap = 20; // Espaçamento entre slides
        track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });

        // Atualizar slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        // Atualizar estado dos botões
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === slides.length - 1 ? '0.5' : '1';
    }

    // Inicializar o slider
    if (slides.length > 0) {
        updateSlider();
    }

    // Eventos de toque
    if (track) {
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            const slideWidth = slides[0].offsetWidth;
            const gap = 20;
            
            // Mover o slider junto com o dedo
            track.style.transform = `translateX(calc(-${currentIndex * (slideWidth + gap)}px - ${diff}px))`;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const diff = startX - currentX;
            const threshold = 50; // Limiar para mudar de slide

            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex < slides.length - 1) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
                }
            }

            isDragging = false;
            updateSlider();
        }, { passive: true });
    }

    // Botões de navegação
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Atualizar o slider quando a janela for redimensionada
    window.addEventListener('resize', updateSlider);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Loading Indicator
    window.addEventListener('load', () => {
        document.querySelector('.loading-indicator').classList.add('hidden');
    });

    // Scroll Animation
    function handleScrollAnimation() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }

    // Adicione o evento de scroll
    window.addEventListener('scroll', handleScrollAnimation);

    // Execute uma vez ao carregar a página
    handleScrollAnimation();
});

// Prevenir zoom em inputs em iOS
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false }); 