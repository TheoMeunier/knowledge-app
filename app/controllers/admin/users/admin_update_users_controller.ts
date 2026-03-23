import vine from '@vinejs/vine'
import Role from '#enums/role'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AdminUpdateUsersController {
  static validator = vine.compile(
    vine.object({
      username: vine.string().minLength(3).maxLength(255),
      email: vine.string().email(),
      role: vine.enum(Role),
    })
  )

  async update({ request, response, session }: HttpContext) {
    const { username, email, role } = await request.validateUsing(
      AdminUpdateUsersController.validator
    )

    if (email === 'admin@knowledge.fr') {
      session.flash('error', 'You can not update admin user')
      return response.redirect().back()
    }

    const existingUser = await User.query()
      .where('email', email)
      .whereNot('id', request.param('id'))
      .first()

    if (existingUser) {
      session.flash('error', 'Email already in use !')
      return response.redirect().back()
    }

    const user = await User.findOrFail(request.param('id'))
    user.fullName = username
    user.email = email
    user.role = role
    await user.save()

    session.flash('success', 'User created successfully !')
    return response.redirect().back()
  }
}
