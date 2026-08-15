(function () {
    const isSubFolder = /\/(games|categories|blog)\//i.test(window.location.pathname);
    const isGamePage = /\/games\//i.test(window.location.pathname);
    const prefix = '/';

    // Remove any existing duplicate header or footer elements before rendering
    document.querySelectorAll('.global-home-header, .global-home-footer, .global-home-overlay, .global-utility-nav, .global-footer-links').forEach(function (node) {
        node.remove();
    });

    document.querySelectorAll('header.header, nav.navbar').forEach(function (node) {
        node.remove();
    });

    document.querySelectorAll('footer.footer').forEach(function (node) {
        node.remove();
    });

    const pageFile = (window.location.pathname.split('/').pop() || '').toLowerCase();

    const navItems = [
        { href: prefix + 'index.html#home', label: 'Home', key: 'home' },
        { href: prefix + 'index.html#games', label: 'Games', key: 'games' },
        { href: prefix + 'daily.html', label: 'Daily', key: 'daily.html' },
        { href: prefix + 'leaderboard.html', label: 'Leaderboard', key: 'leaderboard.html' },
        { href: prefix + 'achievements.html', label: 'Achievements', key: 'achievements.html' },
        { href: prefix + 'profile.html', label: 'Profile', key: 'profile.html' },
        { href: prefix + 'blog.html', label: 'Blog', key: 'blog.html' },
        { href: prefix + 'contact.html', label: 'Contact', key: 'contact.html' }
    ];

    const navLinks = navItems.map(function (item) {
        const activeClass = pageFile === item.key ? ' active' : '';
        return '<li><a href="' + item.href + '" class="nav-link' + activeClass + '">' + item.label + '</a></li>';
    }).join('');

    const header = document.createElement('header');
    header.className = 'header global-home-header';
    header.id = 'header';
    header.innerHTML = [
        '<div class="header-container">',
        '<a href="' + prefix + 'index.html" class="header-logo">',
        '<span class="logo-icon">⚔️</span>',
        '<span class="logo-text">AlMaGen<span class="logo-highlight">-Arena</span></span>',
        '</a>',
        '<nav class="header-nav" id="headerNav">',
        '<ul class="nav-list">',
        navLinks,
        '<li class="mobile-actions">',
        '<span class="mobile-label">Settings</span>',
        '<div class="mobile-buttons">',
        '<button class="theme-toggle-mobile" id="themeToggleMobile">🌓</button>',
        '<button class="sound-btn-mobile" id="muteBtnMobile">🔊</button>',
        '</div>',
        '</li>',
        '</ul>',
        '</nav>',
        '<div class="header-actions">',
        '<button class="theme-toggle" id="themeToggle" title="Toggle Theme">🌓</button>',
        '<button class="sound-btn" id="muteBtn" title="Toggle Sound">🔊</button>',
        '<button class="menu-dots" id="menuDots" title="Menu">⋮</button>',
        '</div>',
        '</div>'
    ].join('');

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay global-home-overlay';
    overlay.id = 'navOverlay';

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(header, overlay);

    document.body.classList.add('has-global-header');
    if (isGamePage) {
        document.body.classList.add('global-game-page');
    }

    const footer = document.createElement('footer');
    footer.className = 'footer global-home-footer';
    footer.innerHTML = [
        '<div class="footer-container">',
        '<div class="footer-brand">',
        '<span class="footer-logo">⚔️ AlMaGen<span class="logo-highlight">-Arena</span></span>',
        '<p>Where Gaming Meets Learning — 15 Free Online Educational Games for Everyone</p>',
        '<div class="footer-socials">',
        '<a href="' + prefix + 'index.html#home" aria-label="Home">🏠</a>',
        '<a href="' + prefix + 'index.html#games" aria-label="Games">🎮</a>',
        '<a href="https://instagram.com" aria-label="Instagram">📸</a>',
        '<a href="https://youtube.com" aria-label="YouTube">▶</a>',
        '</div>',
        '</div>',
        '<div class="footer-links">',
        '<h4>🔗 Quick Links</h4>',
        '<ul>',
        '<li><a href="' + prefix + 'index.html#home">Home</a></li>',
        '<li><a href="' + prefix + 'index.html#games">Games</a></li>',
        '<li><a href="' + prefix + 'daily.html">Daily Challenges</a></li>',
        '<li><a href="' + prefix + 'leaderboard.html">Leaderboard</a></li>',
        '<li><a href="' + prefix + 'profile.html">Profile</a></li>',
        '</ul>',
        '</div>',
        '<div class="footer-links">',
        '<h4>🎮 Popular Games</h4>',
        '<ul>',
        '<li><a href="' + prefix + 'games/snake.html">Math Snake</a></li>',
        '<li><a href="' + prefix + 'games/streetracer.html">Street Racer</a></li>',
        '<li><a href="' + prefix + 'games/ludo.html">Ludo Dice</a></li>',
        '<li><a href="' + prefix + 'games/chess.html">Mini Chess</a></li>',
        '<li><a href="' + prefix + 'games/cardmatch.html">Card Match</a></li>',
        '</ul>',
        '</div>',
        '<div class="footer-links">',
        '<h4>🛡️ Legal & Info</h4>',
        '<ul>',
        '<li><a href="' + prefix + 'about.html">About Us</a></li>',
        '<li><a href="' + prefix + 'privacy.html">Privacy Policy</a></li>',
        '<li><a href="' + prefix + 'terms.html">Terms of Service</a></li>',
        '<li><a href="' + prefix + 'contact.html">Contact Us</a></li>',
        '</ul>',
        '</div>',
        '</div>',
        '<div class="footer-bottom">',
        '<p>Made with ❤️ | AlMaGen<span class="logo-highlight">-Arena</span> © 2026 | All Rights Reserved</p>',
        '</div>'
    ].join('');

    function attachFooter() {
        const existingFooter = document.querySelector('footer.global-home-footer');
        if (existingFooter) existingFooter.remove();

        const seoArticle = document.querySelector('.game-seo-article');
        const moreGamesSec = document.querySelector('.more-games-section');
        const mainEl = document.querySelector('main');

        if (seoArticle && seoArticle.parentNode) {
            seoArticle.parentNode.insertBefore(footer, seoArticle.nextSibling);
        } else if (moreGamesSec && moreGamesSec.parentNode) {
            moreGamesSec.parentNode.insertBefore(footer, moreGamesSec.nextSibling);
        } else if (mainEl && mainEl.parentNode) {
            mainEl.parentNode.insertBefore(footer, mainEl.nextSibling);
        } else {
            document.body.appendChild(footer);
        }
    } else {
            document.body.appendChild(footer);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachFooter);
    } else {
        attachFooter();
    }

    // ===== GOOGLE ADSENSE & GDPR COOKIE CONSENT BANNER =====
    function initCookieConsent() {
        if (localStorage.getItem('almagen_cookie_consent') === 'accepted') return;

        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);width:90%;max-width:580px;background:rgba(10,10,26,0.96);border:1px solid #00ff88;box-shadow:0 10px 30px rgba(0,255,136,0.25);border-radius:16px;padding:16px 20px;z-index:99999;display:flex;align-items:center;justify-content:space-between;gap:15px;backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);color:#fff;font-family:sans-serif;font-size:0.85rem;line-height:1.4;';
        
        banner.innerHTML = `
            <div style="flex:1;">
                <div style="font-weight:bold;color:#00ff88;margin-bottom:4px;display:flex;align-items:center;gap:6px;">🍪 Cookie & Privacy Consent</div>
                <div style="color:rgba(255,255,255,0.85);font-size:0.78rem;">
                    We use cookies and Google AdSense to personalize ads and analyze traffic for the best gaming experience. By playing, you agree to our <a href="${prefix}privacy.html" style="color:#00ff88;text-decoration:underline;">Privacy Policy</a>.
                </div>
            </div>
            <button id="acceptCookieBtn" style="background:linear-gradient(135deg,#00ff88,#00b894);color:#000;border:none;padding:8px 18px;border-radius:20px;font-weight:bold;font-size:0.85rem;cursor:pointer;white-space:nowrap;box-shadow:0 4px 12px rgba(0,255,136,0.4);transition:transform 0.2s;">Accept All</button>
        `;

        document.body.appendChild(banner);

        const acceptBtn = document.getElementById('acceptCookieBtn');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('almagen_cookie_consent', 'accepted');
                banner.style.opacity = '0';
                banner.style.transform = 'translateX(-50%) translateY(20px)';
                banner.style.transition = 'all 0.3s ease';
                setTimeout(() => banner.remove(), 300);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        initCookieConsent();
    }

    // ===== MASTER UNIVERSAL LIGHT/DARK THEME TOGGLE =====
    function initGlobalTheme() {
        const savedTheme = localStorage.getItem('almagen_theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }

        function updateThemeIcons() {
            const isLight = document.body.classList.contains('light-theme');
            const icon = isLight ? '☀️' : '🌓';
            document.querySelectorAll('#themeToggle, #themeToggleMobile, .theme-toggle, .theme-toggle-mobile').forEach(function (btn) {
                btn.textContent = icon;
                btn.setAttribute('title', isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme');
            });
        }

        updateThemeIcons();

        document.addEventListener('click', function (e) {
            const target = e.target.closest('#themeToggle, #themeToggleMobile, .theme-toggle, .theme-toggle-mobile');
            if (target) {
                e.preventDefault();
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('almagen_theme', isLight ? 'light' : 'dark');
                updateThemeIcons();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalTheme);
    } else {
        initGlobalTheme();
    }

})();