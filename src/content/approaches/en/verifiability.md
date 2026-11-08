---
title: Verifiability
question: How do we become confident before going to site?
order: 5
related: [site-planning, robot-traffic]
patterns:
  - name: Simulation first
    desc: A digital twin of the physical system talks to the real software, so rules and capacity are tested before going to site.
  - name: Testable boundaries
    desc: Code that touches hardware is kept in a thin layer; business logic can be tested without hardware.
  - name: State-machine control flow
    desc: Process steps and transitions are defined explicitly, so what happens in each state is never open to interpretation.
---

Trial and error on site is expensive: the line stops, robots wait, the team stays on site. Verifying everything possible before going to site saves both time and trust.
