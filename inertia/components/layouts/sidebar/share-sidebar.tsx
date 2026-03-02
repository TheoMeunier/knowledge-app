import { Sidebar, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { LibraryBig } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { TreeShare } from '@/pages/shares/list_collapsible'
import { FolderItem } from '@/types/tree.type'

export interface SharePageProps {
  tree_share: {
    folders: FolderItem[]
    share: {
      id: number
      token: string
      folder_path: string
    }
  }
  [key: string]: unknown
}

export default function ShareSidebar() {
  const { props } = usePage<SharePageProps>()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center justify-center py-5 gap-3">
        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
          <LibraryBig className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold">Knowledge</h1>
      </SidebarHeader>
      <TreeShare item={props.tree_share} share={props.tree_share.share!!} />
      <SidebarRail />
    </Sidebar>
  )
}
