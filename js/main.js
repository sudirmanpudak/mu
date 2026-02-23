document.addEventListener('DOMContentLoaded', () => {
    const db = window.db;

    // Helper: Format Date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // 1. Startup Popup Logic
    const initPopup = () => {
        const popup = document.getElementById('startup-popup');
        const closeBtn = document.getElementById('close-popup');
        const ctaBtn = document.getElementById('popup-cta');

        if (popup) {
            // Check sessionStorage
            const hasSeenPopup = sessionStorage.getItem('popupShown');

            if (!hasSeenPopup) {
                // Show popup after 1.5 seconds on load
                setTimeout(() => {
                    popup.classList.add('show');
                    sessionStorage.setItem('popupShown', 'true');
                }, 1500);
            }

            const closePopup = () => {
                popup.classList.remove('show');
            };

            if (closeBtn) closeBtn.addEventListener('click', closePopup);
            if (ctaBtn) ctaBtn.addEventListener('click', closePopup);

            // Close on outside click
            popup.addEventListener('click', (e) => {
                if (e.target === popup) closePopup();
            });
        }
    };

    // 2. Navigation & Full Menu Logic
    const initNavigation = () => {
        const centerLogo = document.getElementById('center-logo');
        const fullMenu = document.getElementById('full-menu');
        const closeMenu = document.getElementById('close-menu');
        const navItems = document.querySelectorAll('.nav-item:not(.center-logo)');

        if (centerLogo && fullMenu) {
            centerLogo.addEventListener('click', (e) => {
                e.preventDefault();
                fullMenu.classList.toggle('active');
            });
        }

        // Close menu when clicking outside (on the backdrop) - removed specific close button logic as per request
        if (fullMenu) {
             fullMenu.addEventListener('click', (e) => {
                // If clicking directly on the modal container (backdrop effect) or outside the menu grid
                if (e.target === fullMenu) {
                    fullMenu.classList.remove('active');
                }
            });
        }

        // Highlight active nav item
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    // 3. Render Hero Slider (Home)
    const renderHero = () => {
        const heroContainer = document.getElementById('hero-section');
        if (!heroContainer || !db.banners) return;

        heroContainer.innerHTML = db.banners.map(banner => `
            <div class="hero-slide">
                <img src="${banner.image}" alt="${banner.caption}">
                <div class="hero-caption">${banner.caption}</div>
            </div>
        `).join('');
    };

    // Render Schedule (Hero Overlay)
    const renderSchedule = () => {
        const container = document.getElementById('hero-schedule');
        if (!container || !db.schedules) return;

        const nextSchedule = db.schedules[0];

        if (nextSchedule) {
            container.innerHTML = `
                <div class="card" style="margin-bottom: 0; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <div style="font-size: 0.75rem; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Kajian Berikutnya</div>
                            <h3 style="font-size: 1.1rem; margin: 0.25rem 0; color: var(--primary-color);">${nextSchedule.mosque}</h3>
                            <div style="font-size: 0.85rem; color: #555;">
                                <i class="fas fa-clock" style="color: var(--secondary-color);"></i> ${formatDate(nextSchedule.date)} • ${nextSchedule.time}
                            </div>
                        </div>
                        <div style="background: var(--primary-color); color: white; padding: 0.8rem; border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center;">
                            <i class="fas fa-calendar-check" style="font-size: 1.2rem;"></i>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    // Render Video Featured
    const renderVideoFeatured = () => {
        const container = document.getElementById('video-featured-container');
        if (!container || !db.videos) return;

        // Assume db.videos[0] is latest, [1] is previous
        const latestVideo = db.videos[0];
        const previousVideo = db.videos[1];
        const upcoming = db.upcoming_video;

        let html = '';

        // Latest Video
        if (latestVideo) {
            const videoId = latestVideo.youtubeId || '';
            const playAction = videoId ? `onclick="this.parentElement.innerHTML='<iframe width=\\'100%\\' height=\\'200\\' src=\\'https://www.youtube.com/embed/${videoId}?autoplay=1\\' frameborder=\\'0\\' allow=\\'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\' allowfullscreen></iframe>'"` : '';

            html += `
                <div class="card p-0" style="overflow: hidden; margin-bottom: 1rem;">
                    <div style="position: relative; height: 200px;">
                        <img src="${latestVideo.thumbnail}" alt="${latestVideo.title}" style="width: 100%; height: 100%; object-fit: cover;">
                        <div ${playAction} style="cursor: pointer; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 1.8rem; border: 2px solid rgba(255,255,255,0.8); z-index: 5;">
                            <i class="fas fa-play"></i>
                        </div>
                        <div style="position: absolute; top: 10px; left: 10px; background: #ef4444; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; z-index: 5;">TERBARU</div>
                    </div>
                    <div class="p-1">
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">${latestVideo.title}</h3>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="font-size: 0.8rem; color: #666;">Duration: ${latestVideo.duration}</div>
                            ${videoId ? `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" style="font-size: 0.8rem; color: #ff0000; font-weight: bold;"><i class="fab fa-youtube"></i> Tonton di YouTube</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        // Previous & Upcoming Split
        html += `<div style="display: flex; gap: 1rem;">`;

        // Previous Video (Mini)
        if (previousVideo) {
            html += `
                <div class="card p-0" style="flex: 1; margin-bottom: 0;">
                    <div style="position: relative; height: 80px;">
                         <img src="${previousVideo.thumbnail}" alt="${previousVideo.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px 16px 0 0;">
                         <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.5); width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 0.8rem;">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="p-1">
                        <div style="font-size: 0.7rem; color: #888;">Sebelumnya</div>
                        <div style="font-size: 0.8rem; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${previousVideo.title}</div>
                    </div>
                </div>
            `;
        }

        // Upcoming Title (Mini)
        if (upcoming) {
            html += `
                <div class="card p-1" style="flex: 1; margin-bottom: 0; display: flex; flex-direction: column; justify-content: center; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white;">
                    <div style="font-size: 0.7rem; opacity: 0.9; margin-bottom: 0.25rem;"><i class="fas fa-bell"></i> Akan Datang</div>
                    <div style="font-size: 0.85rem; font-weight: bold; line-height: 1.2;">${upcoming.title}</div>
                    <div style="font-size: 0.7rem; margin-top: 0.25rem; opacity: 0.8;">${upcoming.date}</div>
                </div>
            `;
        }

        html += `</div>`;

        container.innerHTML = html;
    };

    // Render News Preview (Home)
    const renderNews = () => {
        const container = document.getElementById('news-container');
        if (!container || !db.news) return;

        // Take top 2
        container.innerHTML = db.news.slice(0, 2).map(item => `
            <div class="card" style="display: flex; gap: 1rem; align-items: center;">
                <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div>
                    <div style="font-size: 0.75rem; color: #888; margin-bottom: 0.25rem;">${formatDate(item.date)}</div>
                    <h3 style="font-size: 1rem; margin-bottom: 0.25rem; line-height: 1.3;">${item.title}</h3>
                    <a href="artikel-read.html" style="font-size: 0.8rem; color: var(--secondary-color);">Baca selengkapnya</a>
                </div>
            </div>
        `).join('');
    };

    // Render Gallery Carousel (Home - Weekly Gallery)
    const renderGalleryCarousel = () => {
        const container = document.getElementById('gallery-carousel-container');
        if (!container || !db.weekly_gallery) return;

        container.innerHTML = db.weekly_gallery.map(item => `
            <div style="flex: 0 0 80%; max-width: 250px; scroll-snap-align: start;">
                <div class="card p-0" style="overflow: hidden; height: 100%;">
                    <img src="${item.image}" alt="${item.caption}" style="width: 100%; height: 150px; object-fit: cover;">
                    <div class="p-1">
                        <div style="font-size: 0.9rem; font-weight: bold; color: var(--primary-color);">${item.caption}</div>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Render Books (Karya Tulis)
    const renderBooks = () => {
        const container = document.getElementById('books-container');
        if (!container || !db.books) return;

        container.innerHTML = db.books.map(book => `
            <div style="flex: 0 0 120px; scroll-snap-align: start;">
                 <div class="card p-0" style="overflow: hidden; height: 100%; text-align: center;">
                    <img src="${book.cover}" alt="${book.title}" style="width: 100%; height: 160px; object-fit: cover;">
                    <div class="p-1">
                        <div style="font-size: 0.85rem; font-weight: bold; line-height: 1.2; margin-bottom: 0.25rem;">${book.title}</div>
                        <a href="${book.link}" style="font-size: 0.75rem; color: var(--secondary-color);">Lihat Detail</a>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // 5. Render Quote (Home)
    const renderQuote = () => {
        const container = document.getElementById('quote-container');
        if (!container || !db.quotes) return;

        const randomQuote = db.quotes[Math.floor(Math.random() * db.quotes.length)];

        container.innerHTML = `
            <i class="fas fa-quote-left" style="font-size: 1.5rem; opacity: 0.5; margin-bottom: 1rem;"></i>
            <p style="font-size: 1.1rem; font-style: italic; margin-bottom: 1rem;">"${randomQuote.text}"</p>
            <div style="font-size: 0.9rem; font-weight: bold;">- ${randomQuote.source}</div>
        `;
    };

    // 6. Render All Schedules (Jadwal Page)
    const renderAllSchedules = () => {
        const container = document.getElementById('all-schedules-container');
        if (!container || !db.schedules) return;

        container.innerHTML = db.schedules.map(schedule => `
            <div class="card" style="border-left: 4px solid var(--primary-color);">
                <div style="display: flex; align-items: flex-start;">
                    <div style="background: var(--primary-color); color: white; padding: 0.5rem; border-radius: 8px; text-align: center; margin-right: 1rem; min-width: 60px;">
                        <div style="font-size: 1.2rem; font-weight: bold;">${new Date(schedule.date).getDate()}</div>
                        <div style="font-size: 0.7rem;">${new Date(schedule.date).toLocaleString('id-ID', { month: 'short' }).toUpperCase()}</div>
                    </div>
                    <div style="flex: 1;">
                        <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">${schedule.mosque}</h3>
                        <div style="font-size: 0.85rem; color: #555; margin-bottom: 0.25rem;">
                            <i class="fas fa-map-marker-alt" style="color: var(--secondary-color);"></i> ${schedule.city}
                        </div>
                        <div style="font-size: 0.85rem; color: #555;">
                            <i class="fas fa-clock" style="color: var(--secondary-color);"></i> ${schedule.time}
                        </div>
                    </div>
                </div>
                <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #eee;">
                    <p style="font-size: 0.85rem; color: #666;">${schedule.address}</p>
                    <a href="https://maps.google.com/?q=${encodeURIComponent(schedule.address)}" target="_blank" class="btn mt-1" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">Buka Maps</a>
                </div>
            </div>
        `).join('');
    };

    // 7. Render All Articles (Artikel Page)
    const renderAllArticles = () => {
        const container = document.getElementById('all-articles-container');
        if (!container || !db.articles) return;

        container.innerHTML = db.articles.map(article => `
             <div class="card">
                <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">${formatDate(article.date)}</div>
                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">${article.title}</h3>
                <p style="font-size: 0.9rem; color: #444; margin-bottom: 0.5rem;">${article.content.substring(0, 100)}...</p>
                <a href="artikel-read.html" style="color: var(--primary-color); font-weight: bold;">Baca Selengkapnya</a>
            </div>
        `).join('');
    };

    // 8. Render All Quotes (Nasehat Page)
    const renderAllQuotes = () => {
        const container = document.getElementById('all-quotes-container');
        if (!container || !db.quotes) return;

        container.innerHTML = db.quotes.map(quote => `
            <div class="card text-center" style="background: rgba(236, 253, 245, 0.8); border: 1px solid var(--primary-color);">
                <i class="fas fa-quote-left" style="font-size: 1.2rem; color: var(--primary-color); opacity: 0.5; margin-bottom: 0.5rem;"></i>
                <p style="font-size: 1rem; font-style: italic; margin-bottom: 0.5rem; color: #333;">"${quote.text}"</p>
                <div style="font-size: 0.85rem; font-weight: bold; color: var(--primary-color);">- ${quote.source}</div>
            </div>
        `).join('');
    };

    // 9. Render All Gallery (Galeri Page)
    const renderAllGallery = () => {
        const container = document.getElementById('all-gallery-container');
        if (!container || !db.gallery) return;

        container.innerHTML = db.gallery.map(item => `
            <div class="card p-0" style="overflow: hidden;">
                <img src="${item.image}" alt="${item.caption}" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="p-1 text-center" style="font-size: 0.9rem; font-weight: bold;">${item.caption}</div>
            </div>
        `).join('');
    };

    // 10. Render All Videos (Video Page)
    const renderAllVideos = () => {
        const container = document.getElementById('all-videos-container');
        if (!container || !db.videos) return;

        container.innerHTML = db.videos.map(video => `
            <div class="card p-0" style="overflow: hidden;">
                <div style="position: relative;">
                    <img src="${video.thumbnail}" alt="${video.title}" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 1.5rem;">
                        <i class="fas fa-play"></i>
                    </div>
                    <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem;">${video.duration}</div>
                </div>
                <div class="p-1">
                    <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">${video.title}</h3>
                </div>
            </div>
        `).join('');
    };

    // 11. Render Footer
    const renderFooter = () => {
        const footerPlaceholder = document.getElementById('main-footer');
        if (!footerPlaceholder) return;

        footerPlaceholder.innerHTML = `
            <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 0.5rem;">Manompo Usman</div>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-telegram-plane"></i></a>
            </div>
            <div style="margin-bottom: 1rem;">
                <a href="index.html" style="margin: 0 5px;">Home</a> |
                <a href="jadwal.html" style="margin: 0 5px;">Jadwal</a> |
                <a href="contact.html" style="margin: 0 5px;">Kontak</a>
            </div>
            <div style="font-size: 0.75rem; color: #555;">
                &copy; 2023 Manompo Usman Official.<br>
                All Rights Reserved.
            </div>
        `;
    };

    // Init Logic
    initPopup();
    initNavigation();

    // Execute Render Functions based on page content
    renderHero();

    // Auto-scroll Hero Slider
    const heroSlider = document.getElementById('hero-section');
    if (heroSlider && db.banners && db.banners.length > 1) {
        const scrollStep = () => {
            const firstSlide = heroSlider.querySelector('.hero-slide');
            if (!firstSlide) return;

            const slideWidth = firstSlide.offsetWidth + 16; // 16 is gap (1rem)
            const maxScroll = heroSlider.scrollWidth - heroSlider.clientWidth;
            const currentScroll = heroSlider.scrollLeft;

            if (currentScroll + slideWidth >= maxScroll - 10) { // -10 tolerance
                heroSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                heroSlider.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        };
        setInterval(scrollStep, 4000); // 4 seconds for better readability
    }

    renderSchedule();
    renderVideoFeatured();
    renderNews();
    renderGalleryCarousel();
    renderBooks();
    renderQuote();

    // Page specific
    renderAllSchedules();
    renderAllArticles();
    renderAllQuotes();
    renderAllGallery();
    renderAllVideos();

    // Render Footer
    renderFooter();

    // Cinematic Scroll Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .hero-slider, #hero-schedule, .card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});
