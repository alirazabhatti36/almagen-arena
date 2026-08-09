(function (window) {
    'use strict';

    const STORAGE_KEY = 'almagen_user_profile_v2';

    const DEFAULT_PROFILE = {
        username: 'ArenaPlayer',
        avatar: '🛡️',
        bio: 'Passionate gamer, puzzle solver, and strategy enthusiast!',
        xp: 350,
        coins: 120,
        streak: 1,
        lastLoginDate: new Date().toISOString().split('T')[0],
        totalGamesPlayed: 5,
        totalScore: 1420,
        history: [
            { game: 'Math Snake', score: 450, date: new Date().toLocaleDateString() },
            { game: 'Street Racer', score: 620, date: new Date().toLocaleDateString() },
            { game: 'Mini Chess', score: 350, date: new Date().toLocaleDateString() }
        ],
        achievements: ['first_win', 'speed_runner'],
        favorites: ['games/snake.html', 'games/streetracer.html']
    };

    function loadProfile() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                saveProfile(DEFAULT_PROFILE);
                return { ...DEFAULT_PROFILE };
            }
            const parsed = JSON.parse(raw);
            return { ...DEFAULT_PROFILE, ...parsed };
        } catch (_) {
            return { ...DEFAULT_PROFILE };
        }
    }

    function saveProfile(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            window.dispatchEvent(new CustomEvent('userprofileupdated', { detail: data }));
        } catch (e) {
            console.warn('Failed to save user profile to localStorage', e);
        }
    }

    const UserProfile = {
        get: function () {
            return loadProfile();
        },
        update: function (partial) {
            const current = loadProfile();
            const updated = { ...current, ...partial };
            saveProfile(updated);
            return updated;
        },
        calculateLevel: function (xp) {
            return Math.floor((xp || 0) / 300) + 1;
        },
        calculateLevelProgress: function (xp) {
            const currentXP = xp || 0;
            const currentLevel = Math.floor(currentXP / 300) + 1;
            const xpInCurrentLevel = currentXP % 300;
            const percent = Math.min(100, Math.floor((xpInCurrentLevel / 300) * 100));
            return { level: currentLevel, percent, currentInLevel: xpInCurrentLevel, neededInLevel: 300 };
        },
        addXP: function (amount) {
            const current = loadProfile();
            const oldLevel = this.calculateLevel(current.xp);
            const newXP = (current.xp || 0) + amount;
            const newLevel = this.calculateLevel(newXP);
            const updated = this.update({ xp: newXP });
            if (newLevel > oldLevel) {
                window.dispatchEvent(new CustomEvent('userlevelup', { detail: { level: newLevel } }));
            }
            return updated;
        },
        addCoins: function (amount) {
            const current = loadProfile();
            const newCoins = (current.coins || 0) + amount;
            return this.update({ coins: newCoins });
        },
        recordGamePlay: function (gameName, score) {
            const current = loadProfile();
            const history = Array.isArray(current.history) ? [...current.history] : [];
            history.unshift({
                game: gameName,
                score: score || 0,
                date: new Date().toLocaleDateString()
            });
            if (history.length > 20) history.pop();
            const newTotalGames = (current.totalGamesPlayed || 0) + 1;
            const newTotalScore = (current.totalScore || 0) + (score || 0);
            return this.update({
                history: history,
                totalGamesPlayed: newTotalGames,
                totalScore: newTotalScore
            });
        },
        reset: function () {
            saveProfile(DEFAULT_PROFILE);
            return { ...DEFAULT_PROFILE };
        }
    };

    window.UserProfile = UserProfile;
})(window);
