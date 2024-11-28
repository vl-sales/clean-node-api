import { type SurveyModel } from '../../../domain/models/survey'
import { type LoadSurveys } from '../../../domain/useCases/load-surveys'
import { type LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll()
  }
}
