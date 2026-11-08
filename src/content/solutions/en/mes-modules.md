---
title: MES Modules — OEE, Downtime and Traceability
summary: Manufacturing modules that calculate OEE from automatically collected shop-floor data, track downtime and provide batch/lot traceability.
category: mes
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, mssql, scada-hmi, siemens-s7, opcua, modbus]
metrics:
  - { value: "OEE", label: "calculated automatically" }
  - { value: "Batch / lot", label: "traceability" }
role: Development and PLC/SCADA integration
status: production
order: 7
flow:
  - { type: device, label: "Machine and PLC signals", layer: field }
  - { type: service, label: "Shop-floor data collection (PLC / SCADA integration)", layer: acquisition }
  - { type: store, label: "Production database", layer: integration }
  - { type: service, label: "ERP integration", layer: integration }
  - { type: ui, label: "OEE, downtime and traceability screens", layer: decision }
decisions:
  - decision: OEE and downtime data come directly from machine and PLC signals instead of manual entry.
    why: Manual data is late and rounded; signal-based data shows real losses and real downtime durations.
    cost: Signal meanings (running, fault, idle) must be mapped correctly for each machine.
---

## Problem

Production performance (OEE) and downtime were tracked by hand, and it was hard to trace which lot came from which raw material and batch.

## Approach

- Real-time data flow by integrating PLC and SCADA/HMI systems with enterprise software.
- OEE calculation from availability, performance and quality.
- Downtime tracking.
- Batch/lot traceability and production order synchronization with the ERP.
