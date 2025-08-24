// Гарантирует, что страница всегда загружается с самого верха
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// --- 1. ОПРЕДЕЛЕНИЕ ВСЕХ ФУНКЦИЙ ---

gsap.registerPlugin(ScrollTrigger);


// --- Анимации для страницы отдельного поста ---
function initSinglePostAnimations() {
    const postElements = document.querySelectorAll('.post-header-full, .featured-media, .post-body');
    if (!postElements.length) return;

    gsap.from(postElements, {
        autoAlpha: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2
    });
}


// --- Анимация появления плиток в галерее ---
function initSingleProjectAnimations() {
    // Находим ключевые секции
    const sections = document.querySelectorAll('.project-content-wrapper > section');
    const heroTitle = document.querySelector('.project-hero h1');

    if (!sections.length) return; // Если не страница проекта, выходим

    // Анимация заголовка на обложке
    if(heroTitle) {
        gsap.from(heroTitle, { autoAlpha: 0, y: 50, duration: 1.2, ease: 'power3.out' });
    }

    // Анимация секций контента при скролле
    sections.forEach(section => {
        gsap.from(section, {
            autoAlpha: 0,
            y: 100,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true
            }
        });
    });
}
// --- Логика для страницы "Контакты" ---

// --- Анимации для страницы "Ликбез" ---
function initLikbezPageAnimations() {
    const posts = document.querySelectorAll('.likbez-post');
    if (!posts.length) return; // Если не страница ликбеза, выходим

    // Анимация постов при скролле
    posts.forEach(post => {
        gsap.from(post, {
            autoAlpha: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: post,
                start: 'top 90%', // Начать, когда пост появится на 90% экрана
                once: true
            }
        });
    });
}


