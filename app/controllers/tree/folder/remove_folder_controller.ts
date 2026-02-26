// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder'

export default class RemoveFolderController {
  async remove({ request, response, session }: HttpContext) {
    const folder = await Folder.findByOrFail('id', request.param('id'))
    await folder.delete()

    session.flash('success', 'Folder remove with successfully')
    return response.redirect().back()
  }
}
