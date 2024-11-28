import { type SurveyModel } from '../../../domain/models/survey'
import { type LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'Any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{ image: 'other_image', answer: 'other_answer' }],
      date: new Date()
    }
  ]
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll (): Promise<SurveyModel[]> {
        return makeFakeSurveys()
      }
    }
    const loadSurveysRepository = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepository)
    await sut.load()

    expect(loadAllSpy).toHaveBeenCalled()
  })
})
