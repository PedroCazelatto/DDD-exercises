import type { UniqueEntityId } from "@/core/entities/unique-entity-id.value-object"

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
