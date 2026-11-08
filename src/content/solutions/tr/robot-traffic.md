---
title: Robot Filo Trafik Yönetimi
summary: Depo otomasyonunda mobil robot filosunu, kavşak ve yönleri zamana göre rezerve ederek durmadan ve çakışmadan yöneten genelleştirilmiş trafik yönetimi.
category: robotics
layers: [field, acquisition, decision]
stack: [csharp, dotnet]
status: in-progress
featured: true
order: 3
flow:
  - { type: device, label: "Mobil robot filosu", layer: field }
  - { type: service, label: "Filo haberleşmesi (konum, durum)", layer: acquisition }
  - { type: service, label: "Trafik yöneticisi: rota · hız · zaman rezervasyonu", layer: decision }
  - { type: ui, label: "Kontrolör ekranı", layer: decision }
decisions:
  - decision: Kavşaklar ve yönler zamana göre rezerve edilir; diğer robotlar varış zamanına göre hızını ayarlar.
    why: Robotlar kavşakta durup beklemek yerine akışı bozmadan yavaşlar; filo yukarıdan aşağı bir bütün olarak yönetilir.
    alternative: Kavşak başına kilit (ilk gelen geçer). Basit ama dur-kalk trafiği ve kilitlenme riski doğurur.
    cost: Konum ve varış zamanı tahminlerinin güvenilir olması gerekir; sapmalarda rezervasyonlar yeniden planlanmalıdır.
  - decision: Trafik yöneticisi bağımlılıksız bir çekirdek modüldür; yalnızca robotu mevcut konumdan hedefe taşımakla (rota, hız, rezervasyon) ilgilenir.
    why: İstasyon doluluk gibi saha kuralları dışarıda kalınca modül farklı sahalarda ve simülasyonda aynen test edilebilir.
    cost: İstasyon ve görev durumlarını yönetmek entegrasyon katmanının sorumluluğuna geçer.
  - decision: Harita kenarları tek yön, çift yön ya da rezerve yönlü olabilir; istasyon tipleri koddan değil yapılandırmadan tanımlanır.
    why: Her saha farklıdır; yeni bir istasyon tipi ya da yol kuralı kod değişikliği gerektirmemelidir.
---

## Problem

Farklı görevlere (depalletizing, picking) sahip robot tiplerinin aynı sahada, kavşaklarda çakışmadan ve verimli biçimde hareket etmesi gerekiyor. Her saha yerleşimi farklı olduğu için kurallar sahaya özel kodlanmamalı.

## Yaklaşım

- Filo yukarıdan aşağı izlenir; her robotun atanmış bir başlangıç (home) noktası ve istasyon bazlı durumu vardır (home, dolaşımda, şarjda vb.).
- Genelleştirilmiş trafik kuralları tanımlanır, robotlar bu kurallara göre davranır.
- Kavşak yönetimi istasyon ve durum takibiyle entegre çalışır.

## Durum

Geliştirme aşamasında. Saha planlama ve simülasyon aracıyla birlikte test ediliyor.
