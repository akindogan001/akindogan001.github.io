---
title: Tartım, Dozajlama ve Batching Otomasyonu
summary: PLC kontrollü tartım ve dozajlama hatlarında reçete, batch ve sevkiyat süreçlerini yöneten; çoklu terazi iletişimini tek kütüphanede toplayan otomasyon yazılımları.
category: automation
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, winforms, windows-services, mssql, siemens-s7, omron-nx, st, ladder, modbus, opcua, serial]
metrics:
  - { value: "Çoklu terazi", label: "tek iletişim kütüphanesi" }
  - { value: "State machine", label: "PLC kontrol akışları" }
  - { value: "Alarm + interlock", label: "operatör panelleri" }
role: Yazılım ve PLC geliştirme, sahada devreye alma
status: production
order: 6
flow:
  - { type: device, label: "Teraziler (RS232/RS485) ve PLC'ler (S7, NX)", layer: field }
  - { type: service, label: "Tartım iletişim kütüphanesi · Modbus / OPC UA", layer: acquisition }
  - { type: service, label: "Proses ve batching uygulaması", layer: decision }
  - { type: store, label: "Üretim veritabanı (SQL Server)", layer: integration }
  - { type: service, label: "ERP: üretim emri, stok, reçete senkronizasyonu", layer: integration }
  - { type: ui, label: "Operatör paneli", layer: decision }
decisions:
  - decision: Farklı tartım cihazlarıyla haberleşme tek bir kütüphanenin arkasında toplanır.
    why: Cihaz markası ya da protokol değiştiğinde proses uygulaması değişmez; yeni bir cihaz kütüphaneye sürücü olarak eklenir.
  - decision: PLC kontrol mantığı state-machine olarak yazılır (Structured Text).
    why: Her adım ve geçiş açıkça tanımlıdır; hata durumları öngörülebilir, sahada hata ayıklama kolaydır.
  - decision: Operatör panellerinde alarm ve interlock mekanizmaları yazılım tarafında da uygulanır.
    why: Hatalı ya da güvensiz bir adım operatöre net bir sebeple engellenir; proses kayıt altında kalır.
---

## Problem

Tartım ve dozajlamaya dayalı üretim hatlarında reçetelerin doğru uygulanması, batch'lerin izlenebilir olması ve verinin ERP ile tutarlı kalması gerekiyordu. Sahada farklı marka teraziler ve PLC'ler bir aradaydı.

## Yaklaşım

- Makine kontrolü ve proses otomasyonu için C# + SQL Server tabanlı masaüstü uygulamaları ve Windows servisleri.
- RS232/RS485 üzerinden birden çok tartım cihazıyla haberleşen ortak bir iletişim kütüphanesi.
- Siemens S7 ve Omron NX PLC'lerle Modbus, OPC UA ve seri protokoller üzerinden haberleşme.
- ERP ile üretim emri, stok ve reçete senkronizasyonu.
- PLC kontrollü makinelerde sahada devreye alma ve hata ayıklama.
