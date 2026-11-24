---
title: Battery (BMS) Monitoring and Calibration
summary: Monitoring, visualization and calibration software that communicates with battery management systems over CANbus.
category: personal
layers: [field, acquisition, decision]
stack: [csharp, dotnet, winforms, canbus]
order: 22
flow:
  - { type: device, label: "Battery packs / BMS", layer: field }
  - { type: service, label: "CANbus interface", layer: acquisition }
  - { type: ui, label: "Monitoring and calibration tool", layer: decision }
---

## Problem

Battery pack status had to be monitored, and BMS calibration had to be done reliably in the field.

## Approach

- Communication with the BMS over CANbus.
- Live monitoring and visualization of battery data.
- Helper tools for calibration procedures.

## Status

Personal project.
