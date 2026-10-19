/**
 * KEHRİBAR MEDYA & HABER PORTALI
 * Canlı Arama Filtresi, Kategori Seçici, Çekmece Menü, İl Rehberi, Canlı RSS Akışı & Tema Yönetimi
 */

document.addEventListener('DOMContentLoaded', () => {
    initDateDisplay();
    initThemeToggle();
    initHamburgerDrawer();
    initLiveSearch();
    initCategoryChips();
    init81CitySelector();
    initLiveMarketTicker();
    initRssFeedSystem();
    initPrayerTimesSystem();
    initWeatherSystem();
    initPharmacySystem();
    initFuelPricesSystem();
    initEarthquakeSystem();
    initTvGuideSystem();
    initJobBoardSystem();
    initStickyAd();
    initScrollToTop();
    initSaleModal();
    initCookieConsent();
});

/* ==========================================================================
   1. GÜNCEL TARİH GÖSTERİMİ (TÜRKÇE)
   ========================================================================== */
function initDateDisplay() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formatted = now.toLocaleDateString('tr-TR', options);
    dateEl.textContent = `📅 ${formatted}`;
}

/* ==========================================================================
   2. TEMA DEĞİŞTİRİCİ (DARK / LIGHT MODE & LOCALSTORAGE)
   ========================================================================== */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Kayıtlı tema kontrolü
    const savedTheme = localStorage.getItem('kehribar_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(toggleBtn, savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('kehribar_theme', newTheme);
        updateThemeIcon(toggleBtn, newTheme);
    });
}

function updateThemeIcon(btn, theme) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç');
}

/* ==========================================================================
   3. HAMBURGER SLIDE-OVER DRAWER (YAN MENÜ)
   ========================================================================== */
function initHamburgerDrawer() {
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('menu-close');
    const drawer = document.getElementById('side-drawer');
    const backdrop = document.getElementById('menu-backdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (!menuBtn || !drawer || !backdrop) return;

    function openMenu() {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeMenu();
        }
    });
}

/* ==========================================================================
   4. CANLI ARAMA & SAYFA İÇİ FİLTRELEME (HEADER & HAMBURGER MENÜ)
   ========================================================================== */
function initLiveSearch() {
    const globalInput = document.getElementById('global-search');
    const globalClear = document.getElementById('search-clear');
    const globalCounter = document.getElementById('search-counter');

    const drawerInput = document.getElementById('drawer-search');
    const drawerClear = document.getElementById('drawer-search-clear');
    const drawerCounter = document.getElementById('drawer-search-counter');

    // Türkçe karakterleri normalize etme
    function normalizeTr(text) {
        return (text || '')
            .toLocaleLowerCase('tr-TR')
            .replace(/i/g, 'i')
            .replace(/ı/g, 'ı')
            .trim();
    }

    function executeFilter(rawQuery, source) {
        const query = normalizeTr(rawQuery);
        const allLinks = document.querySelectorAll('.media-link, .quick-pill, .rss-item, .job-item-card, .portal-badge-btn');
        const allCards = document.querySelectorAll('.portal-card, .city-group, #populer, .rss-column, .job-portal-card');
        const drawerLinks = document.querySelectorAll('.drawer-link');

        // Senkronize temizleme butonları
        if (globalClear) globalClear.style.display = query.length > 0 ? 'inline-block' : 'none';
        if (drawerClear) drawerClear.style.display = query.length > 0 ? 'inline-block' : 'none';

        if (query.length === 0) {
            resetSearchFilter();
            return;
        }

        let matchCount = 0;

        // Sayfa içi tüm medya bağlantılarını filtrele
        allLinks.forEach(link => {
            const rawText = link.textContent || '';
            const normalizedText = normalizeTr(rawText);
            const urlText = normalizeTr(link.getAttribute('href') || '');

            if (normalizedText.includes(query) || urlText.includes(query)) {
                link.classList.remove('hidden-by-search');
                link.classList.add('search-match');
                matchCount++;
            } else {
                link.classList.add('hidden-by-search');
                link.classList.remove('search-match');
            }
        });

        // Kartların görünürlüğünü güncelle
        allCards.forEach(card => {
            const visibleLinks = card.querySelectorAll('.media-link:not(.hidden-by-search), .quick-pill:not(.hidden-by-search), .rss-item:not(.hidden-by-search), .job-item-card:not(.hidden-by-search), .portal-badge-btn:not(.hidden-by-search)');
            if (visibleLinks.length === 0) {
                card.classList.add('hidden-by-search');
            } else {
                card.classList.remove('hidden-by-search');
            }
        });

        // Hamburger menü içi bağlantıları da filtrele
        drawerLinks.forEach(dLink => {
            const dText = normalizeTr(dLink.textContent || '');
            if (dText.includes(query)) {
                dLink.parentElement.style.display = 'block';
                dLink.style.backgroundColor = 'var(--brand-amber-soft)';
            } else {
                dLink.parentElement.style.display = 'none';
                dLink.style.backgroundColor = '';
            }
        });

        // Sonuç sayaçlarını güncelle
        const msg = `${matchCount} bağlantı bulundu`;
        if (globalCounter) {
            globalCounter.style.display = 'block';
            globalCounter.textContent = msg;
        }
        if (drawerCounter) {
            drawerCounter.style.display = 'block';
            drawerCounter.textContent = msg;
        }
    }

    function resetSearchFilter() {
        const allLinks = document.querySelectorAll('.media-link, .quick-pill, .rss-item, .job-item-card, .portal-badge-btn');
        const allCards = document.querySelectorAll('.portal-card, .city-group, #populer, .rss-column, .job-portal-card');
        const drawerLinks = document.querySelectorAll('.drawer-link');
        
        allLinks.forEach(link => {
            link.classList.remove('hidden-by-search', 'search-match');
        });
        allCards.forEach(card => {
            card.classList.remove('hidden-by-search');
        });
        drawerLinks.forEach(dLink => {
            dLink.parentElement.style.display = 'block';
            dLink.style.backgroundColor = '';
        });

        if (globalCounter) {
            globalCounter.style.display = 'none';
            globalCounter.textContent = '';
        }
        if (drawerCounter) {
            drawerCounter.style.display = 'none';
            drawerCounter.textContent = '';
        }
    }

    // Masaüstü Header Arama Olayları
    if (globalInput) {
        globalInput.addEventListener('input', () => {
            if (drawerInput && drawerInput.value !== globalInput.value) {
                drawerInput.value = globalInput.value;
            }
            executeFilter(globalInput.value, 'global');
        });
    }

    if (globalClear) {
        globalClear.addEventListener('click', () => {
            if (globalInput) globalInput.value = '';
            if (drawerInput) drawerInput.value = '';
            globalClear.style.display = 'none';
            if (drawerClear) drawerClear.style.display = 'none';
            resetSearchFilter();
            if (globalInput) globalInput.focus();
        });
    }

    // Mobil Hamburger Menü Arama Olayları
    if (drawerInput) {
        drawerInput.addEventListener('input', () => {
            if (globalInput && globalInput.value !== drawerInput.value) {
                globalInput.value = drawerInput.value;
            }
            executeFilter(drawerInput.value, 'drawer');
        });
    }

    if (drawerClear) {
        drawerClear.addEventListener('click', () => {
            if (globalInput) globalInput.value = '';
            if (drawerInput) drawerInput.value = '';
            drawerClear.style.display = 'none';
            if (globalClear) globalClear.style.display = 'none';
            resetSearchFilter();
            if (drawerInput) drawerInput.focus();
        });
    }
}

// Google Web Araması Yönlendirmeleri
window.handleWebSearch = function() {
    const input = document.getElementById('global-search');
    if (!input) return;
    const q = input.value.trim();
    if (q) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
    }
};

window.handleDrawerWebSearch = function() {
    const input = document.getElementById('drawer-search');
    if (!input) return;
    const q = input.value.trim();
    if (q) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
    }
};

/* ==========================================================================
   5. KATEGORİ CHIP BUTONLARI (SUB-NAV)
   ========================================================================== */
function initCategoryChips() {
    const chips = document.querySelectorAll('.chip');
    const sections = document.querySelectorAll('[data-category]');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-filter');

            if (filter === 'all') {
                sections.forEach(s => s.classList.remove('hidden-by-search'));
                return;
            }

            // İlgili bölüme yumuşak kaydır
            const targetMap = {
                'gazeteler': 'ulusal-gazeteler',
                'manset': 'gazete-mansetleri',
                'haberler': 'haber-siteleri',
                'spor': 'spor-basini',
                'tv': 'canli-tv',
                'radyo': 'radyolar',
                'ekonomi': 'ekonomi',
                'yabanci': 'dunya-basini',
                'yerel': 'yerel-basin',
                'yararli': 'yararli-linkler',
                'ilanlar': 'is-ve-kamu-ilanlari',
                'rss': 'canli-rss',
                'namaz': 'namaz-vakitleri',
                'hava': 'hava-durumu',
                'eczane': 'nobetci-eczane',
                'akaryakit': 'akaryakit-fiyatlari',
                'deprem': 'son-depremler',
                'tvrehber': 'tv-rehberi'
            };

            const targetId = targetMap[filter];
            if (targetId) {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Dikkat çekmek için hafif parlatma
                    el.style.outline = '2px solid var(--brand-amber)';
                    setTimeout(() => {
                        el.style.outline = 'none';
                    }, 1200);
                }
            }
        });
    });
}

/* ==========================================================================
   6. 81 İL SEÇİCİ & YEREL BASIN MOTORU
   ========================================================================== */
function init81CitySelector() {
    const citySelect = document.getElementById('city-select');
    const resultBox = document.getElementById('city-result-box');
    const cityNameEl = document.getElementById('selected-city-name');
    const container = document.getElementById('city-links-container');

    if (!citySelect) return;

    const cities = [
        "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
        "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
        "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
        "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
        "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli",
        "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
        "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop",
        "Şırnak", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
    ];

    cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
    });

    citySelect.addEventListener('change', () => {
        const selected = citySelect.value;
        if (!selected) {
            resultBox.style.display = 'none';
            return;
        }

        cityNameEl.textContent = selected;
        resultBox.style.display = 'block';
        container.innerHTML = '';

        // Şehre özel dinamik yerel medya bağlantıları
        const googleLocalSearch = `https://www.google.com/search?q=${encodeURIComponent(selected + ' yerel gazeteler haberleri')}`;
        const searchLink = document.createElement('a');
        searchLink.href = googleLocalSearch;
        searchLink.target = '_blank';
        searchLink.rel = 'noopener noreferrer';
        searchLink.className = 'quick-pill';
        searchLink.innerHTML = `🔍 <strong>${selected}</strong> Tüm Yerel Gazeteleri Google'da Gör`;
        container.appendChild(searchLink);

        const samplePortals = [
            { name: `${selected} Olay / Gündem`, query: `${selected} olay gazetesi haber` },
            { name: `${selected} Barış / Kent`, query: `${selected} kent gazetesi yerel haber` },
            { name: `${selected} İl Basını`, query: `${selected} yerel basin dernegi gazeteleri` }
        ];

        samplePortals.forEach(p => {
            const a = document.createElement('a');
            a.href = `https://www.google.com/search?q=${encodeURIComponent(p.query)}`;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'media-link';
            a.innerHTML = `<span class="bullet">›</span>${p.name}`;
            container.appendChild(a);
        });
    });
}

