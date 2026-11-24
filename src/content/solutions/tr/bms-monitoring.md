---
title: Batarya (BMS) İzleme ve Kalibrasyon
summary: Batarya yönetim sistemleriyle CANbus üzerinden haberleşen izleme, görselleştirme ve kalibrasyon yazılımı.
category: monitoring
layers: [field, acquisition, decision]
stack: [csharp, dotnet, winforms, canbus]
status: completed
order: 8
flow:
  - { type: device, label: "Batarya paketleri / BMS", layer: field }
  - { type: service, label: "CANbus arayüzü", layer: acquisition }
  - { type: ui, label: "İzleme ve kalibrasyon aracı", layer: decision }
---

## Problem

Batarya paketlerinin durumunun izlenmesi ve BMS kalibrasyonunun sahada güvenilir biçimde yapılabilmesi gerekiyordu.

## Yaklaşım

- BMS ile CANbus üzerinden haberleşme.
- Batarya verilerinin canlı izlenmesi ve görselleştirilmesi.
- Kalibrasyon işlemleri için yardımcı araçlar.

## Durum

Bir müşteri için outsource olarak geliştirildi.
