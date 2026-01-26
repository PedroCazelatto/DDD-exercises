import { expect, test } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question.use-case"

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = await answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content: "Nova resposta"
  })

  expect(answer.content).toEqual("Nova resposta")
})
