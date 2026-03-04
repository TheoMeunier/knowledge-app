import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdateProfilesController {
  static validator = vine.compile(
    vine.object({
      fullName: vine.string().minLength(3).maxLength(255),
      email: vine.string().email(),
    })
  )

  async render({ inertia, auth }: HttpContext) {
    const user = auth.user

    if (!user) throw new Error('User not found')

    return inertia.render('profile/index', {
      user,
    })
  }

  async update({ request, response, auth, session }: HttpContext) {
    const { fullName, email } = await request.validateUsing(UpdateProfilesController.validator)

    const user = auth.user

    if (!user) throw new Error('User not found')

    user.fullName = fullName
    user.email = email
    await user.save()

    session.flash('success', 'Profile updated successfully')
    return response.redirect().back()
  }
}
