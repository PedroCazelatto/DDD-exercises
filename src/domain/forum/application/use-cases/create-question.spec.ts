import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question.use-case"
import type { Question } from "@/domain/forum/enterprise/entities/question.entity"
import type { QuestionsRepository } from "../repositories/questions.repository"

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {}
}

test("create an answer", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "New question",
    content: "Conteúdo da pergunta"
  })

  expect(question.id).toBeTruthy()
})
