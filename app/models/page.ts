import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Page extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parentId: string | null

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare path: string

  @column()
  declare content: Record<string, any> | null

  @column()
  declare type: 'folder' | 'page'

  @column()
  declare order: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
