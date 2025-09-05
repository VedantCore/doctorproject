document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
        lightIcon?.classList.add('hidden');
        darkIcon?.classList.remove('hidden');
    }

    const toggleTheme = () => {
        const isDark = htmlElement.classList.contains('dark');
        if (isDark) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            lightIcon?.classList.remove('hidden');
            darkIcon?.classList.add('hidden');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            lightIcon?.classList.add('hidden');
            darkIcon?.classList.remove('hidden');
        }
    };

    themeToggle?.addEventListener('click', toggleTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                htmlElement.classList.add('dark');
                lightIcon?.classList.add('hidden');
                darkIcon?.classList.remove('hidden');
            } else {
                htmlElement.classList.remove('dark');
                lightIcon?.classList.remove('hidden');
                darkIcon?.classList.add('hidden');
            }
        }
    });

    const modal = document.getElementById('appointment-modal');
    const modalContent = document.getElementById('modal-content');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const openModal = () => {
        if (!modal || !modalContent) return;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    };

    const closeModal = () => {
        if (!modal || !modalContent) return;
        modalContent.classList.add('scale-95', 'opacity-0');
        modalContent.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn?.addEventListener('click', closeModal);

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open-icon');
    const closeIcon = document.getElementById('menu-close-icon');

    mobileMenuBtn?.addEventListener('click', () => {
        if (!mobileMenu || !openIcon || !closeIcon) return;
        const isMenuOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        openIcon.classList.toggle('hidden', !isMenuOpen);
        closeIcon.classList.toggle('hidden', isMenuOpen);
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.add('hidden');
            openIcon?.classList.remove('hidden');
            closeIcon?.classList.add('hidden');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- YouTube Video Modal Logic ---
    const youtubeModal = document.getElementById('youtube-modal');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const openYoutubeModalBtn = document.getElementById('open-youtube-modal-btn');
    const closeYoutubeModalBtn = document.getElementById('close-youtube-modal-btn');

    openYoutubeModalBtn?.addEventListener('click', () => {
        if (!youtubeModal || !youtubeIframe) return;

        const videoId = openYoutubeModalBtn.getAttribute('data-video-id');
        const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        youtubeIframe.src = videoSrc;
        
        youtubeModal.classList.remove('hidden', 'opacity-0');
        youtubeModal.classList.add('flex', 'opacity-100');
    });

    const closeYoutubeModal = () => {
        if (!youtubeModal || !youtubeIframe) return;
        
        youtubeIframe.src = ""; // Stop the video from playing
        
        youtubeModal.classList.remove('flex', 'opacity-100');
        youtubeModal.classList.add('hidden', 'opacity-0');
    };

    closeYoutubeModalBtn?.addEventListener('click', closeYoutubeModal);

    youtubeModal?.addEventListener('click', (e) => {
        if (e.target === youtubeModal) {
            closeYoutubeModal();
        }
    });

});