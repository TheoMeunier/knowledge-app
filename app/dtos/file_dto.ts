import File from '#models/file'
import MarkdownService from '#services/markdown_service'

export default class FileDto {
  declare id: number
  declare title: string
  declare slug: string
  declare content: string
  declare createdAt: string

  constructor(data: {
    id: number
    title: string
    slug: string
    content: string
    createdAt: string
  }) {
    this.id = data.id
    this.title = data.title
    this.slug = data.title
    this.content = data.content
    this.createdAt = data.createdAt
  }

  static async fromModel(file: File, markdownService: MarkdownService): Promise<FileDto> {
    return new FileDto({
      id: file.id,
      title: file.title,
      slug: file.slug,
      content: await markdownService.parse(file.content),
      createdAt: file.createdAt.toFormat('dd/MM/yyyy'),
    })
  }
}
