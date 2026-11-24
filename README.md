# DDD-exercises

Exercises on Domain-Driven Design

## RocketSeat course: DDD in Node.js

Build a Q&A forum system

### Value Objects

Properties of an entity that have a business rule attached to them

## Concepts

### Aggregate

A set of entities that are handled together, when one makes no sense without the other

- Order -> OrderItem[]
- Order -> Shipping

### WatchedList

A class that gives us more information about the items of a list, so that we can add (create), remove (delete) or update existing items in a list

# Subdomains

- Core: what makes money
- Supporting: supports the core so it can work
- Generic: you need them, but they are not as important

## Examples

For an e-commerce:

### Core:

- Purchase
- Catalogue
- Payment
- Delivery
- Billing

### Supporting:

- Stock

### Generics

- Customer notifications
- Promotions
- Chat
