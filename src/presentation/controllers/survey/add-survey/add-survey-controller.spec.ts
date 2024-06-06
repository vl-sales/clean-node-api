import { badRequest } from '../../../helpers/http/https-helper'
import { AddSurveyController } from './add-survey-controller'
import { type Validation, type HttpRequest } from './add-survey-controller-protocols'

interface SutTypes {
  validationStub: Validation
  sut: AddSurveyController
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      question: 'Any_question',
      answers: [{ image: 'any_image', answer: 'any_answer' }]
    }
  }
)

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddSurveyController(validationStub)

  return { sut, validationStub }
}
describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('mock_error'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new Error('mock_error')))
  })
})
