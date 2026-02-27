import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import { inject } from '@adonisjs/core'

@inject()
export default class MarkdownService {
  async parse(markdown: string): Promise<string> {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeShiki, { theme: 'catppuccin-mocha' })
      .use(rehypeStringify)
      .process(markdown)

    return String(result)
  }
}
