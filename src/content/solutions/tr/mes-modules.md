---
title: MES Modülleri — OEE, Duruş ve İzlenebilirlik
summary: Sahadan otomatik toplanan veriyle OEE hesaplayan, duruşları takip eden ve batch/lot izlenebilirliği sağlayan üretim yönetim modülleri.
category: mes
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, mssql, scada-hmi, siemens-s7, opcua, modbus]
metrics:
  - { value: "OEE", label: "otomatik hesaplama" }
  - { value: "Batch / lot", label: "izlenebilirlik" }
role: Geliştirme ve PLC/SCADA entegrasyonu
status: production
order: 7
flow:
  - { type: device, label: "Makine ve PLC sinyalleri", layer: field }
  - { type: service, label: "Shopfloor veri toplama (PLC / SCADA entegrasyonu)", layer: acquisition }
  - { type: store, label: "Üretim veritabanı", layer: integration }
  - { type: service, label: "ERP entegrasyonu", layer: integration }
  - { type: ui, label: "OEE, duruş ve izlenebilirlik ekranları", layer: decision }
decisions:
  - decision: OEE ve duruş verisi elle giriş yerine doğrudan makine ve PLC sinyallerinden üretilir.
    why: Elle girilen veri gecikir ve yuvarlanır; sinyal tabanlı veri gerçek kayıpları ve gerçek duruş sürelerini gösterir.
    cost: Sinyal anlamlarının (çalışıyor, arıza, bekleme) makine bazında doğru eşlenmesi gerekir.
---

## Problem

Üretim performansı (OEE) ve duruşlar elle tutuluyor, hangi lot'un hangi hammadde ve batch'ten geldiği zor izleniyordu.

## Yaklaşım

- PLC ve SCADA/HMI sistemlerini kurumsal yazılımlarla entegre ederek gerçek zamanlı veri akışı.
- Kullanılabilirlik, performans ve kalite bileşenleriyle OEE hesaplama.
- Duruş takibi.
- Batch/lot izlenebilirliği ve ERP ile üretim emri senkronizasyonu.
