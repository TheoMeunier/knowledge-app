import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'

export default class CreateUser extends BaseCommand {
  static commandName = 'create:user'
  static description = 'Create a new user'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const name = await this.prompt.ask('What is your name ?')
    const email = await this.prompt.ask('What is your email ?')
    const password = await this.prompt.secure('What is your password ?')

    await User.create({
      email: email,
      fullName: name,
      password: password,
    })

    this.logger.success('User created successfully !!')
  }
}
