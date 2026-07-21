(function () {
    const isGamePage = /\/games\//.test(window.location.pathname);
    const isHome = /\/index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname);
    if (isHome) return;

    const prefix = isGamePage ? '../' : '';

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
        '<button class="theme-toggle" id="themeToggle">🌓</button>',
        '<button class="sound-btn" id="muteBtn">🔊</button>',
        '<button class="menu-dots" id="menuDots">⋮</button>',
        '</div>',
        '</div>'
    ].join('');

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay global-home-overlay';
    overlay.id = 'navOverlay';

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(header, overlay);

    const footer = document.createElement('footer');
    footer.className = 'footer global-home-footer';
    footer.innerHTML = [
        '<div class="footer-container">',
        '<div class="footer-brand">',
        '<span class="footer-logo">⚔️ AlMaGen<span class="logo-highlight">-Arena</span></span>',
        '<p>Where Gaming Meets Learning — 15 Free Online Educational Games for Everyone</p>',
        '<div class="footer-spotlight">',
        '<div class="footer-spotlight-icon">🎮</div>',
        '<div>',
        '<p class="footer-spotlight-title">15 Games • No Download • Play Instantly</p>',
        '<p class="footer-spotlight-subtitle">Jump into quick sessions across math, strategy, puzzle, and action games.</p>',
        '</div>',
        '</div>',
        '<div class="footer-socials">',
        '<a href="' + prefix + 'index.html#home" aria-label="Home">🏠</a>',
        '<a href="' + prefix + 'index.html#games" aria-label="Games">🎮</a>',
        '<a href="#" aria-label="Instagram">📸</a>',
        '<a href="#" aria-label="YouTube">▶</a>',
        '</div>',
        '</div>',
        '<div class="footer-links">',
        '<h4>🔗 Quick Links</h4>',
        '<ul>',
        '<li><a href="' + prefix + 'index.html#home">Home</a></li>',
        '<li><a href="' + prefix + 'index.html#games">Games</a></li>',
        '<li><a href="' + prefix + 'all-games.html">All Games</a></li>',
        '<li><a href="' + prefix + 'categories.html">Categories</a></li>',
        '<li><a href="' + prefix + 'daily.html">Daily Challenges</a></li>',
        '<li><a href="' + prefix + 'leaderboard.html">Leaderboard</a></li>',
        '<li><a href="' + prefix + 'profile.html">Profile</a></li>',
        '<li><a href="' + prefix + 'blog.html">Blog</a></li>',
        '<li><a href="' + prefix + 'contact.html">Contact</a></li>',
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
        '<h4>🛡️ Legal</h4>',
        '<ul>',
        '<li><a href="' + prefix + 'about.html">About</a></li>',
        '<li><a href="' + prefix + 'community-guidelines.html">Community Guidelines</a></li>',
        '<li><a href="' + prefix + 'help-center.html">Help Center</a></li>',
        '<li><a href="' + prefix + 'careers.html">Careers</a></li>',
        '<li><a href="' + prefix + 'press-kit.html">Press Kit</a></li>',
        '<li><a href="' + prefix + 'privacy.html">Privacy Policy</a></li>',
        '<li><a href="' + prefix + 'terms.html">Terms of Service</a></li>',
        '<li><a href="' + prefix + 'cookies.html">Cookies</a></li>',
        '<li><a href="' + prefix + 'dmca.html">DMCA</a></li>',
        '<li><a href="' + prefix + 'faq.html">FAQ</a></li>',
        '<li><a href="' + prefix + 'advertise.html">Advertise</a></li>',
        '<li><a href="' + prefix + 'developers.html">Developers</a></li>',
        '<li><a href="' + prefix + 'contact.html">Contact Us</a></li>',
        '</ul>',
        '</div>',
        '</div>',
        '<div class="footer-bottom">',
        '<p>Made with ❤️ | AlMaGen-Arena © 2026 | All Rights Reserved</p>',
        '<p class="footer-quote">"Play, Learn, and Grow!" 🚀</p>',
        '</div>'
    ].join('');

    document.body.appendChild(footer);

    document.querySelectorAll('[data-empty-state]').forEach(function (node) {
        if (!node.textContent.trim()) {
            node.textContent = 'Nothing to show yet. Content will appear after backend integration.';
        }
    });

    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');

    function updateThemeButtons() {
        const isLight = document.body.classList.contains('light-theme');
        const icon = isLight ? '☀️' : '🌓';
        if (themeToggle) themeToggle.textContent = icon;
        if (themeToggleMobile) themeToggleMobile.textContent = icon;
    }

    const savedTheme = localStorage.getItem('almagen_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
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

    const menuDots = document.getElementById('menuDots');
    const navOverlay = document.getElementById('navOverlay');
    const headerNav = document.getElementById('headerNav');

    function toggleMenu() {
        if (!menuDots || !headerNav || !navOverlay) return;
        menuDots.classList.toggle('active');
        headerNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (menuDots) menuDots.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.header-nav .nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (headerNav && headerNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    function updateSoundButtons(isMuted) {
        const icon = isMuted ? '🔇' : '🔊';
        const muteBtn = document.getElementById('muteBtn');
        const muteBtnMobile = document.getElementById('muteBtnMobile');
        if (muteBtn) muteBtn.textContent = icon;
        if (muteBtnMobile) muteBtnMobile.textContent = icon;
    }

    updateSoundButtons(false);

    function toggleMute() {
        if (window.musicEngine && typeof window.musicEngine.toggleMute === 'function') {
            const muted = window.musicEngine.toggleMute();
            updateSoundButtons(muted);
            return;
        }
        const nowMuted = document.getElementById('muteBtn') && document.getElementById('muteBtn').textContent === '🔊';
        updateSoundButtons(nowMuted);
    }

    const muteBtn = document.getElementById('muteBtn');
    const muteBtnMobile = document.getElementById('muteBtnMobile');
    if (muteBtn) muteBtn.addEventListener('click', toggleMute);
    if (muteBtnMobile) muteBtnMobile.addEventListener('click', toggleMute);

    const style = document.createElement('style');
    style.textContent = [
        '.global-home-header{position:sticky;top:0;z-index:1000;}',
        '.global-home-header .header-container{max-width:1200px;margin:0 auto;}',
        '.global-home-header .nav-list{list-style:none;}',
        '.global-home-header .nav-link{transition:all .25s ease;}',
        '.global-home-header .nav-link:hover{opacity:1;transform:translateY(-1px);}',
        '.global-home-footer{margin-top:36px;}',
        '.global-home-overlay{z-index:999;}',
        '.global-home-header .menu-dots,.global-home-header .theme-toggle,.global-home-header .sound-btn,.global-home-header .theme-toggle-mobile,.global-home-header .sound-btn-mobile{cursor:pointer;}',
        '.empty-placeholder{border:1px dashed rgba(255,255,255,.22);border-radius:12px;padding:14px;color:rgba(255,255,255,.64);font-size:.85rem;}',
        '@media (max-width:640px){.global-home-header .header-container{padding:10px 12px;}.global-home-footer{margin-top:22px;}}'
    ].join('');
    document.head.appendChild(style);
})();
