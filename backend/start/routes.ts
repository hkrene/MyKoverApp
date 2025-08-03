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
