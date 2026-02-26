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
const HomeController = () => import('#controllers/home_controller')

const StoreFileController = () => import('#controllers/tree/file/store_file_controller')
const UpdateFileController = () => import('#controllers/tree/file/update_file_controller')

const ListFolderController = () => import('#controllers/tree/folder/list_folder_controller')
const StoreFolderController = () => import('#controllers/tree/folder/store_folder_controller')

router.get('/', [HomeController, 'index']).as('home')

// Auth
router.group(() => {
  router.get('/login', [LoginController, 'index']).as('auth.login.index')
  router.post('/login', [LoginController, 'store']).as('auth.login.store')
})

// Tree
router
  .group(() => {
    router.post('/file/create', [StoreFileController, 'store']).as('file.create')
    router.get('/file/{id}/edit', [UpdateFileController, 'render']).as('files.update')
    router.post('/file/{id}/edit', [UpdateFileController, 'upgrade']).as('files.upgrade')

    router.get('/folders/list', [ListFolderController, 'render']).as('folders.list')
    router.post('/folders/create', [StoreFolderController, 'store']).as('folders.create')
  })
  .as('tree')
