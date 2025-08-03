import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'policies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.string('plan_name').notNullable()
      table.string('policy_number').notNullable().unique()
      table.date('expiry_date').notNullable()
      table.enum('status', ['active', 'inactive', 'expired']).defaultTo('active').notNullable()
      table.text('coverage').notNullable()
      table.decimal('deductible', 10, 2).notNullable()
      table.string('currency', 3).defaultTo('USD').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
} 