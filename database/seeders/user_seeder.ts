import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const email = 'admin@knowledge.fr'

    const userExists = await User.findBy('email', email)

    if (!userExists) {
      await User.create({
        fullName: 'admin',
        email: email,
        password: 'knowledge',
      })

      console.log('Admin user created')
    } else {
      console.log('Admin user already exists')
    }
  }
}
