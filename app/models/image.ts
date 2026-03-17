import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare url: string
}
