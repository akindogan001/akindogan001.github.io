---
title: Battery (BMS) Monitoring and Calibration
summary: Monitoring and calibration tools that communicate with battery management systems over CANbus.
category: monitoring
layers: [field, acquisition, decision]
stack: [csharp, dotnet, canbus]
order: 8
flow:
  - { type: device, label: "Battery packs / BMS", layer: field }
  - { type: service, label: "CANbus interface", layer: acquisition }
  - { type: ui, label: "Monitoring and calibration tool", layer: decision }
---

## Problem

Battery pack status had to be monitored, and BMS calibration had to be done reliably in the field.

## Approach

- Communication with the BMS over CANbus.
- Live monitoring of battery data.
- Helper tools for calibration procedures.
