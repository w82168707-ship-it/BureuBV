document.addEventListener('DOMContentLoaded', () => {
document.body.style.overflow = 'hidden';

    /**
     * ЛОГИКА ВЫДВИЖНОГО МЕНЮ (OVERLAY)
     * Управляет открытием/закрытием панели меню по клику на бургер.
     */
    function initOverlayMenu() {
        const burgerBtn = document.querySelector('.burger-menu');
        const menuOverlay = document.querySelector('.menu-overlay');

        function toggleMenu() {
            document.body.classList.toggle('menu-is-open');
        }

        if (burgerBtn && menuOverlay) {
            burgerBtn.addEventListener('click', toggleMenu);
            menuOverlay.addEventListener('click', (event) => {
                if (event.target === menuOverlay) {
                    toggleMenu();
                }
            });
        }
    }

    /**
     * АНИМАЦИЯ ПОЯВЛЕНИЯ КОНТЕНТА НА ГЛАВНОЙ
     */
    function initHeroAnimation() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        // Собираем элементы для анимации
        const elements = [
            heroContent.querySelector('h1'),
            heroContent.querySelector('p'),
            heroContent.querySelector('.hero-buttons')
        ];

        // Устанавливаем начальное состояние
        gsap.set(elements, { autoAlpha: 0, y: 50 });

        // Запускаем анимацию появления
        gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.2
        });
    }

    /**
     * ЛОГИКА SUBMENU ПО КЛИКУ
     * Управляет раскрытием вложенных пунктов меню.
     */
    function initSubmenu() {
        const submenuTriggers = document.querySelectorAll('.has-submenu > a');
        submenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                const parentLi = this.parentElement;
                parentLi.classList.toggle('is-open');
                document.querySelectorAll('.has-submenu').forEach(item => {
                    if (item !== parentLi) {
                        item.classList.remove('is-open');
                    }
                });
            });
        });

        const mainMenu = document.querySelector('.main-menu');
        if (mainMenu) {
            mainMenu.addEventListener('click', function(event) {
                if (!event.target.closest('.has-submenu > a') && !event.target.closest('.submenu')) {
                    document.querySelectorAll('.has-submenu.is-open').forEach(item => {
                        item.classList.remove('is-open');
                    });
                }
            });
        }
    }

    /**
     * ВАША ЛОГИКА ВЕРТИКАЛЬНОГО СЛАЙДЕРА
     * Основа для перелистывания слайдов на главной странице.
     */
    /**
     * ВАША ЛОГИКА ВЕРТИКАЛЬНОГО СЛАЙДЕРА С АНИМАЦИЕЙ ТЕКСТА
     */
    /**
     * ЛОГИКА ВЕРТИКАЛЬНОГО СЛАЙДЕРА (БЕЗ АНИМАЦИИ ТЕКСТА)
     */
    function initVerticalSlider() {
        const container = document.getElementById('fullpage-container');
        if (!container) return;

        const sections = container.querySelectorAll('.section');
        const navContainer = document.querySelector('.slider-nav');
        if (sections.length === 0 || !navContainer) return;

        const totalSlides = sections.length;
        let currentSlide = 0;
        let isAnimating = false;
        const ANIMATION_DURATION = 800;

        let touchStartY = 0; 

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            navContainer.appendChild(dot);
        }
        const dots = navContainer.querySelectorAll('.dot');

        function goToSlide(slideIndex) {
            if (isAnimating || slideIndex < 0 || slideIndex >= totalSlides || slideIndex === currentSlide) return;
            isAnimating = true;
            
            const oldVideo = sections[currentSlide].querySelector('video');
            if (oldVideo) oldVideo.pause();

            currentSlide = slideIndex;
            container.style.transform = `translateY(-${currentSlide * 100}vh)`;
            updateActiveDot();

            const newVideo = sections[currentSlide].querySelector('video');
            if (newVideo) {
                newVideo.currentTime = 0;
                newVideo.play().catch(e => console.error("Autoplay was blocked:", e));
            }

            setTimeout(() => { isAnimating = false; }, ANIMATION_DURATION);
        }

        function updateActiveDot() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        window.onload = () => {
            updateActiveDot();

            const firstVideo = sections[0].querySelector('video');
            if (firstVideo) {
                firstVideo.play().catch(e => console.error("Autoplay was blocked:", e));
            }

            let lastScrollTime = 0;
            const throttlePeriod = 1200;

            window.addEventListener('wheel', (event) => {
                if (document.body.classList.contains('menu-is-open')) return;
                event.preventDefault();
                const now = new Date().getTime();

                if (now - lastScrollTime < throttlePeriod) return;
                lastScrollTime = now;
                
                if (isAnimating) return;

                const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
                goToSlide(scrollDirection === 'down' ? currentSlide + 1 : currentSlide - 1);
            }, { passive: false });
            window.addEventListener('touchstart', (event) => {
            if (document.body.classList.contains('menu-is-open')) return;
            touchStartY = event.touches[0].clientY;
        }, { passive: true });

        // Когда пользователь отпускает палец, определяем направление свайпа
        window.addEventListener('touchend', (event) => {
            if (document.body.classList.contains('menu-is-open') || isAnimating) return;

            const touchEndY = event.changedTouches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;
            const minSwipeDistance = 50; // Минимальная дистанция, чтобы считаться свайпом

            if (Math.abs(swipeDistance) < minSwipeDistance) return;

            // Используем тот же механизм "торможения", что и для колесика
            const now = new Date().getTime();
            if (now - lastScrollTime < throttlePeriod) return;
            lastScrollTime = now;

            if (swipeDistance > 0) { // Свайп вверх
                goToSlide(currentSlide + 1);
            } else { // Свайп вниз
                goToSlide(currentSlide - 1);
            }
        }, { passive: true });
        };
    }

// --- ОБНОВЛЁННЫЙ СКРИПТ ДЛЯ ПРЕЛОАДЕРА С ПРОГРЕСС-БАРОМ ---

// Гарантирует, что страница всегда загружается с самого верха
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

async function runPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) {
        document.body.classList.remove('is-loading');
        return; 
    }

    const progressBarFill = document.querySelector('.progress-bar-fill');
    
    // Задача 1: Минимальное время отображения, чтобы избежать "мигания"
    const minimumDisplayTimeTask = new Promise(resolve => setTimeout(resolve, 1200));

    // Задача 2: Анимация прогресс-бара
    const progressBarAnimationTask = new Promise(resolve => {
        // Если на странице нет элемента прогресс-бара, просто завершаем задачу
        if (!progressBarFill) {
            resolve();
            return;
        }
        // Если есть - анимируем его
        gsap.to(progressBarFill, {
            width: '100%',
            duration: 0.8,
            ease: 'power1.inOut',
            onComplete: () => resolve() // Сообщаем, что анимация завершена
        });
    });

    // Ждём, пока завершатся ОБЕ задачи: и таймер, и анимация
    await Promise.all([minimumDisplayTimeTask, progressBarAnimationTask]);

    // Плавно скрываем прелоадер
    await gsap.to(preloader, { autoAlpha: 0, duration: 0.5 });
    
    // Убираем класс, чтобы показать основной контент
    document.body.classList.remove('is-loading');
    initHeroAnimation(); 
}

// Запускаем всё после полной загрузки страницы
window.addEventListener('load', () => {
    runPreloader();
});


    // --- ЗАПУСК ВСЕХ ФУНКЦИЙ ---
    initOverlayMenu();
    initSubmenu();
    initVerticalSlider();
    initHeroAnimation();
});