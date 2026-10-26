// Soru havuzu denetimi: node check-questions.js [--detay]
// Doğru şıkkın uzunluğu ya da kesin kelimeler ("her zaman", "hiç"...) cevabı ele vermesin diye.
// build.js de bunu çalıştırır; kurallar bozulursa derleme durur.
const fs = require('fs');
const path = require('path');

function denetle(dosya, detay) {
  const src = fs.readFileSync(dosya, 'utf8');
  const Q = new Function(src.slice(src.indexOf('const Q = (function(){'), src.indexOf('const S = (function(){')) + '; return Q;')();
  const kesin = /her zaman|hiçbir|hiç |tamamen|yalnızca|sadece|asla|hep |bütün|açıkça/i;
  const sorunlar = [];
  let enUzun = 0, enKisa = 0, kesinDogru = 0, kesinYanlis = 0;
  for (const q of Q.QUESTIONS) {
    const etiket = `${q.w}. hafta: ${q.q.slice(0, 50)}`;
    if (q.o.length !== 4 || new Set(q.o).size !== 4 || !(q.a >= 0 && q.a <= 3) || !q.q || !q.e || !q.k || !q.t) { sorunlar.push('Eksik/bozuk soru · ' + etiket); continue; }
    const L = q.o.map(x => x.length), c = L[q.a], diger = L.filter((_, i) => i !== q.a);
    const mx = Math.max(...diger), mn = Math.min(...diger);
    if (c > mx) enUzun++;
    if (c < mn) enKisa++;
    if (c > mx * 1.25 && c - mx > 4) sorunlar.push(`Doğru şık belirgin uzun (${c} > ${mx}) · ${etiket}`);
    q.o.forEach((o, i) => { if (kesin.test(o)) i === q.a ? kesinDogru++ : kesinYanlis++; });
  }
  const n = Q.QUESTIONS.length;
  const oran = x => Math.round(x / n * 100);
  if (enUzun / n > 0.3) sorunlar.push(`Doğru şık soruların %${oran(enUzun)}'inde en uzun (sınır %30)`);
  if (enKisa / n > 0.3) sorunlar.push(`Doğru şık soruların %${oran(enKisa)}'inde en kısa (sınır %30)`);
  const kd = kesinDogru / n, ky = kesinYanlis / (n * 3);
  if (ky > 0.04 && ky > kd * 2.5) sorunlar.push(`Kesin kelimeler yanlış şıklarda çok daha sık (%${(ky * 100).toFixed(1)} / %${(kd * 100).toFixed(1)})`);
  console.log(`Soru denetimi: ${n} soru · doğru en uzun %${oran(enUzun)} · doğru en kısa %${oran(enKisa)} · sorun ${sorunlar.length}`);
  if (detay || sorunlar.length) sorunlar.forEach(s => console.log('  - ' + s));
  return sorunlar.length === 0;
}

module.exports = denetle;
if (require.main === module) {
  process.exitCode = denetle(path.join(__dirname, 'sd-bundle.js'), process.argv.includes('--detay')) ? 0 : 1;
}
