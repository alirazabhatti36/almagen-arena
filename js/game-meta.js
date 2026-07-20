(function () {
    if (!/\/games\//.test(window.location.pathname)) return;

    const slug = window.location.pathname.split('/').pop().replace('.html', '');

    const catalog = {
        snake: {
            controls: 'Arrow keys / swipe controls to move. Solve math prompts to grow safely.',
            tags: ['Math', 'Arcade', 'Kids'],
            related: ['mathdefense', 'shooter', 'puzzle'],
            developer: 'AlMaGen Learning Lab'
        },
        blockbreaker: {
            controls: 'Arrow keys or A/D to move paddle. Mobile: on-screen controls.',
            tags: ['Arcade', 'Physics', 'Action'],
            related: ['streetracer', 'runner', 'colorswitch'],
            developer: 'Velocity Forge'
        },
        cardmatch: {
            controls: 'Tap/click to flip cards. Match identical value and suit pairs.',
            tags: ['Puzzle', 'Memory', 'Kids'],
            related: ['memory', 'puzzle', 'wordblitz'],
            developer: 'MindGrid Studio'
        },
        chess: {
            controls: 'Click piece then target tile to move. Capture all enemy pieces.',
            tags: ['Board', 'Strategy', 'Puzzle'],
            related: ['ludo', 'puzzle', 'memory'],
            developer: 'MindGrid Studio'
        },
        ludo: {
            controls: 'Roll dice and move tokens using click/tap actions.',
            tags: ['Board', 'Family', 'Casual'],
            related: ['chess', 'cardmatch', 'memory'],
            developer: 'FamilyPlay Works'
        },
        default: {
            controls: 'Use keyboard or touch controls shown in the game UI.',
            tags: ['Browser Game', 'Free', 'Instant Play'],
            related: ['snake', 'streetracer', 'puzzle'],
            developer: 'AlMaGen Originals'
        }
    };

    const game = catalog[slug] || catalog.default;
    const title = document.querySelector('h1')?.textContent?.trim() || document.title.split('|')[0].trim();
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || 'Play this free browser game instantly on AlMaGen-Arena.';

    const relatedMap = {
        snake: { name: 'Math Snake', href: 'snake.html' },
        mathdefense: { name: 'Math Defense', href: 'mathdefense.html' },
        shooter: { name: 'Number Blaster', href: 'shooter.html' },
        puzzle: { name: 'Mirror Match', href: 'puzzle.html' },
        memory: { name: 'Memory Master', href: 'memory.html' },
        wordblitz: { name: 'Word Blitz', href: 'wordblitz.html' },
        streetracer: { name: 'Street Racer', href: 'streetracer.html' },
        runner: { name: 'Life Runner', href: 'runner.html' },
        colorswitch: { name: 'Color Switch', href: 'colorswitch.html' },
        ludo: { name: 'Ludo Dice', href: 'ludo.html' },
        chess: { name: 'Mini Chess', href: 'chess.html' },
        cardmatch: { name: 'Card Match', href: 'cardmatch.html' }
    };

    const wrapper = document.createElement('section');
    wrapper.className = 'game-meta-panel';
    wrapper.innerHTML = [
        '<nav class="game-breadcrumbs" aria-label="Breadcrumb">',
        '<a href="../index.html">Home</a>',
        '<span>/</span>',
        '<a href="../index.html#games">Games</a>',
        '<span>/</span>',
        '<strong>' + title + '</strong>',
        '</nav>',
        '<div class="game-banner">',
        '<div>',
        '<p class="banner-kicker">Featured Challenge</p>',
        '<h2>' + title + ' Elite Mode</h2>',
        '<p>' + description + '</p>',
        '<div class="banner-actions">',
        '<button type="button">Favorite</button>',
        '<button type="button">Share</button>',
        '<a href="mailto:info@almagen-arena.com?subject=' + encodeURIComponent('Report: ' + title) + '">Report</a>',
        '</div>',
        '</div>',
        '<div class="banner-stats">',
        '<span>Players Today <strong>2,340</strong></span>',
        '<span>Games Played <strong>18,920</strong></span>',
        '<span>Avg Rating <strong>4.7</strong></span>',
        '<span>Completion <strong>72%</strong></span>',
        '</div>',
        '</div>',
        '<div class="game-meta-grid">',
        '<article class="game-meta-block"><h2>Game Description</h2><p>' + description + '</p></article>',
        '<article class="game-meta-block"><h2>Controls</h2><p>' + game.controls + '</p></article>',
        '<article class="game-meta-block"><h2>Screenshots</h2><div class="screenshot-strip"><span>Gameplay View</span><span>Challenge Moment</span><span>Score Screen</span></div></article>',
        '<article class="game-meta-block"><h2>Tags</h2><div class="tag-strip">' + game.tags.map(function (tag) { return '<span>' + tag + '</span>'; }).join('') + '</div></article>',
        '<article class="game-meta-block"><h2>Developer Profile</h2><div class="dev-profile"><div class="dev-logo">DEV</div><div><strong>' + game.developer + '</strong><p>Published: ' + game.related.length + ' games</p></div></div></article>',
        '<article class="game-meta-block"><h2>Ratings & Reviews</h2><div class="rating-bars"><p><span>5★</span><b style="width:72%"></b></p><p><span>4★</span><b style="width:18%"></b></p><p><span>3★</span><b style="width:7%"></b></p><p><span>2★</span><b style="width:2%"></b></p><p><span>1★</span><b style="width:1%"></b></p></div><div class="review-item"><strong>AliRacer</strong><p>Smooth controls and fast restart loop.</p></div></article>',
        '<article class="game-meta-block"><h2>Comments</h2><div class="comment-ui"><div class="comment-row"><strong>PlayerOne</strong><p>Need more levels soon.</p><div class="comment-actions"><button type="button">Like</button><button type="button">Reply</button><button type="button">Report</button></div></div></div></article>',
        '</div>',
        '<div class="recommend-wrap">',
        '<h3>Related & Similar Games</h3>',
        '<div class="recommend-scroller">',
        game.related.map(function (key) {
            const item = relatedMap[key];
            if (!item) return '';
            return '<a href="' + item.href + '"><strong>' + item.name + '</strong><span>Play now</span></a>';
        }).join(''),
        '</div>',
        '</div>'
    ].join('');

    document.body.appendChild(wrapper);

    const style = document.createElement('style');
    style.textContent = [
        '.game-meta-panel{max-width:1020px;margin:18px auto 36px;padding:0 16px;font-family:\'Poppins\',sans-serif;}',
        '.game-breadcrumbs{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:.83rem;color:rgba(255,255,255,.6);margin-bottom:12px;}',
        '.game-breadcrumbs a{color:#a29bfe;text-decoration:none;}',
        '.game-banner{display:grid;grid-template-columns:1.2fr .8fr;gap:12px;padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:linear-gradient(135deg,rgba(108,92,231,.2),rgba(0,212,255,.09));margin-bottom:12px;}',
        '.banner-kicker{font-size:.74rem;text-transform:uppercase;color:rgba(255,255,255,.72);}',
        '.game-banner h2{font-size:1.3rem;margin:4px 0 6px;}',
        '.game-banner p{font-size:.88rem;color:rgba(255,255,255,.85);}',
        '.banner-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}',
        '.banner-actions button,.banner-actions a{border:0;text-decoration:none;color:#fff;padding:7px 10px;border-radius:8px;background:rgba(255,255,255,.15);font-size:.78rem;cursor:pointer;}',
        '.banner-stats{display:grid;gap:6px;}',
        '.banner-stats span{display:flex;justify-content:space-between;border:1px solid rgba(255,255,255,.16);border-radius:8px;padding:8px;font-size:.78rem;}',
        '.game-meta-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;}',
        '.game-meta-block{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);border-radius:14px;padding:14px;}',
        '.game-meta-block h2{font-size:1rem;margin-bottom:6px;color:#ffd93d;}',
        '.game-meta-block p{font-size:.88rem;line-height:1.55;color:rgba(255,255,255,.82);}',
        '.screenshot-strip{display:grid;grid-template-columns:1fr;gap:8px;}',
        '.screenshot-strip span{display:block;padding:10px;border-radius:10px;border:1px dashed rgba(255,255,255,.18);font-size:.8rem;color:rgba(255,255,255,.74);text-align:center;}',
        '.tag-strip{display:flex;gap:8px;flex-wrap:wrap;}',
        '.tag-strip span{font-size:.74rem;padding:6px 10px;border-radius:999px;background:rgba(108,92,231,.16);border:1px solid rgba(162,155,254,.4);}',
        '.dev-profile{display:flex;gap:10px;align-items:center;}',
        '.dev-logo{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#6c5ce7;font-weight:700;}',
        '.rating-bars p{display:grid;grid-template-columns:36px 1fr;align-items:center;gap:8px;margin-bottom:6px;}',
        '.rating-bars b{display:block;height:8px;border-radius:99px;background:linear-gradient(135deg,#ffd93d,#ff6b6b);}',
        '.review-item{margin-top:8px;padding:8px;border:1px solid rgba(255,255,255,.12);border-radius:8px;}',
        '.comment-row{padding:8px;border:1px solid rgba(255,255,255,.12);border-radius:8px;}',
        '.comment-actions{display:flex;gap:8px;margin-top:8px;}',
        '.comment-actions button{border:1px solid rgba(255,255,255,.18);background:transparent;color:#fff;border-radius:999px;padding:4px 9px;font-size:.72rem;}',
        '.recommend-wrap{margin-top:12px;border:1px solid rgba(255,255,255,.1);padding:12px;border-radius:12px;background:rgba(255,255,255,.03);}',
        '.recommend-wrap h3{margin-bottom:8px;font-size:1rem;}',
        '.recommend-scroller{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;}',
        '.recommend-scroller a{text-decoration:none;min-width:170px;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.04);color:#fff;display:flex;flex-direction:column;gap:4px;}',
        '.recommend-scroller a span{font-size:.74rem;color:rgba(255,255,255,.62);}',
        '@media (max-width:768px){.game-meta-panel{padding:0 12px;}.game-banner{grid-template-columns:1fr;}}'
    ].join('');
    document.head.appendChild(style);

    const old = document.querySelector('script[data-breadcrumb-jsonld="true"]');
    if (old) old.remove();
    const breadcrumbJsonLd = document.createElement('script');
    breadcrumbJsonLd.type = 'application/ld+json';
    breadcrumbJsonLd.dataset.breadcrumbJsonld = 'true';
    breadcrumbJsonLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://almagen-arena.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://almagen-arena.com/#games' },
                    { '@type': 'ListItem', position: 3, name: title, item: window.location.href }
                ]
            },
            {
                '@type': 'VideoGame',
                name: title,
                description: description,
                publisher: { '@type': 'Organization', name: 'AlMaGen-Arena' }
            }
        ]
    });
    document.head.appendChild(breadcrumbJsonLd);
})();
