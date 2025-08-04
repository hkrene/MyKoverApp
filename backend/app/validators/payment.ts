import vine from '@vinejs/vine'

export const initiatePaymentValidator = vine.compile(
  vine.object({
    amount: vine.number().positive(),
    currency: vine.string().optional(),
    description: vine.string().optional(),
    phoneNumber: vine.string().optional(),
    policyNumber: vine.string(),
    channel: vine.string().optional(),
  })
)

export const paymentCallbackValidator = vine.compile(
  vine.object({
    transaction_id: vine.string(),
    status: vine.string(),
    payment_method: vine.string().optional(),
    amount: vine.number().optional(),
    currency: vine.string().optional(),
  })
) 