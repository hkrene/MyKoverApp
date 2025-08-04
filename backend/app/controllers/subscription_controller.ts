import type { HttpContext } from '@adonisjs/core/http'
import SubscriptionService from '#services/subscription_service'

export default class SubscriptionController {
  private subscriptionService = new SubscriptionService()

  async getPlans({ response }: HttpContext) {
    try {
      const plans = await this.subscriptionService.getActivePlans()
      
      return response.ok({
        success: true,
        plans: plans.map(plan => ({
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          currency: plan.currency,
          duration: plan.duration,
          features: plan.features,
          isActive: plan.isActive
        }))
      })
    } catch (error) {
      console.error('Get plans error:', error)
      return response.internalServerError({
        success: false,
        message: 'Erreur lors de la récupération des plans'
      })
    }
  }

  async selectPlan({ request, response, auth }: HttpContext) {
    try {
      const { planId, paymentMethod } = request.only(['planId', 'paymentMethod'])
      
      // Get authenticated user
      const user = await auth.use('api').authenticate()
      
      // Use the subscription service to handle plan selection and payment
      const result = await this.subscriptionService.initiatePlanPayment(planId, user, paymentMethod)

      return response.ok(result)

    } catch (error: any) {
      console.error('Select plan error:', error)
      return response.badRequest({
        success: false,
        message: error.message || 'Erreur lors de la sélection du plan'
      })
    }
  }

  async getPlanById({ params, response }: HttpContext) {
    try {
      const plan = await this.subscriptionService.getPlanById(params.id)
      
      if (!plan.isActive) {
        return response.notFound({
          success: false,
          message: 'Plan non trouvé'
        })
      }

      return response.ok({
        success: true,
        plan: {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          currency: plan.currency,
          duration: plan.duration,
          features: plan.features,
          isActive: plan.isActive
        }
      })
    } catch (error) {
      console.error('Get plan by ID error:', error)
      return response.notFound({
        success: false,
        message: 'Plan non trouvé'
      })
    }
  }
} 