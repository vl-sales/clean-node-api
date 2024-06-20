import { type AddSurveyModel } from '../../../../domain/useCases/add-survey'

export interface AddSurveyRepository {
  add: (account: AddSurveyModel) => Promise<void>
}
