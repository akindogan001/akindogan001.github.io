---
title: Modüler İzleme ve SCADA Platformu
summary: Sahadaki cihazlarla birden çok protokol üzerinden haberleşen; dashboard editörü, canlı izleme, geçmiş veri ve alarmları modül modül sunan ticari .NET platformu.
category: personal
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, windows-services, winforms, webview2, react, typescript, modbus, mssql, postgresql, timescaledb]
status: planned
order: 24
flow:
  - { type: device, label: "Sahadaki cihazlar (önce Modbus, sonra diğer protokoller)", layer: field }
  - { type: service, label: "Veri toplama servisi (arka planda, Windows Service)", layer: acquisition }
  - { type: store, label: "Historian: SQL Server veya PostgreSQL / TimescaleDB", layer: integration }
  - { type: service, label: "Alarm modülü", layer: integration }
  - { type: ui, label: "Dashboard editörü ve canlı izleme (WinForms + WebView2 + React)", layer: decision }
decisions:
  - decision: Veri toplama arka planda çalışan bir servistir; arayüz ayrı bir uygulamadır.
    why: Arayüz kapalıyken de veri toplama, kayıt ve alarm üretimi kesintisiz sürer.
  - decision: Masaüstü kabuk WinForms, arayüz WebView2 içinde React + TypeScript.
    why: Dashboard editörü ve canlı ekranlar modern web bileşenleriyle geliştirilir; uygulama yine de yerel kurulumda, çevrimdışı çalışabilir.
    cost: İki dünya arasında bir mesajlaşma köprüsü kurulmalıdır.
  - decision: Historian tolerans ve değişim bazlı kayıt yapar.
    why: Yalnızca anlamlı değişimler yazılır; uzun süreli geçmiş veri makul boyutta kalır.
    cost: Tolerans değerleri sinyal bazında doğru ayarlanmalıdır, aksi halde ayrıntı kaybolur.
  - decision: İzleme, veri toplama, alarm ve SCADA özellikleri ayrı modüllerdir; müşterinin satın aldığı modüller etkinleşir.
    why: Aynı ürün küçük bir izleme ihtiyacından kapsamlı bir SCADA kurulumuna kadar ölçeklenir.
---

## Fikir

Otomasyon ve endüstri alanındaki her işletmenin kullanabileceği genel amaçlı bir izleme platformu. Sisteme eklenen her cihaz için araç kutusundaki öğelerden (göstergeler, min/max vb.) bir dashboard hazırlanır ve cihaz canlı izlenir.

## Yaklaşım

- Gereksinimler sırayla ele alınıyor: protokoller → öğe tipleri ve gösterim → dashboard editörü → izleme.
- İlk protokol Modbus; yeni protokoller eklenebilecek şekilde tasarlanıyor.
- Bazı sahalarda tamamen yerel (çevrimdışı) çalışma ve güvenli lisans takibi.

## Durum

Planlama ve tasarım aşamasında. Ticari ürün olarak planlanıyor.