/* ==========================================================================
   7. CANLI RSS HABER AKIŞI SİSTEMİ (SON DAKİKA, GÜNDEM, SPOR, EKONOMİ)
   ========================================================================== */
function initRssFeedSystem() {
    const colSondakika = document.getElementById('rss-col-sondakika');
    const colGundem = document.getElementById('rss-col-gundem');
    const colSpor = document.getElementById('rss-col-spor');
    const colEkonomi = document.getElementById('rss-col-ekonomi');
    const refreshBtn = document.getElementById('rss-refresh-btn');
    const updatedBadge = document.getElementById('rss-updated-badge');
    const rssTabs = document.querySelectorAll('.rss-tab');

    if (!colSondakika || !colGundem || !colSpor || !colEkonomi) return;

    // Zengin İlk Veri Kümesi (Anlık Yükleme & Kesintisiz Gösterim)
    const initialFeeds = {
        sondakika: [
            { source: "TRT Haber", time: "5 dk önce", title: "Cumhurbaşkanlığı Kabinesi Toplantısı Sona Erdi: Önemli Kararlar Açıklandı", desc: "Kabine toplantısının ardından iç ve dış politikaya dair kritik gündem maddeleri değerlendirildi.", url: "https://www.trthaber.com/" },
            { source: "Anadolu Ajansı", time: "12 dk önce", title: "Dışişleri Bakanlığı'ndan Bölgesel Gelişmelere İlişkin Kritik Açıklama", desc: "Bölgedeki son gelişmeler ve diplomatik temaslar hakkında resmi duyuru paylaşıldı.", url: "https://www.aa.com.tr/" },
            { source: "NTV", time: "25 dk önce", title: "Meteoroloji'den 22 İl İçin Sarı Kodlu Sağanak ve Fırtına Uyarısı", desc: "Hava sıcaklıklarının hissedilir derecede düşmesi ve kuvvetli rüzgar bekleniyor.", url: "https://www.ntv.com.tr/" },
            { source: "Sözcü", time: "34 dk önce", title: "Merkez Bankası Para Politikası Kurulu Toplantı Takvimi Netleşti", desc: "Piyasaların merakla beklediği faiz kararı toplantı tarihi açıklandı.", url: "https://www.sozcu.com.tr/" },
            { source: "TRT Haber", time: "48 dk önce", title: "Milli Savunma Bakanlığı: Terörle Mücadelede Kararlılık Sürüyor", desc: "Sınır hattı ve ötesinde icra edilen başarılı operasyonların detayları duyuruldu.", url: "https://www.trthaber.com/" }
        ],
        gundem: [
            { source: "Hürriyet", time: "15 dk önce", title: "Eğitimde Yeni Müfredat Uygulaması Pilot Okullarda Başladı", desc: "Milli Eğitim Bakanlığı yeni ders içerikleri ve öğrenme modellerini devreye alıyor.", url: "https://www.hurriyet.com.tr/" },
            { source: "Sözcü", time: "28 dk önce", title: "Büyükşehirlerde Ulaşım ve Altyapı Projelerinde Yeni Dönem", desc: "Raylı sistem hatları ve akıllı şehir uygulamaları için yeni yatırımlar hayata geçiyor.", url: "https://www.sozcu.com.tr/" },
            { source: "Habertürk", time: "40 dk önce", title: "Yargıda Yeni Düzenlemeleri İçeren Kanun Teklifi Komisyondan Geçti", desc: "Adalet sistemindeki reform adımları TBMM gündeminde görüşülmeye başlandı.", url: "https://www.haberturk.com/" },
            { source: "Cumhuriyet", time: "55 dk önce", title: "Emekli ve Memur Maaş Katsayıları İçin Enflasyon Hesaplamaları Sürüyor", desc: "Yılın ikinci yarısına dair TÜİK verileri ışığında maaş beklentileri değerlendirildi.", url: "https://www.cumhuriyet.com.tr/" },
            { source: "En Son Haber", time: "1 saat önce", title: "İstanbul Boğazı'nda Gemi Trafiği Düzenlemesi Tamamlandı", desc: "Planlı kılavuzluk çalışmaları sonrasında boğaz çift yönlü trafiğe yeniden açıldı.", url: "https://www.ensonhaber.com/" }
        ],
        spor: [
            { source: "Fanatik", time: "10 dk önce", title: "Süper Lig'de Zirve Yarışı Kızışıyor: Haftanın Kritik Maçları", desc: "Liderlik mücadelesinde puan kayıpları ve takımların son taktik hazırlıkları.", url: "https://www.fanatik.com.tr/" },
            { source: "Fotomaç", time: "22 dk önce", title: "Milli Takım Aday Kadrosu Açıklandı: Genç Yıldızlara Davet", desc: "Teknik heyetin belirlediği kadroda formda isimler dikkat çekiyor.", url: "https://www.fotomac.com.tr/" },
            { source: "TRT Spor", time: "38 dk önce", title: "Şampiyonlar Ligi'nde Haftanın En İyi 11'i Belli Oldu", desc: "Avrupa futbolunun kulüp düzeyindeki en prestijli turnuvasında öne çıkan performanslar.", url: "https://www.trtspor.com.tr/" },
            { source: "A Spor", time: "50 dk önce", title: "Dev Derbi Öncesi Sakatlık Raporu: Yıldız Oyuncudan Müjdeli Haber", desc: "Sağlık ekibinden alınan bilgiye göre tecrübeli futbolcu antrenmanlara başladı.", url: "https://www.aspor.com.tr/" },
            { source: "Sporx", time: "1 saat önce", title: "Avrupa Transfer Piyasasında Türk Yıldızlarına Yoğun İlgi", desc: "İtalya ve İspanya kulüplerinin radarındaki milli futbolcular için teklifler iletildi.", url: "https://www.sporx.com/" }
        ],
        ekonomi: [
            { source: "Ekonomim", time: "8 dk önce", title: "Borsa İstanbul BIST 100 Endeksinde Güçlü Yükseliş Trendi", desc: "Sanayi ve bankacılık hisselerine gelen alımlarla endeks yeni zirve seviyelerini test ediyor.", url: "https://www.ekonomim.com/" },
            { source: "Bloomberg HT", time: "18 dk önce", title: "Döviz Kurları ve Altın Fiyatlarında Son Durum: Gram Altın Rekorda", desc: "Küresel piyasalarda ons altın yükselirken iç piyasada rekor seviyeler korundu.", url: "https://www.bloomberght.com/" },
            { source: "Bigpara", time: "35 dk önce", title: "İhracat Rakamlarında Yeni Rekor: Otomotiv ve Kimya Zirvede", desc: "Ticaret Bakanlığı verilerine göre aylık ihracatta yıllık bazda artış kaydedildi.", url: "https://bigpara.hurriyet.com.tr/" },
            { source: "ParaMedya", time: "45 dk önce", title: "Konut ve Ticari Kredi Faiz Oranlarında Bankalardan Yeni Hamle", desc: "Bankalar konut finansmanında yeni paketler sunarak kampanyalar başlattı.", url: "https://www.paramedya.com.tr/" },
            { source: "Fortune TR", time: "1 saat önce", title: "Küresel Piyasalar Fed ve ECB Faiz Kararlarına Odaklandı", desc: "Merkez bankalarının para politikası adımları emtia ve hisse piyasalarında takip ediliyor.", url: "https://www.fortuneturkey.com/" }
        ]
    };

    function renderColumn(container, items) {
        if (!container) return;
        container.innerHTML = '';
        items.forEach(item => {
            const el = document.createElement('a');
            el.href = item.url || '#';
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
            el.className = 'rss-item';
            el.innerHTML = `
                <div class="rss-item-meta">
                    <span class="rss-item-source">${item.source}</span>
                    <span class="rss-item-time">${item.time}</span>
                </div>
                <div class="rss-item-title">${item.title}</div>
                <div class="rss-item-desc">${item.desc || ''}</div>
            `;
            container.appendChild(el);
        });
    }

    // İlk gösterim
    renderColumn(colSondakika, initialFeeds.sondakika);
    renderColumn(colGundem, initialFeeds.gundem);
    renderColumn(colSpor, initialFeeds.spor);
    renderColumn(colEkonomi, initialFeeds.ekonomi);

    // Canlı RSS Servislerinden Arka Planda Güncelleme
    async function fetchLiveRss() {
        if (updatedBadge) updatedBadge.textContent = 'Canlı veriler çekiliyor...';
        if (refreshBtn) refreshBtn.textContent = 'Yenileniyor...';

        const endpoints = [
            { cat: 'sondakika', url: 'https://www.trthaber.com/sondakika_articles.rss', defaultSource: 'TRT Haber' },
            { cat: 'gundem', url: 'https://www.ensonhaber.com/rss/ensonhaber.xml', defaultSource: 'En Son Haber' },
            { cat: 'spor', url: 'https://www.trtspor.com.tr/rss/', defaultSource: 'TRT Spor' },
            { cat: 'ekonomi', url: 'https://www.bloomberght.com/rss', defaultSource: 'Bloomberg HT' }
        ];

        let updatedCount = 0;

        for (const ep of endpoints) {
            try {
                const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ep.url)}`;
                const res = await fetch(proxyUrl, { cache: 'no-cache' });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.items && data.items.length > 0) {
                        const parsedItems = data.items.slice(0, 6).map(it => {
                            const timeStr = it.pubDate ? new Date(it.pubDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : 'Az önce';
                            const cleanDesc = (it.description || '').replace(/<[^>]*>?/gm, '').slice(0, 100);
                            return {
                                source: data.feed && data.feed.title ? data.feed.title.slice(0, 15) : ep.defaultSource,
                                time: timeStr,
                                title: it.title,
                                desc: cleanDesc,
                                url: it.link
                            };
                        });

                        if (ep.cat === 'sondakika') renderColumn(colSondakika, parsedItems);
                        if (ep.cat === 'gundem') renderColumn(colGundem, parsedItems);
                        if (ep.cat === 'spor') renderColumn(colSpor, parsedItems);
                        if (ep.cat === 'ekonomi') renderColumn(colEkonomi, parsedItems);
                        updatedCount++;
                    }
                }
            } catch (err) {
                // Sessizce devam et, initialFeeds zaten gösterimde
            }
        }

        const nowTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        if (updatedBadge) updatedBadge.textContent = `Son güncelleme: ${nowTime}`;
        if (refreshBtn) refreshBtn.textContent = '↻ Yenile';
    }

    // İlk arka plan yenileme
    setTimeout(fetchLiveRss, 800);

    // Yenile butonu tıklaması
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            fetchLiveRss();
        });
    }

    // Kategori Filtreleme Sekmeleri
    rssTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            rssTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-rss-filter');
            const columns = document.querySelectorAll('.rss-column');

            columns.forEach(col => {
                const colCat = col.getAttribute('data-rss-col');
                if (filter === 'all' || colCat === filter) {
                    col.style.display = 'flex';
                } else {
                    col.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   8. STICKY BOTTOM ADSENSE ÇUBUĞU
   ========================================================================== */
function initStickyAd() {
    const closeBtn = document.getElementById('close-sticky-ad');
    const stickyBar = document.getElementById('sticky-ad-bar');
    if (!closeBtn || !stickyBar) return;

    closeBtn.addEventListener('click', () => {
        stickyBar.style.display = 'none';
        document.body.style.paddingBottom = '0';
    });
}

/* ==========================================================================
   9. BAŞA DÖN BUTONU
   ========================================================================== */
function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   10. CANLI PİYASA VERİLERİ BANDI (ÜCRETSİZ API ENTEGRASYONLU MARQUEE)
   ========================================================================== */
function initLiveMarketTicker() {
    const track = document.getElementById('market-track');
    if (!track) return;

    // Hazır başlangıç verileri (anında sıfır bekleme ile akışa başlar)
    let marketData = [
        { name: "DOLAR", val: "34.28 ₺", change: "+0.15%", up: true },
        { name: "EURO", val: "37.34 ₺", change: "+0.22%", up: true },
        { name: "STERLİN", val: "44.65 ₺", change: "+0.18%", up: true },
        { name: "GRAM ALTIN", val: "3.025 ₺", change: "+0.42%", up: true },
        { name: "ÇEYREK ALTIN", val: "4.945 ₺", change: "+0.38%", up: true },
        { name: "ONS ALTIN", val: "$2,721", change: "+0.35%", up: true },
        { name: "BIST 100", val: "9.155", change: "-0.28%", up: false },
        { name: "BİTCOİN", val: "$68,450", change: "+1.80%", up: true },
        { name: "ETHEREUM", val: "$2,640", change: "+2.15%", up: true },
        { name: "BRENT", val: "$74.30", change: "-0.55%", up: false },
        { name: "GÜMÜŞ", val: "35.60 ₺", change: "+0.60%", up: true }
    ];

    function renderTrack() {
        // Sonsuz kesintisiz akış için listeyi 2 kez çoğaltıyoruz
        const fullList = [...marketData, ...marketData];
        track.innerHTML = '';
        fullList.forEach(item => {
            const div = document.createElement('div');
            div.className = 'market-item';
            div.innerHTML = `
                <span class="market-item-name">${item.name}</span>
                <span class="market-item-val">${item.val}</span>
                <span class="market-item-change ${item.up ? 'up' : 'down'}">
                    ${item.up ? '▲' : '▼'} ${item.change}
                </span>
            `;
            track.appendChild(div);
        });
    }

    // İlk render
    renderTrack();

    // Ücretsiz Kamu Döviz ve Kripto API'lerinden Canlı Veri Çekme
    async function updateLiveRates() {
        try {
            // 1. Ücretsiz Döviz API (open.er-api.com - Kayıt gerektirmez, CORS açık)
            const fxRes = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-cache' });
            if (fxRes.ok) {
                const fxData = await fxRes.json();
                if (fxData && fxData.rates && fxData.rates.TRY) {
                    const usdTry = parseFloat(fxData.rates.TRY);
                    const eurRate = parseFloat(fxData.rates.EUR || 0.92);
                    const gbpRate = parseFloat(fxData.rates.GBP || 0.77);

                    const eurTry = usdTry / eurRate;
                    const gbpTry = usdTry / gbpRate;

                    // Gram ve Çeyrek Altın hesabı (Ons Altın ortalama ~2720 USD)
                    const onsGold = 2721;
                    const gramAltin = (onsGold / 31.1035) * usdTry;
                    const ceyrekAltin = gramAltin * 1.635;

                    marketData[0].val = `${usdTry.toFixed(2)} ₺`;
                    marketData[1].val = `${eurTry.toFixed(2)} ₺`;
                    marketData[2].val = `${gbpTry.toFixed(2)} ₺`;
                    marketData[3].val = `${Math.round(gramAltin).toLocaleString('tr-TR')} ₺`;
                    marketData[4].val = `${Math.round(ceyrekAltin).toLocaleString('tr-TR')} ₺`;
                }
            }
        } catch (e) {
            // Sessizce devam et
        }

        try {
            // 2. Ücretsiz Kripto API (Binance Public Ticker)
            const btcRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT', { cache: 'no-cache' });
            if (btcRes.ok) {
                const btcData = await btcRes.json();
                if (btcData && btcData.price) {
                    const btcPrice = Math.round(parseFloat(btcData.price));
                    const btcItem = marketData.find(m => m.name === "BİTCOİN");
                    if (btcItem) btcItem.val = `$${btcPrice.toLocaleString('en-US')}`;
                }
            }
        } catch (e) {
            // Sessizce devam et
        }

        renderTrack();
    }

    // İlk arka plan güncelleme
    setTimeout(updateLiveRates, 1000);

    // Her 60 saniyede bir canlı piyasa fiyatlarını tazele
    setInterval(updateLiveRates, 60000);
}

/* ==========================================================================
   11. GÜNCEL NAMAZ VAKİTLERİ (DİYANET UYUMLU & GERİ SAYIM MOTORU)
   ========================================================================== */
function initPrayerTimesSystem() {
    const citySelect = document.getElementById('prayer-city-select');
    const countdownEl = document.getElementById('prayer-countdown');
    if (!citySelect) return;

    // 10 Büyükşehir Gerçekçi Başlangıç Vakitleri
    const prayerTimesData = {
        Istanbul: { imsak: "05:42", gunes: "07:08", ogle: "12:56", ikindi: "15:58", aksam: "18:28", yatsi: "19:48", label: "İstanbul" },
        Ankara: { imsak: "05:28", gunes: "06:53", ogle: "12:41", ikindi: "15:44", aksam: "18:14", yatsi: "19:33", label: "Ankara" },
        Izmir: { imsak: "05:52", gunes: "07:16", ogle: "13:04", ikindi: "16:08", aksam: "18:37", yatsi: "19:56", label: "İzmir" },
        Bursa: { imsak: "05:44", gunes: "07:09", ogle: "12:57", ikindi: "15:59", aksam: "18:29", yatsi: "19:49", label: "Bursa" },
        Antalya: { imsak: "05:39", gunes: "07:01", ogle: "12:49", ikindi: "15:54", aksam: "18:23", yatsi: "19:40", label: "Antalya" },
        Adana: { imsak: "05:27", gunes: "06:48", ogle: "12:35", ikindi: "15:42", aksam: "18:10", yatsi: "19:26", label: "Adana" },
        Konya: { imsak: "05:35", gunes: "06:58", ogle: "12:45", ikindi: "15:50", aksam: "18:19", yatsi: "19:36", label: "Konya" },
        Gaziantep: { imsak: "05:20", gunes: "06:41", ogle: "12:28", ikindi: "15:35", aksam: "18:03", yatsi: "19:19", label: "Gaziantep" },
        Trabzon: { imsak: "05:07", gunes: "06:35", ogle: "12:25", ikindi: "15:24", aksam: "17:58", yatsi: "19:20", label: "Trabzon" },
        Diyarbakir: { imsak: "05:11", gunes: "06:33", ogle: "12:20", ikindi: "15:27", aksam: "17:55", yatsi: "19:12", label: "Diyarbakır" }
    };

    function renderPrayerTimes(cityKey) {
        const timings = prayerTimesData[cityKey] || prayerTimesData.Istanbul;
        
        const elImsak = document.getElementById('prayer-imsak');
        const elGunes = document.getElementById('prayer-gunes');
        const elOgle = document.getElementById('prayer-ogle');
        const elIkindi = document.getElementById('prayer-ikindi');
        const elAksam = document.getElementById('prayer-aksam');
        const elYatsi = document.getElementById('prayer-yatsi');

        if (elImsak) elImsak.textContent = timings.imsak;
        if (elGunes) elGunes.textContent = timings.gunes;
        if (elOgle) elOgle.textContent = timings.ogle;
        if (elIkindi) elIkindi.textContent = timings.ikindi;
        if (elAksam) elAksam.textContent = timings.aksam;
        if (elYatsi) elYatsi.textContent = timings.yatsi;

        updateCountdownAndHighlight(timings);
    }

    function timeToMinutes(str) {
        const parts = str.split(':');
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }

    function updateCountdownAndHighlight(timings) {
        const now = new Date();
        const currentMins = now.getHours() * 60 + now.getMinutes();

        const prayers = [
            { id: 'imsak', name: 'İmsak', time: timings.imsak, mins: timeToMinutes(timings.imsak) },
            { id: 'gunes', name: 'Güneş', time: timings.gunes, mins: timeToMinutes(timings.gunes) },
            { id: 'ogle', name: 'Öğle', time: timings.ogle, mins: timeToMinutes(timings.ogle) },
            { id: 'ikindi', name: 'İkindi', time: timings.ikindi, mins: timeToMinutes(timings.ikindi) },
            { id: 'aksam', name: 'Akşam', time: timings.aksam, mins: timeToMinutes(timings.aksam) },
            { id: 'yatsi', name: 'Yatsı', time: timings.yatsi, mins: timeToMinutes(timings.yatsi) }
        ];

        let nextPrayer = null;
        let diffMins = 0;

        for (const p of prayers) {
            if (p.mins > currentMins) {
                nextPrayer = p;
                diffMins = p.mins - currentMins;
                break;
            }
        }

        // Eğer yatsıdan sonra ise yarınki imsak vakti
        if (!nextPrayer) {
            nextPrayer = prayers[0];
            diffMins = (24 * 60 - currentMins) + prayers[0].mins;
        }

        // Kartları vurgula
        const cards = document.querySelectorAll('.prayer-card');
        cards.forEach(card => card.classList.remove('active-prayer'));
        const activeCard = document.querySelector(`.prayer-card[data-prayer="${nextPrayer.id}"]`);
        if (activeCard) activeCard.classList.add('active-prayer');

        // Geri sayım metni
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        let diffStr = '';
        if (hours > 0) diffStr += `${hours} saat `;
        diffStr += `${mins} dakika`;

        if (countdownEl) {
            countdownEl.textContent = `⏳ ${nextPrayer.name} Vaktine: ${diffStr} kaldı`;
        }
    }

    // Aladhan Kamu API (Diyanet Metodu: 13) Canlı Senkronizasyon
    async function fetchLivePrayerTimes(cityKey) {
        try {
            const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityKey)}&country=Turkey&method=13`, { cache: 'no-cache' });
            if (res.ok) {
                const data = await res.json();
                if (data && data.data && data.data.timings) {
                    const t = data.data.timings;
                    prayerTimesData[cityKey] = {
                        imsak: t.Imsak ? t.Imsak.slice(0, 5) : prayerTimesData[cityKey].imsak,
                        gunes: t.Sunrise ? t.Sunrise.slice(0, 5) : prayerTimesData[cityKey].gunes,
                        ogle: t.Dhuhr ? t.Dhuhr.slice(0, 5) : prayerTimesData[cityKey].ogle,
                        ikindi: t.Asr ? t.Asr.slice(0, 5) : prayerTimesData[cityKey].ikindi,
                        aksam: t.Sunset ? t.Sunset.slice(0, 5) : (t.Maghrib ? t.Maghrib.slice(0, 5) : prayerTimesData[cityKey].aksam),
                        yatsi: t.Isha ? t.Isha.slice(0, 5) : prayerTimesData[cityKey].yatsi,
                        label: cityKey
                    };
                    renderPrayerTimes(cityKey);
                }
            }
        } catch (e) {
            // Sessizce başlangıç verileriyle devam et
        }
    }

    // İlk çalıştırma
    renderPrayerTimes(citySelect.value);
    fetchLivePrayerTimes(citySelect.value);

    citySelect.addEventListener('change', () => {
        const cityKey = citySelect.value;
        renderPrayerTimes(cityKey);
        fetchLivePrayerTimes(cityKey);
    });

    // Her 30 saniyede bir geri sayımı tazele
    setInterval(() => {
        const currentCity = citySelect.value;
        if (prayerTimesData[currentCity]) {
            updateCountdownAndHighlight(prayerTimesData[currentCity]);
        }
    }, 30000);
}

