---
title: Velora — Speed Camera and Speed Corridor Alerts
summary: A mobile app for Türkiye with crowdsourced speed camera reports and speed corridor tracking, running in the background alongside a navigation app.
category: personal
layers: [field, acquisition, integration, decision]
stack: [flutter, dart, kotlin, android]
metrics:
  - { value: "1 Hz", label: "location sampling" }
  - { value: "Foreground service", label: "background drive tracking" }
  - { value: "Android 8.0+", label: "minimum version" }
status: testing
order: 23
flow:
  - { type: device, label: "Phone location (FusedLocationProvider, 1 Hz)", layer: field }
  - { type: service, label: "DrivingService: Kotlin foreground service", layer: acquisition }
  - { type: service, label: "DrivingRuntime: alert engine + region packs (Dart, headless engine)", layer: decision }
  - { type: service, label: "Community sync, notification and verification (backend)", layer: integration }
  - { type: ui, label: "Audio alerts and interface", layer: decision }
decisions:
  - decision: Driving logic runs in a headless Flutter engine inside a foreground service, independent of the UI.
    why: Alerts keep running while the app is in the background or used alongside a navigation app; the UI only renders frames coming from the service.
    cost: The service and the UI run in separate isolates, so the messaging between them (IsolateNameServer, platform channels) must be designed explicitly.
  - decision: Platform work such as location and audio lives in Kotlin; alert logic lives in Dart.
    why: The location provider and audio focus (ducking other audio instead of stopping it) are handled most reliably with native APIs, while business logic stays platform-independent.
  - decision: Reports are verified by active user confirmation, not by clustering telemetry.
    why: Traffic, junctions and speed bumps also cause slowdowns; a method that only looks at speed produces false camera locations.
    alternative: Automatically clustering the points where drivers slow down.
    cost: Verification depends on user participation, so a mechanism that encourages it is needed.
---

## Idea

There are many similar apps on the market; the difference is in ergonomics. The app has no navigation of its own: it works on its own or next to a navigation app, as a bar sliding in from the top or side, plus notifications.

## Approach

- Kotlin MainActivity: permissions, starting/stopping the service, sharing the trace.
- Kotlin DrivingService (foreground service): 1 Hz location and audio alerts that duck other audio.
- Dart DrivingRuntime: alert engine, region packs, community sync, notification and verification.
- Speed corridor approach alerts and live average speed inside a corridor.
- Users can also report accidents, traffic and alternative road conditions.

## Status

The Android version is in testing and not yet in the store.
