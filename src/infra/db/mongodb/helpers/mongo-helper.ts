import { type Collection, MongoClient } from 'mongodb'
import { type DefaultFields } from '../../protocols/defaultFields'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map<T>(dbReturn: T & DefaultFields): Omit<T & DefaultFields, '_id'> {
    const { _id, ...obj } = dbReturn
    return Object.assign({}, obj, { id: _id })
  },

  mapMany<T>(dbReturn: Array<T & DefaultFields>): Array<Omit<T & DefaultFields, '_id'>> {
    return dbReturn.map((record) => this.map(record))
  }
}
