import { type Collection, MongoClient } from 'mongodb'
import { type DefaultFields } from '../../protocols/defaultFields'

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
  },

  map<T>(dbReturn: T & DefaultFields): Omit<T & DefaultFields, '_id'> {
    const { _id, ...obj } = dbReturn
    return Object.assign({}, obj, { id: _id })
  }
}
