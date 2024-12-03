import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'
import { type LoadSurveys } from '../../../../../domain/useCases/load-surveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
