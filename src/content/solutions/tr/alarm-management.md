---
title: Merkezi Alarm ve Olay Yönetimi
summary: Robot, el terminali, trafik kontrolü ve saha cihazlarından gelen alarm ve uyarıları tek bir model, onay akışı ve çok dilli katalogla yöneten yeniden kullanılabilir modül.
category: integration
layers: [field, integration, decision]
stack: [csharp, dotnet, rest]
status: in-progress
order: 4
flow:
  - { type: device, label: "Robotlar, el terminalleri, saha cihazları", layer: field }
  - { type: service, label: "Alarm yönetim modülü (DLL)", layer: integration }
  - { type: store, label: "Yerel olay veritabanı + geçmiş", layer: integration }
  - { type: service, label: "Merkezi API'ye aktarım", layer: integration }
  - { type: ui, label: "Operatör / kontrolör ekranı", layer: decision }
decisions:
  - decision: Alarm tanımları ve metinleri veritabanında tutulur; uygulamalar yalnızca kategori, kaynak ve kod kimliği gönderir.
    why: Metinler tek yerden yönetilir, uygulamalara gömülmez; seçilen dile göre Türkçe ya da İngilizce döner.
    cost: Yeni bir alarm eklemek kod yerine katalog güncellemesi gerektirir; katalog yönetimi disiplin ister.
  - decision: Onaylanmamış bir alarm yeniden oluşturulmaz; onaylandıktan sonra tekrar oluşabilir.
    why: Aynı sorun için alarm seli oluşmaz, operatör ekranı okunabilir kalır.
  - decision: Seviyeler INFO, WARNING ve ALARM ile sınırlıdır; alarma dönüşen uyarı ayrı bir alarm kaydı olarak açılır.
    why: Az ve net seviye, operatörün önceliği hızlı anlamasını sağlar; geçmiş kayıtlar değiştirilmeden korunur.
  - decision: Robot ekosistemine özgü bir loglama altyapısı yerine kaynaktan bağımsız bir modül ve ortak log standardı.
    why: Olaylar yalnızca robotlardan değil, terminaller, trafik kontrolü ve diğer saha cihazlarından da gelir.
---

## Problem

Saha sistemindeki farklı bileşenler alarm ve uyarı üretiyor; ancak her biri kendi biçiminde. Olayların tek bir modelde toplanması, onaylanması, geçmişinin tutulması ve merkeze aktarılması gerekiyordu.

## Yaklaşım

- Her olay; olay kimliği, önceden tanımlı olay kodu, seviye, kategori, başlık, açıklama, oluşma, bitiş ve onay zamanlarıyla tutulur.
- Ekleme, onaylama ve listeleme işlevleri sunan, herhangi bir sistemden kullanılabilen bağımsız bir kütüphane.
- Aktif alarm/uyarı ve geçmiş kayıtları ayrı tablolarda tutulur.
- Anlık ve gün sonu raporları ile alarm durumları merkezi API'ye aktarılır.

## Durum

Geliştirme aşamasında.
