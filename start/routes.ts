/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import Role from '#enums/role'
const AdminListSharesController = () =>
  import('#controllers/admin/shares/admin_list_shares_controller')

const AdminUpdateUsersController = () =>
  import('#controllers/admin/users/admin_update_users_controller')

const AdminRemoveUsersController = () =>
  import('#controllers/admin/users/admin_remove_users_controller')

const AdminController = () => import('#controllers/admin/admin_controller')

const AdminListUserController = () => import('#controllers/admin/users/admin_list_users_controller')

const AdminStoreUsersController = () =>
  import('#controllers/admin/users/admin_store_users_controller')

const ShowImagesController = () => import('#controllers/images/show_images_controller')

const UploadImagesController = () => import('#controllers/images/upload_images_controller')

const DeleteShareController = () => import('#controllers/tree/share/delete_share_controller')

const ListShareProfileController = () =>
  import('#controllers/profile/list_share_profile_controller')

const LogoutController = () => import('#controllers/auth/logout_controller')

const UpdatePasswordProfileController = () =>
  import('#controllers/profile/update_password_profile_controller')

const UpdateProfilesController = () => import('#controllers/profile/update_profile_controller')

const RemoveFileController = () => import('#controllers/tree/file/remove_file_controller')

const ShowFileShareController = () => import('#controllers/tree/share/show_file_share_controller')

const ListFolderShareController = () =>
  import('#controllers/tree/share/list_folder_share_controller')

const LoginController = () => import('#controllers/auth/login_controller')
const HomeController = () => import('#controllers/home_controller')

const StoreFileController = () => import('#controllers/tree/file/store_file_controller')
const ShowFileController = () => import('#controllers/tree/file/show_file_controller')
const UpdateFileController = () => import('#controllers/tree/file/update_file_controller')

const ListFolderController = () => import('#controllers/tree/folder/list_folder_controller')
const StoreFolderController = () => import('#controllers/tree/folder/store_folder_controller')
const ShareFolderController = () => import('#controllers/tree/folder/share_folder_controller')
const RemoveFolderController = () => import('#controllers/tree/folder/remove_folder_controller')

// Auth
router.group(() => {
  router.get('/login', [LoginController, 'index']).as('auth.login.index')
  router.post('/login', [LoginController, 'store']).as('auth.login.store')
})

router
  .group(() => {
    //home
    router.get('/', [HomeController, 'index']).as('home')

    // tree
    router
      .group(() => {
        router.post('/file/create', [StoreFileController, 'store']).as('file.create')
        router.get('/file/:slug', [ShowFileController, 'render']).as('file.show')
        router.get('/file/:slug/edit', [UpdateFileController, 'render']).as('files.update')
        router.post('/file/:id/edit', [UpdateFileController, 'upgrade']).as('files.upgrade')
        router.delete('/file/:id/delete', [RemoveFileController, 'remove']).as('files.remove')

        router.get('/folders/list', [ListFolderController, 'render']).as('folders.list')
        router.post('/folders/create', [StoreFolderController, 'store']).as('folders.create')
        router.delete('folders/:id/delete', [RemoveFolderController, 'remove']).as('folders.remove')
        router.post('folders/:id/share', [ShareFolderController, 'share']).as('folders.share')
      })
      .as('tree')

    //profile
    router.get('/profile', [UpdateProfilesController, 'render']).as('profile')
    router.post('/profile/update', [UpdateProfilesController, 'update']).as('profile.update')
    router
      .post('/profile/update/password', [UpdatePasswordProfileController, 'update'])
      .as('profile.update.password')
    router.get('/profile/shares', [ListShareProfileController, 'render']).as('profile.shares')

    //shares
    router.delete('/shares/:id/delete', [DeleteShareController, 'remove']).as('shares.delete')

    //logout
    router.delete('/logout', [LogoutController, 'logout'])

    //Upload
    router.post('/upload', [UploadImagesController, 'upload']).as('upload')

    // Admin
    router
      .group(() => {
        router.get('/', [AdminController, 'render']).as('index')
        router.get('/users', [AdminListUserController, 'render']).as('users.lists')
        router.post('/users/store', [AdminStoreUsersController, 'store']).as('users.store')
        router.post('/users/:id/update', [AdminUpdateUsersController, 'update']).as('users.update')
        router
          .delete('/users/:id/remove', [AdminRemoveUsersController, 'remove'])
          .as('users.delete')

        router.get('/shares', [AdminListSharesController, 'render']).as('shares.lists')
      })
      .middleware([middleware.role({ roles: [Role.ADMIN] })])
      .prefix('/admin')
      .as('admin')
  })
  .middleware([middleware.auth()])

// Share
router.get('/shares/:token/:path', [ListFolderShareController, 'render']).as('shares.show')
router.get('/shares/:token/:path/:file', [ShowFileShareController, 'render']).as('shares.file.show')

router.get(`/images/*`, [ShowImagesController, 'show']).as('images.show')
