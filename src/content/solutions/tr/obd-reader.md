---
title: OBD-II Okuyucu ve Araç Dashboard'u
summary: OBD-II adaptörü üzerinden araçtan veri okuyan, kullanıcının kendi dashboard'unu kurabildiği; hesap ve bulut gerektirmeyen mobil uygulama.
category: personal
layers: [field, acquisition, decision]
status: planned
order: 25
flow:
  - { type: device, label: "Araç (OBD-II)", layer: field }
  - { type: device, label: "OBD-II adaptörü", layer: acquisition }
  - { type: service, label: "Okuma ve veri çözümleme", layer: acquisition }
  - { type: ui, label: "Özel dashboard (hedef: CarPlay / Android Auto)", layer: decision }
decisions:
  - decision: Uygulama yalnızca okur; araca hiçbir komut yazmaz.
    why: Araç sistemlerine müdahale riski olmadan her OBD destekli araçta kullanılabilir.
  - decision: Hesap ve bulut yok; uygulama satın alınır ve tamamen yerel çalışır.
    why: Çevrimdışı çalışır ve araç verisi cihazdan çıkmaz.
---

## Fikir

OBD destekli tüm araçlarda çalışan, aracın desteklediği verileri okuyup modern bir arayüzde gösteren ücretli bir mobil uygulama. Kullanıcı görmek istediği verilerle kendi dashboard'unu hazırlar.

## Yaklaşım

- iOS ve Android.
- Hazırlanan dashboard'un mümkünse CarPlay ve Android Auto'da da gösterilmesi.
- Küresel pazar hedefi.

## Durum

Planlama aşamasında.
