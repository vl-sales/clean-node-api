import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    if (!process.env.MONGO_URL) return
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
  },

  getCollection (name: string): Collection {
    return this.client.db(process.env.DATABASE_NAME).collection(name)
  }
}
