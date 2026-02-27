import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar'
import { ChevronRight, Ellipsis, File, FilePlus, Folder, FolderPlus, SquarePen, Trash2, } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import CreateFileDialog from '@/features/tree/create-file-dialog'
import CreateFolderDialog from '@/features/tree/create-folder-dialog'
import DeleteObjectTree from '@/features/tree/delete-tree-dialog'
import { FolderItem } from '@/types/tree.type'
import { Link, usePage } from '@inertiajs/react'

interface TreeListProps {
  folders: FolderItem[]
}

export default function TreeList({ folders }: TreeListProps) {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="flex justify-between">Tree</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {folders.map((item, index) => (
              <Tree key={index} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

interface TreeProps {
  item: FolderItem
}

function Tree({ item }: TreeProps) {
  const { url } = usePage()

  const isActive = (folder: typeof item): boolean => {
    if (folder.files?.some((file) => url.startsWith(`/file/${file.slug}`))) return true
    return !!folder.folders?.some((sub) => isActive(sub))
  }

  const hasActiveChild = isActive(item)

  if (!item.folders) {
    return (
      <>
        {item.files?.map((file, index) => (
          <SidebarMenuItem key={index} className="flex items-center group/file">
            <SidebarMenuButton
<<<<<<< HEAD
              data-active={url === `/file/${file.slug}`}
=======
              data-active={url.startsWith(`/file/${file.slug}`)}
>>>>>>> 9599830 (feat: active item in sidebar tree)
              className="flex-1 data-[active=true]:bg-accent data-[active=true]:text-primary data-[active=true]:font-medium"
            >
              <div className="flex items-center gap-2">
                <File className="size-4" />
                {file.title}
              </div>
            </SidebarMenuButton>
            <div className="opacity-0 group-hover/file:opacity-100 transition-opacity">
              <TreeAction itemId={file.id} folder={false} path={file.slug} parentId={item.id} />
            </div>
          </SidebarMenuItem>
        ))}
      </>
    )
  }

  return (
    <SidebarMenuItem className="group/folder">
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={hasActiveChild}
      >
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="flex-1">
              <div className="flex items-center gap-2">
                <ChevronRight className="transition-transform size-4" />
                <Folder className="size-4" />
                {item.path}
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <div className="opacity-0 group-hover/folder:opacity-100 transition-opacity">
            <TreeAction itemId={item.id} folder={true} path={item.path} parentId={item.id} />
          </div>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.folders.map((folder, index) => (
              <Tree key={index} item={folder} />
            ))}

            {item.files?.map((file, index) => (
              <SidebarMenuItem key={`file-${index}`} className="flex items-center group/file">
                <SidebarMenuButton
<<<<<<< HEAD
                  data-active={url === `/file/${file.slug}`}
=======
                  data-active={url.startsWith(`/file/${file.slug}`)}
>>>>>>> 9599830 (feat: active item in sidebar tree)
                  className="flex-1 data-[active=true]:bg-accent data-[active=true]:text-primary data-[active=true]:font-medium"
                >
                  <Link href={`/file/${file.slug}`}>
                    <div className="flex items-center gap-2">
                      <File className="size-4" />
                      {file.title}
                    </div>
                  </Link>
                </SidebarMenuButton>
                <div className="opacity-0 group-hover/file:opacity-100 transition-opacity">
                  <TreeAction itemId={file.id} folder={false} path={file.slug} parentId={item.id} />
                </div>
              </SidebarMenuItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function TreeAction({
  itemId,
  folder,
  path,
  parentId,
}: {
  itemId: number
  folder: boolean
  path?: string
  parentId?: number
}) {
  const [openCreate, setOpenCreate] = useState(false)
  const [openCreateFolder, setOpenCreateFolder] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-6">
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {folder && (
            <DropdownMenuGroup>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setOpenCreateFolder(true)
                }}
              >
                <FolderPlus />
                Create Folder
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setOpenCreate(true)
                }}
              >
                <FilePlus />
                Create Page
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
          {path !== '/' && (
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/file/${path}/edit`} className="flex items-center gap-2">
                  <SquarePen />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  setOpenDelete(true)
                }}
                variant={'destructive'}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateFileDialog folderId={parentId} open={openCreate} onOpenChange={setOpenCreate} />
      <CreateFolderDialog
        parentId={parentId}
        open={openCreateFolder}
        onOpenChange={setOpenCreateFolder}
      />
      <DeleteObjectTree id={itemId} open={openDelete} onOpenChange={setOpenDelete} />
    </>
  )
}
