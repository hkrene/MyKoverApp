import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SubscriptionPlan from '#models/subscription_plan'

export default class extends BaseSeeder {
  async run() {
    // Clear existing plans
    await SubscriptionPlan.query().delete()

    // Create subscription plans
    await SubscriptionPlan.createMany([
      {
        name: 'Starter',
        description: 'Plan de base pour les besoins essentiels',
        price: 5.00,
        currency: 'USD',
        duration: 1,
        features: JSON.stringify([
          'Couverture médicale de base',
          'Consultations générales',
          'Médicaments essentiels',
          'Support client par email'
        ]),
        isActive: true
      },
      {
        name: 'Libota Plus',
        description: 'Plan intermédiaire avec plus de couverture',
        price: 18.00,
        currency: 'USD',
        duration: 1,
        features: JSON.stringify([
          'Toutes les fonctionnalités Starter',
          'Couverture médicale étendue',
          'Consultations spécialisées',
          'Médicaments complets',
          'Support client prioritaire',
          'Couverture dentaire de base',
          'Couverture optique de base'
        ]),
        isActive: true
      },
      {
        name: 'Premium',
        description: 'Plan premium avec couverture complète',
        price: 50.00,
        currency: 'USD',
        duration: 1,
        features: JSON.stringify([
          'Toutes les fonctionnalités Libota Plus',
          'Couverture médicale complète',
          'Consultations illimitées',
          'Médicaments premium',
          'Support client 24/7',
          'Couverture dentaire complète',
          'Couverture optique complète',
          'Couverture internationale',
          'Assistance d\'urgence',
          'Couverture famille'
        ]),
        isActive: true
      }
    ])

    console.log('✅ Subscription plans seeded successfully!')
  }
}