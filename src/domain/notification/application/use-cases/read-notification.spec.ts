import { UniqueEntityId } from "@/core/entities/unique-entity-id.value-object"
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification.use-case"
import { makeNotification } from "test/factories/make-notification.factory"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications.repository"

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe("Read notifications", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it("should be able to read a notification", async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString()
    })

    expect(result.notification.id).toBeTruthy()
    expect(inMemoryNotificationsRepository.items[0]?.readAt).toEqual(
      expect.any(Date)
    )
  })

  it("should not be able to read a notification from another user", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId("recipient-1")
    })

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: "recipient-2"
    })

    expect(result).toBeInstanceOf(Error)
  })
})
