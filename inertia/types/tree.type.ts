export interface FolderItem {
  id: number
  path: string
  parentId?: number
  files: FileItem[]
  folders: FolderItem[]
}

export interface FileItem {
  id: number
  title: string
  slug: string
  order: number
  folderId: number
}
