(function () {
    const isHome = /\/index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname);
    if (!isHome) return;

    const slides = [
        {
            kicker: 'Featured Game',
            title: 'Street Racer Turbo Week',
            desc: 'Burn through traffic, unlock combo streaks, and beat this week\'s speed challenge.',
            cta: 'Play Street Racer',
            href: 'games/streetracer.html',
            badge: 'TRENDING'
        },
        {
            kicker: 'New Release',
            title: 'Card Match Ranked Boards',
            desc: 'Fresh puzzle boards are live. Match faster and climb the static preview ranks.',
            cta: 'Play Card Match',
            href: 'games/cardmatch.html',
            badge: 'NEW'
        },
        {
            kicker: 'Editor Pick',
            title: 'Math Defense Focus Run',
            desc: 'Solve quick equations to protect your wall and stack precision bonus points.',
            cta: 'Play Math Defense',
            href: 'games/mathdefense.html',
            badge: 'EDITOR\'S CHOICE'
        }
    ];

    function setupHeroSlider() {
        const container = document.getElementById('heroFeatureSlider');
        if (!container) return;

        let index = 0;
        const title = container.querySelector('[data-hero-title]');
        const desc = container.querySelector('[data-hero-desc]');
        const kicker = container.querySelector('[data-hero-kicker]');
        const cta = container.querySelector('[data-hero-cta]');
        const badge = container.querySelector('[data-hero-badge]');
        const dots = Array.from(container.querySelectorAll('[data-slide-dot]'));

        function render(nextIndex) {
            const slide = slides[nextIndex];
            if (!slide) return;
            index = nextIndex;
            if (title) title.textContent = slide.title;
            if (desc) desc.textContent = slide.desc;
            if (kicker) kicker.textContent = slide.kicker;
            if (cta) {
                cta.textContent = slide.cta;
                cta.setAttribute('href', slide.href);
            }
            if (badge) badge.textContent = slide.badge;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', function () {
                render(i);
            });
        });

        render(0);
        setInterval(function () {
            render((index + 1) % slides.length);
        }, 4200);
    }

    function upgradeGameCards() {
        const cards = Array.from(document.querySelectorAll('.game-card'));
        cards.forEach(function (card, i) {
            if (card.querySelector('.phase2-badges')) return;
            const footer = card.querySelector('.game-card-footer');
            if (!footer) return;

            const badgeWrap = document.createElement('div');
            badgeWrap.className = 'phase2-badges';

            const isNew = /new/i.test(card.textContent) || i > cards.length - 6;
            const isTrending = i < 4;

            if (isNew) {
                const b = document.createElement('span');
                b.className = 'phase2-badge new';
                b.textContent = 'NEW';
                badgeWrap.appendChild(b);
            }
            if (isTrending) {
                const b = document.createElement('span');
                b.className = 'phase2-badge trend';
                b.textContent = 'TRENDING';
                badgeWrap.appendChild(b);
            }

            if (badgeWrap.children.length) {
                const info = card.querySelector('.game-info');
                if (info) info.insertBefore(badgeWrap, info.querySelector('h3'));
            }
        });
    }

    function setupRecentlyPlayed() {
        const root = document.getElementById('recentlyPlayedStrip');
        if (!root) return;
        const entries = [
            { name: 'Math Snake', time: '2h ago', href: 'games/snake.html' },
            { name: 'Street Racer', time: '5h ago', href: 'games/streetracer.html' },
            { name: 'Word Blitz', time: 'Yesterday', href: 'games/wordblitz.html' },
            { name: 'Mini Chess', time: 'Yesterday', href: 'games/chess.html' },
            { name: 'Card Match', time: '2 days ago', href: 'games/cardmatch.html' }
        ];
        root.innerHTML = entries.map(function (item) {
            return [
                '<a class="recent-pill" href="' + item.href + '">',
                '<strong>' + item.name + '</strong>',
                '<span>' + item.time + '</span>',
                '</a>'
            ].join('');
        }).join('');
    }

    setupHeroSlider();
    upgradeGameCards();
    setupRecentlyPlayed();
})();
