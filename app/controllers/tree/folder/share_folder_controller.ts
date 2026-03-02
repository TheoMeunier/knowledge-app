import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Share from '#models/share'
import string from '@adonisjs/core/helpers/string'
import env from '#start/env'
import Folder from '#models/folder'

export default class ShareFolderController {
  static validator = vine.compile(
    vine.object({
      folderId: vine.number(),
    })
  )

  async share({ request, response, session }: HttpContext) {
    const { folderId } = await request.validateUsing(ShareFolderController.validator)

    const folder = await Folder.findOrFail(folderId)

    const share = await Share.create({
      folderId: folderId,
      token: string.random(24),
    })

    session.flash('success', 'Share created with successfully')
    session.flash('share', `${env.get('APP_URL')}/shares/${share.token}/${folder.path}`)

    return response.redirect().back()
  }
}
