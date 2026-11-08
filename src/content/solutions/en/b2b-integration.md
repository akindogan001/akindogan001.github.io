---
title: B2B Platform and ERP Integration
summary: A B2B sales platform with company-specific pricing and customer-specific catalogs, integrated with ERP and back-office systems over REST and deployed in containers.
category: integration
layers: [integration, decision]
stack: [csharp, aspnetcore, nopcommerce, rest, docker, portainer, linux]
role: Development and deployment
status: production
order: 9
flow:
  - { type: service, label: "ERP and back-office systems", layer: integration }
  - { type: service, label: "REST integration services", layer: integration }
  - { type: ui, label: "B2B platform (company pricing and catalogs)", layer: decision }
decisions:
  - decision: The platform and integration services run as Docker containers on a Linux server managed with Portainer.
    why: Deployments are repeatable; services can be updated and rolled back independently.
---

## Problem

Dealers and corporate customers needed to order with their own prices and product catalogs, and that data had to stay consistent with the ERP.

## Approach

- Company-specific pricing and customer-specific catalog customizations on a nopCommerce-based B2B platform.
- Integration with ERP and back-office systems over REST APIs.
- Containerizing the platform and services with Docker and deploying them on a Debian server through Portainer.
