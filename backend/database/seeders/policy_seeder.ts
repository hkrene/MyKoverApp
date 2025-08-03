import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Policy from '#models/policy'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Get all users to assign policies to
    const users = await User.all()
    
    for (const user of users) {
      await Policy.createMany([
        {
          userId: user.id,
          planName: 'Plan Santé Basique',
          policyNumber: `ASS-${user.id}000001`,
          expiryDate: DateTime.fromISO('2026-03-01'),
          status: 'active',
          coverage: 'Médical, Dentaire, Vision',
          deductible: 500.00,
          currency: 'USD',
        },
        {
          userId: user.id,
          planName: 'Plan Santé Premium',
          policyNumber: `ASS-${user.id}000002`,
          expiryDate: DateTime.fromISO('2026-06-15'),
          status: 'active',
          coverage: 'Médical, Dentaire, Vision, Chirurgie, Rééducation',
          deductible: 250.00,
          currency: 'USD',
        }
      ])
    }
  }
}