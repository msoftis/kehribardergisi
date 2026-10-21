/**
 * KEHRİBAR MEDYA & HABER PORTALI
 * Merkezi Ortak Bileşenler (Header, Navigasyon, Yan Çekmece Menü, Footer, Reklam & Çerez Barı)
 * Sürüm: 1.0.0
 */

(function () {
    'use strict';

    // Sayfa yüklenirken kayıtlı temayı anında uygula (FOUC - Flash of unstyled theme önleme)
    const savedTheme = localStorage.getItem('kehribar_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    /**
     * Header HTML Şablonu
     * @param {string} activePage - 'home' | 'gazete' | 'dergi' | 'tv' | 'radyo' | 'legal'
     */
    function getHeaderHtml(activePage) {
        return `
    <!-- ÜST BİLGİ & DUYURU ÇUBUĞU -->
    <div class="top-ticker-bar">
        <div class="container ticker-inner">
            <div class="ticker-date" id="current-date">Yükleniyor...</div>
            <div class="ticker-links">
                <span class="ticker-badge">Hızlı Erişim:</span>
                <a href="index.html" class="${activePage === 'home' ? 'active-link' : ''}">🏠 Ana Sayfa</a>
                <a href="gazete.html" class="${activePage === 'gazete' ? 'active-link' : ''}" style="font-weight: 700;">🗞️ Gazeteler & Manşetler</a>
                <a href="dergi.html" class="${activePage === 'dergi' ? 'active-link' : ''}" style="color: #f59e0b; font-weight: 700;">📚 Dergiler</a>
                <a href="tv.html" class="${activePage === 'tv' ? 'active-link' : ''}" style="color: #ef4444; font-weight: 700;">📺 Canlı TV</a>
                <a href="radyo.html" class="${activePage === 'radyo' ? 'active-link' : ''}" style="color: #10b981; font-weight: 700;">📻 Radyolar</a>
                <a href="islam.html" class="${activePage === 'islam' ? 'active-link' : ''}" style="color: #059669; font-weight: 700;">🕌 İslam & İbadet</a>
                <a href="index.html#is-ve-kamu-ilanlari" style="color: #d97706; font-weight: 700;">👔 Kamu & İş</a>
                <a href="index.html#canli-rss" style="color: #ef4444; font-weight: 700;">🔴 Canlı RSS</a>
                <a href="index.html#ekonomi">📈 Piyasa</a>
                <a href="index.html#hava-durumu">⛅ Hava</a>
                <a href="index.html#namaz-vakitleri">🕌 Namaz</a>
                <a href="index.html#nobetci-eczane">💊 Eczane</a>
            </div>
            <div class="ticker-right">
                <button id="theme-toggle" class="theme-toggle-btn" title="Karanlık/Aydınlık Tema Değiştir">🌙</button>
            </div>
        </div>
    </div>

    <!-- ANA HEADER BÖLÜMÜ -->
    <header class="main-header sticky-header">
        <div class="container header-container">
            
            <!-- EN SOLDA ŞIK BAŞLIK & LOGO -->
            <div class="header-brand">
                <a href="index.html" class="brand-link" title="Kehribar Dergisi Ana Sayfa">
                    <img src="img/logo.svg?v=3" alt="Kehribar Dergisi" class="brand-logo-img">
                </a>
                <h1 class="visually-hidden">Kehribar Dergisi | Gazeteler, Dergiler, Canlı TV, Radyo ve Medya Portalı</h1>
            </div>

            <!-- ORTADA UZUN & ŞIK ARAMA ALANI -->
            <div class="header-search">
                <form id="search-form" class="search-form" onsubmit="event.preventDefault(); if (typeof handleWebSearch === 'function') handleWebSearch();">
                    <div class="search-input-wrapper">
                        <svg class="search-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input 
                            type="search" 
                            id="global-search" 
                            class="search-input" 
                            placeholder="Gazete, dergi, TV, radyo veya haber ara... (Canlı filtre)" 
                            autocomplete="off"
                            spellcheck="false"
                        >
                        <button type="button" id="search-clear" class="search-clear" title="Temizle" style="display: none;">✕</button>
                        <button type="submit" class="search-btn" title="Google'da Web Araması Yap">
                            <svg class="search-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                            <span>Web'de Ara</span>
                        </button>
                    </div>
                </form>
                <div id="search-counter" class="search-counter" style="display: none;"></div>
            </div>

            <!-- EN SAĞDA SATILIK ETİKETİ & HAMBURGER MENÜ -->
            <div class="header-actions">
                <button type="button" id="sale-badge-btn" class="domain-sale-badge" style="display: none !important;" title="Bu alan adı ve portal satılıktır (49$) - Detayları ve teklifi gör">
                    <span class="sale-pulse"></span>
                    <span class="sale-tag">SATILIK</span>
                    <strong class="sale-price">49$</strong>
                </button>
                <button id="menu-btn" class="hamburger-btn" aria-label="Menü" title="Tüm Menüyü Aç">
                    <svg class="hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>

        </div>
    </header>

    <!-- ORTAK ÇOKLU SAYFA NAVİGASYON BARI -->
    <nav class="portal-nav-bar" aria-label="Portal Sayfaları">
        <div class="container nav-tabs-wrapper">
            <a href="index.html" class="nav-tab ${activePage === 'home' ? 'active' : ''}">
                <span class="nav-tab-ico">🏠</span>
                <span class="nav-tab-label">Ana Sayfa</span>
            </a>
            <a href="gazete.html" class="nav-tab ${activePage === 'gazete' ? 'active' : ''}">
                <span class="nav-tab-ico">🗞️</span>
                <span class="nav-tab-label">Gazeteler</span>
            </a>
            <a href="dergi.html" class="nav-tab ${activePage === 'dergi' ? 'active' : ''}">
                <span class="nav-tab-ico">📚</span>
                <span class="nav-tab-label">Dergiler</span>
            </a>
            <a href="tv.html" class="nav-tab ${activePage === 'tv' ? 'active' : ''}">
                <span class="nav-tab-ico">📺</span>
                <span class="nav-tab-label">Canlı TV</span>
            </a>
            <a href="radyo.html" class="nav-tab ${activePage === 'radyo' ? 'active' : ''}">
                <span class="nav-tab-ico">📻</span>
                <span class="nav-tab-label">Radyolar</span>
            </a>
            <a href="islam.html" class="nav-tab ${activePage === 'islam' ? 'active' : ''}">
                <span class="nav-tab-ico">🕌</span>
                <span class="nav-tab-label">İslam</span>
            </a>
        </div>
    </nav>

    <!-- SLIDE-OVER YAN MENÜ (DRAWER) -->
    <div id="menu-backdrop" class="menu-backdrop"></div>
    <aside id="side-drawer" class="side-drawer" aria-hidden="true">
        <div class="drawer-header">
            <div class="drawer-title">
                <img src="img/logo.svg?v=3" alt="Kehribar Dergisi" class="drawer-logo-img">
            </div>
            <button id="menu-close" class="drawer-close-btn" aria-label="Menüyü Kapat">✕</button>
        </div>
        <div class="drawer-body">
            <!-- HAMBURGER MENÜ İÇİ CANLI ARAMA ALANI -->
            <div class="drawer-search-section">
                <form id="drawer-search-form" class="drawer-search-form" onsubmit="event.preventDefault(); if (typeof handleDrawerWebSearch === 'function') handleDrawerWebSearch();">
                    <div class="drawer-input-wrapper">
                        <span class="drawer-search-icon">🔍</span>
                        <input 
                            type="search" 
                            id="drawer-search" 
                            class="drawer-search-input" 
                            placeholder="Site, gazete, dergi, TV veya radyo ara..." 
                            autocomplete="off"
                            spellcheck="false"
                        >
                        <button type="button" id="drawer-search-clear" class="drawer-search-clear" title="Temizle" style="display: none;">✕</button>
                    </div>
                    <button type="submit" class="drawer-search-btn" title="Web'de Ara">Ara</button>
                </form>
                <div id="drawer-search-counter" class="drawer-search-counter" style="display: none;"></div>
            </div>

            <!-- TEMEL SAYFALAR -->
            <div class="drawer-section">
                <h4>Sayfa Portalları</h4>
                <ul class="drawer-nav">
                    <li><a href="index.html" class="drawer-link ${activePage === 'home' ? 'active-drawer-link' : ''}"><span class="nav-ico">🏠</span> Ana Sayfa Portalı</a></li>
                    <li><a href="gazete.html" class="drawer-link ${activePage === 'gazete' ? 'active-drawer-link' : ''}"><span class="nav-ico">🗞️</span> Gazeteler & Günün Manşetleri</a></li>
                    <li><a href="dergi.html" class="drawer-link ${activePage === 'dergi' ? 'active-drawer-link' : ''}" style="color: #f59e0b; font-weight: 700;"><span class="nav-ico">📚</span> Dergiler (Kültür, Sanat, Edebiyat, Bilim)</a></li>
                    <li><a href="tv.html" class="drawer-link ${activePage === 'tv' ? 'active-drawer-link' : ''}" style="color: #ef4444; font-weight: 700;"><span class="nav-ico">📺</span> Canlı TV Kanalları & TV Rehberi</a></li>
                    <li><a href="radyo.html" class="drawer-link ${activePage === 'radyo' ? 'active-drawer-link' : ''}" style="color: #10b981; font-weight: 700;"><span class="nav-ico">📻</span> Çevrim İçi Radyolar & Canlı Çalar</a></li>
                    <li><a href="islam.html" class="drawer-link ${activePage === 'islam' ? 'active-drawer-link' : ''}" style="color: #059669; font-weight: 700;"><span class="nav-ico">🕌</span> İslam & İbadet Portalı (Kuran, Vakitler, Zekat)</a></li>
                </ul>
            </div>

            <!-- MEDYA KATEGORİLERİ -->
            <div class="drawer-section">
                <h4>Hızlı Medya & Servisler</h4>
                <ul class="drawer-nav">
                    <li><a href="index.html#populer" class="drawer-link"><span class="nav-ico">⭐</span> En Popüler Kısayollar</a></li>
                    <li><a href="gazete.html#mansetler" class="drawer-link"><span class="nav-ico">🗞️</span> Günün Gazete Manşetleri</a></li>
                    <li><a href="gazete.html#ulusal-gazeteler" class="drawer-link"><span class="nav-ico">📰</span> Ulusal Gazeteler</a></li>
                    <li><a href="index.html#haber-siteleri" class="drawer-link"><span class="nav-ico">⚡</span> İnternet Haber Medyası</a></li>
                    <li><a href="index.html#spor-basini" class="drawer-link"><span class="nav-ico">⚽</span> Spor Gazeteleri & Siteleri</a></li>
                    <li><a href="tv.html#canli-tv" class="drawer-link"><span class="nav-ico">📺</span> Canlı TV Kanalları</a></li>
                    <li><a href="radyo.html#radyolar" class="drawer-link"><span class="nav-ico">📻</span> Çevrim İçi Radyolar</a></li>
                    <li><a href="index.html#ekonomi" class="drawer-link"><span class="nav-ico">📈</span> Ekonomi & Finans</a></li>
                    <li><a href="gazete.html#dunya-basini" class="drawer-link"><span class="nav-ico">🌐</span> Başlıca Yabancı Basın</a></li>
                    <li><a href="gazete.html#yerel-basin" class="drawer-link"><span class="nav-ico">📍</span> 81 İl Yerel Medya Fihristi</a></li>
                    <li><a href="index.html#is-ve-kamu-ilanlari" class="drawer-link" style="color: #d97706; font-weight: 700;"><span class="nav-ico">👔</span> Kamu & İş İlanları Portalı</a></li>
                    <li><a href="index.html#canli-rss" class="drawer-link" style="color: #ef4444; font-weight: 700;"><span class="nav-ico">🔴</span> Canlı RSS Haber Akışı</a></li>
                    <li><a href="index.html#namaz-vakitleri" class="drawer-link"><span class="nav-ico">🕌</span> Namaz Vakitleri</a></li>
                    <li><a href="index.html#hava-durumu" class="drawer-link"><span class="nav-ico">⛅</span> Hava Durumu</a></li>
                    <li><a href="index.html#nobetci-eczane" class="drawer-link"><span class="nav-ico">💊</span> Nöbetçi Eczaneler</a></li>
                    <li><a href="index.html#akaryakit-fiyatlari" class="drawer-link"><span class="nav-ico">⛽</span> Akaryakıt Fiyatları</a></li>
                    <li><a href="index.html#son-depremler" class="drawer-link"><span class="nav-ico">🌐</span> Son Depremler</a></li>
                    <li><a href="tv.html#tv-rehberi" class="drawer-link"><span class="nav-ico">📺</span> TV Rehberi (Şu An TV'de)</a></li>
                </ul>
            </div>

            <div class="drawer-section">
                <h4>Sayfa Özellikleri</h4>
                <div class="drawer-feature-box">
                    <p><strong>Tek Tıkla Erişim:</strong> Tüm haber, gazete, dergi, TV ve radyo kaynaklarına aracı olmadan doğrudan ulaşın.</p>
                    <p><strong>Canlı Filtreleme:</strong> Arama kutusuna yazarak aradığınız içeriği saniyeler içinde bulun.</p>
                </div>
            </div>

            <div class="drawer-section ad-info-section drawer-sale-box" style="display: none !important;">
                <h4>Alan Adı & Web Sitesi Satışı</h4>
                <p><strong>kehribardergisi.com</strong> alan adı ve tüm medya portalı <strong>49$</strong> bedelle satışta!</p>
                <button type="button" id="drawer-sale-btn" class="drawer-btn open-sale-modal">Satılık Detaylarını İncele (49$)</button>
            </div>
        </div>
        <div class="drawer-footer">
            <span>&copy; 2026 Kehribar Dergisi Portalı</span>
        </div>
    </aside>
        `;
    }

    /**
     * Footer HTML Şablonu
     * @param {string} activePage
     */
    function getFooterHtml(activePage) {
        const isIslamPage = activePage === 'islam';
        return `
    <!-- FOOTER -->
    <footer class="portal-footer">
        <div class="container footer-content">
            <div class="footer-brand">
                <img src="img/logo.svg?v=3" alt="Kehribar Dergisi" class="footer-logo-img">
                <p>Türkiye'nin ve dünyanın en güncel gazete, dergi, haber, TV ve radyo yayınlarına en hızlı erişim kısayolu.</p>
            </div>
            <div class="footer-meta">
                <p>&copy; 2026 Kehribardergisi.com (Kehribar Dergisi). Tüm hakları saklıdır. <span class="sep">•</span> <a href="https://msoftis.github.io/page/" target="_blank" rel="noopener noreferrer" class="msoftis-credit-link" title="Msoftis Portfolyo & Web">Msoftis❤️</a></p>
                <div class="footer-links">
                    <a href="index.html">Ana Sayfa</a>
                    <span class="sep">•</span>
                    <a href="gazete.html">Gazeteler</a>
                    <span class="sep">•</span>
                    <a href="dergi.html">Dergiler</a>
                    <span class="sep">•</span>
                    <a href="tv.html">Canlı TV</a>
                    <span class="sep">•</span>
                    <a href="radyo.html">Radyolar</a>
                    <span class="sep">•</span>
                    <a href="islam.html">İslam & İbadet</a>
                    <span class="sep">•</span>
                    <a href="gizlilik-politikasi.html">Gizlilik & Çerez Politikası</a>
                    <span class="sep">•</span>
                    <a href="https://msoftis.blogspot.com/p/iletisim.html" target="_blank" rel="noopener noreferrer">İletişim</a>
                    <span class="sep">•</span>
                    <a href="#" id="scroll-to-top">Başa Dön ↑</a>
                </div>
            </div>
        </div>
    </footer>

    ${!isIslamPage ? `<!-- STICKY BOTTOM ADSENSE BAR (Mobil & Masaüstü Gelir Optimizasyonu) -->
    <div id="sticky-ad-bar" class="sticky-ad-bar">
        <div class="sticky-ad-inner">
            <span class="sticky-ad-tag">SPONSORLU / AD</span>
            <div class="sticky-ad-content">
                <span class="sticky-ad-text">Kehribar Dergisi Reklam Alanı - Google AdSense 728x90 / 320x50</span>
            </div>
            <button id="close-sticky-ad" class="close-sticky-btn" title="Kapat" aria-label="Reklamı Gizle">✕</button>
        </div>
    </div>` : ''}

    <!-- SATILIK ALAN ADI & PORTAL DETAY MODALI -->
    <div id="sale-modal" class="sale-modal" aria-hidden="true">
        <div class="sale-modal-backdrop" id="sale-modal-backdrop"></div>
        <div class="sale-modal-dialog">
            <button id="sale-modal-close" class="sale-modal-close" aria-label="Kapat" title="Kapat">✕</button>

            <div class="sale-modal-header">
                <div class="sale-badge-chip">🔥 FIRSAT PROJE · ANAHTAR TESLİM</div>
                <h2 class="sale-modal-title">kehribardergisi.com Alan Adı & Tüm Portal Satılıktır!</h2>
                <p class="sale-modal-sub">Türkiye'nin ve dünyanın haber, gazete, dergi, canlı TV, piyasa ve servislerini bir araya getiren hazır, kurulu ve Google AdSense uyumlu portal.</p>
            </div>

            <div class="sale-price-banner">
                <div class="sale-price-left">
                    <span class="old-price">149$</span>
                    <div class="current-price-row">
                        <strong class="current-price">49$</strong>
                        <span class="price-period">/ Tek Seferlik Ödeme (Her Şey Dahil)</span>
                    </div>
                </div>
                <div class="sale-discount-tag">%67 İNDİRİM</div>
            </div>

            <div class="sale-modal-body">
                <h4 class="sale-list-title">📦 Satış Paketine Neler Dahil?</h4>
                <ul class="sale-features-list">
                    <li>
                        <span class="feat-icon">🌐</span>
                        <div class="feat-text">
                            <strong>kehribardergisi.com Alan Adı:</strong>
                            <span>Akılda kalıcı, Türkçe karakter uyumlu, marka değeri yüksek premium .com domaini anında transfer (EPP / Auth Code ile ücretsiz devir).</span>
                        </div>
                    </li>
                    <li>
                        <span class="feat-icon">💻</span>
                        <div class="feat-text">
                            <strong>Tüm Web Sitesi Kaynak Kodları:</strong>
                            <span>HTML5, CSS3 ve modern Vanilla JavaScript ile sıfırdan kodlanmış portalın tüm açık kaynak sayfaları (Ana sayfa, Gazete, Dergi, TV, Radyo).</span>
                        </div>
                    </li>
                    <li>
                        <span class="feat-icon">💰</span>
                        <div class="feat-text">
                            <strong>Hazır Google AdSense Reklam Alanları:</strong>
                            <span>Header 728x90, Orta 300x250, Akış İçi ve Yapışkan Alt Reklam alanları entegredir.</span>
                        </div>
                    </li>
                    <li>
                        <span class="feat-icon">⚡</span>
                        <div class="feat-text">
                            <strong>Canlı Veri & Yaşam Servisleri Altyapısı:</strong>
                            <span>TRT/AA Canlı RSS haber akışı, anlık piyasa döviz bandı, namaz vakitleri, Open-Meteo hava durumu, nöbetçi eczaneler ve TV rehberi.</span>
                        </div>
                    </li>
                    <li>
                        <span class="feat-icon">📱</span>
                        <div class="feat-text">
                            <strong>%100 Mobil & Masaüstü Uyumlu:</strong>
                            <span>Süper hızlı yüklenen, SEO uyumlu ve modüler mimari.</span>
                        </div>
                    </li>
                </ul>

                <div class="sale-trust-grid">
                    <div class="trust-item"><span class="t-ico">⚡</span><span>Anında Domain Transferi</span></div>
                    <div class="trust-item"><span class="t-ico">🛡️</span><span>Güvenli & Şeffaf Devir</span></div>
                    <div class="trust-item"><span class="t-ico">🚀</span><span>Hemen Kazanmaya Hazır</span></div>
                </div>
            </div>

            <div class="sale-modal-footer">
                <a href="https://msoftis.blogspot.com/p/iletisim.html" target="_blank" rel="noopener noreferrer" class="sale-cta-btn">
                    <span>🚀 Hemen Satın Al & İletişime Geç (49$)</span>
                    <span class="btn-arrow">→</span>
                </a>
                <span class="sale-guarantee-note">🔒 Güvenli işlem. Tıkladığınızda mesajınız doğrudan site sahibine iletilir.</span>
            </div>
        </div>
    </div>

    <!-- ÇEREZ ONAY BİLDİRİMİ -->
    <div id="cookie-consent-banner" class="cookie-consent-bar" style="display: none;">
        <div class="container cookie-inner">
            <div class="cookie-text">
                <span>🍪 Sitemizde kullanıcı deneyimini iyileştirmek ve reklam hizmetlerini optimize etmek amacıyla çerezler (cookies) kullanılmaktadır. Detaylı bilgi için <a href="gizlilik-politikasi.html">Gizlilik ve Çerez Politikamızı</a> inceleyebilirsiniz.</span>
            </div>
            <div class="cookie-actions">
                <button type="button" id="cookie-accept-btn" class="cookie-accept-btn">Anladım ve Kabul Ediyorum</button>
            </div>
        </div>
    </div>
        `;
    }

    /**
     * DOM elemanlarını bileşenlerle doldur
     */
    function mountComponents() {
        const headerPlaceholder = document.getElementById('site-header');
        const activePage = headerPlaceholder ? (headerPlaceholder.getAttribute('data-active') || 'home') : 'home';
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = getHeaderHtml(activePage);
        }

        const footerPlaceholder = document.getElementById('site-footer');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = getFooterHtml(activePage);
        }
    }

    // Hemen veya DOM hazır olunca çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountComponents);
    } else {
        mountComponents();
    }

    // Dışarıya API aktar
    window.KehribarComponents = {
        mount: mountComponents,
        getHeaderHtml: getHeaderHtml,
        getFooterHtml: getFooterHtml
    };
})();
