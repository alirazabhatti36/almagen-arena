(function () {
    // ==================== CANONICAL PATH NORMALIZATION ====================
    if (window.location.pathname.endsWith('/index.html')) {
        window.location.replace(window.location.origin + '/');
    }

    // ==================== LOADING SCREEN ====================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth <= 768;
    const sharePopup = document.getElementById('sharePopup');
    const pushPrompt = document.getElementById('pushPrompt');

    function requestIdle(callback) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(callback, { timeout: 2500 });
            return;
        }
        window.setTimeout(callback, 1200);
    }

    function loadDeferredScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    }

    window.addEventListener('load', function () {
        const hideDelay = prefersReducedMotion || isMobile ? 100 : 450;
        setTimeout(function () {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.35s ease';
                setTimeout(function () {
                    if (loadingScreen) loadingScreen.style.display = 'none';
                }, 350);
            }
        }, hideDelay);

        requestIdle(function () {
            loadDeferredScript('js/phase1.js');
            loadDeferredScript('js/phase2.js');
            loadDeferredScript('js/phase3.js');
        });
    });

    // Standard mouse cursor restored site-wide

    // ==================== THEME ====================
    const savedTheme = localStorage.getItem('almagen_theme');
    if (savedTheme === 'light') document.body.classList.add('light-theme');
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');

    function updateThemeButtons() {
        const isLight = document.body.classList.contains('light-theme');
        const icon = isLight ? '☀️' : '🌓';
        if (themeToggle) themeToggle.textContent = icon;
        if (themeToggleMobile) themeToggleMobile.textContent = icon;
    }
    updateThemeButtons();

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('almagen_theme', isLight ? 'light' : 'dark');
        updateThemeButtons();
    }
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // ==================== HEADER SCROLL ====================
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ==================== 3-DOT MENU ====================
    const menuDots = document.getElementById('menuDots');
    const navOverlay = document.getElementById('navOverlay');
    const headerNav = document.getElementById('headerNav');

    function toggleMenu() {
        menuDots.classList.toggle('active');
        headerNav.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : 'auto';
    }
    if (menuDots) menuDots.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (headerNav.classList.contains('active')) toggleMenu();
        });
    });

    // ==================== SOUND BUTTONS ====================
    const muteBtn = document.getElementById('muteBtn');
    const muteBtnMobile = document.getElementById('muteBtnMobile');
    function updateSoundButtons(isMuted) {
        const icon = isMuted ? '🔇' : '🔊';
        if (muteBtn) muteBtn.textContent = icon;
        if (muteBtnMobile) muteBtnMobile.textContent = icon;
    }
    updateSoundButtons(false);

    function toggleMute() {
        const muted = window.musicEngine && typeof window.musicEngine.toggleMute === 'function' ? window.musicEngine.toggleMute() : false;
        updateSoundButtons(muted);
    }
    if (muteBtn) muteBtn.addEventListener('click', toggleMute);
    if (muteBtnMobile) muteBtnMobile.addEventListener('click', toggleMute);

    // ==================== ACTIVE NAV ====================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(function (section) {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    }, { passive: true });

    // ==================== GAME FILTER ====================
    document.querySelectorAll('.filter-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            const filter = button.dataset.filter;
            document.querySelectorAll('.game-card').forEach(function (card) {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(function () {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(function () {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==================== GAME SEARCH ====================
    const searchInput = document.getElementById('gameSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.toLowerCase().trim();
            document.querySelectorAll('.game-card').forEach(function (card) {
                const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
                const tags = card.dataset.category?.toLowerCase() || '';
                const match = title.includes(query) || desc.includes(query) || tags.includes(query) || query === '';
                card.style.display = match ? 'block' : 'none';
            });
        });
    }

    // ==================== COUNTER ANIMATION ====================
    const statNums = document.querySelectorAll('.stat-number, .stat-big');
    const animateCounter = function (el) {
        const target = parseFloat(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = function () {
            current += step;
            if (current < target) {
                el.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };
        update();
    };
    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNums.forEach(function (node) { statsObserver.observe(node); });

    // ==================== PARTICLES ====================
    const particlesBg = document.getElementById('particlesBg');
    if (particlesBg && !isMobile && !prefersReducedMotion) {
        for (let i = 0; i < 24; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particlesBg.appendChild(particle);
        }
    }

    // ==================== LAZY ADSENSE ====================
    let adsenseRequested = false;
    function loadAdsenseScript() {
        if (adsenseRequested) return;
        adsenseRequested = true;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1373118680696037';
        script.crossOrigin = 'anonymous';
        script.onload = function () {
            document.querySelectorAll('ins.adsbygoogle[data-lazy-ad="true"]').forEach(function (slot) {
                if (slot.dataset.adLoaded === 'true') return;
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                    slot.dataset.adLoaded = 'true';
                } catch (_) {
                }
            });
        };
        document.head.appendChild(script);
    }

    const adSlots = document.querySelectorAll('ins.adsbygoogle[data-lazy-ad="true"]');
    if (adSlots.length) {
        const adObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
            if (entries.some(function (entry) { return entry.isIntersecting; })) {
                loadAdsenseScript();
                adObserver.disconnect();
            }
        }, { rootMargin: '40px 0px' }) : null;

        adSlots.forEach(function (slot) {
            if (adObserver) adObserver.observe(slot);
        });

        if (!adObserver) {
            window.addEventListener('load', function () {
                setTimeout(loadAdsenseScript, 4000);
            }, { once: true });
        }
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ==================== SOCIAL SHARE ====================
    function shareSite() {
        if (!sharePopup) return;
        sharePopup.hidden = false;
        sharePopup.classList.add('is-visible');
    }

    function closeSharePopup() {
        if (!sharePopup) return;
        sharePopup.classList.remove('is-visible');
        sharePopup.hidden = true;
    }

    function shareOn(platform) {
        const url = encodeURIComponent('https://almagen-arena.com');
        const text = encodeURIComponent('🎮 Check out AlMaGen-Arena! 15 free online games - Play & Learn! No download required!');
        let shareUrl = '';
        switch (platform) {
            case 'whatsapp': shareUrl = 'https://wa.me/?text=' + text + '%20' + url; break;
            case 'facebook': shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url; break;
            case 'twitter': shareUrl = 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url; break;
        }
        window.open(shareUrl, '_blank', 'width=600,height=400');
        closeSharePopup();
    }

    function copyLink() {
        navigator.clipboard.writeText('https://almagen-arena.com').then(function () {
            alert('✅ Link copied! Share it with friends!');
            closeSharePopup();
        });
    }

    document.querySelectorAll('#shareBtn, #shareBtnMobile').forEach(function (button) {
        button.addEventListener('click', shareSite);
    });
    document.querySelectorAll('[data-share-platform]').forEach(function (button) {
        button.addEventListener('click', function () {
            shareOn(button.getAttribute('data-share-platform'));
        });
    });
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) copyLinkBtn.addEventListener('click', copyLink);
    const closeShareBtn = document.getElementById('closeSharePopup');
    if (closeShareBtn) closeShareBtn.addEventListener('click', closeSharePopup);
    if (sharePopup) {
        sharePopup.addEventListener('click', function (event) {
            if (event.target === sharePopup) closeSharePopup();
        });
    }

    // ==================== FEEDBACK ====================
    function submitFeedback(e) {
        e.preventDefault();
        const nameEl = document.getElementById('feedbackName');
        const msgEl = document.getElementById('feedbackMsg');
        const name = nameEl ? nameEl.value : '';
        const msg = msgEl ? msgEl.value : '';
        const feedbacks = JSON.parse(localStorage.getItem('almagen_feedbacks') || '[]');
        feedbacks.push({ name, msg, date: new Date().toISOString() });
        localStorage.setItem('almagen_feedbacks', JSON.stringify(feedbacks));
        const feedbackSuccess = document.getElementById('feedbackSuccess');
        if (feedbackSuccess) feedbackSuccess.hidden = false;
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) feedbackForm.reset();
        setTimeout(function () {
            if (feedbackSuccess) feedbackSuccess.hidden = true;
        }, 3000);
        if (typeof gtag === 'function') {
            gtag('event', 'feedback_submitted', { event_category: 'engagement' });
        }
    }

    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) feedbackForm.addEventListener('submit', submitFeedback);

    // ==================== PUSH NOTIFICATIONS ====================
    function subscribePush() {
        if ('Notification' in window) {
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    new Notification('🔔 AlMaGen-Arena', {
                        body: 'You will now receive updates about new games!',
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚔️</text></svg>'
                    });
                    if (typeof gtag === 'function') {
                        gtag('event', 'push_notification_subscribed', { event_category: 'engagement' });
                    }
                }
            });
        }
        if (pushPrompt) {
            pushPrompt.classList.remove('is-visible');
            pushPrompt.hidden = true;
        }
        localStorage.setItem('almagen_push_prompted', 'true');
    }

    const pushAllowBtn = document.getElementById('pushAllowBtn');
    if (pushAllowBtn) pushAllowBtn.addEventListener('click', subscribePush);
    const pushDismissBtn = document.getElementById('pushDismissBtn');
    if (pushDismissBtn) {
        pushDismissBtn.addEventListener('click', function () {
            if (pushPrompt) {
                pushPrompt.classList.remove('is-visible');
                pushPrompt.hidden = true;
            }
            localStorage.setItem('almagen_push_prompted', 'true');
        });
    }
    setTimeout(function () {
        const prompted = localStorage.getItem('almagen_push_prompted');
        if (!prompted && 'Notification' in window && Notification.permission === 'default') {
            if (pushPrompt) {
                pushPrompt.hidden = false;
                pushPrompt.classList.add('is-visible');
            }
        }
    }, 10000);

    // ==================== PWA SERVICE WORKER ====================
    if ('serviceWorker' in navigator) {
        const script = document.createElement('script');
        script.src = '/js/app-updater.js';
        script.defer = true;
        document.head.appendChild(script);
    }

    // ==================== HERO SLIDER ====================
    const heroSlides = [
        {
            badge: 'FEATURED',
            kicker: 'Featured Game',
            title: 'Street Racer Turbo Week',
            desc: 'Burn through traffic, unlock combo streaks, and beat this week\'s speed challenge.',
            cta: 'Play Street Racer',
            href: 'games/streetracer.html'
        },
        {
            badge: 'POPULAR',
            kicker: 'Math & Reflexes',
            title: 'Math Snake Challenge',
            desc: 'Grow your snake by solving math problems. Master addition, subtraction & multiplication!',
            cta: 'Play Math Snake',
            href: 'games/snake.html'
        },
        {
            badge: 'STRATEGY',
            kicker: 'Brain Master',
            title: 'Mini Chess Tactics',
            desc: 'Outsmart AI on a fast-paced 6x6 board. Easy rules, endless tactical depth!',
            cta: 'Play Mini Chess',
            href: 'games/chess.html'
        }
    ];

    let currentSlide = 0;
    const heroSlider = document.getElementById('heroFeatureSlider');
    if (heroSlider) {
        function showSlide(index) {
            currentSlide = (index + heroSlides.length) % heroSlides.length;
            const slide = heroSlides[currentSlide];
            const badgeEl = heroSlider.querySelector('[data-hero-badge]');
            const kickerEl = heroSlider.querySelector('[data-hero-kicker]');
            const titleEl = heroSlider.querySelector('[data-hero-title]');
            const descEl = heroSlider.querySelector('[data-hero-desc]');
            const ctaEl = heroSlider.querySelector('[data-hero-cta]');

            if (badgeEl) badgeEl.textContent = slide.badge;
            if (kickerEl) kickerEl.textContent = slide.kicker;
            if (titleEl) titleEl.textContent = slide.title;
            if (descEl) descEl.textContent = slide.desc;
            if (ctaEl) {
                ctaEl.textContent = slide.cta;
                ctaEl.setAttribute('href', slide.href);
            }

            heroSlider.querySelectorAll('[data-slide-dot]').forEach(function (dot, idx) {
                dot.classList.toggle('active', idx === currentSlide);
            });
        }

        heroSlider.querySelectorAll('[data-slide-dot]').forEach(function (dot) {
            dot.addEventListener('click', function () {
                const idx = parseInt(dot.getAttribute('data-slide-dot'), 10);
                showSlide(idx);
            });
        });

        setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4500);
    }

    // ==================== QUICK SEARCH & CATEGORIES ====================
    const headerQuickSearch = document.getElementById('headerQuickSearch');
    if (headerQuickSearch) {
        headerQuickSearch.addEventListener('input', function () {
            const query = headerQuickSearch.value.toLowerCase().trim();
            const mainSearch = document.getElementById('gameSearch');
            if (mainSearch) mainSearch.value = query;
            document.querySelectorAll('.game-card').forEach(function (card) {
                const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
                const tags = card.dataset.category?.toLowerCase() || '';
                const match = title.includes(query) || desc.includes(query) || tags.includes(query) || query === '';
                card.style.display = match ? 'block' : 'none';
            });
        });
    }

    const quickCategorySelect = document.getElementById('quickCategory');
    if (quickCategorySelect) {
        quickCategorySelect.addEventListener('change', function () {
            const cat = quickCategorySelect.value;
            document.querySelectorAll('.filter-btn').forEach(function (btn) {
                btn.classList.toggle('active', btn.dataset.filter === cat);
            });
            document.querySelectorAll('.game-card').forEach(function (card) {
                if (cat === 'all' || card.dataset.category.includes(cat)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    document.querySelectorAll('.collection-pill').forEach(function (pill) {
        pill.addEventListener('click', function (e) {
            const collection = pill.dataset.collection;
            if (!collection) return;
            document.querySelectorAll('.filter-btn').forEach(function (btn) {
                btn.classList.toggle('active', btn.dataset.filter === collection);
            });
            document.querySelectorAll('.game-card').forEach(function (card) {
                if (collection === 'all' || card.dataset.category.includes(collection)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==================== DAILY REWARD CLAIM ====================
    const claimRewardBtn = document.getElementById('claimRewardBtn');
    if (claimRewardBtn) {
        claimRewardBtn.addEventListener('click', function () {
            if (window.musicEngine && typeof window.musicEngine.playCoin === 'function') {
                window.musicEngine.playCoin();
            }
            const currentXP = parseInt(localStorage.getItem('almagen_xp') || '0', 10);
            const currentCoins = parseInt(localStorage.getItem('almagen_coins') || '0', 10);
            localStorage.setItem('almagen_xp', (currentXP + 75).toString());
            localStorage.setItem('almagen_coins', (currentCoins + 25).toString());
            
            const popup = document.getElementById('dailyRewardPopup');
            if (popup) popup.setAttribute('aria-hidden', 'true');
            
            alert('🎉 Daily Reward Claimed! +75 XP and +25 Coins added to your profile!');
        });
    }

})();