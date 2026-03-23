import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import User from '#models/user'
import Role from '../../../enums/role.js'

export default class AdminStoreUsersController {
  static validator = vine.compile(
    vine.object({
      username: vine.string().minLength(3).maxLength(255),
      email: vine.string().email(),
      role: vine.enum(Role),
      password: vine.string().minLength(3).maxLength(255),
      passwordConfirmation: vine.string().confirmed({ confirmationField: 'password' }),
    })
  )

  async store({ request, response, session }: HttpContext) {
    const { username, email, role, password } = await request.validateUsing(
      AdminStoreUsersController.validator
    )

    const existingUser = await User.query().where('email', email).first()

    if (existingUser) {
      session.flash('error', 'Email already in use !')
      return response.redirect().back()
    }

    await User.create({
      fullName: username,
      role,
      email,
      password,
    })

    session.flash('success', 'User created successfully !')
    return response.redirect().back()
  }
}
