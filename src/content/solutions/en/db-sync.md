---
title: Multi-Database Synchronization Platform
summary: Near real-time, fault-tolerant data synchronization between Oracle and PostgreSQL, driven by trigger-based change tracking.
category: integration
layers: [integration]
stack: [csharp, dotnet, oracle, postgresql, docker, linux]
metrics:
  - { value: "100–200 ms", label: "sync cycle" }
  - { value: "Full + incremental", label: "replication modes" }
  - { value: "Thread-per-entity", label: "parallel pipeline" }
role: Architecture and development
status: production
featured: true
order: 1
flow:
  - { type: store, label: "Source DB (Oracle)", layer: integration }
  - { type: service, label: "Triggers → audit log tables", layer: integration }
  - { type: service, label: "Sync service (one thread per entity)", layer: integration }
  - { type: queue, label: "Error queue (reprocessing)", layer: integration }
  - { type: store, label: "Target DB (PostgreSQL)", layer: integration }
decisions:
  - decision: Changes are written to audit log tables by triggers; synchronization reads that log.
    why: Changes are captured at the source, in the same transaction. Applications using the source system need no modification.
    alternative: Periodic polling by timestamp (updated_at). It can miss deletes and changes that land at the same moment.
    cost: Each write carries a small extra insert; audit tables need regular cleanup.
  - decision: Each data entity is processed on its own thread.
    why: A slow or failing table does not hold back the others, and ordering is preserved within each entity.
    cost: Threads and connections grow with the number of entities, so the connection pool must be sized accordingly.
  - decision: Retry, transaction rollback and an error queue work together.
    why: Transient errors are recovered automatically; permanently failing records are queued without stopping the pipeline and reprocessed later.
    cost: An unmonitored error queue can hide problems; its size has to be tracked.
---

## Problem

Several systems kept the same business data (prices, stock, customers, orders) in their own databases. Nightly batch transfers caused both delay and, when something failed, inconsistency.

## Approach

- **Full snapshot** for initial load and resynchronization, **incremental** replication for day-to-day operation.
- Changes land in an audit log at the source; the service reads the log at short intervals and applies it to the target.
- Every apply runs in a transaction; on failure it is rolled back and the record goes to the error queue.
- Services run as Docker containers on a Linux server.

## Result

The gap between systems dropped from "wait until tonight" to milliseconds. A single bad record no longer stops the whole transfer.
