import { UniqueEntityId } from "@/core/entities/unique-entity-id.value-object"
import {
  Question,
  type QuestionProps
} from "@/domain/forum/enterprise/entities/question.entity"

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: "Example title",
    content: "Example content",
    ...override
  })

  return question
}
