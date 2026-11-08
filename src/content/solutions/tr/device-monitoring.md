---
title: Endüstriyel Motor İzleme Platformu
summary: 200+ endüstriyel cihazdan saniyenin altında aralıklarla veri toplayan, kestirimci bakım ve enerji verimliliği için çok tesisli izleme platformu.
category: monitoring
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, windows-services, modbus, tcpip, react, typescript]
metrics:
  - { value: "200+", label: "eş zamanlı cihaz" }
  - { value: "< 1 sn", label: "yerel ağda okuma aralığı" }
  - { value: "Çok tesisli", label: "anomali izleme" }
role: Mimari, geliştirme ve 2 kişilik ekip liderliği
status: production
featured: true
order: 2
flow:
  - { type: device, label: "Endüstriyel motorlar ve ölçüm cihazları (200+)", layer: field }
  - { type: service, label: "Modbus iletişim servisi (Windows Service)", layer: acquisition }
  - { type: store, label: "Telemetri veritabanı", layer: integration }
  - { type: ui, label: "Anomali ve verimlilik dashboard'ları (React)", layer: decision }
decisions:
  - decision: Her cihaz kendi iş parçacığında okunur (thread-per-device).
    why: Yanıt vermeyen ya da yavaş bir cihaz, diğer cihazların okuma döngüsünü geciktirmez; her cihazın zaman aşımı ve yeniden bağlanma davranışı ayrı yönetilir.
    alternative: Tek döngüde sıralı okuma. Basit ama bir cihazın zaman aşımı tüm döngüyü uzatır.
    cost: Cihaz sayısı arttıkça iş parçacığı ve bellek kullanımı artar; kaynak tüketimi izlenmelidir.
  - decision: Veri toplama, kullanıcı arayüzünden bağımsız bir Windows Service olarak çalışır.
    why: Toplama 7/24 sürer; oturum kapanması ya da arayüz hatası veri kaybına yol açmaz, servis hata sonrası kendiliğinden yeniden başlar.
---

## Problem

Kestirimci bakım ve enerji verimliliği analizi için, farklı tesislerdeki çok sayıda endüstriyel motordan sürekli ve güvenilir ölçüm verisine ihtiyaç vardı.

## Yaklaşım

- Modbus üzerinden çok iş parçacıklı bir iletişim altyapısı: her cihaz için bağımsız okuma döngüsü.
- Ölçümleri toplayıp veritabanına yazan gerçek zamanlı telemetri veri hattı.
- React + TypeScript ile, birden fazla tesisi tek ekranda izlemeyi sağlayan anomali dashboard'ları.
- 2 kişilik ekipte sprint planlama, görev dağılımı ve kod incelemeleri.

## Sonuç

200'ü aşkın cihazla eş zamanlı haberleşen, yerel ağda saniyenin altında okuma yapan ve analiz ekiplerine çok tesisli görünürlük sağlayan bir platform.
