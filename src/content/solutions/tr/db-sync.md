---
title: Çoklu Veritabanı Senkronizasyon Platformu
summary: Oracle ve PostgreSQL arasında, trigger tabanlı değişiklik takibiyle neredeyse gerçek zamanlı ve hata toleranslı veri senkronizasyonu.
category: integration
layers: [integration]
stack: [csharp, dotnet, oracle, postgresql, docker, linux]
metrics:
  - { value: "100–200 ms", label: "senkronizasyon döngüsü" }
  - { value: "Full + incremental", label: "replikasyon modu" }
  - { value: "Thread-per-entity", label: "paralel işlem hattı" }
role: Mimari ve geliştirme
status: production
featured: true
order: 1
flow:
  - { type: store, label: "Kaynak DB (Oracle)", layer: integration }
  - { type: service, label: "Trigger → audit log tabloları", layer: integration }
  - { type: service, label: "Senkronizasyon servisi (entity başına iş parçacığı)", layer: integration }
  - { type: queue, label: "Error queue (yeniden işleme)", layer: integration }
  - { type: store, label: "Hedef DB (PostgreSQL)", layer: integration }
decisions:
  - decision: Değişiklikler trigger'larla audit log tablolarına yazılır, senkronizasyon bu log'u okur.
    why: Değişiklik, kaynağında ve işlemle aynı anda yakalanır. Kaynak sistemi kullanan uygulamalarda değişiklik gerekmez.
    alternative: Zaman damgası (updated_at) ile periyodik sorgulama. Silinen kayıtları ve aynı anda gelen değişiklikleri kaçırabilir.
    cost: Her yazma işlemine küçük bir ek insert maliyeti biner; audit tablolarının düzenli temizlenmesi gerekir.
  - decision: Her veri varlığı (entity) kendi iş parçacığında işlenir.
    why: Bir tablodaki yavaşlık ya da hata diğer varlıkların senkronizasyonunu bekletmez; sıralama varlık içinde korunur.
    cost: İş parçacığı ve bağlantı sayısı varlık sayısıyla birlikte artar, bağlantı havuzu buna göre planlanmalıdır.
  - decision: Retry, transaction rollback ve error queue birlikte kullanılır.
    why: Geçici hatalar otomatik aşılır; kalıcı hatalı kayıtlar hattı durdurmadan kuyruğa alınır ve sonradan yeniden işlenir.
    cost: Error queue izlenmezse sorunlar fark edilmeden birikebilir; kuyruk boyutu takip edilmelidir.
---

## Problem

Farklı sistemler aynı iş verisini (fiyat, stok, müşteri, sipariş) kendi veritabanlarında tutuyordu. Gece çalışan toplu aktarım işleri hem gecikmeye hem de hata durumunda tutarsızlığa yol açıyordu.

## Yaklaşım

- İlk kurulum ve gerektiğinde tam eşitleme için **full snapshot**, günlük çalışmada **incremental** replikasyon.
- Değişiklikler kaynakta audit log'a düşer; servis log'u kısa aralıklarla okuyup hedefe uygular.
- Her uygulama işlemi transaction içinde yapılır; hata durumunda geri alınır ve kayıt error queue'ya alınır.
- Servisler Docker container olarak Linux sunucuda çalışır.

## Sonuç

Sistemler arası veri farkı gece beklemek yerine milisaniyeler mertebesine indi. Hatalı bir kayıt artık tüm aktarımı durdurmuyor.
