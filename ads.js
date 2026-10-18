/**
 * ============================================================================
 * KEHRİBAR MEDYA - MERKEZİ REKLAM YÖNETİMİ & KONTROL PANELİ (ads.js)
 * ============================================================================
 * Sitenizdeki tüm reklam alanlarını tek bir yerden buradan yönetebilirsiniz.
 * 
 * KULLANIM REHBERİ:
 * 1. Google AdSense kullanmak için:
 *    - googleAdsense.enabled = true yapın ve kendi ca-pub kimliğinizi girin.
 *    - İlgili alanın type değerini "adsense" yapın ve slot numarasını yazın.
 * 
 * 2. Özel Banner / Görsel Reklam (Sponsorluk vb.) kullanmak için:
 *    - İlgili alanın type değerini "banner" yapın.
 *    - banner.imageUrl kısmına görsel linkini girin (örn: "images/reklam1.jpg" veya "https://...").
 *    - banner.targetUrl kısmına tıklandığında gidilecek adresi girin.
 *    - Görsel belirtilmezse şık bir sponsorluk/reklam alanı kutucuğu gösterilir.
 * 
 * 3. Bir reklam alanını tamamen gizlemek için:
 *    - İlgili alanın enabled değerini false yapın.
 * ============================================================================
 */

const ADS_CONFIG = {
    // ------------------------------------------------------------------------
    // GENEL GOOGLE ADSENSE AYARLARI
    // ------------------------------------------------------------------------
    googleAdsense: {
        enabled: true, // AdSense kodları aktif edilsin mi? (true = Açık, false = Kapalı)
        client: "ca-pub-2401373246538934" // Google AdSense Yayıncı Kimliğiniz (ads.txt ile senkron)
    },

    // ------------------------------------------------------------------------
    // 1. ÜST LEADERBOARD REKLAMI (Header Altı - 728x90)
    // ------------------------------------------------------------------------
    topLeaderboard: {
        enabled: true, // true: Göster, false: Gizle
        type: "banner", // "banner", "adsense" veya "custom"
        
        // AdSense Tercihi:
        adsenseSlot: "1234567890",
        adsenseFormat: "horizontal",

        // Özel Görsel & Link Banner Tercihi:
        banner: {
            imageUrl: "img/728x90.gif", // 728x90 GIF Reklam Görseli
            targetUrl: "https://msoftis.blogspot.com/p/iletisim.html",
            altText: "Kehribar Dergisi Üst Reklam Alanı (728x90)",
            tagText: "REKLAM / SPONSOR (728x90)",
            titleText: "Google AdSense & Sponsor Üst Banner Alanı",
            subText: "Sayfanın en yüksek tıklanma oranına sahip 728x90 üst reklam bölgesi",
            ctaText: "Reklam Ver & İletişim ↗"
        },

        // İsteğe Bağlı Özel HTML Kodu:
        customHtml: ""
    },

    // ------------------------------------------------------------------------
    // 2. KARE REKLAM KUTUSU (Medya Kutucukları Izgarası İçi - 300x250)
    // ------------------------------------------------------------------------
    gridRect: {
        enabled: true,
        type: "banner", // "banner", "adsense" veya "custom"

        adsenseSlot: "9876543210",
        adsenseFormat: "rectangle",

        banner: {
            imageUrl: "img/300x250.gif", // 300x250 GIF Reklam Görseli
            targetUrl: "https://msoftis.blogspot.com/p/iletisim.html",
            altText: "Kehribar Dergisi 300x250 Reklam Alanı",
            tagText: "SPONSOR / REKLAM (300x250)",
            titleText: "300x250 Kare Reklam Alanı",
            subText: "Haber ve medya kutucukları arasında yüksek etkileşimli reklam alanı",
            ctaText: "Bu Alanı Kirala ↗"
        },

        customHtml: ""
    },

    // ------------------------------------------------------------------------
    // 3. ORTA AKIŞ İÇİ BANNER (Medya Kutucukları Altı - Responsive In-Feed)
    // ------------------------------------------------------------------------
    midBanner: {
        enabled: true,
        type: "banner", // "banner", "adsense" veya "custom"

        adsenseSlot: "5544332211",
        adsenseFormat: "fluid",
        adsenseLayoutKey: "-fb+5w+4e-db+86",

        banner: {
            imageUrl: "img/728x90.gif", // 728x90 GIF Reklam Görseli
            targetUrl: "https://msoftis.blogspot.com/p/iletisim.html",
            altText: "Kehribar Dergisi Akış İçi Reklam Bannerı",
            tagText: "SPONSORLU / IN-FEED BANNER",
            titleText: "Google AdSense Yatay Akış İçi Reklam Alanı",
            subText: "Kullanıcı akışına uyumlu, geniş formatlı yatay geçiş bannerı",
            ctaText: "Reklam İletişimi ↗"
        },

        customHtml: ""
    },

    // ------------------------------------------------------------------------
    // 4. ALT LEADERBOARD REKLAMI (Footer Üstü - 728x90 / 970x90)
    // ------------------------------------------------------------------------
    bottomLeaderboard: {
        enabled: true,
        type: "banner", // "banner", "adsense" veya "custom"

        adsenseSlot: "9988776655",
        adsenseFormat: "horizontal",

        banner: {
            imageUrl: "img/728x90.gif", // 728x90 GIF Reklam Görseli
            targetUrl: "https://msoftis.blogspot.com/p/iletisim.html",
            altText: "Kehribar Dergisi Alt Reklam Alanı",
            tagText: "REKLAM / SPONSOR (728x90 FOOTER BANNER)",
            titleText: "Google AdSense Alt Yatay Reklam Alanı",
            subText: "Sayfa sonu kullanıcı etkileşimi için optimize edilmiş 728x90 / 970x90 alanı",
            ctaText: "Buraya Reklam Ver ↗"
        },

        customHtml: ""
    },

    // ------------------------------------------------------------------------
    // 5. EN ALT SABİT YAPIŞKAN REKLAM (Sticky Bottom Bar - 728x90 / 320x50)
    // ------------------------------------------------------------------------
    stickyBottom: {
        enabled: true,
        type: "banner", // "banner", "adsense" veya "custom"

        adsenseSlot: "1122334455",

        banner: {
            imageUrl: "img/728x90.gif", // 728x90 GIF Reklam Görseli
            targetUrl: "https://msoftis.blogspot.com/p/iletisim.html",
            tagText: "SPONSORLU / AD",
            titleText: "Kehribar Dergisi Reklam Alanı",
            subText: "Google AdSense 728x90 / 320x50 veya Sabit Alt Sponsor Bannerı",
            ctaText: "İletişim & Reklam ↗"
        },

        customHtml: ""
    }
};

