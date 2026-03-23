import { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async render({ inertia }: HttpContext) {
    return inertia.render('admin/index')
  }
}
