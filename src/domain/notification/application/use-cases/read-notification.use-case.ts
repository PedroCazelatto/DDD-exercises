import type { NotificationsRepository } from "@/domain/notification/application/repositories/notifications.repository"
import { Notification } from "@/domain/notification/enterprise/entities/notification.entity"

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

interface ReadNotificationUseCaseResponse {
  notification: Notification
}

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (notification?.recipientId.toString() !== recipientId) {
      throw new Error("Not Authorized")
    }

    notification.read()

    return {
      notification: notification!
    }
  }
}