function initRandomBackground() {
    const backgroundElement = document.querySelector('.page-background');
    if (!backgroundElement) return;

    const pathPrefix = '../img/';
    const imageFiles = [
        'gallery_flavi1.png',
        'gallery_flavi2.png',
        'gallery_lsr1.png',
        'gallery_lsr2.png',
        'gallery_lsr3.png',
        'gallery_flavi3.png',
        'gallery_flavi5.png',
        'gallery_lsr4.png'
    ];

    const images = imageFiles.map(file => pathPrefix + file);
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // ИСПОЛЬЗУЕМ GSAP, ЧТОБЫ ПРИНУДИТЕЛЬНО ЗАДАТЬ ВСЕ СТИЛИ
    gsap.set(backgroundElement, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: `url(${randomImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    });
}

function initContactPageAnimations() {
    // Находим элементы для анимации
    const header = document.querySelector('.contact-header');
    const details = document.querySelector('.contact-details-block');
    const cta = document.querySelector('.contact-cta');

    // Если мы не на странице контактов, выходим
    if (!header || !details || !cta) return;

    // Создаем анимацию появления для всех блоков с задержкой
    gsap.from([header, details, cta], {
        autoAlpha: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2
    });
}


// --- Анимация появления плиток в галерее ---
function initGridAnimation() {
    const grid = document.querySelector('.products-grid');
    const gridItems = document.querySelectorAll('.product-item');
    
    if (gridItems.length === 0) {
        return;
    }

    // Добавляем класс, чтобы временно отключить CSS transition
    grid.classList.add('is-animating-in');

    gsap.set(gridItems, { autoAlpha: 0, y: 500 });

    gsap.to(gridItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'sine.in',
        stagger: 0.15,
        delay: 0.2,
        // По завершении анимации убираем класс
        onComplete: () => {
            grid.classList.remove('is-animating-in');
        }
    });
}

// --- Анимация появления инфоблоков при скролле ---
function initInfoBlockAnimation() {
    const infoBlocks = document.querySelectorAll('.info-block');
    if (infoBlocks.length === 0) {
        return;
    }

    // СНАЧАЛА немедленно скрываем все блоки с помощью GSAP
    gsap.set(infoBlocks, { autoAlpha: 0, y: 150 });

    // ПОТОМ для каждого блока создаем анимацию К видимому состоянию
    infoBlocks.forEach(block => {
        gsap.to(block, { // Используем .to, так как начальное состояние уже задано
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: '"sine.in"',
            scrollTrigger: {
                trigger: block,
                start: 'top 105%',
                once: true
            }
        });
    });
}

// --- Анимация появления секций на странице "О нас" ---
function initAboutPageAnimations() {
    // Находим главный контейнер страницы "О нас"
    const aboutContainer = document.querySelector('.about-container');
    if (!aboutContainer) {
        return; // Если это не страница "О нас", ничего не делаем
    }

    // Собираем все секции внутри контейнера в массив
    const sections = gsap.utils.toArray('.about-container > section');

    // Проходим по каждой секции и создаем для неё анимацию появления
    sections.forEach(section => {
        gsap.from(section, { // Анимируем ИЗ этого состояния
            autoAlpha: 0, // Невидимость
            y: 100,       // Смещение на 100px вниз
            duration: 0.9,
            ease: 'power3.out',
            // Настройки запуска по скроллу
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true
            }
        });
    });
}

// --- Инициализация плавного скролла Lenis ---
// --- Инициализация плавного скролла Lenis (СИНХРОНИЗИРОВАННАЯ ВЕРСИЯ) ---
function initLenis() {
    const lenis = new Lenis();

    // Говорим ScrollTrigger'у использовать события скролла от Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Используем "тикер" GSAP для обновления каждого кадра анимации Lenis
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    
    window.lenis = lenis;
    return lenis;
}

// --- Инициализация меню ---
function initAllMenus(lenis) {
    const burgerBtn = document.querySelector('.burger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const submenuTriggers = document.querySelectorAll('.has-submenu > a');
    if (burgerBtn && menuOverlay) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('menu-is-open');
            isOpen ? lenis.stop() : lenis.start();
        });
        menuOverlay.addEventListener('click', (event) => {
            if (event.target === menuOverlay) {
                document.body.classList.remove('menu-is-open');
                lenis.start();
            }
        });
    }
    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            this.parentElement.classList.toggle('is-open');
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== this.parentElement) item.classList.remove('is-open');
            });
        });
    });
}

// --- Инициализация горизонтального слайдера ---
function initHorizontalSlider() {
    const slider = document.querySelector('.horizontal-slider');
    if (!slider) return;
    const slidesContainer = slider.querySelector('.slides-container-h');
    const slides = slider.querySelectorAll('.slide-h');
    const arrowLeft = slider.querySelector('.slider-arrow.left');
    const arrowRight = slider.querySelector('.slider-arrow.right');
    const dotsContainer = slider.querySelector('.slider-nav-h');
    if (!slidesContainer || slides.length === 0) return;
    let currentSlide = 0;
    const totalSlides = slides.length;
    const dots = [];
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot-h');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    }
    function goToSlide(slideIndex) {
        slides[currentSlide]?.querySelector('video')?.pause();
        currentSlide = slideIndex;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
        const newVideo = slides[currentSlide]?.querySelector('video');
        if (newVideo) {
            newVideo.currentTime = 0;
            newVideo.play().catch(() => {});
        }
    }
    arrowRight.addEventListener('click', () => goToSlide((currentSlide + 1) % totalSlides));
    arrowLeft.addEventListener('click', () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides));
    goToSlide(0);
}

// --- Инициализация кастомного скроллбара ---
function initCustomScrollbar(lenis) {
    const track = document.querySelector('.custom-scrollbar-track');
    const thumb = document.querySelector('.custom-scrollbar-thumb');
    if (!track || !thumb) return;
    lenis.on('scroll', (e) => {
        if (e.limit === 0) { track.style.display = 'none'; return; }
        track.style.display = 'block';
        const trackHeight = track.clientHeight;
        const thumbBaseHeight = (window.innerHeight / document.documentElement.scrollHeight) * trackHeight;
        const thumbHeight = Math.max(20, thumbBaseHeight / 2.3);
        thumb.style.height = `${thumbHeight}px`;
        const thumbPosition = e.progress * (trackHeight - thumbHeight);
        thumb.style.transform = `translateX(-50%) translateY(${thumbPosition}px)`;
    });
    let isDragging = false;
    thumb.addEventListener('mousedown', (e) => { isDragging = true; document.body.classList.add('is-dragging'); e.preventDefault(); });
    window.addEventListener('mouseup', () => { isDragging = false; document.body.classList.remove('is-dragging'); });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const trackRect = track.getBoundingClientRect();
        const percent = (e.clientY - trackRect.top) / trackRect.height;
        lenis.scrollTo(percent * lenis.limit, { immediate: true });
    });
}

function preloadAnimationForBlock(block) {
    return new Promise(resolve => {
        const image = block.querySelector('.info-image');
        const text = block.querySelector('.info-text');
        const imageClone = image.cloneNode(true);
        const textClone = text.cloneNode(true);
        imageClone.style.visibility = 'hidden';
        textClone.style.visibility = 'hidden';
        document.body.appendChild(imageClone);
        document.body.appendChild(textClone);
        const state = Flip.getState([image, text]);
        Flip.from(state, {
            targets: [imageClone, textClone],
            duration: 0.01,
            onComplete: () => {
                imageClone.remove();
                textClone.remove();
                resolve();
            }
        });
    });
}

function initializeInteractiveAnimations() {
    gsap.registerPlugin(Flip);

    if (window.innerWidth <= 768) {
        return; 
    }
    // --- КОНЕЦ ДОБАВЛЕНИЯ КОДА ---

    let activeBlock = null;
    let isAnimating = false;
    const infoImages = document.querySelectorAll('.info-block .info-image');
    infoImages.forEach(image => {
        image.addEventListener('click', () => {
            if (isAnimating) return;
            const currentBlock = image.closest('.info-block');
            if (currentBlock.classList.contains('is-hiding-children') && currentBlock === activeBlock) return;
            if (currentBlock === activeBlock) { collapseBlock(); } 
            else if (activeBlock) { collapseBlock(() => expandBlock(currentBlock)); } 
            else { expandBlock(currentBlock); }
        });
    });
    function expandBlock(block) {
        const placeholder = block.nextElementSibling;
        if (!placeholder || !placeholder.classList.contains('height-placeholder')) return;
        isAnimating = true;
        activeBlock = block;
        const image = block.querySelector('.info-image');
        const text = block.querySelector('.info-text');
        const scrollbarTrack = document.querySelector('.custom-scrollbar-track');
        gsap.to(scrollbarTrack, { autoAlpha: 0, duration: 0.3 });
        const imageClone = image.cloneNode(true);
        const textClone = text.cloneNode(true);
        imageClone.classList.add('clone', 'image-clone');
        textClone.classList.add('clone', 'text-clone');
        block.parentElement.appendChild(imageClone);
        block.parentElement.appendChild(textClone);

        // Устанавливаем z-index, чтобы текст был гарантированно поверх картинки
gsap.set(imageClone, { zIndex: 10 });
gsap.set(textClone, { zIndex: 9 });


        const state = Flip.getState([image, text]);
        const containerWidth = block.parentElement.offsetWidth;
        const blockInitialHeight = block.offsetHeight;
        const finalImageWidth = containerWidth * 0.8;
        const finalImageHeight = finalImageWidth / (16 / 9);
        const finalTextWidth = containerWidth * 0.75;
        const gap = 40;
        gsap.set(textClone, { width: finalTextWidth });
        const finalTextHeight = textClone.offsetHeight;
        const totalExpandedHeight = finalTextHeight + gap + finalImageHeight;
        const newPlaceholderHeight = placeholder.offsetHeight + (totalExpandedHeight - blockInitialHeight);
        gsap.set(textClone, { position: 'absolute', left: (containerWidth - finalTextWidth) / 2, top: block.offsetTop, });
        gsap.set(imageClone, { position: 'absolute', left: (containerWidth - finalImageWidth) / 2, top: block.offsetTop + finalTextHeight + gap, width: finalImageWidth, height: finalImageHeight, cursor: 'pointer' });
        block.classList.add('is-hiding-children');
        gsap.to(placeholder, { height: newPlaceholderHeight, duration: 1, ease: 'power3.inOut' });
        const isReversed = window.getComputedStyle(block).flexDirection === 'row-reverse';
        const origin = isReversed ? 'right top' : 'left top';
        Flip.from(state, {
            targets: [imageClone, textClone],
            duration: 1,
            ease: '"sine.in"',
            transformOrigin: origin,
            onComplete: () => {
                isAnimating = false;
                gsap.to(scrollbarTrack, { autoAlpha: 1, duration: 0.3 });
                if (window.lenis) window.lenis.resize();
                imageClone.addEventListener('click', () => { if (isAnimating) return; collapseBlock(); }, { once: true });
            }
        });
    }
    function collapseBlock(onCompleteCallback) {
        if (!activeBlock) return;
        isAnimating = true;
        const block = activeBlock;
        const image = block.querySelector('.info-image');
        const text = block.querySelector('.info-text');
        const placeholder = block.nextElementSibling;
        const imageClone = document.querySelector('.image-clone');
        const textClone = document.querySelector('.text-clone');
        const scrollbarTrack = document.querySelector('.custom-scrollbar-track');
        gsap.to(scrollbarTrack, { autoAlpha: 0, duration: 0.3 });
        gsap.to(placeholder, { height: 150, duration: 1, ease: 'power3.inOut' });
        const state = Flip.getState([image, text]);
        Flip.to(state, {
            targets: [imageClone, textClone],
            duration: 1,
            ease: '"sine.out"',
            onComplete: () => {
                imageClone.remove();
                textClone.remove();
                block.classList.remove('is-hiding-children');
                isAnimating = false;
                activeBlock = null;
                gsap.to(scrollbarTrack, { autoAlpha: 1, duration: 0.3 });
                if (window.lenis) window.lenis.resize();
                if (typeof onCompleteCallback === 'function') { onCompleteCallback(); }
            }
        });
    }
}

async function runPreloader() {
    const preloader = document.querySelector('.preloader');
    // Проверка 1: Если на странице в принципе нет прелоадера, выходим.
    if (!preloader) {
        initializeInteractiveAnimations();
        initInfoBlockAnimation();
        return;
    }

    const progressBarFill = document.querySelector('.progress-bar-fill');
    const allBlocks = document.querySelectorAll('.info-block');
    let minimumDisplayTimeTask = new Promise(resolve => setTimeout(resolve, 1200));
    let preloadAnimationTask = Promise.resolve(); // Создаем "пустой" выполненный промис

    // Проверка 2: Запускаем анимацию прогресс-бара, только если он существует
    if (progressBarFill) {
        gsap.to(progressBarFill, {
            width: '100%',
            duration: 1.2,
            ease: 'power1.inOut'
        });
    }

    // Проверка 3: Запускаем "прогрев" анимаций, только если есть инфоблоки
    if (allBlocks.length > 0) {
        preloadAnimationTask = Promise.all(
            Array.from(allBlocks).map(block => preloadAnimationForBlock(block))
        );
    }
    
    // Ждем, пока ОБЕ задачи не будут выполнены
    await Promise.all([
        preloadAnimationTask,
        minimumDisplayTimeTask
    ]);

    // Когда все готово, запускаем остальные скрипты
    initializeInteractiveAnimations();
    initInfoBlockAnimation();

    // И плавно убираем заглушку
    document.body.classList.remove('is-loading');
}

// --- Анимации для страницы "Услуги" ---
function initServicesPageAnimations() {
    const heroContent = document.querySelector('.services-hero > *');
    const serviceCards = document.querySelectorAll('.service-card');
    const approachSection = document.querySelector('.approach-section');

    if (!heroContent) return; // Если не страница услуг, выходим

    // Анимация заголовка
    gsap.from(heroContent, {
        autoAlpha: 0, y: 50, duration: 1.2, ease: 'power3.out', stagger: 0.1
    });

    // Анимация карточек услуг при скролле
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            autoAlpha: 0, y: 100, stagger: 0.1,
            scrollTrigger: { trigger: ".services-grid", start: 'top 85%', once: true }
        });
    }

    // Анимация секции "Наш подход"
    if (approachSection) {
        gsap.from(approachSection, {
            autoAlpha: 0, y: 100,
            scrollTrigger: { trigger: approachSection, start: 'top 85%', once: true }
        });
    }
}

// --- 2. ЗАПУСК ВСЕГО ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ ---
window.addEventListener('load', () => {
    const lenisInstance = initLenis();
    initAllMenus(lenisInstance);
    initHorizontalSlider();
    initCustomScrollbar(lenisInstance);

    // Анимация сетки запускается на всех страницах, где она есть
    initGridAnimation();
    initAboutPageAnimations();
    initRandomBackground();      // <-- ДОБАВЬТЕ ЭТУ СТРОКУ
    initSingleProjectAnimations();
    initContactPageAnimations();
    initLikbezPageAnimations();
    initSinglePostAnimations();
    initServicesPageAnimations();

    // Логика прелоадера запускается после (она сама проверит, есть ли он)
    runPreloader();

    // Обработчик нажатия клавиш (для закрытия по Esc)
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (document.body.classList.contains('menu-is-open')) {
                event.preventDefault(); 
                document.body.classList.remove('menu-is-open');
                lenisInstance.start();
            }
            const expandedImageClone = document.querySelector('.image-clone');
            if (expandedImageClone) {
                event.preventDefault();
                expandedImageClone.click();
            }
        }
    });
});