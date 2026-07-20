(function () {
    const gameCards = Array.from(document.querySelectorAll('.game-card'));
    if (!gameCards.length) return;

    const FAVORITES_KEY = 'almagen_favorites_v1';

    function normalizeIdFromCard(card) {
        const playLink = card.querySelector('.play-now');
        return playLink ? playLink.getAttribute('href') : (card.querySelector('h3')?.textContent || '').toLowerCase();
    }

    function getFavorites() {
        try {
            const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch (_) {
            return [];
        }
    }

    function setFavorites(next) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    }

    function extractGame(card) {
        const title = card.querySelector('h3')?.textContent?.trim() || 'Untitled Game';
        const desc = card.querySelector('p')?.textContent?.trim() || 'Play instantly in your browser.';
        const href = card.querySelector('.play-now')?.getAttribute('href') || '#games';
        const icon = card.querySelector('.game-icon')?.textContent?.trim() || '🎮';
        const rating = card.querySelector('.game-rating')?.textContent?.trim() || 'Rating TBD';
        const stat = card.querySelector('.game-stat')?.textContent?.trim() || '';
        const category = card.dataset.category || 'all';
        const id = normalizeIdFromCard(card);
        return { title, desc, href, icon, rating, stat, category, id, card };
    }

    const games = gameCards.map(extractGame);

    function parsePlayCount(stat) {
        const clean = stat.toLowerCase();
        const m = clean.match(/([\d.]+)k/);
        if (m) return parseFloat(m[1]) * 1000;
        const n = clean.match(/(\d+)/);
        return n ? parseInt(n[1], 10) : 0;
    }

    function renderMiniCard(game) {
        const primaryCategory = game.category.split(' ')[0] || 'all';
        return [
            '<article class="mini-game-card">',
            '<div class="mini-card-head">',
            `<span class="mini-card-category">${primaryCategory.toUpperCase()}</span>`,
            '<button class="mini-card-fav" type="button" aria-label="Favorite placeholder" title="Favorite UI placeholder">❤</button>',
            '</div>',
            '<div class="mini-game-top">',
            `<span class="mini-game-thumb" aria-hidden="true">${game.icon}</span>`,
            `<span class="game-rating">${game.rating}</span>`,
            '</div>',
            `<h4>${game.title}</h4>`,
            `<p>${game.desc}</p>`,
            `<a class="mini-play-btn" href="${game.href}">Play Now →</a>`,
            '</article>'
        ].join('');
    }

    function renderContinueCard(game, idx) {
        const progress = [22, 48, 67, 83][idx % 4];
        return [
            '<article class="mini-game-card continue-card">',
            '<div class="mini-game-top">',
            `<span class="mini-game-thumb" aria-hidden="true">${game.icon}</span>`,
            `<span class="game-rating">${game.rating}</span>`,
            '</div>',
            `<h4>${game.title}</h4>`,
            `<p>${game.desc}</p>`,
            '<div class="continue-progress">',
            `<span>Progress ${progress}%</span>`,
            `<div class="continue-bar"><b style="width:${progress}%"></b></div>`,
            '</div>',
            `<a class="mini-play-btn" href="${game.href}">Resume</a>`,
            '</article>'
        ].join('');
    }

    function fillGrid(id, subset) {
        const grid = document.getElementById(id);
        if (!grid) return;
        if (id === 'continuePlayingGrid') {
            grid.innerHTML = subset.map(renderContinueCard).join('');
            return;
        }
        grid.innerHTML = subset.map(renderMiniCard).join('');
    }

    function buildLanes() {
        const trending = [...games].sort((a, b) => parsePlayCount(b.stat) - parsePlayCount(a.stat)).slice(0, 6);
        const newGames = games.filter((g) => /new/i.test(g.stat)).slice(0, 6);
        const recentlyAdded = [...games].slice(-6).reverse();
        const continuePlaying = games.slice(0, 4);

        fillGrid('trendingGamesGrid', trending);
        fillGrid('newGamesGrid', newGames.length ? newGames : games.slice(0, 6));
        fillGrid('recentlyAddedGrid', recentlyAdded);
        fillGrid('continuePlayingGrid', continuePlaying);
    }

    function updateFavoritesLane() {
        const favoriteIds = getFavorites();
        const favorites = games.filter((g) => favoriteIds.includes(g.id));
        fillGrid('favoritesGrid', favorites);
        const empty = document.getElementById('favoritesEmpty');
        if (empty) empty.style.display = favorites.length ? 'none' : 'block';
    }

    function addFavoriteButtons() {
        const favoriteIds = getFavorites();
        games.forEach((game) => {
            const card = game.card;
            if (card.querySelector('.game-card-fav')) return;

            const iconWrap = card.querySelector('.game-icon-wrapper');
            if (!iconWrap) return;

            const row = document.createElement('div');
            row.className = 'game-thumb-row';
            iconWrap.parentNode.insertBefore(row, iconWrap);
            row.appendChild(iconWrap);

            const fav = document.createElement('button');
            fav.type = 'button';
            fav.className = 'game-card-fav';
            fav.setAttribute('aria-label', 'Toggle favorite');
            fav.textContent = '❤';
            if (favoriteIds.includes(game.id)) fav.classList.add('active');

            fav.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                const current = getFavorites();
                const exists = current.includes(game.id);
                const next = exists ? current.filter((i) => i !== game.id) : [...current, game.id];
                setFavorites(next);
                fav.classList.toggle('active', !exists);
                updateFavoritesLane();
            });

            row.appendChild(fav);
        });
    }

    function setCollectionFilters() {
        document.querySelectorAll('.collection-pill').forEach((pill) => {
            pill.addEventListener('click', function () {
                const collection = pill.dataset.collection || 'all';
                const map = {
                    trending: 'action',
                    new: 'all',
                    multiplayer: 'board',
                    puzzle: 'puzzle',
                    racing: 'racing',
                    kids: 'math',
                    action: 'action'
                };
                const filter = map[collection] || 'all';
                const button = document.querySelector(`.filter-btn[data-filter="${filter}"]`) || document.querySelector('.filter-btn[data-filter="all"]');
                if (button) button.click();
            });
        });
    }

    function wireQuickSearch() {
        const headerSearch = document.getElementById('headerQuickSearch');
        const gameSearch = document.getElementById('gameSearch');
        if (headerSearch && gameSearch) {
            headerSearch.addEventListener('input', function () {
                gameSearch.value = headerSearch.value;
                gameSearch.dispatchEvent(new Event('input', { bubbles: true }));
            });
        }

        const quickCategory = document.getElementById('quickCategory');
        if (quickCategory) {
            quickCategory.addEventListener('change', function () {
                const value = quickCategory.value;
                const button = document.querySelector(`.filter-btn[data-filter="${value}"]`) || document.querySelector('.filter-btn[data-filter="all"]');
                if (button) button.click();
                const gamesSection = document.getElementById('games');
                if (gamesSection) gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    function setDailyChallengeCard() {
        const challenges = [
            { title: 'Word Blitz Speed Round', desc: 'Score 250+ points in 2 minutes to unlock a streak bonus badge.' },
            { title: 'Math Snake Precision Run', desc: 'Reach length 20 while keeping accuracy above 85%.' },
            { title: 'Mirror Match Logic Sprint', desc: 'Solve 5 symmetry boards in under 4 minutes.' },
            { title: 'Street Racer Clean Drive', desc: 'Complete 3 laps with zero collisions for max bonus.' }
        ];
        const daySeed = Math.floor(Date.now() / 86400000);
        const pick = challenges[daySeed % challenges.length];
        const t = document.getElementById('dailyChallengeTitle');
        const d = document.getElementById('dailyChallengeDesc');
        if (t) t.textContent = pick.title;
        if (d) d.textContent = pick.desc;
    }

    function wireDailyRewardPopup() {
        const popup = document.getElementById('dailyRewardPopup');
        const claimBtn = document.getElementById('claimRewardBtn');
        if (!popup || !claimBtn) return;

        const today = new Date().toISOString().slice(0, 10);
        const key = 'almagen_reward_claimed_date';
        const claimed = localStorage.getItem(key);

        if (claimed !== today) {
            setTimeout(function () {
                popup.classList.add('show');
                popup.setAttribute('aria-hidden', 'false');
            }, 1400);
        }

        claimBtn.addEventListener('click', function () {
            localStorage.setItem(key, today);
            popup.classList.remove('show');
            popup.setAttribute('aria-hidden', 'true');
        });
    }

    function updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumbNav');
        if (!breadcrumb) return;
        const second = breadcrumb.querySelector('li[aria-current="page"]');
        if (!second) return;

        const sectionMap = [
            { id: 'home', label: 'Home' },
            { id: 'collections', label: 'Collections' },
            { id: 'games', label: 'Games' },
            { id: 'features', label: 'Features' },
            { id: 'about', label: 'About' }
        ];

        function onScroll() {
            let current = 'Arena';
            sectionMap.forEach((item) => {
                const el = document.getElementById(item.id);
                if (el && window.scrollY >= el.offsetTop - 140) current = item.label;
            });
            second.textContent = current;
        }

        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    addFavoriteButtons();
    buildLanes();
    updateFavoritesLane();
    setCollectionFilters();
    wireQuickSearch();
    setDailyChallengeCard();
    wireDailyRewardPopup();
    updateBreadcrumb();
})();
