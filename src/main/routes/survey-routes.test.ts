import request from 'supertest'
import app from '../config/app'
import { type Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('SignUp routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /survey', () => {
    test('Should return 403 if no access token is provided', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              image: 'Answer 1',
              answer: 'http://image-name.com'
            },
            {
              answer: 'Anwer 2'
            }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Vinicius',
        email: 'lande0600@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = result.insertedId
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })

      await request(app)
        .post('/api/surveys')
        .set('x-accesss-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              image: 'Answer 1',
              answer: 'http://image-name.com'
            },
            {
              answer: 'Anwer 2'
            }
          ]
        })
        .expect(403)
    })
  })
})
