---
title: Doğrulanabilirlik
question: Sahaya çıkmadan nasıl emin oluruz?
order: 5
related: [site-planning, robot-traffic]
patterns:
  - name: Önce simülasyon
    desc: Sahadaki fiziksel sistemin dijital ikizi, gerçek yazılımla konuşur. Kurallar ve kapasite sahadan önce test edilir.
  - name: Test edilebilir sınırlar
    desc: Donanıma dokunan kod ince bir katmanda tutulur; iş mantığı donanım olmadan test edilebilir.
  - name: State machine ile kontrol akışı
    desc: Proses adımları ve geçişleri açıkça tanımlanır; hangi durumda ne olacağı tartışmaya açık kalmaz.
---

Sahada deneme yanılma pahalıdır: hat durur, robot bekler, ekip sahada kalır. Mümkün olan her şeyi sahaya çıkmadan doğrulamak hem zamandan hem güvenden tasarruf sağlar.
