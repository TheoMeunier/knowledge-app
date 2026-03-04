import { HttpContext } from '@adonisjs/core/http'
import Share from '#models/share'
import Folder from '#models/folder'
import ShareDto from '../../../dtos/shares/share_dto.js'

export default class ListFolderShareController {
  async render({ request, inertia }: HttpContext) {
    const token = request.param('token')

    const share = await Share.query().where('token', token).preload('folder').firstOrFail()
    const folders = await this.getItems(share.folder.id!!)

    return inertia.render('shares/list_collapsible', {
      folders: folders,
      share: await ShareDto.fromModel(share.id, share.token, share.folder.path),
    })
  }

  private async getItems(folderId: number) {
    const folderRows = await Folder.query().knexQuery.client.raw(
      `
    WITH RECURSIVE folder_tree AS (
      SELECT * FROM folders WHERE id = ?
      UNION ALL
      SELECT f.* FROM folders f
      INNER JOIN folder_tree ft ON f.parent_id = ft.id
    )
    SELECT * FROM folder_tree
    `,
      [folderId]
    )

    const folderIds = folderRows.rows.map((f: any) => f.id)

    if (folderIds.length === 0) {
      return []
    }

    const fileRows = await Folder.query().knexQuery.client.raw(
      `SELECT * FROM files WHERE folder_id = ANY(?)`,
      [folderIds]
    )

    return [this.buildTreeNode(folderId, folderRows.rows, fileRows.rows)]
  }

  private buildTreeNode(folderId: number, folderRows: any[], fileRows: any[]): any {
    const folder = folderRows.find((f) => f.id === folderId)

    if (!folder) {
      return null
    }

    const children = folderRows.filter((f) => f.parent_id === folderId)

    return {
      ...folder,
      folders: children
        .map((child) => this.buildTreeNode(child.id, folderRows, fileRows))
        .filter(Boolean),
      files: fileRows.filter((file) => file.folder_id === folderId),
    }
  }
}
