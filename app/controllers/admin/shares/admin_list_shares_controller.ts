import { HttpContext } from '@adonisjs/core/http'
import Share from '#models/share'
import ShareListAdminDto from '../../../dtos/shares/share_admin_dto.js'

export default class AdminListSharesController {
  async render({ inertia }: HttpContext) {
    const sharesModels = await Share.query().preload('folder')

    const shares = await Promise.all(
      sharesModels.map((share) => ShareListAdminDto.fromModel(share))
    )

    return inertia.render('admin/shares/index', { shares })
  }
}
