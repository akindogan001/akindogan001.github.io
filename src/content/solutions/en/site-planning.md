---
title: Site Planning and Traffic Simulation
summary: A digital-twin-based planning tool for robotic warehouse sites, from a draft map to fleet size estimation and simulation tests.
category: robotics
layers: [decision]
stack: [csharp, dotnet]
status: in-progress
order: 5
flow:
  - { type: ui, label: "Draft map editor (stations, racks, walls, chargers, paths)", layer: decision }
  - { type: service, label: "Map compiler", layer: decision }
  - { type: service, label: "Fleet size estimation", layer: decision }
  - { type: service, label: "Simulation: virtual robots + traffic manager", layer: decision }
  - { type: ui, label: "Traffic and capacity report", layer: decision }
decisions:
  - decision: Digital twins of the physical robots (virtual robots) talk to the real traffic management software.
    why: The traffic manager is tested with its real behavior before going to site; traffic load is measured and reported.
  - decision: The planning tool is a separate application that uses the traffic manager as the module under test, not as a dependency.
    why: The same core module runs on site and in simulation; changes in the planning tool never leak into production code.
---

## Problem

Site maps are drawn by hand from the layout plan. Which map, how many robots and which traffic settings suit a site best could only be found out by trying on site.

## Approach

1. **Draft map editor:** stations, racks/pallets, walls, chargers and paths are placed from a toolbox.
2. **Map compiler:** the draft is compiled into a map that can go to the map maker or be imported directly.
3. **Fleet size estimation:** the required number of robots is calculated from the workload.
4. **Simulation:** traffic tests with virtual robots on both draft and final maps.

## Status

In development.
