import request from 'supertest'
import app from '../config/app'
import { type Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('SignUp routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Vinicius',
          email: 'lande0600@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on success', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Vinicius',
        email: 'lande0600@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'lande0600@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
