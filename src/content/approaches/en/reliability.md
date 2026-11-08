---
title: Reliability
question: In a system running 24/7, what happens when something goes wrong?
order: 1
related: [db-sync, device-monitoring, alarm-management]
patterns:
  - name: Retry + transaction rollback
    desc: Transient errors (network, locks, timeouts) are handled by controlled retries; half-finished work is rolled back so data is never left inconsistent.
  - name: Error queue
    desc: A record that cannot be processed does not stop the pipeline; it is queued with its cause and reprocessed later.
  - name: Isolated threads
    desc: Each device or data entity runs in its own loop, so one slow or silent participant does not affect the others.
  - name: Running as a service
    desc: Data collection components run as background services, independent of user sessions, and restart on their own after a failure.
---

In production there is no "it won't fail" assumption. Networks drop, devices stop answering, databases lock. The design question is not whether things fail, but how the system behaves when they do.
