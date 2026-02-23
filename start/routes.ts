/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LoginController = () => import('#controllers/auth/login_controller')

router.on('/').renderInertia('home')

// Auth
router.group(() => {
  router.get('/login', [LoginController, 'index']).as('auth.login.index')
  router.post('/login', [LoginController, 'store']).as('auth.login.store')
})
