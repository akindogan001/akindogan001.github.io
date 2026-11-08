---
title: Performance
question: How do you talk to hundreds of devices or tables at the same time?
order: 2
related: [device-monitoring, db-sync]
patterns:
  - name: Thread-per-device / thread-per-entity
    desc: An independent processing loop for each device or data entity. Parallelism comes naturally, and one participant's delay does not spread to the others.
  - name: Incremental processing
    desc: Process only what changed, not all the data every time. Latency and load become independent of data size.
  - name: Asynchronous background work
    desc: Long-running work is separated from the user flow, so interfaces and collection loops are never blocked.
---

In industrial systems, performance problems rarely come from raw speed; they come from waiting — a device that does not answer, a locked table, a loop that runs sequentially. My goal is to isolate the waiting.
