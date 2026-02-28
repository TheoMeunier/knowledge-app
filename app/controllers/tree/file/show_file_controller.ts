import { HttpContext } from '@adonisjs/core/http'
import File from '#models/file'
import FileDto from '../../../dtos/file_dto.js'
import MarkdownService from '#services/markdown_service'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class ShowFileController {
  constructor(private markdownService: MarkdownService) {}

  async render({ params, inertia }: HttpContext) {
    const [file, pagination] = await Promise.all([
      this.findFile(params.slug),
      this.findPagination(params.slug),
    ])

    return inertia.render('file/show', { file, pagination })
  }

  private async findFile(slug: string) {
    const model = await File.findByOrFail('slug', slug)
    return await FileDto.fromModel(model, this.markdownService)
  }

  private async findPagination(slug: string) {
    const result = await db.rawQuery(
      `
    SELECT prev_slug, slug, next_slug FROM (
      SELECT
        LAG(slug) OVER (PARTITION BY folder_id ORDER BY "order") AS prev_slug,
        slug,
        LEAD(slug) OVER (PARTITION BY folder_id ORDER BY "order") AS next_slug
      FROM files
    ) t
    WHERE slug = ?
  `,
      [slug]
    )

    return result.rows[0]
  }
}
