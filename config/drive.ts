import env from '#start/env'
import { defineConfig, services } from '@adonisjs/drive'
import app from '@adonisjs/core/services/app'

const driveConfig = defineConfig({
  default: env.get('DRIVE_DISK'),

  /**
   * The services object can be used to configure multiple file system
   * services each using the same or a different driver.
   */
  services: {
    fs: services.fs({
      location: app.makePath('storage'),
      serveFiles: true,
      routeBasePath: '/uploads',
      visibility: 'public',
    }),
    s3: services.s3({
      credentials: {
        accessKeyId: env.get('AWS_ACCESS_KEY_ID') as string,
        secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY') as string,
      },
      region: env.get('AWS_REGION'),
      bucket: env.get('S3_BUCKET') as string,
      endpoint: env.get('S3_ENDPOINT'),
      visibility: 'private',
      forcePathStyle: env.get('S3_FORCE_PATH_STYLE'),
    }),
  },
})

export default driveConfig

declare module '@adonisjs/drive/types' {
  export interface DriveDisks extends InferDriveDisks<typeof driveConfig> {}
}
