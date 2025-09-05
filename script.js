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

    // Photo Slideshow
    const gallery = document.getElementById('photo-gallery');
    const prevBtn = document.getElementById('photo-prev-btn');
    const nextBtn = document.getElementById('photo-next-btn');
    const images = gallery.querySelectorAll('img');
    const imageWidth = images.length > 0 ? images[0].clientWidth : 0;

    let currentIndex = 0;
    let slideshowInterval;

    const updateGallery = () => {
        gallery.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    };

    const startSlideshow = () => {
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateGallery();
        }, 7000); // 7 seconds
    };

    const resetAndStartSlideshow = () => {
        clearInterval(slideshowInterval);
        startSlideshow();
    };

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
        resetAndStartSlideshow();
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
        resetAndStartSlideshow();
    });

    if (images.length > 0) {
        // Set up the initial gallery position after images have loaded
        images[0].addEventListener('load', () => {
            updateGallery();
            startSlideshow();
        });

        // Fallback in case images are already loaded from cache
        if (images[0].complete) {
            updateGallery();
            startSlideshow();
        }
    }
    
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
    
    // Video Player
    const videoPlayer = document.getElementById('video-player');
    const videoThumbnail = document.getElementById('video-thumbnail');
    const playButton = document.getElementById('play-button');

    const videoList = [
        "5bBdJmGv-Q4",
        "dwI9oWCTTow",
        "cQ8j4ZagfIA"
        "eCdXKIkpreA"
    ];
    let currentVideoIndex = 0;

    const updateVideo = (index) => {
        const videoId = videoList[index];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        document.getElementById('thumbnail-image').src = thumbnailUrl;
        videoPlayer.src = "";
        videoThumbnail.classList.remove('hidden');
    };

    const playVideo = () => {
        const videoId = videoList[currentVideoIndex];
        const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoPlayer.src = videoSrc;
        videoThumbnail.classList.add('hidden');
    };
    
    const nextVideo = () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        updateVideo(currentVideoIndex);
    };

    const prevVideo = () => {
        currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length;
        updateVideo(currentVideoIndex);
    };

    videoThumbnail?.addEventListener('click', playVideo);

    const nextBtnVideo = document.getElementById('next-video-btn');
    const prevBtnVideo = document.getElementById('prev-video-btn');

    nextBtnVideo?.addEventListener('click', nextVideo);
    prevBtnVideo?.addEventListener('click', prevVideo);

    // Initial video load
    if (videoList.length > 0) {
        updateVideo(currentVideoIndex);
    }
});