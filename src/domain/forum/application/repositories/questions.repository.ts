import type { Question } from "@/domain/forum/enterprise/entities/question.entity"

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(questionId: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
}
