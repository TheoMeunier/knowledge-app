import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import File from '#models/file'

export default class Folder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare path: string

  @column()
  declare parentId: number | null

  @hasMany(() => Folder, { foreignKey: 'parentId' })
  declare children: HasMany<typeof Folder>

  @belongsTo(() => Folder, { foreignKey: 'parentId' })
  declare parent: BelongsTo<typeof Folder>

  @hasMany(() => File, {
    foreignKey: 'folderId',
  })
  declare files: HasMany<typeof File>
}
