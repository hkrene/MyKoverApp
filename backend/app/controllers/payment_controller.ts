import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import crypto from 'crypto'
import { initiatePaymentValidator, paymentCallbackValidator } from '#validators/payment'

export default class PaymentController {
  private readonly CINETPAY_API_URL = 'https://api-checkout.cinetpay.com/v2/payment'
  private readonly CINETPAY_SITE_ID = process.env.CINETPAY_SITE_ID || 'your_site_id'
  private readonly CINETPAY_API_KEY = process.env.CINETPAY_API_KEY || 'your_api_key'
  private readonly CINETPAY_ENVIRONMENT = process.env.CINETPAY_ENVIRONMENT || 'TEST' // TEST or PROD

  async initiatePayment({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(initiatePaymentValidator)
      const { amount, currency = 'XAF', description, phoneNumber, policyNumber, channel = 'MOBILE_MONEY' } = data

      // Get authenticated user
      const user = await auth.use('api').authenticate()

      // Generate unique transaction reference
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Prepare CinetPay payload
      const payload = {
        apikey: this.CINETPAY_API_KEY,
        site_id: this.CINETPAY_SITE_ID,
        transaction_id: transactionId,
        amount: amount,
        currency: currency,
        description: description || `Paiement police ${policyNumber}`,
        return_url: `${process.env.APP_URL || 'http://localhost:3333'}/api/payments/callback`,
        cancel_url: `${process.env.APP_URL || 'http://localhost:3333'}/api/payments/cancel`,
        notify_url: `${process.env.APP_URL || 'http://localhost:3333'}/api/payments/notify`,
        customer_name: user.fullName,
        customer_email: user.email,
        customer_phone_number: phoneNumber || user.phoneNumber,
        customer_address: 'RDC',
        customer_city: 'Kinshasa',
        customer_country: 'CD',
        customer_state: 'Kinshasa',
        customer_zip_code: '00000',
        chanel: channel,
        lang: 'FR',
        env: this.CINETPAY_ENVIRONMENT
      }

      console.log('CinetPay payload:', payload)

      // Make request to CinetPay
      const cinetpayResponse = await axios.post(this.CINETPAY_API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('CinetPay response:', cinetpayResponse.data)

      if (cinetpayResponse.data.code === '201') {
        return response.ok({
          success: true,
          payment_url: cinetpayResponse.data.data.payment_url,
          transaction_id: transactionId,
          message: 'Paiement initié avec succès'
        })
      } else {
        return response.badRequest({
          success: false,
          message: cinetpayResponse.data.message || 'Erreur lors de l\'initiation du paiement'
        })
      }

    } catch (error) {
      console.error('Payment initiation error:', error)
      return response.internalServerError({
        success: false,
        message: 'Erreur lors de l\'initiation du paiement'
      })
    }
  }

  async paymentCallback({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(paymentCallbackValidator)
      const { transaction_id, status, payment_method, amount, currency } = data

      console.log('Payment callback received:', { transaction_id, status, payment_method, amount, currency })

      // Verify payment with CinetPay
      const verificationPayload = {
        apikey: this.CINETPAY_API_KEY,
        site_id: this.CINETPAY_SITE_ID,
        transaction_id: transaction_id
      }

      const verificationResponse = await axios.post(
        'https://api-checkout.cinetpay.com/v2/payment/check',
        verificationPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Payment verification response:', verificationResponse.data)

      if (verificationResponse.data.code === '00' && verificationResponse.data.data.status === 'ACCEPTED') {
        // Payment successful - update policy status, send confirmation, etc.
        return response.ok({
          success: true,
          message: 'Paiement confirmé avec succès',
          transaction_id: transaction_id,
          amount: amount,
          currency: currency
        })
      } else {
        return response.badRequest({
          success: false,
          message: 'Paiement échoué ou en attente',
          transaction_id: transaction_id
        })
      }

    } catch (error) {
      console.error('Payment callback error:', error)
      return response.internalServerError({
        success: false,
        message: 'Erreur lors du traitement du callback'
      })
    }
  }

  async paymentCancel({ request, response }: HttpContext) {
    const { transaction_id } = request.only(['transaction_id'])
    
    console.log('Payment cancelled:', transaction_id)
    
    return response.ok({
      success: false,
      message: 'Paiement annulé',
      transaction_id: transaction_id
    })
  }

  async paymentNotify({ request, response }: HttpContext) {
    try {
      const { transaction_id, status, payment_method, amount, currency } = request.only([
        'transaction_id',
        'status',
        'payment_method',
        'amount',
        'currency'
      ])

      console.log('Payment notification received:', { transaction_id, status, payment_method, amount, currency })

      // Process the notification (update database, send emails, etc.)
      if (status === 'ACCEPTED') {
        // Payment successful - update policy status
        console.log('Payment successful for transaction:', transaction_id)
      } else if (status === 'FAILED') {
        // Payment failed
        console.log('Payment failed for transaction:', transaction_id)
      }

      return response.ok({ success: true })

    } catch (error) {
      console.error('Payment notification error:', error)
      return response.internalServerError({ success: false })
    }
  }

  async getPaymentMethods({ response }: HttpContext) {
    try {
      const paymentMethods = [
        {
          id: 'mobile_money',
          name: 'Mobile Money',
          description: 'M-Pesa, Airtel Money, Orange Money',
          icon: 'mobile-alt',
          channels: ['MOBILE_MONEY', 'ORANGE_MONEY', 'MTN_MOBILE_MONEY', 'MOOV_MONEY']
        },
        {
          id: 'card',
          name: 'Carte Bancaire',
          description: 'Visa, MasterCard, American Express',
          icon: 'credit-card',
          channels: ['CARD']
        },
        {
          id: 'bank_transfer',
          name: 'Virement Bancaire',
          description: 'Transfert bancaire direct',
          icon: 'university',
          channels: ['BANK_TRANSFER']
        }
      ]

      return response.ok({
        success: true,
        payment_methods: paymentMethods
      })

    } catch (error) {
      console.error('Get payment methods error:', error)
      return response.internalServerError({
        success: false,
        message: 'Erreur lors de la récupération des méthodes de paiement'
      })
    }
  }
} 