---
title: Performans
question: Yüzlerce cihazla ya da tabloyla aynı anda nasıl konuşulur?
order: 2
related: [device-monitoring, db-sync]
patterns:
  - name: Thread-per-device / thread-per-entity
    desc: Her cihaz ya da veri varlığı için bağımsız bir işlem döngüsü. Paralellik doğal olarak gelir, bir katılımcının gecikmesi diğerlerine yansımaz.
  - name: Artımlı (incremental) işleme
    desc: Her seferinde bütün veriyi değil, yalnızca değişeni işlemek. Gecikmeyi ve yükü veri büyüklüğünden bağımsız hale getirir.
  - name: Asenkron arka plan işleri
    desc: Uzun süren işler kullanıcı akışından ayrılır; arayüz ve toplama döngüleri bloklanmaz.
---

Endüstriyel sistemlerde performans çoğunlukla ham hızdan değil, beklemeden kaynaklanır: yanıt vermeyen bir cihaz, kilitlenen bir tablo, sıralı çalışan bir döngü. Hedefim beklemeleri izole etmek.
