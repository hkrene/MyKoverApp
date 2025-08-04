import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SubscriptionPlan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare currency: string

  @column()
  declare duration: number // in months

  @column()
  declare features: string // JSON string of features

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Helper method to get plan by name
  static async getByName(name: string) {
    return await this.query().where('name', name).where('isActive', true).first()
  }

  // Helper method to get all active plans
  static async getActivePlans() {
    return await this.query().where('isActive', true).orderBy('price', 'asc')
  }
} 