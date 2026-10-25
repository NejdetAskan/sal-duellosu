# Sal Düellosu

Ders notlarından soru-cevap + sal düellosu oyunu (1'e 1 / 2'ye 2, botlu ya da arkadaşlarla).

## Çalıştırma

**En kolayı:** `dist/Sal-Duellosu.html` dosyasına çift tıkla. Sunucu gerekmez; dosyayı öğrencilere de gönderebilirsin.

Geliştirme için:

```bash
node server.js
```

Sonra tarayıcıda http://localhost:8080 adresini aç. Kodda değişiklik yaptıktan sonra tek dosyayı yeniden üretmek için:

```bash
node build.js
```

## Nasıl oynanır

- **Tek başına:** Adını yaz → *Oda oluştur* → boş koltuğa *Bot ekle* → *Maçı başlat*.
- **Arkadaşla:** Oda sahibi oda kodunu paylaşır, arkadaş kendi bilgisayarında oyunu açıp kodu *Katıl* alanına yazar.
- **Atış:** Sıra sendeyken ekrana bas, geri çek, bırak. Noktalı çizgi rüzgârı da hesaba katar. 1–5 tuşları silah değiştirir.
- **Ses:** Üst bardaki *Ses* düğmesiyle açılıp kapanır.

## İnternet

- Botlarla oynamak internetsiz çalışır (kütüphaneler `vendor/` klasöründe). İnternet yoksa yazı tipi sistem yazı tipine döner.
- Arkadaşla oynamak internet ister (PeerJS eşleştirme sunucusu).
- **Sınıf tablosu:** Maç sonuçları varsayılan olarak yalnızca bu cihazda tutulur. Sınıf tablosu ekranında *Ortak tabloya gönder* açılırsa sonuçlar (oyuncu adlarıyla) herkese açık ntfy.sh kanalına gönderilir.

## Dosyalar

- `index.html` — arayüz ve oyun mantığı (oda, soru, atış sırası, dükkan, rapor, sınıf tablosu)
- `sd-bundle.js` — soru havuzu, canvas savaş sahnesi, ses efektleri, ağ katmanı
- `support.js` — şablon çalışma zamanı
- `styles.css` — tasarım sistemi renkleri/yazı tipi
- `vendor/` — React 18.3.1, ReactDOM 18.3.1, PeerJS 1.5.4
- `server.js` — basit statik sunucu
- `build.js` — tek dosyalık sürümü `dist/` içine üretir
