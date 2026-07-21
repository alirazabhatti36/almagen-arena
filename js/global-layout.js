(function () {
    const isGamePage = /\/games\//.test(window.location.pathname);
    const isHome = /\/index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname);
    if (isHome) return;

    const prefix = isGamePage ? '../' : '';

    let existingNav = document.querySelector('.navbar, .header');
    const existingFooter = document.querySelector('.footer');
    const existingUtilityNav = document.querySelector('.global-utility-nav');
    const existingGlobalFooter = document.querySelector('.global-footer-links');

    if (!existingNav) {
        const fallbackHeader = document.createElement('header');
        fallbackHeader.className = 'global-injected-header almagen-unified-nav';
        fallbackHeader.innerHTML = [
            '<div class="global-header-inner">',
            '<a class="global-header-brand" href="' + prefix + 'index.html">⚔️ AlMaGen-Arena</a>',
            '<nav class="global-header-links" aria-label="Primary navigation">',
            '<a href="' + prefix + 'index.html#games">Games</a>',
            '<a href="' + prefix + 'categories.html">Categories</a>',
            '<a href="' + prefix + 'daily.html">Daily</a>',
            '<a href="' + prefix + 'leaderboard.html">Leaderboard</a>',
            '<a href="' + prefix + 'blog.html">Blog</a>',
            '<a href="' + prefix + 'contact.html">Contact</a>',
            '</nav>',
            '</div>'
        ].join('');
        document.body.insertBefore(fallbackHeader, document.body.firstChild);
        existingNav = fallbackHeader;
    }

    if (existingNav) existingNav.classList.add('almagen-unified-nav');
    if (existingFooter) existingFooter.classList.add('almagen-unified-footer');

    if (!existingUtilityNav) {
        const utilityNav = document.createElement('nav');
        utilityNav.className = 'global-utility-nav';
        utilityNav.setAttribute('aria-label', 'Global utility navigation');
        utilityNav.innerHTML = [
            '<a href="' + prefix + 'index.html#games">Games</a>',
            '<a href="' + prefix + 'categories.html">Categories</a>',
            '<a href="' + prefix + 'search.html">Search</a>',
            '<a href="' + prefix + 'leaderboard.html">Leaderboard</a>',
            '<a href="' + prefix + 'notifications.html">Notifications</a>',
            '<a href="' + prefix + 'coin-store.html">Coin Store</a>',
            '<a href="' + prefix + 'blog.html">News</a>'
        ].join('');

        if (existingNav && existingNav.parentNode) {
            existingNav.parentNode.insertBefore(utilityNav, existingNav.nextSibling);
        }
    }

    if (!existingGlobalFooter) {
        const footer = document.createElement('footer');
        footer.className = 'global-footer-links';
        footer.innerHTML = [
            '<nav aria-label="Global footer links">',
            '<a href="' + prefix + 'about.html">Company</a>',
            '<a href="' + prefix + 'all-games.html">Games</a>',
            '<a href="' + prefix + 'categories.html">Categories</a>',
            '<a href="' + prefix + 'faq.html">FAQ</a>',
            '<a href="' + prefix + 'help-center.html">Resources</a>',
            '<a href="' + prefix + 'privacy.html">Privacy</a>',
            '<a href="' + prefix + 'terms.html">Terms</a>',
            '<a href="' + prefix + 'cookies.html">Cookies</a>',
            '<a href="' + prefix + 'dmca.html">DMCA</a>',
            '<a href="' + prefix + 'community-guidelines.html">Guidelines</a>',
            '<a href="' + prefix + 'careers.html">Careers</a>',
            '<a href="' + prefix + 'press-kit.html">Press Kit</a>',
            '<a href="' + prefix + 'advertise.html">Advertise</a>',
            '<a href="' + prefix + 'developers.html">Developers</a>',
            '<a href="' + prefix + 'contact.html">Contact</a>',
            '<a href="#">Discord</a>',
            '<a href="#">YouTube</a>',
            '<a href="#">Facebook</a>',
            '<a href="#">X</a>',
            '</nav>',
            '<p>AlMaGen-Arena © 2026</p>'
        ].join('');

        document.body.appendChild(footer);
    }

    document.querySelectorAll('[data-empty-state]').forEach(function (node) {
        if (!node.textContent.trim()) {
            node.textContent = 'Nothing to show yet. Content will appear after backend integration.';
        }
    });

    const style = document.createElement('style');
    style.textContent = [
        '.almagen-unified-nav{backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(8,10,26,.82);}',
        '.almagen-unified-nav .nav-container,.almagen-unified-nav .header-container{max-width:1200px;margin:0 auto;}',
        '.almagen-unified-nav.navbar,.almagen-unified-nav.header{position:sticky;top:0;z-index:1000;}',
        '.almagen-unified-nav .nav-container,.almagen-unified-nav .header-container{padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;}',
        '.almagen-unified-nav .nav-logo,.almagen-unified-nav .header-logo{text-decoration:none;color:#fff;font-weight:700;display:inline-flex;align-items:center;gap:6px;}',
        '.almagen-unified-nav .logo-highlight{color:#a29bfe;}',
        '.almagen-unified-nav .nav-menu,.almagen-unified-nav .nav-list{list-style:none;margin:0;padding:0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}',
        '.almagen-unified-nav .nav-menu li,.almagen-unified-nav .nav-list li{list-style:none;}',
        '.almagen-unified-nav .nav-link{display:inline-flex;align-items:center;gap:6px;text-decoration:none;color:#fff;font-size:.92rem;padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.14);}',
        '.almagen-unified-nav .nav-actions,.almagen-unified-nav .header-actions{display:flex;align-items:center;gap:8px;}',
        '.almagen-unified-nav button{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:10px;padding:6px 10px;cursor:pointer;}',
        '.global-injected-header{position:sticky;top:0;z-index:1000;}',
        '.global-header-inner{max-width:1100px;margin:0 auto;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-family:\'Poppins\',sans-serif;}',
        '.global-header-brand{text-decoration:none;color:#fff;font-weight:700;letter-spacing:.2px;}',
        '.global-header-links{display:flex;flex-wrap:wrap;gap:8px;}',
        '.global-header-links a{text-decoration:none;color:#fff;font-size:.86rem;padding:5px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.15);}',
        '.almagen-unified-nav .nav-link{transition:all .25s ease;}',
        '.almagen-unified-nav .nav-link:hover{opacity:1;transform:translateY(-1px);}',
        '.global-utility-nav{max-width:1080px;margin:84px auto 10px;padding:8px 12px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);display:flex;flex-wrap:wrap;gap:8px;justify-content:center;font-family:\'Poppins\',sans-serif;}',
        '.global-utility-nav a{text-decoration:none;color:#fff;font-size:.79rem;padding:5px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.14);}',
        '.almagen-unified-footer{margin-top:36px;}',
        '.global-footer-links{margin:24px auto 18px;padding:12px 14px;max-width:980px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:rgba(255,255,255,.03);font-family:\'Poppins\',sans-serif;}',
        '.global-footer-links nav{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:7px;}',
        '.global-footer-links nav a{text-decoration:none;color:#a29bfe;font-size:.82rem;padding:5px 9px;border:1px solid rgba(255,255,255,.12);border-radius:999px;}',
        '.global-footer-links p{text-align:center;color:rgba(255,255,255,.58);font-size:.72rem;}',
        '.empty-placeholder{border:1px dashed rgba(255,255,255,.22);border-radius:12px;padding:14px;color:rgba(255,255,255,.64);font-size:.85rem;}',
        '@media (max-width:640px){.almagen-unified-nav .nav-container,.almagen-unified-nav .header-container{padding:10px 12px;align-items:flex-start;}.almagen-unified-nav .nav-menu,.almagen-unified-nav .nav-list{gap:6px;}.almagen-unified-nav .nav-link{font-size:.82rem;padding:5px 8px;}.global-footer-links{margin:18px 10px 14px;}.global-utility-nav{margin-top:12px;}.global-header-inner{padding:10px 12px;}.global-header-links a{font-size:.8rem;padding:4px 8px;}}'
    ].join('');
    document.head.appendChild(style);
})();
