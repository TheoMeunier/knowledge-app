import { HttpContext } from '@adonisjs/core/http'
import File from '#models/file'
import FileDto from '../../../dtos/file_dto.js'
import MarkdownService from '#services/markdown_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ShowFileController {
  constructor(private markdownService: MarkdownService) {}

  async render({ params, inertia }: HttpContext) {
    const model = await File.findByOrFail('slug', params.slug)
    const file = await FileDto.fromModel(model, this.markdownService)

    return inertia.render('file/show', { file })
  }
}
