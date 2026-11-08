---
title: Weighing, Dosing and Batching Automation
summary: Automation software for PLC-controlled weighing and dosing lines that manages recipes, batches and dispatch, with communication to multiple scales unified in one library.
category: automation
layers: [field, acquisition, integration, decision]
stack: [csharp, dotnet, winforms, windows-services, mssql, siemens-s7, omron-nx, st, ladder, modbus, opcua, serial]
metrics:
  - { value: "Multiple scales", label: "one communication library" }
  - { value: "State machine", label: "PLC control flows" }
  - { value: "Alarm + interlock", label: "operator panels" }
role: Software and PLC development, on-site commissioning
status: production
order: 6
flow:
  - { type: device, label: "Scales (RS232/RS485) and PLCs (S7, NX)", layer: field }
  - { type: service, label: "Weighing communication library · Modbus / OPC UA", layer: acquisition }
  - { type: service, label: "Process and batching application", layer: decision }
  - { type: store, label: "Production database (SQL Server)", layer: integration }
  - { type: service, label: "ERP: production order, stock, recipe sync", layer: integration }
  - { type: ui, label: "Operator panel", layer: decision }
decisions:
  - decision: Communication with different weighing devices sits behind a single library.
    why: When a device brand or protocol changes, the process application stays the same; a new device is added to the library as a driver.
  - decision: PLC control logic is written as state machines (Structured Text).
    why: Every step and transition is explicit, failure states are predictable and on-site debugging is easier.
  - decision: Alarms and interlocks are enforced in the operator panel software as well.
    why: An invalid or unsafe step is blocked with a clear reason for the operator, and the process stays on record.
---

## Problem

Production lines built on weighing and dosing needed recipes applied correctly, traceable batches and data that stays consistent with the ERP. Scales and PLCs from different vendors were mixed on site.

## Approach

- C# + SQL Server desktop applications and Windows services for machine control and process automation.
- A shared communication library for multiple weighing devices over RS232/RS485.
- Communication with Siemens S7 and Omron NX PLCs over Modbus, OPC UA and serial protocols.
- Production order, stock and recipe synchronization with the ERP.
- On-site commissioning and debugging of PLC-controlled machines.
