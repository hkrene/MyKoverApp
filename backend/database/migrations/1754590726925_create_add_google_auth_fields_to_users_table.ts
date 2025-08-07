import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Add Google authentication fields
      table.string('google_id').nullable().unique()
      table.string('google_email').nullable()
      
      // Make email and phone_number nullable for Google auth users
      table.string('email', 254).nullable().alter()
      table.string('phone_number').nullable().alter()
      table.string('password').nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remove Google authentication fields
      table.dropColumn('google_id')
      table.dropColumn('google_email')
      
      // Revert email and phone_number to not nullable
      table.string('email', 254).notNullable().alter()
      table.string('phone_number').notNullable().alter()
      table.string('password').notNullable().alter()
    })
  }
}