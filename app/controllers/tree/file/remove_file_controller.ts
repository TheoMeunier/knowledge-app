// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import File from '#models/file'

export default class RemoveFileController {
  async remove({ request, response }: HttpContext) {
    const file = await File.findByOrFail('id', request.param('id'))
    await file.delete()

    return response.redirect().toRoute('tree.folders.list')
  }
}
