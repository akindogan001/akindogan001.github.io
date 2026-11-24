---
title: OBD-II Reader and Vehicle Dashboard
summary: A mobile app that reads vehicle data through an OBD-II adapter and lets users build their own dashboard, with no account or cloud required.
category: personal
layers: [field, acquisition, decision]
status: planned
order: 25
flow:
  - { type: device, label: "Vehicle (OBD-II)", layer: field }
  - { type: device, label: "OBD-II adapter", layer: acquisition }
  - { type: service, label: "Reading and data decoding", layer: acquisition }
  - { type: ui, label: "Custom dashboard (goal: CarPlay / Android Auto)", layer: decision }
decisions:
  - decision: The app only reads; it never writes commands to the vehicle.
    why: It can be used on any OBD-equipped vehicle without the risk of interfering with vehicle systems.
  - decision: No account and no cloud; the app is bought once and runs fully locally.
    why: It works offline and vehicle data never leaves the device.
---

## Idea

A paid mobile app that works on every OBD-equipped vehicle, reads the data the vehicle supports and shows it in a modern interface. Users build their own dashboard from the values they want to see.

## Approach

- iOS and Android.
- Showing the dashboard on CarPlay and Android Auto where possible.
- Global market.

## Status

In planning.
