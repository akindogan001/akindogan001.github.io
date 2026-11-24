---
title: Velora — Radar ve Hız Koridoru Uyarıları
summary: Türkiye için kitle kaynaklı radar bildirimleri ve hız koridoru takibi sunan, navigasyon uygulamasıyla birlikte arka planda çalışan mobil uygulama.
category: personal
layers: [field, acquisition, integration, decision]
stack: [flutter, dart, kotlin, android]
metrics:
  - { value: "1 Hz", label: "konum örnekleme" }
  - { value: "Foreground service", label: "arka planda sürüş takibi" }
  - { value: "Android 8.0+", label: "minimum sürüm" }
status: testing
order: 23
flow:
  - { type: device, label: "Telefon konumu (FusedLocationProvider, 1 Hz)", layer: field }
  - { type: service, label: "DrivingService: Kotlin foreground service", layer: acquisition }
  - { type: service, label: "DrivingRuntime: uyarı motoru + bölge paketleri (Dart, headless engine)", layer: decision }
  - { type: service, label: "Topluluk senkronu, bildirim ve doğrulama (backend)", layer: integration }
  - { type: ui, label: "Sesli uyarı ve arayüz", layer: decision }
decisions:
  - decision: Sürüş mantığı, arayüzden bağımsız bir foreground service içindeki headless Flutter engine'de çalışır.
    why: Uygulama arka plandayken ya da bir navigasyon uygulamasıyla birlikte kullanılırken uyarılar kesintisiz sürer; arayüz yalnızca servisten gelen kareleri gösterir.
    cost: Servis ve arayüz ayrı isolate'larda çalışır; aralarındaki mesajlaşma (IsolateNameServer, platform kanalları) açıkça tasarlanmalıdır.
  - decision: Konum ve ses gibi platform işleri Kotlin'de, uyarı mantığı Dart'ta.
    why: Konum sağlayıcısı ve ses odağı (diğer sesleri kesmeden kısmak) yerel API'lerle en güvenilir biçimde yönetilir; iş mantığı platformdan bağımsız kalır.
  - decision: Bildirimler telemetri kümelemesiyle değil, kullanıcıların aktif onayıyla doğrulanır.
    why: Trafik, kavşak ve hız kesiciler de yavaşlamaya yol açar; yalnızca hıza bakan bir yöntem yanlış radar noktaları üretir.
    alternative: Sürücülerin yavaşladığı noktaları otomatik kümelemek.
    cost: Doğrulama kullanıcı katılımına bağlıdır; katılımı teşvik eden bir mekanizma gerekir.
---

## Fikir

Piyasada benzer uygulamalar çok; fark kullanım ergonomisinde. Uygulama kendi navigasyonunu sunmaz: tek başına ya da bir navigasyon uygulamasının yanında, üstten veya yandan açılan bir şerit ve bildirimlerle çalışır.

## Yaklaşım

- Kotlin MainActivity: izinler, servisi başlatma/durdurma, iz paylaşımı.
- Kotlin DrivingService (foreground service): 1 Hz konum ve diğer sesleri kısarak çalan sesli uyarılar.
- Dart DrivingRuntime: uyarı motoru, bölge paketleri, topluluk senkronu, bildirim ve doğrulama.
- Hız koridoruna yaklaşma uyarısı ve koridor içinde anlık ortalama hız gösterimi.
- Kullanıcılar kaza, trafik ve alternatif yol durumunu da bildirebilir.

## Durum

Android sürümü test aşamasında; henüz mağazada değil.
