import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.table('users', (table) => {
      table.integer('role').defaultTo(1)
    })
  }

  async down() {
    this.schema.table('users', (table) => {
      table.dropColumn('role')
    })
  }
}
