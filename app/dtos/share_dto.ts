export default class ShareDto {
  declare id: number
  declare folder_path: string
  declare token: string

  constructor(data: { id: number; token: string; folder_path: string }) {
    this.id = data.id
    this.token = data.token
    this.folder_path = data.folder_path
  }

  static async fromModel(shareId: number, token: string, folderPath: string): Promise<ShareDto> {
    return new ShareDto({
      id: shareId,
      token: token,
      folder_path: folderPath,
    })
  }
}
