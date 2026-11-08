---
title: Saha Planlama ve Trafik Simülasyonu
summary: Robotlu bir depo sahası için taslak haritadan robot sayısı tahminine ve simülasyon testlerine uzanan, dijital ikiz tabanlı planlama aracı.
category: robotics
layers: [decision]
stack: [csharp, dotnet]
status: in-progress
order: 5
flow:
  - { type: ui, label: "Taslak harita editörü (istasyon, raf, duvar, şarj, yol)", layer: decision }
  - { type: service, label: "Harita derleyici", layer: decision }
  - { type: service, label: "Robot sayısı tahmini", layer: decision }
  - { type: service, label: "Simülasyon: sanal robotlar + trafik yöneticisi", layer: decision }
  - { type: ui, label: "Trafik ve kapasite raporu", layer: decision }
decisions:
  - decision: Fiziksel robotların dijital ikizleri (sanal robotlar) gerçek trafik yönetim yazılımıyla konuşur.
    why: Trafik yöneticisi sahaya çıkmadan, gerçek davranışıyla test edilir; trafik yoğunluğu ölçülüp raporlanır.
  - decision: Planlama aracı trafik yöneticisinden ayrı bir uygulamadır ve onu bağımlılık olarak değil, test edilen modül olarak kullanır.
    why: Aynı çekirdek modül hem sahada hem simülasyonda çalışır; planlama aracındaki değişiklikler üretim koduna sızmaz.
---

## Problem

Saha haritaları yerleşim planından elle çiziliyor. Hangi haritanın, kaç robotun ve hangi trafik ayarlarının o saha için en uygun olduğu ancak sahada deneyerek anlaşılıyordu.

## Yaklaşım

1. **Taslak harita editörü:** istasyonlar, raflar/paletler, duvarlar, şarj noktaları ve yollar araç kutusundan yerleştirilir.
2. **Harita derleyici:** taslak, haritacıya gönderilebilir ya da doğrudan içe aktarılabilir bir haritaya derlenir.
3. **Robot sayısı tahmini:** iş yüküne göre gereken filo büyüklüğü hesaplanır.
4. **Simülasyon:** taslak ve nihai haritalar üzerinde sanal robotlarla trafik testleri yapılır.

## Durum

Geliştirme aşamasında.
