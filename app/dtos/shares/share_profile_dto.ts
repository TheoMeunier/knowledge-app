import env from '#start/env'
import Share from '#models/share'

export default class ShareProfileDto {
  declare id: number
  declare url: string
  declare created_at: string
  declare folder_path: string

  constructor(data: { id: number; url: string; folder_path: string; created_at: string }) {
    this.id = data.id
    this.url = data.url
    this.folder_path = data.folder_path
    this.created_at = data.created_at
  }

  static async fromModel(share: Share): Promise<ShareProfileDto> {
    return new ShareProfileDto({
      id: share.id,
      url: `${env.get('APP_URL')}/shares/${share.token}/${share.folder.path}`,
      folder_path: share.folder.path,
      created_at: share.createdAt.toFormat('dd/MM/yyyy'),
    })
  }
}
