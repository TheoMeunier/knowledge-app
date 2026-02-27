import { HttpContext } from '@adonisjs/core/http'
import Folder from '#models/folder'

export default class ListFolderController {
  async render({ inertia }: HttpContext) {
    const { rows: folderRows } = await Folder.query().knexQuery.client.raw(`
      WITH RECURSIVE folder_tree AS (
        SELECT * FROM folders WHERE parent_id IS NULL
        UNION ALL
        SELECT f.* FROM folders f
                          INNER JOIN folder_tree ft ON f.parent_id = ft.id
      )
      SELECT * FROM folder_tree
    `)

    const { rows: fileRows } = await Folder.query().knexQuery.client.raw(`
      SELECT * FROM files
    `)

    const folders = this.buildTreeFromFlat(folderRows, fileRows)
    return inertia.render('tree/list', { folders })
  }

  private buildTreeFromFlat(
    folderRows: any[],
    fileRows: any[],
    parentId: number | null = null
  ): any[] {
    return folderRows
      .filter((row) => row.parent_id === parentId)
      .map((row) => ({
        ...row,
        folders: this.buildTreeFromFlat(folderRows, fileRows, row.id),
        files: fileRows.filter((file) => file.folder_id === row.id),
      }))
  }
}
