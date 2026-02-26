import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Folder from '#models/folder'

export default class StoreFolderController {
  static validator = vine.compile(
    vine.object({
      path: vine.string().minLength(3).maxLength(255),
      parentId: vine.number(),
    })
  )

  async store({ request, response }: HttpContext) {
    const { path, parentId } = await request.validateUsing(StoreFolderController.validator)

    await Folder.create({
      path: path,
      parentId: parentId,
    })

    return response.redirect().toPath('/folders/list')
  }
}
