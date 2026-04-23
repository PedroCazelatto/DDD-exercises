import { UniqueEntityId } from "@/core/entities/unique-entity-id.value-object"
import type { NotificationsRepository } from "@/domain/notification/application/repositories/notifications.repository"
import { Notification } from "@/domain/notification/enterprise/entities/notification.entity"

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export interface SendNotificationUseCaseResponse {
  notification: Notification
}

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content
    })

    await this.notificationsRepository.create(notification)

    return {
      notification
    }
  }
}
