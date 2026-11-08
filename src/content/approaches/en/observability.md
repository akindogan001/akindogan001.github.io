---
title: Observability
question: When something goes wrong, where — and how fast — do we find out?
order: 4
related: [alarm-management, device-monitoring, mes-modules]
patterns:
  - name: Central alarm management
    desc: Events from every source are kept in one model, with level, category and acknowledgement state.
  - name: Common log standard
    desc: Different components log with the same fields and rules, so events can be correlated across systems.
  - name: Screens designed for operators
    desc: Color and emphasis are reserved for abnormal states; a healthy system looks calm, and problems stand out immediately.
---

A system you cannot observe is a system you cannot vouch for. Observability is not a feature added later; it is a requirement from the first day of design.
