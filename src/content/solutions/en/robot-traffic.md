---
title: Robot Fleet Traffic Management
summary: Generalized traffic management for mobile robot fleets in warehouse automation, reserving junctions and directions in time so robots flow without stopping or colliding.
category: robotics
layers: [field, acquisition, decision]
stack: [csharp, dotnet]
status: in-progress
featured: true
order: 3
flow:
  - { type: device, label: "Mobile robot fleet", layer: field }
  - { type: service, label: "Fleet communication (position, state)", layer: acquisition }
  - { type: service, label: "Traffic manager: route · speed · time reservation", layer: decision }
  - { type: ui, label: "Controller screen", layer: decision }
decisions:
  - decision: Junctions and directions are reserved in time; other robots adjust their speed to the arrival time.
    why: Instead of stopping at a junction, robots slow down without breaking the flow; the fleet is managed top-down as a whole.
    alternative: A lock per junction (first come, first served). Simple, but it creates stop-and-go traffic and deadlock risk.
    cost: Position and arrival estimates must be reliable; reservations have to be replanned when robots deviate.
  - decision: The traffic manager is a dependency-free core module that only moves a robot from its current position to its target (route, speed, reservations).
    why: With site rules such as station occupancy kept outside, the module can be tested unchanged on different sites and in simulation.
    cost: Managing station and task states becomes the responsibility of the integration layer.
  - decision: Map edges can be one-way, two-way or direction-reserved; station types are defined by configuration, not code.
    why: Every site is different; a new station type or path rule should not require a code change.
---

## Problem

Robot types with different jobs (depalletizing, picking) have to move efficiently on the same site without conflicts at junctions. Since every site layout is different, the rules must not be hard-coded per site.

## Approach

- The fleet is monitored top-down; every robot has an assigned home position and a station-based state (home, roaming, charging, etc.).
- Generalized traffic rules are defined and robots behave according to them.
- Junction management is integrated with station and state tracking.

## Status

In development, tested together with the site planning and simulation tool.