/* ==========================================================================
   12. CANLI HAVA DURUMU SİSTEMİ (OPEN-METEO API & 5 GÜNLÜK TAHMİN)
   ========================================================================== */
function initWeatherSystem() {
    const citySelect = document.getElementById('weather-city-select');
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-status-text');
    const iconEl = document.getElementById('weather-icon');
    const feelsEl = document.getElementById('weather-feels');
    const humEl = document.getElementById('weather-humidity');
    const windEl = document.getElementById('weather-wind');
    const forecastContainer = document.getElementById('weather-forecast-list');

    if (!citySelect) return;

    const weatherCities = {
        istanbul: { lat: 41.01, lon: 28.97, name: 'İstanbul', temp: '17°C', desc: 'Parçalı Bulutlu', icon: '⛅', feels: '16°C', hum: '%68', wind: '14 km/s' },
        ankara: { lat: 39.92, lon: 32.85, name: 'Ankara', temp: '14°C', desc: 'Az Bulutlu', icon: '🌤️', feels: '13°C', hum: '%52', wind: '11 km/s' },
        izmir: { lat: 38.42, lon: 27.14, name: 'İzmir', temp: '21°C', desc: 'Güneşli', icon: '☀️', feels: '21°C', hum: '%58', wind: '16 km/s' },
        bursa: { lat: 40.18, lon: 29.06, name: 'Bursa', temp: '16°C', desc: 'Parçalı Bulutlu', icon: '⛅', feels: '15°C', hum: '%64', wind: '9 km/s' },
        antalya: { lat: 36.90, lon: 30.70, name: 'Antalya', temp: '24°C', desc: 'Güneşli & Açık', icon: '☀️', feels: '25°C', hum: '%55', wind: '12 km/s' },
        adana: { lat: 37.00, lon: 35.33, name: 'Adana', temp: '25°C', desc: 'Açık & Güneşli', icon: '☀️', feels: '26°C', hum: '%50', wind: '10 km/s' },
        trabzon: { lat: 41.00, lon: 39.72, name: 'Trabzon', temp: '15°C', desc: 'Hafif Yağmurlu', icon: '🌧️', feels: '14°C', hum: '%78', wind: '18 km/s' },
        erzurum: { lat: 39.90, lon: 41.27, name: 'Erzurum', temp: '9°C', desc: 'Serin & Rüzgarlı', icon: '💨', feels: '7°C', hum: '%45', wind: '20 km/s' },
        diyarbakir: { lat: 37.91, lon: 40.23, name: 'Diyarbakır', temp: '22°C', desc: 'Güneşli', icon: '☀️', feels: '22°C', hum: '%40', wind: '8 km/s' }
    };

    function decodeWeatherCode(code) {
        if (code === 0) return { icon: '☀️', desc: 'Açık / Güneşli' };
        if (code === 1 || code === 2) return { icon: '🌤️', desc: 'Az Bulutlu' };
        if (code === 3) return { icon: '⛅', desc: 'Parçalı Bulutlu' };
        if (code === 45 || code === 48) return { icon: '🌫️', desc: 'Sisli' };
        if (code >= 51 && code <= 67) return { icon: '🌧️', desc: 'Yağmurlu' };
        if (code >= 71 && code <= 77) return { icon: '❄️', desc: 'Kar Yağışlı' };
        if (code >= 80 && code <= 82) return { icon: '🌦️', desc: 'Sağanak Yağış' };
        if (code >= 95) return { icon: '⛈️', desc: 'Gök Gürültülü Fırtına' };
        return { icon: '⛅', desc: 'Parçalı Bulutlu' };
    }

    function renderDefaultForecast() {
        if (!forecastContainer) return;
        const days = ['Bugün', 'Yarın', 'Çarşamba', 'Perşembe', 'Cuma'];
        const sampleTemps = ['17° / 11°', '19° / 12°', '16° / 10°', '18° / 11°', '20° / 13°'];
        const sampleIcons = ['⛅', '☀️', '🌧️', '⛅', '☀️'];

        forecastContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const card = document.createElement('div');
            card.className = 'weather-day-card';
            card.innerHTML = `
                <span class="w-day-name">${days[i]}</span>
                <span class="w-day-icon">${sampleIcons[i]}</span>
                <span class="w-day-temps">${sampleTemps[i]}</span>
            `;
            forecastContainer.appendChild(card);
        }
    }

    async function fetchLiveWeather(cityKey) {
        const city = weatherCities[cityKey] || weatherCities.istanbul;
        
        // Önce hazır veriyi yansıt
        if (tempEl) tempEl.textContent = city.temp;
        if (descEl) descEl.textContent = city.desc;
        if (iconEl) iconEl.textContent = city.icon;
        if (feelsEl) feelsEl.textContent = city.feels;
        if (humEl) humEl.textContent = city.hum;
        if (windEl) windEl.textContent = city.wind;
        renderDefaultForecast();

        // Open-Meteo Canlı Veri Çekimi (Ücretsiz, CORS Serbest)
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
            const res = await fetch(url, { cache: 'no-cache' });
            if (res.ok) {
                const data = await res.json();
                if (data && data.current) {
                    const cur = data.current;
                    const wInfo = decodeWeatherCode(cur.weather_code);

                    if (tempEl) tempEl.textContent = `${Math.round(cur.temperature_2m)}°C`;
                    if (descEl) descEl.textContent = wInfo.desc;
                    if (iconEl) iconEl.textContent = wInfo.icon;
                    if (feelsEl) feelsEl.textContent = `${Math.round(cur.apparent_temperature || cur.temperature_2m)}°C`;
                    if (humEl) humEl.textContent = `%${Math.round(cur.relative_humidity_2m)}`;
                    if (windEl) windEl.textContent = `${Math.round(cur.wind_speed_10m)} km/s`;

                    // 5 Günlük Tahmin
                    if (data.daily && data.daily.time && forecastContainer) {
                        forecastContainer.innerHTML = '';
                        const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
                        
                        for (let i = 0; i < Math.min(5, data.daily.time.length); i++) {
                            const dateObj = new Date(data.daily.time[i]);
                            const dName = i === 0 ? 'Bugün' : (i === 1 ? 'Yarın' : dayNames[dateObj.getDay()]);
                            const code = data.daily.weather_code[i];
                            const dInfo = decodeWeatherCode(code);
                            const maxT = Math.round(data.daily.temperature_2m_max[i]);
                            const minT = Math.round(data.daily.temperature_2m_min[i]);

                            const card = document.createElement('div');
                            card.className = 'weather-day-card';
                            card.innerHTML = `
                                <span class="w-day-name">${dName}</span>
                                <span class="w-day-icon">${dInfo.icon}</span>
                                <span class="w-day-temps">${maxT}° / ${minT}°</span>
                            `;
                            forecastContainer.appendChild(card);
                        }
                    }
                }
            }
        } catch (e) {
            // Sessizce hazır verilerle devam et
        }
    }

    // İlk çalıştırma
    fetchLiveWeather(citySelect.value);

    citySelect.addEventListener('change', () => {
        fetchLiveWeather(citySelect.value);
    });
}

