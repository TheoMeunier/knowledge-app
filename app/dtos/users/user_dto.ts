import Role from '#enums/role'
import User from '#models/user'

export default class UserDto {
  declare id: number
  declare email: string
  declare username: string
  declare role: Role

  constructor(data: { id: number; email: string; username: string; role: Role }) {
    this.id = data.id
    this.email = data.email
    this.username = data.username
    this.role = data.role
  }

  static async fromModel(user: User): Promise<UserDto> {
    return new UserDto({
      id: user.id,
      email: user.email,
      username: user.fullName,
      role: user.role,
    })
  }
}
