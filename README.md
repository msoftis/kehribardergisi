# Kehribar Dergisi Portalı (Kehribardergisi.com)

> **Tüm Gazeteler, Haber Siteleri, Canlı TV, Online Radyo, İslam & İbadet Portalı ve Son Dakika Gelişmelerine Tek Sayfadan En Hızlı Erişim Kısayolu**

Referans model: [gazeteler.com](http://www.gazeteler.com/) konsepti ile modern, hızlı, kullanıcı odaklı ve Google AdSense gelir optimizasyonlu medya portali.

---

## 🌟 Öne Çıkan Özellikler

1. **Header & Arama Alanı:**
   - **Sol Başlık:** Şık ve zarif "KEHRİBAR" logo ve sloganı.
   - **Geniş Arama Alanı:** Sayfa içindeki yüzlerce bağlantıyı harf harf yazarken gerçek zamanlı (canlı) filtreleyen arama motoru. İsteğe bağlı olarak Google web aramasına doğrudan yönlendirir.
   - **Büyük Hamburger Menü:** Şık yan çekmece (slide-over drawer) ile tüm sayfalara, kategorilere, araçlara ve reklam alanlarına anında erişim.

2. **Kompakt & Kullanıcı Odaklı Tasarım:**
   - Hızlı tarama sağlayan küçük ve net fontlar (12-14px).
   - Tek sayfa (Single Page) yapısı sayesinde sıfır bekleme süresi, anlık gezinme.
   - Karanlık (Dark Mode) ve Aydınlık (Light Mode) tema desteği (tercih LocalStorage'da saklanır).

3. **Geniş Medya Arşivi & Sayfalar:**
   - **🏠 Ana Sayfa Portalı (`index.html`):** 
     - **En Son Haberler:** Ensonhaber.com canlı RSS akışından beslenen (`https://www.ensonhaber.com/rss/ensonhaber.xml`) modern, responsive haber slaytı (carousel) ve altı reklam alanı.
     - **Gazete Manşetleri:** Günlük 1. sayfalar (GazeteOku canlı entegrasyonu).
     - **Canlı Yaşam Servisleri:** Canlı piyasa bandı, 81 il namaz vakitleri (İslam portalı senkronizasyonu), hava durumu, nöbetçi eczaneler, Kandilli son depremler, TV rehberi, kamu & iş ilanları ve canlı RSS haber sekmeleri.
   - **🕌 İslam & İbadet Rehberi (`islam.html`):** 
     - Türkiye'nin 81 ilinin canlı namaz vakitleri ve sıradaki vakte geri sayım sayacı.
     - Kuran-ı Kerim 114 Sure Arapça tilavet, Türkçe meal, sure arama ve ayet gezinme alanı.
     - Günün Sahih Hadis-i Şerifleri ve Arapça metinleri.
     - Canlı altın nisaplı (Gram Altın API entegrasyonlu) Zekat Hesaplama motoru.
     - Esma-ül Hüsna (99 İsm-i Şerif) detaylı modal ve fihristi.
     - Günün Duaları ve Hicrî Takvim gösterimi.
   - **📰 Gazeteler & Manşetler (`gazete.html`):** Ulusal gazeteler (24+ gazete), günün 1. sayfa manşetleri, internet haber siteleri, spor basını, ekonomi basını ve 81 il yerel medya fihristi.
   - **📚 Dergiler (`dergi.html`):** Kehribar Dergisi özel vitrini (@kehribardergisi), edebiyat & şiir dergileri (Varlık, Hece, Notos vb.), popüler bilim ve teknoloji (Bilim ve Teknik, Popular Science vb.), tarih & felsefe, kültür-sanat, iş dünyası ve e-Dergi platformları (DergiPark vb.).
   - **📺 Canlı TV (`tv.html`):** Ulusal kanallar, 7/24 haber kanalları, spor kanalları, belgesel & kültür, çocuk & müzik kanalları, gömülü canlı yayın oynatıcısı ve TV rehberi.
   - **📻 Çevrim İçi Radyolar (`radyo.html`):** 40+ popüler Türk radyo istasyonu, doğrudan web/HLS canlı ses oynatıcısı, kategori filtreleme (Pop, Haber, Slow, Halk Müziği, Rock), ses seviyesi ve sessize alma kontrolleri, büyükşehirler FM frekans tablosu.
   - **🔒 Gizlilik Politikası (`gizlilik-politikasi.html`):** KVKK, GDPR, çerez politikası ve Google AdSense yasal beyanları.

4. **Modüler Bileşen Mimarisi (`components.js`):**
   - Ortak Header (Tarih, Hızlı Kısayollar, Tema Değiştirici, Canlı Arama Çubuğu, Hamburger Menü).
   - Ortalanmış Sayfalar Gezinme Menüsü (Tüm alt sayfalar tek tıkla erişilebilir).
   - Slide-Over Yan Çekmece Menü (Tüm sayfalara ve kategorilere mobil/masaüstü erişim).
   - Ortak Footer (Logo, açıklamalar, hızlı sayfa linkleri, künye ve başa dön butonu).
   - Merkezi Satış ve Çerez Onay Modalları.

5. **Merkezi Reklam Yönetimi (`ads.js`):**
   - `ADS_CONFIG` üzerinden tüm reklam pozisyonları tek merkezden yönetilebilir:
     - Üst Leaderboard (728x90)
     - Kare Reklam Kutusu (300x250)
     - Orta Akış İçi Banner (Responsive In-Feed)
     - Alt Leaderboard (728x90)
     - En Son Haberler Altı Boşluk Dolduran Reklam Alanı (300x250 / Responsive)
     - Sabit Alt Yapışkan Reklam (Sticky Bottom Bar 320x50 / 728x90)
   - Kolayca Google AdSense, özel görsel/link banner veya özel HTML moduna geçilebilir.

6. **Kapsamlı SEO & Arama Motoru Optimizasyonu:**
   - **XML Site Haritası (`sitemap.xml`):** Tüm portal sayfaları (`index.html`, `islam.html`, `gazete.html`, `tv.html`, `radyo.html`, `dergi.html`, `gizlilik-politikasi.html`) görsel bilgileri, tarama sıklıkları ve öncelikleriyle tanımlı.
   - **Robots.txt:** Googlebot, Googlebot-News, Googlebot-Image ve Bingbot için özel direktifler.
   - **Schema.org (JSON-LD):** WebSite, NewsMediaOrganization, ItemList, WebPage ve BreadcrumbList zengin snippet'leri.
   - **Open Graph & Twitter Cards:** Tüm sayfalarda WhatsApp, Facebook ve X önizlemeleri için tam meta etiket desteği.

---

## 🚀 Yerel Çalıştırma

Projeyi yerel sunucuda çalıştırmak için:

```bash
# Node.js http-server ile
npx --yes http-server -p 8080 -c-1
```

Tarayıcınızda açın:
- 🏠 **Ana Sayfa:** [http://localhost:8080/](http://localhost:8080/)
- 🕌 **İslam & İbadet:** [http://localhost:8080/islam.html](http://localhost:8080/islam.html)
- 📰 **Gazeteler:** [http://localhost:8080/gazete.html](http://localhost:8080/gazete.html)
- 📚 **Dergiler:** [http://localhost:8080/dergi.html](http://localhost:8080/dergi.html)
- 📺 **Canlı TV:** [http://localhost:8080/tv.html](http://localhost:8080/tv.html)
- 📻 **Radyolar:** [http://localhost:8080/radyo.html](http://localhost:8080/radyo.html)

---

## 📩 İletişim & Reklam

- **İletişim:** [MSoftis İletişim](https://msoftis.blogspot.com/p/iletisim.html)
- &copy; 2026 Kehribardergisi.com. Tüm hakları saklıdır.

