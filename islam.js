/**
 * KEHRİBAR MEDYA & İSLAM PORTALI - islam.js
 * Namaz Vakitleri (81 İl + Geri Sayım)
 * Kuran-ı Kerim Okuma Alanı (114 Sure, Arapça Uthmani + Diyanet Meali + Sesli Kıraat)
 * Günün Hadis-i Şerifi (Sunnetimiz.com API + Çevrim Dışı Güvenli Yedek)
 * Zekat Hesaplama Motoru (İslamicAPI Canlı Altın/Gümüş Nisabı)
 * Günün Esmaül Hüsna'sı (99 İsim, Arapça Kaligrafi, Ses & Anlam)
 * Günün Duası (Arapça, Transkripsiyon, Meal ve Faziletler)
 */

(function () {
    'use strict';

    const ISLAMIC_API_KEY = 'Dln6pnzdn1Fis8Ddmzjqie9yiJ6UYkM0txkcJ2cGjbwD008p';

    // 81 Türkiye İli Koordinat Tablosu
    const TURKEY_CITIES = [
        { id: 1, name: 'Adana', lat: 37.0000, lon: 35.3213 },
        { id: 2, name: 'Adıyaman', lat: 37.7648, lon: 38.2786 },
        { id: 3, name: 'Afyonkarahisar', lat: 38.7507, lon: 30.5567 },
        { id: 4, name: 'Ağrı', lat: 39.7191, lon: 43.0503 },
        { id: 5, name: 'Amasya', lat: 40.6534, lon: 35.8331 },
        { id: 6, name: 'Ankara', lat: 39.9334, lon: 32.8597 },
        { id: 7, name: 'Antalya', lat: 36.8969, lon: 30.7133 },
        { id: 8, name: 'Artvin', lat: 41.1828, lon: 41.8183 },
        { id: 9, name: 'Aydın', lat: 37.8560, lon: 27.8416 },
        { id: 10, name: 'Balıkesir', lat: 39.6484, lon: 27.8826 },
        { id: 11, name: 'Bilecik', lat: 40.1451, lon: 29.9799 },
        { id: 12, name: 'Bingöl', lat: 38.8855, lon: 40.4966 },
        { id: 13, name: 'Bitlis', lat: 38.4006, lon: 42.1095 },
        { id: 14, name: 'Bolu', lat: 40.7358, lon: 31.6061 },
        { id: 15, name: 'Burdur', lat: 37.7203, lon: 30.2908 },
        { id: 16, name: 'Bursa', lat: 40.1885, lon: 29.0610 },
        { id: 17, name: 'Çanakkale', lat: 40.1553, lon: 26.4142 },
        { id: 18, name: 'Çankırı', lat: 40.6013, lon: 33.6134 },
        { id: 19, name: 'Çorum', lat: 40.5506, lon: 34.9556 },
        { id: 20, name: 'Denizli', lat: 37.7765, lon: 29.0864 },
        { id: 21, name: 'Diyarbakır', lat: 37.9144, lon: 40.2306 },
        { id: 22, name: 'Edirne', lat: 41.6772, lon: 26.5557 },
        { id: 23, name: 'Elazığ', lat: 38.6810, lon: 39.2264 },
        { id: 24, name: 'Erzincan', lat: 39.7500, lon: 39.5000 },
        { id: 25, name: 'Erzurum', lat: 39.9000, lon: 41.2700 },
        { id: 26, name: 'Eskişehir', lat: 39.7767, lon: 30.5206 },
        { id: 27, name: 'Gaziantep', lat: 37.0662, lon: 37.3833 },
        { id: 28, name: 'Giresun', lat: 40.9128, lon: 38.3895 },
        { id: 29, name: 'Gümüşhane', lat: 40.4600, lon: 39.4700 },
        { id: 30, name: 'Hakkâri', lat: 37.5833, lon: 43.7333 },
        { id: 31, name: 'Hatay', lat: 36.4018, lon: 36.3498 },
        { id: 32, name: 'Isparta', lat: 37.7648, lon: 30.5566 },
        { id: 33, name: 'Mersin', lat: 36.8000, lon: 34.6333 },
        { id: 34, name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
        { id: 35, name: 'İzmir', lat: 38.4192, lon: 27.1287 },
        { id: 36, name: 'Kars', lat: 40.6167, lon: 43.1000 },
        { id: 37, name: 'Kastamonu', lat: 41.3887, lon: 33.7827 },
        { id: 38, name: 'Kayseri', lat: 38.7312, lon: 35.4787 },
        { id: 39, name: 'Kırklareli', lat: 41.7333, lon: 27.2167 },
        { id: 40, name: 'Kırşehir', lat: 39.1425, lon: 34.1709 },
        { id: 41, name: 'Kocaeli', lat: 40.8533, lon: 29.8815 },
        { id: 42, name: 'Konya', lat: 37.8667, lon: 32.4833 },
        { id: 43, name: 'Kütahya', lat: 39.4167, lon: 29.9833 },
        { id: 44, name: 'Malatya', lat: 38.3552, lon: 38.3095 },
        { id: 45, name: 'Manisa', lat: 38.6191, lon: 27.4289 },
        { id: 46, name: 'Kahramanmaraş', lat: 37.5858, lon: 36.9371 },
        { id: 47, name: 'Mardin', lat: 37.3212, lon: 40.7245 },
        { id: 48, name: 'Muğla', lat: 37.2153, lon: 28.3636 },
        { id: 49, name: 'Muş', lat: 38.7432, lon: 41.5064 },
        { id: 50, name: 'Nevşehir', lat: 38.6244, lon: 34.7142 },
        { id: 51, name: 'Niğde', lat: 37.9667, lon: 34.6833 },
        { id: 52, name: 'Ordu', lat: 40.9839, lon: 37.8764 },
        { id: 53, name: 'Rize', lat: 41.0201, lon: 40.5234 },
        { id: 54, name: 'Sakarya', lat: 40.7569, lon: 30.3783 },
        { id: 55, name: 'Samsun', lat: 41.2928, lon: 36.3313 },
        { id: 56, name: 'Siirt', lat: 37.9333, lon: 41.9500 },
        { id: 57, name: 'Sinop', lat: 42.0231, lon: 35.1531 },
        { id: 58, name: 'Sivas', lat: 39.7477, lon: 37.0179 },
        { id: 59, name: 'Tekirdağ', lat: 40.9833, lon: 27.5167 },
        { id: 60, name: 'Tokat', lat: 40.3167, lon: 36.5500 },
        { id: 61, name: 'Trabzon', lat: 41.0015, lon: 39.7178 },
        { id: 62, name: 'Tunceli', lat: 39.1079, lon: 39.5401 },
        { id: 63, name: 'Şanlıurfa', lat: 37.1591, lon: 38.7969 },
        { id: 64, name: 'Uşak', lat: 38.6823, lon: 29.4082 },
        { id: 65, name: 'Van', lat: 38.4891, lon: 43.4089 },
        { id: 66, name: 'Yozgat', lat: 39.8181, lon: 34.8147 },
        { id: 67, name: 'Zonguldak', lat: 41.4564, lon: 31.7987 },
        { id: 68, name: 'Aksaray', lat: 38.3687, lon: 34.0370 },
        { id: 69, name: 'Bayburt', lat: 40.2552, lon: 40.2249 },
        { id: 70, name: 'Karaman', lat: 37.1759, lon: 33.2287 },
        { id: 71, name: 'Kırıkkale', lat: 39.8468, lon: 33.5153 },
        { id: 72, name: 'Batman', lat: 37.8812, lon: 41.1293 },
        { id: 73, name: 'Şırnak', lat: 37.5164, lon: 42.4594 },
        { id: 74, name: 'Bartın', lat: 41.6344, lon: 32.3375 },
        { id: 75, name: 'Ardahan', lat: 41.1105, lon: 42.7022 },
        { id: 76, name: 'Iğdır', lat: 39.9196, lon: 44.0454 },
        { id: 77, name: 'Yalova', lat: 40.6500, lon: 29.2667 },
        { id: 78, name: 'Karabük', lat: 41.2061, lon: 32.6204 },
        { id: 79, name: 'Kilis', lat: 36.7184, lon: 37.1212 },
        { id: 80, name: 'Osmaniye', lat: 37.0742, lon: 36.2478 },
        { id: 81, name: 'Düzce', lat: 40.8438, lon: 31.1565 }
    ];

    // 114 Sure Listesi (Hızlı erişim ve arama için)
    const SURAH_LIST = [
        { no: 1, name: 'Fâtiha', ar: 'الفاتحة', ayahs: 7, type: 'Mekki' },
        { no: 2, name: 'Bakara', ar: 'البقرة', ayahs: 286, type: 'Medeni' },
        { no: 3, name: 'Âl-i İmrân', ar: 'آل عمران', ayahs: 200, type: 'Medeni' },
        { no: 4, name: 'Nisâ', ar: 'النساء', ayahs: 176, type: 'Medeni' },
        { no: 5, name: 'Mâide', ar: 'المائدة', ayahs: 120, type: 'Medeni' },
        { no: 6, name: 'En\'âm', ar: 'الأنعام', ayahs: 165, type: 'Mekki' },
        { no: 7, name: 'A\'râf', ar: 'الأعراف', ayahs: 206, type: 'Mekki' },
        { no: 8, name: 'Enfâl', ar: 'الأنفال', ayahs: 75, type: 'Medeni' },
        { no: 9, name: 'Tevbe', ar: 'التوبة', ayahs: 129, type: 'Medeni' },
        { no: 10, name: 'Yûnus', ar: 'يونس', ayahs: 109, type: 'Mekki' },
        { no: 11, name: 'Hûd', ar: 'هود', ayahs: 123, type: 'Mekki' },
        { no: 12, name: 'Yûsuf', ar: 'يوسف', ayahs: 111, type: 'Mekki' },
        { no: 13, name: 'Ra\'d', ar: 'الرعد', ayahs: 43, type: 'Medeni' },
        { no: 14, name: 'İbrâhîm', ar: 'إبراهيم', ayahs: 52, type: 'Mekki' },
        { no: 15, name: 'Hicr', ar: 'الحجر', ayahs: 99, type: 'Mekki' },
        { no: 16, name: 'Nahl', ar: 'النحل', ayahs: 128, type: 'Mekki' },
        { no: 17, name: 'İsrâ', ar: 'الإسراء', ayahs: 111, type: 'Mekki' },
        { no: 18, name: 'Kehf', ar: 'الكهف', ayahs: 110, type: 'Mekki' },
        { no: 19, name: 'Meryem', ar: 'مريم', ayahs: 98, type: 'Mekki' },
        { no: 20, name: 'Tâhâ', ar: 'طه', ayahs: 135, type: 'Mekki' },
        { no: 21, name: 'Enbiyâ', ar: 'الأنبياء', ayahs: 112, type: 'Mekki' },
        { no: 22, name: 'Hac', ar: 'الحج', ayahs: 78, type: 'Medeni' },
        { no: 23, name: 'Mü\'minûn', ar: 'المؤمنون', ayahs: 118, type: 'Mekki' },
        { no: 24, name: 'Nûr', ar: 'النور', ayahs: 64, type: 'Medeni' },
        { no: 25, name: 'Furkân', ar: 'الفرقان', ayahs: 77, type: 'Mekki' },
        { no: 26, name: 'Şuarâ', ar: 'الشعراء', ayahs: 227, type: 'Mekki' },
        { no: 27, name: 'Neml', ar: 'النمل', ayahs: 93, type: 'Mekki' },
        { no: 28, name: 'Kasas', ar: 'القصص', ayahs: 88, type: 'Mekki' },
        { no: 29, name: 'Ankebût', ar: 'العنكبوت', ayahs: 69, type: 'Mekki' },
        { no: 30, name: 'Rûm', ar: 'الروم', ayahs: 60, type: 'Mekki' },
        { no: 31, name: 'Lokmân', ar: 'لقمان', ayahs: 34, type: 'Mekki' },
        { no: 32, name: 'Secde', ar: 'السجدة', ayahs: 30, type: 'Mekki' },
        { no: 33, name: 'Ahzâb', ar: 'الأحزاب', ayahs: 73, type: 'Medeni' },
        { no: 34, name: 'Sebe\'', ar: 'سبأ', ayahs: 54, type: 'Mekki' },
        { no: 35, name: 'Fâtır', ar: 'فاطر', ayahs: 45, type: 'Mekki' },
        { no: 36, name: 'Yâsîn', ar: 'يس', ayahs: 83, type: 'Mekki' },
        { no: 37, name: 'Sâffât', ar: 'الصافات', ayahs: 182, type: 'Mekki' },
        { no: 38, name: 'Sâd', ar: 'ص', ayahs: 88, type: 'Mekki' },
        { no: 39, name: 'Zümer', ar: 'الزمر', ayahs: 75, type: 'Mekki' },
        { no: 40, name: 'Mü\'min (Gâfir)', ar: 'غافر', ayahs: 85, type: 'Mekki' },
        { no: 41, name: 'Fussilet', ar: 'فصلت', ayahs: 54, type: 'Mekki' },
        { no: 42, name: 'Şûrâ', ar: 'الشورى', ayahs: 53, type: 'Mekki' },
        { no: 43, name: 'Zuhruf', ar: 'الزخرف', ayahs: 89, type: 'Mekki' },
        { no: 44, name: 'Duhân', ar: 'الدخان', ayahs: 59, type: 'Mekki' },
        { no: 45, name: 'Câsiye', ar: 'الجاثية', ayahs: 37, type: 'Mekki' },
        { no: 46, name: 'Ahkâf', ar: 'الأحقاف', ayahs: 35, type: 'Mekki' },
        { no: 47, name: 'Muhammed', ar: 'محمد', ayahs: 38, type: 'Medeni' },
        { no: 48, name: 'Fetih', ar: 'الفتح', ayahs: 29, type: 'Medeni' },
        { no: 49, name: 'Hucurât', ar: 'الحجرات', ayahs: 18, type: 'Medeni' },
        { no: 50, name: 'Kâf', ar: 'ق', ayahs: 45, type: 'Mekki' },
        { no: 51, name: 'Zâriyât', ar: 'الذاريات', ayahs: 60, type: 'Mekki' },
        { no: 52, name: 'Tûr', ar: 'الطور', ayahs: 49, type: 'Mekki' },
        { no: 53, name: 'Necm', ar: 'النجم', ayahs: 62, type: 'Mekki' },
        { no: 54, name: 'Kamer', ar: 'القمر', ayahs: 55, type: 'Mekki' },
        { no: 55, name: 'Rahmân', ar: 'الرحمن', ayahs: 78, type: 'Medeni' },
        { no: 56, name: 'Vâkıa', ar: 'الواقعة', ayahs: 96, type: 'Mekki' },
        { no: 57, name: 'Hadîd', ar: 'الحديد', ayahs: 29, type: 'Medeni' },
        { no: 58, name: 'Mücâdele', ar: 'المجادلة', ayahs: 22, type: 'Medeni' },
        { no: 59, name: 'Haşr', ar: 'الحشر', ayahs: 24, type: 'Medeni' },
        { no: 60, name: 'Mümtehine', ar: 'الممتحنة', ayahs: 13, type: 'Medeni' },
        { no: 61, name: 'Saf', ar: 'الصف', ayahs: 14, type: 'Medeni' },
        { no: 62, name: 'Cuma', ar: 'الجمعة', ayahs: 11, type: 'Medeni' },
        { no: 63, name: 'Münâfikûn', ar: 'المنافقون', ayahs: 11, type: 'Medeni' },
        { no: 64, name: 'Teğâbün', ar: 'التغابن', ayahs: 18, type: 'Medeni' },
        { no: 65, name: 'Talâk', ar: 'الطلاق', ayahs: 12, type: 'Medeni' },
        { no: 66, name: 'Tahrîm', ar: 'التحريم', ayahs: 12, type: 'Medeni' },
        { no: 67, name: 'Mülk', ar: 'الملك', ayahs: 30, type: 'Mekki' },
        { no: 68, name: 'Kalem', ar: 'القلم', ayahs: 52, type: 'Mekki' },
        { no: 69, name: 'Hâkka', ar: 'الحاقة', ayahs: 52, type: 'Mekki' },
        { no: 70, name: 'Meâric', ar: 'المعارج', ayahs: 44, type: 'Mekki' },
        { no: 71, name: 'Nûh', ar: 'نوح', ayahs: 28, type: 'Mekki' },
        { no: 72, name: 'Cin', ar: 'الجن', ayahs: 28, type: 'Mekki' },
        { no: 73, name: 'Müzzemmil', ar: 'المزمل', ayahs: 20, type: 'Mekki' },
        { no: 74, name: 'Müddessir', ar: 'المدثر', ayahs: 56, type: 'Mekki' },
        { no: 75, name: 'Kıyâme', ar: 'القيامة', ayahs: 40, type: 'Mekki' },
        { no: 76, name: 'İnsân', ar: 'الإنسان', ayahs: 31, type: 'Medeni' },
        { no: 77, name: 'Mürselât', ar: 'المرسلات', ayahs: 50, type: 'Mekki' },
        { no: 78, name: 'Nebe\'', ar: 'النبأ', ayahs: 40, type: 'Mekki' },
        { no: 79, name: 'Nâziât', ar: 'النازعات', ayahs: 46, type: 'Mekki' },
        { no: 80, name: 'Abese', ar: 'عبس', ayahs: 42, type: 'Mekki' },
        { no: 81, name: 'Tekvîr', ar: 'التكوير', ayahs: 29, type: 'Mekki' },
        { no: 82, name: 'İnfitâr', ar: 'الانفطار', ayahs: 19, type: 'Mekki' },
        { no: 83, name: 'Mutaffifîn', ar: 'المطففين', ayahs: 36, type: 'Mekki' },
        { no: 84, name: 'İnşikâk', ar: 'الانشقاق', ayahs: 25, type: 'Mekki' },
        { no: 85, name: 'Bürûc', ar: 'البروج', ayahs: 22, type: 'Mekki' },
        { no: 86, name: 'Târık', ar: 'الطارق', ayahs: 17, type: 'Mekki' },
        { no: 87, name: 'A\'lâ', ar: 'الأعلى', ayahs: 19, type: 'Mekki' },
        { no: 88, name: 'Gâşiye', ar: 'الغاشية', ayahs: 26, type: 'Mekki' },
        { no: 89, name: 'Fecr', ar: 'الفجر', ayahs: 30, type: 'Mekki' },
        { no: 90, name: 'Beled', ar: 'البلد', ayahs: 20, type: 'Mekki' },
        { no: 91, name: 'Şems', ar: 'الشمس', ayahs: 15, type: 'Mekki' },
        { no: 92, name: 'Leyl', ar: 'الليل', ayahs: 21, type: 'Mekki' },
        { no: 93, name: 'Duhâ', ar: 'الضحى', ayahs: 11, type: 'Mekki' },
        { no: 94, name: 'İnşirâh', ar: 'الشرح', ayahs: 8, type: 'Mekki' },
        { no: 95, name: 'Tîn', ar: 'التين', ayahs: 8, type: 'Mekki' },
        { no: 96, name: 'Alak', ar: 'العلق', ayahs: 19, type: 'Mekki' },
        { no: 97, name: 'Kadir', ar: 'القدر', ayahs: 5, type: 'Mekki' },
        { no: 98, name: 'Beyyine', ar: 'البينة', ayahs: 8, type: 'Medeni' },
        { no: 99, name: 'Zilzâl', ar: 'الزلزلة', ayahs: 8, type: 'Medeni' },
        { no: 100, name: 'Âdiyât', ar: 'العاديات', ayahs: 11, type: 'Mekki' },
        { no: 101, name: 'Kâria', ar: 'القارعة', ayahs: 11, type: 'Mekki' },
        { no: 102, name: 'Tekâsür', ar: 'التكاثر', ayahs: 8, type: 'Mekki' },
        { no: 103, name: 'Asr', ar: 'العصر', ayahs: 3, type: 'Mekki' },
        { no: 104, name: 'Hümeze', ar: 'الهمزة', ayahs: 9, type: 'Mekki' },
        { no: 105, name: 'Fîl', ar: 'الفيل', ayahs: 5, type: 'Mekki' },
        { no: 106, name: 'Kureyş', ar: 'قريش', ayahs: 4, type: 'Mekki' },
        { no: 107, name: 'Mâûn', ar: 'الماعون', ayahs: 7, type: 'Mekki' },
        { no: 108, name: 'Kevser', ar: 'الكوثر', ayahs: 3, type: 'Mekki' },
        { no: 109, name: 'Kâfirûn', ar: 'الكافرون', ayahs: 6, type: 'Mekki' },
        { no: 110, name: 'Nasr', ar: 'النصر', ayahs: 3, type: 'Medeni' },
        { no: 111, name: 'Tebbet', ar: 'المسد', ayahs: 5, type: 'Mekki' },
        { no: 112, name: 'İhlâs', ar: 'الإخلاص', ayahs: 4, type: 'Mekki' },
        { no: 113, name: 'Felak', ar: 'الفلق', ayahs: 5, type: 'Mekki' },
        { no: 114, name: 'Nâs', ar: 'الناس', ayahs: 6, type: 'Mekki' }
    ];

    // Yedek / Hazır Sahih Hadisler
    const CURATED_HADITHS = [
        {
            source: 'Sahih-i Buhârî, Bed\'ü\'l-Vahy, 1',
            book: 'Sahih-i Buhârî',
            arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
            turkish: 'Hz. Ömer (r.a.) nakleder; Resûlullah (s.a.v.) şöyle buyurdu: "Ameller ancak niyetlere göredir ve her kişi için ancak niyet ettiği şey vardır."',
            grade: 'Sahih'
        },
        {
            source: 'Sahih-i Müslim, Îmân, 93',
            book: 'Sahih-i Müslim',
            arabic: 'الدِّينُ النَّصِيحَةُ، قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ',
            turkish: 'Temîm ed-Dârî (r.a.) rivayet eder: Resûlullah (s.a.v.) "Din nasihattir (samimiyettir)" buyurdu. Biz "Kime karşı ya Resûlallah?" dedik. O da: "Allah\'a, Kitabına, Resûlüne, Müslümanların yöneticilerine ve bütün müminlere" buyurdu.',
            grade: 'Sahih'
        },
        {
            source: 'Sahih-i Buhârî, Îmân, 7',
            book: 'Sahih-i Buhârî',
            arabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
            turkish: 'Enes b. Mâlik (r.a.) nakleder: Resûlullah (s.a.v.) şöyle buyurdu: "Sizden biri, kendisi için istediğini Müslüman kardeşi için de istemedikçe tam iman etmiş olmaz."',
            grade: 'Sahih'
        },
        {
            source: 'Tirmizî, Birr, 36',
            book: 'Sünen-i Tirmizî',
            arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
            turkish: 'Ebû Zer (r.a.) rivayet eder: Peygamber Efendimiz (s.a.v.) buyurdu: "Kardeşinin yüzüne tebessüm etmen senin için bir sadakadır."',
            grade: 'Hasen-Sahih'
        },
        {
            source: 'Sahih-i Buhârî, Edeb, 27',
            book: 'Sahih-i Buhârî',
            arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
            turkish: 'Ebû Hüreyre (r.a.) nakleder; Nebî (s.a.v.) şöyle buyurdu: "Allah\'a ve âhiret gününe inanan kimse ya hayır söylesin ya da sussun."',
            grade: 'Sahih'
        },
        {
            source: 'Sahih-i Müslim, Zikir, 38',
            book: 'Sahih-i Müslim',
            arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
            turkish: 'Ebû Hüreyre (r.a.) anlatıyor; Resûlullah (s.a.v.) buyurdu: "Kim ilim öğrenmek için bir yola girerse, Allah ona cennete giden yolu kolaylaştırır."',
            grade: 'Sahih'
        }
    ];

    // Durum Değişkenleri
    let currentPrayerTimes = null;
    let prayerCountdownInterval = null;
    let currentSurahNumber = 1;
    let currentAudio = null;
    let currentPlayingAyah = null;
    let currentQuranView = 'both'; // 'both' | 'arabic' | 'turkish'
    let currentFontSize = 1; // 1 = normal, 1.2 = büyük, 1.4 = ekstra
    let allEsmaList = [];
    let liveGoldPricePerGram = 6569.24;
    let liveGoldNisabAmount = 574677.12;

    // =========================================================================
    // 1. NAMAZ VAKİTLERİ YÖNETİMİ
    // =========================================================================
    function initPrayerTimes() {
        const citySelect = document.getElementById('namaz-city-select');
        if (!citySelect) return;

        // 81 İli doldur
        citySelect.innerHTML = TURKEY_CITIES.map(c => 
            `<option value="${c.id}" ${c.name === 'İstanbul' ? 'selected' : ''}>${c.name} (${c.id < 10 ? '0' + c.id : c.id})</option>`
        ).join('');

        // Şehir değişikliğini dinle
        citySelect.addEventListener('change', function () {
            const selectedId = parseInt(this.value, 10);
            const city = TURKEY_CITIES.find(c => c.id === selectedId) || TURKEY_CITIES[33];
            localStorage.setItem('kehribar_islam_city', city.id);
            fetchPrayerTimes(city);
        });

        // Kayıtlı şehri getir veya varsayılan İstanbul
        const savedCityId = parseInt(localStorage.getItem('kehribar_islam_city'), 10) || 34;
        citySelect.value = savedCityId;
        const defaultCity = TURKEY_CITIES.find(c => c.id === savedCityId) || TURKEY_CITIES[33];
        fetchPrayerTimes(defaultCity);
    }

    async function fetchPrayerTimes(city) {
        const statusEl = document.getElementById('namaz-status');
        if (statusEl) statusEl.textContent = `${city.name} vakitleri güncelleniyor...`;

        try {
            // Birinci Tercih: IslamicAPI (lat & lon ile %100 başarı)
            const apiUrl = `https://islamicapi.com/api/v1/prayer-time/?lat=${city.lat}&lon=${city.lon}&api_key=${ISLAMIC_API_KEY}`;
            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            if (json && json.data && json.data.times) {
                renderPrayerTimes(city, json.data.times, json.data.date);
                return;
            }
            throw new Error('IslamicAPI geçersiz veri');
        } catch (err) {
            console.warn('IslamicAPI hatası, Aladhan yedeğine geçiliyor:', err);
            // Yedek: Aladhan API (Diyanet metodu 13)
            try {
                const backupUrl = `https://api.aladhan.com/v1/timings?latitude=${city.lat}&longitude=${city.lon}&method=13`;
                const bRes = await fetch(backupUrl);
                const bJson = await bRes.json();
                if (bJson && bJson.data && bJson.data.timings) {
                    renderPrayerTimes(city, bJson.data.timings, bJson.data.date);
                    return;
                }
            } catch (bErr) {
                console.error('Yedek Aladhan API de yanıt vermedi:', bErr);
            }
        }
    }

    function renderPrayerTimes(city, times, dateInfo) {
        // Vakit isimlerini eşleştir
        const prayerData = [
            { id: 'fajr', name: 'İmsak', time: times.Imsak || times.Fajr || '--:--', icon: '🌌' },
            { id: 'sunrise', name: 'Güneş', time: times.Sunrise || '--:--', icon: '🌅' },
            { id: 'dhuhr', name: 'Öğle', time: times.Dhuhr || '--:--', icon: '☀️' },
            { id: 'asr', name: 'İkindi', time: times.Asr || '--:--', icon: '🌤️' },
            { id: 'maghrib', name: 'Akşam', time: times.Maghrib || times.Sunset || '--:--', icon: '🌇' },
            { id: 'isha', name: 'Yatsı', time: times.Isha || '--:--', icon: '🌙' }
        ];

        currentPrayerTimes = prayerData;

        // Grid'i render et
        const grid = document.getElementById('namaz-cards-grid');
        if (grid) {
            grid.innerHTML = prayerData.map(p => `
                <div class="namaz-card" id="card-${p.id}">
                    <span class="namaz-icon">${p.icon}</span>
                    <div class="namaz-name">${p.name}</div>
                    <div class="namaz-time">${p.time}</div>
                </div>
            `).join('');
        }

        // Tarih Bilgilerini Güncelle
        if (dateInfo) {
            const gregorianEl = document.getElementById('hero-gregorian-date');
            const hijriEl = document.getElementById('hero-hijri-date');

            if (gregorianEl) {
                const now = new Date();
                const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
                gregorianEl.textContent = now.toLocaleDateString('tr-TR', options);
            }

            if (hijriEl && dateInfo.hijri) {
                if (typeof dateInfo.hijri === 'object' && dateInfo.hijri.date) {
                    hijriEl.textContent = `🌙 ${dateInfo.hijri.date} Hicrî`;
                } else if (dateInfo.hijri.day && dateInfo.hijri.month) {
                    hijriEl.textContent = `🌙 ${dateInfo.hijri.day} ${dateInfo.hijri.month.tr || dateInfo.hijri.month.en} ${dateInfo.hijri.year}`;
                }
            }
        }

        // Geri sayımı ve aktif vakti başlat
        startPrayerCountdown();
    }

    function startPrayerCountdown() {
        if (prayerCountdownInterval) clearInterval(prayerCountdownInterval);

        function tick() {
            if (!currentPrayerTimes || currentPrayerTimes.length === 0) return;

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const currentSeconds = now.getSeconds();

            // Vakitleri dakikaya çevir
            const parsed = currentPrayerTimes.map(p => {
                const parts = p.time.split(':');
                const m = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
                return { ...p, minutes: m };
            });

            // Aktif vakit ve bir sonraki vakti bul
            let activeIdx = 0;
            let nextIdx = 0;

            for (let i = 0; i < parsed.length; i++) {
                if (currentMinutes >= parsed[i].minutes) {
                    activeIdx = i;
                }
            }

            nextIdx = (activeIdx + 1) % parsed.length;
            const nextPrayer = parsed[nextIdx];

            // Kalan süreyi hesapla
            let diffMinutes = nextPrayer.minutes - currentMinutes;
            if (diffMinutes <= 0) {
                diffMinutes += 24 * 60; // Gece yarısı devri
            }

            let remainSecTotal = diffMinutes * 60 - currentSeconds;
            if (remainSecTotal < 0) remainSecTotal = 0;

            const remHours = Math.floor(remainSecTotal / 3600);
            const remMins = Math.floor((remainSecTotal % 3600) / 60);
            const remSecs = remainSecTotal % 60;

            const format = (n) => (n < 10 ? '0' + n : n);
            const timerStr = `${format(remHours)}:${format(remMins)}:${format(remSecs)}`;

            // UI Güncelle
            const nextBadge = document.getElementById('namaz-next-badge');
            if (nextBadge) {
                nextBadge.innerHTML = `
                    <span>Sonraki Vakit: <strong>${nextPrayer.name}</strong></span>
                    <span class="namaz-countdown-timer">${timerStr}</span>
                `;
            }

            // Aktif kart vurgusu
            currentPrayerTimes.forEach((p, idx) => {
                const el = document.getElementById(`card-${p.id}`);
                if (el) {
                    if (idx === activeIdx) {
                        el.classList.add('active-prayer');
                    } else {
                        el.classList.remove('active-prayer');
                    }
                }
            });
        }

        tick();
        prayerCountdownInterval = setInterval(tick, 1000);
    }

    // =========================================================================
    // 2. KURAN-I KERİM OKUMA VE DİNLEME ALANI
    // =========================================================================
    function initQuranReader() {
        const surahSelect = document.getElementById('quran-surah-select');
        const ayahSelect = document.getElementById('quran-ayah-select');
        if (!surahSelect) return;

        // Sureleri Doldur
        surahSelect.innerHTML = SURAH_LIST.map(s => 
            `<option value="${s.no}">${s.no}. ${s.name} (${s.ar}) - ${s.ayahs} Ayet</option>`
        ).join('');

        surahSelect.addEventListener('change', function () {
            currentSurahNumber = parseInt(this.value, 10);
            loadSurah(currentSurahNumber);
        });

        // Görünüm Modu Değiştiricileri
        document.querySelectorAll('.quran-toggle-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.quran-toggle-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentQuranView = this.getAttribute('data-view');
                applyQuranView();
            });
        });

        // Yazı Boyutu Kontrolleri
        const btnFontInc = document.getElementById('font-inc');
        const btnFontDec = document.getElementById('font-dec');

        if (btnFontInc) {
            btnFontInc.addEventListener('click', () => {
                if (currentFontSize < 1.6) currentFontSize += 0.15;
                updateAyahFontSize();
            });
        }
        if (btnFontDec) {
            btnFontDec.addEventListener('click', () => {
                if (currentFontSize > 0.85) currentFontSize -= 0.15;
                updateAyahFontSize();
            });
        }

        // Sureyi Başlat (Varsayılan 1. Fâtiha)
        loadSurah(1);
    }

    async function loadSurah(surahNo) {
        const listEl = document.getElementById('ayah-list');
        const surahHeaderEl = document.getElementById('surah-header-container');
        const meta = SURAH_LIST.find(s => s.no === surahNo) || SURAH_LIST[0];

        // Ayet Seçim Kutusunu Doldur
        const ayahSelect = document.getElementById('quran-ayah-select');
        if (ayahSelect) {
            ayahSelect.innerHTML = `<option value="0">Hızlı Ayet Seçimi (1-${meta.ayahs})</option>` +
                Array.from({ length: meta.ayahs }, (_, i) => `<option value="${i + 1}">Ayet ${i + 1}</option>`).join('');
            ayahSelect.onchange = function () {
                const val = parseInt(this.value, 10);
                if (val > 0) {
                    const targetAyah = document.getElementById(`ayah-${val}`);
                    if (targetAyah) targetAyah.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            };
        }

        // Sure Başlığını Render Et
        if (surahHeaderEl) {
            surahHeaderEl.innerHTML = `
                <div class="surah-header-card">
                    <div class="surah-header-arabic">${meta.ar}</div>
                    <div class="surah-header-turkish">${meta.no}. ${meta.name} Suresi</div>
                    <div class="surah-meta-badges">
                        <span class="surah-badge">📍 ${meta.type}</span>
                        <span class="surah-badge">📖 ${meta.ayahs} Ayet</span>
                        <span class="surah-badge">🎙️ M. R. Alafasy Tilaveti</span>
                    </div>
                    <div class="surah-audio-player-wrapper">
                        <button class="surah-play-btn" id="surah-full-audio-btn">
                            <span id="surah-play-icon">▶</span>
                            <span>Sureyi Baştan Sona Dinle</span>
                        </button>
                    </div>
                </div>
                ${meta.no !== 9 && meta.no !== 1 ? '<div class="bismillah-box">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>' : ''}
            `;

            // Tam sure çalma butonu dinleyicisi
            const fullPlayBtn = document.getElementById('surah-full-audio-btn');
            if (fullPlayBtn) {
                fullPlayBtn.addEventListener('click', () => toggleSurahAudio(meta.no));
            }
        }

        // Ayet Listesini Yükle
        if (listEl) {
            listEl.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-muted);"><span style="font-size:24px;">⏳</span><br>Ayetler ve Diyanet meali yükleniyor...</div>';
        }

        try {
            const url = `https://api.alquran.cloud/v1/surah/${surahNo}/editions/quran-uthmani,tr.diyanet`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Ayet verisi alınamadı');
            const json = await res.json();

            if (json && json.data && json.data.length >= 2) {
                const arabicData = json.data[0].ayahs;
                const turkishData = json.data[1].ayahs;

                renderAyahs(arabicData, turkishData, meta);
            }
        } catch (err) {
            console.error('Kuran API hatası:', err);
            if (listEl) {
                listEl.innerHTML = '<div style="text-align:center; padding:20px; color:#dc2626;">Ayetler yüklenirken bir bağlantı sorunu oluştu. Lütfen tekrar deneyiniz.</div>';
            }
        }
    }

    function renderAyahs(arabicAyahs, turkishAyahs, surahMeta) {
        const listEl = document.getElementById('ayah-list');
        if (!listEl) return;

        const html = arabicAyahs.map((ar, idx) => {
            const tr = turkishAyahs[idx] || { text: '' };
            const ayahNo = ar.numberInSurah;
            const globalNo = ar.number;

            return `
                <div class="ayah-card" id="ayah-${ayahNo}" data-global-number="${globalNo}" data-surah="${surahMeta.no}" data-ayah="${ayahNo}">
                    <div class="ayah-header">
                        <span class="ayah-badge">${surahMeta.name} Suresi • Ayet ${ayahNo}</span>
                        <div class="ayah-actions">
                            <button type="button" class="ayah-action-btn ayah-play-btn" data-audio-number="${globalNo}" title="Bu Ayeti Dinle">▶ Dinle</button>
                            <button type="button" class="ayah-action-btn ayah-copy-btn" data-ayah-no="${ayahNo}" title="Arapça ve Meali Kopyala">📋 Kopyala</button>
                        </div>
                    </div>
                    <div class="ayah-arabic">${ar.text} <span style="font-size: 0.9em; color: var(--islam-gold);">۝${ayahNo}</span></div>
                    <div class="ayah-turkish">${tr.text}</div>
                </div>
            `;
        }).join('');

        listEl.innerHTML = html;

        // Dinleme ve Kopyalama Olaylarını Bağla
        listEl.querySelectorAll('.ayah-play-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const globalNum = this.getAttribute('data-audio-number');
                const card = this.closest('.ayah-card');
                playSingleAyah(globalNum, card, this);
            });
        });

        listEl.querySelectorAll('.ayah-copy-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const card = this.closest('.ayah-card');
                const arText = card.querySelector('.ayah-arabic').textContent.trim();
                const trText = card.querySelector('.ayah-turkish').textContent.trim();
                const ayahNo = this.getAttribute('data-ayah-no');
                const copyStr = `[${surahMeta.name} Suresi, ${ayahNo}. Ayet]\n${arText}\n\nMeali: ${trText}\n(Kaynak: Kehribar Dini Portalı / Diyanet Meali)`;

                navigator.clipboard.writeText(copyStr).then(() => {
                    const orig = this.textContent;
                    this.textContent = '✓ Kopyalandı!';
                    setTimeout(() => { this.textContent = orig; }, 2000);
                });
            });
        });

        applyQuranView();
        updateAyahFontSize();
    }

    function playSingleAyah(globalNumber, cardEl, btnEl) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        // Önceki kartların playing sınıfını temizle
        document.querySelectorAll('.ayah-card.playing').forEach(c => c.classList.remove('playing'));
        document.querySelectorAll('.ayah-play-btn').forEach(b => b.textContent = '▶ Dinle');

        if (currentPlayingAyah === globalNumber) {
            currentPlayingAyah = null;
            return;
        }

        const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNumber}.mp3`;
        const audio = new Audio(audioUrl);
        currentAudio = audio;
        currentPlayingAyah = globalNumber;

        cardEl.classList.add('playing');
        btnEl.textContent = '⏸ Durdur';

        audio.play().catch(e => {
            console.error('Ses oynatılamadı:', e);
            btnEl.textContent = '▶ Dinle';
            cardEl.classList.remove('playing');
        });

        audio.onended = () => {
            cardEl.classList.remove('playing');
            btnEl.textContent = '▶ Dinle';
            currentPlayingAyah = null;
        };
    }

    function toggleSurahAudio(surahNo) {
        const btn = document.getElementById('surah-full-audio-btn');
        const icon = document.getElementById('surah-play-icon');

        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
            if (icon) icon.textContent = '▶';
            if (btn) btn.querySelector('span:last-child').textContent = 'Sureyi Baştan Sona Dinle';
            return;
        }

        const paddedNo = surahNo < 10 ? '00' + surahNo : (surahNo < 100 ? '0' + surahNo : '' + surahNo);
        const fullSurahAudioUrl = `https://server8.mp3quran.net/afs/${paddedNo}.mp3`;

        const audio = new Audio(fullSurahAudioUrl);
        currentAudio = audio;

        if (icon) icon.textContent = '⏸';
        if (btn) btn.querySelector('span:last-child').textContent = 'Tilaveti Durdur';

        audio.play().catch(e => {
            console.error('Sure sesi çalınamadı:', e);
            if (icon) icon.textContent = '▶';
        });

        audio.onended = () => {
            if (icon) icon.textContent = '▶';
            if (btn) btn.querySelector('span:last-child').textContent = 'Sureyi Baştan Sona Dinle';
            currentAudio = null;
        };
    }

    function applyQuranView() {
        const cards = document.querySelectorAll('.ayah-card');
        cards.forEach(card => {
            const ar = card.querySelector('.ayah-arabic');
            const tr = card.querySelector('.ayah-turkish');
            if (!ar || !tr) return;

            if (currentQuranView === 'arabic') {
                ar.style.display = 'block';
                tr.style.display = 'none';
            } else if (currentQuranView === 'turkish') {
                ar.style.display = 'none';
                tr.style.display = 'block';
            } else {
                ar.style.display = 'block';
                tr.style.display = 'block';
            }
        });
    }

    function updateAyahFontSize() {
        const arList = document.querySelectorAll('.ayah-arabic');
        const trList = document.querySelectorAll('.ayah-turkish');

        arList.forEach(el => { el.style.fontSize = `${1.65 * currentFontSize}rem`; });
        trList.forEach(el => { el.style.fontSize = `${1.0 * currentFontSize}rem`; });
    }

    // =========================================================================
    // 3. GÜNÜN HADİS-İ ŞERİFİ (Sunnetimiz.com API & Yedek Motor)
    // =========================================================================
    function initDailyHadith() {
        const refreshBtn = document.getElementById('hadith-refresh-btn');
        const copyBtn = document.getElementById('hadith-copy-btn');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', fetchRandomHadith);
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const tr = document.getElementById('hadith-turkish-text')?.textContent || '';
                const source = document.getElementById('hadith-source-book')?.textContent || '';
                const fullText = `Günün Hadis-i Şerifi:\n"${tr}"\nKaynak: ${source}\n(Kehribar Medya İslâm Rehberi)`;
                
                navigator.clipboard.writeText(fullText).then(() => {
                    const orig = copyBtn.textContent;
                    copyBtn.textContent = '✓ Kopyalandı!';
                    setTimeout(() => { copyBtn.textContent = orig; }, 2000);
                });
            });
        }

        fetchRandomHadith();
    }

    async function fetchRandomHadith() {
        const arabicEl = document.getElementById('hadith-arabic-text');
        const turkishEl = document.getElementById('hadith-turkish-text');
        const sourceBookEl = document.getElementById('hadith-source-book');
        const gradeEl = document.getElementById('hadith-grade');

        if (turkishEl) turkishEl.textContent = 'Günün Hadis-i Şerifi getiriliyor...';

        try {
            // Sunnetimiz.com Açık Kaynak API Çağrısı
            const res = await fetch('https://sunnetimiz.com/api/v1/random');
            if (!res.ok) throw new Error('Sunnetimiz HTTP ' + res.status);
            const data = await res.json();

            if (data && data.turkish) {
                if (arabicEl) arabicEl.textContent = data.arabic || '';
                if (turkishEl) turkishEl.textContent = data.turkish;
                if (sourceBookEl) {
                    const bookName = data.book ? data.book.name : 'Sahih Hadis';
                    const num = data.number ? `No: ${data.number}` : '';
                    sourceBookEl.textContent = `${bookName} ${num}`.trim();
                }
                if (gradeEl) {
                    gradeEl.textContent = data.grade || 'Sahih Rivayet';
                }
                return;
            }
            throw new Error('Geçersiz veri yapısı');
        } catch (err) {
            console.warn('Sunnetimiz API ulaşılamadı, güvenli sahih koleksiyonu kullanılıyor:', err);
            // Güvenilir yedek hadis havuzundan rastgele seç
            const randomFallback = CURATED_HADITHS[Math.floor(Math.random() * CURATED_HADITHS.length)];
            if (arabicEl) arabicEl.textContent = randomFallback.arabic;
            if (turkishEl) turkishEl.textContent = randomFallback.turkish;
            if (sourceBookEl) sourceBookEl.textContent = randomFallback.source;
            if (gradeEl) gradeEl.textContent = randomFallback.grade;
        }
    }

    // =========================================================================
    // 4. ZEKAT HESAPLAMA MOTORU (IslamicAPI Canlı Altın/Gümüş Nisabı)
    // =========================================================================
    function initZakatCalculator() {
        fetchZakatNisab();

        // Girdi alanlarına canlı hesaplama bağla
        const inputs = [
            'zakat-cash',
            'zakat-gold',
            'zakat-trade',
            'zakat-other',
            'zakat-debts'
        ];

        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', calculateZakat);
            }
        });

        const resetBtn = document.getElementById('zakat-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                inputs.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
                calculateZakat();
            });
        }
    }

    async function fetchZakatNisab() {
        try {
            const url = `https://islamicapi.com/api/v1/zakat-nisab/?currency=TRY&api_key=${ISLAMIC_API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Zakat API HTTP ' + res.status);
            const json = await res.json();

            if (json && json.data && json.data.nisab_thresholds) {
                const gold = json.data.nisab_thresholds.gold;
                const silver = json.data.nisab_thresholds.silver;

                if (gold) {
                    liveGoldPricePerGram = gold.unit_price;
                    liveGoldNisabAmount = gold.nisab_amount;

                    const goldPriceEl = document.getElementById('nisab-gold-price');
                    const goldNisabEl = document.getElementById('nisab-gold-total');
                    if (goldPriceEl) goldPriceEl.textContent = formatCurrency(gold.unit_price) + ' ₺/gr';
                    if (goldNisabEl) goldNisabEl.textContent = formatCurrency(gold.nisab_amount) + ' ₺';
                }

                if (silver) {
                    const silverNisabEl = document.getElementById('nisab-silver-total');
                    if (silverNisabEl) silverNisabEl.textContent = formatCurrency(silver.nisab_amount) + ' ₺';
                }
            }
        } catch (err) {
            console.warn('Canlı nisab API çekilemedi, varsayılan piyasa değerleri devrede:', err);
        }
        calculateZakat();
    }

    function calculateZakat() {
        const cash = parseNum('zakat-cash');
        const gold = parseNum('zakat-gold');
        const trade = parseNum('zakat-trade');
        const other = parseNum('zakat-other');
        const debts = parseNum('zakat-debts');

        const totalAssets = cash + gold + trade + other;
        const netWealth = Math.max(0, totalAssets - debts);

        const totalWealthEl = document.getElementById('zakat-total-wealth');
        const statusBadgeEl = document.getElementById('zakat-status-badge');
        const finalAmountEl = document.getElementById('zakat-final-amount');

        if (totalWealthEl) totalWealthEl.textContent = formatCurrency(netWealth) + ' ₺';

        if (netWealth >= liveGoldNisabAmount) {
            // Nisap aşıldı -> Zekat farzdır (%2.5 / 1/40)
            const zakatAmount = netWealth * 0.025;
            if (statusBadgeEl) {
                statusBadgeEl.className = 'zakat-nisab-status-badge eligible';
                statusBadgeEl.textContent = '✓ Net varlığınız Nisap miktarını aşıyor. Zekat vermek farzdır.';
            }
            if (finalAmountEl) {
                finalAmountEl.textContent = formatCurrency(zakatAmount) + ' ₺';
            }
        } else {
            // Nisap altında
            if (statusBadgeEl) {
                statusBadgeEl.className = 'zakat-nisab-status-badge not-eligible';
                statusBadgeEl.textContent = `Toplam net varlığınız Nisap sınırının (${formatCurrency(liveGoldNisabAmount)} ₺) altındadır. Zekat farz değildir.`;
            }
            if (finalAmountEl) {
                finalAmountEl.textContent = '0,00 ₺';
            }
        }
    }

    function parseNum(id) {
        const el = document.getElementById(id);
        if (!el || !el.value) return 0;
        const clean = el.value.replace(/\./g, '').replace(/,/g, '.');
        return parseFloat(clean) || 0;
    }

    function formatCurrency(num) {
        return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // =========================================================================
    // 5. GÜNÜN ESMAÜL HÜSNA'SI (IslamicAPI)
    // =========================================================================
    function initAsmaUlHusna() {
        fetchAsmaUlHusna();

        const allModalBtn = document.getElementById('open-esma-modal-btn');
        const modal = document.getElementById('esma-modal');
        const closeBtn = document.getElementById('close-esma-modal-btn');
        const backdrop = document.getElementById('esma-modal-backdrop');
        const searchInput = document.getElementById('esma-search-input');

        if (allModalBtn && modal) {
            allModalBtn.addEventListener('click', () => modal.classList.add('open'));
        }
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        }
        if (backdrop && modal) {
            backdrop.addEventListener('click', () => modal.classList.remove('open'));
        }

        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const term = this.value.toLowerCase().trim();
                renderAllEsmaGrid(term);
            });
        }
    }

    async function fetchAsmaUlHusna() {
        try {
            const url = `https://islamicapi.com/api/v1/asma-ul-husna/?language=tr&api_key=${ISLAMIC_API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Esma API HTTP ' + res.status);
            const json = await res.json();

            if (json && json.data && json.data.names) {
                allEsmaList = json.data.names;

                // Günün İsmi: Yılın gününe göre rotasyon
                const now = new Date();
                const startOfYear = new Date(now.getFullYear(), 0, 0);
                const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
                const todayIndex = dayOfYear % allEsmaList.length;

                renderDailyEsma(allEsmaList[todayIndex]);
                renderAllEsmaGrid('');
            }
        } catch (err) {
            console.error('Esmaül Hüsna yüklenemedi:', err);
        }
    }

    function renderDailyEsma(item) {
        if (!item) return;

        const numEl = document.getElementById('esma-number');
        const arEl = document.getElementById('esma-arabic');
        const trEl = document.getElementById('esma-transliteration');
        const meaningEl = document.getElementById('esma-meaning-text');
        const audioBtn = document.getElementById('esma-audio-btn');

        if (numEl) numEl.textContent = item.number;
        if (arEl) arEl.textContent = item.name;
        if (trEl) trEl.textContent = item.transliteration || item.translation;
        if (meaningEl) meaningEl.textContent = item.meaning;

        if (audioBtn) {
            audioBtn.onclick = () => {
                if (item.audio) {
                    const audio = new Audio('https://islamicapi.com' + item.audio);
                    audio.play().catch(e => console.warn('Ses oynatılamadı:', e));
                }
            };
        }
    }

    function renderAllEsmaGrid(filterTerm) {
        const grid = document.getElementById('esma-all-grid');
        if (!grid || allEsmaList.length === 0) return;

        const filtered = allEsmaList.filter(item => {
            if (!filterTerm) return true;
            return (item.transliteration && item.transliteration.toLowerCase().includes(filterTerm)) ||
                   (item.translation && item.translation.toLowerCase().includes(filterTerm)) ||
                   (item.meaning && item.meaning.toLowerCase().includes(filterTerm));
        });

        grid.innerHTML = filtered.map(item => `
            <div class="esma-mini-card" onclick="window.KehribarIslam.selectEsma(${item.number})">
                <div class="esma-mini-ar">${item.name}</div>
                <div class="esma-mini-tr">${item.number}. ${item.transliteration || item.translation}</div>
                <div class="esma-mini-meaning">${item.meaning}</div>
            </div>
        `).join('');
    }

    function selectEsma(number) {
        const item = allEsmaList.find(e => e.number === number);
        if (item) {
            renderDailyEsma(item);
            const modal = document.getElementById('esma-modal');
            if (modal) modal.classList.remove('open');
            const targetSection = document.getElementById('esma-section');
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // =========================================================================
    // 6. GÜNÜN DUASI (IslamicAPI)
    // =========================================================================
    let allDuasList = [];

    function initDailyDua() {
        fetchDailyDua();

        const refreshBtn = document.getElementById('dua-refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                if (allDuasList.length > 0) {
                    const randomDua = allDuasList[Math.floor(Math.random() * allDuasList.length)];
                    renderDua(randomDua);
                }
            });
        }
    }

    async function fetchDailyDua() {
        try {
            const url = `https://islamicapi.com/api/v1/dua/?type=translation&lang=tr&api_key=${ISLAMIC_API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Dua API HTTP ' + res.status);
            const json = await res.json();

            if (json && json.data && json.data.length > 0) {
                allDuasList = json.data;
                // Günlük dua seç
                const now = new Date();
                const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
                const dailyIndex = dayOfYear % allDuasList.length;
                renderDua(allDuasList[dailyIndex]);
            }
        } catch (err) {
            console.error('Dua API hatası:', err);
        }
    }

    function renderDua(item) {
        if (!item) return;

        const titleEl = document.getElementById('dua-title');
        const arabicEl = document.getElementById('dua-arabic');
        const transEl = document.getElementById('dua-transliteration');
        const meanEl = document.getElementById('dua-translation');
        const refEl = document.getElementById('dua-reference');

        if (titleEl) titleEl.textContent = item.title;
        if (arabicEl) arabicEl.textContent = item.arabic || '';
        if (transEl) transEl.textContent = item.transliteration || '';
        if (meanEl) meanEl.textContent = item.translation || item.introduction;
        if (refEl) refEl.textContent = item.reference ? `📖 Kaynak: ${item.reference}` : '';
    }

    // =========================================================================
    // BAŞLATMA VE GLOBAL DIŞA AKTARIM
    // =========================================================================
    document.addEventListener('DOMContentLoaded', function () {
        initPrayerTimes();
        initQuranReader();
        initDailyHadith();
        initZakatCalculator();
        initAsmaUlHusna();
        initDailyDua();
    });

    window.KehribarIslam = {
        selectEsma: selectEsma,
        fetchRandomHadith: fetchRandomHadith,
        calculateZakat: calculateZakat
    };
})();
