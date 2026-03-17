// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import Image from '#models/image'
import { v4 as uuidv4 } from 'uuid'
import vine from '@vinejs/vine'

export default class UploadImagesController {
  static validator = vine.compile(
    vine.object({
      file: vine.file({
        extnames: ['jpg', 'png', 'jpeg'],
        size: '2mb',
      }),
    })
  )

  async upload({ request, response, session }: HttpContext) {
    const { file } = await request.validateUsing(UploadImagesController.validator)

    if (!file) return response.badRequest('Invalid file')

    const fileName = `${string.uuid()}.${file.extname}`

    await Promise.all([
      file.moveToDisk(`/uploads/${fileName}`),
      Image.create({
        id: uuidv4(),
        url: fileName,
      }),
    ])

    session.flash('success', 'File uploaded successfully')
    session.flash('share', `/uploads/${fileName}`)

    return response.redirect().back()
  }
}
