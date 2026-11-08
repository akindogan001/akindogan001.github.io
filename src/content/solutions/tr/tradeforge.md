---
title: TradeForge — Kripto İşlem Platformu
summary: Plugin tabanlı sinyal botları ve manuel işlem desteğiyle, borsa API'si üzerinden çalışan kişisel işlem platformu.
category: personal
stack: [csharp, dotnet]
status: in-progress
order: 20
decisions:
  - decision: Her sinyal üretici bot ayrı bir plugin projesidir; ana uygulama tek bir projedir.
    why: Yeni bir strateji ana uygulamaya dokunmadan eklenir, denenir ya da kaldırılır.
---

## Fikir

Otomatik işlem botlarını ve manuel işlemi tek bir platformda toplamak. Stratejiler plugin olarak geliştirilir, ana uygulama borsa bağlantısını ve emir yönetimini üstlenir.

## Yaklaşım

- Güncel .NET sürümü, sade bir klasör yapısı.
- Borsa entegrasyonu Bitget API üzerinden.
- Her sinyal botu bağımsız bir plugin projesi.

## Durum

Kişisel proje, geliştirme aşamasında.
