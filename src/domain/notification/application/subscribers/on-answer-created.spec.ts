import { OnAnswerCreated } from "@/domain/forum/application/subscribers/on-answer-created.subscriber"
import {
  SendNotificationUseCase,
  type SendNotificationUseCaseRequest,
  type SendNotificationUseCaseResponse
} from "@/domain/notification/application/use-cases/send-notification.use-case"
import { makeAnswer } from "test/factories/make-answer.factory"
import { makeQuestion } from "test/factories/make-question.factory"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications.repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments.repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { waitFor } from "test/utils/wait-for.utils"
import { type Mock } from "vitest"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: Mock<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>

describe("On answer created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    )
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute")

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })
  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
