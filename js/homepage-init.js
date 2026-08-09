(function () {
    'use strict';

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function requestIdle(cb) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(cb, { timeout: 2000 });
        } else {
            setTimeout(cb, 120);
        }
    }

    function loadDeferredScript(src) {
        if (document.querySelector(`script[src="${src}"]`)) return;
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    }

    // ==================== INITIAL LOADING SCREEN ====================
    window.addEventListener('load', function () {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;
        const hideDelay = prefersReducedMotion ? 0 : 300;

        setTimeout(function () {
            loadingScreen.style.opacity = '0';
            setTimeout(function () {
                loadingScreen.style.display = 'none';
            }, hideDelay);

            requestIdle(function () {
                loadDeferredScript('js/phase1.js');
                loadDeferredScript('js/phase2.js');
                loadDeferredScript('js/phase3.js');
            });
        }, hideDelay);
    });

    // ==================== PREMIUM GLOWING GAMING CURSOR ====================
    (function initPremiumCursor() {
        if (isCoarsePointer) return;
        let follower = document.querySelector('.cursor-follower');
        if (!follower) {
            follower = document.createElement('div');
            follower.className = 'cursor-follower';
            document.body.appendChild(follower);
        }

        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
        let followerX = mouseX, followerY = mouseY;
        let isMoving = false;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(animateFollower);
            }
        }, { passive: true });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            if (Math.abs(mouseX - followerX) > 0.1 || Math.abs(mouseY - followerY) > 0.1) {
                requestAnimationFrame(animateFollower);
            } else {
                isMoving = false;
            }
        }

        const interactiveSelectors = 'a, button, input, select, textarea, .game-card, .collection-pill, .filter-btn, .mini-game-card, .avatar-option';
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(interactiveSelectors)) {
                follower.classList.add('hovering');
            }
        }, { passive: true });

        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(interactiveSelectors)) {
                follower.classList.remove('hovering');
            }
        }, { passive: true });
    })();

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
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ==================== 3-DOT MENU ====================
    const menuDots = document.getElementById('menuDots');
    const navOverlay = document.getElementById('navOverlay');
    const headerNav = document.getElementById('headerNav');

    function toggleMenu() {
        if (!menuDots || !headerNav) return;
        menuDots.classList.toggle('active');
        headerNav.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
        document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : 'auto';
    }
    if (menuDots) menuDots.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', toggleMenu);

    // ==================== ACTIVE NAV SCROLL ====================
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
                    setTimeout(function () { card.style.opacity = '1'; }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(function () { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // ==================== GAME SEARCH ====================
    const searchInput = document.getElementById('gameSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.toLowerCase().trim();
            document.querySelectorAll('.game-card').forEach(function (card) {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }

    const headerQuickSearch = document.getElementById('headerQuickSearch');
    if (headerQuickSearch) {
        headerQuickSearch.addEventListener('input', function () {
            const term = this.value.toLowerCase().trim();
            if (searchInput) searchInput.value = term;
            document.querySelectorAll('.game-card').forEach(function (card) {
                const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
                const desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
                const cat = (card.dataset.category || '').toLowerCase();
                if (!term || title.includes(term) || desc.includes(term) || cat.includes(term)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }

    // Quick Category Selector
    const quickCategorySelect = document.getElementById('quickCategory');
    if (quickCategorySelect) {
        quickCategorySelect.addEventListener('change', function () {
            const filter = this.value;
            document.querySelectorAll('.filter-btn').forEach(function (btn) {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
            document.querySelectorAll('.game-card').forEach(function (card) {
                if (filter === 'all' || (card.dataset.category || '').includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }

    // Collection Pills Filter
    document.querySelectorAll('.collection-pill').forEach(function (pill) {
        pill.addEventListener('click', function () {
            document.querySelectorAll('.collection-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter || 'all';
            if (quickCategorySelect) quickCategorySelect.value = filter;
            document.querySelectorAll('.game-card').forEach(function (card) {
                if (filter === 'all' || (card.dataset.category || '').includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // Claim Daily Reward Button Handler
    const claimRewardBtn = document.getElementById('claimRewardBtn');
    if (claimRewardBtn) {
        claimRewardBtn.addEventListener('click', function () {
            if (this.disabled || this.classList.contains('claimed')) return;
            this.disabled = true;
            this.textContent = '✅ Claimed (+75 XP, +25 Coins)';
            this.classList.add('claimed');
            this.style.background = '#00b894';

            if (window.UserProfile) {
                window.UserProfile.addXP(75);
                window.UserProfile.addCoins(25);
            }
            if (window.playSound) window.playSound('coin');

            const toast = document.createElement('div');
            toast.textContent = '🎉 Reward Claimed! +75 XP & +25 Coins added to profile!';
            toast.style.cssText = 'position:fixed;bottom:30px;right:30px;background:linear-gradient(135deg,#6c5ce7,#00d4ff);color:#fff;padding:14px 22px;border-radius:14px;font-weight:600;z-index:99999;box-shadow:0 10px 30px rgba(0,0,0,0.5);';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 4000);
        });
    }

    // ==================== HERO SLIDER AUTO-ROTATE ====================
    (function initHeroSlider() {
        const slider = document.getElementById('heroFeatureSlider');
        if (!slider) return;
        const slides = slider.querySelectorAll('.hero-slide');
        const dots = slider.querySelectorAll('.slider-dot');
        if (slides.length <= 1) return;

        let currentSlide = 0;
        function showSlide(index) {
            slides.forEach((s, i) => s.classList.toggle('active', i === index));
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
            currentSlide = index;
        }

        let autoSlideTimer = setInterval(() => {
            showSlide((currentSlide + 1) % slides.length);
        }, 4500);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoSlideTimer);
                showSlide(index);
                autoSlideTimer = setInterval(() => {
                    showSlide((currentSlide + 1) % slides.length);
                }, 4500);
            });
        });
    })();

    // ==================== SHARE POPUP ====================
    const sharePopup = document.getElementById('sharePopup');

    function openSharePopup() {
        if (!sharePopup) return;
        sharePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSharePopup() {
        if (!sharePopup) return;
        sharePopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function shareOn(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Check out AlMaGen-Arena — Free Educational Games!');
        let shareUrl = '';

        switch (platform) {
            case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`; break;
            case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
            case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`; break;
            case 'telegram': shareUrl = `https://t.me/share/url?url=${url}&text=${title}`; break;
            case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
        }

        if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    function shareSite() {
        if (navigator.share) {
            navigator.share({
                title: 'AlMaGen-Arena',
                text: 'Play 15 free educational browser games on AlMaGen-Arena!',
                url: window.location.href
            }).catch(() => {});
        } else {
            openSharePopup();
        }
    }

    function copyLink() {
        const urlInput = document.getElementById('shareUrlInput');
        if (urlInput) {
            urlInput.select();
            navigator.clipboard.writeText(urlInput.value).then(() => {
                alert('✅ Link copied to clipboard!');
                closeSharePopup();
            });
        }
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

})();
