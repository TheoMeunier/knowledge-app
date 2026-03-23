// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import UsersListingDto from '../../../dtos/users/users_listing_dto.js'

export default class AdminListUserController {
  async render({ inertia }: HttpContext) {
    const users = await User.all()
    const dtos = await Promise.all(users.map((user) => UsersListingDto.fromModel(user)))

    return inertia.render('admin/users/index', { users: dtos })
  }
}
