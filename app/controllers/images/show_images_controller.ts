// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ImageTransformService from '#services/images/image_transform_service'
import ImageSignatureService from '#services/images/image_signature_service'

@inject()
export default class ShowImagesController {
  constructor(
    private imageTransformService: ImageTransformService,
    private imageSignatureService: ImageSignatureService
  ) {}

  async show({ request, response }: HttpContext) {
    const src = request.params()['*'].join('/')
    const width = Number(request.input('w')) || undefined
    const height = Number(request.input('h')) || undefined
    const quality = Number(request.input('q')) || undefined
    const format = request.input('f', 'webp')
    const fit = request.input('fit', 'cover')
    const sig = request.input('sig')

    const isValid = this.imageSignatureService.verify(
      { src, w: width, h: height, q: quality, f: format, fit },
      sig
    )

    if (!isValid) {
      return response.unauthorized({ error: 'Invalid signature' })
    }

    try {
      const { buffer, mimeType, cacheHit } = await this.imageTransformService.transform({
        src,
        width,
        height,
        quality,
        format,
        fit,
      })

      response.header('Content-Type', mimeType)
      response.header('X-Cache', cacheHit ? 'HIT' : 'MISS')
      response.header('Cache-Control', 'public, max-age=31536000, immutable')

      return response.send(buffer)
    } catch (error) {
      if (error.code === 'ENOENT') {
        return response.notFound({ error: 'Image not found' })
      }
      return response.internalServerError({ error: 'Transform failed' })
    }
  }
}
