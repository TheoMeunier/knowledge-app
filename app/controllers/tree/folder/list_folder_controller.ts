import { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder'

export default class ListFolderController {
  async render({ inertia }: HttpContext) {
    const folders = await Folder.query().preload('folders').preload('files')
    return inertia.render('tree/list', { folders })
  }
}
