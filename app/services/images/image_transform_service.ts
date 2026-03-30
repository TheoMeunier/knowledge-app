import { inject } from '@adonisjs/core'
import sharp, { type FitEnum } from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import drive from '@adonisjs/drive/services/main'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import env from '#start/env'

export type SupportedFormat = 'webp' | 'png' | 'jpeg' | 'avif'
export type SupportedFit = keyof FitEnum

export interface TransformOptions {
  src: string
  width?: number
  height?: number
  quality?: number
  format?: SupportedFormat
  fit?: SupportedFit
}

export interface TransformResult {
  buffer: Buffer
  mimeType: string
  cacheHit: boolean
}

const MIME_TYPES: Record<SupportedFormat, string> = {
  webp: 'image/webp',
  png: 'image/png',
  jpeg: 'image/jpeg',
  avif: 'image/avif',
}

const FIT_MAP: Record<string, keyof FitEnum> = {
  cover: 'cover',
  contain: 'contain',
  fill: 'fill',
  inside: 'inside',
  outside: 'outside',
}

@inject()
export default class ImageTransformService {
  private readonly cacheDir = './storage/.cache/images'
  private readonly driverDisk = env.get('DRIVE_DISK') ?? 'secret-key'

  async transform(options: TransformOptions): Promise<TransformResult> {
    const { src, width, height, quality = 80, format = 'webp', fit = 'cover' } = options

    const cacheKey = this.buildCacheKey(src, width, height, quality, format, fit)
    const cachePath = join(this.cacheDir, `${cacheKey}.${format}`)
    const mimeType = MIME_TYPES[format]

    if (existsSync(cachePath)) {
      return { buffer: await readFile(cachePath), mimeType, cacheHit: true }
    }

    const original = await this.fetchFromDrive(src)
    const buffer = await this.applyTransform(original, { width, height, quality, format, fit })

    await this.saveToCache(cachePath, buffer)

    return { buffer, mimeType, cacheHit: false }
  }

  private buildCacheKey(
    src: string,
    width?: number,
    height?: number,
    quality?: number,
    format?: string,
    fit?: string
  ): string {
    return createHash('md5')
      .update(`${src}-${width}-${height}-${quality}-${format}-${fit}`)
      .digest('hex')
  }

  private async fetchFromDrive(src: string): Promise<Buffer> {
    const stream = await drive.use(this.driverDisk).getStream(src)
    const chunks: Buffer[] = []
    for await (const chunk of stream) chunks.push(Buffer.from(chunk))
    return Buffer.concat(chunks)
  }

  private async applyTransform(
    original: Buffer,
    options: {
      width?: number
      height?: number
      quality?: number
      format?: SupportedFormat
      fit?: SupportedFit
    }
  ): Promise<Buffer> {
    const { width, height, quality = 80, format = 'webp', fit = 'cover' } = options
    const fitValue = FIT_MAP[fit] ?? 'cover'

    let pipeline = sharp(original)

    if (width || height) {
      pipeline = pipeline.resize(width ?? null, height ?? null, {
        fit: fitValue,
        withoutEnlargement: true,
        position: 'attention',
      })
    }

    switch (format) {
      case 'webp':
        return pipeline.webp({ quality }).toBuffer()
      case 'avif':
        return pipeline.avif({ quality }).toBuffer()
      case 'jpeg':
        return pipeline.jpeg({ quality }).toBuffer()
      case 'png':
        return pipeline.png({ quality }).toBuffer()
      default:
        return pipeline.webp({ quality }).toBuffer()
    }
  }

  private async saveToCache(cachePath: string, buffer: Buffer): Promise<void> {
    await mkdir(this.cacheDir, { recursive: true })
    await writeFile(cachePath, buffer)
  }
}
