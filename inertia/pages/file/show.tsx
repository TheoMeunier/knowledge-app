import AppLayouts from '@/components/layouts/app-layouts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Head, Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight, EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

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
  return (
    <AppLayouts>
      <Head title={file.title} />

      <div className="article">
        <div className="flex justify-between items-center mb-5">
          <h1 className="scroll-m-20 text-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {file.title}
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={`/file/${file.slug}/edit`} className="flex items-center gap-2">
                    <SquarePen />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: file.content }}></div>

        <Separator className="my-5" />

        <div className="flex justify-between items-center mt-5">
          <div>
            {pagination.prev_slug && (
              <Link href={`/file/${pagination.prev_slug}`}>
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              </Link>
            )}
          </div>
          <div>
            {pagination.next_slug && (
              <Link href={`/file/${pagination.next_slug}`}>
                <Button variant="outline">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </AppLayouts>
  )
}
