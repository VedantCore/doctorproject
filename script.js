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

    const appointmentModal = document.getElementById('appointment-modal');
    const appointmentModalContent = document.getElementById('modal-content');
    const openAppointmentModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeAppointmentModalBtn = document.getElementById('close-modal-btn');

    const openAppointmentModal = () => {
        if (!appointmentModal || !appointmentModalContent) return;
        appointmentModal.classList.remove('hidden');
        setTimeout(() => {
            appointmentModalContent.classList.remove('scale-95', 'opacity-0');
            appointmentModalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    };

    const closeAppointmentModal = () => {
        if (!appointmentModal || !appointmentModalContent) return;
        appointmentModalContent.classList.add('scale-95', 'opacity-0');
        appointmentModalContent.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
            appointmentModal.classList.add('hidden');
        }, 300);
    };

    openAppointmentModalBtns.forEach(btn => btn.addEventListener('click', openAppointmentModal));
    closeAppointmentModalBtn?.addEventListener('click', closeAppointmentModal);

    appointmentModal?.addEventListener('click', (e) => {
        if (e.target === appointmentModal) {
            closeAppointmentModal();
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

    // --- YouTube Modal Logic ---
    const youtubeModal = document.getElementById('youtube-modal');
    const youtubeIframe = document.getElementById('youtube-iframe');
    const openYoutubeModalBtn = document.getElementById('open-youtube-modal-btn');
    const closeYoutubeModalBtn = document.getElementById('close-youtube-modal-btn');
    const youtubePrevBtn = document.getElementById('youtube-prev-btn');
    const youtubeNextBtn = document.getElementById('youtube-next-btn');

    // Add video IDs here for your channel in newest to oldest order
    const videoList = [
        "X_0XwhaeENA",
        "5bBdJmGv-Q4",
        "dwI9oWCTTow",
        "mpT5qu2ZnJg"
    ];

    let currentVideoIndex = 0;

    const loadVideo = (index) => {
        const videoId = videoList[index];
        const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        youtubeIframe.src = videoSrc;
    };

    openYoutubeModalBtn?.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (!youtubeModal) return;

        // Reset to the first video in the list
        currentVideoIndex = 0;
        loadVideo(currentVideoIndex);

        youtubeModal.classList.remove('hidden');
        youtubeModal.classList.add('flex');
    });

    const closeYoutubeModal = () => {
        if (!youtubeModal || !youtubeIframe) return;

        // Stop the video from playing when the modal is closed
        youtubeIframe.src = "";
        
        youtubeModal.classList.remove('flex');
        youtubeModal.classList.add('hidden');
    };

    closeYoutubeModalBtn?.addEventListener('click', closeYoutubeModal);

    youtubeModal?.addEventListener('click', (e) => {
        if (e.target === youtubeModal) {
            closeYoutubeModal();
        }
    });

    youtubePrevBtn?.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
        loadVideo(currentVideoIndex);
    });

    youtubeNextBtn?.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        loadVideo(currentVideoIndex);
    });

    // --- Photo Slideshow Logic ---
    const photoGallery = document.getElementById('photo-gallery');
    const photoPrevBtn = document.getElementById('photo-prev-btn');
    const photoNextBtn = document.getElementById('photo-next-btn');

    let currentPhotoIndex = 0;
    const photos = photoGallery?.querySelectorAll('img');
    const totalPhotos = photos?.length;

    if (totalPhotos > 0) {
        photoNextBtn?.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
            updatePhotoGallery();
        });

        photoPrevBtn?.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
            updatePhotoGallery();
        });

        const updatePhotoGallery = () => {
            if (!photoGallery) return;
            const offset = -currentPhotoIndex * 100;
            photoGallery.style.transform = `translateX(${offset}%)`;
        };
    }
});