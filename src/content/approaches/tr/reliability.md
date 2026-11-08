---
title: Güvenilirlik
question: 7/24 çalışan bir sistemde bir şey ters giderse ne olur?
order: 1
related: [db-sync, device-monitoring, alarm-management]
patterns:
  - name: Retry + transaction rollback
    desc: Geçici hatalar (ağ, kilit, zaman aşımı) kontrollü yeniden denemeyle aşılır; yarım kalan işlem geri alınır, veri tutarsız bırakılmaz.
  - name: Error queue
    desc: Kalıcı olarak işlenemeyen kayıt hattı durdurmaz; kuyruğa alınır, sebebiyle birlikte saklanır ve sonradan yeniden işlenir.
  - name: Yalıtılmış iş parçacıkları
    desc: Her cihaz ya da veri varlığı kendi döngüsünde çalışır; biri yavaşladığında ya da yanıt vermediğinde diğerleri etkilenmez.
  - name: Servis olarak çalışma
    desc: Veri toplayan bileşenler kullanıcı oturumundan bağımsız arka plan servisleri olarak çalışır ve hata sonrası kendiliğinden yeniden başlar.
---

Üretim ortamında "hata olmayacak" diye bir varsayım yoktur. Ağ kopar, cihaz yanıt vermez, veritabanı kilitlenir. Tasarım sorusu hatanın olup olmayacağı değil, olduğunda sistemin nasıl davranacağıdır.
