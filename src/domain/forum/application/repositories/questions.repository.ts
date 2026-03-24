import type { Question } from "@/domain/forum/enterprise/entities/question.entity"

export interface QuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}
