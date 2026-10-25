(function(){
const Q = (function(){ // Soru havuzu — ders.erdiyalcin.com/yapay-zeka ve /mobil-uygulama 1–4. hafta notlarından.
// Mobil Uygulama haftaları içeride 11–14 olarak tutulur (d: ekranda görünen hafta no).
const COURSES = [
  { id: 'yz', name: 'Yapay Zeka Uygulamaları', short: 'Yapay Zeka', slug: 'yapay-zeka' },
  { id: 'mu', name: 'Mobil Uygulama Geliştirme', short: 'Mobil Uygulama', slug: 'mobil-uygulama' },
];
// w: hafta, t: konu, k: nottaki bölüm bağlantısı, q: soru, o: şıklar, a: doğru şık, e: açıklama
const WEEKS = [
  { n: 1, ready: true, title: 'Yapay Zekâya Giriş', tags: 'AI / ML / DL · Sınıflandırma · Regresyon · KNN · Sinir ağı · LLM' },
  { n: 2, ready: true, title: 'Veri ve Ön İşleme', tags: 'Eksik veri · Aykırı değer · One-hot · Ölçekleme · Train / test · Veri sızıntısı' },
  { n: 3, ready: true, title: 'Sınıflandırma Uygulamaları ve Kaggle', tags: 'Etiket · Kaggle · Titanic · Taban çizgisi · Karmaşıklık matrisi' },
  { n: 4, ready: true, title: 'Görüntü İşleme, OpenCV ve CNN', tags: 'Piksel · BGR / RGB · Eşikleme · Evrişim · Canny · Morfoloji · CNN' },
  { n: 5, ready: false, title: 'Model Değerlendirme', tags: 'Accuracy · Precision / Recall · Overfitting' },
  { n: 11, c: 'mu', d: 1, ready: true, title: 'API Temelleri', tags: 'API · HTTP · Request / Response · REST · JSON · Status code · .NET Web API · Postman' },
  { n: 12, c: 'mu', d: 2, ready: true, title: 'JWT, Database First ve Rol Bazlı Yetki', tags: 'SSMS · EF Core scaffold · Salt & hash · JWT · Claim · DTO · CRUD · 400 / 401 / 403' },
  { n: 13, c: 'mu', d: 3, ready: true, title: 'Mobil Dünyanın Haritası, Flutter ve Postman', tags: 'Native / Cross-platform · Dart · Widget & State · pub.dev · Open-Meteo · JSON' },
  { n: 14, c: 'mu', d: 4, ready: true, title: 'Kullanıcı Kayıt ve Giriş', tags: 'Kayıt ucu · Uye rolü · Hash · Token · Güvenli depo · 409 · 10.0.2.2' },
  { n: 15, c: 'mu', d: 5, ready: false, title: 'Liste ve Detay Ekranları', tags: 'ListView · Navigation · Authorization header' },
];

const QUESTIONS = [
  // ---------- 1. HAFTA ----------
  { w: 1, t: 'Klasik programlama ve yapay zekâ', k: 'giris', q: 'KDV hesaplamak için hangi yaklaşım uygundur?', o: ['Klasik programlama', 'Derin öğrenme', 'Büyük dil modeli', 'KNN'], a: 0, e: 'Kural nettir, oran bellidir; yapay zekâya gerek yoktur.' },
  { w: 1, t: 'Klasik programlama ve yapay zekâ', k: 'giris', q: 'Ne zaman yapay zekâ düşünmeliyiz?', o: ['Açık kuralları yazmak zor ama geçmişten çok sayıda örnek varsa', 'Kural tek bir if ile yazılabiliyorsa', 'Girilen şifre kayıtlı şifreyle karşılaştırılacaksa', 'Veri hiç yoksa'], a: 0, e: 'Kural yazmak zorsa ve örnek bolsa model kuralları veriden öğrenebilir.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: '1950\'de "Bir makine düşünebilir mi?" sorusunu sistematik biçimde tartışan kişi kimdir?', o: ['Alan Turing', 'Garry Kasparov', 'Abraham Wald', 'Eddie Woo'], a: 0, e: 'Bu fikir daha sonra "Turing Testi" olarak anıldı.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: 'IBM Deep Blue 1997\'de kimi bir maçta yendi?', o: ['Garry Kasparov', 'Alan Turing', 'Bir Go şampiyonunu', 'ImageNet ekibini'], a: 0, e: 'Dünya satranç şampiyonu Kasparov\'u yendi.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: '2017 sonrası modern büyük dil modellerinin temellerinden biri olan mimari hangisidir?', o: ['Transformer', 'Karar ağacı', 'Uzman sistem', 'Haar cascade'], a: 0, e: 'Attention yaklaşımıyla uzun bağlamları işler.' },
  { w: 1, t: 'AI, ML ve DL', k: 'harita', q: 'Karar ağacı için hangisi doğrudur?', o: ['Makine öğrenmesidir ama derin öğrenme değildir', 'Derin öğrenme algoritmasıdır', 'Bir büyük dil modelidir', 'Makine öğrenmesi değil, kural listesidir'], a: 0, e: 'Çok katmanlı sinir ağı kullanmadığı için deep learning değildir.' },
  { w: 1, t: 'Model nasıl öğrenir?', k: 'veri', q: 'Model yalnızca eğitim verisini ezberleyip yeni örneklerde başarısız oluyorsa buna ne denir?', o: ['Overfitting (aşırı öğrenme)', 'Regresyon', 'Tokenization', 'Segmentation'], a: 0, e: 'Çözümleri ezberleyen öğrenci gibi: yeni soruda başarısız olur.' },
  { w: 1, t: 'Model nasıl öğrenir?', k: 'veri', q: 'Ders notundaki tipik veri bölme örneği hangisidir?', o: ['%70 training · %15 validation · %15 test', '%50 · %25 · %25', '%90 · %5 · %5', '%40 · %30 · %30'], a: 0, e: 'Oranlar sabit değildir; tipik bir örnek olarak verildi.' },
  { w: 1, t: 'Regresyon', k: 'regresyon', q: '"Yarın kaç bardak kahve satılır?" hangi problem türüdür?', o: ['Regresyon', 'Sınıflandırma', 'Nesne tespiti', 'Segmentasyon'], a: 0, e: 'Çıktı sayısal bir değer olduğu için regresyondur.' },
  { w: 1, t: 'Hangi probleme hangi yaklaşım?', k: 'secim', q: '"Bu müşteri aboneliğini iptal eder mi?" sorusu hangi yaklaşıma gider?', o: ['Sınıflandırma', 'Regresyon', 'Üretken yapay zekâ', 'Segmentasyon'], a: 0, e: 'İki sınıf vardır: iptal eder / etmez.' },
  { w: 1, t: 'Nesne tespiti', k: 'tespit', q: '"Kamera görüntüsünde kaç araç var ve nerede?" hangi görevdir?', o: ['Object detection', 'Görüntü sınıflandırma', 'Regresyon', 'Duygu analizi'], a: 0, e: 'Hem sınıf hem konum gerekir: detection = sınıf + konum.' },
  { w: 1, t: 'KNN', k: 'knn', q: 'KNN yeni bir örneğin sınıfını nasıl belirler?', o: ['En yakın K komşusuna bakarak', 'Soru sora sora dallara ayırarak', 'Sonraki tokenı tahmin ederek', 'Piksel ortalamasını alarak'], a: 0, e: '"Bana benzeyenler kim?" mantığıyla çalışır.' },
  { w: 1, t: 'Sinir ağları', k: 'siniragi', q: 'Görüntüde derin ağın ilk katmanları genellikle neyi temsil etmeyi öğrenir?', o: ['Kenarları', 'Göz, kulak, tekerlek gibi karmaşık parçaları', 'Sınıf adını', 'Tokenları'], a: 0, e: 'İlk katmanlar kenar, sonrakiler şekil, daha derinler karmaşık özellikler.' },
  { w: 1, t: 'Bilgisayarlı görü', k: 'goruntu', q: '"Hangi pikseller nesneye ait?" sorusu hangi görevdir?', o: ['Segmentation', 'Classification', 'Object detection', 'Regresyon'], a: 0, e: 'Segmentasyon kedinin tam siluetini çıkarır.' },
  { w: 1, t: 'Doğal dil işleme', k: 'nlp', q: 'Modelin metni böldüğü küçük parçalara ne denir?', o: ['Token', 'Piksel', 'Çekirdek', 'Kontur'], a: 0, e: 'Bir kelime bazen tek, bazen birkaç token olabilir.' },
  { w: 1, t: 'Büyük dil modelleri', k: 'llm', q: 'Bir LLM temelde ne yapar?', o: ['Bağlama göre sonraki tokenı tahmin eder', 'Hazır cevap listesinden seçer', 'Kuralları elle yazılmış bir uzman sistemdir', 'Yalnızca görüntü sınıflandırır'], a: 0, e: 'Metni token token üretir.' },
  { w: 1, t: 'Bilinmesi gereken sınırlar', k: 'sinirlar', q: 'Modelin gerçekte olmayan ama ikna edici bilgi üretmesine ne denir?', o: ['Hallucination', 'Bias', 'Overfitting', 'Embedding'], a: 0, e: '"Model söyledi" demek "doğru" demek değildir.' },

  // ---------- 2. HAFTA ----------
  { w: 2, t: 'Veri neden önce gelir?', k: 'neden', q: '"Yeterince güçlü bir model kötü veriyi telafi eder." Bu ifade için ne doğrudur?', o: ['Yanlıştır; güçlü model hatalı örüntüyü daha iyi öğrenir', 'Doğrudur; model hatayı düzeltir', 'Yalnızca derin öğrenmede doğrudur', 'Veri azsa doğrudur'], a: 0, e: 'Model gücü veri hatasını düzeltmez, pekiştirir.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Amazon\'un işe alım modeli neden kapatıldı?', o: ['Geçmiş CV\'lerden "kadın" geçen ifadeleri olumsuz saymayı öğrendi', 'Çok yavaş çalışıyordu', 'Eğitim verisi hiç yoktu', 'Telif sorunu çıktı'], a: 0, e: 'Model en iyi adayı değil, geçmişte kimin işe alındığını öğrendi.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Google Flu Trends hikâyesi hangi kavramı anlatır?', o: ['Veri kayması (data drift)', 'One-hot encoding', 'Hayatta kalma yanlılığı', 'Overfitting'], a: 0, e: 'Arama alışkanlıkları değişti, model eski alışkanlıklara göre kurulmuştu.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Cilt lezyonu modelleri aslında neyi öğrenmişti?', o: ['Karede duran cetveli', 'Lezyonun rengini', 'Hastanın yaşını', 'Fotoğrafın çözünürlüğünü'], a: 0, e: 'Doktorlar şüpheli lezyonun yanına cetvel koyuyordu.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Abraham Wald\'ın dönen uçaklar hikâyesi hangi yanlılığı anlatır?', o: ['Hayatta kalma yanlılığı (survivorship bias)', 'Etiketleyici yanlılığı', 'Ölçüm yanlılığı', 'Veri sızıntısı'], a: 0, e: 'Veri yalnızca geri dönebilen uçaklardan geliyordu.' },
  { w: 2, t: 'Verinin anatomisi', k: 'anatomi', q: 'Veri tablosunda tek bir satır neyi ifade eder?', o: ['Bir örneği (gözlem)', 'Bir özniteliği', 'Etiketi', 'Lisansı'], a: 0, e: 'Satır = örnek, sütun = öznitelik, bir sütun = etiket.' },
  { w: 2, t: 'Veri nereden gelir?', k: 'toplama', q: 'Türkiye\'de kişisel verilerin işlenmesini düzenleyen kanun hangisidir?', o: ['KVKK (6698 sayılı kanun)', 'CC0 lisansı', 'Kaggle kullanım şartları', 'TÜİK yönetmeliği'], a: 0, e: 'Kişisel veri açık rıza olmadan, amaç dışında işlenemez.' },
  { w: 2, t: 'Veri nereden gelir?', k: 'toplama', q: '1936 Literary Digest anketi neden yanıldı?', o: ['Örneklem telefon ve otomobil sahiplerinden, yani varlıklı kesimden derlenmişti', 'Çok az kişiye ulaşılmıştı', 'Sonuçlar yanlış toplanmıştı', 'Anket internetten yapılmıştı'], a: 0, e: 'Verinin çokluğu yanlılığı düzeltmez.' },
  { w: 2, t: 'Kirli veri', k: 'kalite', q: 'Ders notuna göre en sinsi hata hangisidir?', o: ['Sıfırla kodlanmış eksik veri (ör. m² = 0)', 'Boş hücre', 'Büyük harfle yazılmış ilçe adı', 'Fazla sütun'], a: 0, e: 'Uyarı vermez, hesaplara sessizce girer ve ortalamayı aşağı çeker.' },
  { w: 2, t: 'Eksik veri', k: 'eksik', q: 'Tek bir aykırı değer varken eksik değer doldurmak için hangisi daha dayanıklıdır?', o: ['Medyan', 'Ortalama', 'En büyük değer', 'Sıfır'], a: 0, e: 'Uç değer ortalamayı sürükler, medyanı etkilemez.' },
  { w: 2, t: 'Aykırı değerler', k: 'aykiri', q: 'Aykırı değeri silmeden önce hangi soru sorulmalı?', o: ['"Bu değer mümkün mü?"', '"Bu değer alışılmış mı?"', '"Bu değer ortalamadan büyük mü?"', '"Bu değer son satırda mı?"'], a: 0, e: 'Mümkün ama alışılmadık değerler verinin en değerli kısmıdır.' },
  { w: 2, t: 'Öznitelik çıkarımı', k: 'oznitelik', q: 'Ev fiyatı örneğinde "altın öznitelik" olarak verilen hangisidir?', o: ['Metrekare fiyatı (fiyat / m²)', 'Kimlik numarası', 'İlan tarihi', 'Satıcının adı'], a: 0, e: 'Emlakçının kafasındaki asıl ölçü budur; alan bilgisi devreye girer.' },
  { w: 2, t: 'Kategorik veri', k: 'kategorik', q: 'Beden bilgisi (S, M, L, XL) için hangi kodlama uygundur?', o: ['Label encoding', 'One-hot encoding', 'Standardizasyon', 'Sütunu silmek'], a: 0, e: 'Bedenler arasında gerçek bir sıralama vardır.' },
  { w: 2, t: 'Kategorik veri', k: 'kategorik', q: 'Şehir gibi sırasız (nominal) bir kategori için hangisi kullanılır?', o: ['One-hot encoding', 'Label encoding (1, 2, 3...)', 'Min-max', 'Medyanla doldurma'], a: 0, e: 'Sırasız kategoriye sayı vermek uydurma bir sıralama öğretir.' },
  { w: 2, t: 'Ölçekleme', k: 'olcek', q: 'Hangi yöntem ölçeklemeden etkilenmez?', o: ['Karar ağaçları', 'KNN', 'k-means', 'Sinir ağları'], a: 0, e: 'Ağaçlar her sütunu tek tek eşiklerle böler.' },
  { w: 2, t: 'Eğitim / test', k: 'bolme', q: 'Zaman serisi verisinde eğitim/test bölmesi nasıl yapılır?', o: ['Tarihe göre: eski veriyle eğit, yeni veriyle test et', 'Tamamen rastgele', 'Alfabetik sırayla', 'Test kümesi hiç ayrılmaz'], a: 0, e: 'Gelecekten geçmişi tahmin etmek anlamsızdır.' },
  { w: 2, t: 'Veri sızıntısı', k: 'sizinti', q: 'Eksik değerleri tüm veri kümesinin ortalamasıyla doldurmak neden sorundur?', o: ['O ortalamada test satırları da olduğu için veri sızıntısıdır', 'Ortalama hep sıfır çıkar', 'Model yavaşlar', 'Etiket silinir'], a: 0, e: 'Doğrusu: önce böl, sonra yalnızca eğitim kümesinden hesapla.' },
  { w: 2, t: 'Dengesiz veri', k: 'denge', q: 'Görülme oranı %1 olan bir hastalıkta %99 doğruluk alan model için ne söylenir?', o: ['Tek başına bir şey ifade etmez; "kimsede yok" diyen model de %99 alır', 'Mükemmel bir modeldir', 'Overfitting yapmıştır', 'Veri sızıntısı kesindir'], a: 0, e: 'Gerçek hastaların kaçının yakalandığına bakılır.' },

  // ---------- 3. HAFTA ----------
  { w: 3, t: 'Sınıflandırma nedir?', k: 'problem', q: 'Ders notundaki tanıma göre sınıflandırma nedir?', o: ['Bir şeyi hazır kutulardan birine koymak', 'Bir sayı tahmin etmek', 'Yeni metin üretmek', 'Veriyi gruplara kendiliğinden ayırmak'], a: 0, e: 'Postacının mektupları ilçelere ayırması gibi.' },
  { w: 3, t: 'Veri setini seçmek', k: 'secim', q: 'Lisans alanında hangisi yazan veri setini kullanmamalısınız?', o: ['Unknown', 'CC0', 'CC BY', 'Hiçbiri, lisans önemli değil'], a: 0, e: 'CC0 ya da CC BY serbesttir; Unknown kullanılmaz.' },
  { w: 3, t: 'Veri setini seçmek', k: 'secim', q: 'Ödev için veri setinde en az kaç satır olmalı?', o: ['500', '50', '100', '10.000'], a: 0, e: 'Çok az satırla çıkan sonuçlar güvenilmez olur.' },
  { w: 3, t: 'Veri setini seçmek', k: 'secim', q: 'Açıklamasında hangi kelimeler geçen veri seti uydurmadır?', o: ['synthetic, generated, simulated', 'license, public, open', 'train, test, submission', 'image, text, audio'], a: 0, e: 'Model gerçeği değil, veriyi uyduran formülü öğrenir.' },
  { w: 3, t: 'Titanic örneği', k: 'ornek', q: 'Titanic train.csv dosyasında kaç yolcu vardır?', o: ['891', '418', '179', '712'], a: 0, e: 'test.csv 418 yolcu, sınav için ayrılan 179 yolcu.' },
  { w: 3, t: 'Taban çizgisi', k: 'ornek', q: 'Titanic verisinde herkese "kurtulamadı" desek doğruluk kaç olur?', o: ['%61,6', '%38,4', '%80', '%76,5'], a: 0, e: 'Bu sayı taban çizgisidir; modelin geçmesi gereken çizgi.' },
  { w: 3, t: 'Taban çizgisi', k: 'ornek', q: '"Bütün kadınlar kurtuldu, bütün erkekler kurtulamadı" kuralı Kaggle\'da kaç puan alır?', o: ['0,765', '0,616', '0,99', '0,50'], a: 0, e: 'Basit bir kural bazen karmaşık modele çok yakın sonuç verir.' },
  { w: 3, t: 'Titanic örneği', k: 'ornek', q: 'test.csv\'de neden 12 değil 11 sütun var?', o: ['Cevap sütunu (Survived) yok', 'Yaş sütunu silinmiş', 'Kabin sütunu boş olduğu için atılmış', 'Dosya bozuk'], a: 0, e: 'Cevabı bizim tahmin etmemiz isteniyor.' },
  { w: 3, t: 'Eğitim / sınav ayrımı', k: 'ornek', q: 'train_test_split içinde random_state=42 ne işe yarar?', o: ['Bölmenin her çalıştırmada aynı olmasını sağlar', 'Verinin %42\'sini test yapar', 'Modeli 42 kez eğitir', '42 sütun seçer'], a: 0, e: '42\'nin özel bir anlamı yoktur, alışkanlıktan kullanılır.' },
  { w: 3, t: 'Karar ağacı', k: 'ornek', q: 'DecisionTreeClassifier(max_depth=4) ne demektir?', o: ['En fazla 4 soru sorabilsin; ezberlemeyi sınırlar', '4 farklı model eğitir', 'Veriyi 4 parçaya böler', '4 sınıf tahmin eder'], a: 0, e: 'Sınırlamazsak model ezberlemeye başlar.' },
  { w: 3, t: 'Karar ağacı', k: 'ornek', q: 'scikit-learn\'de fit ve predict ne yapar?', o: ['fit öğrenir, predict tahmin eder', 'fit tahmin eder, predict öğrenir', 'İkisi de veriyi temizler', 'fit veriyi böler, predict kaydeder'], a: 0, e: 'Bütün scikit-learn modelleri bu iki komutla çalışır.' },
  { w: 3, t: 'Cevap dosyası', k: 'ornek', q: 'to_csv\'de index=False yazmayı unutursak ne olur?', o: ['Dosyaya fazladan bir sütun eklenir, Kaggle kabul etmez', 'Dosya boş kaydedilir', 'Doğruluk düşer', 'Hiçbir şey olmaz'], a: 0, e: 'Göndermeden önce 418 satır ve sütun adları da kontrol edilir.' },
  { w: 3, t: 'Karmaşıklık matrisi', k: 'sonuc', q: 'Kanser taraması örneğinde hangi hata daha kötüdür?', o: ['Kaçırma: hasta birine "sağlıklısın" demek', 'Yanlış alarm: sağlıklı birine "hasta olabilirsin" demek', 'İkisi eşit', 'Hiçbiri önemli değil'], a: 0, e: 'İki hatanın bedeli eşit değilse model ayarı da buna göre yapılır.' },
  { w: 3, t: 'Kesme noktası', k: 'sonuc', q: 'Kesme noktası %50\'den %35\'e indirilirse ne olur?', o: ['Daha az kaçırma, daha çok yanlış alarm', 'Daha çok kaçırma, daha az yanlış alarm', 'Hiç hata kalmaz', 'Doğruluk hep %100 olur'], a: 0, e: 'Bir hatayı azaltmak öbürünü artırır.' },
  { w: 3, t: 'KNN ve aşırı öğrenme', k: 'sinir', q: 'KNN alıştırmasında k = 1 iken öğrenilen yolcularda %100, sınavda %80. Bu nedir?', o: ['Aşırı öğrenme (overfitting)', 'Eksik öğrenme (underfitting)', 'Veri sızıntısı', 'Taban çizgisi'], a: 0, e: 'Model ezberlemiştir.' },
  { w: 3, t: 'KNN ve aşırı öğrenme', k: 'sinir', q: 'k = 21 ve üstünde iki doğruluk da %55\'e düşüyor. Buna ne denir?', o: ['Eksik öğrenme (underfitting)', 'Aşırı öğrenme', 'Data drift', 'One-hot'], a: 0, e: 'Model herkese aynı cevabı vermeye başlar.' },
  { w: 3, t: 'Ödev', k: 'odev', q: 'Ödevde hangi veri setleri yasaktır?', o: ['Titanic ve Iris', 'Spam ve şarap kalitesi', 'Mantar ve kredi', 'Kaggle\'daki tüm veri setleri'], a: 0, e: 'İkisinin de internette hazır çözümü çok fazla.' },

  // ---------- 4. HAFTA ----------
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: 'Gri bir görüntüde piksel değerleri hangi aralıktadır?', o: ['0–255 (0 siyah, 255 beyaz)', '0–1 (0 beyaz, 1 siyah)', '−128 – 127', '0–100'], a: 0, e: 'uint8: 0–255 arası tam sayı.' },
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: 'uint8 veride 200 + 100 işlemi kaç verir?', o: ['44', '300', '255', '0'], a: 0, e: '256\'da başa döner; parlaklık eklerken cv2.add kullanılır.' },
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: 'numpy\'da bir pikseli okumanın doğru yazımı hangisidir?', o: ['gri[y, x]', 'gri[x, y]', 'gri(x, y)', 'gri[x][y][0]'], a: 0, e: 'numpy önce satırı (y), sonra sütunu (x) sorar.' },
  { w: 4, t: 'Renk ve BGR tuzağı', k: 'renk', q: 'OpenCV bir görüntüyü okuduğunda kanalları hangi sırada tutar?', o: ['BGR', 'RGB', 'HSV', 'GRB'], a: 0, e: 'Matplotlib RGB bekler: cv2.cvtColor(img, cv2.COLOR_BGR2RGB).' },
  { w: 4, t: 'Renk ve BGR tuzağı', k: 'renk', q: 'Gri tonlama formülünde en büyük ağırlık hangi kanaldadır?', o: ['Yeşil (0.587)', 'Kırmızı (0.299)', 'Mavi (0.114)', 'Üçü eşittir'], a: 0, e: 'İnsan gözü yeşile en duyarlıdır.' },
  { w: 4, t: 'OpenCV ile başlamak', k: 'opencv', q: 'cv2.imread dosyayı bulamazsa ne olur?', o: ['Hata vermez, None döner', 'Program hemen hata verir', 'Siyah bir görüntü döner', 'Dosyayı oluşturur'], a: 0, e: 'Her imread\'den sonra "if img is None" kontrolü yazılmalı.' },
  { w: 4, t: 'OpenCV ile başlamak', k: 'opencv', q: 'Kaggle notebook\'ta cv2.imshow neden kullanılmaz?', o: ['Masaüstü penceresi açmaya çalışır, çekirdeği kilitler', 'Renkleri ters gösterir', 'Yalnızca gri görüntü gösterir', 'Ücretlidir'], a: 0, e: 'Notebook\'ta görüntü göstermenin yolu matplotlib.' },
  { w: 4, t: 'Kırp, boyutlandır, döndür', k: 'temel', q: 'cv2.resize boyutu hangi sırada ister?', o: ['(genişlik, yükseklik)', '(yükseklik, genişlik)', '(kanal, genişlik, yükseklik)', 'Sıra fark etmez'], a: 0, e: 'shape ise (yükseklik, genişlik) verir; en sık yapılan hata.' },
  { w: 4, t: 'Kırp, boyutlandır, döndür', k: 'temel', q: 'Görüntü küçültürken önerilen ara değer yöntemi hangisidir?', o: ['INTER_AREA', 'INTER_NEAREST', 'INTER_CUBIC', 'INTER_LINEAR'], a: 0, e: 'Komşu pikselleri ortalar, detayı en az bozar.' },
  { w: 4, t: 'Kırp, boyutlandır, döndür', k: 'temel', q: 'El yazısı rakamlarda hangi veri artırma uygun değildir?', o: ['Yatay çevirme (aynalama)', 'Hafif döndürme', 'Biraz kaydırma', 'Hafif yakınlaştırma'], a: 0, e: '"7" aynalanınca artık 7 değildir.' },
  { w: 4, t: 'Eşikleme', k: 'esik', q: 'Işığı eşit olmayan taranmış bir sayfa için hangi eşikleme kullanılır?', o: ['Uyarlamalı (adaptiveThreshold)', 'Otsu', 'Elle eşik 127', 'equalizeHist'], a: 0, e: 'Her piksele kendi eşiği: eşitsiz ışığın tek çözümü.' },
  { w: 4, t: 'Eşikleme', k: 'esik', q: 'adaptiveThreshold\'da blockSize için hangisi zorunludur?', o: ['Tek sayı olmalı', 'Çift sayı olmalı', '255 olmalı', '0 olmalı'], a: 0, e: 'Çift verilirse OpenCV hata atar.' },
  { w: 4, t: 'Evrişim ve çekirdek', k: 'cekirdek', q: 'Toplamı 0 olan bir çekirdek ne yapar?', o: ['Düz alanları siyaha indirir, yalnızca değişimi bırakır', 'Parlaklığı korur', 'Görüntüyü parlatır', 'Renkleri ters çevirir'], a: 0, e: 'Bütün kenar bulucular buradadır (Sobel, Laplacian).' },
  { w: 4, t: 'Gürültü ve bulanıklaştırma', k: 'bulanik', q: 'Tuz-biber gürültüsünün ilacı hangisidir?', o: ['medianBlur', 'bilateralFilter', 'GaussianBlur', 'filter2D ile keskinleştirme'], a: 0, e: 'Tek bir uç değer ortancayı etkilemez.' },
  { w: 4, t: 'Kenar bulma', k: 'kenar', q: 'Canny için üst eşik nasıl seçilir?', o: ['Alt eşiğin 2–3 katı', 'Alt eşiğe eşit', 'Her zaman 255', 'Alt eşiğin yarısı'], a: 0, e: 'Başlangıç için Canny(gri, 50, 150) denenir.' },
  { w: 4, t: 'Morfoloji', k: 'morfoloji', q: 'Açma (opening) işlemi nedir?', o: ['Erozyon sonra genişletme; küçük beyaz lekeleri siler', 'Genişletme sonra erozyon; siyah delikleri doldurur', 'Yalnızca erozyon', 'Yalnızca sınır çizgisi'], a: 0, e: 'Açma beyazı azaltır, kapama siyahı kapatır.' },
  { w: 4, t: 'Kontur ve nesne sayma', k: 'kontur', q: 'Nesne sayma hattında en çok atlanan adım hangisidir?', o: ['Alana göre süzmek (contourArea)', 'Gri tonlamaya çevirmek', 'Bulanıklaştırmak', 'Eşiklemek'], a: 0, e: 'Süzülmezse 3 piksellik leke de nesne sayılır.' },
  { w: 4, t: 'HSV ve yüz bulma', k: 'hsv', q: 'HSV\'de kırmızıyı bulmak neden iki aralık ister?', o: ['H bir çemberdir; kırmızı başta ve sonda (0–10 ve 170–179)', 'Kırmızı iki farklı kanaldadır', 'OpenCV kırmızıyı desteklemez', 'Gölge yüzünden'], a: 0, e: 'Bunu bilmeyen öğrenci yarım saat kaybeder.' },
  { w: 4, t: 'HSV ve yüz bulma', k: 'hsv', q: 'Haar cascade yüz bulucunun sınırı nedir?', o: ['Yalnızca karşıdan bakan yüzleri bulur, kimin yüzü olduğunu söylemez', 'Her açıdan yüzü ve kimliği bulur', 'Yalnızca renkli görüntüde çalışır', 'GPU olmadan çalışmaz'], a: 0, e: 'Bugün yerini derin öğrenme tabanlı bulucular aldı.' },
  { w: 4, t: 'CNN', k: 'cnn', q: 'CNN\'in OpenCV filtrelerinden temel farkı nedir?', o: ['Çekirdek sayılarını ağ kendisi öğrenir', 'Yeni bir matematik kullanır', 'Veri gerektirmez', 'Tamamen açıklanabilirdir'], a: 0, e: 'Evrişim aynı; çekirdek rastgele başlar, eğitimle bulunur.' },
  { w: 4, t: 'CNN', k: 'cnn', q: 'Maksimum havuzlama (max pooling) ne yapar?', o: ['Her 2×2 kareden en büyük sayıyı seçer, veriyi dörtte bire indirir', 'Görüntüyü iki katına büyütür', 'Renk kanallarını ayırır', 'Kenarları siler'], a: 0, e: 'Modeli küçük kaymalara dayanıklı yapar.' },
  // ---------- MOBİL UYGULAMA 1–4. HAFTA (w: 11–14) ----------
  { w: 11, t: 'API nedir?', k: 'api', q: 'API açılımı nedir?', o: ['Application Programming Interface', 'Advanced Program Integration', 'Automatic Protocol Interface', 'Application Process Index'], a: 0, e: 'Uygulama Programlama Arayüzü; iki yazılımın hangi kurallarla konuşacağını tanımlar.' },
  { w: 11, t: 'API nedir?', k: 'api', q: 'Ders notuna göre API\'nin en önemli fikri nedir?', o: ['Bir sözleşme olması', 'Bir veritabanı olması', 'Bir programlama dili olması', 'Bir tasarım aracı olması'], a: 0, e: '"Şu adrese şu yöntemle gönderirsen şu formatta cevap veririm" sözleşmesidir.' },
  { w: 11, t: 'Büyük resim', k: 'giris', q: 'Mobil ve web uygulamasının aynı hesapla giriş yapabilmesi için ne gerekir?', o: ['İkisinin aynı kimlik doğrulama API\'siyle konuşması', 'İkisinin aynı dille yazılması', 'İkisinin aynı cihazda çalışması', 'Veritabanına doğrudan bağlanmaları'], a: 0, e: 'Mobil Flutter, web React olabilir; önemli olan aynı API\'yi kullanmalarıdır.' },
  { w: 11, t: 'Neden API?', k: 'neden', q: 'Mobil uygulamayı doğrudan veritabanına bağlamanın sorunu hangisidir?', o: ['DB bağlantı bilgisi uygulamanın içinde dağıtılır', 'Uygulama daha hızlı çalışır', 'JSON kullanılamaz', 'HTTP gerekmez'], a: 0, e: 'API yoksa veritabanını internete açmak ve bağlantı bilgisini istemcide taşımak gerekir.' },
  { w: 11, t: 'Neden API?', k: 'neden', q: 'Endpointleri sunan tarafa ne denir?', o: ['API sağlayıcısı', 'API tüketicisi', 'İstemci', 'Tarayıcı'], a: 0, e: 'Sağlayıcı endpointleri sunar, tüketici bu endpointlere istek atar.' },
  { w: 11, t: 'HTTP nedir?', k: 'http', q: 'HTTP nedir?', o: ['İstemci ve sunucunun haberleşme protokolü', 'Bir programlama dili', 'Bir veritabanı türü', 'Bir mobil işletim sistemi'], a: 0, e: 'Hypertext Transfer Protocol; önceden anlaşılmış iletişim kurallarıdır.' },
  { w: 11, t: 'HTTP nedir?', k: 'http', q: 'HTTPS\'i HTTP\'den ayıran nedir?', o: ['İletişimin TLS ile şifrelenmesi', 'Daha hızlı olması', 'JSON yerine XML taşıması', 'Sadece mobilde çalışması'], a: 0, e: 'Kullanıcı bilgisi ve token gibi hassas veriler için HTTPS gerekir.' },
  { w: 11, t: 'Request / Response', k: 'mesaj', q: 'Klasik HTTP modelinde iletişimi kim başlatır?', o: ['İstemci', 'Sunucu', 'Veritabanı', 'Her ikisi rastgele'], a: 0, e: 'İstemci request gönderir, sunucu response döndürür.' },
  { w: 11, t: 'Request / Response', k: 'mesaj', q: 'Token gibi ek bilgiler request\'in hangi parçasında taşınır?', o: ['Headers', 'Body', 'Status code', 'URL path'], a: 0, e: 'Headers; token, içerik türü gibi ek bilgileri taşır.' },
  { w: 11, t: 'URL ve endpoint', k: 'url', q: '/api/students/15 adresindeki 15 nedir?', o: ['Path parameter', 'Query parameter', 'Header', 'Status code'], a: 0, e: 'Belirli bir kaynağı kimliğiyle seçen path parameter\'dır.' },
  { w: 11, t: 'URL ve endpoint', k: 'url', q: 'Filtreleme ve sayfalama için hangisi kullanılır?', o: ['Query parameter (?page=2)', 'Path parameter', 'Status code', 'HTTP metodu'], a: 0, e: 'İsteğe bağlı seçenekler ? işaretinden sonra query parameter olarak gönderilir.' },
  { w: 11, t: 'HTTP metodları', k: 'methods', q: 'Yeni kayıt oluşturmak için hangi metod kullanılır?', o: ['POST', 'GET', 'DELETE', 'PATCH'], a: 0, e: 'POST, kaynak kümesine yeni kayıt ekleme niyetini taşır (Create).' },
  { w: 11, t: 'HTTP metodları', k: 'methods', q: 'Kaynağın yalnızca bir kısmını güncellemek için hangi metod uygundur?', o: ['PATCH', 'PUT', 'POST', 'GET'], a: 0, e: 'PUT kaynağın tamamını, PATCH bir kısmını günceller.' },
  { w: 11, t: 'Status code', k: 'status', q: 'Kullanıcı yanlış URL\'ye istek atarsa genellikle hangi kod beklenir?', o: ['404', '500', '201', '200'], a: 0, e: '500 sunucunun kendi içinde beklenmeyen bir hata yaşadığını gösterir.' },
  { w: 11, t: 'Status code', k: 'status', q: '201 Created ne zaman döner?', o: ['Yeni kaynak oluşturulduğunda', 'İstek başarısız olduğunda', 'Kaynak bulunamadığında', 'Sunucu çöktüğünde'], a: 0, e: 'POST sonucu yeni kaynak oluştuğunda 201 daha anlamlıdır.' },
  { w: 11, t: 'REST', k: 'rest', q: 'REST için hangisi doğrudur?', o: ['HTTP üzerinde uygulanan bir mimari yaklaşımdır', 'HTTP ile aynı şeydir', 'Bir programlama dilidir', 'Bir veri formatıdır'], a: 0, e: 'HTTP protokoldür; REST onu düzenli kullanmayı öneren mimari yaklaşımdır.' },
  { w: 11, t: 'REST', k: 'rest', q: 'REST\'teki "stateless" ne demektir?', o: ['Her request gerekli bilgiyi kendi içinde taşır', 'Sunucu her kullanıcının oturumunu saklar', 'Veri hiç saklanmaz', 'Sadece GET kullanılır'], a: 0, e: 'Sunucu önceki isteği hatırlamak zorunda değildir.' },
  { w: 11, t: 'JSON', k: 'json', q: 'JSON için hangisi doğrudur?', o: ['Hemen her dil okuyabilir ve üretebilir', 'Sadece JavaScript okuyabilir', 'İkili (binary) bir formattır', 'Sadece .NET\'te çalışır'], a: 0, e: 'Adında JavaScript geçse de C#, Dart, Java, Python JSON\'u destekler.' },
  { w: 11, t: '.NET Web API', k: 'dotnet', q: 'Minimal API\'de GET endpoint hangi metotla tanımlanır?', o: ['app.MapGet', 'app.Get', 'app.UseGet', 'builder.AddGet'], a: 0, e: 'app.MapGet("/api/hello", ...) ile tanımlanır; anonim nesne otomatik JSON olur.' },
  { w: 11, t: 'Postman laboratuvarı', k: 'postman', q: 'Postman bu aşamada neden yararlıdır?', o: ['API\'yi mobil uygulama olmadan test ettirir', 'Mobil arayüz tasarlar', 'Veritabanı oluşturur', 'Kodu derler'], a: 0, e: 'Sorunun API\'de mi mobil kodda mı olduğunu ayırmayı kolaylaştırır.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'Login başarılı olunca API ne üretir?', o: ['JWT token', 'Yeni bir şifre', 'Veritabanı kopyası', 'HTML sayfası'], a: 0, e: 'İstemci sonraki isteklerde tokenı Authorization: Bearer başlığıyla gönderir.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'JWT için hangisi doğrudur?', o: ['Payload herkes tarafından okunabilir', 'İçeriği şifreli bir kasadır', 'İçine şifre yazılmalıdır', 'Hiç süresi dolmaz'], a: 0, e: 'JWT gizlemez, imzalar. Bu yüzden şifre gibi gizli veriler token içine yazılmaz.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'JWT\'nin üç parçası hangileridir?', o: ['Header · Payload · Signature', 'Body · Footer · Key', 'Request · Response · Status', 'Salt · Hash · Iteration'], a: 0, e: 'Signature gizli anahtarla üretilir; payload değiştirilirse imza tutmaz.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'Stateless JWT\'de "çıkış yap" nasıl yapılır?', o: ['İstemci tokenı kendi deposundan siler', 'Sunucu oturumu siler', 'Veritabanından kullanıcı silinir', 'Şifre değiştirilir'], a: 0, e: 'Sunucuda silinecek oturum yoktur; token süresi dolana kadar teknik olarak geçerlidir.' },
  { w: 12, t: 'Database First', k: 's6', q: 'Database First yaklaşımında hangisi önce gelir?', o: ['Veritabanı; modeller ondan üretilir', 'C# sınıfları; tablolar ondan üretilir', 'Migration komutları', 'Swagger dokümanı'], a: 0, e: 'EF Core mevcut şemayı okuyup DbContext ve entity sınıflarını scaffold eder.' },
  { w: 12, t: 'Scaffold çıktıları', k: 's7', q: '--no-pluralize yazılmazsa Kullanici tablosunun DbSet adı ne olur?', o: ['Kullanicis', 'Kullanicilar', 'Kullanici', 'Users'], a: 0, e: 'EF Core İngilizce çoğullama kuralı uygular; Türkçe çoğul üretmez.' },
  { w: 12, t: 'Scaffold çıktıları', k: 's6', q: '--no-onconfiguring bayrağı ne işe yarar?', o: ['Bağlantı bilgisinin üretilen koda gömülmesini engeller', 'Tabloları siler', 'Çoğullamayı açar', 'Swagger\'ı kapatır'], a: 0, e: 'Connection string merkezi olarak appsettings.json\'a konur.' },
  { w: 12, t: 'SSMS veritabanı', k: 's3', q: 'Para alanında FLOAT yerine hangisi önerilir?', o: ['DECIMAL(18,2)', 'NVARCHAR', 'INT', 'BIT'], a: 0, e: 'Para hesaplarında DECIMAL kayan nokta hatalarından kaçınır.' },
  { w: 12, t: 'SSMS veritabanı', k: 's3', q: 'Kullanici.YetkiId alanına olmayan bir yetki yazılmasını ne engeller?', o: ['Foreign Key', 'Primary Key', 'IDENTITY', 'NVARCHAR uzunluğu'], a: 0, e: 'FK sayesinde Yetki tablosunda olmayan değer yazılamaz.' },
  { w: 12, t: 'Şifre doğrulama', k: 's9', q: 'Giriş sırasında şifre nasıl doğrulanır?', o: ['Girilen şifre aynı salt ile hashlenip kayıtlı hash ile karşılaştırılır', 'Hash çözülüp şifre okunur', 'Düz şifre veritabanında aranır', 'Token içine bakılır'], a: 0, e: 'Hash geri döndürülemez; karşılaştırma hash\'ler üzerinden yapılır.' },
  { w: 12, t: 'Şifre doğrulama', k: 's9', q: 'PBKDF2\'nin 100.000 tur dönmesinin amacı nedir?', o: ['Milyonlarca deneme yapmayı yavaşlatmak', 'Şifreyi kısaltmak', 'Tokenı hızlandırmak', 'Salt\'ı gizlemek'], a: 0, e: 'Tek doğrulamada fark edilmez, kaba kuvvet saldırısı için caydırıcıdır.' },
  { w: 12, t: 'Kullanıcı kaydı', k: 's20', q: 'Aynı e-postayla ikinci kez register denenirse hangi kod döner?', o: ['409 Conflict', '404 Not Found', '201 Created', '500'], a: 0, e: 'İstek geçerli ama mevcut kayıtla çakışıyor.' },
  { w: 12, t: 'Ben kimim?', k: 's21', q: '"Hangi kullanıcı?" bilgisi nereden alınmalıdır?', o: ['Tokendan gelen User claim\'lerinden', 'İstek gövdesindeki kullaniciId\'den', 'Query parametresinden', 'Tarayıcı çerezinden'], a: 0, e: 'İstemcinin gönderdiği id\'ye güvenilirse başkasının verisi okunabilir.' },
  { w: 12, t: 'Yetkilendirme', k: 's12', q: 'Authentication hangi soruya cevap verir?', o: ['Sen kimsin?', 'Bunu yapmaya yetkin var mı?', 'Veri doğru mu?', 'Sunucu çalışıyor mu?'], a: 0, e: 'Authorization ise "bunu yapmaya yetkin var mı?" sorusudur.' },
  { w: 12, t: 'DTO ve doğrulama', k: 's22', q: 'POST\'ta entity yerine DTO almanın sebebi nedir?', o: ['İstemcinin Id gibi alanları göndermesini engellemek', 'Daha çok alan almak', 'Veritabanını hızlandırmak', 'Tokenı küçültmek'], a: 0, e: 'Buna over-posting denir; DTO API sözleşmesini şemadan da ayırır.' },
  { w: 12, t: 'DTO ve doğrulama', k: 's22', q: '[ApiController] varken kurala uymayan istek ne olur?', o: ['Action\'a hiç girmeden otomatik 400 döner', '500 döner', 'Veritabanına kaydedilir', '201 döner'], a: 0, e: 'Model doğrulaması action çalışmadan yapılır.' },
  { w: 12, t: '400 / 401 / 403', k: 's18', q: 'Personel tokenıyla POST /api/urunler isteği hangi kodu alır?', o: ['403', '401', '400', '201'], a: 0, e: 'Kimlik belli ama rol yetersiz: 403 = seni tanıyorum ama izin yok.' },
  { w: 12, t: '400 / 401 / 403', k: 's18', q: 'Token göndermeden korumalı uca istek atılırsa?', o: ['401', '403', '404', '200'], a: 0, e: '401 = seni tanımıyorum.' },
  { w: 12, t: 'Swagger', k: 's15', q: 'Swagger Authorize kutusuna ne yazılmalı?', o: ['Yalnızca token', '"Bearer " + token', 'E-posta ve şifre', 'Gizli anahtar'], a: 0, e: 'Swagger Bearer önekini kendisi ekler; elle yazılırsa "Bearer Bearer" olur.' },
  { w: 12, t: 'Program.cs', k: 's16', q: 'Program.cs\'te doğru middleware sırası hangisidir?', o: ['UseCors → UseAuthentication → UseAuthorization', 'UseAuthorization → UseAuthentication → UseCors', 'UseAuthentication → UseCors → UseAuthorization', 'Sıra önemli değildir'], a: 0, e: 'Önce nereden geliyor, sonra sen kimsin, en son bunu yapabilir misin.' },
  { w: 13, t: 'Kısa mobil tarihi', k: 's2', q: 'Ders notuna göre 2008\'deki asıl kırılma neydi?', o: ['Dağıtım: App Store ve Android', 'Dokunmatik ekran', 'Kamera', 'Flutter'], a: 0, e: 'Geliştirici ilk kez doğrudan kullanıcıya ulaşabildi.' },
  { w: 13, t: 'Kısa mobil tarihi', k: 's2', q: 'Flutter 1.0 hangi yıl çıktı?', o: ['2018', '2008', '2015', '2023'], a: 0, e: 'Google, her pikseli kendi çizim motoruyla çizen bir yol seçti.' },
  { w: 13, t: 'Kısa mobil tarihi', k: 's2', q: 'Cordova / PhoneGap nasıl çalışır?', o: ['Uygulamaya gömülü tarayıcıda HTML/CSS/JS çalıştırır', 'Her pikseli kendisi çizer', 'Native bileşenleri köprüyle çizer', 'Sadece iOS\'ta çalışır'], a: 0, e: 'Çalıştı ama yavaştı ve yerli görünmüyordu.' },
  { w: 13, t: 'Dört yol', k: 's3', q: 'Liste, form ve API tüketen bir iş uygulaması için ders hangi yaklaşımı önerir?', o: ['Cross-platform', 'Native', 'Hybrid', 'PWA'], a: 0, e: 'Dönem projesi için cevap: Cross-platform, özel olarak Flutter.' },
  { w: 13, t: 'Dört yol', k: 's3', q: 'Mağaza gerektirmeyen ama donanıma sınırlı erişen yaklaşım hangisidir?', o: ['PWA', 'Native', 'Cross-platform', 'Unity'], a: 0, e: 'PWA aslında telefona eklenen bir web sitesidir.' },
  { w: 13, t: 'Hangi dil?', k: 's4', q: 'Flutter hangi dille yazılır?', o: ['Dart', 'Kotlin', 'Swift', 'C#'], a: 0, e: 'Dart öğrenmek pratikte Flutter öğrenmek demektir.' },
  { w: 13, t: 'Hangi dil?', k: 's4', q: 'Android native için Google\'ın 2017\'den beri resmî önerdiği dil hangisidir?', o: ['Kotlin', 'Java', 'Swift', 'Dart'], a: 0, e: 'iOS native tarafta resmî dil Swift\'tir.' },
  { w: 13, t: 'Neden Flutter?', k: 's5', q: 'Flutter\'ın en bilinen maliyeti nedir?', o: ['Uygulama boyutunun büyük olması', 'Sadece Android\'de çalışması', 'Hot reload olmaması', 'JSON okuyamaması'], a: 0, e: 'Kendi çizim motorunu paketin içinde taşır.' },
  { w: 13, t: 'Geliştiricinin masası', k: 's6', q: 'Kurulumun doğru olduğunu hangi komut kontrol eder?', o: ['flutter doctor', 'flutter run', 'flutter pub get', 'flutter create'], a: 0, e: 'Flutter ve Android toolchain satırları yeşilse derse devam edilebilir.' },
  { w: 13, t: 'Geliştiricinin masası', k: 's6', q: 'iPhone\'a uygulama derlemek için ne gerekir?', o: ['Mac bilgisayar', 'Android Studio', 'Windows', 'Emülatör'], a: 0, e: 'Bu Flutter\'ın değil Apple\'ın kuralıdır.' },
  { w: 13, t: 'Proje haritası', k: 's7', q: 'Yazdığın Dart kodunun büyük kısmı hangi klasöre girer?', o: ['lib/', 'android/', 'build/', 'test/'], a: 0, e: 'Dart kodu lib/, paket bildirimi pubspec.yaml, izinler android/.' },
  { w: 13, t: 'Proje haritası', k: 's7', q: 'INTERNET izni hangi dosyaya eklenir?', o: ['AndroidManifest.xml', 'pubspec.yaml', 'main.dart', 'Info.plist'], a: 0, e: 'android/app/src/main/AndroidManifest.xml.' },
  { w: 13, t: 'Widget ve state', k: 's8', q: 'Zamanla değişen parçalar (sayaç, API verisi) için hangisi kullanılır?', o: ['StatefulWidget', 'StatelessWidget', 'MaterialApp', 'pubspec.yaml'], a: 0, e: 'StatefulWidget setState çağrıldığında yeniden çizilir.' },
  { w: 13, t: 'Widget ve state', k: 's8', q: 'C#\'taki Task<T>\'nin Dart karşılığı nedir?', o: ['Future<T>', 'Stream<T>', 'List<T>', 'Map<T>'], a: 0, e: 'Aynı fikir, farklı isim; async/await birebir aynıdır.' },
  { w: 13, t: 'pub.dev', k: 's9', q: 'pub.dev neyin karşılığıdır?', o: ['.NET\'teki NuGet', 'SQL Server', 'Swagger', 'Postman'], a: 0, e: 'Flutter\'ın paket deposudur.' },
  { w: 13, t: 'İstek 1: Şehir → koordinat', k: 's13', q: '"Isparta" araması neden birden fazla sonuç döndürdü?', o: ['Aynı adı taşıyan birden fazla yer kaydı var', 'API hatalı çalışıyor', 'count parametresi yok', 'JSON bozuk'], a: 0, e: 'İlk sonucu otomatik almak hatalıdır; kullanıcıya seçtirilmelidir.' },
  { w: 13, t: 'Altı keşif', k: 's16', q: 'Open-Meteo\'nun hourly alanı nasıl gelir?', o: ['İçinde iki paralel dizi olan bir nesne', 'Nesne listesi', 'Tek bir sayı', 'Metin'], a: 0, e: 'time[] ve temperature_2m[] aynı index üzerinden eşleşir.' },
  { w: 13, t: 'Altı keşif', k: 's16', q: 'weather_code: 1 için hangisi doğrudur?', o: ['Bir WMO kodudur; anlamını uygulama çevirir', '"Az bulutlu" metni hazır gelir', 'Sıcaklık değeridir', 'Hata kodudur'], a: 0, e: 'API veri verir, anlam vermez.' },
  { w: 13, t: 'İstek 3–4: Tahmin ve hata', k: 's15', q: '400 Bad Request ne demektir?', o: ['Gönderdiğin istek yanlış', 'Sunucu çöktü', 'Adres yok', 'Çok fazla istek attın'], a: 0, e: '400 aldığında hatayı API\'de arama; isteği düzelt.' },
  { w: 13, t: 'Klasik duvarlar', k: 's19', q: 'Android emülatöründen bilgisayardaki API\'ye hangi adresle bağlanılır?', o: ['10.0.2.2', 'localhost', '127.0.0.1', '0.0.0.0'], a: 0, e: 'Emülatörün localhost\'u kendisidir.' },
  { w: 13, t: 'Dil modeliyle geliştirme', k: 's20', q: 'Dil modeline en güçlü istem hangisidir?', o: ['Gerçek adres ve Postman\'den alınan gerçek JSON\'u vermek', '"Hava durumu uygulaması yaz" demek', 'Sadece ekran görüntüsü vermek', 'Paket adlarını modele bırakmak'], a: 0, e: 'Gerçek veri, modelin uydurma alanını kapatır.' },
  { w: 14, t: 'İki tür kayıt', k: 's3', q: 'Anonim kayıt ucunda rolü kim belirler?', o: ['Sunucu; her zaman Uye', 'İstemci istekte gönderir', 'Kullanıcı formdan seçer', 'Veritabanı rastgele seçer'], a: 0, e: 'Rolü istemci seçerse "yetkiId": 1 yazan herkes yönetici olur.' },
  { w: 14, t: 'İki tür kayıt', k: 's3', q: 'İstemcinin kendi rolünü seçip yönetici olmasına ne denir?', o: ['Yetki yükseltme', 'Kullanıcı sayımı', 'Over-posting', 'CORS'], a: 0, e: 'Gerçek dünyada en sık rastlanan güvenlik açıklarındandır.' },
  { w: 14, t: 'Veritabanına üye rolü', k: 's4', q: 'Yetki tablosuna "Uye" satırı eklendikten sonra scaffold\'u tekrar çalıştırmak gerekir mi?', o: ['Hayır; satır eklemek şemayı değiştirmez', 'Evet, her zaman', 'Sadece iOS için', 'Evet, migration ile'], a: 0, e: 'Yeni sütun veya tablo eklenseydi gerekirdi.' },
  { w: 14, t: 'Şifre nasıl saklanır?', k: 's5', q: 'Salt neden her kullanıcıda farklı olmalı?', o: ['Aynı şifreyi kullanan iki kişinin hash\'i farklı çıksın', 'Şifre daha kısa olsun', 'Token küçülsün', 'Giriş hızlansın'], a: 0, e: 'Rastgele salt, önceden hesaplanmış hash tablolarını da işe yaramaz yapar.' },
  { w: 14, t: 'KayitDto ve kurallar', k: 's6', q: 'KayitDto\'da iki şifre alanının eşitliğini hangi öznitelik kontrol eder?', o: ['[Compare]', '[Range]', '[Required]', '[EmailAddress]'], a: 0, e: '[Compare(nameof(Sifre))] SifreTekrar alanında kullanılır.' },
  { w: 14, t: 'KayitDto ve kurallar', k: 's6', q: 'Telefondaki doğrulama silinirse ne olur?', o: ['Uygulama çalışır, sadece kullanımı hantallaşır', 'Veritabanına çöp girer', 'API çöker', 'Token üretilmez'], a: 0, e: 'Telefondaki doğrulama kolaylık, sunucudaki doğrulama güvenliktir.' },
  { w: 14, t: 'Kayıt ucunu yazalım', k: 's7', q: 'Kayıt ucunda e-posta neden küçük harfe çevrilir?', o: ['"Ayse@ders.com" ile "ayse@ders.com" iki ayrı hesap olmasın', 'Veritabanı büyük harf kabul etmez', 'Token kısa olsun', 'JSON böyle ister'], a: 0, e: 'ToLowerInvariant() ile tutarlılık sağlanır.' },
  { w: 14, t: 'Kayıt ucunu yazalım', k: 's7', q: 'Kayıt başarılı olunca dönen kod hangisidir?', o: ['201', '200', '204', '409'], a: 0, e: 'Yeni kaynak oluştu; cevapta şifre, salt ve hash dönmez.' },
  { w: 14, t: 'Giriş ve token', k: 's8', q: 'Giriş başarısız olunca neden hep "E-posta veya şifre hatalı" denir?', o: ['Kullanıcı sayımını engellemek için', 'Kod kısalsın diye', 'Türkçe karakter sorunu yüzünden', 'Token üretilemediği için'], a: 0, e: '"Bu e-posta kayıtlı değil" demek kimlerin üye olduğunu öğretir.' },
  { w: 14, t: 'Giriş ve token', k: 's8', q: 'Token\'ın son kullanma zamanını tutan claim hangisidir?', o: ['exp', 'alg', 'sub', 'typ'], a: 0, e: 'Süresi dolunca API 401 döner, uygulama girişe yönlendirmelidir.' },
  { w: 14, t: '"Ben kimim?" ucu', k: 's9', q: 'Depoda token olması oturumun geçerli olduğunu kanıtlar mı?', o: ['Hayır; me ucuna sorup 200 almak gerekir', 'Evet, her zaman', 'Sadece Android\'de', 'Evet, token şifreli olduğu için'], a: 0, e: 'Token\'ın süresi dolmuş olabilir; 401 gelirse depo temizlenir.' },
  { w: 14, t: 'Adres meselesi', k: 's12', q: 'API\'nin emülatör ve telefondan erişilebilmesi için hangi adreste dinlemesi gerekir?', o: ['0.0.0.0:5000', 'localhost:5000', '127.0.0.1:5000', '10.0.2.2:5000'], a: 0, e: 'localhost yalnızca kendi bilgisayarından gelen istekleri dinler.' },
  { w: 14, t: 'Adres meselesi', k: 's12', q: 'Gerçek telefondan bilgisayardaki API\'ye hangi adresle bağlanılır?', o: ['Bilgisayarın ağdaki IP\'si (192.168.x.x)', '10.0.2.2', 'localhost', '0.0.0.0'], a: 0, e: 'Windows\'ta ipconfig ile IPv4 adresi öğrenilir.' },
  { w: 14, t: 'Flutter projesi', k: 's11', q: 'usesCleartextTraffic="true" ne işe yarar?', o: ['Düz HTTP trafiğine izin verir; sadece ders ortamı için', 'HTTPS\'i zorunlu kılar', 'İnternet izni verir', 'Token\'ı şifreler'], a: 0, e: 'Yayına çıkan uygulamada bulunmaz; şifreler ağda açık gider.' },
  { w: 14, t: 'Token\'ı saklamak', k: 's16', q: 'Token cihazda nerede saklanmalıdır?', o: ['flutter_secure_storage', 'shared_preferences', 'Düz metin dosyası', 'Global değişken'], a: 0, e: 'Android Keystore / iOS Keychain kullanır; shared_preferences düz metindir.' },
  { w: 14, t: 'Token\'ı saklamak', k: 's16', q: 'flutter_secure_storage Android\'de en az hangi minSdk\'yı ister?', o: ['23', '21', '16', '30'], a: 0, e: 'Hata mesajı: minSdkVersion 21 cannot be smaller than version 23.' },
  { w: 14, t: 'ApiIstemci', k: 's15', q: 'ApiIstemci\'de statusCode kontrolü neden jsonDecode\'dan önce gelir?', o: ['Hata sayfası JSON sanılıp FormatException alınmasın', 'Daha hızlı olsun', 'Token eklensin', 'İstek iki kez gitsin'], a: 0, e: 'Önce durum koduna bak, sonra gövdeyi çöz.' },
  { w: 14, t: 'Kayıt ekranı', k: 's17', q: 'Yükleniyorken düğmenin onPressed değerini null yapmak ne sağlar?', o: ['Çift gönderimi engeller', 'Düğmeyi gizler', 'Formu temizler', 'Hata mesajı gösterir'], a: 0, e: 'onPressed null olan düğme soluklaşır ve basılamaz.' },
  { w: 14, t: 'Kayıt ekranı', k: 's17', q: '400 cevabındaki errors nesnesi nasıl gösterilmeli?', o: ['Mesajlar ilgili alanın altına yazılmalı', 'Tek SnackBar ile', 'Hiç gösterilmemeli', 'Konsola yazılmalı'], a: 0, e: 'errors hangi alanın hatalı olduğunu zaten söyler.' },
  { w: 14, t: 'Giriş ekranı', k: 's18', q: 'Girişten ana ekrana geçerken neden pushReplacement kullanılır?', o: ['Geri tuşuyla girişe dönülmesin', 'Ekran daha hızlı açılsın', 'Token silinsin', 'Form doğrulansın'], a: 0, e: 'push üstüne koyar, pushReplacement değiştirir.' },
  { w: 14, t: 'Açılış, ana ekran, çıkış', k: 's19', q: 'Açılış ekranında istek neden initState içinde başlatılır?', o: ['build içinde olursa her çizimde tekrar çalışır', 'initState daha güvenlidir', 'Token orada saklanır', 'Hot reload için'], a: 0, e: 'İstek bir kez başlatılmalıdır.' },
];
QUESTIONS.forEach(x => { x.c = x.w > 10 ? 'mu' : 'yz'; x.d = x.w > 10 ? x.w - 10 : x.w; });
WEEKS.forEach(x => { x.c = x.c || 'yz'; x.d = x.d || x.n; });

function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function buildQuestions(weeks, count, seedStr) {
  const r = rng(hash(seedStr));
  const pools = weeks.map(w => shuffle(QUESTIONS.filter(q => q.w === w), r));
  const out = []; let k = 0;
  while (out.length < count && pools.some(p => p.length)) { const p = pools[k % pools.length]; if (p.length) out.push(p.shift()); k++; }
  return shuffle(out, r).map(q => { const perm = shuffle([0, 1, 2, 3], r); return { ...q, o: perm.map(i => q.o[i]), a: perm.indexOf(q.a) }; });
}

return { COURSES, WEEKS, QUESTIONS, hash, rng, shuffle, buildQuestions }; })();
const S = (function(){ // Ses efektleri — dosya yok, Web Audio ile üretilir
let ctx = null, muted = false;
try { muted = localStorage.getItem('saldue-ses') === '0'; } catch (e) {}
function ac() {
  if (!ctx) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ctx = new A(); }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
// Tarayıcılar sesi ancak kullanıcı etkileşiminden sonra açar
['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, () => ac(), { passive: true }));
function tone(f0, f1, dur, type, vol, delay = 0) {
  const c = ac(); if (!c) return; const t = c.currentTime + delay;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
}
function noise(dur, filter, f0, f1, vol) {
  const c = ac(); if (!c) return; const t = c.currentTime;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  src.buffer = buf; fl.type = filter; fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(fl).connect(g).connect(c.destination); src.start(t);
}
const SFX = {
  throw: () => noise(0.28, 'bandpass', 1800, 400, 0.35),
  hit: () => { tone(160, 50, 0.25, 'sine', 0.6); noise(0.12, 'lowpass', 2000, 300, 0.3); },
  boom: () => { tone(110, 30, 0.7, 'sine', 0.7); noise(0.8, 'lowpass', 1600, 80, 0.6); },
  splash: () => noise(0.5, 'highpass', 900, 3000, 0.25),
  ok: () => { tone(660, 660, 0.12, 'triangle', 0.25); tone(990, 990, 0.2, 'triangle', 0.25, 0.1); },
  bad: () => tone(220, 140, 0.35, 'square', 0.12),
  turn: () => { tone(880, 880, 0.08, 'sine', 0.25); tone(880, 880, 0.08, 'sine', 0.25, 0.14); },
  coin: () => { tone(1320, 1320, 0.06, 'square', 0.1); tone(1760, 1760, 0.12, 'square', 0.1, 0.06); },
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, f, 0.22, 'triangle', 0.25, i * 0.12)),
  lose: () => [392, 330, 262].forEach((f, i) => tone(f, f * 0.97, 0.3, 'triangle', 0.22, i * 0.18)),
};
return {
  play(name) { if (muted || !SFX[name]) return; try { SFX[name](); } catch (e) {} },
  get muted() { return muted; },
  setMuted(m) { muted = !!m; try { localStorage.setItem('saldue-ses', muted ? '0' : '1'); } catch (e) {} },
};
})();
const E = (function(){ // Sal Düellosu v2 — takımlı sallar, dükkan silahları, kanonik koordinatlarla ağ uyumlu atış
const WEAPONS = [
  { id: 'tas', name: 'Taş', dmg: 15, gm: 1.0, ex: false, price: 0 },
  { id: 'mizrak', name: 'Mızrak', dmg: 22, gm: 1.0, ex: false, price: 100 },
  { id: 'bomba', name: 'Bomba', dmg: 30, gm: 1.0, ex: true, R: 150, price: 180 },
  { id: 'gulle', name: 'Top güllesi', dmg: 36, gm: 1.0, ex: true, R: 175, price: 260 },
  { id: 'roket', name: 'Roket', dmg: 44, gm: 0.6, ex: true, R: 200, price: 340 },
];
const RAFT_UP = { price: 700, hp: 0.5, armor: 0.8 }; // hp: oyuncu başı canın oranı
const G = 1000;
const C = {
  ink: '#201e1d', red: '#ec3013', bg: '#f3f2f2', wood: '#b47b44', woodD: '#7a4f27', woodL: '#d39d62', rope: '#ecd9ae',
  skyT: '#b4d3e0', skyB: '#eef1ef', seaB: '#6fa4b8', seaF: '#2f6c87', seaD: '#235873', isl: '#a3bfc5', islD: '#8aa9b0',
};
const SKINS = ['#f1c49c', '#d29c76', '#e8b48a', '#c58c66'];
const FONT = 'Archivo, system-ui, sans-serif';
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

class BattleScene {
  constructor(canvas, o = {}) {
    this.c = canvas; this.g = canvas.getContext('2d'); this.o = o; this.demo = !!o.demo;
    this.flip = !!o.flip; this.sx = this.flip ? -1 : 1; this.myTeam = this.flip ? 1 : 0;
    this.teamNames = o.teamNames || ['Kırmızı takım', 'Siyah takım'];
    this.W = 3300; this.H = 760; this.SEA = 590;
    const teams = o.teams || [['Sen'], ['Rakip']];
    this.R = [0, 1].map(team => {
      const left = (team ^ (this.flip ? 1 : 0)) === 0, face = left ? 1 : -1;
      return {
        team, x: left ? 520 : 2780, tx: left ? 520 : 2780, face, flag: team === 0 ? C.red : C.ink, koOn: false, ko: 0, armor: 1, up: false,
        chars: teams[team].map((name, slot) => ({ name, slot, shirt: team === 0 ? C.red : C.ink, band: team === 0 ? C.ink : C.red, skin: SKINS[(team * 2 + slot) % 4], arm: face > 0 ? -0.65 : Math.PI + 0.65, armT: face > 0 ? -0.65 : Math.PI + 0.65, w: 0, hit: 0 })),
      };
    });
    this.t = 0; this.proj = null; this.parts = []; this.floats = []; this.trail = []; this.shake = 0;
    this.wind = 0; this.mode = 'self'; this.hold = null; this.holdT = 0; this.aim = null; this.drag = null; this.weapon = 0;
    this.clouds = Array.from({ length: 11 }, (_, i) => ({ x: i * 500 + Math.random() * 260, y: 40 + Math.random() * 200, s: 0.6 + Math.random() * 0.9 }));
    this.islands = [{ x: 600, w: 560, h: 70 }, { x: 1750, w: 760, h: 115, lh: true }, { x: 2900, w: 520, h: 64 }, { x: 3700, w: 600, h: 90 }];
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this._resize();
    this.ro = new ResizeObserver(() => this._resize()); this.ro.observe(canvas);
    this._pd = e => this._down(e); this._pm = e => this._move(e); this._pu = e => this._up(e);
    canvas.addEventListener('pointerdown', this._pd); window.addEventListener('pointermove', this._pm); window.addEventListener('pointerup', this._pu);
    canvas.style.touchAction = 'none';
    this.cam = this._camTarget();
    this.demoT = 1.2; this.busy = false; this.dFrom = 1;
    this.alive = true; this.last = performance.now();
    const loop = now => { if (!this.alive) return; const dt = Math.min(0.033, (now - this.last) / 1000); this.last = now; this._step(dt); this._draw(); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
    // Sekme arka plandayken requestAnimationFrame durur; oda sahibinin atışları
    // sonuçlansın diye simülasyonu zamanlayıcıyla ilerlet (en fazla 5 sn telafi).
    this.bgT = setInterval(() => {
      const now = performance.now();
      if (!this.alive || now - this.last < 250) return;
      let left = Math.min(5, (now - this.last) / 1000); this.last = now;
      while (left > 0) { const dt = Math.min(0.033, left); this._step(dt); left -= dt; }
    }, 200);
  }
  destroy() {
    this.alive = false; cancelAnimationFrame(this.raf); clearInterval(this.bgT); this.ro.disconnect();
    this.c.removeEventListener('pointerdown', this._pd); window.removeEventListener('pointermove', this._pm); window.removeEventListener('pointerup', this._pu);
  }

  // ---------- public API (canonical velocities: team 0 shoots toward +x) ----------
  setWind(w) { this.wind = w || 0; }
  setGap(gap) { for (const R of this.R) R.tx = R.face > 0 ? 520 : 520 + gap; }
  _wloc(w) { return this.wind * this.sx * (w && w.id === 'roket' ? 0.5 : 1); }
  setKO(team) { this.R[team].koOn = true; }
  setArmor(team, a) { this.R[team].armor = a; this.R[team].up = a < 1; }
  focus(team) { this.mode = team === this.myTeam ? 'self' : 'enemy'; }
  setWeapon(wi) { this.weapon = wi; if (this.aim) this.R[this.aim.team].chars[this.aim.slot].w = wi; }
  cancelAim() { this.aim = null; this.drag = null; this._aimRes = null; }
  requestAim(team, slot, wi) {
    this.focus(team); this.aim = { team, slot }; this.drag = null; this.setWeapon(wi);
    return new Promise(res => { this._aimRes = res; });
  }
  aiVelocity(team, slot, wi, acc) {
    const to = 1 - team, ch = this.R[team].chars[slot], tgt = this.R[to].chars[Math.floor(Math.random() * this.R[to].chars.length)];
    const th = 0.62 + Math.random() * 0.33, f = this.R[team].face;
    const ang = f > 0 ? -th : th - Math.PI;
    const L = this._launch(team, slot, ang), T = this._body(to, tgt.slot);
    const g = G * WEAPONS[wi].gm, D = Math.abs(T.x - L.x), yUp = L.y - T.y;
    const den = 2 * Math.cos(th) ** 2 * (D * Math.tan(th) - yUp);
    let v = den > 0 ? Math.sqrt(g * D * D / den) : 1300;
    const wl = this._wloc(WEAPONS[wi]), ca = Math.cos(ang), sa = Math.sin(ang);
    const sim = vv => { let x = L.x, y = L.y, vx = ca * vv, vy = sa * vv; for (let i = 0; i < 1500; i++) { const h = 1 / 120; vy += g * h; vx += wl * h; x += vx * h; y += vy * h; if (vy > 0 && y >= T.y) break; } return x; };
    if (wl) for (let it = 0; it < 5; it++) { const dx = (sim(v) - L.x) * f; if (dx <= 1) { v *= 1.2; continue; } v *= Math.sqrt(D / dx); }
    v = Math.min(1760, v * (1 + gauss() * (0.015 + (1 - acc) * 0.08)));
    ch.armT = ang;
    return { vx: Math.cos(ang) * v * this.sx, vy: Math.sin(ang) * v };
  }
  playShot(team, slot, wi, vx, vy) {
    this.weapon = wi; const ch = this.R[team].chars[slot]; if (ch) ch.w = wi;
    const lvx = vx * this.sx, ang = Math.atan2(vy, lvx), L = this._launch(team, slot, ang);
    if (ch) { ch.arm = ang; ch.armT = ang; }
    this.proj = { team, x: L.x, y: L.y, vx: lvx, vy, age: 0, w: WEAPONS[wi] };
    this.trail = []; this.mode = 'proj';
    if (!this.demo) S.play('throw');
    return new Promise(r => { this._fireRes = r; });
  }

  // ---------- geometry ----------
  _resize() {
    const r = this.c.getBoundingClientRect();
    this.cw = Math.max(1, r.width); this.ch = Math.max(1, r.height);
    this.c.width = Math.round(this.cw * this.dpr); this.c.height = Math.round(this.ch * this.dpr);
    this._view();
  }
  setInsets(t, b) { this.tT = t || 0; this.tB = b || 0; if (this.iT == null) { this.iT = this.tT; this.iB = this.tB; } }
  _view() {
    if (this.demo || this.iT == null) {
      this.s = Math.max(this.ch / this.H, this.cw / 1500);
      this.vw = this.cw / this.s; this.vh = this.ch / this.s; this.camY = this.H - this.vh; return;
    }
    const ch = this.ch, cw = this.cw, top = this.iT, bot = this.iB;
    const ref = Math.max(150, ch - top - Math.max(this.tB, ch * 0.3));
    this.s = Math.max(cw / 1800, Math.min(ref / 420, cw / 950));
    const playH = Math.max(140, ch - top - bot);
    this.vw = cw / this.s; this.vh = ch / this.s;
    this.camY = this.SEA - (top + playH * 0.8) / this.s;
  }
  waveY(x, k = 0) { return this.SEA + Math.sin(x * 0.011 + this.t * 1.3 + k) * 7 + Math.sin(x * 0.027 - this.t * 0.9 + k * 2) * 4; }
  _raft(team) { const r = this.R[team]; return { y: this.waveY(r.x) - 2, tilt: (this.waveY(r.x + 60) - this.waveY(r.x - 60)) / 120 }; }
  _off(team, slot) { const r = this.R[team]; return r.chars.length === 1 ? 0 : (slot === 0 ? r.face * 46 : -r.face * 34); }
  _body(team, slot) { return { x: this.R[team].x + this._off(team, slot), y: this._raft(team).y - 90 }; }
  _launch(team, slot, ang) { const r = this.R[team], ry = this._raft(team).y; const sx = r.x + this._off(team, slot) + r.face * 6, sy = ry - 92; return { x: sx + Math.cos(ang) * 42, y: sy + Math.sin(ang) * 42 }; }
  _camTarget() {
    const vw = this.vw; let x;
    const my = this.R[this.myTeam], en = this.R[1 - this.myTeam];
    if (this.demo && !this.proj && this.hold == null) x = (this.W - vw) * (0.5 - 0.5 * Math.cos(this.t * 0.18));
    else if (this.proj) x = this.proj.x - vw * 0.5;
    else if (this.hold != null) x = this.hold - vw * 0.5;
    else if (this.mode === 'enemy') x = en.x - vw * 0.72;
    else x = my.x - vw * 0.28;
    return Math.max(0, Math.min(this.W - vw, x));
  }

  // ---------- input ----------
  _pt(e) { const r = this.c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  _down(e) { if (!this.aim || this.proj) return; const p = this._pt(e); this.drag = { sx: p.x, sy: p.y, cx: p.x, cy: p.y }; e.preventDefault(); }
  _move(e) { if (!this.drag) return; const p = this._pt(e); this.drag.cx = p.x; this.drag.cy = p.y; const v = this._dragVec(); if (v && this.aim) this.R[this.aim.team].chars[this.aim.slot].armT = v.ang; }
  _up() {
    if (!this.drag) return; const v = this._dragVec(); this.drag = null;
    if (!v || v.p < 0.06 || !this.aim) return;
    const f = this._aimRes; this._aimRes = null; this.aim = null;
    f && f({ vx: v.vx * this.sx, vy: v.vy, wi: this.weapon });
  }
  _dragVec() {
    const d = this.drag; if (!d) return null;
    const dx = d.sx - d.cx, dy = d.sy - d.cy, len = Math.hypot(dx, dy); if (len < 4) return null;
    const p = Math.min(1, len / 200), v = 380 + p * 1380, ang = Math.atan2(dy, dx);
    return { p, v, ang, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v };
  }

  // ---------- simulation ----------
  _collide() {
    const pr = this.proj, ti = 1 - pr.team, T = this.R[ti], r = this._raft(ti);
    let best = 1e9;
    for (const ch of T.chars) { const b = this._body(ti, ch.slot); best = Math.min(best, Math.hypot(pr.x - b.x, pr.y - b.y)); }
    if (best < 52 && !T.koOn) { this._impact('direct', ti, best); return true; }
    if (Math.abs(pr.x - T.x) < 124 && pr.y > r.y - 24 && pr.y < r.y + 22) { this._impact('raft', ti, best); return true; }
    if (pr.y > this.waveY(pr.x)) { this._impact('water', ti, best); return true; }
    if (pr.x < -400 || pr.x > this.W + 400 || pr.age > 9) { this._impact('out', ti, best); return true; }
    return false;
  }
  _impact(kind, ti, d) {
    const pr = this.proj, w = pr.w, T = this.R[ti]; let mult = 0;
    if (kind === 'direct') mult = 1;
    else if (w.ex) { if (kind !== 'out' && d < w.R) mult = Math.max(0.3, 1 - d / w.R) * 0.85; }
    else if (kind === 'raft') mult = 0.5;
    const dmg = Math.round(w.dmg * mult * T.armor);
    const iy = Math.min(pr.y, this.waveY(pr.x));
    if (w.ex && kind !== 'out') this._boom(pr.x, iy, w.R);
    if (kind === 'water') this._splash(pr.x, this.waveY(pr.x), w.ex ? 1.6 : 1);
    if (kind === 'raft') this._chips(pr.x, pr.y);
    if (kind === 'direct' && !w.ex) this._puff(pr.x, pr.y);
    if (dmg > 0) {
      T.chars.forEach(c => c.hit = 0.7);
      const fx = T.x, fy = this._raft(ti).y - 180;
      this.floats.push({ x: fx, y: fy, text: '−' + dmg, life: 1.5, max: 1.5, color: C.red, size: 54 });
      if (mult >= 1) this.floats.push({ x: fx, y: fy - 58, text: 'TAM İSABET', life: 1.5, max: 1.5, color: C.ink, size: 26 });
      this.shake = w.ex ? 0.5 : 0.3;
    } else if (kind !== 'out') this.floats.push({ x: pr.x, y: iy - 70, text: 'ISKA', life: 1.2, max: 1.2, color: C.ink, size: 34 });
    if (!this.demo && kind !== 'out') S.play(w.ex ? 'boom' : dmg > 0 || kind === 'raft' ? 'hit' : 'splash');
    this._lastRes = { kind, mult, dmg, hit: dmg > 0 };
    this.hold = Math.max(0, Math.min(this.W, pr.x)); this.holdT = 1.1; this.proj = null;
  }
  _part(o) { this.parts.push(Object.assign({ g: 900, life: 0.8, max: 0.8, r: 5, color: C.ink, shape: 'c' }, o)); }
  _boom(x, y, R) {
    this.parts.push({ x, y, vx: 0, vy: 0, g: 0, life: 0.5, max: 0.5, r: 10, R, shape: 'ring', color: C.red });
    const cols = [C.red, '#ff9783', C.ink, '#f3b23e'];
    for (let i = 0; i < 34; i++) { const a = Math.random() * Math.PI * 2, s = 150 + Math.random() * 450, l = 0.5 + Math.random() * 0.6; this._part({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 250, r: 4 + Math.random() * 8, color: cols[i % 4], life: l, max: l }); }
    for (let i = 0; i < 10; i++) { const l = 1 + Math.random() * 0.8; this._part({ x: x + (Math.random() - 0.5) * 60, y: y - Math.random() * 30, vx: (Math.random() - 0.5) * 60, vy: -40 - Math.random() * 60, g: -30, r: 14 + Math.random() * 16, color: 'rgba(80,78,76,.35)', life: l, max: l }); }
  }
  _splash(x, y, s) { for (let i = 0; i < 20; i++) { const l = 0.6 + Math.random() * 0.5; this._part({ x: x + (Math.random() - 0.5) * 20, y, vx: (Math.random() - 0.5) * 260 * s, vy: -(300 + Math.random() * 450) * s, g: 1400, r: 3 + Math.random() * 5, color: i % 3 ? '#ffffff' : '#cfe6ee', life: l, max: l }); } }
  _chips(x, y) { for (let i = 0; i < 14; i++) { const l = 0.7 + Math.random() * 0.4; this._part({ x, y, vx: (Math.random() - 0.5) * 380, vy: -200 - Math.random() * 380, g: 1300, r: 3 + Math.random() * 4, color: i % 2 ? C.wood : C.woodD, shape: 'r', life: l, max: l }); } }
  _puff(x, y) { for (let i = 0; i < 12; i++) { const a = Math.random() * Math.PI * 2, l = 0.5 + Math.random() * 0.3; this._part({ x, y, vx: Math.cos(a) * 160, vy: Math.sin(a) * 160, g: 0, r: 6 + Math.random() * 6, color: 'rgba(255,255,255,.9)', life: l, max: l }); } }

  _step(dt) {
    this.t += dt; this.shake = Math.max(0, this.shake - dt);
    if (this.iT != null) { const k = Math.min(1, dt * 4); this.iT += (this.tT - this.iT) * k; this.iB += (this.tB - this.iB) * k; this._view(); }
    for (const r of this.R) { r.x += (r.tx - r.x) * Math.min(1, dt * 1.2); if (r.koOn) r.ko = Math.min(1, r.ko + dt * 0.9); for (const c of r.chars) { c.hit = Math.max(0, c.hit - dt); c.arm += (c.armT - c.arm) * Math.min(1, dt * 10); } }
    const pr = this.proj;
    if (pr) {
      pr.age += dt; const n = 4, h = dt / n;
      const wl = this._wloc(pr.w); for (let k = 0; k < n; k++) { pr.vy += G * pr.w.gm * h; pr.vx += wl * h; pr.x += pr.vx * h; pr.y += pr.vy * h; if (this._collide()) break; }
      if (this.proj) {
        this.trail.push({ x: pr.x, y: pr.y }); if (this.trail.length > 24) this.trail.shift();
        const a = Math.atan2(pr.vy, pr.vx);
        if (pr.w.id === 'roket') { const l = 0.5 + Math.random() * 0.4; this._part({ x: pr.x - Math.cos(a) * 28, y: pr.y - Math.sin(a) * 28, vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.5) * 40, g: -20, r: 7 + Math.random() * 7, color: 'rgba(90,88,86,.35)', life: l, max: l }); }
        if (pr.w.id === 'bomba' && Math.random() < 0.6) this._part({ x: pr.x, y: pr.y - 16, vx: (Math.random() - 0.5) * 120, vy: -Math.random() * 120, g: 300, r: 2.5, color: '#f3b23e', life: 0.3, max: 0.3 });
      }
    }
    if (this.holdT > 0) {
      this.holdT -= dt;
      if (this.holdT <= 0) { this.hold = null; if (this.mode === 'proj') this.mode = 'self'; const f = this._fireRes; this._fireRes = null; f && f(this._lastRes); }
    }
    for (const p of this.parts) { p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; if (p.shape === 'ring') p.r += (p.R - p.r) * Math.min(1, dt * 9); }
    this.parts = this.parts.filter(p => p.life > 0);
    for (const f of this.floats) { f.y -= 46 * dt; f.life -= dt; }
    this.floats = this.floats.filter(f => f.life > 0);
    const tgt = this._camTarget(); this.cam += (tgt - this.cam) * (1 - Math.exp(-dt * (this.proj ? 7 : 3.2)));
    if (this.demo && !this.busy) {
      this.demoT -= dt;
      if (this.demoT <= 0) {
        this.busy = true; this.dFrom ^= 1; const wi = Math.floor(Math.random() * WEAPONS.length);
        this.focus(this.dFrom);
        setTimeout(() => { if (!this.alive) return; const v = this.aiVelocity(this.dFrom, 0, wi, 0.72); setTimeout(() => { if (!this.alive) return; this.playShot(this.dFrom, 0, wi, v.vx, v.vy).then(() => { this.busy = false; this.demoT = 0.6; }); }, 600); }, 900);
      }
    }
  }

  // ---------- drawing ----------
  _draw() {
    const g = this.g, s = this.s, cam = this.cam;
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const grd = g.createLinearGradient(0, 0, 0, this.ch); grd.addColorStop(0, C.skyT); grd.addColorStop(1, C.skyB);
    g.fillStyle = grd; g.fillRect(0, 0, this.cw, this.ch);
    let ox = 0, oy = 0; if (this.shake > 0) { ox = (Math.random() - 0.5) * 18 * this.shake; oy = (Math.random() - 0.5) * 18 * this.shake; }
    g.save(); g.translate(ox, oy); g.scale(s, s); g.translate(0, -this.camY);
    g.fillStyle = C.red; g.beginPath(); g.arc(this.vw * 0.72 - cam * 0.04, 165, 74, 0, Math.PI * 2); g.fill();
    const span = 5500;
    for (const c of this.clouds) { const x = (((c.x + this.t * 7 * c.s - cam * 0.25) % span) + span) % span - 300; if (x < -300 || x > this.vw + 300) continue; this._cloud(x, c.y, c.s); }
    for (const il of this.islands) { const x = il.x - cam * 0.5; if (x + il.w < -100 || x - il.w > this.vw + 100) continue; this._island(x, il); }
    g.translate(-cam, 0);
    this._sea(2.1, -20, C.seaB);
    for (let i = 0; i < 2; i++) { const px = this.R[i].x; if (px > cam - 400 && px < cam + this.vw + 400) this._raftDraw(i); }
    this._projDraw();
    this._aimPreview();
    this._sea(0, 6, C.seaF, true);
    this._sea(0.8, 64, C.seaD);
    g.fillStyle = C.seaD; g.fillRect(cam - 300, this.H - 2, this.vw + 600, 4000);
    for (const p of this.parts) {
      const a = Math.max(0, p.life / p.max);
      if (p.shape === 'ring') { g.strokeStyle = p.color; g.globalAlpha = a; g.lineWidth = 6; g.beginPath(); g.arc(p.x, p.y, p.r, 0, Math.PI * 2); g.stroke(); g.globalAlpha = 1; continue; }
      g.globalAlpha = Math.min(1, a * 1.4); g.fillStyle = p.color;
      if (p.shape === 'r') g.fillRect(p.x - p.r, p.y - p.r / 2, p.r * 2, p.r); else { g.beginPath(); g.arc(p.x, p.y, p.r, 0, Math.PI * 2); g.fill(); }
    }
    g.globalAlpha = 1;
    for (const f of this.floats) {
      g.globalAlpha = Math.min(1, f.life / f.max * 2);
      g.font = `900 ${f.size}px ${FONT}`; g.textAlign = 'center'; g.lineWidth = 6; g.strokeStyle = C.bg; g.strokeText(f.text, f.x, f.y); g.fillStyle = f.color; g.fillText(f.text, f.x, f.y);
    }
    g.globalAlpha = 1;
    g.restore();
    this._overlay();
  }
  _cloud(x, y, k) {
    const g = this.g; g.fillStyle = 'rgba(255,255,255,.92)';
    g.beginPath(); g.arc(x, y, 34 * k, 0, 7); g.arc(x + 40 * k, y - 16 * k, 42 * k, 0, 7); g.arc(x + 88 * k, y, 30 * k, 0, 7); g.fill();
    g.fillRect(x, y - 2, 88 * k, 32 * k);
  }
  _island(x, il) {
    const g = this.g, y = this.SEA - 10;
    g.fillStyle = C.isl; g.beginPath(); g.ellipse(x, y, il.w / 2, il.h, 0, Math.PI, 0); g.fill();
    g.fillStyle = C.islD; g.beginPath(); g.ellipse(x + il.w * 0.18, y, il.w * 0.28, il.h * 0.7, 0, Math.PI, 0); g.fill();
    if (il.lh) {
      const lx = x - 60, top = y - il.h - 110;
      for (let i = 0; i < 5; i++) { g.fillStyle = i % 2 ? '#f3f2f2' : C.red; g.fillRect(lx - 14 + i * 0.6, top + i * 26, 28 - i * 1.2, 26); }
      g.fillStyle = C.ink; g.fillRect(lx - 20, top - 10, 40, 10); g.fillRect(lx - 12, top - 34, 24, 24);
      g.fillStyle = (Math.sin(this.t * 3) > 0) ? '#f6d26b' : '#f3f2f2'; g.fillRect(lx - 8, top - 30, 16, 16);
    }
  }
  _sea(k, off, color, foam) {
    const g = this.g, x0 = this.cam - 40, x1 = this.cam + this.vw + 40;
    g.beginPath(); g.moveTo(x0, this.H + 400);
    for (let x = x0; x <= x1; x += 16) g.lineTo(x, this.waveY(x, k) + off);
    g.lineTo(x1, this.H + 400); g.closePath(); g.fillStyle = color; g.fill();
    if (foam) {
      g.beginPath(); for (let x = x0; x <= x1; x += 16) { const y = this.waveY(x, k) + off; x === x0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3; g.stroke();
    }
  }
  _raftDraw(team) {
    const g = this.g, R = this.R[team], r = this._raft(team), f = R.face, two = R.chars.length > 1;
    g.save(); g.translate(R.x, r.y); g.rotate(r.tilt * 0.6);
    const mx = -f * (two ? 112 : 96);
    g.fillStyle = C.woodD; g.fillRect(mx - 4, -190, 8, 176);
    g.fillStyle = R.flag; g.beginPath(); g.moveTo(mx, -188);
    for (let j = 0; j <= 10; j++) g.lineTo(mx - j * 7.5, -188 + Math.sin(this.t * 6 - j * 0.6) * 3.5 * (j / 10));
    for (let j = 10; j >= 0; j--) g.lineTo(mx - j * 7.5, -146 + Math.sin(this.t * 6 - j * 0.6) * 3.5 * (j / 10));
    g.closePath(); g.fill();
    if (!two) { const cx = -f * 52; g.fillStyle = C.woodL; g.fillRect(cx - 18, -48, 36, 32); g.strokeStyle = C.woodD; g.lineWidth = 3; g.strokeRect(cx - 18, -48, 36, 32); g.beginPath(); g.moveTo(cx - 18, -48); g.lineTo(cx + 18, -16); g.moveTo(cx + 18, -48); g.lineTo(cx - 18, -16); g.stroke(); }
    g.fillStyle = C.woodD; g.beginPath(); g.roundRect(-126, -22, 252, 20, 10); g.fill();
    g.fillStyle = C.wood; g.beginPath(); g.roundRect(-132, -6, 264, 22, 11); g.fill();
    if (R.up) { g.fillStyle = C.ink; g.fillRect(-132, -26, 264, 6); g.fillStyle = C.red; for (let k = -120; k < 120; k += 40) g.fillRect(k, -26, 20, 6); }
    g.strokeStyle = 'rgba(122,79,39,.55)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(-110, 4); g.lineTo(-30, 4); g.moveTo(10, 8); g.lineTo(100, 8); g.moveTo(-90, -13); g.lineTo(60, -13); g.stroke();
    for (const ex of [-130, 130]) { g.fillStyle = C.woodL; g.beginPath(); g.arc(ex, 5, 11, 0, 7); g.fill(); g.strokeStyle = C.woodD; g.lineWidth = 2.5; g.beginPath(); g.arc(ex, 5, 6, 0, 7); g.stroke(); }
    g.fillStyle = C.rope; for (const bx of [-84, 0, 84]) g.fillRect(bx - 4, -22, 8, 38);
    const order = R.chars.slice().sort((a, b) => b.slot - a.slot);
    for (const ch of order) {
      const ox = this._off(team, ch.slot);
      g.save(); g.translate(ox, -18);
      if (R.koOn) { g.translate(-f * R.ko * 10, 0); g.rotate(-f * R.ko * 1.45); }
      if (ch.hit > 0) { g.translate(-f * ch.hit * 22, 0); g.globalAlpha = (Math.floor(ch.hit * 22) % 2) ? 0.45 : 1; }
      this._char(R, ch, team);
      g.restore(); g.globalAlpha = 1;
      g.font = `800 18px ${FONT}`; g.textAlign = 'center';
      const nm = ch.name || ''; const tw = g.measureText(nm).width + 16, ty = (two && ch.slot === 1 ? -258 : -228) + (R.koOn ? 40 : 0);
      g.fillStyle = team === 0 ? C.red : C.ink; g.fillRect(ox - tw / 2, ty, tw, 26);
      g.fillStyle = '#fff'; g.fillText(nm, ox, ty + 19);
    }
    g.restore();
  }
  _char(R, p, team) {
    const g = this.g, f = R.face, ko = R.koOn;
    g.fillStyle = '#2d2b2b'; g.fillRect(-15, -34, 11, 34); g.fillRect(4, -34, 11, 34);
    g.fillStyle = p.shirt; g.beginPath(); g.roundRect(-23, -90, 46, 60, 10); g.fill();
    g.fillStyle = team === 0 ? '#fff' : C.red; g.fillRect(-23, -46, 46, 6);
    g.fillStyle = p.skin; g.beginPath(); g.arc(f * 2, -114, 25, 0, 7); g.fill();
    g.fillStyle = '#2d2b2b'; g.beginPath(); g.arc(f * 2, -116, 25.5, Math.PI * 1.02, Math.PI * 1.98); g.fill();
    g.fillStyle = p.band; g.fillRect(-24 + f * 2, -126, 50, 8);
    g.strokeStyle = p.band; g.lineWidth = 5; g.lineCap = 'round';
    const bx = -f * 22, wv = Math.sin(this.t * 8 + p.slot) * 4;
    g.beginPath(); g.moveTo(bx, -122); g.lineTo(bx - f * 18, -118 + wv); g.moveTo(bx, -121); g.lineTo(bx - f * 16, -108 + wv); g.stroke();
    const ex1 = f * 6, ex2 = f * 16;
    if (ko || p.hit > 0.2) {
      g.strokeStyle = C.ink; g.lineWidth = 3;
      for (const ex of [ex1, ex2]) { g.beginPath(); g.moveTo(ex - 4, -113); g.lineTo(ex + 4, -105); g.moveTo(ex + 4, -113); g.lineTo(ex - 4, -105); g.stroke(); }
    } else for (const ex of [ex1, ex2]) { g.fillStyle = '#fff'; g.beginPath(); g.arc(ex, -109, 5.5, 0, 7); g.fill(); g.fillStyle = C.ink; g.beginPath(); g.arc(ex + f * 1.8, -108.5, 2.8, 0, 7); g.fill(); }
    g.strokeStyle = C.ink; g.lineWidth = 2.5; g.beginPath(); g.arc(f * 11, -98, 5, 0.2 * Math.PI, 0.8 * Math.PI); g.stroke();
    if (ko) return;
    g.save(); g.translate(f * 6, -74); g.rotate(p.arm);
    g.fillStyle = p.shirt; g.beginPath(); g.roundRect(-4, -6, 30, 12, 6); g.fill();
    g.fillStyle = p.skin; g.fillRect(24, -5, 12, 10); g.beginPath(); g.arc(38, 0, 7, 0, 7); g.fill();
    const aiming = this.aim && this.aim.team === team && this.aim.slot === p.slot;
    if (aiming || (!this.proj && this.hold == null)) { g.translate(44, 0); g.scale(0.85, 0.85); this._weapon(WEAPONS[p.w].id, false); }
    g.restore();
  }
  _weapon(id, flying) {
    const g = this.g;
    const tri = (a, b, c, col) => { g.fillStyle = col; g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.lineTo(...c); g.closePath(); g.fill(); };
    switch (id) {
      case 'tas': g.fillStyle = '#8f8b86'; g.beginPath(); g.arc(0, 0, 10, 0, 7); g.fill(); g.fillStyle = '#b8b4ae'; g.beginPath(); g.arc(-3, -3, 4, 0, 7); g.fill(); break;
      case 'mizrak': g.strokeStyle = C.woodD; g.lineWidth = 4; g.beginPath(); g.moveTo(-46, 0); g.lineTo(28, 0); g.stroke(); tri([26, -7], [48, 0], [26, 7], '#6f6c69'); break;
      case 'bomba': g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 14, 0, 7); g.fill(); g.fillStyle = '#4a4745'; g.fillRect(-5, -19, 10, 6); g.fillStyle = '#ffffff55'; g.beginPath(); g.arc(-5, -5, 4, 0, 7); g.fill();
        g.strokeStyle = C.wood; g.lineWidth = 2.5; g.beginPath(); g.moveTo(0, -19); g.quadraticCurveTo(4, -27, 9, -28); g.stroke();
        g.fillStyle = '#f3b23e'; g.beginPath(); g.arc(10, -29, 3 + Math.sin(this.t * 30) * 1.4, 0, 7); g.fill(); break;
      case 'gulle': g.fillStyle = '#2d2b2b'; g.beginPath(); g.arc(0, 0, 16, 0, 7); g.fill(); g.fillStyle = '#5f5c5a'; g.beginPath(); g.arc(-5, -5, 5, 0, 7); g.fill(); break;
      case 'roket': g.fillStyle = C.red; g.beginPath(); g.roundRect(-24, -7, 40, 14, 3); g.fill(); tri([16, -7], [31, 0], [16, 7], C.ink);
        tri([-24, -7], [-33, -16], [-13, -7], C.ink); tri([-24, 7], [-33, 16], [-13, 7], C.ink); g.fillStyle = '#fff'; g.fillRect(-4, -7, 4, 14);
        if (flying) tri([-24, -5], [-40 - Math.sin(this.t * 40) * 7, 0], [-24, 5], '#f3b23e'); break;
    }
  }
  _projDraw() {
    const g = this.g, pr = this.proj; if (!pr) return;
    g.fillStyle = 'rgba(32,30,29,.22)';
    this.trail.forEach((t, k) => { if (k % 2) return; g.beginPath(); g.arc(t.x, t.y, 2 + k * 0.12, 0, 7); g.fill(); });
    g.save(); g.translate(pr.x, pr.y);
    const id = pr.w.id; if (id === 'mizrak' || id === 'roket') g.rotate(Math.atan2(pr.vy, pr.vx)); else if (id !== 'bomba') g.rotate(pr.age * 9);
    this._weapon(id, true); g.restore();
  }
  _aimPreview() {
    const g = this.g; if (!this.aim) return;
    const v = this._dragVec(), { team, slot } = this.aim;
    if (!v) {
      const b = this._body(team, slot), rr = 74 + Math.sin(this.t * 5) * 6;
      g.strokeStyle = C.red; g.lineWidth = 4; g.setLineDash([12, 10]); g.beginPath(); g.arc(b.x, b.y - 10, rr, 0, 7); g.stroke(); g.setLineDash([]);
      return;
    }
    const L = this._launch(team, slot, v.ang), w = WEAPONS[this.weapon], gm = w.gm, wl = this._wloc(w);
    let x = L.x, y = L.y, vx = v.vx, vy = v.vy; const h = 1 / 18;
    for (let k = 0; k < 12; k++) {
      // Rüzgâr da hesaba katılır: çizgi gerçek uçuşun ilk kısmını gösterir
      for (let j = 0; j < 2; j++) { vy += G * gm * h / 2; vx += wl * h / 2; x += vx * h / 2; y += vy * h / 2; }
      if (k % 2) continue;
      g.globalAlpha = 1 - k / 13; g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, 5.5 - k * 0.1, 0, 7); g.fill();
    }
    g.globalAlpha = 1;
  }
  _overlay() {
    const g = this.g, cw = this.cw, ch = this.ch, s = this.s;
    if (!this.demo) {
      for (let i = 0; i < 2; i++) {
        const sx = (this.R[i].x - this.cam) * s, y = (this.iT || 0) + Math.max(140, ch - (this.iT || 0) - (this.iB || 0)) * 0.45;
        if (sx <= cw + 10 && sx >= -10) continue;
        const label = `${this.teamNames[i]} · ${Math.round(Math.abs(this.R[1].x - this.R[0].x) / 10)} m`;
        g.font = `800 14px ${FONT}`;
        const right = sx > cw, tw = g.measureText(label).width, bx = right ? cw - 16 - tw - 46 : 16;
        g.fillStyle = C.bg; g.fillRect(bx, y - 18, tw + 46, 36); g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(bx, y - 18, tw + 46, 36);
        g.fillStyle = i === 0 ? C.red : C.ink;
        g.beginPath(); if (right) { g.moveTo(bx + tw + 34, y - 8); g.lineTo(bx + tw + 42, y); g.lineTo(bx + tw + 34, y + 8); } else { g.moveTo(bx + 12, y - 8); g.lineTo(bx + 4, y); g.lineTo(bx + 12, y + 8); } g.fill();
        g.fillStyle = C.ink; g.textAlign = 'left'; g.fillText(label, right ? bx + 12 : bx + 22, y + 5);
      }
      const mw = Math.min(300, cw - 40), mx = (cw - mw) / 2, my = (this.iT || 84) + 10;
      g.fillStyle = 'rgba(243,242,242,.92)'; g.fillRect(mx, my, mw, 22); g.strokeStyle = C.ink; g.lineWidth = 2; g.strokeRect(mx, my, mw, 22);
      const k = mw / this.W;
      g.strokeStyle = C.red; g.strokeRect(mx + this.cam * k, my + 2, this.vw * k, 18);
      for (const R of this.R) { g.fillStyle = R.team === 0 ? C.red : C.ink; g.fillRect(mx + R.x * k - 4, my + 7, 8, 8); }
      if (this.proj) { g.fillStyle = C.ink; g.beginPath(); g.arc(mx + this.proj.x * k, my + 11, 3, 0, 7); g.fill(); }
      const wl = this.wind * this.sx, ws = Math.round(Math.abs(wl) / 50), wy = my + 30;
      const wt = ws === 0 ? 'Rüzgâr yok' : 'Rüzgâr ' + ws;
      g.font = `800 14px ${FONT}`; const wtw = g.measureText(wt).width, bw = wtw + (ws ? 70 : 24), bx2 = (cw - bw) / 2;
      g.fillStyle = ws >= 4 ? C.red : C.ink; g.fillRect(bx2, wy, bw, 28);
      g.fillStyle = C.bg; g.textAlign = 'left'; g.fillText(wt, bx2 + 12, wy + 19);
      if (ws) { const ax = bx2 + wtw + 22, dir = wl > 0 ? 1 : -1, len = 10 + ws * 6, x0 = dir > 0 ? ax : ax + 36, x1 = x0 + dir * Math.min(36, len);
        g.strokeStyle = C.bg; g.lineWidth = 3; g.beginPath(); g.moveTo(x0, wy + 14); g.lineTo(x1, wy + 14); g.stroke();
        g.beginPath(); g.moveTo(x1, wy + 14); g.lineTo(x1 - dir * 7, wy + 8); g.lineTo(x1 - dir * 7, wy + 20); g.closePath(); g.fillStyle = C.bg; g.fill(); }
    }
    const d = this.drag, v = this._dragVec();
    if (d && v) {
      g.strokeStyle = C.ink; g.lineWidth = 2; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(d.sx, d.sy); g.lineTo(d.cx, d.cy); g.stroke(); g.setLineDash([]);
      g.fillStyle = C.red; g.beginPath(); g.arc(d.sx, d.sy, 7, 0, 7); g.fill();
      const deg = Math.round(Math.abs(Math.atan2(-v.vy, Math.abs(v.vx))) * 180 / Math.PI), txt = `Güç %${Math.round(v.p * 100)} · Açı ${deg}°`;
      g.font = `800 15px ${FONT}`; const tw = g.measureText(txt).width;
      const tx = Math.min(cw - tw - 30, d.cx + 16), ty = Math.max(30, d.cy - 34);
      g.fillStyle = C.ink; g.fillRect(tx, ty, tw + 20, 30); g.fillStyle = C.bg; g.textAlign = 'left'; g.fillText(txt, tx + 10, ty + 20);
    }
  }
}

return { WEAPONS, RAFT_UP, BattleScene }; })();
const N = (function(){ // Gerçek bağlantı: PeerJS (WebRTC). Oda sahibi = sunucu gibi davranır, diğerleri ona bağlanır.
const PREFIX = 'salduellosu-yz-';
const ICE = { iceServers: [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] },
  { urls: 'stun:openrelay.metered.ca:80' },
  { urls: ['turn:openrelay.metered.ca:80', 'turn:openrelay.metered.ca:443', 'turn:openrelay.metered.ca:443?transport=tcp'], username: 'openrelayproject', credential: 'openrelayproject' },
] };
const OPTS = { debug: 1, config: ICE };
function netAvailable() { return typeof window !== 'undefined' && !!window.Peer; }

