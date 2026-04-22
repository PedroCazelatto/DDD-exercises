import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification.use-case"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications.repository"

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe("Send notifications", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })
  it("should be able to send a notification", async () => {
    const { notification } = await sut.execute({
      recipientId: "1",
      title: "Nova notificação",
      content: "Conteúdo da notificação"
    })

    expect(notification.id).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0]?.id).toEqual(
      notification.id
    )
  })
})
