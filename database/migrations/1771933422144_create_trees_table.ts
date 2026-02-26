import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected folderTable = 'folders'
  protected fileTable = 'files'

  async up() {
    this.schema.createTable(this.folderTable, (table) => {
      table.increments('id')

      table.string('path').unique().notNullable()

      table.integer('parent_id').nullable()
      table.foreign('parent_id').references('id').inTable('folders').onDelete('CASCADE')
    })

    this.schema.createTable(this.fileTable, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('slug').unique().notNullable()
      table.text('content').notNullable()

      table.integer('order').notNullable().defaultTo(0)

      table.integer('folder_id').notNullable()
      table.foreign('folder_id').references('id').inTable('folders').onDelete('CASCADE')

      table.integer('user_id').notNullable()
      table.foreign('user_id').references('id').inTable('users')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.folderTable)
    this.schema.dropTable(this.fileTable)
  }
}
