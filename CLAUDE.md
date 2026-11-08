# Portfolyo — proje brief'i

Akın Doğan'ın kişisel portfolyo sitesi. Amaç: iş, proje ve outsource teklifleri almak.
Statik site (Astro), GitHub Pages'te yayınlanır, TR/EN iki dilli.

## Konumlandırma

- Ana mesaj: **"Sahadan karara: üretim verisinin yolculuğunu uçtan uca tasarlıyorum."**
- Endüstriyel yazılım mühendisi; OT (PLC/SCADA, saha) ile IT (.NET, veri, entegrasyon) arasında çalışır.
- Site **deneyim/kronoloji göstermez.** Firma adı, tarih, unvan yok. Odak: ürünler/sistemler,
  teknolojiler, yaklaşımlar, mühendislik kararları. Detaylı CV yalnızca talep üzerine e-postayla verilir.

## Kesin kurallar

- **CV, CV verisi veya özel belge bu repoya girmez** (repo public). `.gitignore` buna göre ayarlı.
- Müşteri/işveren adı, iç kod, tablo adı, ekran görüntüsü, sahaya özel detay yazılmaz.
  Problem ve yaklaşım jenerik anlatılır.
- İçerikte doğrulanmamış iddia, uydurma metrik veya sonuç yazılmaz. Sayı yoksa sayı koyma.
- Her içerik TR ve EN olarak aynı dosya adıyla bulunur.
- Telefon numarası ve adres yayınlanmaz.

## Mimari model (sitenin ana fikri)

Veri yolculuğu 4 katman: `field` (Saha) → `acquisition` (Toplama) → `integration` (Entegrasyon) → `decision` (Karar).
- Katman listesi: `src/lib/layers.ts`. Adları/açıklamaları: `src/i18n/*.json` → `layers`.
- Her katmanın sabit bir rengi var (`--layer-*` token'ları); anlamı her iki temada aynı.
- Diyagram gösterim dili sabit: ⬡ cihaz · ▭ servis · ◯ veri deposu · ▱ kuyruk · ▣ arayüz · → akış.
- İki okuma seviyesi: önce herkesin anlayacağı sade cümle, altında teknik karşılık.
- Mühendislik kararları ADR biçiminde: karar · neden · alternatif · bedeli.

## Teknoloji

- Astro 7 (statik çıktı), TypeScript strict, düz CSS (token'lar `src/styles/global.css`).
- React yalnızca etkileşimli "island"lar için (`client:*`): şu an iletişim formu; ileride Lab araçları.
- Fontlar Fontsource ile self-host (IBM Plex Sans / Mono).
- Tema: açık = teknik çizim (blueprint), koyu = kontrol odası (HMI). `light-dark()` ile tek token seti.

## Dosya yapısı

```
src/
  content.config.ts          içerik şemaları (zod) — alan eksikse build hata verir
  content/solutions/<lang>/<slug>.md
  content/approaches/<lang>/<id>.md
  i18n/tr.json, en.json      arayüz ve sayfa metinleri (en.json referans şema)
  data/site.json             isim, linkler, e-posta, form endpoint'i
  data/stack.json            teknoloji id → ad, grup
  lib/                       i18n, içerik yardımcıları, katmanlar
  components/  layouts/  pages/[lang]/...
```

## Çözüm (solution) dosyası alanları

`title`, `summary`, `category` (monitoring | automation | mes | integration | robotics | personal),
`layers[]`, `stack[]` (stack.json id'leri), `metrics[]` {value,label}, `role`, `status` (production | in-progress),
`flow[]` {type, label, layer}, `decisions[]` {decision, why, alternative?, cost?}, `featured`, `order`.
Gövde: `## Problem`, `## Yaklaşım`, gerekirse `## Sonuç` / `## Durum`.

## Komutlar

- `npm run dev` — geliştirme sunucusu
- `npm run build` — `astro check` + statik build (`dist/`)
- `npm run preview` — build çıktısını yerelde sun

## Çalışma tercihleri

- Minimum diff; büyük dosyaları baştan yazma.
- Doğrulamayı build/check ve DOM/metin ölçümleriyle yap; istenmedikçe ekran görüntüsü alma.
- Linkler her zaman sonda `/` ile (`trailingSlash: 'always'`), `url(lang, path)` yardımcısını kullan.
