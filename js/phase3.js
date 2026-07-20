(function () {
    const isHome = /\/index\.html$/.test(window.location.pathname) || /\/$/.test(window.location.pathname);
    if (!isHome) return;

    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('newsletterEmail');
            if (!email || !email.value.trim()) return;
            localStorage.setItem('almagen_newsletter_email', email.value.trim());
            newsletterSuccess.hidden = false;
            showToast('Newsletter subscription saved');
            newsletterForm.reset();
        });
    }

    const popup = document.getElementById('comingSoonPopup');
    const closePopup = document.getElementById('closeComingSoonPopup');
    if (popup && closePopup) {
        const seen = localStorage.getItem('almagen_phase3_popup_seen');
        if (!seen) {
            setTimeout(function () {
                popup.classList.add('show');
                popup.setAttribute('aria-hidden', 'false');
            }, 1800);
        }
        closePopup.addEventListener('click', function () {
            localStorage.setItem('almagen_phase3_popup_seen', 'yes');
            popup.classList.remove('show');
            popup.setAttribute('aria-hidden', 'true');
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'phase3-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(function () {
            toast.classList.add('show');
        });
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () {
                toast.remove();
            }, 260);
        }, 2000);
    }
})();
