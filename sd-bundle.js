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
  { n: 5, ready: true, title: 'Model Değerlendirme', tags: 'Doğruluğun tuzağı · Kesinlik / Duyarlılık · Eşik · F1 · ROC / PR · Taban çizgisi · MAE / RMSE' },
  { n: 6, ready: false, title: 'Karar Ağaçları ve Topluluk Yöntemleri', tags: 'Karar ağacı · Topluluk yöntemleri' },
  { n: 11, c: 'mu', d: 1, ready: true, title: 'API Temelleri', tags: 'API · HTTP · Request / Response · REST · JSON · Status code · .NET Web API · Postman' },
  { n: 12, c: 'mu', d: 2, ready: true, title: 'JWT, Database First ve Rol Bazlı Yetki', tags: 'SSMS · EF Core scaffold · Salt & hash · JWT · Claim · DTO · CRUD · 400 / 401 / 403' },
  { n: 13, c: 'mu', d: 3, ready: true, title: 'Mobil Dünyanın Haritası, Flutter ve Postman', tags: 'Native / Cross-platform · Dart · Widget & State · pub.dev · Open-Meteo · JSON' },
  { n: 14, c: 'mu', d: 4, ready: true, title: 'Kullanıcı Kayıt ve Giriş', tags: 'Kayıt ucu · Uye rolü · Hash · Token · Güvenli depo · 409 · 10.0.2.2' },
  { n: 15, c: 'mu', d: 5, ready: true, title: 'LLM ile Uygulama Geliştirme — Master Şef', tags: 'Yürüyen iskelet · İstem yazmak · Kamera / galeri izni · Vekil mimari · JSON şeması · Görsel maliyeti' },
];