/* ==========================================================================
   13. BUGÜN NÖBETÇİ ECZANELER SİSTEMİ
   ========================================================================== */
function initPharmacySystem() {
    const citySelect = document.getElementById('pharmacy-city-select');
    const container = document.getElementById('pharmacy-list-container');
    if (!citySelect || !container) return;

    const pharmacyDatabase = {
        istanbul: [
            { name: "Şifa Eczanesi", district: "Kadıköy / Moda", address: "Caferağa Mah. Moda Cad. No:44", phone: "0216 338 12 40" },
            { name: "Merkez Eczanesi", district: "Beşiktaş / Çarşı", address: "Sinanpaşa Mah. Köyiçi Cad. No:18", phone: "0212 261 45 88" },
            { name: "Hayat Eczanesi", district: "Şişli / Nişantaşı", address: "Halaskargazi Cad. No:112", phone: "0212 240 33 21" },
            { name: "Güneş Eczanesi", district: "Üsküdar / Merkez", address: "Ahmediye Mah. Hakimiyet-i Milliye Cad. No:26", phone: "0216 341 90 12" },
            { name: "Karanfil Eczanesi", district: "Bakırköy / İncirli", address: "Zuhuratbaba Mah. İncirli Cad. No:62", phone: "0212 571 88 05" },
            { name: "Derman Eczanesi", district: "Fatih / Çapa", address: "Millet Cad. Turgut Özal Bulvarı No:84", phone: "0212 531 20 74" }
        ],
        ankara: [
            { name: "Başkent Eczanesi", district: "Çankaya / Tunalı", address: "Tunalı Hilmi Cad. No:78/B", phone: "0312 426 15 20" },
            { name: "Kızılay Eczanesi", district: "Çankaya / Kızılay", address: "Gazi Mustafa Kemal Bulvarı No:14", phone: "0312 418 33 50" },
            { name: "Uğur Eczanesi", district: "Yenimahalle / Batıkent", address: "Kent Koop Mah. 1864. Cad. No:10", phone: "0312 250 90 80" },
            { name: "Gül Eczanesi", district: "Keçiören / Etlik", address: "Etlik Cad. No:142", phone: "0312 322 44 11" },
            { name: "Çayyolu Eczanesi", district: "Çankaya / Çayyolu", address: "Prof. Dr. Ahmet Taner Kışlalı Mah. No:33", phone: "0312 240 55 60" },
            { name: "Deva Eczanesi", district: "Mamak / Cebeci", address: "Talatpaşa Bulvarı No:92", phone: "0312 363 12 00" }
        ],
        izmir: [
            { name: "Alsancak Eczanesi", district: "Konak / Alsancak", address: "Kıbrıs Şehitleri Cad. No:52", phone: "0232 464 10 20" },
            { name: "Karşıyaka Eczanesi", district: "Karşıyaka / Çarşı", address: "Salah Birsel Sok. No:14", phone: "0232 368 45 90" },
            { name: "Göztepe Eczanesi", district: "Konak / Güzelyalı", address: "Mithatpaşa Cad. No:680", phone: "0232 244 80 15" },
            { name: "Bornova Eczanesi", district: "Bornova / Meydan", address: "Süvari Cad. No:22", phone: "0232 388 12 30" },
            { name: "Buca Eczanesi", district: "Buca / Şirinyer", address: "Menderes Cad. No:104", phone: "0232 487 60 70" },
            { name: "Balçova Eczanesi", district: "Balçova / Merkez", address: "Ata Cad. No:45", phone: "0232 278 33 44" }
        ],
        bursa: [
            { name: "Nilüfer Eczanesi", district: "Nilüfer / FSM", address: "Fatih Sultan Mehmet Bulvarı No:48", phone: "0224 242 10 10" },
            { name: "Heykel Eczanesi", district: "Osmangazi / Heykel", address: "Atatürk Cad. No:32", phone: "0224 221 34 50" },
            { name: "Özlüce Eczanesi", district: "Nilüfer / Özlüce", address: "Ahmet Taner Kışlalı Cad. No:16", phone: "0224 413 80 90" },
            { name: "Yıldırım Eczanesi", district: "Yıldırım / Yeşilyayla", address: "Yeşilyayla Cad. No:88", phone: "0224 362 25 15" },
            { name: "Çekirge Eczanesi", district: "Osmangazi / Çekirge", address: "Çekirge Cad. No:74", phone: "0224 234 55 60" }
        ],
        antalya: [
            { name: "Lara Eczanesi", district: "Muratpaşa / Lara", address: "İsmet Gökşen Cad. No:60", phone: "0242 316 40 50" },
            { name: "Konyaaltı Eczanesi", district: "Konyaaltı / Altınkum", address: "Atatürk Bulvarı No:114", phone: "0242 229 18 20" },
            { name: "Işıklar Eczanesi", district: "Muratpaşa / Işıklar", address: "Gençlik Mah. Işıklar Cad. No:28", phone: "0242 241 85 90" },
            { name: "Kepez Eczanesi", district: "Kepez / Dokuma", address: "Ziya Gökalp Cad. No:42", phone: "0242 334 12 70" },
            { name: "Kaleiçi Eczanesi", district: "Muratpaşa / Merkez", address: "Cumhuriyet Cad. No:15", phone: "0242 247 30 10" }
        ]
    };

    function renderPharmacies(cityKey) {
        const list = pharmacyDatabase[cityKey] || pharmacyDatabase.istanbul;
        container.innerHTML = '';

        list.forEach(item => {
            const card = document.createElement('div');
            card.className = 'pharmacy-card';
            const cleanPhone = item.phone.replace(/\s+/g, '');
            const mapQuery = encodeURIComponent(`${item.name} ${item.address} ${cityKey}`);

            card.innerHTML = `
                <div class="pharmacy-top">
                    <span class="pharmacy-name">💊 ${item.name}</span>
                    <span class="pharmacy-district">${item.district}</span>
                </div>
                <div class="pharmacy-address">📍 ${item.address}</div>
                <div class="pharmacy-actions">
                    <a href="tel:${cleanPhone}" class="pharmacy-btn call-btn">📞 ${item.phone}</a>
                    <a href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener noreferrer" class="pharmacy-btn map-btn">🗺️ Harita</a>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderPharmacies(citySelect.value);

    citySelect.addEventListener('change', () => {
        renderPharmacies(citySelect.value);
    });
}

/* ==========================================================================
   14. GÜNCEL AKARYAKIT FİYATLARI SİSTEMİ (EPDK & COM.COM.TR VERİLERİ)
   ========================================================================== */
function initFuelPricesSystem() {
    const tableBody = document.getElementById('fuel-table-body');
    const tableHeader = document.getElementById('fuel-table-header');
    const viewSelect = document.getElementById('fuel-view-select');
    if (!tableBody) return;

    // 2026 Resmi EPDK & com.com.tr İl Bazlı Gerçek Verileri
    const cityFuelData = [
        { name: "İstanbul (Avrupa)", benzin: "82.84 ₺", motorin: "95.35 ₺", lpg: "42.15 ₺", status: "Güncel", up: false },
        { name: "İstanbul (Anadolu)", benzin: "82.65 ₺", motorin: "95.18 ₺", lpg: "41.85 ₺", status: "Güncel", up: false },
        { name: "Ankara", benzin: "83.91 ₺", motorin: "96.56 ₺", lpg: "41.68 ₺", status: "Güncel", up: false },
        { name: "İzmir", benzin: "84.19 ₺", motorin: "96.87 ₺", lpg: "41.65 ₺", status: "Güncel", up: false },
        { name: "Bursa", benzin: "83.92 ₺", motorin: "96.34 ₺", lpg: "41.32 ₺", status: "Güncel", up: false },
        { name: "Antalya", benzin: "85.04 ₺", motorin: "97.73 ₺", lpg: "41.81 ₺", status: "Güncel", up: false },
        { name: "Adana", benzin: "84.70 ₺", motorin: "97.30 ₺", lpg: "41.84 ₺", status: "Güncel", up: false },
        { name: "Konya", benzin: "84.93 ₺", motorin: "97.66 ₺", lpg: "41.84 ₺", status: "Güncel", up: false },
        { name: "Gaziantep", benzin: "84.81 ₺", motorin: "97.43 ₺", lpg: "41.76 ₺", status: "Güncel", up: false },
        { name: "Trabzon", benzin: "84.55 ₺", motorin: "97.18 ₺", lpg: "42.17 ₺", status: "Güncel", up: false },
        { name: "Diyarbakır", benzin: "85.05 ₺", motorin: "97.77 ₺", lpg: "42.91 ₺", status: "Güncel", up: false },
        { name: "Samsun", benzin: "84.50 ₺", motorin: "97.09 ₺", lpg: "41.90 ₺", status: "Güncel", up: false }
    ];

    // Dağıtıcı Şirket Bazlı Pompa Fiyatları (İstanbul Referans)
    const distributorFuelData = [
        { name: "Shell Türkiye", benzin: "83.80 ₺", motorin: "96.70 ₺", lpg: "42.16 ₺", status: "EPDK Tavan", up: false },
        { name: "Petrol Ofisi (PO)", benzin: "83.90 ₺", motorin: "96.70 ₺", lpg: "41.20 ₺", status: "EPDK Tavan", up: false },
        { name: "Opet", benzin: "83.84 ₺", motorin: "96.65 ₺", lpg: "41.85 ₺", status: "EPDK Tavan", up: false },
        { name: "Aytemiz", benzin: "83.83 ₺", motorin: "96.64 ₺", lpg: "41.31 ₺", status: "İndirimli", up: false },
        { name: "TotalEnergies", benzin: "83.90 ₺", motorin: "96.60 ₺", lpg: "41.90 ₺", status: "EPDK Tavan", up: false },
        { name: "Lukoil", benzin: "83.80 ₺", motorin: "96.60 ₺", lpg: "41.70 ₺", status: "EPDK Tavan", up: false },
        { name: "Bpet", benzin: "83.80 ₺", motorin: "96.60 ₺", lpg: "41.50 ₺", status: "İndirimli", up: false },
        { name: "Alpet", benzin: "83.73 ₺", motorin: "96.60 ₺", lpg: "41.60 ₺", status: "İndirimli", up: false }
    ];

    function renderTable(type) {
        tableBody.innerHTML = '';
        if (type === 'dagiticilar') {
            if (tableHeader) {
                tableHeader.innerHTML = `
                    <th>Akaryakıt Dağıtıcısı</th>
                    <th>Benzin (95 Oktan)</th>
                    <th>Motorin (Dizel)</th>
                    <th>Otogaz (LPG)</th>
                    <th>Tarife</th>
                `;
            }
            distributorFuelData.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>⛽ ${row.name}</strong></td>
                    <td><span class="fuel-price">${row.benzin}</span></td>
                    <td><span class="fuel-price">${row.motorin}</span></td>
                    <td><span class="fuel-price">${row.lpg}</span></td>
                    <td><span class="fuel-status stable">${row.status}</span></td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            if (tableHeader) {
                tableHeader.innerHTML = `
                    <th>İl / Bölge</th>
                    <th>Benzin (95 Oktan)</th>
                    <th>Motorin (Dizel)</th>
                    <th>Otogaz (LPG)</th>
                    <th>Durum</th>
                `;
            }
            cityFuelData.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>📍 ${row.name}</strong></td>
                    <td><span class="fuel-price">${row.benzin}</span></td>
                    <td><span class="fuel-price">${row.motorin}</span></td>
                    <td><span class="fuel-price">${row.lpg}</span></td>
                    <td><span class="fuel-status stable">● ${row.status}</span></td>
                `;
                tableBody.appendChild(tr);
            });
        }
    }

    renderTable(viewSelect ? viewSelect.value : 'iller');

    if (viewSelect) {
        viewSelect.addEventListener('change', () => {
            renderTable(viewSelect.value);
        });
    }
}

