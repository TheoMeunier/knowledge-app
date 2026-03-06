import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Folder from '#models/folder'

export default class extends BaseSeeder {
  async run() {
    const folderExist = await Folder.findBy('path', '/')

    if (!folderExist) {
      await Folder.create({
        path: '/',
        parentId: null,
      })

      console.log('Racine folder created')
    } else {
      console.log('Racine folder already exists')
    }
  }
}
