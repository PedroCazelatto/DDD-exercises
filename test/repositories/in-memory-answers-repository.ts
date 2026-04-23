import { DomainEvents } from "@/core/events/domain-events"
import type { AnswersRepository } from "@/domain/forum/application/repositories/answers.repository"
import type { Answer } from "@/domain/forum/enterprise/entities/answer.entity"

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findManyByQuestionId(questionId: string) {
    const answers = this.items.filter(
      item => item.questionId.toString() === questionId
    )
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}
