import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Policy from '#models/policy'

export default class ProfileController {
  async getProfile({ auth, response }: HttpContext) {
    try {
      // Try to authenticate using the API guard
      const user = await auth.use('api').authenticate()
      
      // Get user's active policy
      const activePolicy = await Policy.query()
        .where('userId', user.id)
        .where('status', 'active')
        .first()

      return response.ok({
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          avatar: `https://i.pravatar.cc/150?img=${user.id}`,
        },
        policy: activePolicy ? {
          planName: activePolicy.planName,
          policyNumber: activePolicy.policyNumber,
          expiryDate: activePolicy.expiryDate.toFormat('yyyy-MM-dd'),
          status: activePolicy.status === 'active' ? 'Actif' : 'Inactif',
          coverage: activePolicy.coverage,
          deductible: `${activePolicy.deductible} ${activePolicy.currency}`,
        } : null
      })
    } catch (error) {
      console.error('GET PROFILE ERROR', error)
      return response.unauthorized({
        message: 'Utilisateur non authentifié'
      })
    }
  }

  async getTestProfile({ response }: HttpContext) {
    try {
      // Get the first user for testing
      const user = await User.first()
      
      if (!user) {
        return response.notFound({
          message: 'Aucun utilisateur trouvé'
        })
      }

      // Get user's active policy
      const activePolicy = await Policy.query()
        .where('userId', user.id)
        .where('status', 'active')
        .first()

      return response.ok({
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          avatar: `https://i.pravatar.cc/150?img=${user.id}`,
        },
        policy: activePolicy ? {
          planName: activePolicy.planName,
          policyNumber: activePolicy.policyNumber,
          expiryDate: activePolicy.expiryDate.toFormat('yyyy-MM-dd'),
          status: activePolicy.status === 'active' ? 'Actif' : 'Inactif',
          coverage: activePolicy.coverage,
          deductible: `${activePolicy.deductible} ${activePolicy.currency}`,
        } : null
      })
    } catch (error) {
      console.error('GET TEST PROFILE ERROR', error)
      return response.internalServerError({
        message: 'Une erreur est survenue lors de la récupération du profil'
      })
    }
  }

  async updateProfile({ auth, request, response }: HttpContext) {
    try {
      const user = await auth.use('api').user!
      const data = request.only(['fullName', 'email', 'phoneNumber'])

      // Check if email is already taken by another user
      if (data.email && data.email !== user.email) {
        const existingUser = await User.findBy('email', data.email)
        if (existingUser && existingUser.id !== user.id) {
          return response.badRequest({
            message: 'Cette adresse email est déjà utilisée'
          })
        }
      }

      // Check if phone number is already taken by another user
      if (data.phoneNumber && data.phoneNumber !== user.phoneNumber) {
        const existingUser = await User.findBy('phoneNumber', data.phoneNumber)
        if (existingUser && existingUser.id !== user.id) {
          return response.badRequest({
            message: 'Ce numéro de téléphone est déjà utilisé'
          })
        }
      }

      user.merge(data)
      await user.save()

      return response.ok({
        message: 'Profil mis à jour avec succès',
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }
      })
    } catch (error) {
      console.error('UPDATE PROFILE ERROR', error)
      return response.internalServerError({
        message: 'Une erreur est survenue lors de la mise à jour du profil'
      })
    }
  }
} 