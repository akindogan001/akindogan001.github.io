---
title: TradeForge — Kripto İşlem Platformu
summary: Plugin tabanlı sinyal botları ve manuel işlem desteğiyle, borsa API'si üzerinden çalışan kişisel işlem platformu.
category: personal
stack: [csharp, dotnet, react, typescript]
status: testing
order: 20
decisions:
  - decision: Her sinyal üretici bot ayrı bir plugin projesidir; ana uygulama tek bir projedir.
    why: Yeni bir strateji ana uygulamaya dokunmadan eklenir, denenir ya da kaldırılır.
---

## Fikir

Otomatik işlem botlarını ve manuel işlemi tek bir platformda toplamak. Stratejiler plugin olarak geliştirilir, ana uygulama borsa bağlantısını ve emir yönetimini üstlenir.

## Yaklaşım

- Güncel .NET sürümü, sade bir klasör yapısı.
- React + TypeScript arayüz, C# .NET backend.
- Önce Bitget; mimari başka borsaların da eklenebileceği şekilde tasarlandı.
- Botlar sinyal üretir, pozisyonları otomatik açar ve kapatır.
- İlk sinyal stratejisi: yönü 4 saatlik ve günlük trende göre belirleyen, en fazla 15 dakikalık scalp işlemleri.
- Her sinyal botu bağımsız bir plugin projesi.

## Durum

Kişisel proje. Geliştirmesi tamamlandı, test aşamasında.
