---
title: Maintainability
question: Who will change this in three years, and how?
order: 3
related: [robot-traffic, alarm-management, weighing-batching, tradeforge]
patterns:
  - name: Dependency-free core modules
    desc: The heart of the business logic (e.g. the traffic manager) does not depend on external systems, so it runs unchanged on different sites, in tests and in simulation.
  - name: Modular monolith
    desc: Modules with clear boundaries, one deployment unit. The operational cost of microservices is deferred until it is actually needed.
  - name: Configuration over code
    desc: Things that vary per site — station types, alarm definitions, texts — are defined as data, so changing them needs no deployment.
  - name: Plugin architecture
    desc: Extension points are explicit; a new device driver or strategy is added without touching the main application.
---

Software in production lives for years and is usually changed by someone other than its author. Simplicity and clear boundaries are worth more than today's speed.
