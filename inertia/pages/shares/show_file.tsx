import ShareLayout from '@/components/layouts/share-layout'
import { Head, Link, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { SharePageProps } from '@/components/layouts/sidebar/share-sidebar'

interface FileProps {
  file: {
    id: number
    title: string
    slug: string
    content: string
    createdAt: string
  }
  pagination: {
    prev_slug: string
    next_slug: string
  }
}

export default function ShowFile({ file, pagination }: FileProps) {
  const { props } = usePage<SharePageProps>()
  const share = props.tree_share.share

  return (
    <ShareLayout>
      <Head title={file.title} />

      <div className="article">
        <div className="flex justify-between items-center mb-5">
          <h1 className="scroll-m-20 text-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {file.title}
          </h1>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: file.content }}></div>

        <Separator className="my-5" />

        <div className="flex justify-between items-center mt-5">
          <div>
            {pagination.prev_slug && (
              <Link href={`/shares/${share.token}/${share.folder_path}/${pagination.prev_slug}`}>
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              </Link>
            )}
          </div>
          <div>
            {pagination.next_slug && (
              <Link href={`/shares/${share.token}/${share.folder_path}/${pagination.next_slug}`}>
                <Button variant="outline">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </ShareLayout>
  )
}
