import SubscriptionPlan from '#models/subscription_plan'
import axios from 'axios'

export default class SubscriptionService {
  private readonly CINETPAY_API_URL = 'https://api-checkout.cinetpay.com/v2/payment'
  private readonly CINETPAY_SITE_ID = process.env.CINETPAY_SITE_ID || 'your_site_id'
  private readonly CINETPAY_API_KEY = process.env.CINETPAY_API_KEY || 'your_api_key'
  private readonly CINETPAY_ENVIRONMENT = process.env.CINETPAY_ENVIRONMENT || 'TEST'

  async getActivePlans() {
    return await SubscriptionPlan.getActivePlans()
  }

  async getPlanById(id: number) {
    return await SubscriptionPlan.findOrFail(id)
  }

  async initiatePlanPayment(planId: number, user: any, paymentMethod: string = 'MOBILE_MONEY') {
    // Get the selected plan
    const plan = await SubscriptionPlan.findOrFail(planId)
    
    if (!plan.isActive) {
      throw new Error('Ce plan n\'est plus disponible')
    }

    // Convert USD to XAF (Francs CFA) for CinetPay
    // 1 USD ≈ 600 XAF (approximate rate)
    const usdToXafRate = 600
    const amountInXaf = Math.round(plan.price * usdToXafRate)

    // Generate unique transaction reference
    const transactionId = `PLAN_${plan.name.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Prepare CinetPay payload
    const payload = {
      apikey: this.CINETPAY_API_KEY,
      site_id: this.CINETPAY_SITE_ID,
      transaction_id: transactionId,
      amount: amountInXaf,
      currency: 'XAF',
      description: `Abonnement ${plan.name} - ${plan.description}`,
      return_url: `${process.env.APP_URL || 'http://localhost:3333'}/api/payments/callback`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:3333'}/api/payments/cancel`,
      notify_url: `${process.env.APP_URL || 'http://localhost:3333'}/api/payments/notify`,
      customer_name: user.fullName,
      customer_email: user.email,
      customer_phone_number: user.phoneNumber,
      customer_address: 'RDC',
      customer_city: 'Kinshasa',
      customer_country: 'CD',
      customer_state: 'Kinshasa',
      customer_zip_code: '00000',
      chanel: paymentMethod,
      lang: 'FR',
      env: this.CINETPAY_ENVIRONMENT
    }

    console.log('CinetPay payload for plan payment:', payload)

    // Make request to CinetPay
    const cinetpayResponse = await axios.post(this.CINETPAY_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('CinetPay response for plan payment:', cinetpayResponse.data)

    if (cinetpayResponse.data.code === '201') {
      return {
        success: true,
        plan: {
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          currency: plan.currency,
          duration: plan.duration,
          features: plan.features
        },
        payment: {
          amount: amountInXaf,
          currency: 'XAF',
          payment_url: cinetpayResponse.data.data.payment_url,
          transaction_id: transactionId
        },
        message: 'Paiement initié avec succès'
      }
    } else {
      throw new Error(cinetpayResponse.data.message || 'Erreur lors de l\'initiation du paiement')
    }
  }
} 