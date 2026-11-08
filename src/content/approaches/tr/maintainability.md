---
title: Sürdürülebilirlik
question: Bunu üç yıl sonra kim, nasıl değiştirecek?
order: 3
related: [robot-traffic, alarm-management, weighing-batching, tradeforge]
patterns:
  - name: Bağımlılıksız çekirdek modüller
    desc: İş kuralının kalbi (ör. trafik yöneticisi) dış sistemlere bağımlı olmaz; farklı sahalarda, testte ve simülasyonda aynen çalışır.
  - name: Modüler monolit
    desc: Net sınırlarla ayrılmış modüller, tek bir dağıtım birimi. Mikroservislerin operasyon yükü gerçekten gerekene kadar ertelenir.
  - name: Koddan değil yapılandırmadan
    desc: İstasyon tipleri, alarm tanımları, metinler gibi sahaya göre değişen şeyler veriyle tanımlanır; değişiklik deploy gerektirmez.
  - name: Plugin mimarisi
    desc: Genişleme noktaları açıkça tanımlanır; yeni bir cihaz sürücüsü ya da strateji ana uygulamaya dokunmadan eklenir.
---

Üretimde çalışan yazılım yıllarca yaşar ve onu genellikle yazan kişi değiştirmez. Sadelik ve net sınırlar, bugünkü hızdan daha değerlidir.
