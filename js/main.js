document.addEventListener('DOMContentLoaded', () => {
    // --- UI Logic ---
    const startupPopup = document.getElementById('startup-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const popupCtaBtn = document.getElementById('popup-cta');
    const centerLogo = document.querySelector('.center-logo');
    const fullMenu = document.querySelector('.full-menu-modal');
    const closeMenuBtn = document.querySelector('.close-menu');

    // Startup Popup
    if (startupPopup) {
        setTimeout(() => {
            startupPopup.classList.add('show');
        }, 1000);

        const closePopup = () => {
            startupPopup.classList.remove('show');
        };

        if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
        if (popupCtaBtn) popupCtaBtn.addEventListener('click', closePopup);

        startupPopup.addEventListener('click', (e) => {
            if (e.target === startupPopup) closePopup();
        });
    }

    // Full Menu
    if (centerLogo && fullMenu) {
        centerLogo.addEventListener('click', (e) => {
            e.preventDefault();
            fullMenu.classList.add('active');
        });

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                fullMenu.classList.remove('active');
            });
        }

        const menuLinks = fullMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                fullMenu.classList.remove('active');
            });
        });
    }

    // --- Content Logic ---

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // 1. Render Hero Slider (Home)
    const renderHero = () => {
        const heroContainer = document.getElementById('hero-section');
        if (!heroContainer || !db.banners) return;

        heroContainer.innerHTML = db.banners.map(banner => `
            <div class="hero-slide">
                <img src="${banner.image}" alt="${banner.title}">
                <div class="hero-caption">${banner.title}</div>
            </div>
        `).join('');
    };

    // 2. Render Weekly Illustration (Home)
    const renderWeekly = () => {
        const container = document.getElementById('weekly-illustration-container');
        if (!container || !db.weeklyIllustration) return;

        const { image, caption } = db.weeklyIllustration;
        container.innerHTML = `
            <div class="card p-0" style="overflow: hidden;">
                <img src="${image}" alt="Weekly Illustration" style="width: 100%; height: auto;">
                <div class="p-1 text-center font-italic">"${caption}"</div>
            </div>
        `;
    };

    // 3. Render News Preview (Home)
    const renderNews = () => {
        const container = document.getElementById('news-container');
        if (!container || !db.news) return;

        const newsItems = db.news.slice(0, 3);
        container.innerHTML = newsItems.map(item => `
            <div class="card">
                <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">${formatDate(item.date)}</div>
                <h3 style="font-size: 1rem; margin-bottom: 0.5rem;">${item.title}</h3>
                <p style="font-size: 0.9rem; color: #444; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.summary}</p>
                <a href="artikel.html?id=${item.id}" style="color: var(--primary-color); font-size: 0.85rem; display: block; margin-top: 0.5rem;">Baca Selengkapnya &rarr;</a>
            </div>
        `).join('');
    };

    // 4. Render Upcoming Schedule (Home)
    const renderSchedule = () => {
        const container = document.getElementById('schedule-preview');
        if (!container || !db.schedules) return;

        const nextSchedule = db.schedules[0];

        if (nextSchedule) {
            container.innerHTML = `
                <div class="card" style="border-left: 4px solid var(--primary-color);">
                    <div style="display: flex; align-items: flex-start;">
                        <div style="background: var(--primary-color); color: white; padding: 0.5rem; border-radius: 8px; text-align: center; margin-right: 1rem; min-width: 60px;">
                            <div style="font-size: 1.2rem; font-weight: bold;">${new Date(nextSchedule.date).getDate()}</div>
                            <div style="font-size: 0.7rem;">${new Date(nextSchedule.date).toLocaleString('id-ID', { month: 'short' }).toUpperCase()}</div>
                        </div>
                        <div>
                            <h3 style="font-size: 1rem; margin-bottom: 0.25rem;">${nextSchedule.mosque}</h3>
                            <div style="font-size: 0.85rem; color: #555; margin-bottom: 0.25rem;">
                                <i class="fas fa-map-marker-alt" style="color: var(--secondary-color);"></i> ${nextSchedule.city}
                            </div>
                            <div style="font-size: 0.85rem; color: #555;">
                                <i class="fas fa-clock" style="color: var(--secondary-color);"></i> ${nextSchedule.time}
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #eee;">
                        <p style="font-size: 0.85rem; color: #666;">${nextSchedule.address}</p>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = '<p class="text-center">Belum ada jadwal kajian.</p>';
        }
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

    // Render Bio Snippet (Home)
    const renderBioSnippet = () => {
        const container = document.getElementById('bio-snippet');
        if (!container || !db.biography) return;

        const { summary, image } = db.biography;
        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${image}" alt="Ustad Usman" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-color);">
                <div>
                    <h2 class="section-title" style="margin-bottom: 0.5rem; font-size: 1.1rem;">Tentang Ustad</h2>
                    <p style="font-size: 0.9rem; color: #444; margin-bottom: 0.5rem;">${summary.substring(0, 60)}...</p>
                    <a href="biografi.html" style="color: var(--primary-color); font-size: 0.85rem; font-weight: bold;">Selengkapnya &rarr;</a>
                </div>
            </div>
        `;
    };

    // Render Gallery Preview (Home)
    const renderGalleryPreview = () => {
        const container = document.getElementById('gallery-preview');
        if (!container || !db.gallery) return;

        const images = db.gallery.slice(0, 3).map(item => `
            <div style="flex: 0 0 140px; margin-right: 0.5rem;">
                <img src="${item.image}" alt="${item.caption}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;">
            </div>
        `).join('');

        container.innerHTML = `
            <div style="display: flex; overflow-x: auto; padding-bottom: 0.5rem;">
                ${images}
            </div>
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
        if (!container || !db.articles) return; // Note: 'db.articles' used here, assuming it's same as 'news' or separate?
        // In data.js I have 'news' and 'articles'. I should use 'articles' if it exists, or fallback to 'news'.
        // Let's check data.js again. It has 'news' and 'articles'.

        container.innerHTML = db.articles.map(article => `
             <div class="card">
                <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">${formatDate(article.date)}</div>
                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem;">${article.title}</h3>
                <p style="font-size: 0.9rem; color: #444; margin-bottom: 0.5rem;">${article.content.substring(0, 100)}...</p>
                <a href="#" style="color: var(--primary-color); font-weight: bold;">Baca Selengkapnya</a>
            </div>
        `).join('');
    };

    // 8. Render All Quotes (Nasehat Page)
    const renderAllQuotes = () => {
        const container = document.getElementById('all-quotes-container');
        if (!container || !db.quotes) return;

        container.innerHTML = db.quotes.map(quote => `
            <div class="card text-center" style="background: #e8f5e9; border: 1px solid var(--primary-color);">
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
                <img src="${item.image}" alt="${item.caption}" style="width: 100%; height: 120px; object-fit: cover;">
                <div class="p-1 text-center" style="font-size: 0.8rem;">${item.caption}</div>
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

    renderWeekly();
    renderBioSnippet();
    renderGalleryPreview();
    renderNews();
    renderSchedule();
    renderQuote();

    // Page specific
    renderAllSchedules();
    renderAllArticles();
    renderAllQuotes();
    renderAllGallery();
    renderAllVideos();
});
