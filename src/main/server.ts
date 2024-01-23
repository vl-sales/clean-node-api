import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`)
    })

    server.on('close', async () => {
      try {
        await MongoHelper.disconnect()
        console.log('Disconnected from MongoDB')
      } catch (error) {
        console.error('Error disconnecting from MongoDB:', error)
      }
    })
  })
  .catch(console.error)
