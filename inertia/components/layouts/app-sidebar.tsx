import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  LibraryBig,
} from 'lucide-react'
import { FragmentLoader } from '@/components/load_fragment'

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center justify-center py-5 gap-3">
        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
          <LibraryBig className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold">Knowledge</h1>
      </SidebarHeader>
      <FragmentLoader source={"folders/list"} />
      <SidebarRail />
    </Sidebar>
  )
}


