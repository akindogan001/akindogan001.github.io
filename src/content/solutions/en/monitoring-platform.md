---
title: Modular Monitoring and SCADA Platform
summary: A commercial .NET platform that talks to field devices over multiple protocols and offers a dashboard editor, live monitoring, historical data and alarms as separate modules.
category: personal
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, windows-services, winforms, webview2, react, typescript, modbus, mssql, postgresql, timescaledb]
status: planned
order: 24
flow:
  - { type: device, label: "Field devices (Modbus first, other protocols next)", layer: field }
  - { type: service, label: "Data collection service (background, Windows Service)", layer: acquisition }
  - { type: store, label: "Historian: SQL Server or PostgreSQL / TimescaleDB", layer: integration }
  - { type: service, label: "Alarm module", layer: integration }
  - { type: ui, label: "Dashboard editor and live monitoring (WinForms + WebView2 + React)", layer: decision }
decisions:
  - decision: Data collection is a background service; the user interface is a separate application.
    why: Collection, logging and alarm generation continue even when the interface is closed.
  - decision: A WinForms desktop shell with a React + TypeScript interface inside WebView2.
    why: The dashboard editor and live screens are built with modern web components, while the application still runs as a local, offline-capable installation.
    cost: A messaging bridge between the two worlds has to be built.
  - decision: The historian logs by tolerance and change.
    why: Only meaningful changes are written, so long-term history stays at a reasonable size.
    cost: Tolerances must be set correctly per signal, otherwise detail is lost.
  - decision: Monitoring, data collection, alarms and SCADA features are separate modules, enabled according to what the customer buys.
    why: The same product scales from a small monitoring need to a full SCADA installation.
---

## Idea

A general-purpose monitoring platform for any automation or industrial business. For every device added to the system, a dashboard is built from toolbox items (gauges, min/max and so on) and the device is monitored live.

## Approach

- Requirements are handled in order: protocols → item types and display → dashboard editor → monitoring.
- Modbus is the first protocol; the design allows new protocols to be added.
- Fully local (offline) operation at some sites, with secure license tracking.

## Status

In planning and design, intended as a commercial product.
