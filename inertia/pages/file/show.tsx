import AppLayouts from '@/components/layouts/app-layouts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react'

interface FileProps {
  file: {
    id: number
    title: string
    slug: string
    content: string
    createdAt: string
  }
}

export default function ShowFile({ file }: FileProps) {
  return (
    <AppLayouts>
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
      </div>
    </AppLayouts>
  )
}
