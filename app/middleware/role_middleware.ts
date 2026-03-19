import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Role from '../enums/role.js'

export default class RoleMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, options: { roles: Role[] }) {
    const user = auth.user!

    if (!options.roles.includes(user.role)) {
      return response.forbidden({
        message: 'You do not have permission to access this resource.',
      })
    }

    return next()
  }
}