class HostNet {
  constructor(code, h) { this.h = h; this.conns = new Map(); this.code = code; }
  open() {
    return new Promise((res, rej) => {
      if (!netAvailable()) return rej(new Error('peerjs-yok'));
      const peer = this.peer = new window.Peer(PREFIX + this.code.toLowerCase(), OPTS);
      const to = setTimeout(() => rej(new Error('zaman-asimi')), 15000);
      peer.on('open', () => { clearTimeout(to); res(); });
      peer.on('error', e => { clearTimeout(to); rej(e); this.h.onError && this.h.onError(e); });
      peer.on('disconnected', () => { try { if (!peer.destroyed) peer.reconnect(); } catch (e) {} });
      peer.on('connection', conn => {
        conn.on('open', () => { this.conns.set(conn.peer, conn); this.h.onJoin(conn.peer); });
        conn.on('data', d => this.h.onData(conn.peer, d));
        conn.on('close', () => { this.conns.delete(conn.peer); this.h.onLeave(conn.peer); });
        conn.on('error', () => {});
      });
    });
  }
  sendTo(id, d) { const c = this.conns.get(id); if (c && c.open) c.send(d); }
  broadcast(d) { for (const c of this.conns.values()) if (c.open) c.send(d); }
  destroy() { try { this.peer && this.peer.destroy(); } catch (e) {} }
}

class ClientNet {
  constructor(code, h) { this.h = h; this.code = code; }
  open() {
    return new Promise((res, rej) => {
      if (!netAvailable()) return rej(new Error('peerjs-yok'));
      const peer = this.peer = new window.Peer(OPTS);
      let stage = 'sunucu';
      const to = setTimeout(() => rej(new Error(stage === 'sunucu' ? 'sunucu-yok' : 'eslesme-yok')), 25000);
      peer.on('error', e => { clearTimeout(to); rej(e); });
      peer.on('open', id => {
        this.id = id; stage = 'oda'; this.h.onStage && this.h.onStage('oda');
        const conn = this.conn = peer.connect(PREFIX + this.code.toLowerCase(), { reliable: true });
        conn.on('open', () => { clearTimeout(to); res(id); });
        conn.on('error', () => {});
        conn.on('data', d => this.h.onData(d));
        conn.on('close', () => this.h.onClose && this.h.onClose());
      });
    });
  }
  send(d) { if (this.conn && this.conn.open) this.conn.send(d); }
  destroy() { try { this.peer && this.peer.destroy(); } catch (e) {} }
}

return { netAvailable, HostNet, ClientNet }; })();
window.SD = { Q, E, N, S };
})();
