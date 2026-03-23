import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import UserDto from '../../dtos/users/user_dto.js'

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

    const dto = await UserDto.fromModel(user)
    return inertia.render('profile/index', {
      user: dto,
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
