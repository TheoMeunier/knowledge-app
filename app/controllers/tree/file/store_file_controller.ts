// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import File from '#models/file'

export default class StoreFileController {
  static validator = vine.compile(
    vine.object({
      title: vine.string().minLength(3).maxLength(255),
      folderId: vine.number(),
    })
  )

  async store({ request, auth, response }: HttpContext) {
    const { title, folderId } = await request.validateUsing(StoreFileController.validator)

    const markdownDefaultValue = 'Default Value'

    const file = await File.create({
      title: title,
      folderId: folderId,
      content: markdownDefaultValue,
      userId: auth.user!.id,
    })

    return response.redirect().toRoute(`/file/${file.id}/edit`)
  }
}
