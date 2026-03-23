import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AdminRemoveUsersController {
  async remove({ request, response, session }: HttpContext) {
    const user = await User.findOrFail(request.param('id'))

    if (user.email === 'admin@knowledge.fr') {
      session.flash('error', 'You can not remove admin user')
      return response.redirect().back()
    }

    await user.delete()

    session.flash('success', 'User remove with successfully')
    return response.redirect().back()
  }
}
