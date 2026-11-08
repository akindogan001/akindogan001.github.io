---
title: Central Alarm and Event Management
summary: A reusable module that handles alarms and warnings from robots, handheld terminals, traffic control and field devices with one model, an acknowledgement flow and a multilingual catalog.
category: integration
layers: [field, integration, decision]
stack: [csharp, dotnet, rest]
status: in-progress
order: 4
flow:
  - { type: device, label: "Robots, handheld terminals, field devices", layer: field }
  - { type: service, label: "Alarm management module (DLL)", layer: integration }
  - { type: store, label: "Local event database + history", layer: integration }
  - { type: service, label: "Push to central API", layer: integration }
  - { type: ui, label: "Operator / controller screen", layer: decision }
decisions:
  - decision: Alarm definitions and texts live in the database; applications send only category, source and code IDs.
    why: Texts are managed in one place instead of being embedded in applications, and are returned in Turkish or English depending on the selected language.
    cost: Adding a new alarm means updating the catalog instead of the code; the catalog needs discipline.
  - decision: An unacknowledged alarm is not created again; once acknowledged, it can occur again.
    why: No alarm floods for the same problem, so the operator screen stays readable.
  - decision: Levels are limited to INFO, WARNING and ALARM; a warning that escalates is opened as a separate alarm record.
    why: Few, clear levels let operators grasp priority quickly, and history is preserved unchanged.
  - decision: A source-independent module and a common log standard instead of a robot-ecosystem-specific logging stack.
    why: Events come not only from robots but also from terminals, traffic control and other field devices.
---

## Problem

Different components of the site system raise alarms and warnings, each in its own format. Events needed to be collected in one model, acknowledged, kept in history and pushed to the central side.

## Approach

- Each event carries an event ID, a predefined event code, level, category, title, description, and created, ended and acknowledged times.
- A standalone library with add, acknowledge and list functions, usable from any system.
- Active alarms/warnings and their history are stored in separate tables.
- Instant and end-of-day reports and alarm states are pushed to the central API.

## Status

In development.
