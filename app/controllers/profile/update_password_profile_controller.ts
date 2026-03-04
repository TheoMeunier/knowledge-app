import vine from '@vinejs/vine'
import { HttpContext } from '@adonisjs/core/http'

export default class UpdatePasswordProfileController {
  static validator = vine.compile(
    vine.object({
      password: vine.string().minLength(3).maxLength(255),
      passwordConfirmation: vine.string().confirmed({ confirmationField: 'password' }),
    })
  )

  async update({ request, response, auth, session }: HttpContext) {
    const { password } = await request.validateUsing(UpdatePasswordProfileController.validator)

    const user = auth.user

    if (!user) throw new Error('User not found')

    user.password = password
    await user.save()

    session.flash('success', 'Password updated successfully')
    return response.redirect().back()
  }
}
