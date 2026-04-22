import { UniqueEntityId } from "@/core/entities/unique-entity-id.value-object"
import type { QuestionsRepository } from "@/domain/forum/application/repositories/questions.repository"
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list.entity"
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment.entity"
import { Question } from "@/domain/forum/enterprise/entities/question.entity"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content
    })

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return {
      question
    }
  }
}
