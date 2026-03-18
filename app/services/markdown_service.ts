import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import { inject } from '@adonisjs/core'
import { visit } from 'unist-util-visit'
import type { Root } from 'hast'
import ImageSignatureService from '#services/images/image_signature_service'

@inject()
export default class MarkdownService {
  constructor(private imageSignatureService: ImageSignatureService) {}

  async parse(markdown: string): Promise<string> {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(() => this.rehypeImageProxy())
      .use(rehypeShiki, { theme: 'catppuccin-macchiato' })
      .use(rehypeStringify)
      .process(markdown)

    return String(result)
  }

  private rehypeImageProxy() {
    return (tree: Root) => {
      visit(tree, 'element', (node) => {
        if (node.tagName !== 'img') return

        const src = node.properties?.src as string
        if (!src || src.startsWith('/images/')) return

        node.properties.src = this.imageSignatureService.buildUrl(src, {
          w: 900,
          q: 80,
          f: 'webp',
          fit: 'inside',
        })
      })
    }
  }
}
