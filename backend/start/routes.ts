/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('/signup', '#controllers/auth_controller.signup')
  router.post('/login', '#controllers/auth_controller.login')
  router.post('/logout', '#controllers/auth_controller.logout')
  router.get('/test-user/:phone', '#controllers/auth_controller.testUser')
}).prefix('/auth')

router.get('/api/profile', '#controllers/profile_controller.getProfile')
router.put('/api/profile', '#controllers/profile_controller.updateProfile')

// Payment routes
router.group(() => {
  router.post('/initiate', '#controllers/payment_controller.initiatePayment')
  router.get('/methods', '#controllers/payment_controller.getPaymentMethods')
  router.post('/callback', '#controllers/payment_controller.paymentCallback')
  router.post('/cancel', '#controllers/payment_controller.paymentCancel')
  router.post('/notify', '#controllers/payment_controller.paymentNotify')
}).prefix('/api/payments')

// Subscription routes
router.group(() => {
  router.get('/plans', '#controllers/subscription_controller.getPlans')
  router.post('/select-plan', '#controllers/subscription_controller.selectPlan')
  router.get('/plans/:id', '#controllers/subscription_controller.getPlanById')
}).prefix('/api/subscriptions')
