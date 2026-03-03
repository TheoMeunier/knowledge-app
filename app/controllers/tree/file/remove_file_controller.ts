import { HttpContext } from '@adonisjs/core/http'
import File from '#models/file'

export default class RemoveFileController {
  async remove({ request, response, session }: HttpContext) {
    const file = await File.findByOrFail('id', request.param('id'))
    await file.delete()

    session.flash('success', 'File remove with successfully')
    return response.redirect().toRoute('home')
  }
}
