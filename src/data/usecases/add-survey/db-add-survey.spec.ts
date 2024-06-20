import { DbAddSurvey } from './db-add-survey'
import { type AddSurveyRepository, type AddSurveyModel } from './db-add-survey-protocols'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (account: AddSurveyModel): Promise<void> {
        return null
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)

    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
