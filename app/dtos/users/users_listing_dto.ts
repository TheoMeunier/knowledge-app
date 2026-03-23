import User from '#models/user'

export default class UsersListingDto {
  declare id: number
  declare email: string
  declare username: string
  declare role: string
  declare created_at: string

  constructor(data: {
    id: number
    email: string
    username: string
    role: string
    created_at: string
  }) {
    this.id = data.id
    this.email = data.email
    this.username = data.username
    this.role = data.role
    this.created_at = data.created_at
  }

  static async fromModel(user: User): Promise<UsersListingDto> {
    return new UsersListingDto({
      id: user.id,
      email: user.email,
      username: user.fullName,
      role: user.roleLabel,
      created_at: user.createdAt.toFormat('dd/MM/yyyy'),
    })
  }
}
