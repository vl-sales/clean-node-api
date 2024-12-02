import { type Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { type AddSurveyModel } from '../../../../domain/useCases/add-survey'

const makeFakeSurveys = (): AddSurveyModel[] => {
  return [
    {
      question: 'Any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
      date: new Date()
    },
    {
      question: 'other_question',
      answers: [{ image: 'other_image', answer: 'other_answer' }],
      date: new Date()
    }
  ]
}

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'answer_1'
          },
          {
            answer: 'answer_2'
          }
        ],
        date: new Date()
      })

      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany(makeFakeSurveys())

      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)

      expect(surveys[0].id).toBeTruthy()
      expect(surveys[1].id).toBeTruthy()

      expect(surveys[0].question).toBe('Any_question')
      expect(surveys[1].question).toBe('other_question')
    })
  })
})
