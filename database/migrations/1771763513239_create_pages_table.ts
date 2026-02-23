import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('slug').unique().notNullable()
      table.string('path').unique().notNullable()

      table.string('title').notNullable()
      table.text('content').notNullable()
      table.integer('type').defaultTo(0)
      table.integer('order').notNullable().defaultTo(0)

      table.integer('parent_id')
      table.integer('user_id')

      table.foreign('parent_id').references('id').inTable('pages').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.boolean('is_published').notNullable().defaultTo(false)
      table.timestamp('published_at').nullable()

      table.index(['path'])
      table.index(['parent_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
