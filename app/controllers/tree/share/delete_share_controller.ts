import { HttpContext } from '@adonisjs/core/http'
import Share from '#models/share'

export default class DeleteShareController {
  async remove({ request, response, session }: HttpContext) {
    const shareId = request.param('id')

    const share = await Share.findOrFail(shareId)
    await share.delete()

    session.flash('success', 'Share deleted with successfully')
    return response.redirect().back()
  }
}
