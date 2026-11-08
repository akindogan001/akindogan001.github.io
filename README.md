# Akın Doğan — Portfolyo

Endüstriyel yazılım portfolyosu. Astro ile üretilen statik site, TR/EN, GitHub Pages.

## Çalıştırma

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # tip kontrolü + dist/ çıktısı
```

Node 22.12 veya üzeri gerekir.

## İçerik ekleme

Yeni bir çözüm için iki dosya ekle (aynı dosya adı):

```
src/content/solutions/tr/yeni-sistem.md
src/content/solutions/en/yeni-sistem.md
```

Alanlar için mevcut bir dosyayı örnek al (ör. `db-sync.md`). Anasayfa kartları, katman filtreleri ve
listeler otomatik güncellenir. Eksik ya da hatalı bir alan varsa build hata verir.

Sayfa ve arayüz metinleri: `src/i18n/tr.json` ve `src/i18n/en.json`.
Teknolojiler: `src/data/stack.json`.

## Yayına alma (bir kez)

1. GitHub'da **`akindogan001.github.io`** adında public bir repo oluştur ve bu klasörü push et (`main` dalı).
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Her push'ta `.github/workflows/deploy.yml` siteyi build edip yayınlar: `https://akindogan001.github.io`

Kendi domain'ine geçersen: `astro.config.mjs` içindeki `SITE` değerini, `public/robots.txt` içindeki
sitemap adresini ve `src/data/site.json` → `url` alanını güncelle, `public/CNAME` dosyasına domain'i yaz.

## Doldurulacaklar

`src/data/site.json`:

- `linkedin` — LinkedIn profil adresi
- `email` — iletişim e-postası (boş kalırsa gösterilmez)
- `formEndpoint` — Formspree / Web3Forms form adresi (boş kalırsa form yerine kanallar gösterilir)

## Gizlilik

CV ve özel belgeler bu repoya eklenmez; `.gitignore` CV/özgeçmiş dosyalarını dışarıda tutar.
CV, iletişim formundaki "CV talebi" üzerinden e-postayla paylaşılır.
