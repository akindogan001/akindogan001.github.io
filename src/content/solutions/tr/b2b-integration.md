---
title: B2B Platformu ve ERP Entegrasyonu
summary: Firma bazlı fiyatlandırma ve müşteriye özel kataloglarla bir B2B satış platformu; ERP ve arka ofis sistemleriyle REST entegrasyonu, container tabanlı devreye alma.
category: integration
layers: [integration, decision]
stack: [csharp, aspnetcore, nopcommerce, rest, docker, portainer, linux]
role: Geliştirme ve devreye alma
status: production
order: 9
flow:
  - { type: service, label: "ERP ve arka ofis sistemleri", layer: integration }
  - { type: service, label: "REST entegrasyon servisleri", layer: integration }
  - { type: ui, label: "B2B platformu (firma bazlı fiyat ve katalog)", layer: decision }
decisions:
  - decision: Platform ve entegrasyon servisleri Docker container olarak, Portainer ile yönetilen bir Linux sunucuda çalışır.
    why: Kurulum tekrarlanabilir olur; servisler birbirinden bağımsız güncellenir ve geri alınabilir.
---

## Problem

Bayi ve kurumsal müşterilerin, kendilerine özel fiyat ve ürün kataloğuyla sipariş verebilmesi; bu verilerin ERP ile tutarlı kalması gerekiyordu.

## Yaklaşım

- nopCommerce tabanlı B2B platformunda firma bazlı fiyatlandırma ve müşteri bazlı katalog özelleştirmeleri.
- ERP ve arka ofis sistemleriyle REST API üzerinden entegrasyon.
- Platform ve servislerin Docker ile container haline getirilip Debian sunucuda Portainer üzerinden devreye alınması.