/**
 * ============================================================================
 * OTOMATİK REKLAM İŞLEME VE YERLEŞTİRME MOTORU
 * ============================================================================
 */
(function() {
    function initAdsEngine() {
        // 1. Google AdSense Kütüphanesini İhtiyaç Varsa Sayfaya Dahil Et
        if (ADS_CONFIG.googleAdsense && ADS_CONFIG.googleAdsense.enabled) {
            injectGoogleAdsenseScript(ADS_CONFIG.googleAdsense.client);
        }

        // 2. Reklam Alanlarını Tek Tek Render Et
        renderTopLeaderboard();
        renderGridRect();
        renderMidBanner();
        renderBottomLeaderboard();
        renderStickyBottom();
    }

    // Google AdSense script tag ekleme
    function injectGoogleAdsenseScript(clientId) {
        if (!clientId || clientId.includes('XXXXX')) return;
        if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }

    // 1. Üst Leaderboard
    function renderTopLeaderboard() {
        const el = document.getElementById('ad-top-leaderboard-container');
        if (!el) return;

        const cfg = ADS_CONFIG.topLeaderboard;
        if (!cfg || !cfg.enabled) {
            el.style.display = 'none';
            return;
        }

        el.style.display = 'block';
        el.innerHTML = buildAdCardHtml(cfg, 'ad-728x90');
        triggerAdsenseIfNeeded(cfg);
    }

    // 2. Grid Kare Reklam
    function renderGridRect() {
        const el = document.getElementById('ad-grid-rect-container');
        if (!el) return;

        const cfg = ADS_CONFIG.gridRect;
        if (!cfg || !cfg.enabled) {
            el.style.display = 'none';
            return;
        }

        el.style.display = 'flex';
        el.innerHTML = buildAdCardHtml(cfg, 'ad-300x250');
        triggerAdsenseIfNeeded(cfg);
    }

    // 3. Orta Akış İçi Banner
    function renderMidBanner() {
        const el = document.getElementById('ad-mid-banner-container');
        if (!el) return;

        const cfg = ADS_CONFIG.midBanner;
        if (!cfg || !cfg.enabled) {
            el.style.display = 'none';
            return;
        }

        el.style.display = 'block';
        el.innerHTML = buildAdCardHtml(cfg, 'ad-infeed');
        triggerAdsenseIfNeeded(cfg);
    }

    // 4. Alt Leaderboard
    function renderBottomLeaderboard() {
        const el = document.getElementById('ad-bottom-leaderboard-container');
        if (!el) return;

        const cfg = ADS_CONFIG.bottomLeaderboard;
        if (!cfg || !cfg.enabled) {
            el.style.display = 'none';
            return;
        }

        el.style.display = 'block';
        el.innerHTML = buildAdCardHtml(cfg, 'ad-728x90');
        triggerAdsenseIfNeeded(cfg);
    }

    // 5. Sticky Bottom
    function renderStickyBottom() {
        const bar = document.getElementById('sticky-ad-bar');
        if (!bar) return;

        const cfg = ADS_CONFIG.stickyBottom;
        if (!cfg || !cfg.enabled) {
            bar.style.display = 'none';
            document.body.style.paddingBottom = '0';
            return;
        }

        bar.style.display = 'block';
        const inner = bar.querySelector('.sticky-ad-inner');
        if (!inner) return;

        if (cfg.type === 'adsense' && ADS_CONFIG.googleAdsense.enabled) {
            inner.innerHTML = `
                <span class="sticky-ad-tag">${cfg.banner.tagText || 'AD'}</span>
                <div class="sticky-ad-content">
                    <ins class="adsbygoogle"
                         style="display:inline-block;min-width:320px;max-width:728px;height:50px"
                         data-ad-client="${ADS_CONFIG.googleAdsense.client}"
                         data-ad-slot="${cfg.adsenseSlot}"></ins>
                </div>
                <button id="close-sticky-ad" class="close-sticky-btn" title="Kapat" aria-label="Reklamı Gizle">✕</button>
            `;
            triggerAdsenseIfNeeded(cfg);
        } else if (cfg.type === 'banner' && cfg.banner.imageUrl) {
            inner.innerHTML = `
                <span class="sticky-ad-tag">${cfg.banner.tagText || 'AD'}</span>
                <div class="sticky-ad-content">
                    <a href="${cfg.banner.targetUrl}" target="_blank" rel="noopener noreferrer" class="ad-banner-link">
                        <img src="${cfg.banner.imageUrl}" alt="${cfg.banner.altText}" class="ad-banner-img" style="max-height: 48px;">
                    </a>
                </div>
                <button id="close-sticky-ad" class="close-sticky-btn" title="Kapat" aria-label="Reklamı Gizle">✕</button>
            `;
        } else if (cfg.type === 'custom' && cfg.customHtml) {
            inner.innerHTML = `
                <div class="sticky-ad-content">${cfg.customHtml}</div>
                <button id="close-sticky-ad" class="close-sticky-btn" title="Kapat" aria-label="Reklamı Gizle">✕</button>
            `;
        } else {
            inner.innerHTML = `
                <span class="sticky-ad-tag">${cfg.banner.tagText || 'SPONSORLU / AD'}</span>
                <div class="sticky-ad-content">
                    <span class="sticky-ad-text"><strong>${cfg.banner.titleText}</strong> - ${cfg.banner.subText}</span>
                    <a href="${cfg.banner.targetUrl}" class="ad-cta-link" target="_blank" rel="noopener noreferrer" style="margin-left: 10px;">${cfg.banner.ctaText}</a>
                </div>
                <button id="close-sticky-ad" class="close-sticky-btn" title="Kapat" aria-label="Reklamı Gizle">✕</button>
            `;
        }

        // Kapatma butonu olayını bağla
        const closeBtn = document.getElementById('close-sticky-ad');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                bar.style.display = 'none';
                document.body.style.paddingBottom = '0';
            });
        }
    }

    // Ortak Reklam Kartı HTML Üretici
    function buildAdCardHtml(cfg, contentClass) {
        const tag = (cfg.banner && cfg.banner.tagText) ? cfg.banner.tagText : 'REKLAM / SPONSOR';

        // 1. Özel Doğrudan HTML Embed
        if (cfg.type === 'custom' && cfg.customHtml) {
            return `
                <div class="ad-card">
                    <div class="ad-tag">${tag}</div>
                    <div class="ad-content ${contentClass}">
                        ${cfg.customHtml}
                    </div>
                </div>
            `;
        }

        // 2. Google AdSense
        if (cfg.type === 'adsense' && ADS_CONFIG.googleAdsense.enabled) {
            const client = ADS_CONFIG.googleAdsense.client;
            const slot = cfg.adsenseSlot || '';
            const format = cfg.adsenseFormat || 'auto';
            const layoutKey = cfg.adsenseLayoutKey ? `data-ad-layout-key="${cfg.adsenseLayoutKey}"` : '';

            return `
                <div class="ad-card">
                    <div class="ad-tag">${tag}</div>
                    <div class="ad-content ${contentClass}">
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="${client}"
                             data-ad-slot="${slot}"
                             data-ad-format="${format}"
                             ${layoutKey}
                             data-full-width-responsive="true"></ins>
                    </div>
                </div>
            `;
        }

        // 3. Özel Banner Görseli
        if (cfg.type === 'banner' && cfg.banner && cfg.banner.imageUrl) {
            return `
                <div class="ad-card">
                    <div class="ad-tag">${tag}</div>
                    <div class="ad-content ${contentClass}">
                        <a href="${cfg.banner.targetUrl}" target="_blank" rel="noopener noreferrer" class="ad-banner-link">
                            <img src="${cfg.banner.imageUrl}" alt="${cfg.banner.altText}" class="ad-banner-img">
                        </a>
                    </div>
                </div>
            `;
        }

        // 4. Varsayılan Şık Tanıtım & Sponsorluk Kutusu (Görsel veya kod girilmediğinde)
        const b = cfg.banner || {};
        return `
            <div class="ad-card">
                <div class="ad-tag">${tag}</div>
                <div class="ad-content ${contentClass}">
                    <div class="ad-placeholder-text">
                        <strong>${b.titleText || 'Reklam Alanı'}</strong>
                        <span>${b.subText || 'Google AdSense veya Sponsorlu Tanıtım Alanı'}</span>
                        <a href="${b.targetUrl || 'https://msoftis.blogspot.com/p/iletisim.html'}" class="ad-cta-link" target="_blank" rel="noopener noreferrer">
                            ${b.ctaText || 'Reklam Ver & İletişim ↗'}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function triggerAdsenseIfNeeded(cfg) {
        if (cfg.type === 'adsense' && ADS_CONFIG.googleAdsense.enabled && window.adsbygoogle) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                // AdSense henüz hazır değilse veya adblocker varsa sessizce geç
            }
        }
    }

    // DOM Hazır olduğunda çalıştır
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdsEngine);
    } else {
        initAdsEngine();
    }

    // Dışarıdan tetiklenebilmesi için fonksiyonu window nesnesine ata
    window.refreshKehribarAds = initAdsEngine;
})();
