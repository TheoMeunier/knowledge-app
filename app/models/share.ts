import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Folder from '#models/folder'

export default class Share extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'folder_id' })
  declare folderId: number

  @column()
  declare token: string

  @column({ columnName: 'expired_at' })
  declare expiredAt: DateTime

  @belongsTo(() => Folder, { foreignKey: 'folderId' })
  declare folder: BelongsTo<typeof Folder>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
