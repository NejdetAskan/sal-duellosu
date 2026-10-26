// Tek dosyalık sürüm üretir: node build.js  →  dist/Sal-Duellosu.html
// Yerel <script src> ve <link rel="stylesheet"> dosyaları sayfanın içine gömülür;
// çıkan dosya sunucusuz, çift tıklayarak açılır ve öğrencilere gönderilebilir.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const read = f => fs.readFileSync(path.join(ROOT, f.split('?')[0]), 'utf8'); // ?v=… önbellek kırıcıyı at
const isLocal = src => !/^(https?:)?\/\//.test(src);
// support.js sayfa kaynağında ilk "<x-dc" ve son "</x-dc>" metnini arar; gömülü
// kodun içindeki aynı metinler şablonla karışmasın diye "<" kaçışlanır (\x3c = "<").
const safe = js => js.replace(/<\/script/gi, '<\\/script').replace(/<(\/?)x-dc/g, '\\x3c$1x-dc');

let html = read('index.html');

// support.js açılışta sayfanın ham kaynağını fetch(location.href) ile okur (tarayıcının
// <tbody> içinde bozduğu şablon etiketleri için). file:// altında fetch çalışmadığından
// ham kaynağı dosyaya gömüp bu isteği oradan yanıtlıyoruz. "<" kaçışlanır ki gömülü
// metin sayfa ayrıştırmasını etkilemesin.
const rawSrc = JSON.stringify(html).replace(/</g, '\\u003c');
const shim = `<script>/* file:// için ham kaynak */
(function () {
  var SRC = ${rawSrc}, f = window.fetch;
  window.fetch = function (u) {
    if (String(u && u.url || u) === location.href) return Promise.resolve(new Response(SRC, { status: 200, headers: { 'Content-Type': 'text/html' } }));
    return f.apply(this, arguments);
  };
})();
</script>
`;

html = html.replace(/<script src="([^"]+)"><\/script>/g, (tag, src) =>
  isLocal(src) ? `<script>/* ${src} */\n${safe(read(src))}\n</script>` : tag);

html = html.replace(/<script>\/\* \.\/support\.js[^*]*\*\//, m => shim + m);

html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (tag, href) =>
  isLocal(href) ? `<style>/* ${href} */\n${read(href)}\n</style>` : tag);

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
const out = path.join(ROOT, 'dist', 'Sal-Duellosu.html');
fs.writeFileSync(out, html);
console.log(`Yazıldı: ${out} (${Math.round(html.length / 1024)} KB)`);
