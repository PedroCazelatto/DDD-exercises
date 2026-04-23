import { OnAnswerCreated } from "@/domain/forum/application/subscribers/on-answer-created.subscriber"
import { makeAnswer } from "test/factories/make-answer.factory"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository

describe("On answer created", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
  })
  it("should send a notification when an answer is created", () => {
    const _onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    inMemoryAnswersRepository.create(answer)
  })
})
