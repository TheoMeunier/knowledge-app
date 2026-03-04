import { HttpContext } from '@adonisjs/core/http'
import Share from '#models/share'
import ShareProfileDto from '../../dtos/shares/share_profile_dto.js'

export default class ListShareProfileController {
  async render({ inertia }: HttpContext) {
    const sharesModels = await Share.query().preload('folder')

    const shares = await Promise.all(sharesModels.map((share) => ShareProfileDto.fromModel(share)))

    return inertia.render('profile/shares', { shares })
  }
}
