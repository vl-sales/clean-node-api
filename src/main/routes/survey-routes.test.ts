import request from 'supertest'
import app from '../config/app'
import { type Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let surveyCollection: Collection
describe('SignUp routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
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
  })
})