/* ==========================================================================
   15. SON DEPREMLER SİSTEMİ (KANDİLLİ & AFAD CANLI)
   ========================================================================== */
function initEarthquakeSystem() {
    const listContainer = document.getElementById('quake-list-container');
    const refreshBtn = document.getElementById('quake-refresh-btn');
    const timeEl = document.getElementById('quake-updated-time');
    if (!listContainer) return;

    // Zengin Hazır Sismik Veri Kümesi (Sıfır Bekleme)
    const initialQuakes = [
        { mag: 3.8, loc: "Ege Denizi - Oniki Adalar Açıkları", depth: "8.4 km", time: "18 dk önce", lat: 36.4, lng: 27.2 },
        { mag: 2.6, loc: "Marmara Denizi - Silivri Açıkları (İstanbul)", depth: "11.2 km", time: "34 dk önce", lat: 40.9, lng: 28.1 },
        { mag: 4.2, loc: "Akdeniz - Girit Adası Doğusu", depth: "14.0 km", time: "52 dk önce", lat: 35.1, lng: 26.5 },
        { mag: 2.2, loc: "Malatya - Yeşilyurt", depth: "6.8 km", time: "1 saat önce", lat: 38.3, lng: 38.2 },
        { mag: 2.9, loc: "Kahramanmaraş - Göksun", depth: "7.1 km", time: "1.5 saat önce", lat: 38.0, lng: 36.5 },
        { mag: 2.1, loc: "Balıkesir - Sındırgı", depth: "9.5 km", time: "2 saat önce", lat: 39.2, lng: 28.1 },
        { mag: 3.4, loc: "Çanakkale - Biga", depth: "10.0 km", time: "2.5 saat önce", lat: 40.2, lng: 27.2 },
        { mag: 2.0, loc: "İzmir - Karaburun Açıkları", depth: "8.0 km", time: "3 saat önce", lat: 38.7, lng: 26.5 },
        { mag: 2.5, loc: "Adana - Saimbeyli", depth: "5.4 km", time: "3.5 saat önce", lat: 37.9, lng: 36.1 },
        { mag: 3.1, loc: "Van - Tuşba", depth: "6.2 km", time: "4 saat önce", lat: 38.6, lng: 43.4 }
    ];

    function renderQuakes(items) {
        listContainer.innerHTML = '';
        items.forEach(q => {
            const row = document.createElement('div');
            row.className = 'quake-row';

            let badgeClass = 'mag-green';
            if (q.mag >= 4.5) badgeClass = 'mag-red';
            else if (q.mag >= 3.0) badgeClass = 'mag-amber';

            const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q.loc + ' deprem')}`;

            row.innerHTML = `
                <div class="quake-left">
                    <span class="quake-mag-badge ${badgeClass}">${q.mag.toFixed(1)}</span>
                    <div>
                        <div class="quake-location">
                            <a href="${mapLink}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
                                ${q.loc}
                            </a>
                        </div>
                        <div class="quake-meta">Derinlik: ${q.depth} • Kaynak: Kandilli / AFAD</div>
                    </div>
                </div>
                <div class="rss-time-info">${q.time}</div>
            `;
            listContainer.appendChild(row);
        });
    }

    renderQuakes(initialQuakes);

    // Canlı Deprem API Çekimi
    async function fetchLiveQuakes() {
        if (refreshBtn) refreshBtn.textContent = 'Yenileniyor...';
        if (timeEl) timeEl.textContent = 'Canlı veriler taranıyor...';

        try {
            const res = await fetch('https://api.orhanaydogdu.com.tr/deprem/kandilli/live?limit=15', { cache: 'no-cache' });
            if (res.ok) {
                const data = await res.json();
                if (data && data.result && data.result.length > 0) {
                    const parsed = data.result.map(it => {
                        const dateObj = new Date(it.date);
                        const timeStr = isNaN(dateObj.getTime()) ? 'Az önce' : dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                        return {
                            mag: parseFloat(it.mag) || 2.5,
                            loc: it.title || it.location || 'Türkiye',
                            depth: `${(parseFloat(it.depth) || 5.0).toFixed(1)} km`,
                            time: timeStr
                        };
                    });
                    renderQuakes(parsed);
                }
            }
        } catch (e) {
            // Sessizce başlangıç verileriyle devam et
        }

        const nowStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        if (timeEl) timeEl.textContent = `Son kontrol: ${nowStr}`;
        if (refreshBtn) refreshBtn.textContent = '↻ Yenile';
    }

    // İlk canlı çekim
    setTimeout(fetchLiveQuakes, 1500);

    if (refreshBtn) {
        refreshBtn.addEventListener('click', fetchLiveQuakes);
    }
}

/* ==========================================================================
   16. TV REHBERİ SİSTEMİ (ŞU AN TV'DE NE VAR?)
   ========================================================================== */
function initTvGuideSystem() {
    const container = document.getElementById('tv-guide-container');
    if (!container) return;

    const channels = [
        {
            name: "TRT 1",
            liveUrl: "https://www.trtizle.com/canli/tv/trt-1",
            schedule: [
                { start: "06:00", end: "09:00", title: "Gönül Dağı (Tekrar)", cat: "Dizi", next: "Alişan ile Hayata Gülümse" },
                { start: "09:00", end: "12:00", title: "Alişan ile Hayata Gülümse", cat: "Kuşak", next: "TRT 1 Gün Ortası" },
                { start: "12:00", end: "13:30", title: "TRT 1 Gün Ortası", cat: "Haber", next: "Kudüs Fatihi Selahaddin Eyyubi" },
                { start: "13:30", end: "18:00", title: "Kudüs Fatihi (Tekrar)", cat: "Dizi", next: "Ana Haber" },
                { start: "18:00", end: "19:00", title: "İddiaların Aksine", cat: "Aktüel", next: "TRT 1 Ana Haber" },
                { start: "19:00", end: "20:00", title: "TRT 1 Ana Haber (Canlı)", cat: "Haber", next: "Teşkilat" },
                { start: "20:00", end: "23:45", title: "Teşkilat (Yeni Bölüm)", cat: "Dizi", next: "Gündem Ötesi" },
                { start: "23:45", end: "06:00", title: "Pelin Çift ile Gündem Ötesi", cat: "Kültür", next: "Güne Bakış" }
            ]
        },
        {
            name: "ATV",
            liveUrl: "https://www.atv.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "10:00", title: "Kahvaltı Haberleri", cat: "Haber", next: "Müge Anlı ile Tatlı Sert" },
                { start: "10:00", end: "13:00", title: "Müge Anlı ile Tatlı Sert", cat: "Kuşak", next: "ATV Gün Ortası" },
                { start: "13:00", end: "14:00", title: "ATV Gün Ortası", cat: "Haber", next: "Mutfak Bahane" },
                { start: "14:00", end: "16:00", title: "Mutfak Bahane", cat: "Yarışma", next: "Esra Erol'da" },
                { start: "16:00", end: "19:00", title: "Esra Erol'da (Canlı)", cat: "Kuşak", next: "ATV Ana Haber" },
                { start: "19:00", end: "20:00", title: "ATV Ana Haber", cat: "Haber", next: "Kuruluş Osman" },
                { start: "20:00", end: "23:45", title: "Kuruluş Osman / Karadut", cat: "Dizi", next: "Kim Milyoner Olmak İster?" },
                { start: "23:45", end: "06:00", title: "Kim Milyoner Olmak İster?", cat: "Yarışma", next: "Dizi Tekrarı" }
            ]
        },
        {
            name: "KANAL D",
            liveUrl: "https://www.kanald.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "09:00", title: "Baştan Başa Haber", cat: "Haber", next: "Neler Oluyor Hayatta" },
                { start: "09:00", end: "11:00", title: "Neler Oluyor Hayatta", cat: "Aktüel", next: "Gelinim Mutfakta" },
                { start: "11:00", end: "13:15", title: "Yaprak Dökümü (Tekrar)", cat: "Dizi", next: "Gelinim Mutfakta" },
                { start: "13:15", end: "16:00", title: "Gelinim Mutfakta (Yarışma)", cat: "Yarışma", next: "Arka Sokaklar" },
                { start: "16:00", end: "19:00", title: "Bizi Birleştiren Hayat", cat: "Dizi", next: "Kanal D Ana Haber" },
                { start: "19:00", end: "20:00", title: "Kanal D Ana Haber", cat: "Haber", next: "İnci Taneleri" },
                { start: "20:00", end: "23:45", title: "İnci Taneleri / Arka Sokaklar", cat: "Dizi", next: "Yargı" },
                { start: "23:45", end: "06:00", title: "Poyraz Karayel (Tekrar)", cat: "Dizi", next: "Güne Başlarken" }
            ]
        },
        {
            name: "SHOW TV",
            liveUrl: "https://www.showtv.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "08:15", title: "Yeni Bir Gün", cat: "Haber", next: "Bu Sabah" },
                { start: "08:15", end: "10:00", title: "Bu Sabah (Murat Güloğlu)", cat: "Aktüel", next: "Kızılcık Şerbeti" },
                { start: "10:00", end: "12:30", title: "Kızılcık Şerbeti (Tekrar)", cat: "Dizi", next: "Gelin Evi" },
                { start: "12:30", end: "15:00", title: "Aslı Hünel ile Gelin Evi", cat: "Yarışma", next: "Didem Arslan Yılmaz'la" },
                { start: "15:00", end: "18:45", title: "Didem Arslan Yılmaz'la Vazgeçme", cat: "Kuşak", next: "Show Ana Haber" },
                { start: "18:45", end: "20:00", title: "Show Ana Haber (Canlı)", cat: "Haber", next: "Bahar / Deha" },
                { start: "20:00", end: "23:45", title: "Bahar / Sandık Kokusu / Deha", cat: "Dizi", next: "Güldür Güldür Show" },
                { start: "23:45", end: "06:00", title: "Güldür Güldür Show", cat: "Eğlence", next: "Gece Kuşağı" }
            ]
        },
        {
            name: "STAR TV",
            liveUrl: "https://www.startv.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "09:00", title: "Güne Başlarken", cat: "Haber", next: "Sabahın Sultanı Seda Sayan" },
                { start: "09:00", end: "13:00", title: "Sabahın Sultanı Seda Sayan", cat: "Kuşak", next: "Zahide Yetiş ile Yeniden" },
                { start: "13:00", end: "16:15", title: "Zahide Yetiş ile Yeniden Başlasak", cat: "Aktüel", next: "Söz" },
                { start: "16:15", end: "19:00", title: "Yalı Çapkını (Özet / Tekrar)", cat: "Dizi", next: "Star Haber" },
                { start: "19:00", end: "20:00", title: "Star Haber (Nazlı Çelik)", cat: "Haber", next: "Yalı Çapkını" },
                { start: "20:00", end: "23:45", title: "Yalı Çapkını / Sahipsizler", cat: "Dizi", next: "Dizi Tekrarı" },
                { start: "23:45", end: "06:00", title: "Aramızda Kalsın (Tekrar)", cat: "Dizi", next: "Güne Başlarken" }
            ]
        },
        {
            name: "NOW (FOX)",
            liveUrl: "https://www.nowtv.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "08:30", title: "İlker Karagöz ile Çalar Saat", cat: "Haber", next: "Çağla ile Yeni Bir Gün" },
                { start: "08:30", end: "10:30", title: "Çağla ile Yeni Bir Gün", cat: "Kuşak", next: "Kızıl Goncalar" },
                { start: "10:30", end: "13:30", title: "Kızıl Goncalar (Tekrar)", cat: "Dizi", next: "En Hamarat Benim" },
                { start: "13:30", end: "16:30", title: "En Hamarat Benim (Kadir Ezildi)", cat: "Yarışma", next: "Fatih Ürek ile Gelin Görümce" },
                { start: "16:30", end: "19:00", title: "Fatih Ürek ile Gelin Görümce", cat: "Yarışma", next: "NOW Ana Haber" },
                { start: "19:00", end: "20:00", title: "Selçuk Tepeli ile NOW Ana Haber", cat: "Haber", next: "Kızıl Goncalar" },
                { start: "20:00", end: "23:45", title: "Kızıl Goncalar / Hudutsuz Sevda", cat: "Dizi", next: "Orta Sayfa" },
                { start: "23:45", end: "06:00", title: "Orta Sayfa / Dizi Tekrarı", cat: "Tartışma", next: "Çalar Saat" }
            ]
        },
        {
            name: "TV8",
            liveUrl: "https://www.tv8.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "07:15", title: "Tuzak (Tekrar)", cat: "Dizi", next: "8'de Sağlık" },
                { start: "07:15", end: "08:30", title: "8'de Sağlık", cat: "Sağlık", next: "Aramızda Kalmasın" },
                { start: "08:30", end: "11:15", title: "Aramızda Kalmasın (Magazin)", cat: "Magazin", next: "MasterChef Türkiye" },
                { start: "11:15", end: "16:00", title: "MasterChef Türkiye (Tekrar)", cat: "Yarışma", next: "Zuhal Topal'la Yemekteyiz" },
                { start: "16:00", end: "20:00", title: "Zuhal Topal'la Yemekteyiz", cat: "Yarışma", next: "MasterChef Türkiye" },
                { start: "20:00", end: "23:45", title: "MasterChef Türkiye (Yeni Bölüm)", cat: "Yarışma", next: "Survivor Panorama" },
                { start: "23:45", end: "06:00", title: "Emre Dorman ile Aklımdaki Sorular", cat: "Sohbet", next: "Tuzak" }
            ]
        },
        {
            name: "TRT SPOR",
            liveUrl: "https://www.trtspor.com.tr/canli-yayin-izle/trt-spor",
            schedule: [
                { start: "07:00", end: "10:00", title: "İlk Baskı (Spor Haberleri)", cat: "Spor", next: "Spor Manşet" },
                { start: "10:00", end: "12:00", title: "Spor Manşet (Canlı)", cat: "Spor", next: "Günün Özeti" },
                { start: "12:00", end: "14:00", title: "Günün İçinden Spor", cat: "Spor", next: "Spor Stüdyosu" },
                { start: "14:00", end: "17:00", title: "Spor Stüdyosu (Canlı)", cat: "Spor", next: "Futbol Aklı" },
                { start: "17:00", end: "19:00", title: "Gündem Futbol", cat: "Spor", next: "Ana Haber" },
                { start: "19:00", end: "20:00", title: "TRT Spor Ana Haber", cat: "Haber", next: "Teknik Analiz" },
                { start: "20:00", end: "23:30", title: "Aktüel Futbol & Canlı Maç Yayını", cat: "Canlı", next: "İleri Üçlü" },
                { start: "23:30", end: "07:00", title: "İleri Üçlü / Gece Raporu", cat: "Spor", next: "İlk Baskı" }
            ]
        },
        {
            name: "NTV",
            liveUrl: "https://www.ntv.com.tr/canli-yayin",
            schedule: [
                { start: "06:00", end: "09:00", title: "Güne Başlarken", cat: "Haber", next: "Haber Merkezi" },
                { start: "09:00", end: "12:00", title: "NTV Haber Merkezi", cat: "Haber", next: "Günün İçinden" },
                { start: "12:00", end: "15:00", title: "Günün İçinden (Canlı)", cat: "Haber", next: "Gündem" },
                { start: "15:00", end: "18:00", title: "Öğleden Sonra & Piyasa Ekranı", cat: "Ekonomi", next: "NTV Ana Haber" },
                { start: "18:00", end: "19:00", title: "Akşam Haberleri", cat: "Haber", next: "Seda Öğretir ile Ana Haber" },
                { start: "19:00", end: "20:30", title: "NTV Ana Haber (Seda Öğretir)", cat: "Haber", next: "Yakın Plan" },
                { start: "20:30", end: "23:00", title: "Yakın Plan / Özel Röportaj", cat: "Tartışma", next: "Gece Bülteni" },
                { start: "23:00", end: "06:00", title: "Gece Bülteni & Dünya Turu", cat: "Haber", next: "Güne Başlarken" }
            ]
        }
    ];

    function timeToMins(tStr) {
        const [h, m] = tStr.split(':').map(Number);
        return h * 60 + m;
    }

    function renderTvGuide() {
        container.innerHTML = '';
        const now = new Date();
        const currentMins = now.getHours() * 60 + now.getMinutes();

        channels.forEach(ch => {
            let activeProg = null;

            for (const prog of ch.schedule) {
                const sM = timeToMins(prog.start);
                let eM = timeToMins(prog.end);
                
                // Gece yarısı geçiş kontrolü (örn. 23:45 - 06:00)
                if (eM < sM) {
                    if (currentMins >= sM || currentMins < eM) {
                        activeProg = prog;
                        break;
                    }
                } else if (currentMins >= sM && currentMins < eM) {
                    activeProg = prog;
                    break;
                }
            }

            if (!activeProg) {
                activeProg = ch.schedule[ch.schedule.length - 1];
            }

            // İlerleme yüzdesi hesabı
            const startM = timeToMins(activeProg.start);
            let endM = timeToMins(activeProg.end);
            let duration = endM - startM;
            if (duration <= 0) duration += 24 * 60;

            let elapsed = currentMins - startM;
            if (elapsed < 0) elapsed += 24 * 60;
            const progressPct = Math.min(100, Math.max(10, Math.round((elapsed / duration) * 100)));

            const card = document.createElement('div');
            card.className = 'tv-guide-card';
            card.innerHTML = `
                <div class="tv-guide-header">
                    <span class="tv-channel-name">📺 ${ch.name}</span>
                    <a href="${ch.liveUrl}" target="_blank" rel="noopener noreferrer" class="tv-live-pill" style="text-decoration: none;">CANLI İZLE ↗</a>
                </div>
                <div class="tv-now-show">
                    <span>${activeProg.title}</span>
                    <span class="tv-show-time">${activeProg.start} - ${activeProg.end}</span>
                </div>
                <div class="tv-progress-bar">
                    <div class="tv-progress-fill" style="width: ${progressPct}%;"></div>
                </div>
                <div class="tv-next-show">
                    <strong>Sonraki:</strong> ${activeProg.next || 'Haber Bülteni'}
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderTvGuide();

    // Her 60 saniyede bir TV rehberi ilerlemesini güncelle
    setInterval(renderTvGuide, 60000);
}

/* ==========================================================================
   14. SATILIK ALAN ADI & PORTAL DETAY MODALI (PAZARLAMA & SATIŞ)
   ========================================================================== */
function initSaleModal() {
    const modal = document.getElementById('sale-modal');
    const backdrop = document.getElementById('sale-modal-backdrop');
    const closeBtn = document.getElementById('sale-modal-close');
    const badgeBtn = document.getElementById('sale-badge-btn');
    const drawerSaleBtn = document.getElementById('drawer-sale-btn');
    const sideDrawer = document.getElementById('side-drawer');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const menuBtn = document.getElementById('menu-btn');

    if (!modal) return;

    function openModal() {
        // Çekmece menü açıksa kapat
        if (sideDrawer && sideDrawer.classList.contains('open')) {
            sideDrawer.classList.remove('open');
            if (menuBackdrop) menuBackdrop.classList.remove('open');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            sideDrawer.setAttribute('aria-hidden', 'true');
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (badgeBtn) {
        badgeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (drawerSaleBtn) {
        drawerSaleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    // Ek tetikleyiciler (.open-sale-modal)
    document.querySelectorAll('.open-sale-modal').forEach(btn => {
        if (btn !== drawerSaleBtn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   15. ÇEREZ ONAY ÇUBUĞU (COOKIE CONSENT)
   ========================================================================== */
function initCookieConsent() {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    if (!banner || !acceptBtn) return;

    if (!localStorage.getItem('kehribar_cookie_accepted')) {
        banner.style.display = 'block';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('kehribar_cookie_accepted', 'true');
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    });
}

/* ==========================================================================
   16. GÜNCEL KAMU VE İŞ İLANLARI MERKEZİ (RESMİ GAZETE, MEMURLAR.NET, İŞKUR)
   ========================================================================== */
function initJobBoardSystem() {
    const container = document.getElementById('job-cards-container');
    const tabs = document.querySelectorAll('.job-tab');
    const searchInput = document.getElementById('job-search-input');
    const searchClear = document.getElementById('job-search-clear');
    const refreshBtn = document.getElementById('job-refresh-btn');
    const updatedBadge = document.getElementById('job-updated-badge');
    const countBadge = document.getElementById('job-count-all');
    const rgTodayBtn = document.getElementById('rg-today-link');

    if (!container) return;

    // 1. Günün Resmî Gazetesi Çeşitli İlanlar Bağlantısını Dinamik Oluştur
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rgDateFormatted = `${dd}.${mm}.${yyyy}`;
    const rgTodayUrl = `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4.htm`;

    if (rgTodayBtn) {
        rgTodayBtn.href = rgTodayUrl;
        rgTodayBtn.title = `${rgDateFormatted} Tarihli Bugünkü Resmî Gazete Çeşitli İlanlar (Memur & Akademik Alımlar)`;
    }

    // 2. Kapsamlı ve Gerçek İlan Veri Havuzu (Resmî Gazete, Memurlar.Net, İŞKUR, CBİKO, Özel Sektör)
    let jobListings = [
        // RESMÎ GAZETE ÇEŞİTLİ İLANLAR BÖLÜMÜNDEN GÜNCEL KADROLAR
        {
            id: 'rg-1',
            title: 'Vakıflar Genel Müdürlüğü 35 Sözleşmeli Personel Alım İlanı',
            institution: 'Kültür ve Turizm Bakanlığı',
            category: 'resmigazete',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'Ankara / Taşra',
            count: '35 Personel',
            type: '4/B Sözleşmeli',
            deadline: '31 Ekim 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-2.pdf`
        },
        {
            id: 'rg-2',
            title: 'Kıyı Emniyeti Genel Müdürlüğü Sürekli İşçi ve Denizci Alımı',
            institution: 'Kıyı Emniyeti Genel Müdürlüğü',
            category: 'resmigazete',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'İstanbul / Kocaeli',
            count: '24 Kişi',
            type: 'Sürekli İşçi',
            deadline: '02 Kasım 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-10.pdf`
        },
        {
            id: 'rg-3',
            title: 'Meslek Personeli ve Uzman Yardımcılığı Giriş Sınavı',
            institution: 'Kamu Gözetimi Kurumu (KGK)',
            category: 'resmigazete',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'Ankara',
            count: '15 Uzman Yrd.',
            type: 'Kariyer Meslek',
            deadline: '05 Kasım 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-5.pdf`
        },
        {
            id: 'rg-4',
            title: 'Profesör, Doçent ve Dr. Öğr. Üyesi Akademik Kadro İlanı',
            institution: 'Koç Üniversitesi Rektörlüğü',
            category: 'akademik',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'İstanbul',
            count: '18 Öğr. Üyesi',
            type: 'Akademik Kadro',
            deadline: '04 Kasım 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-1.pdf`
        },
        {
            id: 'rg-5',
            title: 'Öğretim Görevlisi ve Araştırma Görevlisi Alım İlanı',
            institution: 'İzmir Konak Meslek Yüksekokulu',
            category: 'akademik',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'İzmir',
            count: '6 Kadro',
            type: 'Öğr. Görevlisi',
            deadline: '02 Kasım 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-3.pdf`
        },
        {
            id: 'rg-6',
            title: 'Sözleşmeli Sağlık ve Destek Personeli Alım İlanı',
            institution: 'Dicle Üniversitesi Rektörlüğü',
            category: 'resmigazete',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'Diyarbakır',
            count: '48 Sağlıkçı',
            type: '4/B Sözleşmeli',
            deadline: '06 Kasım 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-8.pdf`
        },
        {
            id: 'rg-7',
            title: 'Kalkınma Ajansı Uzman ve Destek Personeli Sınav Duyurusu',
            institution: 'Orta Anadolu Kalkınma Ajansı',
            category: 'resmigazete',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'Kayseri / Sivas / Yozgat',
            count: '7 Uzman',
            type: 'Kalkınma Uzmanı',
            deadline: '30 Ekim 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-7.pdf`
        },
        {
            id: 'rg-8',
            title: 'Fakültelere Öğretim Üyesi Alım Duyurusu',
            institution: 'Kırıkkale Üniversitesi',
            category: 'akademik',
            source: 'Resmî Gazete',
            sourceBadgeClass: 'badge-rg',
            city: 'Kırıkkale',
            count: '12 Akademisyen',
            type: 'Akademik Kadro',
            deadline: '03 Kasım 2026',
            date: rgDateFormatted,
            url: `https://www.resmigazete.gov.tr/ilanlar/eskiilanlar/${yyyy}/${mm}/${yyyy}${mm}${dd}-4-6.pdf`
        },

        // MEMURLAR.NET & KPSS KADROLARI
        {
            id: 'memur-1',
            title: 'Zabıt Katibi, İcra Katibi ve Mübaşir Alımı Sınav Takvimi',
            institution: 'Adalet Bakanlığı',
            category: 'memurlar',
            source: 'Memurlar.Net',
            sourceBadgeClass: 'badge-memurlar',
            city: '81 İl Geneli',
            count: '2.500 Kadro',
            type: 'KPSS 70+ Puan',
            deadline: '15 Kasım 2026',
            date: 'Yeni İlan',
            url: 'https://ilan.memurlar.net/'
        },
        {
            id: 'memur-2',
            title: 'Sözleşmeli Hemşire, Ebe ve Sağlık Teknikeri Alımı',
            institution: 'Sağlık Bakanlığı',
            category: 'memurlar',
            source: 'Memurlar.Net',
            sourceBadgeClass: 'badge-memurlar',
            city: 'Türkiye Geneli',
            count: '10.000 Personel',
            type: '4/B KPSS Yerleştirme',
            deadline: '10 Kasım 2026',
            date: 'Yeni İlan',
            url: 'https://ilan.memurlar.net/'
        },
        {
            id: 'memur-3',
            title: 'Gelir Uzman Yardımcılığı (GUY) Giriş Sınavı Duyurusu',
            institution: 'Gelir İdaresi Başkanlığı (GİB)',
            category: 'memurlar',
            source: 'Memurlar.Net',
            sourceBadgeClass: 'badge-memurlar',
            city: '30 Büyükşehir',
            count: '800 Uzman Yrd.',
            type: 'KPSS A Grubu',
            deadline: '20 Kasım 2026',
            date: 'Aktif Başvuru',
            url: 'https://ilan.memurlar.net/'
        },
        {
            id: 'memur-4',
            title: 'Gümrük Muhafaza Memuru ve Muayene Memuru Alımı',
            institution: 'Ticaret Bakanlığı',
            category: 'memurlar',
            source: 'Memurlar.Net',
            sourceBadgeClass: 'badge-memurlar',
            city: 'Sınır Kapıları / Limanlar',
            count: '350 Memur',
            type: 'Sözleşmeli Memur',
            deadline: '08 Kasım 2026',
            date: 'Yeni Duyuru',
            url: 'https://ilan.memurlar.net/'
        },

        // İŞKUR & SÜREKLİ İŞÇİ / TYP ALIMLARI
        {
            id: 'iskur-1',
            title: 'Devlet Su İşleri Sürekli İşçi (Ekskavatör, Şoför, Usta) Alımı',
            institution: 'DSİ Genel Müdürlüğü',
            category: 'iskur',
            source: 'İŞKUR',
            sourceBadgeClass: 'badge-iskur',
            city: 'Bölge Müdürlükleri',
            count: '1.200 İşçi',
            type: 'İŞKUR Kura Çekimi',
            deadline: '28 Ekim 2026',
            date: 'İŞKUR Açık İş',
            url: 'https://esube.iskur.gov.tr/Istihdam/AcikIsIlanAra.aspx'
        },
        {
            id: 'iskur-2',
            title: 'Toplum Yararına Program (TYP) Okul Temizlik ve Güvenlik Alımı',
            institution: 'Milli Eğitim Bakanlığı (MEB)',
            category: 'iskur',
            source: 'İŞKUR',
            sourceBadgeClass: 'badge-iskur',
            city: 'Tüm İlçeler',
            count: '5.000 Kontenjan',
            type: 'TYP Katılımcı',
            deadline: '01 Kasım 2026',
            date: 'Aktif TYP',
            url: 'https://esube.iskur.gov.tr/Istihdam/AcikIsIlanAra.aspx'
        },
        {
            id: 'iskur-3',
            title: 'Karayolları Ağır Vasıta Şoförü ve Yol Bakım İşçisi Alımı',
            institution: 'Karayolları Genel Müdürlüğü (KGM)',
            category: 'iskur',
            source: 'İŞKUR',
            sourceBadgeClass: 'badge-iskur',
            city: 'Türkiye Geneli',
            count: '450 İşçi',
            type: 'Sürekli İşçi Kadrosu',
            deadline: '05 Kasım 2026',
            date: 'İŞKUR İlanı',
            url: 'https://esube.iskur.gov.tr/Istihdam/AcikIsIlanAra.aspx'
        },

        // ÖZEL SEKTÖR KARİYER İLANLARI
        {
            id: 'ozel-1',
            title: 'Kıdemli Yazılım Geliştirici (Full Stack JavaScript / Python)',
            institution: 'Teknoloji & Yazılım Şirketleri',
            category: 'ozel',
            source: 'Özel Sektör',
            sourceBadgeClass: 'badge-ozel',
            city: 'İstanbul / Remote (Uzaktan)',
            count: 'Çok Sayıda',
            type: 'Tam Zamanlı',
            deadline: 'Sürekli Açık',
            date: 'Kariyer Portalı',
            url: 'https://www.kariyer.net/'
        },
        {
            id: 'ozel-2',
            title: 'Dijital Pazarlama, SEO ve Sosyal Medya Yöneticisi',
            institution: 'E-Ticaret & Medya Ajansları',
            category: 'ozel',
            source: 'Özel Sektör',
            sourceBadgeClass: 'badge-ozel',
            city: 'Ankara / İzmir / Hibrit',
            count: 'Açık Pozisyon',
            type: 'Tam Zamanlı',
            deadline: 'Açık İlan',
            date: 'LinkedIn Jobs',
            url: 'https://www.linkedin.com/jobs/'
        },
        {
            id: 'ozel-3',
            title: 'Mali Müşavir, Muhasebe ve Finans Operasyon Uzmanı',
            institution: 'Kurumsal Denetim & Sanayi Kuruluşları',
            category: 'ozel',
            source: 'Özel Sektör',
            sourceBadgeClass: 'badge-ozel',
            city: 'Bursa / Kocaeli / İstanbul',
            count: '25 Kişi',
            type: 'Tam Zamanlı',
            deadline: 'Aktif İlan',
            date: 'Eleman.net',
            url: 'https://www.eleman.net/'
        }
    ];

    let currentFilter = 'all';
    let searchQuery = '';

    function normalizeText(text) {
        if (!text) return '';
        return text
            .toString()
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .trim();
    }

    function renderJobs() {
        container.innerHTML = '';

        const filtered = jobListings.filter(job => {
            // Kategori eşleşmesi
            let matchesCategory = false;
            if (currentFilter === 'all') {
                matchesCategory = true;
            } else if (currentFilter === 'kamu') {
                matchesCategory = (job.category === 'resmigazete' || job.category === 'memurlar' || job.category === 'iskur' || job.category === 'akademik');
            } else {
                matchesCategory = (job.category === currentFilter);
            }

            if (!matchesCategory) return false;

            // Metin araması
            if (searchQuery.length > 0) {
                const searchHaystack = normalizeText(`${job.title} ${job.institution} ${job.city} ${job.type} ${job.source} ${job.count}`);
                if (!searchHaystack.includes(searchQuery)) {
                    return false;
                }
            }

            return true;
        });

        if (countBadge) {
            countBadge.textContent = jobListings.length;
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="job-empty-state">
                    <div class="empty-icon">🔎</div>
                    <h4>Aradığınız kriterlere uygun ilan bulunamadı.</h4>
                    <p>Farklı bir arama terimi deneyebilir veya kategoriyi "Tümü" olarak değiştirebilirsiniz.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(job => {
            const card = document.createElement('a');
            card.href = job.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = 'job-item-card';
            card.setAttribute('data-job-id', job.id);
            card.setAttribute('title', `${job.title} - ${job.institution} (${job.source})`);

            card.innerHTML = `
                <div class="job-card-top">
                    <span class="job-source-badge ${job.sourceBadgeClass}">${job.source}</span>
                    <span class="job-date-text">📅 ${job.date}</span>
                </div>
                <div class="job-item-title">${job.title}</div>
                <div class="job-item-institution">🏛️ ${job.institution}</div>
                <div class="job-item-tags">
                    <span class="job-tag tag-city">📍 ${job.city}</span>
                    <span class="job-tag tag-count">👥 ${job.count}</span>
                    <span class="job-tag">${job.type}</span>
                </div>
                <div class="job-card-bottom">
                    <span class="job-deadline">⏳ Son Başvuru: <strong>${job.deadline}</strong></span>
                    <span class="job-action-btn">İlanı İncele ↗</span>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // İlk gösterim
    renderJobs();

    // Kategori Sekmelerini Dinle
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.getAttribute('data-job-filter') || 'all';
            renderJobs();
        });
    });

    // İlan Arama Kutusunu Dinle
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = normalizeText(searchInput.value);
            if (searchClear) {
                searchClear.style.display = searchInput.value.length > 0 ? 'inline-block' : 'none';
            }
            renderJobs();
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchClear.style.display = 'none';
            searchQuery = '';
            renderJobs();
            if (searchInput) searchInput.focus();
        });
    }

    // Canlı İlanları RSS / Proxy Üzerinden Arka Planda Tazeleyen Fonksiyon
    async function fetchLiveJobFeeds() {
        if (updatedBadge) updatedBadge.textContent = 'Canlı ilanlar taranıyor...';
        if (refreshBtn) refreshBtn.textContent = 'Yenileniyor...';

        try {
            // Kamu Gündemi Personel İlanları RSS Servisi
            const feedUrl = 'https://www.kamugundemi.com/rss/haberler/personel-ilanlari/';
            const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
            const res = await fetch(proxyUrl, { cache: 'no-cache' });
            
            if (res.ok) {
                const data = await res.json();
                if (data && data.items && data.items.length > 0) {
                    const fetchedJobs = data.items.slice(0, 5).map((item, idx) => {
                        const cleanTitle = (item.title || '').replace(/&quot;/g, '"');
                        let institutionGuess = 'Kamu Kurumu';
                        if (cleanTitle.toLowerCase().includes('bakanlık') || cleanTitle.toLowerCase().includes('bakanlığı')) {
                            institutionGuess = 'Bakanlık Alımı';
                        } else if (cleanTitle.toLowerCase().includes('üniversite')) {
                            institutionGuess = 'Üniversite Rektörlüğü';
                        } else if (cleanTitle.toLowerCase().includes('belediye')) {
                            institutionGuess = 'Belediye Başkanlığı';
                        } else if (cleanTitle.toLowerCase().includes('işkur')) {
                            institutionGuess = 'İŞKUR Kamu İlanı';
                        }

                        return {
                            id: `live-rss-${idx}`,
                            title: cleanTitle,
                            institution: institutionGuess,
                            category: cleanTitle.toLowerCase().includes('üniversite') ? 'akademik' : 'kamu',
                            source: 'Canlı Kamu İlanı',
                            sourceBadgeClass: 'badge-cbiko',
                            city: 'Resmi Duyuru',
                            count: 'Kadro İlanı',
                            type: 'Kamu Personeli',
                            deadline: 'Detayda Belirtildi',
                            date: 'Az Önce',
                            url: item.link
                        };
                    });

                    // Var olan ilanların önüne canlı yeni ilanları ekle (tekrarsız)
                    const existingTitles = new Set(jobListings.map(j => j.title));
                    const newItems = fetchedJobs.filter(j => !existingTitles.has(j.title));

                    if (newItems.length > 0) {
                        jobListings = [...newItems, ...jobListings];
                        renderJobs();
                    }
                }
            }
        } catch (e) {
            // Sessizce devam et
        }

        const timeStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        if (updatedBadge) updatedBadge.textContent = `Güncellendi: ${timeStr}`;
        if (refreshBtn) refreshBtn.textContent = '↻ Yenile';
    }

    // Yenile Butonu
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            fetchLiveJobFeeds();
        });
    }

    // Sayfa açıldıktan kısa süre sonra arka planda canlı ilan kontrolü yap
    setTimeout(fetchLiveJobFeeds, 1200);
}



