import type { Answer } from "../entities/answer.entity"

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
