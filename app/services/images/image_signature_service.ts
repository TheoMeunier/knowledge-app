import { inject } from '@adonisjs/core'
import { createHmac } from 'node:crypto'
import env from '#start/env'

@inject()
export default class ImageSignatureService {
  private readonly secret = env.get('IMAGE_PROXY_SECRET') ?? 'secret-key'

  sign(params: Record<string, string | number | undefined>): string {
    const payload = this.buildPayload(params)
    return createHmac('sha256', this.secret).update(payload).digest('hex')
  }

  verify(params: Record<string, string | number | undefined>, signature: string): boolean {
    const expected = this.sign(params)
    return this.safeCompare(expected, signature)
  }

  buildUrl(
    src: string,
    options: { w?: number; h?: number; q?: number; f?: string; fit?: string } = {}
  ): string {
    const cleanSrc = src.replace(/^\//, '')
    const params = { src: cleanSrc, ...options }
    const sig = this.sign(params)

    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries({
          w: options.w,
          h: options.h,
          q: options.q,
          f: options.f,
          fit: options.fit,
          sig,
        })
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    )

    return `/images/${cleanSrc}?${query}`
  }

  private buildPayload(params: Record<string, string | number | undefined>): string {
    return Object.keys(params)
      .filter((k) => k !== 'sig' && params[k] !== undefined)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join('&')
  }

  private safeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false
    let diff = 0
    for (let i = 0; i < a.length; i++) {
      diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
    }
    return diff === 0
  }
}
