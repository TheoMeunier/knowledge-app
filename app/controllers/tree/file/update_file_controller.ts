// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import File from '#models/file'

export default class UpdateFileController {
  static validator = vine.compile(
    vine.object({
      content: vine.string().minLength(3),
    })
  )

  async render({ params, inertia }: HttpContext) {
    const file = await File.findByOrFail('id', params.id)

    return inertia.render('file/update', {
      file,
    })
  }

  async upgrade({ request, response, session }: HttpContext) {
    const { content } = await request.validateUsing(UpdateFileController.validator)

    const file = await File.findByOrFail('id', request.param('id'))
    file.content = content
    await file.save()

    session.flash('success', 'Update file successfully')
    return response.redirect().back()
  }
}