const QUESTIONS = [
  // ---------- 1. HAFTA ----------
  { w: 1, t: 'Klasik programlama ve yapay zekâ', k: 'giris', q: 'Aşağıdaki işlerden hangisi için yapay zekâ yerine klasik programlama yeterlidir?', o: ['KDV tutarını hesaplamak', 'Fotoğraftaki yüzü bulmak', 'Spam e-postayı ayırmak', 'Yemekhane talebini tahmin etmek'], a: 0, e: 'KDV oranı bellidir; kural açıkça yazılabilir, öğrenmeye gerek yoktur.' },
  { w: 1, t: 'Klasik programlama ve yapay zekâ', k: 'giris', q: 'Bir problemde yapay zekâ kullanmayı ne zaman düşünmeliyiz?', o: ['Kuralı yazmak zor, geçmiş örnek bolsa', 'Kural birkaç if ile yazılabiliyorsa', 'Sonuç hep aynı formülle bulunuyorsa', 'Elde hiç geçmiş veri bulunmuyorsa'], a: 0, e: 'Kural yazmak zorsa ve örnek bolsa model kuralları veriden öğrenebilir.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: '1950\'de "Bir makine düşünebilir mi?" sorusunu sistematik biçimde tartışan kişi kimdir?', o: ['Alan Turing', 'John McCarthy', 'Garry Kasparov', 'Geoffrey Hinton'], a: 0, e: 'İnsanı ve makineyi konuşmadan ayırma fikri sonra "Turing Testi" olarak anıldı.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: 'Kural tabanlı uzman sistemlerin temel sorunu neydi?', o: ['Kural sayısı arttıkça bakımı zorlaştı', 'Çalışmak için GPU gerektiriyorlardı', 'Çok büyük eğitim verisi istiyorlardı', 'Yalnızca görüntü verisiyle çalışıyorlardı'], a: 0, e: '"Eğer X ise Y" kuralları büyüdükçe sistemi yönetmek zorlaştı.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: 'IBM Deep Blue 1997\'de hangi oyunda dünya şampiyonunu yendi?', o: ['Satranç', 'Go', 'Dama', 'Poker'], a: 0, e: 'Garry Kasparov\'u bir maçta yendi. Go\'daki başarı 2016\'da AlphaGo\'nundur.' },
  { w: 1, t: 'Tarihsel yolculuk', k: 'tarih', q: '2017 sonrası modern büyük dil modellerinin temeli olan mimari hangisidir?', o: ['Transformer', 'Karar ağacı', 'Uzman sistem', 'KNN'], a: 0, e: 'Attention yaklaşımıyla uzun bağlamları işler.' },
  { w: 1, t: 'AI, ML ve DL', k: 'harita', q: 'Karar ağacı için hangisi doğrudur?', o: ['ML yöntemidir ama derin öğrenme değildir', 'Derin öğrenme yöntemidir ama ML değildir', 'Hem ML hem de derin öğrenme yöntemidir', 'ML değildir, elle yazılmış kural listesidir'], a: 0, e: 'Veriden öğrenir ama çok katmanlı sinir ağı kullanmaz.' },
  { w: 1, t: 'Model nasıl öğrenir?', k: 'veri', q: 'Model eğitim verisinde çok başarılı, yeni örneklerde başarısızsa buna ne denir?', o: ['Aşırı öğrenme (overfitting)', 'Eksik öğrenme (underfitting)', 'Halüsinasyon (hallucination)', 'Önyargı (bias)'], a: 0, e: 'Çözümleri ezberleyen öğrenci gibi: yeni soru gelince başarısız olur.' },
  { w: 1, t: 'Model nasıl öğrenir?', k: 'veri', q: 'Ders notunda verilen tipik veri bölme oranı hangisidir?', o: ['%70 eğitim · %15 doğrulama · %15 test', '%50 eğitim · %25 doğrulama · %25 test', '%90 eğitim · %5 doğrulama · %5 test', '%60 eğitim · %10 doğrulama · %30 test'], a: 0, e: 'Oranlar sabit değildir; tipik bir örnek olarak verildi.' },
  { w: 1, t: 'Regresyon', k: 'regresyon', q: '"Yarın kaç bardak kahve satılır?" hangi problem türüdür?', o: ['Regresyon', 'Sınıflandırma', 'Nesne tespiti', 'Segmentasyon'], a: 0, e: 'Çıktı sayısal bir değer olduğu için regresyondur.' },
  { w: 1, t: 'Hangi probleme hangi yaklaşım?', k: 'secim', q: '"Bu müşteri aboneliğini iptal eder mi?" sorusu hangi yaklaşıma gider?', o: ['Sınıflandırma', 'Regresyon', 'Üretken yapay zekâ', 'Nesne tespiti'], a: 0, e: 'İki sınıf vardır: iptal eder / etmez.' },
  { w: 1, t: 'Hangi probleme hangi yaklaşım?', k: 'secim', q: '"Bu müşteri ay sonunda ne kadar harcar?" sorusu hangi yaklaşıma gider?', o: ['Regresyon', 'Sınıflandırma', 'Segmentasyon', 'Üretken yapay zekâ'], a: 0, e: 'Çıktı bir tutar, yani sayıdır.' },
  { w: 1, t: 'Nesne tespiti', k: 'tespit', q: '"Kamera görüntüsünde kaç araç var ve nerede?" hangi görevdir?', o: ['Nesne tespiti', 'Görüntü sınıflandırma', 'Segmentasyon', 'Regresyon'], a: 0, e: 'Hem sınıf hem konum gerekir: tespit = sınıf + konum.' },
  { w: 1, t: 'KNN', k: 'knn', q: 'KNN yeni bir örneğin sınıfını nasıl belirler?', o: ['En yakın K örneğin sınıfına bakarak', 'Soru sorup veriyi dallara ayırarak', 'Sonraki tokenın olasılığını hesaplayarak', 'Katmanlardaki ağırlıkları güncelleyerek'], a: 0, e: '"Bana benzeyenler kim?" mantığıyla çalışır.' },
  { w: 1, t: 'Sinir ağları', k: 'siniragi', q: 'Görüntüde derin ağın ilk katmanları genellikle neyi öğrenir?', o: ['Kenarları', 'Göz, kulak gibi parçaları', 'Nesnenin sınıf adını', 'Nesnenin tam şeklini'], a: 0, e: 'İlk katmanlar kenar, sonrakiler şekil, daha derinler karmaşık parçalar.' },
  { w: 1, t: 'Bilgisayarlı görü', k: 'goruntu', q: '"Hangi pikseller nesneye ait?" sorusu hangi görevdir?', o: ['Segmentasyon', 'Sınıflandırma', 'Nesne tespiti', 'Regresyon'], a: 0, e: 'Segmentasyon kedinin tam siluetini çıkarır.' },
  { w: 1, t: 'Doğal dil işleme', k: 'nlp', q: 'Modelin metni böldüğü küçük parçalara ne denir?', o: ['Token', 'Piksel', 'Embedding', 'Parametre'], a: 0, e: 'Bir kelime bazen tek, bazen birkaç token olabilir.' },
  { w: 1, t: 'Büyük dil modelleri', k: 'llm', q: 'Bir LLM temelde ne yapar?', o: ['Bağlama göre sonraki tokenı tahmin eder', 'Hazır cevap listesinden en uygununu seçer', 'Uzmanların yazdığı kurallarla cevap verir', 'Soruyu internette arayıp sonucu aktarır'], a: 0, e: 'Olası sonraki tokenlar için olasılık hesaplar, birini seçer, süreç tekrar eder.' },
  { w: 1, t: 'Bilinmesi gereken sınırlar', k: 'sinirlar', q: 'Modelin gerçekte olmayan ama ikna edici bilgi üretmesine ne denir?', o: ['Halüsinasyon', 'Önyargı', 'Aşırı öğrenme', 'Dağılım değişimi'], a: 0, e: '"Model söyledi" demek "doğru" demek değildir.' },
  // ---------- 2. HAFTA ----------
  { w: 2, t: 'Veri neden önce gelir?', k: 'neden', q: '"Yeterince güçlü bir model kötü veriyi telafi eder." Bu ifade için hangisi doğrudur?', o: ['Yanlış; güçlü model hatayı daha iyi öğrenir', 'Doğru; model gürültüyü kendiliğinden ayıklar', 'Yalnızca derin öğrenme modelleri için doğru', 'Veri kümesi çok büyükse doğru'], a: 0, e: 'Model veride ne varsa onu öğrenir; gücü hatayı düzeltmez, pekiştirir.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Amazon\'un CV puanlayan modeli neden kapatıldı?', o: ['Geçmişteki işe alım yanlılığını öğrendi', 'Gerçek kullanımda çok yavaş çalıştı', 'Test verisi eğitim verisine karışmıştı', 'CV\'leri uzunluğuna göre sıralamaya başladı'], a: 0, e: 'Model "en iyi adayı" değil, geçmişte kimin işe alındığını öğrendi.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Google Flu Trends hikâyesi hangi kavramı anlatır?', o: ['Veri kayması (data drift)', 'Veri sızıntısı (data leakage)', 'Hayatta kalma yanlılığı', 'Aşırı öğrenme (overfitting)'], a: 0, e: 'Arama alışkanlıkları değişti ama model eski alışkanlıklara göre kurulmuştu.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Cilt lezyonu fotoğraflarıyla eğitilen bazı modeller aslında neyi öğrenmişti?', o: ['Karede duran cetveli', 'Lezyonun rengini', 'Fotoğrafın ışığını', 'Lezyonun boyutunu'], a: 0, e: 'Doktorlar şüpheli lezyonun yanına ölçmek için cetvel koyuyordu.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Dönen uçaklardaki kurşun delikleri hikâyesi hangi yanlılığı anlatır?', o: ['Hayatta kalma yanlılığı', 'Etiketleyici yanlılığı', 'Ölçüm yanlılığı', 'Tarihsel yanlılık'], a: 0, e: 'Veri yalnızca geri dönebilen uçaklardan geliyordu; zırh deliksiz yerlere konmalıydı.' },
  { w: 2, t: 'Gerçek hikâyeler', k: 'hikaye', q: 'Zillow\'un ev alım iş kolunu batıran varsayım neydi?', o: ['Yarının bugüne benzeyeceği', 'Evlerin hep değer kaybedeceği', 'Etiketlerin hatalı olduğu', 'Verinin rastgele bölündüğü'], a: 0, e: 'Piyasa değişince model sistematik olarak fazla ödedi; model bunu haber vermez.' },
  { w: 2, t: 'Verinin anatomisi', k: 'anatomi', q: 'Ev fiyatı tablosunda "fiyat" sütunu modelin tahmin edeceği değerse bu sütuna ne denir?', o: ['Etiket (label)', 'Öznitelik (feature)', 'Örnek (sample)', 'Veri kümesi (dataset)'], a: 0, e: 'Satır = örnek, sütunlar = öznitelik, tahmin edilen sütun = etiket.' },
  { w: 2, t: 'Verinin anatomisi', k: 'anatomi', q: 'Aynı ev tablosunda etiket "6 ay içinde satıldı mı?" olursa problem ne olur?', o: ['Sınıflandırma', 'Regresyon', 'Kümeleme', 'Nesne tespiti'], a: 0, e: 'Etiket kategori olduğu için sınıflandırmadır; fiyat olsaydı regresyon olurdu.' },
  { w: 2, t: 'Veri nereden gelir?', k: 'toplama', q: '1936 Literary Digest anketi iki milyondan fazla kişiye ulaştığı hâlde neden yanıldı?', o: ['Örneklem varlıklı kesimden seçilmişti', 'Cevaplar sayılırken çok hata yapılmıştı', 'Anket seçimden çok önce yapılmıştı', 'Katılımcı sayısı yine de azdı'], a: 0, e: 'Listeler telefon ve otomobil sahiplerinden derlenmişti. Verinin çokluğu yanlılığı düzeltmez.' },
  { w: 2, t: 'Veri nereden gelir?', k: 'toplama', q: 'Türkiye\'de kişisel verilerin işlenmesini düzenleyen kanun hangisidir?', o: ['KVKK (6698 sayılı kanun)', 'Tüketici Kanunu (6502)', 'Fikir ve Sanat Eserleri Kanunu', 'Elektronik Ticaret Kanunu'], a: 0, e: 'Kişisel veri açık rıza olmadan, amaç dışında ve süresiz işlenemez.' },
  { w: 2, t: 'Kirli veri', k: 'kalite', q: 'Ham veride neden "m² = 0" bir boş hücreden daha tehlikelidir?', o: ['Uyarı vermeden hesaplara karışır', 'Modelin eğitimini tamamen durdurur', 'Tablodaki satır sayısını azaltır', 'Kategorik sütunu bozmuş olur'], a: 0, e: 'Sıfır bir sayıdır; ortalamayı sessizce aşağı çeker. Çoğu zaman "bilinmiyor"un kılık değiştirmiş hâlidir.' },
  { w: 2, t: 'Kirli veri', k: 'kalite', q: '"Çankaya", "çankaya " ve "ÇANKAYA" değerleri hangi veri sorunudur?', o: ['Tutarsızlık', 'Aykırı değer', 'Yinelenen kayıt', 'Eksik değer'], a: 0, e: 'İnsan için aynı, bilgisayar için üç ayrı kategori.' },
  { w: 2, t: 'Eksik veri', k: 'eksik', q: 'Sütunda tek bir uç değer varken eksik hücreleri doldurmak için hangisi daha dayanıklıdır?', o: ['Medyan', 'Ortalama', 'En büyük değer', 'En küçük değer'], a: 0, e: 'Uç değer ortalamayı sürükler, medyanı neredeyse hiç etkilemez.' },
  { w: 2, t: 'Eksik veri', k: 'eksik', q: 'Eksik değerleri ele alırken en çok atlanan seçenek hangisidir?', o: ['Eksikliği ayrı bir 0/1 sütunu yapmak', 'Eksik satırları tamamen silmek', 'Eksik hücreleri ortalamayla doldurmak', 'Eksik sütunu tablodan çıkarmak'], a: 0, e: 'Örneğin gelir_bilinmiyor sütunu: bazen eksikliğin kendisi bilgidir.' },
  { w: 2, t: 'Aykırı değerler', k: 'aykiri', q: 'Aykırı bir değeri silmeden önce hangi soru sorulmalı?', o: ['Bu değer mümkün mü?', 'Bu değer alışılmış mı?', 'Bu değer ortalamadan büyük mü?', 'Bu değer tabloda kaç kez geçiyor?'], a: 0, e: 'Mümkün ama alışılmadık değerler verinin en değerli kısmıdır; dolandırıcılıkta aranan şey odur.' },
  { w: 2, t: 'Öznitelik çıkarımı', k: 'oznitelik', q: 'Ev fiyatı örneğinde m² ve fiyattan türetilen "altın öznitelik" hangisidir?', o: ['Metrekare fiyatı', 'Oda başına alan', 'Bina yaşı grubu', 'Merkeze uzaklık'], a: 0, e: 'fiyat / m²: emlakçının kafasındaki asıl ölçü. Alan bilgisi burada devreye girer.' },
  { w: 2, t: 'Kategorik veri', k: 'kategorik', q: 'Beden bilgisi (S, M, L, XL) için hangi kodlama uygundur?', o: ['Label encoding', 'One-hot encoding', 'Min-max ölçekleme', 'Sıklık kodlaması'], a: 0, e: 'Bedenler arasında gerçek bir sıralama vardır; bu yüzden sıra numarası anlamlıdır.' },
  { w: 2, t: 'Kategorik veri', k: 'kategorik', q: 'Şehir sütununa Ankara = 1, İstanbul = 2, İzmir = 3 vermenin sorunu nedir?', o: ['Modele olmayan bir sıralama öğretir', 'Tablodaki sütun sayısını çok artırır', 'Eksik şehirleri sıfıra çevirir', 'Şehir adlarını büyük harfe çevirir'], a: 0, e: 'Sırasız (nominal) kategoride one-hot kullanılır.' },
  { w: 2, t: 'Ölçekleme', k: 'olcek', q: 'Aşağıdaki yöntemlerden hangisi ölçeklemeden etkilenmez?', o: ['Karar ağacı', 'KNN', 'k-means', 'Sinir ağı'], a: 0, e: 'Ağaçlar her sütunu tek tek eşiklerle böler; uzaklık hesaplamaz.' },
  { w: 2, t: 'Ölçekleme', k: 'olcek', q: 'Ortalamayı 0, standart sapmayı 1 yapan ölçekleme hangisidir?', o: ['Standardizasyon (z-score)', 'Min-max normalizasyonu (0–1 arası)', 'One-hot encoding', 'Label encoding'], a: 0, e: 'Min-max ise değerleri 0 ile 1 arasına sıkıştırır ve uç değerlere duyarlıdır.' },
  { w: 2, t: 'Eğitim / test', k: 'bolme', q: 'Zaman serisi verisinde eğitim/test bölmesi nasıl yapılır?', o: ['Eski veriyle eğit, yeni veriyle test et', 'Satırları karıştırıp rastgele böl', 'Yeni veriyle eğit, eski veriyle test et', 'Her ayı ayrı bir test kümesi yap'], a: 0, e: 'Gelecekten geçmişi tahmin etmek anlamsızdır.' },
  { w: 2, t: 'Eğitim / test', k: 'bolme', q: '%5\'i dolandırıcılık olan veride oranı hem eğitimde hem testte korumak için ne yapılır?', o: ['Katmanlı bölme (stratified split)', 'Test kümesini %40\'a çıkarmak', 'Veriyi tarihe göre sıralamak', 'Azınlık sınıfı silmek'], a: 0, e: 'Aksi hâlde test kümesinde hiç dolandırıcılık kalmayabilir.' },
  { w: 2, t: 'Veri sızıntısı', k: 'sizinti', q: 'Eksik değerleri tüm veri kümesinin ortalamasıyla doldurmak neden sorundur?', o: ['Test satırları ortalamaya karışır', 'Ortalama aykırı değerden etkilenir', 'Doldurulan değerler tam sayı olmaz', 'Kategorik sütunlarda çalışmaz'], a: 0, e: 'Bu veri sızıntısıdır. Doğrusu: önce böl, sonra yalnızca eğitim kümesinden hesapla.' },
  { w: 2, t: 'Veri sızıntısı', k: 'sizinti', q: '"Hasta mı?" tahmininde veride verilen_ilac sütunu varsa sorun nedir?', o: ['Teşhisten sonra oluşan bilgi hedefi ele verir', 'İlaç adları kategorik olduğu için kodlanamaz', 'Sütunda çok fazla eksik değer bulunur', 'Hastaların kişisel verisi olduğu için yasaktır'], a: 0, e: 'İlaç ancak teşhisten sonra yazılır; gerçek kullanımda o sütun boş olacaktır.' },
  { w: 2, t: 'Dengesiz veri', k: 'denge', q: '300 işlemin 6\'sı dolandırıcılık. Her işleme "normal" diyen model hakkında ne söylenir?', o: ['%98 doğruluk alır ama hiçbir şey yakalamaz', 'Doğruluğu %2 olduğu için sorunu hemen belli olur', 'Dolandırıcılıkların yarısını yakalar', 'Veri sızıntısı yaptığı kesindir'], a: 0, e: 'Dengesiz veride doğruluk yanıltır; neyin yakalandığına bakılır.' },
  // ---------- 3. HAFTA ----------
  { w: 3, t: 'Sınıflandırma nedir?', k: 'problem', q: 'Aşağıdakilerden hangisi sınıflandırma problemi değildir?', o: ['Hastanın ateşinin kaç derece olacağı', 'E-postanın spam olup olmadığı', 'Yorumun olumlu, olumsuz ya da nötr olması', 'Öğrencinin dersten geçip geçmeyeceği'], a: 0, e: 'Ateş bir sayıdır; sayı tahmini regresyondur. Diğerleri hazır kutulardan birini seçer.' },
  { w: 3, t: 'Sınıflandırma nedir?', k: 'problem', q: 'Müşterileri benzer gruplara ayırmak istiyoruz ama hangi müşterinin hangi grupta olduğu yazmıyor. Bu problem nedir?', o: ['Sınıflandırma değildir; etiket yok', 'İkili sınıflandırmadır', 'Çok sınıflı bir sınıflandırma problemidir', 'Sayı tahminidir'], a: 0, e: 'Model öğrenebilmek için doğru cevabı yazan örneklere ihtiyaç duyar. Etiketsiz gruplama kümelemedir.' },
  { w: 3, t: 'Veri setini seçmek', k: 'secim', q: 'Kaggle\'da veri setinin lisans alanında ne yazıyorsa o veri seti kullanılmamalıdır?', o: ['Unknown', 'CC0', 'CC BY', 'CC BY-SA'], a: 0, e: 'CC0 ya da CC BY serbesttir; lisansı bilinmeyen veri kullanılmaz.' },
  { w: 3, t: 'Veri setini seçmek', k: 'secim', q: 'Satırların %95\'i tek bir kutudaysa neden o veri setinden uzak durulmalı?', o: ['Model hep o kutuyu diyerek %95 alır', 'Veri seti lisans gereği kullanılamaz', 'Karar ağacı bu veriyle eğitilemez', 'Eksik değerleri doldurmak imkânsız olur'], a: 0, e: 'Kutular dengesizse model hiçbir şey öğrenmeden yüksek doğruluk alır.' },
  { w: 3, t: 'Veri setini seçmek', k: 'secim', q: 'Açıklamasında "synthetic" ya da "generated" geçen bir veri setinde model neden şaşırtıcı yüksek sonuç verir?', o: ['Veriyi üreten formülü öğrenir', 'Veri çok temiz olduğu için', 'Satır sayısı çok fazla olduğu için', 'Lisansı serbest olduğu için'], a: 0, e: 'Uydurulmuş veride model gerçeği değil, veriyi uyduran kuralı yakalar.' },
  { w: 3, t: 'Kaggle', k: 'notebook', q: 'Kaggle notebook\'unda eklediğiniz veri hangi klasöre gelir?', o: ['/kaggle/input/', '/kaggle/working/', '/kaggle/output/', '/kaggle/data/'], a: 0, e: 'Eklenen veri /kaggle/input/ altında durur ve değiştirilemez; üretilen dosyalar /kaggle/working/ altına gider.' },
  { w: 3, t: 'Titanic örneği', k: 'ornek', q: 'test.csv dosyasında train.csv\'den bir sütun eksiktir. Bunun sebebi nedir?', o: ['Survived sütunu tahmin edilmek için çıkarılmış', 'Cabin sütunu çok boş olduğu için atılmış', 'Age sütunu sızıntı yaptığı için silinmiş', 'PassengerId sütunu gereksiz olduğu için atılmış'], a: 0, e: 'Cevabı bizim tahmin etmemiz isteniyor.' },
  { w: 3, t: 'Titanic örneği', k: 'ornek', q: 'Titanic verisinde 891 yolcunun 687\'sinde Cabin boştur. Örnekte bu sütuna ne yapıldı?', o: ['Hiç kullanılmadı', 'Ortanca değerle dolduruldu', 'En sık değerle dolduruldu', 'Boş satırlar silindi'], a: 0, e: 'Neredeyse tamamı boş olan sütun bilgi taşımaz; yaş sütunu ise ortancayla dolduruldu.' },
  { w: 3, t: 'Taban çizgisi', k: 'ornek', q: 'Yolcuların %61,6\'sı kurtulamamışsa, herkese "kurtulamadı" diyen tahminin doğruluğu neyi temsil eder?', o: ['Modelin geçmesi gereken taban çizgisini', 'Modelin ulaşabileceği en yüksek doğruluğu', 'Test verisindeki hata oranını', 'Aşırı öğrenmenin başladığı noktayı'], a: 0, e: '%65 alan bir model aslında neredeyse hiçbir şey öğrenmemiş demektir.' },
  { w: 3, t: 'Hazırlık', k: 'ornek', q: 'Test verisindeki boş yaşlar neden eğitim verisinin ortancasıyla dolduruldu?', o: ['Test verisinden bilgi sızmasın diye', 'Test verisinin ortancası hesaplanamadığı için', 'Eğitim verisinde daha az eksik olduğu için', 'Ortanca test verisinde sıfır çıktığı için'], a: 0, e: 'Testin kendi ortancasını kullanmak, modele görmemesi gereken bir bilgiyi sızdırırdı.' },
  { w: 3, t: 'Hazırlık', k: 'ornek', q: 'Örnekte AileBoyu sütunu nasıl üretildi?', o: ['SibSp + Parch + 1', 'SibSp × Parch', 'Parch − SibSp', 'SibSp + Parch'], a: 0, e: 'Kardeş/eş sayısı ile anne-baba/çocuk sayısı toplanıp yolcunun kendisi eklenir.' },
  { w: 3, t: 'Eğitim / sınav ayrımı', k: 'ornek', q: 'train_test_split içinde random_state=42 ne işe yarar?', o: ['Bölme her çalıştırmada aynı olur', 'Verinin %42\'si sınava ayrılır', 'Model 42 kez eğitilip ortalaması alınır', 'Rastgele 42 satır seçilir'], a: 0, e: '42\'nin özel bir anlamı yoktur, alışkanlıktan kullanılır.' },
  { w: 3, t: 'Karar ağacı', k: 'ornek', q: 'DecisionTreeClassifier(max_depth=4) ayarı ne işe yarar?', o: ['Ağaç en fazla 4 soru sorabilir', 'Veriyi 4 eşit parçaya böler', 'Aynı anda 4 ağaç eğitip oylatır', 'Yalnızca 4 sütunu kullanır'], a: 0, e: 'Derinliği sınırlamazsak model ezberlemeye başlar.' },
  { w: 3, t: 'Karar ağacı', k: 'ornek', q: 'scikit-learn\'de fit ve predict ne yapar?', o: ['fit öğrenir, predict tahmin eder', 'fit tahmin eder, predict öğrenir', 'fit veriyi böler, predict ölçer', 'fit veriyi temizler, predict kaydeder'], a: 0, e: 'Bütün scikit-learn modelleri bu iki komutla çalışır.' },
  { w: 3, t: 'Model karşılaştırma', k: 'ornek', q: 'Üç model 179 yolcuda %79, %80 ve %81 aldı. Ders notuna göre doğru yorum hangisi?', o: ['Fark küçük; önemli olan taban çizgisini geçmeleri', 'Random Forest en iyi modeldir', 'Lojistik regresyon bu tür veride kullanılmamalıdır', 'Karar ağacı aşırı öğrenmiştir'], a: 0, e: 'Tek bir yolcuyu farklı bilmek skoru yarım puan oynatır.' },
  { w: 3, t: 'Cevap dosyası', k: 'ornek', q: 'to_csv\'de index=False yazılmazsa ne olur?', o: ['Dosyaya fazladan bir sütun eklenir', 'Dosya başlık satırı olmadan kaydedilir', 'Tahminler 0 ve 1 yerine yüzde olur', 'Satır sayısı 891\'e çıkar'], a: 0, e: 'Fazladan sütun olunca Kaggle dosyayı kabul etmez.' },
  { w: 3, t: 'Taban çizgisi', k: 'ornek', q: '"Bütün kadınlar kurtuldu, bütün erkekler kurtulamadı" kuralı Kaggle\'da 0,765 alıyor. Bundan çıkan ders nedir?', o: ['Önce basit bir kural denenmelidir', 'Karmaşık modellere bu tür veride gerek yoktur', 'Cinsiyet sütunu sızıntı yapar', 'Kaggle puanları güvenilmezdir'], a: 0, e: 'Basit bir kural bazen karmaşık modele çok yakın sonuç verir; geçilmesi gereken çizgi odur.' },
  { w: 3, t: 'Karmaşıklık matrisi', k: 'sonuc', q: 'Titanic modelinde kurtulan bir yolcuya "kurtulamadı" demek hangi hatadır?', o: ['Kaçırma', 'Yanlış alarm', 'Doğru negatif', 'Taban çizgisi hatası'], a: 0, e: 'Olan bir şeye "yok" dedik: kaçırma. Kurtulamayana "kurtuldu" demek yanlış alarmdır.' },
  { w: 3, t: 'Kesme noktası', k: 'sonuc', q: 'Kesme noktası %50\'den %35\'e indirilirse ne olur?', o: ['Kaçırma azalır, yanlış alarm artar', 'Yanlış alarm azalır, kaçırma artar', 'İki hata türü de azalır', 'İki hata türü de artar'], a: 0, e: 'Daha çok kişiye "kurtuldu" denir. Bir hatayı azaltmak öbürünü artırır.' },
  { w: 3, t: 'KNN ve aşırı öğrenme', k: 'sinir', q: 'KNN\'de k = 1 iken öğrenilen yolcularda %100, sınavda %80 doğruluk var. Bu nedir?', o: ['Aşırı öğrenme', 'Eksik öğrenme', 'Veri sızıntısı', 'Dengesiz veri'], a: 0, e: 'Her yolcunun en yakın komşusu kendisidir; bu başarı değil, ezberdir.' },
  { w: 3, t: 'KNN ve aşırı öğrenme', k: 'sinir', q: 'k = 21 ve üstünde iki doğruluk da %55\'e düşüyor. Buna ne denir?', o: ['Eksik öğrenme', 'Aşırı öğrenme', 'Veri kayması', 'Veri sızıntısı'], a: 0, e: 'Model artık herkese aynı cevabı vermeye başlar.' },
  { w: 3, t: 'Sık yapılan hatalar', k: 'hatalar', q: 'PassengerId gibi bir kimlik sütununu modele vermek neden hatadır?', o: ['Bilgi taşımaz, modeli yanıltır', 'Sayısal olmadığı için hata verir', 'Kişisel veri olduğu için yasaktır', 'Test verisinde bulunmadığı için'], a: 0, e: 'Sıra numarası gibi sütunlar sonuçla ilgili değildir; kullanılacak sütunlar elle seçilir.' },
  { w: 3, t: 'Ödev', k: 'odev', q: 'Ödevde hangi veri setleri kabul edilmez?', o: ['Titanic ve Iris', 'Spam ve şarap kalitesi', 'Mantar ve kredi ödemesi', 'Müşteri kaybı ve çalışan ayrılığı'], a: 0, e: 'İkisinin de internette hazır çözümü çok fazla.' },
  // ---------- 4. HAFTA ----------
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: 'uint8 türündeki gri bir görüntüde piksel değerleri hangi aralıktadır?', o: ['0–255', '0–1', '−128 – 127', '0–100'], a: 0, e: '0 simsiyah, 255 bembeyaz.' },
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: '512×512 boyutundaki renkli bir görüntünün shape değeri nedir?', o: ['(512, 512, 3)', '(512, 512)', '(3, 512, 512)', '(512, 512, 1)'], a: 0, e: 'Renkli görüntü üst üste binmiş üç tablodur: (yükseklik, genişlik, kanal).' },
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: 'uint8 veride 200 + 100 işlemi kaç verir?', o: ['44', '300', '255', '100'], a: 0, e: '256\'da başa döner. Parlaklık eklerken 255\'te duran cv2.add kullanılır.' },
  { w: 4, t: 'Görüntü bir sayı tablosudur', k: 'piksel', q: 'numpy\'da (x, y) konumundaki pikseli okumanın doğru yazımı hangisidir?', o: ['gri[y, x]', 'gri[x, y]', 'gri(x, y)', 'gri[x][y]'], a: 0, e: 'numpy önce satırı (y), sonra sütunu (x) sorar.' },
  { w: 4, t: 'Renk ve BGR tuzağı', k: 'renk', q: 'plt.imshow(cv2.imread(...)) yazınca gökyüzü turuncu çıkıyor. Sebebi nedir?', o: ['OpenCV kanalları BGR sırasında tutar', 'Matplotlib görüntüyü gri tonlamalı sanır', 'Görüntü uint8 yerine float okunur', 'imread renkleri tersine çevirir'], a: 0, e: 'Çözüm tek satır: cv2.cvtColor(img, cv2.COLOR_BGR2RGB).' },
  { w: 4, t: 'Renk ve BGR tuzağı', k: 'renk', q: 'OpenCV\'nin gri tonlama formülünde en büyük ağırlık hangi kanaldadır?', o: ['Yeşil', 'Kırmızı', 'Mavi', 'Üçü eşit'], a: 0, e: '0,299·R + 0,587·G + 0,114·B. İnsan gözü yeşile en duyarlıdır.' },
  { w: 4, t: 'OpenCV ile başlamak', k: 'opencv', q: 'cv2.imread dosyayı bulamazsa ne olur?', o: ['Hata vermez, None döndürür', 'FileNotFoundError fırlatır', 'Siyah bir görüntü döndürür', 'Boş bir dizi döndürür'], a: 0, e: 'Her imread\'den sonra "if img is None" kontrolü yazılmalı.' },
  { w: 4, t: 'OpenCV ile başlamak', k: 'opencv', q: 'Kaggle notebook\'unda görüntü göstermek için cv2.imshow neden kullanılmaz?', o: ['Masaüstü penceresi açmaya çalışıp takılır', 'Renkleri BGR sırasında gösterir', 'Renkli görüntüleri gri tonlamalı gösterir', 'Görüntüyü küçülterek gösterir'], a: 0, e: 'Kaggle\'da ekran yoktur; hücre sonsuza kadar çalışır. Notebook\'ta matplotlib kullanılır.' },
  { w: 4, t: 'Kırp, boyutlandır, döndür', k: 'temel', q: 'cv2.resize hedef boyutu hangi sırada ister?', o: ['(genişlik, yükseklik)', '(yükseklik, genişlik)', '(satır, sütun, kanal)', '(kanal, genişlik)'], a: 0, e: 'shape ise (yükseklik, genişlik) verir; en sık karıştırılan ayrıntı budur.' },
  { w: 4, t: 'Kırp, boyutlandır, döndür', k: 'temel', q: 'Görüntü küçültürken hangi ara değer yöntemi önerilir?', o: ['INTER_AREA', 'INTER_NEAREST', 'INTER_CUBIC', 'INTER_LINEAR'], a: 0, e: 'Komşu pikselleri ortalar, detayı en az bozar. NEAREST yalnızca maske ve etiket görüntülerinde kullanılır.' },
  { w: 4, t: 'Kırp, boyutlandır, döndür', k: 'temel', q: 'El yazısı rakamlarla CNN eğitirken hangi veri artırma uygun değildir?', o: ['Yatay çevirme', 'Hafif döndürme', 'Biraz kaydırma', 'Hafif yakınlaştırma'], a: 0, e: '"7" aynalanınca artık 7 değildir. Hangi dönüşümün serbest olduğuna problem karar verir.' },
  { w: 4, t: 'Parlaklık ve histogram', k: 'parlaklik', q: 'equalizeHist yerine CLAHE kullanmanın avantajı nedir?', o: ['Her bölgeyi ayrı ayrı düzeltir', 'Görüntüyü renkli hâle getirir', 'Gürültüyü bulanıklaştırarak azaltır', 'Histogramı tek tepeye indirir'], a: 0, e: 'equalizeHist tüm görüntüye tek düzeltme uygular; ışık eşit değilse bir bölgeyi bozar.' },
  { w: 4, t: 'Eşikleme', k: 'esik', q: 'Bir köşesi karanlık, diğeri aydınlık taranmış sayfa için hangi eşikleme kullanılır?', o: ['Uyarlamalı (adaptiveThreshold)', 'Otsu', 'Elle verilen sabit eşik', 'Histogram eşitleme (equalizeHist)'], a: 0, e: 'Tek bir eşik sayfanın bir yarısını kaybeder; uyarlamalı yöntemde her piksel kendi eşiğini alır.' },
  { w: 4, t: 'Eşikleme', k: 'esik', q: 'adaptiveThreshold\'da blockSize parametresi için hangisi zorunludur?', o: ['Tek sayı olmalı', 'Çift sayı olmalı', '255\'ten küçük olmalı', '3\'ün katı olmalı'], a: 0, e: 'Çift sayı verilirse OpenCV hata atar.' },
  { w: 4, t: 'Evrişim ve çekirdek', k: 'cekirdek', q: 'Sayılarının toplamı 0 olan bir çekirdek görüntüye ne yapar?', o: ['Düz alanları siyaha indirir', 'Genel parlaklığı korur', 'Görüntüyü bulanıklaştırır', 'Görüntünün negatifini alır'], a: 0, e: 'Yalnızca değişimin olduğu yerler kalır; Sobel ve Laplacian bu gruptadır. Toplam 1 olan çekirdek parlaklığı korur.' },
  { w: 4, t: 'Gürültü ve bulanıklaştırma', k: 'bulanik', q: 'Tuz-biber gürültüsünü temizlemede genellikle hangi filtre kazanır?', o: ['medianBlur', 'bilateralFilter', 'GaussianBlur', 'blur'], a: 0, e: 'Ortanca, tek tük uç değerleri hesaba katmaz. Bilateral ise o noktaları kenar sanıp korur.' },
  { w: 4, t: 'Kenar bulma', k: 'kenar', q: 'Canny için üst eşik genellikle nasıl seçilir?', o: ['Alt eşiğin 2–3 katı', 'Alt eşiğe eşit', 'Alt eşiğin yarısı', 'Her zaman 255'], a: 0, e: 'Başlangıç için Canny(gri, 50, 150) denenir.' },
  { w: 4, t: 'Morfoloji', k: 'morfoloji', q: 'Açma (opening) işleminin sırası ve etkisi hangisidir?', o: ['Erozyon sonra genişletme; beyaz lekeleri siler', 'Genişletme sonra erozyon; siyah delikleri doldurur', 'Erozyon sonra erozyon; nesneyi inceltir', 'Genişletme sonra genişletme; nesneyi büyütür'], a: 0, e: 'Açma beyazı azaltır, kapama siyahı kapatır.' },
  { w: 4, t: 'Kontur ve nesne sayma', k: 'kontur', q: 'Nesne sayma hattında en çok atlanan adım hangisidir?', o: ['Konturları alana göre süzmek', 'Görüntüyü gri tonlamaya çevirmek', 'Görüntüyü bulanıklaştırmak', 'Otsu ile eşiklemek'], a: 0, e: 'Süzülmezse 3 piksellik bir leke de nesne sayılır.' },
  { w: 4, t: 'Kontur ve nesne sayma', k: 'kontur', q: 'Görüntüde 24 para var ama program 22 buluyor. En olası sebep nedir?', o: ['Birbirine değen paralar tek leke oldu', 'Otsu eşiği küçük paraları zeminle birleştirdi', 'Görüntü BGR yerine RGB okundu', 'Konturlar alana göre süzülmedi'], a: 0, e: 'Alanı normalin iki katı olan kontur bunun işaretidir.' },
  { w: 4, t: 'HSV ve yüz bulma', k: 'hsv', q: 'HSV\'de kırmızıyı bulmak neden iki aralık ister?', o: ['Ton çemberinin iki ucunda yer alır', 'Kırmızı iki farklı kanalda tutulur', 'Gölgedeki kırmızı ayrı bir renktir', 'OpenCV kırmızıyı BGR\'de saklar'], a: 0, e: 'H bir çemberdir; kırmızı 0–10 ve 170–179 aralığındadır.' },
  { w: 4, t: 'HSV ve yüz bulma', k: 'hsv', q: 'Haar cascade yüz bulucu için hangisi doğrudur?', o: ['Karşıdan bakan yüzü bulur, kimliği söylemez', 'Her açıdaki yüzü bulur ve kimliği söyler', 'Yalnızca renkli görüntüde çalışabilir', 'Çalışabilmek için eğitilmiş bir CNN modeli ister'], a: 0, e: 'Yana dönük baş, maske ve zayıf ışıkta başarısızdır.' },
  { w: 4, t: 'Klasik yöntemin sınırı', k: 'sinir', q: 'Hangi problem klasik OpenCV yerine CNN ile çözülmelidir?', o: ['Röntgenden kırık olup olmadığını anlamak', 'Sabit ışıkta banttan geçen şişeleri saymak', 'Taranmış faturayı OCR için temizlemek', 'Görüntüyü küçültüp döndürmek'], a: 0, e: 'Kural yazılamıyor ve etiketli örnek varsa CNN; birkaç net kuralla çözülüyorsa OpenCV.' },
  { w: 4, t: 'CNN', k: 'cnn', q: 'CNN\'in OpenCV filtrelerinden temel farkı nedir?', o: ['Çekirdek sayılarını ağ kendisi öğrenir', 'Evrişim yerine yeni bir işlem kullanır', 'Etiketli veriye hiç ihtiyaç duymaz', 'Her kararını satır satır açıklar'], a: 0, e: 'Evrişim aynıdır; çekirdek rastgele başlar ve eğitimle bulunur.' },
  { w: 4, t: 'CNN', k: 'egit', q: 'CNN\'e vermeden önce piksel değerleri neden 255\'e bölünür?', o: ['0–1 aralığında ağ daha kararlı öğrenir', 'Görüntü dosyası diskte daha az yer kaplar', 'Renkli görüntü griye dönüşür', 'Taşma hatası önlenir'], a: 0, e: '0–255 aralığında ağırlıklar büyük sayılarla çarpılır; eğitim yavaşlar ya da bozulur.' },
  { w: 4, t: 'CNN', k: 'egit', q: 'MaxPooling2D(2) katmanı 28×28\'lik haritayı ne yapar?', o: ['14×14\'e indirir', '56×56\'ya büyütür', '26×26\'ya indirir', 'Boyutunu değiştirmez'], a: 0, e: 'Her 2×2 bloktan en büyük değeri alır; desen okunabilir kalır.' },
  { w: 4, t: 'CNN', k: 'egit', q: 'Dropout(0.3) katmanının görevi nedir?', o: ['Nöronların %30\'unu rastgele kapatmak', 'Verinin %30\'unu doğrulama için ayırmak', 'Öğrenme hızını %30 düşürmek', 'Görüntünün %30\'unu kırpmak'], a: 0, e: 'Ağ tek bir yola bağımlı kalmaz. Tahmin sırasında kendiliğinden devre dışı kalır.' },
  // ---------- 5. HAFTA ----------
  { w: 5, t: 'Doğruluğun tuzağı', k: 'giris', q: '1000 kişinin 100\'ü hasta. Herkese "sağlam" diyen modelin doğruluğu kaçtır?', o: ['%90', '%10', '%0', '%50'], a: 0, e: '900 sağlam kişiye "sağlam" demek bedava puandır; ama tek hasta bile bulunmadı.' },
  { w: 5, t: 'Doğruluğun tuzağı', k: 'giris', q: 'Hastaların oranı azaldıkça hiçbir şey yapmayan modelin doğruluğu ne olur?', o: ['Yükselir', 'Düşer', 'Değişmez', 'Sıfırlanır'], a: 0, e: 'Nüfusun %1\'i hastaysa hiçbir şey yapmayan model %99 alır.' },
  { w: 5, t: 'İki hata', k: 'ikihata', q: 'Normal bir e-postayı spam klasörüne göndermek hangi hatadır?', o: ['Yanlış alarm (false positive)', 'Kaçırma (false negative)', 'Doğru pozitif (true positive)', 'Doğru negatif (true negative)'], a: 0, e: 'Olmayan bir şeye "var" dedik: yanlış alarm, FP.' },
  { w: 5, t: 'İki hata', k: 'ikihata', q: 'Spam filtresinde hangi hata daha pahalıdır?', o: ['Yanlış alarm', 'Kaçırma', 'İkisi eşit', 'Doğru negatif'], a: 0, e: 'Spam klasörüne kimse bakmaz; kaçırılan reklamı silmek ise üç saniye sürer.' },
  { w: 5, t: 'İki hata', k: 'ikihata', q: 'Kanser taramasında hangi hata daha pahalıdır?', o: ['Kaçırma', 'Yanlış alarm', 'İkisi eşit', 'Doğru pozitif'], a: 0, e: 'Hasta eve gönderilirse hastalık ilerler; yanlış alarmı ileri tetkik eler.' },
  { w: 5, t: 'Metrikler', k: 'dortsoru', q: '"Hasta dediklerimin kaçı gerçekten hastaydı?" sorusunun metriği hangisidir?', o: ['Kesinlik', 'Duyarlılık', 'Doğruluk', 'Seçicilik'], a: 0, e: 'Kesinlik (precision) modelin kendi listesine bakar: alarmına ne kadar güvenilir?' },
  { w: 5, t: 'Metrikler', k: 'dortsoru', q: '"Gerçek hastaların kaçını yakalayabildim?" sorusunun metriği hangisidir?', o: ['Duyarlılık', 'Kesinlik', 'Doğruluk', 'Seçicilik'], a: 0, e: 'Duyarlılık (recall) gerçeğe bakar: olanların kaçını buldum?' },
  { w: 5, t: 'Metrikler', k: 'dortsoru', q: 'Model 212 kişiyi işaretledi, 92\'si gerçekten hasta. Toplam 100 hasta var. Duyarlılık kaçtır?', o: ['%92', '%43', '%87', '%8'], a: 0, e: '92 / (92 + 8) = %92. Kesinlik ise 92 / 212 ≈ %43\'tür.' },
  { w: 5, t: 'Metrikler', k: 'dortsoru', q: 'Hiç kimseye "hasta" demeyen modelin kesinliği için ne söylenir?', o: ['Tanımsızdır', '%100\'dür', '%0\'dır', '%90\'dır'], a: 0, e: 'Hiç "hasta" demediği için payda sıfırdır; hesaplanamaz. Duyarlılığı ise %0\'dır.' },
  { w: 5, t: 'Eşik', k: 'esik', q: 'Ders notuna göre bir sınıflandırma modeli aslında ne üretir?', o: ['0 ile 1 arasında bir skor', 'Doğrudan "evet" ya da "hayır"', 'Bir karmaşıklık matrisi', 'Her sınıf için bir eşik'], a: 0, e: 'Kararı skor değil, skorun kesildiği eşik verir. Varsayılan eşik çoğu kütüphanede 0,5\'tir.' },
  { w: 5, t: 'Eşik', k: 'tahterevalli', q: 'Aynı modelde eşiği düşürürsen ne olur?', o: ['Duyarlılık artar, kesinlik düşer', 'Kesinlik artar, duyarlılık düşer', 'İkisi birden artar', 'İkisi birden düşer'], a: 0, e: 'Daha çok kişiye "hasta" dersin: daha çok hasta yakalanır ama listeye sağlamlar karışır.' },
  { w: 5, t: 'Eşik', k: 'tahterevalli', q: 'Kesinliği ve duyarlılığı aynı anda yükseltmenin yolu nedir?', o: ['Daha iyi bir model kurmak', 'Eşiği biraz düşürmek', 'Eşiği biraz yükseltmek', 'F1 skorunu takip etmeye başlamak'], a: 0, e: 'Eşik tahterevallinin üzerinde kaydırır; daha iyi model tahterevallinin tamamını yukarı taşır.' },
  { w: 5, t: 'F1', k: 'f1', q: 'Kesinlik %100, duyarlılık %2 olan modelin F1 skoru hangisine yakındır?', o: ['%4', '%51', '%2', '%100'], a: 0, e: 'F1 harmonik ortalamadır; küçük olana yakın durur. Düz ortalama %51 olurdu.' },
  { w: 5, t: 'F1', k: 'f1', q: 'F1 skoru hangi durumda yanlış pusula olur?', o: ['İki hatanın bedeli eşit değilse', 'Sınıflar eşit sayıda örnekten oluşuyorsa', 'Test verisi çok büyükse', 'Model karar ağacıysa'], a: 0, e: 'F1 iki hatanın eşit pahalı olduğunu varsayar; kanser taramasında bu yanlıştır.' },
  { w: 5, t: 'ROC ve PR', k: 'egri', q: 'AUC değeri 0,5 olan bir model için ne söylenir?', o: ['Yazı tura atmakla aynıdır', 'Sınıfları kusursuz biçimde ayırır', 'Aşırı öğrenmiştir', 'Eşiği 0,5\'tir'], a: 0, e: 'AUC 1,0 kusursuz, 0,5 rastgele tahmindir.' },
  { w: 5, t: 'ROC ve PR', k: 'egri', q: 'Pozitifler azınlıksa (dolandırıcılık gibi) hangi eğriye bakılmalıdır?', o: ['PR eğrisi', 'ROC eğrisi', 'Öğrenme eğrisi', 'Kayıp eğrisi'], a: 0, e: 'ROC yanlış alarmların ağırlığını küçük gösterir; dengesiz veride PR daha dürüsttür.' },
  { w: 5, t: 'ROC ve PR', k: 'egri', q: '"AUC 0,95, model harika" deyip eşik seçmemek neden hatadır?', o: ['Üretimde çalışan şey tek bir eşiktir', 'AUC yalnızca eğitim verisinde ölçülür', 'AUC dengesiz veride hesaplanamaz', 'AUC yükseldikçe kesinlik düşer'], a: 0, e: 'AUC modelin potansiyelini ölçer, kullandığınız ayarı değil.' },
  { w: 5, t: 'Taban çizgisi', k: 'taban', q: 'Müşterilerin %4\'ü ayrılıyor, model %96 doğruluk aldı. İlk sorulması gereken nedir?', o: ['Taban çizgisi kaç?', 'Kaç özellik kullanıldı?', 'Hangi algoritma seçildi?', 'Eğitim ne kadar sürdü?'], a: 0, e: '"Kimse ayrılmaz" diyen tek satır kod da %96 alır.' },
  { w: 5, t: 'Taban çizgisi', k: 'taban', q: 'Zaman serilerinde şaşırtıcı derecede güçlü taban çizgisi hangisidir?', o: ['Dünkü değer', 'Hep çoğunluk', 'Hep ortalama', 'Rastgele tahmin'], a: 0, e: '"Yarın bugünle aynı olacak" tahmini çoğu zaman zor geçilir.' },
  { w: 5, t: 'Dengesiz veri', k: 'dengesiz', q: 'Dengesiz veride sonuç raporlanırken ders notu ne önerir?', o: ['Ham sayıları adet olarak vermek', 'Yalnızca doğruluğu vermek', 'Sadece eğrinin altındaki alanı vermek', 'Sonucu yüzdeye yuvarlamak'], a: 0, e: '"92 yakalandı, 8 kaçtı, 120 yanlış alarm" gibi. Yüzdeler büyüyü bozmaz, ham sayılar bozar.' },
  { w: 5, t: 'Sayı tahmini', k: 'regresyon', q: 'Büyük hataları orantısız biçimde cezalandıran ölçü hangisidir?', o: ['RMSE', 'MAE', 'Doğruluk', 'Kesinlik'], a: 0, e: 'Kareleme büyük hataları şişirir; tek felaket tahmin RMSE\'yi yukarı çeker.' },
  { w: 5, t: 'Sayı tahmini', k: 'regresyon', q: 'Mağaza stok tahmininde hatalar birbirini dengeliyorsa hangi ölçü uygundur?', o: ['MAE', 'RMSE', 'AUC', 'F1'], a: 0, e: 'Hataların toplamı önemliyse MAE; bir büyük hata daha kötüyse RMSE.' },
  { w: 5, t: 'Nerede ölçüyoruz', k: 'sinav', q: 'Eğitim skoru çok yüksek, test skoru düşük ve aradaki fark açılıyorsa bu nedir?', o: ['Aşırı öğrenme', 'Eksik öğrenme', 'Veri dengesizliği', 'Eşik hatası'], a: 0, e: 'Model genel kuralı değil, eğitimdeki tesadüfleri öğrenmiştir.' },
  { w: 5, t: 'Güven', k: 'belirsizlik', q: 'A modeli %87 ± 4, B modeli %85 ± 4. Doğru yorum hangisidir?', o: ['İki model ayırt edilemez', 'A daha iyidir', 'B daha iyidir', 'İkisi de aşırı öğrenmiştir'], a: 0, e: 'Aradaki 2 puan gürültü olabilir; çapraz doğrulama yayılımı gösterir.' },
  { w: 5, t: 'Goodhart yasası', k: 'goodhart', q: 'Goodhart yasası neyi söyler?', o: ['Hedef hâline gelen ölçü bozulur', 'Daha çok veri her zaman iyidir', 'Doğruluk en güvenilir ölçüdür', 'Eşik her zaman 0,5 olmalıdır'], a: 0, e: 'Çözüm: ana metriğin yanına bozulmasını istemediğiniz koruma metrikleri koymak.' },
  // ---------- MOBİL UYGULAMA 1. HAFTA (w: 11) ----------
  { w: 11, t: 'API nedir?', k: 'api', q: 'API kısaltmasının açılımı nedir?', o: ['Application Programming Interface', 'Application Protocol Interface', 'Advanced Programming Integration', 'Automated Program Interface'], a: 0, e: 'Uygulama Programlama Arayüzü; iki yazılımın hangi kurallarla konuşacağını tanımlar.' },
  { w: 11, t: 'API nedir?', k: 'api', q: 'Ders notuna göre API\'yi en iyi anlatan kavram hangisidir?', o: ['Sözleşme', 'Veritabanı', 'Protokol', 'Programlama dili'], a: 0, e: '"Şu adrese şu yöntemle gönderirsen şu formatta cevap veririm" sözleşmesidir.' },
  { w: 11, t: 'API nedir?', k: 'api', q: '"API = veritabanı" ifadesi için hangisi doğrudur?', o: ['Yanlış; API veriye erişimi kontrol eden kapıdır', 'Doğru; API veritabanına verilen başka bir addır', 'Yalnızca SQL Server kullanılıyorsa doğrudur', 'Yalnızca GET istekleri için doğrudur'], a: 0, e: 'API giriş, iş kuralı ve entegrasyon da yapar; veritabanını doğrudan açmak yerine erişimi yönetir.' },
  { w: 11, t: 'Büyük resim', k: 'giris', q: 'Mobil ve web uygulamasının aynı hesapla giriş yapabilmesi için ne gerekir?', o: ['İkisinin de aynı API\'yi kullanması', 'İkisinin de aynı dille yazılması', 'İkisinin de aynı cihazda çalışması', 'İkisinin de veritabanına bağlanması'], a: 0, e: 'Mobil Flutter, web React olabilir; önemli olan aynı API ile konuşmalarıdır.' },
  { w: 11, t: 'Neden API?', k: 'neden', q: 'Mobil uygulamayı doğrudan veritabanına bağlamanın sakıncası hangisidir?', o: ['Bağlantı bilgisi uygulamayla dağıtılır', 'Uygulama JSON veri okuyamaz hâle gelir', 'Veritabanı yalnızca okunabilir olur', 'Uygulama mağazaya yüklenemez'], a: 0, e: 'Ayrıca veritabanını internete açmak ve iş kurallarını her istemcide yeniden yazmak gerekir.' },
  { w: 11, t: 'Neden API?', k: 'neden', q: 'Endpointleri sunan tarafa ne denir?', o: ['API sağlayıcısı', 'API tüketicisi', 'İstemci', 'Ara katman'], a: 0, e: 'Sağlayıcı endpointleri sunar, tüketici bu endpointlere istek atar.' },
  { w: 11, t: 'HTTP nedir?', k: 'http', q: 'HTTP için hangisi doğrudur?', o: ['İstemci ile sunucu arasındaki iletişim protokolüdür', 'Web servisleri tasarlamak için bir mimari yaklaşımdır', 'Veriyi metin olarak taşıyan bir formattır', 'Sunucu tarafında kullanılan bir programlama dilidir'], a: 0, e: 'Hypertext Transfer Protocol: önceden anlaşılmış iletişim kuralları. Mimari yaklaşım REST, format JSON\'dur.' },
  { w: 11, t: 'HTTP nedir?', k: 'http', q: 'HTTPS\'i HTTP\'den ayıran nedir?', o: ['İletişim TLS ile şifrelenir', 'Mesajlar daha hızlı iletilir', 'Body JSON yerine XML olur', 'Yalnızca mobilde kullanılır'], a: 0, e: 'Kullanıcı bilgisi ve token gibi hassas veriler için HTTPS zorunlu kabul edilir.' },
  { w: 11, t: 'Request / Response', k: 'mesaj', q: 'Klasik HTTP modelinde iletişimi kim başlatır?', o: ['İstemci', 'Sunucu', 'Veritabanı', 'İşletim sistemi'], a: 0, e: 'İstemci request gönderir, sunucu response döndürür. Sunucu kendiliğinden cevap göndermez.' },
  { w: 11, t: 'Request / Response', k: 'mesaj', q: 'Token gibi ek bilgiler request\'in hangi bölümünde taşınır?', o: ['Headers', 'Body', 'Status code', 'Path'], a: 0, e: 'Headers token ve içerik türü gibi ek bilgileri taşır; gönderilen veri body\'dedir.' },
  { w: 11, t: 'URL ve endpoint', k: 'url', q: '/api/students/15 adresindeki 15 nedir?', o: ['Path parameter', 'Query parameter', 'Header değeri', 'Status code'], a: 0, e: 'Belirli bir kaynağı kimliğiyle seçen path parameter\'dır.' },
  { w: 11, t: 'URL ve endpoint', k: 'url', q: 'Ürün listesinde filtreleme ve sayfalama için genellikle ne kullanılır?', o: ['Query parameter', 'Path parameter', 'Request header', 'HTTP metodu'], a: 0, e: 'İsteğe bağlı seçenekler ?category=book&page=2 gibi query parameter olarak gönderilir.' },
  { w: 11, t: 'HTTP metodları', k: 'methods', q: 'Yeni ürün oluşturmak için GET /api/products/add yerine hangisi tercih edilir?', o: ['POST /api/products', 'PUT /api/products/add', 'GET /api/products?add=1', 'PATCH /api/products'], a: 0, e: 'Metot isteğin niyetini söyler; kaynak kümesine yeni kayıt eklemek POST\'tur.' },
  { w: 11, t: 'HTTP metodları', k: 'methods', q: 'Kaynağın yalnızca bir kısmını güncellemek için hangi metot uygundur?', o: ['PATCH', 'PUT', 'POST', 'GET'], a: 0, e: 'PUT kaynağın tamamını, PATCH bir kısmını günceller.' },
  { w: 11, t: 'Status code', k: 'status', q: 'Kullanıcı var olmayan bir adrese istek atarsa genellikle hangi kod döner?', o: ['404', '500', '400', '403'], a: 0, e: '404 kaynağın bulunamadığını söyler; 500 sunucunun kendi içinde beklenmeyen bir hata yaşadığını gösterir.' },
  { w: 11, t: 'Status code', k: 'status', q: '4xx ile başlayan durum kodları neyi gösterir?', o: ['İstemci kaynaklı bir problemi', 'Sunucunun kendi içinde oluşan bir hatayı', 'Başarılı bir işlemi', 'Bir yönlendirmeyi'], a: 0, e: '2xx başarı, 3xx yönlendirme, 4xx istemci, 5xx sunucu.' },
  { w: 11, t: 'Status code', k: 'dotnet', q: 'POST ile yeni ürün eklendiğinde Results.Ok yerine neden Results.Created döndürülür?', o: ['201 kodu yeni kaynak oluştuğunu söyler', '200 kodu POST isteklerinde kullanılamaz', 'Created cevabı daha hızlı iletilir', 'Ok cevabı body taşıyamaz'], a: 0, e: 'Created hem 201 döner hem de yeni kaynağın adresini verir.' },
  { w: 11, t: 'REST', k: 'rest', q: 'REST için hangisi doğrudur?', o: ['HTTP\'yi düzenli kullanmayı öneren mimari yaklaşımdır', 'HTTP üzerine eklenen şifreli ve güvenli bir katmandır', 'Veriyi taşımak için kullanılan bir formattır', 'Microsoft\'un geliştirdiği bir protokoldür'], a: 0, e: 'REST bir dil ya da protokol değildir; HTTP protokoldür.' },
  { w: 11, t: 'REST', k: 'rest', q: 'REST\'teki "stateless" ilkesi ne demektir?', o: ['Her istek gerekli bilgiyi kendisi taşır', 'Sunucu her kullanıcının oturumunu tutar', 'Sunucu veriyi kalıcı olarak saklamaz', 'İstekler yalnızca GET ile yapılabilir'], a: 0, e: 'Sunucu önceki isteği hatırlamak zorunda değildir.' },
  { w: 11, t: 'JSON', k: 'json', q: 'JSON için hangisi doğrudur?', o: ['Hemen her dil okuyup üretebilir', 'Yalnızca JavaScript okuyabilir', 'İkili (binary) bir veri formatıdır', 'Yalnızca .NET ile kullanılabilir'], a: 0, e: 'Adında JavaScript geçse de C#, Dart, Java ve Python JSON\'u destekler.' },
  { w: 11, t: '.NET Web API', k: 'dotnet', q: 'Minimal API\'de GET endpoint hangi metotla tanımlanır?', o: ['app.MapGet', 'app.UseGet', 'app.AddGet', 'builder.MapGet'], a: 0, e: 'app.MapGet("/api/hello", ...) ile tanımlanır; dönen anonim nesne otomatik JSON olur.' },
  { w: 11, t: 'Postman laboratuvarı', k: 'postman', q: 'Postman bu aşamada neden yararlıdır?', o: ['API\'yi mobil uygulama olmadan test ettirir', 'API kodunu Swagger tanımından otomatik olarak üretir', 'Mobil arayüzü tasarlamayı sağlar', 'Veritabanı tablolarını oluşturur'], a: 0, e: 'Sorunun API\'de mi mobil kodda mı olduğunu ayırmayı kolaylaştırır.' },
  // ---------- MOBİL UYGULAMA 2. HAFTA (w: 12) ----------
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'Kullanıcı her API çağrısında şifresini göndermesin diye girişten sonra ona ne verilir?', o: ['Token', 'Salt', 'Hash', 'Connection string'], a: 0, e: 'İstemci sonraki isteklerde tokenı Authorization: Bearer başlığıyla gönderir.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'JWT için hangisi doğrudur?', o: ['Payload okunabilir ama fark ettirmeden değiştirilemez', 'Payload şifrelidir, gizli anahtarı bilmeyen okuyamaz', 'Payload\'a kullanıcının şifresi de yazılır', 'İmza yalnızca süreyi kontrol etmek içindir'], a: 0, e: 'JWT gizlemez, imzalar. Güvenlik gizlilikten değil, imzadan gelir.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'JWT\'nin üç parçası hangileridir?', o: ['Header · Payload · Signature', 'Header · Body · Footer', 'Salt · Hash · Signature', 'Issuer · Audience · Expiration'], a: 0, e: 'Signature gizli anahtarla üretilir; payload değiştirilirse imza tutmaz.' },
  { w: 12, t: 'Token ve JWT', k: 's2', q: 'Stateless JWT kullanan bir API\'de "çıkış yap" nasıl gerçekleşir?', o: ['İstemci tokenı kendi deposundan siler', 'Sunucu kullanıcının oturumunu siler', 'API tokenın imzasını hemen iptal eder', 'Kullanıcının şifresi sıfırlanır'], a: 0, e: 'Sunucuda silinecek oturum yoktur; token süresi dolana kadar teknik olarak geçerlidir.' },
  { w: 12, t: 'SSMS veritabanı', k: 's3', q: 'Urun tablosunda Fiyat alanı için hangi tür önerildi?', o: ['DECIMAL(18,2)', 'FLOAT', 'NVARCHAR(50)', 'INT'], a: 0, e: 'Para hesaplarında DECIMAL kayan nokta hatalarından kaçınır.' },
  { w: 12, t: 'SSMS veritabanı', k: 's3', q: 'Kullanici.YetkiId alanına Yetki tablosunda olmayan bir değer yazılmasını ne engeller?', o: ['Foreign Key', 'Primary Key', 'IDENTITY', 'UNIQUE'], a: 0, e: 'YetkiId = 99 eklemeye çalışmak hata üretir.' },
  { w: 12, t: 'Database First', k: 's6', q: 'Database First yaklaşımında hangisi önce hazırlanır?', o: ['Veritabanı; C# sınıfları ondan üretilir', 'C# sınıfları; tablolar onlardan üretilir', 'Migration dosyaları; tablolar sonra gelir', 'Controller\'lar; model sonra yazılır'], a: 0, e: 'EF Core mevcut şemayı okuyup DbContext ve entity sınıflarını scaffold eder.' },
  { w: 12, t: 'Database First', k: 's6', q: 'Scaffold komutundaki --no-onconfiguring bayrağı ne işe yarar?', o: ['Bağlantı bilgisini üretilen koda gömmez', 'DbSet adlarının çoğullanmasını engeller', 'Var olan model dosyalarının üzerine yazar', 'Tablolar arasındaki ilişkileri atlar'], a: 0, e: 'Connection string merkezi olarak appsettings.json\'a konur.' },
  { w: 12, t: 'Scaffold çıktıları', k: 's7', q: '--no-pluralize yazılmazsa Kullanici tablosunun DbSet adı ne olur?', o: ['Kullanicis', 'Kullanicilar', 'Kullanici', 'Kullanicies'], a: 0, e: 'EF Core İngilizce çoğullama kuralı uygular; Türkçe çoğul üretmez.' },
  { w: 12, t: 'Şifre doğrulama', k: 's9', q: 'Giriş sırasında kullanıcının şifresi nasıl doğrulanır?', o: ['Aynı salt ile hashlenip kayıtlı hash ile karşılaştırılır', 'Kayıtlı hash geri çözülüp girilen şifreyle karşılaştırılır', 'Girilen şifre düz metin olarak tabloda aranır', 'Girilen şifre tokenın imzasıyla karşılaştırılır'], a: 0, e: 'Hash geri döndürülemez; karşılaştırma hash\'ler üzerinden yapılır.' },
  { w: 12, t: 'Şifre doğrulama', k: 's9', q: 'Her kullanıcı için farklı bir salt üretilmesinin sebebi nedir?', o: ['Aynı şifrelerin hash\'i farklı çıksın', 'Şifre veritabanında daha kısa saklanabilsin', 'Doğrulama daha hızlı yapılabilsin', 'Token içinde taşınabilsin'], a: 0, e: 'Salt olmasa aynı şifreyi seçenlerin hash\'i aynı olur ve hazır tablolarla karşılaştırılabilirdi.' },
  { w: 12, t: 'Şifre doğrulama', k: 's9', q: 'PBKDF2\'nin 100.000 tur çalıştırılmasının amacı nedir?', o: ['Kaba kuvvet denemelerini yavaşlatmak', 'Üretilen hash değerinin uzunluğunu artırmak', 'Salt değerini gizli tutmak', 'Doğrulamayı hızlandırmak'], a: 0, e: 'Tek doğrulamada fark edilmez, milyonlarca deneme yapmak isteyen için caydırıcıdır.' },
  { w: 12, t: 'Kullanıcı kaydı', k: 's20', q: 'Aynı e-postayla ikinci kez kayıt denenirse API hangi kodu döndürür?', o: ['409 Conflict', '400 Bad Request', '403 Forbidden', '404 Not Found'], a: 0, e: 'İstek geçerli ama mevcut kayıtla çakışıyor.' },
  { w: 12, t: 'Kullanıcı kaydı', k: 's20', q: 'Kayıt endpointi Admin tokenı istiyorsa ilk Admin nereden gelir?', o: ['SQL ile elle eklenen kullanıcıdan', 'Kayıt endpointinin anonim çağrısından', 'Swagger\'ın varsayılan hesabından', 'JWT\'nin ürettiği ilk kullanıcıdan'], a: 0, e: 'Her sistemde ilk yönetici hesabı uygulama dışından (script, seed, elle kayıt) oluşturulur.' },
  { w: 12, t: 'Ben kimim?', k: 's21', q: '"Benim siparişlerim" gibi bir listede kullanıcı id\'si nereden alınmalıdır?', o: ['Tokendan gelen claim\'lerden', 'İstek gövdesindeki alandan', 'URL\'deki query parametresinden', 'İstemcinin gönderdiği başlıktan'], a: 0, e: 'İstemcinin gönderdiği id\'ye güvenilirse ?kullaniciId=1 yazan başkasının verisini okur.' },
  { w: 12, t: 'Yetkilendirme', k: 's12', q: 'Authentication ve authorization arasındaki fark hangisidir?', o: ['Biri kimliği, öbürü yetkiyi kontrol eder', 'Biri şifreyi, öbürü tokenı üretir', 'Biri istemcide, öbürü sunucu tarafında çalışır', 'Biri GET, öbürü POST için kullanılır'], a: 0, e: 'Authentication: "Sen kimsin?" Authorization: "Bunu yapmaya yetkin var mı?"' },
  { w: 12, t: 'DTO ve doğrulama', k: 's22', q: 'Ürün eklerken entity yerine DTO almanın sebebi nedir?', o: ['İstemci UrunId gibi alanları dolduramasın', 'İstemciden daha fazla alan alabilmek', 'Veritabanı sorgularını daha hızlı çalıştırmak', 'Tokenın boyutunu küçültmek'], a: 0, e: 'Buna over-posting denir. DTO API sözleşmesini veritabanı şemasından da ayırır.' },
  { w: 12, t: 'DTO ve doğrulama', k: 's22', q: '[ApiController] varken [Range] kuralına uymayan bir istek gelirse ne olur?', o: ['Action çalışmadan otomatik 400 döner', 'Action çalışır, değer sıfıra çekilir', 'Veritabanı hata verir ve 500 döner', 'İstek kaydedilir, uyarı loglanır'], a: 0, e: 'Model doğrulaması action çalışmadan yapılır.' },
  { w: 12, t: '400 / 401 / 403', k: 's18', q: 'Personel tokenıyla POST /api/urunler isteği atılırsa hangi kod döner?', o: ['403', '401', '400', '201'], a: 0, e: 'Kimlik belli ama rol yetersiz: seni tanıyorum ama izin yok.' },
  { w: 12, t: '400 / 401 / 403', k: 's18', q: 'Admin tokenıyla boş adlı ve negatif fiyatlı ürün eklenirse hangi kod döner?', o: ['400', '401', '403', '409'], a: 0, e: '400 = seni tanıyorum, iznin de var ama gönderdiğin veri hatalı.' },
  { w: 12, t: 'Swagger', k: 's15', q: 'Swagger\'daki Authorize kutusuna ne yazılmalıdır?', o: ['Yalnızca token', '"Bearer " ve token', 'E-posta ve şifre', 'JWT gizli anahtarı'], a: 0, e: 'Swagger Bearer önekini kendisi ekler; elle yazılırsa "Bearer Bearer" olur ve hep 401 gelir.' },
  { w: 12, t: 'Program.cs', k: 's16', q: 'Program.cs\'te doğru middleware sırası hangisidir?', o: ['UseCors → UseAuthentication → UseAuthorization', 'UseAuthentication → UseCors → UseAuthorization', 'UseAuthorization → UseAuthentication → UseCors', 'UseCors → UseAuthorization → UseAuthentication'], a: 0, e: 'Önce nereden geliyor, sonra sen kimsin, en son bunu yapabilir misin.' },
  { w: 12, t: 'Program.cs', k: 's16', q: 'CORS hatasını hangi istemci görür?', o: ['Tarayıcıdaki web uygulaması', 'Flutter mobil uygulaması', 'Postman', 'Aynı adresten açılan Swagger arayüzü'], a: 0, e: 'CORS yalnızca tarayıcı tabanlı istemcileri etkiler.' },
  // ---------- MOBİL UYGULAMA 3. HAFTA (w: 13) ----------
  { w: 13, t: 'Kısa mobil tarihi', k: 's2', q: 'Ders notuna göre 2008\'de mobil dünyadaki asıl kırılma neydi?', o: ['App Store ve Android ile dağıtım', 'Dokunmatik ekranın ortaya çıkması', 'Swift ve Kotlin dillerinin gelmesi', 'Telefonlara kamera eklenmesi'], a: 0, e: 'Geliştirici ilk kez uygulamasını doğrudan kullanıcıya ulaştırabildi.' },
  { w: 13, t: 'Kısa mobil tarihi', k: 's2', q: 'Cordova / PhoneGap yaklaşımı nasıl çalışır?', o: ['Uygulamaya gömülü tarayıcıda HTML/JS çalıştırır', 'Her pikseli kendi çizim motoruyla çizer', 'Native bileşenleri JavaScript köprüsüyle çağırır', 'Kodu her platform için ayrı ayrı derler'], a: 0, e: 'Çalıştı ama yavaştı ve kullanıcı "bu bir web sitesi" hissini aldı.' },
  { w: 13, t: 'Dört yol', k: 's3', q: 'Liste, form ve API tüketen bir iş uygulaması için ders hangi yaklaşımı önerir?', o: ['Cross-platform', 'Native (Kotlin ve Swift)', 'Hybrid (Cordova)', 'PWA (web uygulaması)'], a: 0, e: 'Dönem projesi için cevap: cross-platform, özel olarak Flutter.' },
  { w: 13, t: 'Dört yol', k: 's3', q: 'Mağaza gerektirmeyen ama donanıma sınırlı erişebilen yaklaşım hangisidir?', o: ['PWA', 'Native', 'Hybrid', 'Cross-platform'], a: 0, e: 'PWA telefona "kurulmuş" gibi eklenen bir web sitesidir; iOS\'ta kısıtlıdır.' },
  { w: 13, t: 'Hangi dil?', k: 's4', q: 'Flutter uygulamaları hangi dille yazılır?', o: ['Dart', 'Kotlin', 'Swift', 'JavaScript'], a: 0, e: 'Dart Flutter dışında pek kullanılmaz; Dart öğrenmek pratikte Flutter öğrenmektir.' },
  { w: 13, t: 'Hangi dil?', k: 's4', q: 'Google\'ın 2017\'den beri Android native için resmî önerdiği dil hangisidir?', o: ['Kotlin', 'Java', 'Dart', 'C#'], a: 0, e: 'Java eski projelerde sürer; iOS tarafında resmî dil Swift\'tir.' },
  { w: 13, t: 'Neden Flutter?', k: 's5', q: 'Flutter\'ın uygulamanın iki telefonda birebir aynı görünmesini sağlayan özelliği hangisidir?', o: ['Her pikseli kendi motoruyla çizmesi', 'Platformun hazır bileşenlerini kullanması', 'Uygulamayı tarayıcıda çalıştırması', 'Hot reload desteklemesi'], a: 0, e: 'Flutter platformun hazır bileşenlerini kullanmaz; kendi çizim motoru vardır.' },
  { w: 13, t: 'Neden Flutter?', k: 's5', q: 'Hangi durumda Flutter tercih edilmez?', o: ['Yüksek performanslı 3D oyunlarda', 'Liste ve form ağırlıklı uygulamalarda', 'API tüketen uygulamalarda', 'Küçük ekiplerin iki platform hedeflediği işlerde'], a: 0, e: '3D oyunlar için Unity/Unreal, derin donanım erişimi için native daha uygundur.' },
  { w: 13, t: 'Geliştiricinin masası', k: 's6', q: 'Flutter kurulumunun doğru olup olmadığını hangi komut kontrol eder?', o: ['flutter doctor', 'flutter run', 'flutter pub get', 'flutter create'], a: 0, e: 'Flutter ve Android toolchain satırları yeşilse derse devam edilebilir.' },
  { w: 13, t: 'Geliştiricinin masası', k: 's6', q: 'Windows kullanan bir öğrenci Flutter ile hangi hedefe derleme yapamaz?', o: ['iOS', 'Android', 'Web', 'Windows masaüstü'], a: 0, e: 'iPhone\'a derlemek Mac gerektirir; bu Flutter\'ın değil Apple\'ın kuralıdır.' },
  { w: 13, t: 'Proje haritası', k: 's7', q: 'Yazdığın Dart kodunun büyük kısmı hangi klasörde durur?', o: ['lib/', 'android/', 'build/', 'test/'], a: 0, e: 'Dart kodu lib/, paketler pubspec.yaml, Android izinleri android/ altındadır.' },
  { w: 13, t: 'Proje haritası', k: 's7', q: 'Projenin kullandığı paketler hangi dosyada tanımlanır?', o: ['pubspec.yaml', 'pubspec.lock', 'main.dart', 'AndroidManifest.xml'], a: 0, e: 'pubspec.lock kurulan tam sürümlerin kaydıdır ve elle düzenlenmez.' },
  { w: 13, t: 'Widget ve state', k: 's8', q: 'API\'den gelen veri gibi zamanla değişen parçalar için hangi widget türü kullanılır?', o: ['StatefulWidget', 'StatelessWidget', 'MaterialApp', 'Scaffold'], a: 0, e: 'StatefulWidget setState çağrıldığında yeniden çizilir.' },
  { w: 13, t: 'Widget ve state', k: 's8', q: 'C#\'taki Task<T> türünün Dart\'taki karşılığı nedir?', o: ['Future<T>', 'Stream<T>', 'List<T>', 'Isolate<T>'], a: 0, e: 'Aynı fikir, farklı isim; async/await kullanımı da birebir aynıdır.' },
  { w: 13, t: 'pub.dev', k: 's9', q: 'pub.dev, .NET dünyasında hangisinin karşılığıdır?', o: ['NuGet', 'Swagger', 'EF Core', 'IIS'], a: 0, e: 'Flutter\'ın paket deposudur; örneğin http paketi buradan gelir.' },
  { w: 13, t: 'İstek 1: Şehir → koordinat', k: 's13', q: '"Isparta" araması birden fazla sonuç döndürdüğünde uygulama ne yapmalıdır?', o: ['Sonuçları kullanıcıya seçtirmek', 'Listedeki ilk sonucu otomatik almak', 'Hata mesajı göstermek', 'Aramayı count=1 ile tekrarlamak'], a: 0, e: 'Aynı adı taşıyan birden fazla yer vardır; ilk sonucu otomatik almak hatalı yeri getirebilir.' },
  { w: 13, t: 'Altı keşif', k: 's16', q: 'Open-Meteo yanıtındaki hourly alanı nasıl bir yapıdadır?', o: ['İçinde paralel diziler olan bir nesne', 'Her saat için ayrı nesnelerin listesi', 'Saatleri anahtar alan bir sözlük', 'Virgülle ayrılmış tek bir metin'], a: 0, e: 'time[] ve temperature_2m[] aynı index üzerinden eşleşir.' },
  { w: 13, t: 'Altı keşif', k: 's16', q: 'Yanıtta weather_code: 1 gelmesi için hangisi doğrudur?', o: ['Bir koddur; anlamını uygulama çevirir', '"Az bulutlu" metni olarak gösterilir', 'İsteğin başarılı olduğunu bildirir', 'Saatlik sıcaklık değeridir'], a: 0, e: 'API veri verir, anlam vermez; WMO kodlarını metne uygulama çevirir.' },
  { w: 13, t: 'İstek 3–4: Tahmin ve hata', k: 's15', q: 'API\'den 400 Bad Request alındığında hata nerede aranmalıdır?', o: ['Gönderilen istekte', 'Sunucunun kodunda', 'Telefonun internetinde', 'API\'nin istek sınırında'], a: 0, e: '400 gönderdiğin isteğin yanlış olduğunu söyler; isteği düzelt. Çok fazla istek 429\'dur.' },
  { w: 13, t: 'Klasik duvarlar', k: 's19', q: 'Android emülatöründen bilgisayarda çalışan API\'ye hangi adresle bağlanılır?', o: ['10.0.2.2', 'localhost', '127.0.0.1', '192.168.0.1'], a: 0, e: 'Emülatörün localhost\'u kendisidir. Gerçek telefonda bilgisayarın yerel IP\'si kullanılır.' },
  { w: 13, t: 'Klasik duvarlar', k: 's19', q: 'Uygulamada https:// adresler çalışıyor ama http:// adresler çalışmıyorsa sebep nedir?', o: ['Android şifresiz trafiği engeller', 'Manifest\'e INTERNET izni eklenmemiştir', 'Emülatör yanlış adrese gider', 'http paketi eski sürümdedir'], a: 0, e: 'Android şifrelenmemiş trafiği varsayılan olarak engeller.' },
  { w: 13, t: 'Dil modeliyle geliştirme', k: 's20', q: 'Dil modelinden ekran isterken en güçlü istem hangisidir?', o: ['Gerçek adresi ve örnek JSON\'u vermek', '"Hava durumu uygulaması yaz" demek', 'Yalnızca bir ekran görüntüsü vermek', 'Paket seçimini modele bırakmak'], a: 0, e: 'Postman\'den alınan gerçek veri, modelin uydurma alanını kapatır.' },
  // ---------- MOBİL UYGULAMA 4. HAFTA (w: 14) ----------
  { w: 14, t: 'İki tür kayıt', k: 's3', q: 'Herkese açık kayıt ucunda yeni kullanıcının rolünü kim belirlemelidir?', o: ['Sunucu; her zaman Uye verir', 'İstemci; istekte YetkiId gönderir', 'Kullanıcı; formdan rolünü seçer', 'Veritabanı; varsayılan değerle atar'], a: 0, e: 'Rolü istemci seçerse "yetkiId": 1 yazan herkes yönetici olur.' },
  { w: 14, t: 'İki tür kayıt', k: 's3', q: 'Kullanıcının istekte kendi rolünü seçip yönetici olabilmesine ne denir?', o: ['Yetki yükseltme', 'Kullanıcı sayımı', 'Veri sızıntısı', 'Oturum çalma'], a: 0, e: 'Gerçek dünyada en sık rastlanan güvenlik açıklarındandır.' },
  { w: 14, t: 'Veritabanına üye rolü', k: 's4', q: 'Yetki tablosuna "Uye" satırı eklendikten sonra scaffold\'u yeniden çalıştırmak gerekir mi?', o: ['Hayır; satır eklemek şemayı değiştirmez', 'Evet; her veri değişikliğinden sonra', 'Evet; yeni rol için ayrı bir sınıf üretilmeli', 'Hayır; çünkü migration kullanıyoruz'], a: 0, e: 'Yeni sütun veya tablo eklenseydi gerekirdi; satır veri değişikliğidir.' },
  { w: 14, t: 'Şifre nasıl saklanır?', k: 's5', q: 'Salt neden her kullanıcı için ayrı ve rastgele üretilir?', o: ['Aynı şifrelerin hash\'i farklı olsun', 'Şifre veritabanında daha kısa yer kaplasın', 'Giriş işlemi daha hızlı olsun', 'Token içinde taşınabilsin'], a: 0, e: 'Rastgele salt, önceden hesaplanmış hash tablolarını da işe yaramaz yapar.' },
  { w: 14, t: 'KayitDto ve kurallar', k: 's6', q: 'KayitDto\'da SifreTekrar alanının Sifre ile aynı olduğunu hangi öznitelik kontrol eder?', o: ['[Compare]', '[Required]', '[StringLength]', '[Range]'], a: 0, e: '[Compare(nameof(Sifre))] SifreTekrar alanında kullanılır.' },
  { w: 14, t: 'KayitDto ve kurallar', k: 's6', q: 'Telefondaki form doğrulaması tamamen silinirse ne olur?', o: ['Sistem güvenli kalır, kullanım zorlaşır', 'Veritabanına kurallara uymayan kayıtlar girer', 'API istekleri reddetmeyi bırakır', 'Kullanıcılar başkasının rolünü alır'], a: 0, e: 'Telefondaki doğrulama kolaylık, sunucudaki doğrulama güvenliktir.' },
  { w: 14, t: 'Kayıt ucunu yazalım', k: 's7', q: 'Kayıt ucunda e-posta neden ToLowerInvariant() ile küçük harfe çevrilir?', o: ['Büyük-küçük harf farkı iki hesap açmasın', 'SQL Server büyük harfi kabul etmediği için', 'Token içinde daha az yer kaplasın diye', 'E-posta doğrulaması bunu zorunlu kıldığı için'], a: 0, e: '"Ayse@ders.com" ile "ayse@ders.com" iki ayrı hesap olmamalı.' },
  { w: 14, t: 'Kayıt ucunu yazalım', k: 's7', q: 'Kayıt başarılı olduğunda API hangi kodu döndürür?', o: ['201', '200', '204', '202'], a: 0, e: 'Yeni kaynak oluştu; cevapta şifre, salt ve hash dönmez.' },
  { w: 14, t: 'Kayıt ucunu yazalım', k: 's7', q: 'Kayıt sırasında 500 dönüyorsa ders notuna göre en olası sebep nedir?', o: ['Uye rolü veritabanına eklenmemiş', 'Aynı e-postayla daha önce kayıt olunmuş', 'Şifreler eşleşmiyor', 'Token gönderilmemiş'], a: 0, e: 'Kayıtlı e-posta 409, hatalı form 400 döner.' },
  { w: 14, t: 'Giriş ve token', k: 's8', q: 'Başarısız girişte neden hep "E-posta veya şifre hatalı" mesajı verilir?', o: ['Kimlerin üye olduğu öğrenilmesin', 'Tek mesaj daha az kod gerektirir', 'Şifre hash\'i karşılaştırılamaz', 'Token üretimi başarısız olur'], a: 0, e: '"Bu e-posta kayıtlı değil" demek kullanıcı sayımına (enumeration) kapı açar.' },
  { w: 14, t: 'Giriş ve token', k: 's8', q: 'Tokenın son kullanma zamanını tutan claim hangisidir?', o: ['exp', 'iat', 'aud', 'iss'], a: 0, e: 'iat üretilme zamanıdır. Süre dolunca API 401 döner, uygulama girişe yönlendirmelidir.' },
  { w: 14, t: '"Ben kimim?" ucu', k: 's9', q: 'Cihazdaki depoda token bulunması oturumun geçerli olduğunu kanıtlar mı?', o: ['Hayır; me ucuna sorup 200 almak gerekir', 'Evet; token varsa oturum açıktır', 'Evet; token cihazda şifreli saklandığı için', 'Hayır; token her açılışta yenilenir'], a: 0, e: 'Tokenın süresi dolmuş olabilir; 401 gelirse depo temizlenir.' },
  { w: 14, t: 'Adres meselesi', k: 's12', q: 'API\'nin emülatör ve telefondan erişilebilmesi için launchSettings\'te hangi adres yazılır?', o: ['http://0.0.0.0:5000', 'http://localhost:5000', 'http://127.0.0.1:5000', 'http://10.0.2.2:5000'], a: 0, e: 'localhost yalnızca kendi bilgisayarından gelen istekleri dinler.' },
  { w: 14, t: 'Adres meselesi', k: 's12', q: 'Gerçek bir telefondan bilgisayardaki API\'ye bağlanırken hangi adres kullanılır?', o: ['Bilgisayarın ağdaki yerel IP\'si', 'Emülatörle aynı adres: 10.0.2.2', 'localhost ya da 127.0.0.1', 'API\'nin dinlediği 0.0.0.0 adresi'], a: 0, e: '192.168.x.x biçimindedir; Windows\'ta ipconfig ile IPv4 adresi öğrenilir.' },
  { w: 14, t: 'Flutter projesi', k: 's11', q: 'AndroidManifest\'teki usesCleartextTraffic="true" ayarı için hangisi doğrudur?', o: ['Düz HTTP\'ye izin verir; yalnızca ders içindir', 'İsteklerde HTTPS kullanımını zorunlu hâle getirir', 'Uygulamaya internet izni verir', 'Tokenı cihazda şifreli saklar'], a: 0, e: 'Yayına çıkan uygulamada bulunmaz; şifreler ağda açık gider.' },
  { w: 14, t: 'Tokenı saklamak', k: 's16', q: 'Token cihazda nerede saklanmalıdır?', o: ['flutter_secure_storage', 'shared_preferences', 'Uygulama klasöründe bir metin dosyası', 'Global bir değişken'], a: 0, e: 'Android\'de Keystore, iOS\'ta Keychain kullanır; shared_preferences düz metindir.' },
  { w: 14, t: 'Tokenı saklamak', k: 's16', q: 'Kullanıcının çıkış yapması ne demektir?', o: ['Tokenı güvenli depodan silmek', 'Giriş ekranına geri dönmek', 'Uygulamayı kapatmak', 'Sunucudaki oturumu kapatmak'], a: 0, e: 'Sadece giriş ekranına dönmek çıkış değildir; token diskte durur.' },
  { w: 14, t: 'Tokenı saklamak', k: 's16', q: 'flutter_secure_storage Android\'de en az hangi minSdk değerini ister?', o: ['23', '21', '19', '26'], a: 0, e: 'Hata mesajı: minSdkVersion 21 cannot be smaller than version 23.' },
  { w: 14, t: 'ApiIstemci', k: 's15', q: 'ApiIstemci\'de durum kodu neden jsonDecode\'dan önce kontrol edilir?', o: ['Hata sayfası JSON sanılıp FormatException alınmasın', 'Başarılı cevaplarda gövde hiç gelmediği için', 'Token başlığa ancak ondan sonra eklenebildiği için', 'İsteğin iki kez gönderilmesini önlemek için'], a: 0, e: 'Önce durum koduna bak, sonra gövdeyi çöz.' },
  { w: 14, t: 'Kayıt ekranı', k: 's17', q: 'İstek sürerken düğmenin onPressed değerini null yapmak ne sağlar?', o: ['Kaydın iki kez gönderilmesini engeller', 'Düğmeyi ekrandan kaldırıp yerine yazı koyar', 'Formdaki alanları temizler', 'Kullanıcıya hata mesajı gösterir'], a: 0, e: 'onPressed null olan düğme soluklaşır ve basılamaz.' },
  { w: 14, t: 'Kayıt ekranı', k: 's17', q: '400 cevabındaki errors nesnesi ekranda nasıl gösterilmelidir?', o: ['Her mesaj ilgili alanın altında', 'Tek bir SnackBar içinde topluca', 'Yalnızca ilk hata, uyarı kutusunda', 'Hiç gösterilmeden konsola yazılarak'], a: 0, e: 'errors hangi alanın hatalı olduğunu zaten söyler.' },
  { w: 14, t: 'Giriş ekranı', k: 's18', q: 'Girişten ana ekrana geçerken neden push yerine pushReplacement kullanılır?', o: ['Geri tuşu giriş ekranına dönmesin', 'Ana ekran daha hızlı açılsın', 'Token otomatik olarak kaydedilsin', 'Form alanları sıfırlansın'], a: 0, e: 'push üstüne koyar, pushReplacement değiştirir.' },
  { w: 14, t: 'Açılış, ana ekran, çıkış', k: 's19', q: 'Açılış ekranındaki istek neden build yerine initState içinde başlatılır?', o: ['build her çizimde tekrar çalışır', 'initState istekleri şifreler', 'build içinde await kullanılamaz', 'initState tokenı otomatik okur'], a: 0, e: 'İstek bir kez başlatılmalıdır.' },
  // ---------- MOBİL UYGULAMA 5. HAFTA (w: 15) ----------
  { w: 15, t: 'Bu hafta ne yapıyoruz?', k: 's1', q: 'Dil modeliyle geliştirirken modelden nasıl bir iş parçası istenmelidir?', o: ['Tek denemede doğrulanacak kadar küçük', 'Uygulamanın tamamı tek seferde, tek istemle', 'Önce en heyecanlı ekran', 'Mümkün olan en uzun dosya'], a: 0, e: 'Haftanın tek cümlelik özeti budur.' },
  { w: 15, t: 'Tarif etmek', k: 's2', q: 'Ürün tanımındaki beş sorudan en çok atlanan ve en çok işe yarayan hangisidir?', o: ['Ne olmayacak?', 'Kim kullanıyor?', 'Ne görüyor?', 'Ne zaman bitti?'], a: 0, e: 'Kapsam dışını yazmak modelin fazladan iş yapmasını keser.' },
  { w: 15, t: 'Yürüyen iskelet', k: 's3', q: 'Yürüyen iskelet ne demektir?', o: ['Zincirin en basit hâliyle uçtan uca çalışması', 'Önce en çok kullanılan ekranın eksiksiz bitirilmesi', 'Yalnızca veritabanı katmanının kurulması', 'Testlerin projenin sonuna bırakılması'], a: 0, e: 'Her halka var ve yürüyor; sonra halkalar tek tek gerçek hâliyle değiştirilir.' },
  { w: 15, t: 'Yürüyen iskelet', k: 's3', q: 'Master Şef\'in inşa sırasında ilk adım hangisidir?', o: ['Boş ekran ve tek düğme', 'Gerçek görme modeli', 'Sahte JSON\'dan üç kart', 'API\'den sabit cevap'], a: 0, e: 'Sıra heyecana göre değil bağımlılığa göre kurulur.' },
  { w: 15, t: 'İstemin anatomisi', k: 's4', q: 'İyi bir kod isteminin beş parçası hangisinde doğru verilmiştir?', o: ['Bağlam, hedef, sınırlar, kapsam dışı, bitti göstergesi', 'Rol, görev, örnekler, çıktı biçimi, uzunluk sınırı', 'Bağlam, mevcut kod, testler, yorumlar ve hata mesajları', 'Hedef, model adı, sürüm, fiyat, süre'], a: 0, e: 'Bağlam olmazsa model başka birinin projesine uyan kod yazar.' },
  { w: 15, t: 'İstemin anatomisi', k: 's4', q: 'İsteme "arayüz metinleri Türkçe olsun" yazılmazsa ne olabilir?', o: ['Ekranda İngilizce metinler çıkabilir', 'Kod derlenmez ve Türkçe karakter hatası verir', 'Değişken adları Türkçe olur', 'Paketler kurulmaz'], a: 0, e: 'Kod istemleri İngilizce yazılabilir ama kullanıcıya görünen metinler açıkça istenmelidir.' },
  { w: 15, t: 'İzinler', k: 's6', q: 'İzin konusunda işletim sistemi kimin temsilcisidir?', o: ['Kullanıcının', 'Uygulamanın', 'Geliştiricinin', 'Mağazanın'], a: 0, e: 'Uygulama bir misafirdir; cevabı kullanıcı verir, kararı işletim sistemi uygular.' },
  { w: 15, t: 'İzinler', k: 's6', q: 'image_picker ile sistem kamerasından fotoğraf alırken CAMERA izni gerekir mi?', o: ['Çoğu durumda gerekmez', 'Her zaman gerekir', 'Yalnızca iOS\'ta gerekir', 'Yalnızca Android\'de gerekir'], a: 0, e: 'Kamerayı sistem tutar; izin, uygulamanın kamerayı kendi içinde açması (camera paketi) için gerekir.' },
  { w: 15, t: 'Android ve iOS', k: 's7', q: 'iOS\'ta Info.plist\'e kamera için gerekçe cümlesi yazılmazsa ne olur?', o: ['Kamera açılırken uygulama çöker', 'İzin kendiliğinden verilir', 'Kamera yerine otomatik olarak galeri açılır', 'Hiçbir şey değişmez'], a: 0, e: 'NSCameraUsageDescription olmadan erişim istenince uygulama çöker.' },
  { w: 15, t: 'Android ve iOS', k: 's7', q: 'Android\'de INTERNET izni nasıl verilir?', o: ['Kurulumda, sorulmadan', 'Çalışırken, sorularak', 'Ayarlardan elle', 'İlk istekte otomatik'], a: 0, e: 'Sıradan izinler kurulumda verilir; CAMERA gibi tehlikeli izinler çalışma anında sorulur.' },
  { w: 15, t: 'Görsel maliyeti', k: 's8', q: 'Görme modeli bir fotoğrafın maliyetini nasıl hesaplar?', o: ['32×32\'lik yama sayısına göre', 'Dosyanın megabayt boyutuna göre', 'Fotoğraftaki renk sayısına göre', 'Fotoğrafın çekilme süresine göre'], a: 0, e: 'Yama sayısı = ⌈genişlik÷32⌉ × ⌈yükseklik÷32⌉.' },
  { w: 15, t: 'Görsel maliyeti', k: 's8', q: 'Fotoğraf neden sunucuda değil telefonda küçültülmelidir?', o: ['Yükleme süresi ve mobil veri kazanılır', 'Sunucu görüntü küçültemez', 'Model büyük fotoğrafları okurken hata verir', 'Telefonun izni gerektirmez'], a: 0, e: 'Sunucuda küçültmek yükleme süresini kurtarmaz.' },
  { w: 15, t: 'Sözleşme', k: 's9', q: 'Arayüz ve API birbirini beklemesin diye önce ne sabitlenir?', o: ['Cevabın JSON şeması', 'Uygulamanın ikonu', 'Veritabanı şifresi', 'Ekran renkleri'], a: 0, e: 'Sözleşme yazılıysa iki uç aynı kâğıda bakar.' },
  { w: 15, t: 'Sözleşme', k: 's9', q: 'Strict yapılandırılmış çıktının "ters görünen" kuralı nedir?', o: ['Bütün alanlar zorunludur', 'Alanlar boş gelebilir', 'Yalnızca metin alanı olur', 'En fazla üç alan olur'], a: 0, e: 'Bu yüzden yemek değilse sefler boş dizi, tahminiYemek boş metin döner.' },
  { w: 15, t: 'Anahtar nerede durur?', k: 's10', q: 'API anahtarı Flutter uygulamasının içine yazılırsa ne olur?', o: ['APK\'yı açan herkes anahtarı bulabilir', 'Anahtar derlenince güvende kalır', 'Şifrelenirse kimse çözemez', 'Mağaza yükleme sırasında anahtarı otomatik gizler'], a: 0, e: 'İstemciye koyduğun her sır, sır değildir; şifreyi çözen kod da aynı dosyadadır.' },
  { w: 15, t: 'Vekil mimari', k: 's10', q: 'Vekil (proxy) mimaride API anahtarını kim taşır?', o: ['Senin API\'n', 'Telefon', 'Kullanıcı', 'Mağaza'], a: 0, e: 'Telefon modele değil senin API\'ne gider; model değişince uygulama güncellenmez.' },
  { w: 15, t: 'Vekil mimari', k: 's10', q: '.NET API\'de model anahtarı nerede saklanmalıdır?', o: ['dotnet user-secrets', 'appsettings.json', 'Program.cs', 'Veritabanı tablosu'], a: 0, e: 'appsettings.json git\'e girer.' },
  { w: 15, t: 'Üç karakter', k: 's11', q: 'Üç şef yorumu neden tek istekte alınır?', o: ['Fotoğraf maliyeti bir kez sayılsın', 'Karakterlerin yorumları birbirine karışmasın', 'Kartlar tek tek dolabilsin', 'Model buna zorunlu tutuyor'], a: 0, e: 'Girdinin neredeyse tamamı fotoğraftır; üç istek aynı fotoğrafı üç kez sayar.' },
  { w: 15, t: 'Üç karakter', k: 's11', q: 'Sistem istemindeki "fotoğrafta görmediğin şey hakkında yorum yapma" kuralı neyi önler?', o: ['Tuz ve kıvam hakkında uydurma yorumu', 'Üç şefin de birbirine yakın puan vermesini', 'Cevabın şemaya uymamasını', 'Yorumların İngilizce gelmesini'], a: 0, e: 'Model tadı bilemez; bilmediğini bilmemek dil modellerinin bilinen kusurudur.' },
  { w: 15, t: 'Bekleyen kullanıcı', k: 's12', q: 'İstek sürerken düğmeyi kilitlemek neden önemlidir?', o: ['Fotoğraf ikinci kez gönderilmesin', 'Yükleniyor ekranı daha düzgün görünsün', 'Token yenilenebilsin', 'İzin tekrar istenmesin'], a: 0, e: 'Bu bir incelik değil, maliyet kalemidir.' },
  { w: 15, t: 'İçeriğin sorumluluğu', k: 's13', q: 'Şef karakterlerinde neden gerçek kişi adı kullanılmaz?', o: ['Söylemediği sözler o kişiye atfedilir', 'Model gerçek kişileri tanıyamadığı için', 'Gerçek adlar şemaya sığmaz', 'Adlar çeviride bozulur'], a: 0, e: '"Model yazdı" bir savunma değildir; karakterler kurgusal arketip olarak kurulur.' },
  { w: 15, t: 'Hatayı geri taşı', k: 's14', q: 'Modelden hata düzeltmesi isterken en etkili ne verilir?', o: ['Hatanın tam metni ve gerçek veri', '"Çalışmadı, düzeltir misin?" diye sormak', 'Yalnızca hatalı dosyanın adı', 'Hatanın kısa bir özeti'], a: 0, e: 'Dosya, satır, tip ve veri varsa model tahmin yürütmez.' },
  { w: 15, t: 'Modelin yanılacağı yerler', k: 's15', q: 'Model emülatör için API adresine localhost yazdıysa doğrusu nedir?', o: ['10.0.2.2 ya da LAN IP', 'localhost kalmalıdır', '127.0.0.1 yazılmalıdır', '0.0.0.0 yazılmalıdır'], a: 0, e: 'Emülatörde localhost telefonun kendisidir.' },
  { w: 15, t: 'Ne zaman bırakmalı?', k: 's17', q: 'Bir sorun modelle üç turda çözülmediyse ne yapılmalıdır?', o: ['Durup belgeye bakmak ve sorunu küçültmek', 'Aynı istemi bir kez daha göndermek', 'Daha uzun ve ayrıntılı bir istem yazıp tekrar sormak', 'Başka bir dil modelini denemek'], a: 0, e: 'Üç turdan sonra sorun kodda değil, senin anlayışındadır.' },
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
