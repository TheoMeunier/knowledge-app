import { FolderItem } from '@/types/tree.type'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar'
import { ChevronRight, File, Folder } from 'lucide-react'
import { Link, usePage } from '@inertiajs/react'
import ShareLayout from '@/components/layouts/share-layout'

interface ListCollapsibleProps {
  folders: FolderItem[]
  share: {
    id: number
    token: string
    folder_path: string
  }
}

export default function ListCollapsible({ folders, share }: ListCollapsibleProps) {
  return (
    <ShareLayout>
      <div className="my-5">
        <h1 className="scroll-m-20 text-primary pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          /{share.folder_path}
        </h1>
      </div>
      <div>
        {folders.map((folder, index) => (
          <TreeShare item={folder} key={index} share={share} />
        ))}
      </div>
    </ShareLayout>
  )
}

interface TreeShareProps {
  item: FolderItem
  share: {
    id: number
    token: string
    folder_path: string
  }
}

export function TreeShare({ item, share }: TreeShareProps) {
  const { url } = usePage()

  const isActive = (folder: typeof item): boolean => {
    if (
      folder.files?.some((file) =>
        url.startsWith(`/shares/${share.token}/${share.folder_path}/${file.slug}`)
      )
    )
      return true
    return !!folder.folders?.some((sub) => isActive(sub))
  }

  const hasActiveChild = isActive(item)

  const buildUrl = (...parts: string[]) =>
    '/' +
    parts
      .map((p) => p.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/')

  return (
    <Collapsible
      className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      defaultOpen={hasActiveChild}
    >
      <div className="flex items-center">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="flex-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <ChevronRight className="transition-transform size-4 shrink-0" />
              <Folder className="size-4 shrink-0" />
              <span className="truncate">{item.path}</span>
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <SidebarMenuSub className="mr-0 pr-0">
          {item.folders?.map((folder, index) => (
            <TreeShare key={index} item={folder} share={share} />
          ))}

          {item.files?.map((file, index) => (
            <SidebarMenuItem key={`file-${index}`} className="flex items-center group/file">
              <SidebarMenuButton
                data-active={url.startsWith(
                  `/shares/${share.token}/${share.folder_path}/${file.slug}`
                )}
                className="flex-1 min-w-0 data-[active=true]:bg-accent data-[active=true]:text-primary data-[active=true]:font-medium"
              >
                <Link
                  href={buildUrl('shares', share.token, share.folder_path, file.slug)}
                  className="flex items-center gap-2 min-w-0 w-full"
                >
                  <File className="size-4 shrink-0" />
                  <span className="truncate">{file.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}
