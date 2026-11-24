---
title: TradeForge — Crypto Trading Platform
summary: A personal trading platform working over an exchange API, with plugin-based signal bots and manual trading.
category: personal
stack: [csharp, dotnet, react, typescript]
status: testing
order: 20
decisions:
  - decision: Each signal-generating bot is a separate plugin project; the main application is a single project.
    why: A new strategy can be added, tried or removed without touching the main application.
---

## Idea

Bring automated trading bots and manual trading together on one platform. Strategies are developed as plugins, while the main application owns the exchange connection and order management.

## Approach

- Current .NET release and a simple folder layout.
- React + TypeScript front end, C# .NET backend.
- Bitget first; designed so that other exchanges can be added.
- Bots generate signals and open and close positions automatically.
- First signal strategy: scalp trades of up to 15 minutes, with direction set by the 4-hour and daily trend.
- Each signal bot is an independent plugin project.

## Status

Personal project. Development is complete; currently in testing.
